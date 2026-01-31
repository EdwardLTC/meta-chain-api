/*
  Warnings:

  - Added the required column `txReceipt` to the `listing_event_tracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "listing_event_tracking" ADD COLUMN     "txReceipt" JSONB NOT NULL;
