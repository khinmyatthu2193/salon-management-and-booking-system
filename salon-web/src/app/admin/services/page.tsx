"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ServiceList, ServiceForm, useServiceStore, type Service } from "@/features/service";
import { useUserSalon } from "@/hooks/use-user-salon";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PlusIcon, ChevronDownIcon } from "lucide-react";

export default function AdminServicesPage() {
  const { salons, isLoading: salonsLoading } = useUserSalon();
  const { services, fetchAllServices, createService, updateService } = useServiceStore();

  useEffect(() => { fetchAllServices(); }, [fetchAllServices]);

  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const selectedSalonName = salons.find((s) => s.id === selectedSalonId)?.name ?? "All Salons";

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["owner"]}>
        <div className="space-y-4">
          <PageHeader
            title="Services"
            description="Manage salon services, pricing, and duration."
            action={
              <Button onClick={() => { setEditingService(null); setShowForm(true); }}>
                <PlusIcon className="size-4" /> Add Service
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

              <ServiceList
                selectedSalonId={selectedSalonId}
                allServices={services}
                onEdit={(s) => { setEditingService(s); setShowForm(true); }}
                onRefresh={() => fetchAllServices()}
              />
            </>
          )}
        </div>

        <ServiceForm
          open={showForm}
          onOpenChange={(open) => { setShowForm(open); if (!open) setEditingService(null); }}
          service={editingService}
          onSubmit={editingService ? (data) => updateService(editingService.id, data) : (data) => createService(data)}
        />
      </RoleGuard>
    </ProtectedLayout>
  );
}
