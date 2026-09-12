"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Scissors,
  Users,
  UserCheck,
  Calendar,
  Settings,
  Briefcase,
  Clock,
  ArrowRight,
} from "lucide-react";

const ROLE_HOME: Record<string, string> = {
  owner: "/dashboard",
  manager: "/dashboard",
  staff: "/dashboard",
};

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface QuickAction {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

function getOwnerStats(): StatCard[] {
  return [
    { title: "Total Salons", value: "—", description: "Active salons", icon: Scissors },
    { title: "Managers", value: "—", description: "Assigned managers", icon: Users },
    { title: "Total Staff", value: "—", description: "Across all salons", icon: UserCheck },
    { title: "Services", value: "—", description: "Active services", icon: Briefcase },
  ];
}

function getManagerStats(): StatCard[] {
  return [
    { title: "Staff Members", value: "—", description: "In your salon", icon: Users },
    { title: "Services", value: "—", description: "Active services", icon: Scissors },
    { title: "Today's Appointments", value: "—", description: "Scheduled today", icon: Calendar },
    { title: "Completed Today", value: "—", description: "Finished", icon: UserCheck },
  ];
}

function getStaffStats(): StatCard[] {
  return [
    { title: "Today's Appointments", value: "—", description: "Scheduled for you", icon: Calendar },
    { title: "Upcoming", value: "—", description: "This week", icon: Clock },
    { title: "Completed", value: "—", description: "This month", icon: UserCheck },
  ];
}

function getOwnerActions(): QuickAction[] {
  return [
    { label: "Manage Salons", href: "/dashboard/salons", icon: Scissors },
    { label: "Add Manager", href: "/dashboard/managers", icon: Users },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
}

function getManagerActions(): QuickAction[] {
  return [
    { label: "Manage Staff", href: "/dashboard/staff", icon: Users },
    { label: "Manage Services", href: "/dashboard/services", icon: Scissors },
    { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
}

function getStaffActions(): QuickAction[] {
  return [
    { label: "My Schedule", href: "/dashboard/schedule", icon: Calendar },
    { label: "My Profile", href: "/dashboard/profile", icon: UserCheck },
  ];
}

function getRoleConfig(role: string) {
  switch (role) {
    case "owner":
      return { stats: getOwnerStats(), actions: getOwnerActions(), greeting: "Owner Dashboard" };
    case "manager":
      return { stats: getManagerStats(), actions: getManagerActions(), greeting: "Manager Dashboard" };
    case "staff":
      return { stats: getStaffStats(), actions: getStaffActions(), greeting: "Staff Dashboard" };
    default:
      return { stats: [], actions: [], greeting: "Dashboard" };
  }
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

  if (!user) {
    router.replace("/login");
    return null;
  }

  const normalizedRole = user.role?.toLowerCase();
  const config = getRoleConfig(normalizedRole);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {config.greeting} &middot; <span className="capitalize font-medium">{normalizedRole}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {config.stats.map((stat) => (
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {config.actions.map((action) => (
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
  );
}
