import { RoleGuard } from "@/components/role-guard";

export default function StaffPage() {
  return (
    <RoleGuard allowedRoles={["owner", "manager"]}>
      <div>
        <h1 className="text-2xl font-bold">Staff</h1>
        <p className="text-muted-foreground mt-2">Manage staff in your salon</p>
      </div>
    </RoleGuard>
  );
}
