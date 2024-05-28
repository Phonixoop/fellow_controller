"use client";

import React, { ReactNode } from "react";

//UI
import TextField from "~/ui/forms/text-field";
import InputError from "~/ui/forms/input-error";

//Withs UI
import withLabel from "~/ui/forms/with-label";

//Icons
import { DiamondPlusIcon, SquareAsteriskIcon, TrashIcon } from "lucide-react";

//Library
import { useFormik } from "formik";
import { cn } from "~/lib/utils";
import Button from "~/ui/buttons";
import { getFormPersianName } from "~/config/form-translate";
import H2 from "~/ui/heading/h2";

import MultiSelectBox from "~/ui/forms/multi-select";

import withModalState from "~/ui/modals/with-modal-state";
import { ComboboxDemo } from "~/app/form/list-box";
import { SelectControlled } from "~/app/form/checkbox-list";
import TextAreaField from "~/ui/forms/textarea-field";
import { api } from "~/trpc/react";
import { createFormSchema } from "~/server/validations/form.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { formData } from "zod-form-data";
import { toast } from "sonner";

type FormType = {
  file: any;

  date: string; // private

  title: string;
  form_number: string;
  description: string;
  accounting_document_table: FormAccountingDocumentTableType[];

  appendices: string | string[];
  rules: string;
  considerations: string;
  time: string;
  financial_Processing: string;
  audit: string;
};

type FormAccountingDocumentTableType = {
  group: string;
  total: string;
  moeen: string;
  level_4: string;
  level_5: string;
  level_6: string;
  description: string;
  debtor: string;
  creditor: string;
};

const TextFieldWithLabel = withLabel(TextField);
const TextAreaFieldWithLabel = withLabel(TextAreaField);
function ButtonForSetListBoxModal({ children, ...rest }: { children: any }) {
  return (
    <>
      <Button
        {...rest}
        className="flex min-w-fit items-center justify-center gap-1 bg-secondary px-3 text-primary"
      >
        {children}
      </Button>
    </>
  );
}

