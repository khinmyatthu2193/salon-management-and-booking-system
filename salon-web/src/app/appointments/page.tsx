"use client";

import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

export default function AppointmentsPage() {
  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["manager"]}>
        <div className="space-y-4">
          <PageHeader
            title="Appointments"
            description="View and manage appointments."
          />
          <Separator />
        </div>
      </RoleGuard>
    </ProtectedLayout>
  );
}
