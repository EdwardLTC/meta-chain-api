# System Architecture (Mermaid)

This document provides a code-based system architecture view for the Meta Chain API and the Flutter client. The diagram is written in Mermaid so it can live alongside the code and be updated with the system.

## System Context

```mermaid
flowchart TB
  subgraph Client
    Flutter["Flutter Mobile App"]
    Wallet["Wallet (MetaMask / WalletConnect)"]
  end

  subgraph Backend["NestJS API (Meta Chain API)"]
    API["REST API + Swagger"]
    Auth["Auth Module (JWT)"]
    Core["Core Modules\nCollections | Tokens | Listings | Likes"]
    Media["Media Module"]
    Eth["Eth Module (Contracts + Tx)"]
    Listener["Chain Listener (WebSocket)"]

    API --> Auth
    API --> Core
    API --> Media
    API --> Eth
    Listener --> Core
  end

  subgraph Data
    Postgres[(PostgreSQL)]
    Redis[(Redis Cache)]
  end

  subgraph Storage
    IPFS["IPFS / Pinata / NFT.Storage"]
    Azure["Azure Blob Storage"]
  end

  subgraph Chain["EVM Network (Local / Sepolia)"]
    Factory["Factory Contract"]
    Marketplace["Marketplace Contract"]
    Collection["NFTCollection Contract"]
  end

  Flutter -->|HTTPS| API
  Flutter -->|WalletConnect| Wallet
  Wallet -->|Tx signing| Chain

  Core --> Postgres
  Auth --> Postgres
  Core --> Redis
  Media --> Azure
  Media --> IPFS
  Eth --> Chain
  Listener -->|WS logs| Chain
```

## On-chain Event Ingestion

```mermaid
sequenceDiagram
  autonumber
  participant C as Chain (Marketplace / Collection)
  participant WS as Provider WS
  participant L as Chain Listener
  participant DB as Postgres (Prisma)
  participant API as NestJS API

  C-->>WS: Emits event log
  WS-->>L: Push log
  L->>DB: Upsert cursor + write domain rows
  API-->>DB: Query updated state
```

## Notes

- The Flutter client talks to the NestJS API for off-chain data, and uses a wallet for on-chain transactions.
- The chain listener replays missed events and maintains a cursor for idempotent processing.
- Storage services are optional; choose IPFS or Azure based on the media flow you enable.
