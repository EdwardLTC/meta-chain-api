/*
  Warnings:

  - A unique constraint covering the columns `[onchainId]` on the table `listings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "listings_onchainId_key" ON "listings"("onchainId");
