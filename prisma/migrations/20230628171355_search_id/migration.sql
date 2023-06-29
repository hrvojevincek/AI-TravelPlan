-- DropIndex
DROP INDEX "Search_destination_duration_key";

-- AlterTable
ALTER TABLE "Search" ADD CONSTRAINT "Search_pkey" PRIMARY KEY ("destination", "duration");
