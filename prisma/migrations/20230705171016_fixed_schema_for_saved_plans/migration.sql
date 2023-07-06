/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserToSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToSearch" DROP CONSTRAINT "UserToSearch_searchId_fkey";

-- DropForeignKey
ALTER TABLE "UserToSearch" DROP CONSTRAINT "UserToSearch_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- DropTable
DROP TABLE "UserToSearch";

-- CreateTable
CREATE TABLE "_SearchToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SearchToUser_AB_unique" ON "_SearchToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SearchToUser_B_index" ON "_SearchToUser"("B");

-- AddForeignKey
ALTER TABLE "_SearchToUser" ADD CONSTRAINT "_SearchToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Search"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SearchToUser" ADD CONSTRAINT "_SearchToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
