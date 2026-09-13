"use client";

import { Button } from "@/components/ui/button";

export function DisplayForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Display</h3>
        <p className="text-sm text-muted-foreground">
          Customize how information is displayed.
        </p>
      </div>
      <hr className="border-border" />
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Display settings coming soon.
        </p>
        <div className="flex justify-end">
          <Button disabled>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
