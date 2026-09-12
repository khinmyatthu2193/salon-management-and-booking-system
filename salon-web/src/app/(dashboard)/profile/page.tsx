import { RoleGuard } from "@/components/role-guard";

export default function ProfilePage() {
  return (
    <RoleGuard allowedRoles={["staff"]}>
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your profile information</p>
      </div>
    </RoleGuard>
  );
}
