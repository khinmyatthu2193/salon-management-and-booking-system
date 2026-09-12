import { RoleGuard } from "@/components/role-guard";

export default function SchedulePage() {
  return (
    <RoleGuard allowedRoles={["staff"]}>
      <div>
        <h1 className="text-2xl font-bold">My Schedule</h1>
        <p className="text-muted-foreground mt-2">View your upcoming appointments</p>
      </div>
    </RoleGuard>
  );
}
