/*
  Warnings:

  - You are about to drop the column `Catalogs` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `traders` on the `Suscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "Catalogs";

-- AlterTable
ALTER TABLE "Suscription" DROP COLUMN "traders";
