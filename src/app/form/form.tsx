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

type FormType = {
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
        <SquareAsteriskIcon className="stroke-primary" />
        {children}
      </Button>
    </>
  );
}

const ListBoxWithModal = withModalState(ButtonForSetListBoxModal);

const initialValues = {
  appendices: ["ثبت نهایی", "سند رسمی"],
};
export default function FormBuilder() {
  const formik = useFormik<FormType>({
    initialValues: {
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
    onSubmit: (values) => {},
  });

  // const formFields = Object.keys(formik.values).map((fieldName) => (
  //   <div key={fieldName} className=" flex flex-col items-end justify-center">
  //     <TextFieldWithLabel
  //       label={fieldName}
  //       className="bg-secondary"
  //       {...formik.getFieldProps(fieldName)}
  //     />
  //     <InputError message={(formik.errors as any)[fieldName]} />
  //   </div>
  // ));
  // const tableFields = Object.keys(formik.values.accounting_document_table).map(
  //   (fieldName) => (
  //     <tr key={fieldName}>
  //       {Object.values(formik.values.accounting_document_table).map((item) => {
  //         return (
  //           <>
  //             <td>
  //               {JSON.stringify(fieldName)}
  //               <TextFieldWithLabel
  //                 label={getFormPersianName(fieldName)}
  //                 className="bg-secondary"
  //                 {...formik.getFieldProps(fieldName)}
  //               />
  //             </td>
  //             <td>
  //               <InputError message={(formik.errors as any)[fieldName]} />
  //             </td>
  //           </>
  //         );
  //       })}
  //     </tr>
  //   ),
  // );

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        dir="rtl"
        className="flex w-6/12 flex-col items-center justify-center "
      >
        <FlexCol>
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
            <div className="w-full">
              {formik.values.accounting_document_table.map((item, i) => (
                <div
                  className="flex flex-row items-stretch justify-center gap-1"
                  key={i}
                >
                  {Object.keys(item).map((fieldName) => (
                    <>
                      <div key={fieldName} className=" ">
                        <TextFieldWithLabel
                          label={getFormPersianName(fieldName)}
                          value={
                            formik.getFieldProps(
                              `accounting_document_table[${i}].${fieldName}`,
                            ).value
                          }
                          onChange={(e) => {
                            formik.setFieldValue(
                              `accounting_document_table[${i}].${fieldName}`,
                              e.target.value,
                            );
                          }}
                        />
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
            {/* <table className="w-auto border-collapse  text-sm">
              <caption className="text-xl">سند حسابداری</caption>
              <thead>
                <tr>
                  <Th>گروه</Th>
                  <Th>کل</Th>
                  <Th>معین</Th>
                  <Th>سطح 4</Th>
                  <Th>سطح 5</Th>
                  <Th>سطح 6</Th>
                  <Th>توضیحات</Th>
                  <Th>بدهکار</Th>
                  <Th>بستانکار</Th>
                </tr>
              </thead>
              <tbody>
               
                <tr className="w-full">
                  <td colSpan={9}>
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
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>
          <FlexCol className="w-full">
            <div className="w-full justify-center">
              {getInputComponent({
                label: "ضمائم",
                list: initialValues.appendices,
                value: formik.values.appendices as string[],
                onChange: (values) => {
                  console.log({ value: formik.values.appendices });
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

              <InputError message={formik.errors.appendices} />
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

              <InputError message={formik.errors.appendices} />
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

              <InputError message={formik.errors.appendices} />
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

              <InputError message={formik.errors.appendices} />
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

              <InputError message={formik.errors.appendices} />
            </div>
          </FlexCol>
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
  onChange: (newValue: string | string[]) => void;
};
function getInputComponent({
  list = [""],
  value = "" || [""],
  label = "",
  textArea = false,
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
          className="min-w-80"
          withSelectAll
          title={label}
          list={list}
          value={value}
          onChange={(values: any) => {
            console.log({ values });
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
    if (textArea)
      return (
        <TextAreaFieldWithLabel
          className="w-full"
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    return (
      <TextFieldWithLabel
        className="w-full"
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
}
