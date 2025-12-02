import * as runtime from "@prisma/client/runtime/client";
const config = {
    "generator": {
        "name": "client",
        "provider": {
            "fromEnvVar": null,
            "value": "prisma-client"
        },
        "output": {
            "value": "/Users/edward/Documents/meta-chain-api/generated/prisma",
            "fromEnvVar": null
        },
        "config": {
            "runtime": "nodejs",
            "generatedFileExtension": "mts",
            "engineType": "client"
        },
        "binaryTargets": [
            {
                "fromEnvVar": null,
                "value": "darwin-arm64",
                "native": true
            }
        ],
        "previewFeatures": [],
        "sourceFilePath": "/Users/edward/Documents/meta-chain-api/prisma/schema.prisma",
        "isCustomOutput": true
    },
    "relativePath": "../../prisma",
    "clientVersion": "6.18.0",
    "engineVersion": "34b5a692b7bd79939a9a2c3ef97d816e749cda2f",
    "datasourceNames": [
        "db"
    ],
    "activeProvider": "postgresql",
    "postinstall": false,
    "inlineDatasources": {
        "db": {
            "url": {
                "fromEnvVar": "DATABASE_URL",
                "value": null
            }
        }
    },
    "inlineSchema": "generator client {\n  provider               = \"prisma-client\"\n  output                 = \"../generated/prisma\"\n  engineType             = \"client\"\n  runtime                = \"nodejs\"\n  generatedFileExtension = \"mts\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id            String  @id @default(uuid())\n  username      String\n  walletAddress String  @unique\n  email         String? @unique\n  avatarUrl     String?\n  bio           String?\n\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  collections Collection[]\n\n  @@map(\"users\")\n}\n\nenum CollectionStatus {\n  PENDING\n  CREATED\n  FAILED\n}\n\nmodel Collection {\n  id              String           @id\n  status          CollectionStatus @default(PENDING)\n  userId          String\n  creatorAddress  String\n  name            String\n  symbol          String\n  description     String\n  image           String\n  royaltyFeeBps   Int\n  txData          Json\n  txHash          String?          @unique\n  contractAddress String?          @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  tokens    Token[]\n  user      User     @relation(fields: [userId], references: [id])\n\n  @@map(\"collections\")\n}\n\nenum TokenStatus {\n  PENDING\n  MINTED\n  FAILED\n}\n\nmodel Token {\n  id           String     @id\n  collection   Collection @relation(fields: [collectionId], references: [id])\n  collectionId String\n\n  ownerAddress String\n  tokenUri     String\n\n  name        String\n  description String\n  image       String\n  status      TokenStatus @default(PENDING)\n  txData      Json\n\n  txHash          String?\n  onchainId       Int? /// on-chain token ID\n  contractAddress String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  listings Listing[]\n\n  @@unique([contractAddress, onchainId])\n  @@index([contractAddress])\n  @@index([ownerAddress])\n  @@map(\"tokens\")\n}\n\nenum ListingStatus {\n  PENDING\n  ACTIVE\n  SOLD\n  CANCELLED\n}\n\nmodel Listing {\n  id      String @id\n  tokenId String\n  token   Token  @relation(fields: [tokenId], references: [id])\n\n  sellerAddress String\n  price         Decimal       @db.Decimal(36, 18)\n  status        ListingStatus @default(PENDING)\n  expiresAt     DateTime?\n  txData        Json\n\n  onchainId Int?    @unique\n  txHash    String?\n\n  buyerAddress String?\n  paymentToken String?\n  soldAt       DateTime?\n\n  marketFeeBps    Int?\n  marketFeeAmount Decimal? @db.Decimal(36, 18)\n\n  feeRecipient String?\n\n  royaltyReceiver String?\n  royaltyAmount   Decimal? @db.Decimal(36, 18)\n\n  sellerProceeds Decimal? @db.Decimal(36, 18)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map(\"listings\")\n}\n",
    "inlineSchemaHash": "0859e43f248593ef5e47b14b9041556b429bc2eeb7591619f2ae79ff825aee23",
    "copyEngine": true,
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "dirname": ""
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"walletAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"collections\",\"kind\":\"object\",\"type\":\"Collection\",\"relationName\":\"CollectionToUser\"}],\"dbName\":\"users\"},\"Collection\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"CollectionStatus\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"creatorAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"symbol\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"royaltyFeeBps\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"txData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"txHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contractAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"tokens\",\"kind\":\"object\",\"type\":\"Token\",\"relationName\":\"CollectionToToken\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CollectionToUser\"}],\"dbName\":\"collections\"},\"Token\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"collection\",\"kind\":\"object\",\"type\":\"Collection\",\"relationName\":\"CollectionToToken\"},{\"name\":\"collectionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ownerAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokenUri\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"TokenStatus\"},{\"name\":\"txData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"txHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"onchainId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"contractAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"listings\",\"kind\":\"object\",\"type\":\"Listing\",\"relationName\":\"ListingToToken\"}],\"dbName\":\"tokens\"},\"Listing\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokenId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"object\",\"type\":\"Token\",\"relationName\":\"ListingToToken\"},{\"name\":\"sellerAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ListingStatus\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"txData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"onchainId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"txHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"buyerAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"paymentToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"soldAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"marketFeeBps\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"marketFeeAmount\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"feeRecipient\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"royaltyReceiver\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"royaltyAmount\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"sellerProceeds\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"listings\"}},\"enums\":{},\"types\":{}}");
config.engineWasm = undefined;
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    }
};
export function getPrismaClientClass(dirname) {
    config.dirname = dirname;
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.mjs.map