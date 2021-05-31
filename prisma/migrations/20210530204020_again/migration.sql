/*
  Warnings:

  - You are about to drop the column `userId` on the `Followers` table. All the data in the column will be lost.
  - Added the required column `followedId` to the `Followers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Followers" DROP CONSTRAINT "Followers_userId_fkey";

-- AlterTable
ALTER TABLE "Followers" DROP COLUMN "userId",
ADD COLUMN     "followedId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Followers" ADD FOREIGN KEY ("followedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
