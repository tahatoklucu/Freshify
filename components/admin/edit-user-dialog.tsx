"use client"

import { useState } from "react";
import { updateUser } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function EditUserDialog({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit User</DialogTitle></DialogHeader>
        <form action={async (formData) => {
          await updateUser(user.id, formData);
          setOpen(false);
        }} className="space-y-4">
          <Input name="name" defaultValue={user.name} placeholder="Name" />
          <Input name="email" defaultValue={user.email} placeholder="Email" />
          <Button type="submit" className="cursor-pointer">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}