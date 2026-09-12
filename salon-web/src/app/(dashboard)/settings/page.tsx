import { RoleGuard } from "@/components/role-guard";

export default function SettingsPage() {
  return (
    <RoleGuard allowedRoles={["owner", "manager"]}>
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings</p>
      </div>
    </RoleGuard>
  );
}
