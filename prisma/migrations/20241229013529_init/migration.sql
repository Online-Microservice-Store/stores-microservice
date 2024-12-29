-- CreateEnum
CREATE TYPE "SuscriptionType" AS ENUM ('FREE', 'BASIC', 'MEDIUM', 'PREMIUM');

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "mision" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "views" TEXT,
    "ubication" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Catalogs" TEXT[],

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" "SuscriptionType" NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "traders" TEXT[],

    CONSTRAINT "Suscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreTrader" (
    "id" TEXT NOT NULL,
    "traderId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "StoreTrader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreClient" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "StoreClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreInvoice" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "StoreInvoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoreTrader" ADD CONSTRAINT "StoreTrader_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
