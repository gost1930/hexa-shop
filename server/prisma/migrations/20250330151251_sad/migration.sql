/*
  Warnings:

  - The `delevryType` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('Office', 'House');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delevryType",
ADD COLUMN     "delevryType" "DeliveryType";
