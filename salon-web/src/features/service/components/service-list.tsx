"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { LinkIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useServiceStore, type Service } from "../hooks/use-services";
import { ServiceAssignDialog } from "./service-assign-dialog";

interface ServiceListSalonProps {
	salonId: string;
	onEdit: (service: Service) => void;
}

interface ServiceListAdminProps {
	selectedSalonId: string | null;
	allServices: Service[];
	onEdit: (service: Service) => void;
	onRefresh: () => void;
}

type ServiceListProps = ServiceListSalonProps | ServiceListAdminProps;

function isAdminProps(props: ServiceListProps): props is ServiceListAdminProps {
	return "selectedSalonId" in props;
}

export function ServiceList(props: ServiceListProps) {
	const {
		services: storeServices,
		isLoading,
		fetchSalonServices,
		deleteService,
	} = useServiceStore();
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [assignServiceId, setAssignServiceId] = useState<string | null>(null);
	const [assignmentFilter, setAssignmentFilter] = useState("all");

	const assignmentOptions = [
		{ value: "all", label: "All" },
		{ value: "assigned", label: "Assigned" },
		{ value: "unassigned", label: "Unassigned" },
	];
	const selectedAssignment = assignmentOptions.find(
		(o) => o.value === assignmentFilter,
	);

	// Manager mode: fetch salon-specific services
	const salonId = !isAdminProps(props) ? props.salonId : undefined;
	useEffect(() => {
		if (salonId) fetchSalonServices(salonId);
	}, [salonId, fetchSalonServices]);

	// Determine which services to display
	let displayServices: Service[];
	if (isAdminProps(props)) {
		const { selectedSalonId, allServices } = props;
		displayServices = selectedSalonId
			? allServices.filter((s) => s.salonId === selectedSalonId)
			: allServices;
	} else {
		displayServices = storeServices;
	}

	const filteredServices = useMemo(() => {
		return displayServices.filter((svc) => {
			const matchesAssignment =
				assignmentFilter === "all" ||
				(assignmentFilter === "assigned" && svc.salonId) ||
				(assignmentFilter === "unassigned" && !svc.salonId);
			return matchesAssignment;
		});
	}, [displayServices, assignmentFilter]);

	const handleDelete = async () => {
		if (!deleteId) return;
		await deleteService(deleteId);
		setDeleteId(null);
	};

	const handleRefresh = () => {
		if (isAdminProps(props)) {
			props.onRefresh();
		} else if (salonId) {
			fetchSalonServices(salonId);
		}
	};

	return (
		<div className="space-y-4">
			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : filteredServices.length === 0 ? (
				<p className="text-muted-foreground">
					{displayServices.length === 0
						? "No services yet."
						: "No services match your search."}
				</p>
			) : (
				<div className="rounded-lg border border-border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Duration</TableHead>
								{isAdminProps(props) && <TableHead>Assigned Salon</TableHead>}
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredServices.map((svc) => (
								<TableRow key={svc.id}>
									<TableCell className="font-medium">{svc.name}</TableCell>
									<TableCell>{svc.description || "—"}</TableCell>
									<TableCell>${Number(svc.price).toFixed(2)}</TableCell>
									<TableCell>{svc.duration} min</TableCell>
									{isAdminProps(props) && (
										<TableCell>{svc.salon?.name || "Unassigned"}</TableCell>
									)}
									<TableCell>
										<div className="flex gap-1">
											{isAdminProps(props) && !svc.salonId && (
												<Button
													variant="ghost"
													size="icon-sm"
													title="Assign to salon"
													onClick={() => setAssignServiceId(svc.id)}>
													<LinkIcon className="size-4" />
												</Button>
											)}
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => props.onEdit(svc)}>
												<PencilIcon className="size-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => setDeleteId(svc.id)}>
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
				<ServiceAssignDialog
					serviceId={assignServiceId}
					onOpenChange={(open) => {
						if (!open) setAssignServiceId(null);
					}}
					onAssigned={() => {
						setAssignServiceId(null);
						props.onRefresh();
					}}
				/>
			)}

			<AlertDialog
				open={deleteId !== null}
				onOpenChange={(open) => {
					if (!open) setDeleteId(null);
				}}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Service</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this service? This action cannot
							be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={handleDelete}>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
