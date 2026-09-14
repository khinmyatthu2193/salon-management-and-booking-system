"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RefreshCwIcon } from "lucide-react";
import { CredentialsDisplayDialog } from "@/features/staff/components/credentials-display-dialog";

function generatePassword(length = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

interface ManagerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
}

export function ManagerForm({ open, onOpenChange, onSubmit }: ManagerFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ name: string; email: string; password: string } | null>(null);

  useEffect(() => {
    if (open) {
      setFormData({ name: "", email: "", password: "", phone: "" });
      setError("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Capture credentials before submission
      const credentials = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await onSubmit({ ...formData, phone: formData.phone || undefined });

      // Close form and show credentials dialog
      onOpenChange(false);
      setCreatedCredentials(credentials);
      setShowCredentials(true);

      // Reset form
      setFormData({ name: "", email: "", password: "", phone: "" });
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Manager</DialogTitle>
        </DialogHeader>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" autoComplete="off" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="off" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <Input id="password" type="password" autoComplete="off" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={6} />
              <Button type="button" variant="outline" size="icon" title="Generate random password" onClick={() => setFormData({ ...formData, password: generatePassword() })}>
                <RefreshCwIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" autoComplete="off" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Creating..." : "Create Manager"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <CredentialsDisplayDialog
      open={showCredentials}
      onOpenChange={setShowCredentials}
      credentials={createdCredentials}
    />
    </>
  );
}
