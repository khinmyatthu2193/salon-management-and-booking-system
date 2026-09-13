"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { Salon } from "../hooks/use-salons";

interface SalonFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	salon?: Salon | null;
	onSubmit: (data: {
		name: string;
		address: string;
		phone?: string;
		description?: string;
	}) => Promise<void>;
}

export function SalonForm({
	open,
	onOpenChange,
	salon,
	onSubmit,
}: SalonFormProps) {
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
		description: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (open && salon) {
			setFormData({
				name: salon.name,
				address: salon.address,
				phone: salon.phone || "",
				description: salon.description || "",
			});
		} else if (open) {
			setFormData({ name: "", address: "", phone: "", description: "" });
		}
		setError("");
	}, [open, salon]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			await onSubmit({
				name: formData.name,
				address: formData.address,
				phone: formData.phone || undefined,
				description: formData.description || undefined,
			});
			onOpenChange(false);
		} catch (err: any) {
			setError(
				err.response?.data?.error || err.message || "Something went wrong",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{salon ? "Edit Salon" : "Add Salon"}</DialogTitle>
				</DialogHeader>
				{error && <p className="text-destructive text-sm">{error}</p>}
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
					autoComplete="off">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							autoComplete="off"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							autoComplete="off"
							value={formData.address}
							onChange={(e) =>
								setFormData({ ...formData, address: e.target.value })
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Phone (optional)</Label>
						<Input
							id="phone"
							autoComplete="off"
							value={formData.phone}
							onChange={(e) =>
								setFormData({ ...formData, phone: e.target.value })
							}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description (optional)</Label>
						<Input
							id="description"
							autoComplete="off"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isLoading}>
							{isLoading ? "Saving..." : "Save"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
