/*
  Warnings:

  - You are about to drop the column `currency` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `listings` table. All the data in the column will be lost.
  - The `status` column on the `listings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `event_cursors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentToken` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('NEW', 'PENDING', 'ACTIVE', 'SOLD', 'CANCELLED');

-- DropIndex
DROP INDEX "public"."listings_sellerAddress_idx";

-- DropIndex
DROP INDEX "public"."listings_status_idx";

-- DropIndex
DROP INDEX "public"."listings_tokenId_idx";

-- DropIndex
DROP INDEX "public"."orders_buyer_idx";

-- DropIndex
DROP INDEX "public"."orders_seller_idx";

-- DropIndex
DROP INDEX "public"."orders_status_idx";

-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "txData" JSONB;

-- AlterTable
ALTER TABLE "listings" DROP COLUMN "currency",
DROP COLUMN "source",
ADD COLUMN     "onchainId" INTEGER,
ADD COLUMN     "paymentToken" TEXT NOT NULL,
ADD COLUMN     "txData" JSONB,
DROP COLUMN "status",
ADD COLUMN     "status" "ListingStatus" NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "txData" JSONB;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "txData" JSONB;

-- DropTable
DROP TABLE "public"."event_cursors";
