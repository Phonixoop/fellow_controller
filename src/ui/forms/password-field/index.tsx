import React, { useState } from "react";
import TextField from "~/ui/forms/text-field";
import withLabel from "~/ui/forms/with-label";
import Button from "~/ui/buttons";
import { ClosedEyeIcon, OpenEyeIcon } from "~/ui/icons/eyes";

const TextFieldWithLable = withLabel(TextField);

export default function PasswordField({ value, ref = undefined, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex  items-center justify-center gap-2">
      <TextFieldWithLable
        value={value}
        ref={ref}
        {...rest}
        type={isOpen ? "text" : "password"}
      />
      <Button
        className="rounded-full bg-primbuttn fill-secbuttn p-1 "
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <OpenEyeIcon /> : <ClosedEyeIcon />}
      </Button>
    </div>
  );
}
