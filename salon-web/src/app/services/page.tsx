"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/role-guard";
import { ProtectedLayout } from "@/components/protected-layout";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ServiceList, ServiceForm, useServiceStore, type Service } from "@/features/service";
import { useUserSalon } from "@/hooks/use-user-salon";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function ServicesPage() {
  const user = useAuthStore((s) => s.user);
  const { salonId, setSalonId, salons, isLoading } = useUserSalon();
  const { createService, updateService } = useServiceStore();
  const isOwner = user?.role?.toLowerCase() === "owner";

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["owner", "manager"]}>
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
              <ServiceList salonId={salonId} onEdit={(s) => { setEditingService(s); setShowForm(true); }} />
            </>
          ) : (
            <p className="text-muted-foreground">No salons yet. Create a salon first.</p>
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
