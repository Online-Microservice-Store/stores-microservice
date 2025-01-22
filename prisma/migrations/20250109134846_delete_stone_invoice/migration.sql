/*
  Warnings:

  - You are about to drop the `StoreInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoreInvoice" DROP CONSTRAINT "StoreInvoice_storeId_fkey";

-- DropTable
DROP TABLE "StoreInvoice";
