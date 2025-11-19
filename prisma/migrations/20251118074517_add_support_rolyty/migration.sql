/*
  Warnings:

  - You are about to drop the column `metadataJson` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the column `totalSupply` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `collections` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `royaltyFeeBps` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collections" DROP COLUMN "metadataJson",
DROP COLUMN "totalSupply",
DROP COLUMN "verified",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "royaltyFeeBps" INTEGER NOT NULL,
ALTER COLUMN "txHash" DROP NOT NULL;
