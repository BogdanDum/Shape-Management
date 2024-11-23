/*
  Warnings:

  - Made the column `listId` on table `Shape` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Shape" DROP CONSTRAINT "Shape_listId_fkey";

-- AlterTable
ALTER TABLE "Shape" ALTER COLUMN "listId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
