# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EcoTrack** is a Web3 portfolio and DeFi tracking application that helps users manage their crypto assets across multiple blockchain networks (EVM chains and Solana). The application features multi-chain wallet integration, NFT portfolio viewing, token management, and DeFi position tracking.

## Project Structure

This is a **Turborepo monorepo** organized as follows:

```
my-portfolio-app/
├── apps/
│   └── web/                    # Main React web application (@ecotrack/app)
├── packages/
│   ├── lang/                  # i18n translations and provider (@ecotrack/lang)
│   ├── types/                 # Shared TypeScript type definitions (@ecotrack/types)
│   └── verde-cap/             # Smart contracts - Hardhat project (@ecotrack/verde-cap)
├── @docs/                     # Documentation with timestamps
├── turbo.json                 # Turborepo build pipeline configuration
├── tsconfig.base.json         # Base TypeScript configuration for workspace
└── package.json               # Root monorepo configuration
```

### Package Aliases

Path aliases for cleaner imports (configured in vite.config.ts):
- `@contracts` → `packages/contracts/dist` (smart contract ABIs and types)
- `@ecotrack/types` → `packages/types/dist` (shared type definitions)
- `@app` → `apps/web/src` (web app source)

## Core Technologies

- **Frontend**: React 18.3 + TypeScript 5.5 + Vite 5.4
- **Package Manager**: Yarn 1.22.18 (workspace monorepo)
- **Build System**: Turborepo 2.5.8
- **Web3 Integration**:
  - Wagmi 2.14 (EVM chain interactions, wallet management)
  - Viem 2.23 (Ethereum library)
  - Ethers 6.13 (utility library)
  - Solana Web3.js 1.98 + Phantom wallet adapter
- **State Management**: React Query (TanStack) 5.66
- **Styling**: Vanilla Extract + Emotion (CSS-in-JS with theming)
- **UI Components**: Material-UI (MUI) 6.4.4
- **Mobile**: Capacitor 6.1 (iOS/Android)
- **Smart Contracts**: Solidity with Hardhat 3 Beta
- **Internationalization**: i18next with English (en) and Spanish (es) support

## Common Development Commands

### Root Monorepo Commands

```bash
# Development (from root)
yarn dev                # Build types package, then start web dev server
yarn dev:web            # Start web dev server only (faster, skips type-check)

# Building
yarn build              # Build all packages in workspace
yarn build:web          # Build only the web app
yarn build:types        # Build type definitions (@ecotrack/types)
yarn build:scripts      # Build utility scripts

# Type Checking & Linting
yarn type-check         # Type check all packages
yarn lint               # Run ESLint (from apps/web/)

# Testing & Deployment
yarn test               # Run all tests in workspace
yarn deploy             # Full build and deploy to Vercel
yarn deploy:dev         # Deploy to dev environment
yarn deploy:prod        # Deploy to production environment
```

### Web App Commands (apps/web/)

```bash
# Development
yarn dev                # Start Vite dev server with HMR and Fast Refresh

# Building & Optimization
yarn build              # Type check with tsc, then build with Vite
yarn preview            # Preview production build locally

# Quality & Testing
yarn lint               # Run ESLint (TSX/JS files)
yarn type-check         # Type check without emitting (--noEmit flag)
```

**Note**: Vite includes a custom contract watch plugin that triggers full reload when contract ABIs in `packages/contracts/dist/` change during development.

### Language Package Commands (packages/lang/)

```bash
yarn build              # Build i18n provider and types
yarn dev                # Watch mode - rebuild on changes
yarn clean              # Remove dist directory
```

### Type Package Commands (packages/types/)

```bash
yarn build              # Compile TypeScript to JavaScript
yarn dev                # Watch mode - recompile on changes
```

### Smart Contracts (packages/verde-cap/)

