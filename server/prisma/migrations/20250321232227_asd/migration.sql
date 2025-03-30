-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Confirmed', 'Delivered', 'Office', 'Cancelled');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status";
