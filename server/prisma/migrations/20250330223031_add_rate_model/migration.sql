/*
  Warnings:

  - You are about to drop the column `rate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "rate";

-- CreateTable
CREATE TABLE "Rate" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
