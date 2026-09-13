"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useServiceStore } from "../hooks/use-services";
import api from "@/lib/axios";

interface Salon {
  id: string;
  name: string;
}

interface ServiceAssignDialogProps {
  serviceId: string | null;
  onOpenChange: (open: boolean) => void;
  onAssigned: () => void;
}

export function ServiceAssignDialog({ serviceId, onOpenChange, onAssigned }: ServiceAssignDialogProps) {
  const [salonId, setSalonId] = useState("");
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { assignService } = useServiceStore();

  const open = serviceId !== null;

  useEffect(() => {
    if (open) {
      setSalonId("");
      setError("");
      api.get("/api/salons").then((res) => {
        setSalons(res.data.data.map((s: any) => ({ id: s.id, name: s.name })));
      }).catch(() => {});
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salonId || !serviceId) return;
    setIsLoading(true);
    setError("");
    try {
      await assignService(serviceId, salonId);
      onOpenChange(false);
      onAssigned();
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
          <DialogTitle>Assign Service to Salon</DialogTitle>
        </DialogHeader>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="space-y-2">
            <label htmlFor="salon" className="text-sm font-medium">Salon</label>
            <select
              id="salon"
              autoComplete="off"
              value={salonId}
              onChange={(e) => setSalonId(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              required
            >
              <option value="">Select a salon</option>
              {salons.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Assigning..." : "Assign"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
