/*
  Warnings:

  - You are about to alter the column `price` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(36,18)` to `BigInt`.
  - You are about to alter the column `marketFeeAmount` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(36,18)` to `BigInt`.
  - You are about to alter the column `royaltyAmount` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(36,18)` to `BigInt`.
  - You are about to alter the column `sellerProceeds` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Decimal(36,18)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "price" SET DATA TYPE BIGINT,
ALTER COLUMN "marketFeeAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "royaltyAmount" SET DATA TYPE BIGINT,
ALTER COLUMN "sellerProceeds" SET DATA TYPE BIGINT;
