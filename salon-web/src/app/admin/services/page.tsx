"use client";

import { PageHeader } from "@/components/page-header";
import { ProtectedLayout } from "@/components/protected-layout";
import { RoleGuard } from "@/components/role-guard";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	ServiceForm,
	ServiceList,
	useServiceStore,
	type Service,
} from "@/features/service";
import { useUserSalon } from "@/hooks/use-user-salon";
import { CheckIcon, ChevronDownIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminServicesPage() {
	const { salons, isLoading: salonsLoading } = useUserSalon();
	const { services, fetchAllServices, createService, updateService } =
		useServiceStore();

	useEffect(() => {
		fetchAllServices();
	}, [fetchAllServices]);

	const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [editingService, setEditingService] = useState<Service | null>(null);

	const selectedSalonName =
		salons.find((s) => s.id === selectedSalonId)?.name ?? "All Salons";
	const [search, setSearch] = useState("");

	return (
		<ProtectedLayout>
			<RoleGuard allowedRoles={["owner"]}>
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

					{salonsLoading ? (
						<p className="text-muted-foreground">Loading...</p>
					) : salons.length === 0 ? (
						<p className="text-muted-foreground">
							No salons yet. Create a salon first.
						</p>
					) : (
						<>
							<div className="flex items-center gap-3 h-9">
								<div className="relative flex-1 max-w-sm h-full">
									<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
									<Input
										placeholder="Search services..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="pl-9 h-full"
									/>
								</div>

								<DropdownMenu>
									<DropdownMenuTrigger
										render={
											<button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted" />
										}>
										{selectedSalonName}
										<ChevronDownIcon className="size-4 text-muted-foreground" />
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="start"
										className="w-48">
										<DropdownMenuItem
											onClick={() => setSelectedSalonId(null)}
											className="flex items-center gap-2">
											<span className="w-4">
												{selectedSalonId === null && (
													<CheckIcon className="size-4" />
												)}
											</span>
											All Salons
										</DropdownMenuItem>
										{salons.map((s) => (
											<DropdownMenuItem
												key={s.id}
												onClick={() => setSelectedSalonId(s.id)}
												className="flex items-center gap-2">
												<span className="w-4">
													{selectedSalonId === s.id && (
														<CheckIcon className="size-4" />
													)}
												</span>
												{s.name}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							<ServiceList
								selectedSalonId={selectedSalonId}
								allServices={services}
								onEdit={(s) => {
									setEditingService(s);
									setShowForm(true);
								}}
								onRefresh={() => fetchAllServices()}
							/>
						</>
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
