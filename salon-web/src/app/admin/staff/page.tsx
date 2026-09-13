"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { StaffList, StaffForm, useStaffStore, type Staff } from "@/features/staff";
import { useUserSalon } from "@/hooks/use-user-salon";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PlusIcon, ChevronDownIcon } from "lucide-react";

export default function AdminStaffPage() {
  const { salons, isLoading: salonsLoading } = useUserSalon();
  const { staff, fetchAllStaff, addStaff, updateStaff } = useStaffStore();

  useEffect(() => { fetchAllStaff(); }, [fetchAllStaff]);

  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const selectedSalonName = salons.find((s) => s.id === selectedSalonId)?.name ?? "All Salons";

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
            <>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted" />
                  }
                >
                  {selectedSalonName}
                  <ChevronDownIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setSelectedSalonId(null)}>
                    All Salons
                  </DropdownMenuItem>
                  {salons.map((s) => (
                    <DropdownMenuItem key={s.id} onClick={() => setSelectedSalonId(s.id)}>
                      {s.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <StaffList
                selectedSalonId={selectedSalonId}
                allStaff={staff}
                onEdit={(s) => { setEditingStaff(s); setShowForm(true); }}
                onRefresh={() => fetchAllStaff()}
              />
            </>
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
