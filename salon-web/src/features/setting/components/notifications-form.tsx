"use client";

import { Button } from "@/components/ui/button";

export function NotificationsForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <hr className="border-border" />
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Notification settings coming soon.
        </p>
        <div className="flex justify-end">
          <Button disabled>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
