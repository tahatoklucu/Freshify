"use client";

import { LucideTrash2 } from "lucide-react";
import { deleteRecipe } from "@/app/actions/new";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function DeleteButton({ itemId }: { itemId: string }) {
  const handleDelete = async () => {
    const result = await deleteRecipe(itemId);
    if (result.success) {
      window.location.reload();
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-md z-50 cursor-pointer"
          title="Delete Recipe"
        >
          <LucideTrash2 className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your recipe 
            from your profile.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}