import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { Users, Utensils, Star, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const [userCount, recipeCount, reviewCount, recentRecipes] =
    await Promise.all([
      db.user.count(),
      db.item.count(),
      db.review.count(),
      db.item.findMany({
        take: 5,
        orderBy: {
          id: "desc",
        },
      }),
    ]);

  return (
    <div className="w-full p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-slate-500">Welcome back, Administrator.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={userCount.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
          trend="+12% from last month"
        />
        <StatCard
          title="Total Recipes"
          value={recipeCount.toLocaleString()}
          icon={<Utensils className="w-5 h-5" />}
          trend="Updated hourly"
        />
        <StatCard
          title="Total Reviews"
          value={reviewCount.toLocaleString()}
          icon={<Star className="w-5 h-5" />}
          trend="5 new today"
        />
        <StatCard
          title="System Status"
          value="Operational"
          icon={<Activity className="w-5 h-5" />}
          status="active"
        />
      </div>

      <div className="w-full">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Recent Recipes Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {" "}
                    <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {recipe.imageUrl ? (
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Utensils className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      {" "}
                      <p className="font-medium text-sm text-slate-900 truncate">
                        {recipe.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {recipe.cookingTime} m • {recipe.heatLevel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="secondary"
                      className="text-xs hidden sm:flex"
                    >
                      {recipe.categoryId}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  trend,
  status,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  status?: string;
}) {
  return (
    <Card className="border-slate-200 shadow-sm transition-all hover:border-slate-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <div className="text-slate-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {status === "active" ? (
          <Badge
            variant="secondary"
            className="mt-2 bg-emerald-100 text-emerald-700"
          >
            ● Live
          </Badge>
        ) : (
          <p className="text-xs text-slate-500 mt-1">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
}
