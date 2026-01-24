-- CreateTable
CREATE TABLE "chain_cursors" (
    "listenerId" TEXT NOT NULL,
    "lastBlock" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "processed_logs" (
    "listenerId" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "logIndex" INTEGER NOT NULL,

    CONSTRAINT "processed_logs_pkey" PRIMARY KEY ("listenerId","txHash","logIndex")
);

-- CreateTable
CREATE TABLE "dead_letter_events" (
    "id" TEXT NOT NULL,
    "listenerId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "logIndex" INTEGER NOT NULL,
    "blockNumber" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dead_letter_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chain_cursors_listenerId_key" ON "chain_cursors"("listenerId");

-- CreateIndex
CREATE UNIQUE INDEX "dead_letter_events_listenerId_txHash_logIndex_key" ON "dead_letter_events"("listenerId", "txHash", "logIndex");
