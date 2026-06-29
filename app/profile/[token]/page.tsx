import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CalendarDays, Mail } from "lucide-react";

export default async function ProfilePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const user = await db.user.findUnique({
    where: { profileToken: token },
    include: { items: true },
  });

  if (!user) return notFound();

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        <Avatar className="w-32 h-32 border border-slate-200 shadow-sm">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="text-3xl bg-slate-100 text-slate-400 font-bold">
            {user.name?.[0]}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 mb-2">{user.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 mt-4">
             <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
             </div>
             <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm">Joined {user.createdAt.toLocaleDateString("tr-TR", { month: 'long', year: 'numeric' })}</span>
             </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-orange-600" />
                My Recipes
            </h2>
            <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                {user.items.length} Total
            </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {user.items.length > 0 ? (
            user.items.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all border-slate-100 overflow-hidden">
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">{item.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Henüz bir tarif eklemedin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}