"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/actions/user";
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

  const handleRemovePhoto = () => {
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newName = new FormData(e.currentTarget).get("name") as string;
    const imageToSave =
      preview && preview.startsWith("data:image") ? preview : null;

    await updateProfile(user.id, {
      name: newName,
      image: imageToSave,
    });
    await update({ name: newName });

    setLoading(false);
    setOpen(false);

    window.location.reload();
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
            <Avatar className="w-24 h-24 mx-auto">
              {preview ? <AvatarImage src={preview} /> : null}
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            <div className="flex gap-4">
              <label className="cursor-pointer text-xs font-bold text-orange-600 hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {preview && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              )}
            </div>
          </div>

          <Input
            name="name"
            defaultValue={user.name}
            placeholder="Full Name"
            className="h-11"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