Configuration:
- **Test Runner**: Hardhat Node Test Runner (Hardhat 3 beta)
- **Deployment**: Hardhat Ignition with Viem integration
- **Networks**: EDR-simulated (local), Sepolia testnet
- **Solidity Version**: 0.8.28 with optimization enabled for production
- **Config File**: `hardhat.config.ts` uses `configVariable()` for environment secrets

Key files: `hardhat.config.ts` for network/compiler settings

## Architecture Overview

### Frontend Architecture (apps/web/)

The React application uses a **nested provider pattern** for dependency injection (in `src/App.tsx`):

```
WagmiProvider                  # Blockchain connection (wagmi config with multiple chains)
├── ReactQueryProvider         # Server state management (TanStack Query)
│   ├── ReactQueryTools        # Dev tools for Query debugging
│   ├── WalletProvider         # Local wallet state and hooks
│   ├── ContractsProvider      # Smart contract instance provider
│   ├── LangProvider           # Internationalization (i18next)
│   ├── RouterProvider         # Route definitions and navigation
│   ├── UIThemeProvider        # Theme state management
│   ├── SimpleThemeTransition  # Theme switch animations
│   ├── Layout                 # Page layout wrapper with toolbar/footer
│   └── AppRoutes              # Route components (pages)
```

**Key Provider Relationships**:
- **WagmiProvider** is the outermost - enables all blockchain operations
- **ReactQueryProvider** wraps most application state - TanStack Query manages server state
- **WalletProvider** accesses wagmi hooks to manage user's connected wallet
- **ContractsProvider** uses wallet context to instantiate contract interactions
- **RouterProvider** manages page navigation and route state

### Key Directories

