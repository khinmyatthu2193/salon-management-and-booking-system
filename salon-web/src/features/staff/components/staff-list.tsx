"use client";

import { useEffect, useState } from "react";
import { useStaffStore, type Staff } from "../hooks/use-staff";
import { StaffAssignDialog } from "./staff-assign-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PencilIcon, Trash2Icon, LinkIcon } from "lucide-react";

interface StaffListSalonProps {
  salonId: string;
  onEdit: (staff: Staff) => void;
}

interface StaffListAdminProps {
  selectedSalonId: string | null;
  allStaff: Staff[];
  onEdit: (staff: Staff) => void;
  onRefresh: () => void;
}

type StaffListProps = StaffListSalonProps | StaffListAdminProps;

function isAdminProps(props: StaffListProps): props is StaffListAdminProps {
  return "selectedSalonId" in props;
}

export function StaffList(props: StaffListProps) {
  const { staff: storeStaff, isLoading, fetchSalonStaff, removeStaff } = useStaffStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [assignStaffId, setAssignStaffId] = useState<string | null>(null);

  // Manager mode: fetch salon-specific staff
  const salonId = !isAdminProps(props) ? props.salonId : undefined;
  useEffect(() => {
    if (salonId) fetchSalonStaff(salonId);
  }, [salonId, fetchSalonStaff]);

  // Determine which staff to display
  let displayStaff: Staff[];
  if (isAdminProps(props)) {
    const { selectedSalonId, allStaff } = props;
    displayStaff = selectedSalonId
      ? allStaff.filter((s) => s.salonId === selectedSalonId)
      : allStaff;
  } else {
    displayStaff = storeStaff;
  }

  const handleDelete = async () => {
    if (!deleteId) return;
    await removeStaff(deleteId);
    setDeleteId(null);
  };

  const handleRefresh = () => {
    if (isAdminProps(props)) {
      props.onRefresh();
    } else if (salonId) {
      fetchSalonStaff(salonId);
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : displayStaff.length === 0 ? (
        <p className="text-muted-foreground">No staff members yet.</p>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Specialty</TableHead>
                {isAdminProps(props) && <TableHead>Assigned Salon</TableHead>}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayStaff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.user?.name || "—"}</TableCell>
                  <TableCell>{s.user?.email || "—"}</TableCell>
                  <TableCell>{s.user?.phone || "—"}</TableCell>
                  <TableCell>{s.specialty || "—"}</TableCell>
                  {isAdminProps(props) && (
                    <TableCell>{s.salon?.name || "Unassigned"}</TableCell>
                  )}
                  <TableCell>
                    <div className="flex gap-1">
                      {isAdminProps(props) && !s.salonId && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title="Assign to salon"
                          onClick={() => setAssignStaffId(s.id)}
                        >
                          <LinkIcon className="size-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon-sm" onClick={() => props.onEdit(s)}>
                        <PencilIcon className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setDeleteId(s.id)}>
                        <Trash2Icon className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {isAdminProps(props) && (
        <StaffAssignDialog
          staffId={assignStaffId}
          onOpenChange={(open) => { if (!open) setAssignStaffId(null); }}
          onAssigned={() => { setAssignStaffId(null); props.onRefresh(); }}
        />
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this staff member? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
