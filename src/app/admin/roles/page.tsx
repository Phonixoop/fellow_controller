"use client";
import React, { useEffect, useState } from "react";

import { Role } from "@prisma/client";

import { Container } from "~/ui/containers";

import { RoleForm } from "~/app/admin/roles/form";
import { RolesList } from "~/app/admin/roles/list";

export default function RolesPage() {
  return (
    <Container
      rtl
      className="flex flex-col-reverse items-stretch gap-10  py-10 2xl:flex-row "
    >
      <RoleContaier />
    </Container>
  );
}

function RoleContaier() {
  "use client";

  const [role, setRole] = useState<Role>();
  return (
    <>
      <div className="sticky top-5 h-fit rounded-lg border border-accent/30 bg-secondary p-5 2xl:w-6/12">
        <RoleForm
          selectedRole={role}
          onClear={() => {
            setRole(undefined);
          }}
        />
      </div>

      <RolesList
        onChange={(role) => {
          setRole(role);
        }}
      />
    </>
  );
}
