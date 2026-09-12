import {
  LayoutDashboard,
  Scissors,
  Users,
  Calendar,
  Settings,
  User,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type Role = "owner" | "manager" | "staff";

export const navConfig: Record<Role, NavItem[]> = {
  owner: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Salons", url: "/dashboard/salons", icon: Scissors },
    { title: "Managers", url: "/dashboard/managers", icon: Users },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  manager: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Staff", url: "/dashboard/staff", icon: Users },
    { title: "Services", url: "/dashboard/services", icon: Scissors },
    { title: "Appointments", url: "/dashboard/appointments", icon: Calendar },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  staff: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Schedule", url: "/dashboard/schedule", icon: Calendar },
    { title: "Profile", url: "/dashboard/profile", icon: User },
  ],
};
