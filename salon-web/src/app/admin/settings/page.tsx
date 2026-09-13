"use client";

import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";

export default function AdminSettingsPage() {
  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["owner"]}>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Owner settings coming soon.</p>
        </div>
      </RoleGuard>
    </ProtectedLayout>
  );
}
