"use client";

import React, { useState } from "react";
import FormBuilder from "~/app/form/form";
import BlurBackground from "~/ui/blur-backgrounds";

export default function FormPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-accent/5 ">
      <BlurBackground />
      <FormBuilder />
    </div>
  );
}
