# Meta Chain API

A NestJS-based backend for managing on-chain NFT collections, tokens, listings, and related operations. This repository includes API servers, Prisma models and migrations, Hardhat smart-contract artifacts and deployment scripts, and helper services for IPFS (Pinata / NFT.Storage) and Azure blob storage.

This README explains how to set up the project locally, run it in development and production modes, run tests, perform Prisma migrations, and deploy smart contracts with Hardhat.

Quick links
- Docs (Swagger): /docs (served by the running app)
- Local hardhat deployments: /deployments/<network>.json (created by the deploy script)

Requirements / prerequisites
- Node.js 18+ (recommended) and npm
- Git
- PostgreSQL (or a hosted Postgres) for Prisma (DATABASE_URL)
- Redis (used by the app; docker-compose included to run Redis locally)
- Hardhat (installed as a dev dependency) for compiling and deploying contracts
- PM2 (used in production scripts)

Quick start (local development)

1. Clone and install

```bash
git clone <repo-url>
cd meta-chain-api
npm install
```

2. Create an environment file

Create a `.env` at the project root (do NOT commit secrets). See the "Environment variables" section below for required keys. You can copy the example entries below into `.env` and fill in real values.

3. Start supporting services

The repository includes a minimal `docker-compose.yml` to run a local Redis instance. Start it with:

```bash
docker-compose up -d
```

4. Run the app in development

The project uses NestJS. Start in development mode (rebuild + reload PM2):

```bash
npm run start:dev
```

Notes: `npm run start:dev` builds the project and reloads PM2 using `ecosystem.config.js`. The app listens on the port configured by the `PORT` environment variable.

Production build & start

Build the project and run with PM2 (the production script currently uses the same PM2 reload flow):

```bash
npm run build
npm run start:prod
```

Environment variables

The app reads configuration from environment variables via `@nestjs/config`. Create a `.env` file with at least the following keys and fill them with appropriate values:

Required (core runtime)
- NODE_ENV - environment, e.g. `development` or `production`
- PORT - port the API will listen on (number)
- DATABASE_URL - Postgres connection string used by Prisma (e.g. `postgresql://user:pass@host:5432/dbname`)
- JWT_SECRET - secret key for signing JWT tokens
- REDIS_HOST - Redis host (default `localhost` when using docker-compose)
- REDIS_PORT - Redis port (default `6379`)

Blockchain / Hardhat
- PROVIDER_NODE_URL - HTTP RPC endpoint (e.g. Alchemy/Infura URL) used by Hardhat `sepolia` network
- PROVIDER_WS_NODE_URL - Websocket RPC endpoint (optional; used by services that need WS)
- DEPLOYER_PRIVATE_KEY - private key used for contract deployments (supply as `0x...`)

IPFS / pinning
- PINATA_API_KEY_JWT - Pinata JWT key (if you use Pinata)
- PINATA_GATEWAY_URL - Pinata gateway URL (optional)
- NFT_STORAGE_API_KEY - API key for nft.storage (optional)

Azure blob storage (optional)
- AZURE_STORAGE_ACCOUNT_NAME
- AZURE_STORAGE_ACCOUNT_KEY

Security note: Do not commit `.env` or private keys to source control. Use secure secret storage (CI/CD secret variables, HashiCorp Vault, etc.) for production deployments.

Prisma (database)

This project uses Prisma with a Postgres datasource. Prisma config: `prisma/schema.prisma` and the generated client is placed in `generated/prisma`.

Useful Prisma commands (available in package.json):

- Generate client: `npm run prisma:generate`
- Run migrations in development (creates a migration and applies it): `npm run prisma:migrate:dev`
- Apply migrations in production / CI: `npm run prisma:migrate:deploy`

Before running the app, make sure `DATABASE_URL` is set and run:

```bash
npm run prisma:generate
npm run prisma:migrate:dev
```

Smart contracts (Hardhat)

Contracts live under `contracts/` and build artifacts are in `artifacts/`. Use Hardhat (installed in devDependencies) to compile, run a local node, and deploy contracts.

Common commands:

- Compile contracts: `npm run sol:compile`
- Start a local Hardhat node: `npm run hardhat:localnode` (default host 127.0.0.1 port 8545)
- Deploy to local node: `npm run deploy:localhost`
- Deploy to Sepolia: `npm run deploy:sepolia` (requires `PROVIDER_NODE_URL` and `DEPLOYER_PRIVATE_KEY` in the environment)

Deploy script details
- The `scripts/deploy-all.js` script deploys `Factory` and `Marketplace` and writes a JSON file to `deployments/<network>.json` containing deployed addresses and ABIs.

Redis

A minimal `docker-compose.yml` is provided to run Redis locally. Start it with `docker-compose up -d` and ensure `REDIS_HOST`/`REDIS_PORT` point to the running container.

PM2 (production)

`ecosystem.config.js` contains a PM2 configuration which launches the built app entrypoint `./dist/src/main.js`. The `start:prod` and `start:dev` scripts in package.json build and reload PM2.

Scripts (high level)

Extracted from `package.json` — the most commonly used scripts:

- `npm run build` — compile TypeScript via Nest build
- `npm run start` — start Nest (default)
- `npm run start:dev` — build + pm2 reload (development server flow in this project)
- `npm run start:prod` — build + pm2 reload (production flow)
- `npm run sol:compile` — compile Solidity contracts with Hardhat
- `npm run hardhat:localnode` — run Hardhat local node
- `npm run deploy:localhost` / `npm run deploy:sepolia` — deploy contracts to target network
- `npm run prisma:generate` / `npm run prisma:migrate:dev` / `npm run prisma:migrate:deploy`
- `npm run test` / `npm run test:e2e` — run unit and e2e tests
- `npm run lint` — run ESLint and autofix
- `npm run format` — run Prettier on the source files

