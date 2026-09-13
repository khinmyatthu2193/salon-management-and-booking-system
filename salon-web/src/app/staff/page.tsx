"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { StaffList, StaffForm, useStaffStore, type Staff } from "@/features/staff";
import { useUserSalon } from "@/hooks/use-user-salon";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function StaffPage() {
  const user = useAuthStore((s) => s.user);
  const { salonId, setSalonId, salons, isLoading } = useUserSalon();
  const { addStaff, updateStaff } = useStaffStore();
  const isOwner = user?.role?.toLowerCase() === "owner";

  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["owner", "manager"]}>
        <div className="space-y-4">
          <PageHeader
            title="Staff"
            description="Add, edit, and manage staff members."
            action={
              <Button onClick={() => { setEditingStaff(null); setShowForm(true); }}>
                <PlusIcon className="size-4" /> Add Staff
              </Button>
            }
          />
          <Separator />

          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : salonId ? (
            <>
              {isOwner && salons.length > 1 && (
                <div className="flex items-center gap-2">
                  <label htmlFor="salon-select" className="text-sm font-medium">Salon:</label>
                  <select
                    id="salon-select"
                    value={salonId}
                    onChange={(e) => setSalonId(e.target.value)}
                    className="rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {salons.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <StaffList salonId={salonId} onEdit={(s) => { setEditingStaff(s); setShowForm(true); }} />
            </>
          ) : (
            <p className="text-muted-foreground">No salons yet. Create a salon first.</p>
          )}
        </div>

        <StaffForm
          open={showForm}
          onOpenChange={(open) => { setShowForm(open); if (!open) setEditingStaff(null); }}
          staff={editingStaff}
          onSubmit={editingStaff ? (data) => updateStaff(editingStaff.id, data) : (data) => addStaff(data)}
        />
      </RoleGuard>
    </ProtectedLayout>
  );
}
