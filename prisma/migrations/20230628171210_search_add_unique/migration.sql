/*
  Warnings:

  - The primary key for the `Search` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Search` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[destination,duration]` on the table `Search` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Search" DROP CONSTRAINT "Search_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Search_destination_duration_key" ON "Search"("destination", "duration");
