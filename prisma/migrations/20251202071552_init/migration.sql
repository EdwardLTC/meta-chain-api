-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('PENDING', 'CREATED', 'FAILED');

-- CreateEnum
CREATE TYPE "TokenStatus" AS ENUM ('PENDING', 'MINTED', 'FAILED');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('PENDING', 'ACTIVE', 'SOLD', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "status" "CollectionStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "royaltyFeeBps" INTEGER NOT NULL,
    "txData" JSONB NOT NULL,
    "txHash" TEXT,
    "contractAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "tokenUri" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "TokenStatus" NOT NULL DEFAULT 'PENDING',
    "txData" JSONB NOT NULL,
    "txHash" TEXT,
    "onchainId" INTEGER,
    "contractAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "sellerAddress" TEXT NOT NULL,
    "price" DECIMAL(36,18) NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3),
    "txData" JSONB NOT NULL,
    "onchainId" INTEGER,
    "txHash" TEXT,
    "buyerAddress" TEXT,
    "paymentToken" TEXT,
    "soldAt" TIMESTAMP(3),
    "marketFeeBps" INTEGER,
    "marketFeeAmount" DECIMAL(36,18),
    "feeRecipient" TEXT,
    "royaltyReceiver" TEXT,
    "royaltyAmount" DECIMAL(36,18),
    "sellerProceeds" DECIMAL(36,18),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "collections_txHash_key" ON "collections"("txHash");

-- CreateIndex
CREATE UNIQUE INDEX "collections_contractAddress_key" ON "collections"("contractAddress");

-- CreateIndex
CREATE INDEX "tokens_contractAddress_idx" ON "tokens"("contractAddress");

-- CreateIndex
CREATE INDEX "tokens_ownerAddress_idx" ON "tokens"("ownerAddress");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_contractAddress_onchainId_key" ON "tokens"("contractAddress", "onchainId");

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
