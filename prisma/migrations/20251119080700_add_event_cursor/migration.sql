/*
  Warnings:

  - You are about to drop the `transaction_outbox` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."transaction_outbox" DROP CONSTRAINT "transaction_outbox_collectionId_fkey";

-- DropTable
DROP TABLE "public"."transaction_outbox";

-- DropEnum
DROP TYPE "public"."TransactionOutboxStatus";

-- CreateTable
CREATE TABLE "EventCursor" (
    "id" TEXT NOT NULL,
    "lastBlock" INTEGER NOT NULL,

    CONSTRAINT "EventCursor_pkey" PRIMARY KEY ("id")
);
