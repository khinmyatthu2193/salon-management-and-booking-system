"use client";

import { PageHeader } from "@/components/page-header";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
	PencilIcon,
	PlusIcon,
	SearchIcon,
	StarIcon,
	Trash2Icon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSalonStore, type Salon } from "../hooks/use-salons";
import { SalonForm } from "./salon-form";

export function SalonList() {
	const {
		salons,
		isLoading,
		fetchSalons,
		createSalon,
		updateSalon,
		deleteSalon,
	} = useSalonStore();
	const [showForm, setShowForm] = useState(false);
	const [editingSalon, setEditingSalon] = useState<Salon | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const statusOptions = [
		{ value: "all", label: "All Status" },
		{ value: "active", label: "Active" },
		{ value: "inactive", label: "Inactive" },
	];
	const selectedStatus = statusOptions.find((o) => o.value === statusFilter);

	useEffect(() => {
		fetchSalons();
	}, [fetchSalons]);

	const filteredSalons = useMemo(() => {
		return salons.filter((salon) => {
			const matchesSearch =
				search === "" ||
				salon.name.toLowerCase().includes(search.toLowerCase()) ||
				salon.phone?.toLowerCase().includes(search.toLowerCase()) ||
				salon.address.toLowerCase().includes(search.toLowerCase());
			const matchesStatus =
				statusFilter === "all" ||
				(statusFilter === "active" && salon.isPublished) ||
				(statusFilter === "inactive" && !salon.isPublished);
			return matchesSearch && matchesStatus;
		});
	}, [salons, search, statusFilter]);

	const handleEdit = (salon: Salon) => {
		setEditingSalon(salon);
		setShowForm(true);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		await deleteSalon(deleteId);
		setDeleteId(null);
	};

	return (
		<div className="space-y-4">
			<PageHeader
				title="Salons"
				description="Manage your salons and their details."
				action={
					<Button
						onClick={() => {
							setEditingSalon(null);
							setShowForm(true);
						}}>
						<PlusIcon className="size-4" /> Add Salon
					</Button>
				}
			/>
			<Separator />

			<div className="flex items-center gap-3">
				<div className="relative flex-1 max-w-sm">
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						placeholder="Search salons..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pl-9"
					/>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5! text-sm font-medium hover:bg-muted shrink-0 hover:cursor-pointer" />
						}>
						{selectedStatus?.label || "All Status"}
						<ChevronDownIcon className="size-4 text-muted-foreground" />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="start"
						className="w-48">
						{statusOptions.map((option) => (
							<DropdownMenuItem
								key={option.value}
								onClick={() => setStatusFilter(option.value)}
								className="flex items-center gap-2">
								<span className="w-4">
									{statusFilter === option.value && (
										<CheckIcon className="size-4" />
									)}
								</span>
								{option.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : filteredSalons.length === 0 ? (
				<p className="text-muted-foreground">
					{salons.length === 0
						? "No salons yet. Create your first salon!"
						: "No salons match your search."}
				</p>
			) : (
				<div className="rounded-lg border border-border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Salon</TableHead>
								<TableHead>Manager</TableHead>
								<TableHead>Phone</TableHead>
								<TableHead>Staff</TableHead>
								<TableHead>Services</TableHead>
								<TableHead>Rating</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredSalons.map((salon) => (
								<TableRow key={salon.id}>
									<TableCell className="font-medium">{salon.name}</TableCell>
									<TableCell>
										{salon.manager?.user ? (
											<div className="flex items-center gap-3">
												<Avatar className="size-8">
													<AvatarImage
														src={
															(salon.manager.user as any).avatar ||
															"/avatars/user-1.webp"
														}
														alt={salon.manager.user.name}
													/>
													<AvatarFallback className="text-xs">
														{salon.manager.user.name
															.split(" ")
															.map((n: string) => n[0])
															.join("")
															.toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className="grid gap-0.5">
													<span className="font-medium leading-none">
														{salon.manager.user.name}
													</span>
													<span className="text-xs text-muted-foreground">
														{salon.manager.user.email}
													</span>
												</div>
											</div>
										) : (
											<span className="text-muted-foreground">—</span>
										)}
									</TableCell>
									<TableCell>{salon.phone || "—"}</TableCell>
									<TableCell>{salon._count?.staff ?? 0}</TableCell>
									<TableCell>{salon._count?.services ?? 0}</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
											<span>{salon.rating.toFixed(1)}</span>
										</div>
									</TableCell>
									<TableCell>
										<span
											className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${salon.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
											{salon.isPublished ? "Active" : "Inactive"}
										</span>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => handleEdit(salon)}>
												<PencilIcon className="size-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => setDeleteId(salon.id)}>
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

			<SalonForm
				open={showForm}
				onOpenChange={(open) => {
					setShowForm(open);
					if (!open) setEditingSalon(null);
				}}
				salon={editingSalon}
				onSubmit={
					editingSalon
						? (data) => updateSalon(editingSalon.id, data)
						: createSalon
				}
			/>

			<AlertDialog
				open={deleteId !== null}
				onOpenChange={(open) => {
					if (!open) setDeleteId(null);
				}}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Salon</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this salon? This action cannot be
							undone.
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
