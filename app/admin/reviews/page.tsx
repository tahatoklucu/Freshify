import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Eye } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteReviewDialog } from "@/components/admin/delete-review-dialog";
import Link from "next/link";

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({
    include: {
      user: true,
      item: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Review Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Recipe</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.user.name}
                  </TableCell>
                  <TableCell>{review.item.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.content}
                  </TableCell>
                  <TableCell>
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "Undated"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/recipes/${review.item.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </Button>
                      <DeleteReviewDialog reviewId={review.id}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DeleteReviewDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
