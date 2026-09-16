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

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

interface SalonFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	salon?: Salon | null;
	onSubmit: (data: {
		name: string;
		address: string;
		phone: string;
		description: string;
		isPublished?: boolean;
		openingHours?: Record<string, string>;
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
		isPublished: true,
		openingHours: {} as Record<string, string>,
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
				isPublished: salon.isPublished ?? true,
				openingHours: (salon.openingHours as Record<string, string>) || {},
			});
		} else if (open) {
			setFormData({
				name: "",
				address: "",
				phone: "",
				description: "",
				isPublished: true,
				openingHours: {},
			});
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
				phone: formData.phone,
				description: formData.description,
				isPublished: formData.isPublished,
				openingHours: Object.keys(formData.openingHours).length > 0 ? formData.openingHours : undefined,
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

	const updateOpeningHours = (day: string, value: string) => {
		setFormData({
			...formData,
			openingHours: { ...formData.openingHours, [day]: value },
		});
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
						<Label htmlFor="phone">Phone</Label>
						<Input
							id="phone"
							autoComplete="off"
							value={formData.phone}
							onChange={(e) =>
								setFormData({ ...formData, phone: e.target.value })
							}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							autoComplete="off"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							required
						/>
					</div>

					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="isPublished"
							checked={formData.isPublished}
							onChange={(e) =>
								setFormData({ ...formData, isPublished: e.target.checked })
							}
							className="h-4 w-4 rounded border-gray-300"
						/>
						<Label htmlFor="isPublished" className="cursor-pointer">
							Published
						</Label>
					</div>

					<div className="space-y-2">
						<Label>Opening Hours (optional)</Label>
						<div className="grid gap-2">
							{DAYS.map((day) => (
								<div key={day} className="flex items-center gap-2">
									<span className="w-24 text-sm capitalize">{day}</span>
									<Input
										autoComplete="off"
										placeholder="9:00-18:00"
										value={formData.openingHours[day] || ""}
										onChange={(e) => updateOpeningHours(day, e.target.value)}
										className="flex-1"
									/>
								</div>
							))}
						</div>
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
