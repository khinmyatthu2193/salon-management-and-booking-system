"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { EyeIcon, EyeOffIcon, CopyIcon, CheckIcon } from "lucide-react";

interface CredentialsDisplayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credentials: {
    name: string;
    email: string;
    password: string;
  } | null;
}

export function CredentialsDisplayDialog({
  open,
  onOpenChange,
  credentials,
}: CredentialsDisplayDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  if (!credentials) return null;

  const credentialsText = `New Account Created
Name: ${credentials.name}
Email: ${credentials.email}
Password: ${credentials.password}

Please save this password. It will not be shown again.`;

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(credentialsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(credentials.password);
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-green-600">✓ Account Created Successfully</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <p className="text-sm text-yellow-800 font-medium">
              Save these credentials now. This password will not be shown again.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-sm">{credentials.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm">{credentials.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 bg-muted px-2 py-1 rounded text-sm font-mono">
                  {showPassword ? credentials.password : "••••••••"}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={handleCopyPassword}
                  title="Copy password"
                >
                  {copiedPassword ? (
                    <CheckIcon className="size-4 text-green-600" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleCopyAll}
          >
            {copied ? (
              <>
                <CheckIcon className="size-4 mr-2" />
                Copied to Clipboard
              </>
            ) : (
              <>
                <CopyIcon className="size-4 mr-2" />
                Copy All Credentials
              </>
            )}
          </Button>
        </div>

        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
