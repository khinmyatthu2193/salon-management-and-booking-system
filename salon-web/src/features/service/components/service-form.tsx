"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { Service } from "../hooks/use-services";

interface ServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service | null;
  onSubmit: (data: { name: string; description?: string; price: number; duration: number }) => Promise<void>;
}

export function ServiceForm({ open, onOpenChange, service, onSubmit }: ServiceFormProps) {
  const [formData, setFormData] = useState({ name: "", description: "", price: "", duration: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && service) {
      setFormData({ name: service.name, description: service.description || "", price: String(service.price), duration: String(service.duration) });
    } else if (open) {
      setFormData({ name: "", description: "", price: "", duration: "" });
    }
    setError("");
  }, [open, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await onSubmit({
        name: formData.name,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration, 10),
      });
      onOpenChange(false);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Add Service"}</DialogTitle>
        </DialogHeader>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" autoComplete="off" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input id="description" autoComplete="off" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" type="number" step="0.01" min="0" autoComplete="off" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input id="duration" type="number" min="1" autoComplete="off" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
