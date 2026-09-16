"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { StaffList, StaffForm, useStaffStore, type Staff } from "@/features/staff";
import { useUserSalon } from "@/hooks/use-user-salon";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function AdminStaffPage() {
  const { salons, isLoading: salonsLoading } = useUserSalon();
  const { staff, fetchAllStaff, addStaff, updateStaff } = useStaffStore();

  useEffect(() => { fetchAllStaff(); }, [fetchAllStaff]);

  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["owner"]}>
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

          {salonsLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : salons.length === 0 ? (
            <p className="text-muted-foreground">No salons yet. Create a salon first.</p>
          ) : (
            <StaffList
              selectedSalonId={selectedSalonId}
              allStaff={staff}
              salons={salons}
              onSalonChange={setSelectedSalonId}
              onEdit={(s) => { setEditingStaff(s); setShowForm(true); }}
              onRefresh={() => fetchAllStaff()}
            />
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
