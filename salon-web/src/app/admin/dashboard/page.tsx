"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { useSalonStore } from "@/features/salon";
import { useCustomerStore } from "@/features/customer";
import { ProtectedLayout } from "@/components/protected-layout";
import { RoleGuard } from "@/components/role-guard";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Scissors,
  Users,
  UserCheck,
  Briefcase,
  ArrowRight,
  TrendingUp,
  DollarSign,
} from "lucide-react";

// --- Demo data ---

const monthlyBookings = [
  { month: "Jan", bookings: 85 },
  { month: "Feb", bookings: 102 },
  { month: "Mar", bookings: 118 },
  { month: "Apr", bookings: 135 },
  { month: "May", bookings: 158 },
  { month: "Jun", bookings: 190 },
  { month: "Jul", bookings: 210 },
  { month: "Aug", bookings: 195 },
  { month: "Sep", bookings: 170 },
  { month: "Oct", bookings: 145 },
  { month: "Nov", bookings: 160 },
  { month: "Dec", bookings: 200 },
];

const salonRevenue = [
  { month: "Jan", revenue: 8500 },
  { month: "Feb", revenue: 10200 },
  { month: "Mar", revenue: 11800 },
  { month: "Apr", revenue: 13500 },
  { month: "May", revenue: 15800 },
  { month: "Jun", revenue: 19000 },
];

const salonTypeBreakdown = [
  { name: "Hair Salon", value: 45, fill: "var(--color-hair)" },
  { name: "Nail Studio", value: 25, fill: "var(--color-nail)" },
  { name: "Spa & Wellness", value: 20, fill: "var(--color-spa)" },
  { name: "Barbershop", value: 10, fill: "var(--color-barber)" },
];

const recentCustomers = [
  { name: "Emma Wilson", email: "emma@example.com", joined: "2 hours ago" },
  { name: "James Chen", email: "james@example.com", joined: "5 hours ago" },
  { name: "Sophia Martinez", email: "sophia@example.com", joined: "1 day ago" },
  { name: "Liam Johnson", email: "liam@example.com", joined: "2 days ago" },
  { name: "Olivia Brown", email: "olivia@example.com", joined: "3 days ago" },
];

const barChartConfig = {
  bookings: {
    label: "Bookings",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

const lineChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig;

const pieChartConfig = {
  hair: { label: "Hair Salon", color: "#8b5cf6" },
  nail: { label: "Nail Studio", color: "#ec4899" },
  spa: { label: "Spa & Wellness", color: "#14b8a6" },
  barber: { label: "Barbershop", color: "#f59e0b" },
} satisfies ChartConfig;

const quickActions = [
  { label: "Manage Salons", href: "/admin/salons", icon: Scissors },
  { label: "Add Manager", href: "/admin/managers", icon: Users },
  { label: "Manage Staff", href: "/admin/staff", icon: Users },
  { label: "Manage Services", href: "/admin/services", icon: Scissors },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { salons, fetchSalons } = useSalonStore();
  const { customers, fetchCustomers } = useCustomerStore();

  useEffect(() => {
    fetchSalons();
    fetchCustomers();
  }, [fetchSalons, fetchCustomers]);

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

          {/* Stat Cards */}
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

          {/* Charts Row */}
          <div className="grid gap-4 lg:grid-cols-7">
            {/* Bar Chart — Monthly Bookings */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="size-4 text-muted-foreground" />
                  Monthly Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                  <BarChart data={monthlyBookings} barSize={28}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={4} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="bookings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Customers */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-base">Recent Customers</CardTitle>
                <p className="text-sm text-muted-foreground">5 new this week</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCustomers.map((customer, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar className="size-9">
                        <AvatarFallback className="text-xs bg-muted">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none">{customer.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {customer.joined}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue + Salon Types Row */}
          <div className="grid gap-4 lg:grid-cols-7">
            {/* Line Chart — Revenue Trend */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="size-4 text-muted-foreground" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={lineChartConfig} className="h-[260px] w-full">
                  <LineChart data={salonRevenue}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={4} width={40} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-primary)"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "var(--color-primary)" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Pie Chart — Salon Type Breakdown */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-base">Salon Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={pieChartConfig} className="h-[260px] w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                      data={salonTypeBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={50}
                      strokeWidth={2}
                      stroke="hsl(var(--background))"
                    >
                      {salonTypeBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30"
                >
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
