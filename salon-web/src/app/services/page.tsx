"use client";

import { PageHeader } from "@/components/page-header";
import { ProtectedLayout } from "@/components/protected-layout";
import { RoleGuard } from "@/components/role-guard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	ServiceForm,
	ServiceList,
	useServiceStore,
	type Service,
} from "@/features/service";
import { useUserSalon } from "@/hooks/use-user-salon";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function ServicesPage() {
	const { salonId, isLoading } = useUserSalon();
	const { createService, updateService } = useServiceStore();

	const [showForm, setShowForm] = useState(false);
	const [editingService, setEditingService] = useState<Service | null>(null);

	return (
		<ProtectedLayout>
			<RoleGuard allowedRoles={["manager"]}>
				<div className="space-y-4">
					<PageHeader
						title="Services"
						description="Manage salon services, pricing, and duration."
						action={
							<Button
								onClick={() => {
									setEditingService(null);
									setShowForm(true);
								}}>
								<PlusIcon className="size-4" /> Add Service
							</Button>
						}
					/>
					<Separator />

					{isLoading ? (
						<p className="text-muted-foreground">Loading...</p>
					) : salonId ? (
						<ServiceList
							salonId={salonId}
							onEdit={(s) => {
								setEditingService(s);
								setShowForm(true);
							}}
						/>
					) : (
						<p className="text-muted-foreground">
							No salons yet. Create a salon first.
						</p>
					)}
				</div>

				<ServiceForm
					open={showForm}
					onOpenChange={(open) => {
						setShowForm(open);
						if (!open) setEditingService(null);
					}}
					service={editingService}
					onSubmit={
						editingService
							? (data) => updateService(editingService.id, data)
							: (data) => createService(data)
					}
				/>
			</RoleGuard>
		</ProtectedLayout>
	);
}
