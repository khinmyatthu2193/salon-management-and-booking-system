"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
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

	useEffect(() => {
		fetchSalons();
	}, [fetchSalons]);

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

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : salons.length === 0 ? (
				<p className="text-muted-foreground">
					No salons yet. Create your first salon!
				</p>
			) : (
				<div className="rounded-lg border border-border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Address</TableHead>
								<TableHead>Staff</TableHead>
								<TableHead>Services</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{salons.map((salon) => (
								<TableRow key={salon.id}>
									<TableCell className="font-medium">{salon.name}</TableCell>
									<TableCell>{salon.address}</TableCell>
									<TableCell>{salon._count?.staff ?? 0}</TableCell>
									<TableCell>{salon._count?.services ?? 0}</TableCell>
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

			<AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Salon</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this salon? This action cannot be undone.
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
