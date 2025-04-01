/*
  Warnings:

  - Changed the type of `rate` on the `Rate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Rate" DROP COLUMN "rate",
ADD COLUMN     "rate" INTEGER NOT NULL;
