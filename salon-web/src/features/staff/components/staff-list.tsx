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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	CheckIcon,
	ChevronDownIcon,
	LinkIcon,
	PencilIcon,
	SearchIcon,
	Trash2Icon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useStaffStore, type Staff } from "../hooks/use-staff";
import { StaffAssignDialog } from "./staff-assign-dialog";

interface StaffListSalonProps {
	salonId: string;
	onEdit: (staff: Staff) => void;
}

interface StaffListAdminProps {
	selectedSalonId: string | null;
	allStaff: Staff[];
	salons: { id: string; name: string }[];
	onSalonChange: (salonId: string | null) => void;
	onEdit: (staff: Staff) => void;
	onRefresh: () => void;
}

type StaffListProps = StaffListSalonProps | StaffListAdminProps;

function isAdminProps(props: StaffListProps): props is StaffListAdminProps {
	return "selectedSalonId" in props;
}

export function StaffList(props: StaffListProps) {
	const {
		staff: storeStaff,
		isLoading,
		fetchSalonStaff,
		removeStaff,
	} = useStaffStore();
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [assignStaffId, setAssignStaffId] = useState<string | null>(null);
	const [search, setSearch] = useState("");

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

	const filteredStaff = useMemo(() => {
		return displayStaff.filter((s) => {
			return (
				search === "" ||
				s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
				s.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
				s.user?.phone?.toLowerCase().includes(search.toLowerCase()) ||
				s.specialty?.toLowerCase().includes(search.toLowerCase()) ||
				s.salon?.name?.toLowerCase().includes(search.toLowerCase())
			);
		});
	}, [displayStaff, search]);

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

	const selectedSalonName = isAdminProps(props)
		? (props.salons.find((s) => s.id === props.selectedSalonId)?.name ??
			"All Salons")
		: "";

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="relative flex-1 max-w-sm">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						placeholder="Search staff..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pl-9"
					/>
				</div>
				{isAdminProps(props) && (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium hover:bg-muted shrink-0 hover:cursor-pointer" />
							}>
							{selectedSalonName}
							<ChevronDownIcon className="size-4 text-muted-foreground" />
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="start"
							className="w-48">
							<DropdownMenuItem
								onClick={() => props.onSalonChange(null)}
								className="flex items-center gap-2">
								<span className="w-4">
									{props.selectedSalonId === null && (
										<CheckIcon className="size-4" />
									)}
								</span>
								All Salons
							</DropdownMenuItem>
							{props.salons.map((s) => (
								<DropdownMenuItem
									key={s.id}
									onClick={() => props.onSalonChange(s.id)}
									className="flex items-center gap-2">
									<span className="w-4">
										{props.selectedSalonId === s.id && (
											<CheckIcon className="size-4" />
										)}
									</span>
									{s.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : filteredStaff.length === 0 ? (
				<p className="text-muted-foreground">
					{displayStaff.length === 0
						? "No staff members yet."
						: "No staff match your search."}
				</p>
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
							{filteredStaff.map((s) => (
								<TableRow key={s.id}>
									<TableCell className="font-medium">
										{s.user?.name || "—"}
									</TableCell>
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
													onClick={() => setAssignStaffId(s.id)}>
													<LinkIcon className="size-4" />
												</Button>
											)}
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => props.onEdit(s)}>
												<PencilIcon className="size-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => setDeleteId(s.id)}>
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
					onOpenChange={(open) => {
						if (!open) setAssignStaffId(null);
					}}
					onAssigned={() => {
						setAssignStaffId(null);
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
						<AlertDialogTitle>Remove Staff Member</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to remove this staff member? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							variant="destructive"
							onClick={handleDelete}>
							Remove
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
