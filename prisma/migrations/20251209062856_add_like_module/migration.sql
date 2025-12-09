-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "collection_likes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_likes_userId_collectionId_key" ON "collection_likes"("userId", "collectionId");

-- AddForeignKey
ALTER TABLE "collection_likes" ADD CONSTRAINT "collection_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_likes" ADD CONSTRAINT "collection_likes_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
