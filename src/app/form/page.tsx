"use client";

import React, { useState } from "react";
import FormBuilder from "~/app/form/form";
import BlurBackground from "~/ui/blur-backgrounds";
import { Container } from "~/ui/containers";

export default function FormPage() {
  return (
    <div
      dir="rtl"
      className="m-auto flex min-h-screen w-full max-w-[1920px] flex-col items-center bg-secondary"
    >
      <Container rtl className="flex w-full items-center justify-center ">
        <BlurBackground />

        <FormBuilder />
      </Container>
    </div>
  );
}
