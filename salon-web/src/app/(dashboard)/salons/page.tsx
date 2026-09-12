import { RoleGuard } from "@/components/role-guard";

export default function SalonsPage() {
  return (
    <RoleGuard allowedRoles={["owner"]}>
      <div>
        <h1 className="text-2xl font-bold">Salons</h1>
        <p className="text-muted-foreground mt-2">Manage your salons</p>
      </div>
    </RoleGuard>
  );
}
