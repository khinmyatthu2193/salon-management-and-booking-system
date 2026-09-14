"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { ProtectedLayout } from "@/components/protected-layout";
import { RoleGuard } from "@/components/role-guard";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scissors,
  Users,
  UserCheck,
  Calendar,
  Settings,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface QuickAction {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

function getManagerActions(): QuickAction[] {
  return [
    { label: "Manage Staff", href: "/staff", icon: Users },
    { label: "Manage Services", href: "/services", icon: Scissors },
    { label: "Appointments", href: "/appointments", icon: Calendar },
    { label: "Settings", href: "/settings", icon: Settings },
  ];
}

function getStaffActions(): QuickAction[] {
  return [
    { label: "My Schedule", href: "/schedule", icon: Calendar },
    { label: "My Profile", href: "/profile", icon: UserCheck },
  ];
}

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const normalizedRole = user.role?.toLowerCase();

  const stats: StatCard[] = normalizedRole === "manager"
    ? [
        { title: "Staff Members", value: "—", description: "In your salon", icon: Users },
        { title: "Services", value: "—", description: "Active services", icon: Scissors },
        { title: "Today's Appointments", value: "—", description: "Scheduled today", icon: Calendar },
      ]
    : [
        { title: "Today's Appointments", value: "—", description: "Scheduled for you", icon: Calendar },
        { title: "Upcoming", value: "—", description: "This week", icon: Clock },
      ];

  const actions = normalizedRole === "manager"
    ? getManagerActions()
    : getStaffActions();

  return (
    <ProtectedLayout>
      <RoleGuard allowedRoles={["manager", "staff"]}>
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user.name}!`}
        description={`${normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1)} Dashboard`}
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
          {actions.map((action) => (
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
