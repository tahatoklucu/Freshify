/*
  Warnings:

  - A unique constraint covering the columns `[profileToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profileToken_key" ON "User"("profileToken");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
