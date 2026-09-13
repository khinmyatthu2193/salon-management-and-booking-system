"use client";

import { useEffect, useState } from "react";
import { useStaffStore, type Staff } from "../hooks/use-staff";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PencilIcon, Trash2Icon } from "lucide-react";

interface StaffListProps {
  salonId: string;
  onEdit: (staff: Staff) => void;
}

export function StaffList({ salonId, onEdit }: StaffListProps) {
  const { staff, isLoading, fetchSalonStaff, removeStaff } = useStaffStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { if (salonId) fetchSalonStaff(salonId); }, [salonId, fetchSalonStaff]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await removeStaff(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : staff.length === 0 ? (
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
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.user.name}</TableCell>
                  <TableCell>{s.user.email}</TableCell>
                  <TableCell>{s.user.phone || "—"}</TableCell>
                  <TableCell>{s.specialty || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => onEdit(s)}>
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
