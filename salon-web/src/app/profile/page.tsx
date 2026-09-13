"use client";

import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["staff"]}>
        <div className="space-y-6">
          <PageHeader
            title="My Profile"
            description="View and manage your profile information."
          />
          <Separator />
          {user && (
            <div className="rounded-lg border border-border p-6 space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Name</span>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Email</span>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Role</span>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </RoleGuard>
    </ProtectedLayout>
  );
}
