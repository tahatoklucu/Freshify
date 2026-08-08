"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Clock } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecipeActions } from "@/components/admin/recipe-actions";

export function RecipeCard({ recipe }: { recipe: any }) {
  return (
    <Card className="flex flex-col overflow-hidden border-border/60 hover:border-primary/50 transition-all duration-300">
      <div className="relative h-32 w-full bg-secondary">
        <div className="relative h-32 w-full bg-secondary">
          {recipe.imageUrl ? (
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/30">
              <span className="text-xs">No Image</span>
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight truncate">
            {recipe.name}
          </h3>
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] shrink-0"
          >
            Published
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px] font-normal">
            {recipe.category.name}
          </Badge>
          <div className="flex items-center text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {recipe.cookingTime} min
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs mt-1"
            >
              <MoreHorizontal className="h-4 w-4 mr-2" /> Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuLabel>Recipe Options</DropdownMenuLabel>
            <RecipeActions
              id={recipe.id}
              recipeData={{
                name: recipe.name,
                cookingTime: recipe.cookingTime,
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
