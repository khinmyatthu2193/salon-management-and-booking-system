"use client";

import { useEffect, useState } from "react";
import { useManagerStore, type Manager } from "../hooks/use-managers";
import { ManagerForm } from "./manager-form";
import { ManagerAssignDialog } from "./manager-assign-dialog";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PlusIcon, LinkIcon, LinkOffIcon, TrashIcon } from "lucide-react";

export function ManagerList() {
  const { managers, isLoading, fetchManagers, createManager, deleteManager } = useManagerStore();
  const [showForm, setShowForm] = useState(false);
  const [assignManagerId, setAssignManagerId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { fetchManagers(); }, [fetchManagers]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteManager(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Managers"
        description="Create and assign managers to salons."
        action={
          <Button onClick={() => setShowForm(true)}>
            <PlusIcon className="size-4" /> Add Manager
          </Button>
        }
      />
      <Separator />

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : managers.length === 0 ? (
        <p className="text-muted-foreground">No managers yet.</p>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Assigned Salon</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managers.map((manager) => (
                <TableRow key={manager.id}>
                  <TableCell className="font-medium">{manager.user?.name || "—"}</TableCell>
                  <TableCell>{manager.user?.email || "—"}</TableCell>
                  <TableCell>{manager.user?.phone || "—"}</TableCell>
                  <TableCell>{manager.salon?.name || "Unassigned"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {!manager.salonId ? (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title="Assign to salon"
                          onClick={() => setAssignManagerId(manager.id)}
                        >
                          <LinkIcon className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          title="Reassign to salon"
                          onClick={() => setAssignManagerId(manager.id)}
                        >
                          <LinkIcon className="size-4 text-muted-foreground" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Delete manager"
                        onClick={() => setDeleteId(manager.id)}
                      >
                        <TrashIcon className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ManagerForm
        open={showForm}
        onOpenChange={setShowForm}
        onSubmit={createManager}
      />

      <ManagerAssignDialog
        managerId={assignManagerId}
        onOpenChange={(open) => { if (!open) setAssignManagerId(null); }}
        onAssigned={() => { setAssignManagerId(null); fetchManagers(); }}
      />

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Manager</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this manager? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
