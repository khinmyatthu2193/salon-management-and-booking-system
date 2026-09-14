import {
  LayoutDashboard,
  Scissors,
  Users,
  Calendar,
  Settings,
  User,
  Store,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type Role = "owner" | "manager" | "staff" | "customer";

export const navConfig: Record<Role, NavItem[]> = {
  owner: [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Salons", url: "/admin/salons", icon: Scissors },
    { title: "Managers", url: "/admin/managers", icon: Users },
    { title: "Staff", url: "/admin/staff", icon: Users },
    { title: "Services", url: "/admin/services", icon: Scissors },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ],
  manager: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Staff", url: "/staff", icon: Users },
    { title: "Services", url: "/services", icon: Scissors },
    { title: "Appointments", url: "/appointments", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  staff: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Schedule", url: "/schedule", icon: Calendar },
    { title: "Profile", url: "/profile", icon: User },
  ],
  customer: [
    { title: "Browse Salons", url: "/salons", icon: Store },
    { title: "My Appointments", url: "/appointments", icon: Calendar },
    { title: "Profile", url: "/profile", icon: User },
  ],
};
