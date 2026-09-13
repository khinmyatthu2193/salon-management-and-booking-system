"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { useSalonStore } from "@/features/salon";
import { ProtectedLayout } from "@/components/protected-layout";
import { RoleGuard } from "@/components/role-guard";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scissors,
  Users,
  UserCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const quickActions = [
  { label: "Manage Salons", href: "/admin/salons", icon: Scissors },
  { label: "Add Manager", href: "/admin/managers", icon: Users },
  { label: "Manage Staff", href: "/admin/staff", icon: Users },
  { label: "Manage Services", href: "/admin/services", icon: Scissors },
];

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { salons, fetchSalons } = useSalonStore();

  useEffect(() => { fetchSalons(); }, [fetchSalons]);

  const totalStaff = salons.reduce((acc, s) => acc + (s._count?.staff ?? 0), 0);
  const totalServices = salons.reduce((acc, s) => acc + (s._count?.services ?? 0), 0);

  const stats = [
    { title: "Total Salons", value: salons.length, description: "Active salons", icon: Scissors },
    { title: "Total Staff", value: totalStaff, description: "Across all salons", icon: Users },
    { title: "Total Services", value: totalServices, description: "Active services", icon: Briefcase },
    { title: "Managers", value: salons.filter((s) => s.manager).length, description: "Assigned", icon: UserCheck },
  ];

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["owner"]}>
        <div className="space-y-8">
          <PageHeader
            title={`Welcome back, ${user?.name}!`}
            description="Owner Dashboard"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <action.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{action.label}</span>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </RoleGuard>
    </ProtectedLayout>
  );
}