Testing

- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e` (configuration: `test/jest-e2e.json`)

API docs

The app exposes Swagger documentation at `/docs` when the server is running. The Swagger setup is in `src/main.ts`.

Important code locations

- App bootstrap: `src/main.ts`
- Environment variables & helper: `src/environment/environment.service.ts`
- Prisma schema and models: `prisma/schema.prisma`
- Hardhat configuration: `hardhat.config.cjs`
- Contract deployment script: `scripts/deploy-all.js`
- PM2 config: `ecosystem.config.js`

Security & best practices

- Never commit private keys or `.env` files. Keep `DEPLOYER_PRIVATE_KEY`, `JWT_SECRET`, and other secrets in secure secret storage.
- For production migrations, use `npm run prisma:migrate:deploy` in CI or deploy pipelines rather than `migrate:dev`.
- Use GitHub Actions (or similar) to run lint, tests, build, and migrations in CI.

Contributing

Please open issues or pull requests. Follow the repository style: ESLint + Prettier. Run `npm run lint` and `npm run format` before submitting PRs.

Contact / Maintainer

Please update this README with maintainer contact info (author name & email) or the project Slack / Discord links used by the team.

License

This repository is currently marked as UNLICENSED in package.json. Update `package.json` and this README with the correct license if you intend to open-source the project.

Next steps / suggestions

- Add a `.env.example` file with the keys listed above (without secrets) to make onboarding easier.
- Add a CI workflow (GitHub Actions) to run lint, tests, and migrations.
- Add a short HOWTO for deploying to a cloud provider (Docker image + PM2 or Kubernetes) if you have a preferred target.

## Sequence flows

Below are two sequence diagrams (Mermaid) describing the on-chain listing flow and the cancel-listing (desubscribe) flow. The diagrams use the same participants as the application (User, Frontend, Backend, Wallet, Marketplace contract, Blockchain, Database).

Listing flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant FE as Frontend (DApp)
    participant BE as Backend (NestJS)
    participant W as Wallet
    participant NFT as NFT Collection Contract
    participant M as Marketplace Contract
    participant BC as Blockchain
    participant DB as Database

    U ->> FE: Nhập thông tin đăng bán (price, paymentToken)
    FE ->> BE: POST /marketplace/listings (JWT, listing data)

    BE ->> BE: Xác thực JWT
    BE ->> BE: Kiểm tra nghiệp vụ (owner, NFT chưa list)

    BE ->> BC: Kiểm tra approve NFT cho Marketplace
    BC -->> BE: approve status

    alt Chưa approve Marketplace
        BE -->> FE: Trả transaction data (NFT.approve / setApprovalForAll)
        FE ->> W: Ký giao dịch approve
        W -->> FE: Signed approve tx
        FE ->> BC: Gửi approve transaction
        BC ->> NFT: approve / setApprovalForAll
        BC -->> FE: approve txHash
    end

    BE -->> FE: Trả transaction data (Marketplace.listItem)
    FE ->> W: Yêu cầu ký giao dịch list
    W -->> FE: Signed list tx
    FE ->> BC: Gửi list transaction
    BC ->> M: listItem(nftAddress, tokenId, price, paymentToken)

    M -->> BC: Emit Listed
    BC -->> FE: txHash

    BE ->> BC: Lắng nghe Listed event
    BC -->> BE: listingId, seller, nftAddress, tokenId, price

    BE ->> DB: Lưu Listing (on-chainId, trạng thái ACTIVE)
    BE -->> FE: Đồng bộ đăng bán thành công
```

Desubscribe / Cancel listing flow

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant FE as Frontend (DApp)
    participant BE as Backend (NestJS)
    participant W as Wallet
    participant M as Marketplace Contract
    participant BC as Blockchain
    participant DB as Database

    U ->> FE: Yêu cầu hủy đăng bán (click 'Cancel' hoặc listingId)
    FE ->> BE: POST /marketplace/listings/:id/cancel (JWT)

    BE ->> BE: Xác thực JWT và kiểm tra quyền (seller == requester)
    BE ->> DB: Kiểm tra trạng thái listing (on-chainId, status)

    alt Listing đã bán hoặc không thể hủy
        BE -->> FE: 400/409 Lỗi (Cannot cancel - sold/already cancelled)
    else Có thể hủy
        BE ->> BC: Kiểm tra trạng thái on-chain (listing tồn tại & active)
        BC -->> BE: on-chain listing status

        alt On-chain listing active
            BE -->> FE: Trả transaction data (Marketplace.cancelListing)
            FE ->> W: Yêu cầu ký giao dịch hủy
            W -->> FE: Signed cancel tx
            FE ->> BC: Gửi cancel transaction
            BC ->> M: cancelListing(onchainId)

            M -->> BC: Emit Cancelled
            BC -->> FE: txHash

            BE ->> BC: Lắng nghe Cancelled event
            BC -->> BE: listingId, seller, onchainId

            BE ->> DB: Cập nhật Listing (status CANCELLED)
            BE -->> FE: Đồng bộ hủy đăng bán thành công
        else On-chain listing đã bị gỡ trước đó
            BE ->> DB: Cập nhật Listing (status CANCELLED)
            BE -->> FE: Đồng bộ hủy đăng bán thành công (no on-chain tx)
        end
    end
```

Notes
- Endpoint suggestion: `POST /marketplace/listings/:id/cancel` or `DELETE /marketplace/listings/:id` (use JWT auth). The backend should validate ownership and current listing state before returning transaction data.
- Cancellation should be done by the seller (signed by their wallet) so the backend does not need seller private keys.
- The backend listens for contract events (e.g., `Cancelled`) and reconciles DB state to avoid race conditions.
