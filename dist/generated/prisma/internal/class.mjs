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
            "engineType": "client",
            "runtime": "nodejs",
            "generatedFileExtension": "mts"
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
    "inlineSchema": "generator client {\n  provider               = \"prisma-client\"\n  output                 = \"../generated/prisma\"\n  engineType             = \"client\"\n  runtime                = \"nodejs\"\n  generatedFileExtension = \"mts\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id            String  @id @default(uuid())\n  username      String\n  walletAddress String  @unique\n  email         String? @unique\n  avatarUrl     String?\n  bio           String?\n\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  collections Collection[]\n\n  @@map(\"users\")\n}\n\nenum CollectionStatus {\n  NEW\n  PENDING\n  CREATED\n  FAILED\n}\n\nmodel Collection {\n  id              String           @id @default(uuid())\n  status          CollectionStatus @default(PENDING)\n  userId          String\n  creatorAddress  String\n  name            String\n  symbol          String\n  description     String\n  image           String\n  royaltyFeeBps   Int\n  txHash          String?          @unique\n  contractAddress String?          @unique\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  tokens    Token[]\n  user      User     @relation(fields: [userId], references: [id])\n\n  @@map(\"collections\")\n}\n\nenum TokenStatus {\n  NEW\n  PENDING\n  MINTED\n  FAILED\n}\n\nmodel Token {\n  id String @id @default(uuid())\n\n  collection   Collection @relation(fields: [collectionId], references: [id])\n  collectionId String\n\n  contractAddress String?\n  tokenId         String?\n  ownerAddress    String\n  tokenUri        String\n\n  name        String\n  description String\n  image       String\n\n  mintTxHash String?\n  status     TokenStatus @default(NEW)\n  createdAt  DateTime    @default(now())\n  updatedAt  DateTime    @updatedAt\n\n  listings Listing[]\n\n  @@unique([contractAddress, tokenId])\n  @@index([contractAddress])\n  @@index([ownerAddress])\n  @@map(\"tokens\")\n}\n\nmodel Listing {\n  id            String    @id @default(uuid())\n  token         Token     @relation(fields: [tokenId], references: [id])\n  tokenId       String\n  sellerAddress String\n  price         Decimal   @db.Decimal(36, 18)\n  currency      String\n  status        String    @default(\"active\")\n  expiresAt     DateTime?\n  source        String // \"offchain\" | \"onchain\"\n  orderData     Json?\n  txHash        String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  Order         Order[]\n\n  @@index([sellerAddress])\n  @@index([status])\n  @@index([tokenId])\n  @@map(\"listings\")\n}\n\nmodel Order {\n  id        String   @id @default(uuid())\n  listing   Listing  @relation(fields: [listingId], references: [id])\n  listingId String\n  buyer     String\n  seller    String\n  price     Decimal  @db.Decimal(36, 18)\n  txHash    String\n  status    String   @default(\"pending\")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([buyer])\n  @@index([seller])\n  @@index([status])\n  @@map(\"orders\")\n}\n\nmodel EventCursor {\n  id        String @id\n  lastBlock Int\n\n  @@map(\"event_cursors\")\n}\n",
    "inlineSchemaHash": "7985a961c0bf8391c50b425b0aec84d8976ffffac5e7f7de060638340fcb0e9e",
    "copyEngine": true,
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "dirname": ""
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"walletAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"collections\",\"kind\":\"object\",\"type\":\"Collection\",\"relationName\":\"CollectionToUser\"}],\"dbName\":\"users\"},\"Collection\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"CollectionStatus\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"creatorAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"symbol\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"royaltyFeeBps\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"txHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contractAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"tokens\",\"kind\":\"object\",\"type\":\"Token\",\"relationName\":\"CollectionToToken\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CollectionToUser\"}],\"dbName\":\"collections\"},\"Token\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"collection\",\"kind\":\"object\",\"type\":\"Collection\",\"relationName\":\"CollectionToToken\"},{\"name\":\"collectionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contractAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokenId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ownerAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokenUri\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mintTxHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"TokenStatus\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"listings\",\"kind\":\"object\",\"type\":\"Listing\",\"relationName\":\"ListingToToken\"}],\"dbName\":\"tokens\"},\"Listing\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"object\",\"type\":\"Token\",\"relationName\":\"ListingToToken\"},{\"name\":\"tokenId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sellerAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"currency\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"source\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"orderData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"txHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"Order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"ListingToOrder\"}],\"dbName\":\"listings\"},\"Order\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"listing\",\"kind\":\"object\",\"type\":\"Listing\",\"relationName\":\"ListingToOrder\"},{\"name\":\"listingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"buyer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"seller\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"txHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"orders\"},\"EventCursor\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastBlock\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":\"event_cursors\"}},\"enums\":{},\"types\":{}}");
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