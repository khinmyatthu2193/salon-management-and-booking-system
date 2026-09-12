import { RoleGuard } from "@/components/role-guard";

export default function ServicesPage() {
  return (
    <RoleGuard allowedRoles={["owner", "manager"]}>
      <div>
        <h1 className="text-2xl font-bold">Services</h1>
        <p className="text-muted-foreground mt-2">Manage salon services and pricing</p>
      </div>
    </RoleGuard>
  );
}