const ListBoxWithModal = withModalState(ButtonForSetListBoxModal);
const ButtonWithModal = withModalState(ButtonForSetListBoxModal);
const initialValues = {
  appendices: ["ثبت نهایی", "سند رسمی"],
};
export default function FormBuilder() {
  const createForm = api.form.create.useMutation();
  const formik = useFormik<FormType>({
    initialValues: {
      file: undefined,
      date: "",
      form_number: "",
      title: "",
      description: "",
      accounting_document_table: [
        {
          group: "",
          total: "",
          moeen: "",
          level_4: "",
          level_5: "",
          level_6: "",
          description: "",
          debtor: "",
          creditor: "",
        },
      ],
      appendices: [],
      rules: "",
      considerations: "",
      time: "",
      financial_Processing: "",
      audit: "",
    },
    validationSchema: toFormikValidationSchema(createFormSchema),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data?.fileUrl?.length <= 0) {
        toast("خطا در آپلود فایل");
        return;
      }
      createForm.mutate({
        file_url: data.fileUrl,
        title: values.title,
        form_number: values.form_number,
        appendices: JSON.stringify(values.appendices),
        audit: values.audit,
        description: values.description,
        considerations: values.considerations,
        financial_Processing: values.financial_Processing,
        rules: values.rules,
        time: values.time,
        accounting_document_table: values.accounting_document_table,
      });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        dir="rtl"
        className=" flex w-6/12 flex-col  items-center justify-center"
      >
        <FlexCol className=" justify-start  rounded-lg bg-secondary p-2">
          <FlexRow className="w-full gap-0">
            <div className=" flex w-9/12 flex-col  justify-center ">
              {getInputComponent({
                label: "عنوان",

                value: formik.getFieldProps("title").value,
                onChange: (value) => {
                  formik.setFieldValue("title", value);
                },
              })}
              <InputError message={formik.errors.title} />
            </div>
            <div className="flex w-3/12 flex-col  justify-center">
              {getInputComponent({
                label: "شماره فرم",
                value: formik.getFieldProps("form_number").value,
                onChange: (value) => {
                  formik.setFieldValue("form_number", value);
                },
              })}

              <InputError message={formik.errors.form_number} />
            </div>
          </FlexRow>
          <div className="w-full justify-center">
            {getInputComponent({
              label: "شرح",
              textArea: true,
              value: formik.getFieldProps("description").value,
              onChange: (value: string | string[] | boolean | boolean[]) => {
                formik.setFieldValue("description", value);
              },
            })}

            <InputError message={formik.errors.description} />
          </div>
          <div className="flex w-full flex-col gap-2 bg-accent/5 pt-5">
            <H2 className="pb-4 text-center text-xl font-bold">سند حسابداری</H2>
            <div className="flex w-full flex-col gap-2">
              {formik.values.accounting_document_table.map((item, i) => (
                <div
                  className="flex flex-row items-center justify-center gap-1 px-2"
                  key={i}
                >
                  {Object.keys(item).map((fieldName) => (
                    <>
                      <div key={fieldName} className="">
                        {getInputComponent({
                          label: getFormPersianName(fieldName),
                          textArea: true,
                          focused: true,
                          withModal: true,
                          value: formik.getFieldProps(
                            `accounting_document_table[${i}].${fieldName}`,
                          ).value,
                          onChange: (
                            value: string | string[] | boolean | boolean[],
                          ) => {
                            formik.setFieldValue(
                              `accounting_document_table[${i}].${fieldName}`,
                              value,
                            );
                          },
                        })}

                        {/* <InputError message={(formik.errors.accounting_document_table[index] as any)?.[fieldName]} /> */}
                      </div>
                    </>
                  ))}
                  <div className="flex  items-end">
                    {formik.values.accounting_document_table.length > 1 && (
                      <Button
                        disabled={
                          formik.values.accounting_document_table.length === 1
                        }
                        className="p-0 px-2"
                        onClick={() => {
                          const updatedTable =
                            formik.values.accounting_document_table.filter(
                              (_, index) => index !== i,
                            );
                          if (updatedTable.length <= 0) return;
                          formik.setFieldValue(
                            "accounting_document_table",
                            updatedTable,
                          );
                        }}
                      >
                        <TrashIcon className=" stroke-rose-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-accent">
              <Button
                className="w-full flex-1 bg-accent"
                onClick={() => {
                  formik.setFieldValue("accounting_document_table", [
                    ...formik.values.accounting_document_table,
                    {
                      group: "",
                      total: "",
                      moeen: "",
                      level_4: "",
                      level_5: "",
                      level_6: "",
                      description: "",
                      debtor: "",
                      creditor: "",
                    },
                  ]);
                }}
              >
                <DiamondPlusIcon />
              </Button>
            </div>
          </div>
          <FlexCol className="w-full gap-4">
            <div className="w-full justify-center">
              {getInputComponent({
                label: "ضمائم",
                list: initialValues.appendices,
                value: formik.values.appendices as string[],
                onChange: (values) => {
                  formik.setFieldValue("appendices", values);
                },
              })}

              <InputError message={formik.errors.appendices} />
            </div>
            <div className="w-full justify-center">
              {getInputComponent({
                label: "قوانین",
                textArea: true,

                value: formik.getFieldMeta("rules").value,
                onChange: (value) => {
                  formik.setFieldValue("rules", value);
                },
              })}

              <InputError message={formik.errors.rules} />
            </div>
            <div className="w-full justify-center">
              {getInputComponent({
                label: "ملاحظات",
                textArea: true,

                value: formik.getFieldMeta("considerations").value,
                onChange: (value) => {
                  formik.setFieldValue("considerations", value);
                },
              })}

              <InputError message={formik.errors.considerations} />
            </div>
            <div className="w-full justify-center">
              {getInputComponent({
                label: "زمان",
                textArea: true,

                value: formik.getFieldMeta("time").value,
                onChange: (value) => {
                  formik.setFieldValue("time", value);
                },
              })}

              <InputError message={formik.errors.time} />
            </div>
            <div className="w-full justify-center">
              {getInputComponent({
                label: "رسیدگی مالی",
                textArea: true,

                value: formik.getFieldMeta("financial_Processing").value,
                onChange: (value) => {
                  formik.setFieldValue("financial_Processing", value);
                },
              })}

              <InputError message={formik.errors.financial_Processing} />
            </div>
            <div className="w-full justify-center">
              {getInputComponent({
                label: "حسابرسی",
                textArea: true,

                value: formik.getFieldMeta("audit").value,
                onChange: (value) => {
                  formik.setFieldValue("audit", value);
                },
              })}

              <InputError message={formik.errors.audit} />
            </div>
          </FlexCol>
          <div className="w-full ">
            <input
              type="file"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
          </div>
          <Button
            type="submit"
            isLoading={createForm.isPending}
            className="w-full bg-accent/10 text-accent "
          >
            ثبت
          </Button>
        </FlexCol>
      </form>
    </>
  );
}

type ElementType = {
  children?: ReactNode | any;
  className?: string;
};
function FlexRow({ children, className }: ElementType) {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
function FlexCol({ children, className }: ElementType) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Th({ children, className }: ElementType) {
  return (
    <th
      className={cn(
        " w-fit  px-6 py-3 text-center text-xs  font-black leading-4 tracking-wider text-accent",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({ children, className }: ElementType) {
  return (
    <td
      className={cn(
        " w-fit  px-6 py-3 text-center text-xs  font-black leading-4 tracking-wider text-primary",
        className,
      )}
    >
      {children}
    </td>
  );
}

type GetInputComponentType = {
  list?: string[];
  value: string | string[];
  label: string;
  textArea?: boolean;
  withModal?: boolean;
  focused?: boolean;
  onChange: (newValue: string | string[]) => void;
};
function getInputComponent({
  list = [""],
  value = "" || [""],
  label = "",
  focused = false,
  textArea = false,
  withModal = false,
  onChange,
}: GetInputComponentType): JSX.Element {
  if (Array.isArray(value)) {
    return (
      <>
        {/* <ListBoxWithModal
          content={"تغییر رمز عبور"}
          title="تغییر رمز عبور"
          size={"sm"}
          center
          render={(closeModal) => {
            return (
              <>
                <MultiSelectBox
                  list={value.map((a, i) => {
                    return {
                      key: a,
                      value: a,
                    };
                  })}
                />
              </>
            );
          }}
        /> */}

        <SelectControlled
          className="z-0 min-w-80"
          withSelectAll
          title={label}
          list={list}
          value={value}
          onChange={(values: any) => {
            onChange(values);
          }}
        />

        {/* <ComboboxDemo
          values={[]}
          placeHolder="جستجو تم"
          list={initialValues.map((a, i) => {
            return {
              label: a,
              value: a,
            };
          })}
          onChange={(value: any) => {
            onChange([value]);
          }}
        /> */}
      </>
    );
  } else {
    if (textArea && withModal)
      return (
        <ButtonWithModal
          className="bg-accent/10"
          size="xs"
          center
          title={label}
          render={(onClose) => {
            return (
              <>
                <TextAreaFieldWithLabel
                  className="w-full bg-accent/10"
                  focused={focused}
                  label={label}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              </>
            );
          }}
        >
          {label}
        </ButtonWithModal>
      );
    if (textArea)
      return (
        <TextAreaFieldWithLabel
          className="w-full bg-transparent"
          focused={focused}
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    return (
      <TextFieldWithLabel
        className="w-full bg-transparent"
        focused={focused}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
}
