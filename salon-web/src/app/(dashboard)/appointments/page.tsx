import { RoleGuard } from "@/components/role-guard";

export default function AppointmentsPage() {
  return (
    <RoleGuard allowedRoles={["manager"]}>
      <div>
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-muted-foreground mt-2">View and manage appointments</p>
      </div>
    </RoleGuard>
  );
}
