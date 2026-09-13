"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: API call to update password
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings and change your password.
        </p>
      </div>
      <hr className="border-border" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" placeholder="••••••••" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" placeholder="••••••••" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" placeholder="••••••••" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
