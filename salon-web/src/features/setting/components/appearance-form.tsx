"use client";

import { Button } from "@/components/ui/button";

export function AppearanceForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of the application.
        </p>
      </div>
      <hr className="border-border" />
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Theme settings are available in the sidebar footer. Switch between dark and blush themes.
        </p>
        <div className="flex justify-end">
          <Button disabled>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
