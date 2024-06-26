"use client";

import { useFormik } from "formik";
import {
  CheckCheckIcon,
  FormInputIcon,
  KeySquareIcon,
  Loader2Icon,
  ShieldAlertIcon,
  UserIcon,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import MultiStep from "~/features/multi-step";
import {
  createUserSchema,
  userLoginSchema,
} from "~/server/validations/user.validation";
import Button from "~/ui/buttons";
import InputError from "~/ui/forms/input-error";
import PasswordField from "~/ui/forms/password-field";
import TextField from "~/ui/forms/text-field";
import withLabel from "~/ui/forms/with-label";
import { delay } from "~/utils/util";

const TextFieldWithLable = withLabel(TextField);

const icons = [
  <UserIcon key={1} className="stroke-inherit" />,
  <KeySquareIcon key={2} className="stroke-inherit" />,
  <Loader2Icon key={4} className="stroke-inherit" />,
  <ShieldAlertIcon key={4} className="stroke-red-500" />,
  <CheckCheckIcon key={4} className="stroke-inherit" />,
];

export default function CreateAccountForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: toFormikValidationSchema(userLoginSchema),
    validateOnBlur: true,
    onSubmit: async (values: typeof createUserSchema._type) => {},
  });
  const passwordFieldRef = useRef(null);
  const [step, setStep] = useState(0);
  function Enter(e: any) {
    if (e.keyCode == 13) {
      goTo(step + 1);
    }
  }
  async function goTo(stepNumber: number) {
    console.log(passwordFieldRef.current);
    if (formik.isValid && stepNumber >= 2) {
      setStep(2);
      setIsLoading(true);
      await delay(1000);

      await signIn("credentials", {
        username: formik.values.username,
        password: formik.values.password,
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      })
        .then(async (result: any) => {
          if (result.ok) {
            setStep(4);
            await delay(1000);
            router.refresh();
          } else setStep(3);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else if (stepNumber < 2) setStep(stepNumber);
  }
  return (
    <form
      className="h-[452px] w-full rounded-3xl bg-secbuttn px-5 py-10"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col items-center justify-center ">
        <FormInputIcon className="animate-pulse stroke-primary" />
        <h2 className="w-full text-center text-accent">ورود</h2>
      </div>
      <MultiStep
        loadingStep={2}
        isLoading={isLoading}
        onStepClick={(stepNumber) => {
          goTo(stepNumber);
        }}
        onPrevious={() => {
          goTo(step - 1);
        }}
        onNext={() => {
          goTo(step + 1);
        }}
        currentStep={step}
        icons={icons}
        steps={[
          <>
            <div
              key={0}
              className="relative flex w-full flex-col items-center justify-center gap-5 "
            >
              <TextFieldWithLable
                label={"نام کاربری"}
                value={formik.getFieldProps("username").value}
                onChange={(value: any) => {
                  formik.setFieldValue("username", value.target.value);
                }}
                onKeyDown={(e: any) => Enter(e)}
              />

              <InputError message={formik.errors.username} />

              <Button
                className="rounded-full border border-primary px-5"
                onClick={() => {
                  goTo(step + 1);
                }}
              >
                بعدی
              </Button>
            </div>
          </>,
          <>
            <div
              key={1}
              className="relative flex w-full flex-col items-center justify-center gap-5 "
            >
              <PasswordField
                label={"رمز عبور"}
                value={formik.getFieldProps("password").value}
                onChange={(value: any) => {
                  formik.setFieldValue("password", value.target.value);
                }}
                type="password"
                ref={passwordFieldRef}
                onKeyDown={(e: any) => Enter(e)}
              />

              <InputError message={formik.errors.password} />
              <Button
                className="rounded-full border border-primary px-5"
                onClick={() => {
                  goTo(step + 1);
                }}
              >
                بعدی
              </Button>
            </div>
          </>,
          <span key={2} className="pb-10 text-primary">
            در حال بررسی
          </span>,
          <div
            key={3}
            className="flex flex-col items-center justify-center gap-4"
          >
            <span className="text-red-500">
              رمز عبور یا نام کاربری اشتباه است
            </span>
            <Button
              className="rounded-full border border-primary px-5"
              onClick={() => {
                setStep(0);
              }}
            >
              بازگشت
            </Button>
          </div>,
          <span key={4} className="text-primary">
            خوش آمدید
          </span>,
        ]}
      />
    </form>
  );
}
