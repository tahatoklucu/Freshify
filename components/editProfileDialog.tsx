"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/actions/user";
import { Pencil } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function EditProfileDialog({ user }: { user: any }) {
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(user.image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("name") as string;

    // 1. Veritabanını güncelle
    await updateProfile(user.id, { 
      name: newName,
      image: preview || undefined
    });

    // 2. Navbar ve diğer bileşenlerin güncellenmesi için session'ı yenile
    await update({
      ...user,
      name: newName,
      image: preview
    });

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute bottom-0 right-0 bg-orange-600 text-white p-2 rounded-full border-4 border-white hover:bg-orange-700 transition-all cursor-pointer">
          <Pencil size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <h2 className="font-black text-xl mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={preview || ""} />
            </Avatar>
            <label className="cursor-pointer text-xs font-bold text-orange-600 hover:underline">
              Change Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <Input 
            name="name" 
            defaultValue={user.name} 
            placeholder="Full Name" 
            className="h-11" 
          />
          <Button type="submit" disabled={loading} className="w-full bg-orange-600">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}