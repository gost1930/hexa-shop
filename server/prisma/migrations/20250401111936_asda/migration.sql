/*
  Warnings:

  - Added the required column `rate` to the `Rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rate" ADD COLUMN     "rate" TEXT NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL;