- **src/contexts/**: Provider implementations and context hooks
  - `wallet-context/`: Wagmi config and wallet state
  - `theme-context/`: Dark/light theme management
  - `router/`: Route definitions and navigation
  - `layout-context/`: Page layout management
  - `react-query/`: Server state management setup
  - `contracts-context/`: Smart contract instance providers

- **src/pages/**: Route-based page components (Home, NFTs, Tokens, Positions, Projects, Protocol)
- **src/components/**: Reusable React components
- **src/services/**: Business logic (wallet interactions, contract calls, data fetching)
- **src/utils/**: Utility functions (crypto operations, validation, logging)
- **src/features/**: Feature-specific logic modules
- **src/api/**: API integration and endpoints

### Smart Contract Architecture

- **BiokeyCollection.sol**: Custom ERC-721 NFT contract (Verde Capital's Biokey NFTs)
- Uses OpenZeppelin contracts for standard implementations
- Merkle tree verification for whitelisting/minting
- IPFS integration via Pinata and NFT.storage for metadata
- Deployed on Polygon blockchain

### Multi-Language Support

- Language provider wraps entire app (from `@ecotrack/lang`)
- Supports English (en) and Spanish (es)
- Uses i18next under the hood
- Translation files in `packages/lang/src/en/` and `packages/lang/src/es/`

## Development Patterns

### Wallet Integration

The app supports multi-chain connections:
1. **EVM Chains** (Ethereum, Polygon, etc.) via Wagmi
   - Use `useAccount()` hook from wagmi for connection state
   - Automatically handles wallet connection, network switching, transaction signing
   - Uses contract ABIs from `packages/verde-cap/` for type-safe interactions

2. **Solana** via Phantom wallet adapter
   - Separate integration from EVM
   - Check `src/contexts/wallet-context/` for Solana-specific hooks

### Server State Management

React Query handles all server state (blockchain data, API responses):
- **Queries**: For read-only data (balances, NFTs, positions)
- **Mutations**: For write operations (transactions)
- **DevTools**: React Query DevTools available in development for query inspection
- **Cache**: TanStack Query automatically caches and invalidates data

Best practice: Use queries for blockchain reads, mutations for writes; always invalidate cache after mutations.

### Styling

- **Vanilla Extract**: Scoped CSS modules with zero-runtime (compile-time generation)
  - Applies identifiers with `kzzv_app_` prefix to avoid name collisions
  - Import `.css.ts` files directly in components

- **Emotion**: Dynamic/component-scoped styles when vanilla-extract isn't suitable

- **MUI Components**: Pre-built components with built-in theming support

- **Theme Switching**: Dark/light mode with smooth transitions via `SimpleThemeTransition`

### Common Development Workflow

1. **Start dev server**: `yarn dev:web` (skips type-check for faster startup)
2. **In another terminal**: `yarn type-check --watch` for continuous type checking
3. **Making changes**:
   - Components in `src/components/` or `src/pages/`
   - Business logic in `src/services/` or `src/features/`
   - Context/state in `src/contexts/`
4. **Testing changes**: Browser HMR automatically reloads; check console for errors
5. **Before committing**: Run `yarn type-check && yarn build:web` to catch issues

### Debugging Tips

- **React Query DevTools**: Open DevTools in browser dev tools to inspect queries/mutations
- **Wallet State**: Check `src/contexts/wallet-context/` for active wallet/network
- **Contract Calls**: Verify contract ABIs in `packages/verde-cap/` and that addresses match your network
- **CSS Issues**: Check if vanilla-extract hashes conflict - rename component styles if needed
- **Build Errors**: Run `yarn build:types` separately if type package didn't build before web app

## Implementation Guidelines

### Type Safety & Build Validation

- **Always type-check before committing**: Run `yarn type-check` to catch TypeScript errors across all packages
- **Validate builds locally**: Use `yarn build:web` to catch build-time errors before pushing
- Follow the pattern: `yarn type-check && yarn build:web` after implementation
- TypeScript 5.5 with strict mode enabled - leverage type inference

### Smart Contract Integration

- **ABIs and Types**: Located in `packages/verde-cap/dist/`
- **Viem Integration**: Prefer Viem (lighter, better TypeScript support) over Ethers for new code
- **Contract Addresses**: Store in environment variables, not hardcoded
- **Deployment Artifacts**: Check `packages/verde-cap/deployments.json` for deployed contract addresses
- **Testing Contracts**: Use Hardhat Node Test Runner for local testing

### External Storage & NFT Metadata

- NFT metadata stored on IPFS via **Pinata** and **NFT.storage**
- Deployment scripts in `packages/verde-cap/scripts/` handle metadata upload
- When modifying NFT contracts, update deployment scripts accordingly

### Mobile Development

- **Capacitor 6.1** configured for iOS/Android
- Web features should be wrapped in Capacitor plugin checks before native calls
- Test on devices/simulators after making Capacitor-related changes
- iOS and Android dependencies in `apps/web/package.json`

### Environment Configuration

- **Root `.env.local.example`**: Reference for required environment variables
- **Web App**: Configure RPC endpoints, contract addresses, and API keys in `.env.local`
- **Smart Contracts**: Hardhat uses `configVariable()` for secrets - don't store plaintext keys
- **Common Variables**:
  - `SEPOLIA_RPC_URL`, `SEPOLIA_PRIVATE_KEY` (for testnet deployments)
  - Web3 RPC endpoints for different chains
  - IPFS/Pinata API keys

### Code Quality

- **ESLint**: Run `yarn lint` to check for style violations
- **Documentation**: Add comments in `@docs/` with timestamps for architectural decisions
- **Import Aliases**: Use `@app`, `@contracts`, `@ecotrack/types` for cleaner imports
- **Component Organization**: Keep components in `src/components/`, pages in `src/pages/`, logic in `src/services/`

### Monorepo Practices

- **Turbo Cache**: Turbo caches builds - use `yarn build --force` to skip cache if needed
- **Workspace Dependencies**: Packages using other workspace packages use `"*"` as version (symlinked)
- **Build Order**: Type package must build before web app due to import dependency

## Git Workflow Notes

- Check types and build after implementation: `yarn type-check && yarn build:web`
- Include documentation updates in `@docs/` with timestamps as needed
- Never push without confirming the commit description and changes are correct
