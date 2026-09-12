import { RoleGuard } from "@/components/role-guard";

export default function ManagersPage() {
  return (
    <RoleGuard allowedRoles={["owner"]}>
      <div>
        <h1 className="text-2xl font-bold">Managers</h1>
        <p className="text-muted-foreground mt-2">Create and assign managers to salons</p>
      </div>
    </RoleGuard>
  );
}
