-- CreateEnum
CREATE TYPE "TransactionOutboxStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'SENT', 'FAILED');

-- AlterEnum
ALTER TYPE "CollectionStatus" ADD VALUE 'NEW';

-- CreateTable
CREATE TABLE "transaction_outbox" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "TransactionOutboxStatus" NOT NULL DEFAULT 'PENDING',
    "txHash" TEXT,
    "collectionId" TEXT,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_outbox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_outbox" ADD CONSTRAINT "transaction_outbox_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
