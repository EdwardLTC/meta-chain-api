/*
  Warnings:

  - You are about to drop the column `firstSeenAt` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `lastSyncedAt` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `metadataJson` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the `token_attributes` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `tokenUri` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `tokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collectionId` on table `tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('NEW', 'PENDING', 'MINTED', 'FAILED');

-- DropForeignKey
ALTER TABLE "public"."token_attributes" DROP CONSTRAINT "token_attributes_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tokens" DROP CONSTRAINT "tokens_collectionId_fkey";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "firstSeenAt",
DROP COLUMN "lastSyncedAt",
DROP COLUMN "metadataJson",
ADD COLUMN     "status" "TokenStatus" NOT NULL DEFAULT 'NEW',
ALTER COLUMN "contractAddress" DROP NOT NULL,
ALTER COLUMN "tokenId" DROP NOT NULL,
ALTER COLUMN "tokenUri" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "collectionId" SET NOT NULL;

-- DropTable
DROP TABLE "public"."token_attributes";

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
