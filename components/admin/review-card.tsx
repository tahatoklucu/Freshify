"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Eye, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { DeleteReviewDialog } from "@/components/admin/delete-review-dialog";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReviewCard({ review }: { review: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const isLong = review.content.length > maxLength;

  return (
    <Card className="flex flex-col border-border/60 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={review.user.image || ""} />
            <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm leading-none">{review.user.name}</h3>
            <p className="text-[11px] flex items-center text-muted-foreground mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "No date"}
            </p>
          </div>
        </div>

        <div className="bg-secondary/30 p-2.5 rounded-lg border border-border/40">
          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Reviewed Item</p>
          <p className="font-medium text-sm text-foreground truncate">{review.item.name}</p>
        </div>

        <div className="text-sm text-muted-foreground leading-relaxed italic">
          <p className={!isExpanded ? "line-clamp-2" : ""}>"{review.content}"</p>
          {isLong && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-[10px] font-bold text-primary hover:underline mt-1 flex items-center"
            >
              {isExpanded ? <><ChevronUp className="h-3 w-3 mr-1"/> Show less</> : <><ChevronDown className="h-3 w-3 mr-1"/> Show more</>}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
          <Button variant="secondary" size="sm" asChild className="h-8 w-full text-xs font-medium">
            <Link href={`/recipes/${review.item.slug}`}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> View
            </Link>
          </Button>
          
          <DeleteReviewDialog reviewId={review.id}>
            <Button variant="destructive" size="sm" className="h-8 w-full text-xs font-medium">
              <Trash className="mr-1.5 h-3.5 w-3.5" /> Delete
            </Button>
          </DeleteReviewDialog>
        </div>
      </CardContent>
    </Card>
  );
}