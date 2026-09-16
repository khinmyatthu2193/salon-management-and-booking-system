"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RefreshCwIcon } from "lucide-react";
import { CredentialsDisplayDialog } from "@/features/staff/components/credentials-display-dialog";
import type { Manager } from "../hooks/use-managers";

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
  manager?: Manager | null;
  onSubmit: (data: any) => Promise<void>;
}

export function ManagerForm({ open, onOpenChange, manager, onSubmit }: ManagerFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ name: string; email: string; password: string } | null>(null);

  const isEditing = !!manager;

  useEffect(() => {
    if (open && manager) {
      setFormData({
        name: manager.user?.name || "",
        email: manager.user?.email || "",
        password: "",
        phone: manager.user?.phone || "",
        address: manager.user?.address || "",
      });
    } else if (open) {
      setFormData({ name: "", email: "", password: "", phone: "", address: "" });
    }
    setError("");
  }, [open, manager]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (isEditing) {
        await onSubmit({
          phone: formData.phone,
          address: formData.address,
        });
        onOpenChange(false);
      } else {
        const credentials = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

        await onSubmit({ ...formData, phone: formData.phone });

        onOpenChange(false);
        setCreatedCredentials(credentials);
        setShowCredentials(true);

        setFormData({ name: "", email: "", password: "", phone: "", address: "" });
      }
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
          <DialogTitle>{isEditing ? "Edit Manager" : "Add Manager"}</DialogTitle>
        </DialogHeader>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {!isEditing && (
            <>
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
            </>
          )}
          {isEditing && (
            <p className="text-sm text-muted-foreground">Editing {manager.user?.name}'s contact info.</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" autoComplete="off" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" autoComplete="off" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Saving..." : isEditing ? "Save Changes" : "Create Manager"}</Button>
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
