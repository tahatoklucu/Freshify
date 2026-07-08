"use client";

import { useTransition } from "react";
import { updateRecipe } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RecipeEditForm({ id, initialData, closeDialog }: { id: string, initialData: any, closeDialog: () => void }) {
  let [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateRecipe(id, formData);
      closeDialog();
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Recipe Name</Label>
        <Input id="name" name="name" defaultValue={initialData.name} required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cookingTime">Cooking Time (min)</Label>
        <Input id="cookingTime" name="cookingTime" type="number" defaultValue={initialData.cookingTime} />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={closeDialog} className="cursor-pointer">Cancel</Button>
        <Button type="submit" disabled={isPending} className="cursor-pointer">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}