import { db } from "@/lib/db";
import { EditUserDialog } from "@/components/admin/edit-user-dialog";
import { DeleteUserDialog } from "@/components/admin/delete-user-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg bg-card flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2 border-t pt-2">
              <EditUserDialog user={user} />
              <DeleteUserDialog userId={user.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block w-full overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50/50">
              <th className="p-4 w-1/2">Name</th>
              <th className="p-4 w-1/3">Email</th>
              <th className="p-4 w-1/6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50/50">
                <td className="p-4 flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user.name}</span>
                </td>
                <td className="p-4 truncate text-sm">{user.email}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <EditUserDialog user={user} />
                    <DeleteUserDialog userId={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}