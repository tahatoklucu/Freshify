import { db } from "@/lib/db";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <table className="w-full text-left table-fixed border-collapse">
        <thead>
          <tr className="border-b">
            <th className="pb-3 w-1/2">Name</th>
            <th className="pb-3 w-1/3">Email</th>
            <th className="pb-3 w-1/6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="truncate">{user.name}</span>
              </td>
              <td className="py-3 truncate">{user.email}</td>
              <td className="py-3">
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
  );
}