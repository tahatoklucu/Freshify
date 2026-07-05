"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/actions/user";
import { uploadImageAction } from "@/app/actions/user";
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function EditProfileDialog({ user }: { user: any }) {
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user.image);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    try {
      let imageUrl = preview;

      if (file) {
        imageUrl = await uploadImageAction(file);
      }

      const formData = new FormData(formRef.current);
      const newName = (formData.get("name") as string).trim();

      await updateProfile(user.id, {
        name: newName,
        image: imageUrl,
      });

      await update({ name: newName, image: imageUrl });

      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    setFile(null);
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
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 mx-auto">
              {preview && <AvatarImage src={preview} />}

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
            required
            minLength={2}
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
