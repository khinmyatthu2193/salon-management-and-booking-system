"use client";

import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

export default function SchedulePage() {
  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["staff"]}>
        <div className="space-y-4">
          <PageHeader
            title="My Schedule"
            description="Upcoming appointments will appear here."
          />
          <Separator />
        </div>
      </RoleGuard>
    </ProtectedLayout>
  );
}
