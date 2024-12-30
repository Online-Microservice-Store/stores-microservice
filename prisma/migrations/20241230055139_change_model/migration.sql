-- DropForeignKey
ALTER TABLE "StoreTrader" DROP CONSTRAINT "StoreTrader_storeId_fkey";

-- AlterTable
ALTER TABLE "StoreClient" ALTER COLUMN "storeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StoreInvoice" ALTER COLUMN "storeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StoreTrader" ALTER COLUMN "storeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StoreTrader" ADD CONSTRAINT "StoreTrader_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreClient" ADD CONSTRAINT "StoreClient_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreInvoice" ADD CONSTRAINT "StoreInvoice_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
