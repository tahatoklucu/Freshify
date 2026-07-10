"use client";

import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RecipeEditForm } from "./recipe-edit-form";
import { DeleteRecipeDialog } from "./delete-recipe-dialog";

export function RecipeActions({
  id,
  recipeData,
}: {
  id: string;
  recipeData: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Edit className="mr-2 h-4 w-4 cursor-pointer" /> Edit
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Recipe</DialogTitle>
        </DialogHeader>
        <RecipeEditForm
          id={id}
          initialData={recipeData}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>

      <DeleteRecipeDialog userId={id}>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4 cursor-pointer" /> Delete
        </DropdownMenuItem>
      </DeleteRecipeDialog>
    </Dialog>
  );
}
