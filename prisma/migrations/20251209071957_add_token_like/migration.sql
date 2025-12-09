/*
  Warnings:

  - You are about to drop the column `likeCount` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the `collection_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."collection_likes" DROP CONSTRAINT "collection_likes_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."collection_likes" DROP CONSTRAINT "collection_likes_userId_fkey";

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "likeCount";

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."collection_likes";

-- CreateTable
CREATE TABLE "token_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_likes_userId_tokenId_key" ON "token_likes"("userId", "tokenId");

-- AddForeignKey
ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token_likes" ADD CONSTRAINT "token_likes_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
