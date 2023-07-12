/*
  Warnings:

  - You are about to drop the `UserToSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToSearch" DROP CONSTRAINT "UserToSearch_searchId_fkey";

-- DropForeignKey
ALTER TABLE "UserToSearch" DROP CONSTRAINT "UserToSearch_userId_fkey";

-- AlterTable
ALTER TABLE "Search" ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "UserToSearch";

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
