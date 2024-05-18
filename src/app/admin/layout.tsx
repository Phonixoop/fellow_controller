import { getServerSession } from "next-auth";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <div>
      AdminLayout
      {session?.user.name}
      {children}
    </div>
  );
}
