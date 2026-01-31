-- CreateEnum
CREATE TYPE "ListingEventName" AS ENUM ('LISTED', 'CANCELLED', 'SOLD');

-- CreateTable
CREATE TABLE "listing_event_tracking" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "eventName" "ListingEventName" NOT NULL,
    "txHash" TEXT NOT NULL,
    "logIndex" INTEGER NOT NULL,
    "blockNumber" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_event_tracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listing_event_tracking" ADD CONSTRAINT "listing_event_tracking_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
