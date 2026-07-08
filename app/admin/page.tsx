import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Utensils, Star, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, Administrator. Here is an overview of your platform.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,284" icon={<Users className="h-4 w-4" />} />
        <StatCard title="Total Recipes" value="342" icon={<Utensils className="h-4 w-4" />} />
        <StatCard title="Pending Reviews" value="23" icon={<Star className="h-4 w-4" />} />
        <StatCard title="System Status" value="Operational" icon={<Settings className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Manage your latest culinary entries here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}