import { writeFile } from "fs";

type Examples = {
  name: string;
  description: string;
  remote: string;
  path: string;
};

type Guide = {
  name: string;
  description?: string;
  link: string;
  internal: boolean;
};

type PublicRPC = {
  type: "DATA_NODE" | "FULL" | "ARCHIVE";
  endpoint: string;
  endpoint_ws?: string;
  explorer_url: string;
  name: string;
  description: string;
  rate_limit: { rate: number; burst?: number };
  example_request: string;
  tags: string[];
};

type Network = {
  // Code is special and must be http url param compatible (e.g. no spaces or special chars)
  // For EVM chains, we use the chain_id
  // For Cosmos chains, we use the chain_id
  // For Polkadot chains, we use the network ID to match Talisman's
  //   > https://github.com/TalismanSociety/chaindata/blob/v3/chaindata.json
  code: string;
  name: string;
  onfinality_code?: string;
  chain_id: string;
  description: string;
  logo: string;
  examples: Examples[];
  guides?: Guide[];
  dictionaries?: string[]; // Array of URLs
  public_rpc?: PublicRPC[];
};

type NetworkFamily = {
  code:
    | "evm"
    | "algorand"
    | "cosmos"
    | "concordium"
    | "near"
    | "polkadot"
    | "stellar"
    | "starknet"
    | "multi";
  name: string;
  description: string;
  logo: string;
  networks: Network[];
};

type PublicAiModel = {
  code: string;
  name: string;
  logo: string;
  description: string;
  extended_description: string;
  parameter_size: number;
  context_window_size: number;
  url: string;
};

const networkFamilies: NetworkFamily[] = [
  {
    code: "evm",
    name: "EVM",
    description:
      "Ethereum is a blockchain platform for decentralized applications and smart contracts. The Ethereum Virtual Machine (EVM) is its decentralized computing environment, enabling the execution of code on the network.",
    logo: "https://static.subquery.network/network-logos/1.png",
    networks: [
      {
        code: "20240219",
        name: "Altlayer OP Demo Testnet",
        chain_id: "20240219",
        description:
          "An Altlayer OP testnet is an OP stack powered L2 that is used as a testnet.",
        logo: "https://static.subquery.network/network-logos/20240219.png",
        examples: [
          {
            name: "altlayer-op-demo-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for ABC token on Altlayer OP Demo Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Altlayer/altlayer-op-demo-starter",
          },
        ],
      },
      {
        code: "888888888",
        name: "Ancient8",
        chain_id: "888888888",
        description:
          "Ancient8 Chain is a gaming-focused community-driven Ethereum layer 2 built to onboard the next 100M Web3 citizens.",
        logo: "",
        examples: [
          {
            name: "ancient8-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the A8 on Ancient8 Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ancient8/ancient8-starter",
          },
        ],
      },
      {
        code: "42161",
        name: "Arbitrum One",
        onfinality_code: "arbitrum",
        chain_id: "42161",
        description:
          "A Layer 2 scaling solution for Ethereum, enhancing transaction throughput and reducing fees while maintaining compatibility with Ethereum's smart contracts.",
        logo: "https://static.subquery.network/network-logos/42161.png",
        examples: [
          {
            name: "arbitrum-one-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Arbitrum's One Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Arbitrum/arbitrum-one-starter",
          },
          {
            name: "arbitrum-one-winr",
            description:
              "This SubQuery project indexes all Arbitrum WINR Staking Rewards on Arbitrum's One Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Arbitrum/arbitrum-one-winr",
          },
        ],
        guides: [
          {
            name: "Arbitrum Quick Start",
            description:
              "The goal of this quick start guide is to index the total claimed dividends paid to users on the WINR staking contract on Arbitrum.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/arbitrum.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/arbitrum"],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Arbitrum One Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x23/overview",
            endpoint: "https://arbitrum.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://arbitrum.rpc.subquery.network/public\'',
            tags: ["Layer-2"],
          },
        ],
      },
      {
        code: "42170",
        name: "Arbitrum Nova",
        chain_id: "42170",
        description:
          "A development of Arbitrum aiming to further improve Ethereum scalability, making it faster and more cost-effective.",
        logo: "https://static.subquery.network/network-logos/42170.png",
        examples: [
          {
            name: "arbitrum-nova-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Arbitrum's Nova Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Arbitrum/arbitrum-nova-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/arbitrum-nova"],
      },
      {
        code: "11820",
        name: "Artela Testnet",
        chain_id: "11820",
        description: "",
        logo: "https://static.subquery.network/network-logos/11820.png",
        examples: [
          {
            name: "artela-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ART (Artella) Token on Artela Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Artela/artela-testnet-starter",
          },
        ],
      },
      {
        code: "42420",
        name: "Asset Chain Mainnet",
        chain_id: "42420",
        description: "",
        logo: "",
        examples: [
          {
            name: "asset-chain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WRWA Token on Asset Chain Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Asset Chain/asset-chain-starter",
          },
        ],
      },
      {
        code: "42421",
        name: "Asset Chain Testnet",
        chain_id: "42421",
        description: "",
        logo: "",
        examples: [
          {
            name: "asset-chain-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WRWA Token on Asset Chain Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Asset Chain/asset-chain-testnet-starter",
          },
        ],
        guides: [
          {
            name: "Asset Chain Testnet Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped RWA on Asset Chain Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/asset-chain-testnet.html",
            internal: true,
          },
          {
            name: "Setting up an Indexer",
            link: "https://academy.assetchain.org/module-4-intermediate-tutorials/setting-up-an-indexer",
            internal: false,
          },
        ],
      },
      {
        code: "3776",
        name: "Astar zkEVM",
        chain_id: "3776",
        description:
          "A blockchain platform designed for decentralized applications (DApps) and smart contracts, known for its speed, scalability, and developer-friendly tools.",
        logo: "https://static.subquery.network/network-logos/astar.png",
        examples: [
          {
            name: "astar-zkevm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC Token on Astar's zkEVM Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Astar/astar-zkevm-starter",
          },
        ],
        guides: [
          {
            name: "Astar zkEVM Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the USDC Token on Astar's zkEVM Mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/astar-zkatana.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/astar-zkevm-mainnet",
        ],
      },
      {
        code: "6038361",
        name: "Astar zKyoto",
        chain_id: "6038361",
        description:
          "A blockchain platform designed for decentralized applications (DApps) and smart contracts, known for its speed, scalability, and developer-friendly tools.",
        logo: "https://static.subquery.network/network-logos/astar.png",
        examples: [
          {
            name: "astar-zkyoto-testnet-starter",
            description:
              "This SubQuery project indexes all transactions Astar's zkEVM's zKyoto Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Astar/astar-zkyoto-testnet-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/astar-zkyoto"],
      },
      {
        code: "1261120",
        name: "Astar zKatana",
        chain_id: "1261120",
        description:
          "A blockchain platform designed for decentralized applications (DApps) and smart contracts, known for its speed, scalability, and developer-friendly tools.",
        logo: "https://static.subquery.network/network-logos/astar.png",
        examples: [
          {
            name: "astar-zkevm-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the GACHA Token on Astar zkEVM's zKatana Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Astar/astar-zkevm-testnet-starter",
          },
        ],
        guides: [
          {
            name: "Astar zKatana Documentation - SubQuery Entry",
            link: "https://docs.astar.network/docs/build/zkEVM/integrations/indexers/subquery/",
            internal: false,
          },
        ],
      },
      {
        code: "43114",
        name: "Avalanche",
        chain_id: "43114",
        description:
          "A decentralized platform for creating and launching custom blockchain networks, featuring subnets and high throughput for efficient DApp development.",
        logo: "https://static.subquery.network/network-logos/43114.png",
        examples: [
          {
            name: "avalanche-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Pangolin Smart Contract token on Avalanche Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Avalanche/avalanche-starter",
          },
          {
            name: "crabada-nft",
            description:
              "This project indexes all Crabada NFTs on Avalanche's C-chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Avalanche/crabada-nft",
          },
          {
            name: "pangolin-rewards-tutorial",
            description:
              "The goal of this quick start guide is to index all Pangolin token Approve logs",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Avalanche/pangolin-rewards-tutorial",
          },
        ],
        guides: [
          {
            name: "Avalanche Quick Start - Pangolin Rewards",
            description:
              "The goal of this quick start guide is to index all token deposits and transfers from the Avalanche's Pangolin token",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/avalanche.html",
            internal: true,
          },
          {
            name: "Avalanche Quick Start - Crabada NFTs",
            description:
              "The goal of this quick start guide is to index all Crabada NFTs on Avalanche's C-chain.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/avalanche-crabada.html",
            internal: true,
          },
          {
            name: "Avalanche Documentation - SubQuery Entry",
            link: "https://docs.avax.network/tooling/indexers#subquery",
            internal: false,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/avalanche"],
      },
      {
        code: "43113",
        name: "Avalanche Fuji",
        chain_id: "43113",
        description: "",
        logo: "https://static.subquery.network/network-logos/43113.png",
        examples: [
          {
            name: "avalanche-fuji-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped AVAX on Avalanche Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Avalanche/avalanche-fuji-starter",
          },
        ],
        guides: [
          {
            name: "Avalanche Documentation - SubQuery Entry",
            link: "https://docs.avax.network/tooling/indexers#subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/avalanche-testnet",
        ],
      },
      {
        code: "1313161554",
        name: "Aurora",
        chain_id: "1313161554",
        description: "",
        logo: "",
        examples: [
          {
            name: "aurora-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Tether on Aurora Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Aurora/aurora-starter",
          },
        ],
      },
      {
        code: "8453",
        name: "Base",
        chain_id: "8453",
        onfinality_code: "base",
        description:
          "A blockchain network focused on simplifying smart contract development and execution, offering secure and efficient blockchain solutions.",
        logo: "https://static.subquery.network/network-logos/8453.png",
        examples: [
          {
            name: "base-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ETH on Base Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Base/base-starter",
          },
          {
            name: "base-nft",
            description:
              "This SubQuery project indexes all claiming events for the Bridge to Base NFT on Base Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Base/base-nft",
          },
        ],
        guides: [
          {
            name: "Base Quick Start",
            description:
              "The goal of this quick start guide is to index the all the claims from the Bridge to Base NFT contract on Base Mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/base.html",
            internal: true,
          },
          {
            name: "Base Documentation - SubQuery Entry",
            link: "https://docs.base.org/tools/data-indexers#subquery",
            internal: false,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/base-mainnet"],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Base Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x06/overview",
            endpoint: "https://base.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://base.rpc.subquery.network/public\'',
            tags: ["Layer-2"],
          },
        ],
      },
      {
        code: "65100004",
        name: "Autonity",
        chain_id: "65100004",
        onfinality_code: "Autonity",
        description:
          "Autonity is a public, EVM based, proof-of-stake blockchain for decentralized clearing of smart derivatives contracts.",
        logo: "https://static.subquery.network/network-logos/65100004.svg",
        examples: [],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Autonity Piccadilly (Tiber) Testnet",
            description: "",
            rate_limit: {
              rate: 50,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x4d/overview",
            endpoint: "https://autonity-piccadilly.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://autonity-piccadilly.rpc.subquery.network/public\'',
            tags: ["Testnet"],
          },
        ],
      },
      {
        code: "84532",
        name: "Base Sepolia",
        chain_id: "84532",
        description: "",
        logo: "https://static.subquery.network/network-logos/8453.png",
        examples: [
          {
            name: "base-sepolia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for a WETH token on Sepolia Base Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Base/base-sepolia-starter",
          },
        ],
        guides: [
          {
            name: "Base Sepolia Quick Start",
            description:
              "The goal of this quick start guide is to index the total faucets dripped to users from the USDC Faucet contract on Base Sepolia Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/base-sepolia.html",
            internal: true,
          },
          {
            name: "Base Documentation - SubQuery Entry",
            link: "https://docs.base.org/tools/data-indexers#subquery",
            internal: false,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/base-sepolia"],
      },
      {
        code: "4337",
        name: "Beam",
        chain_id: "4337",
        description: "Beam is a sovereign network focused on gaming.",
        logo: "https://static.subquery.network/network-logos/4337.png",
        examples: [
          {
            name: "beam-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC token on Beam",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Beam/beam-starter",
          },
        ],
      },
      {
        code: "80084",
        name: "Berachain BArtio",
        chain_id: "80084",
        description:
          "EVM-compatible blockchain built on Proof-of-Liquidity consensus.",
        logo: "https://static.subquery.network/network-logos/80085.png",
        examples: [
          {
            name: "berachain-bartio-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the BGT token on Berachain bArtio Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Berachain/berachain-bartio-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/berachain-bartio",
        ],
      },
      {
        code: "80085",
        name: "Berachain Artio Testnet",
        chain_id: "80085",
        description:
          "EVM-compatible blockchain built on Proof-of-Liquidity consensus.",
        logo: "https://static.subquery.network/network-logos/80085.png",
        examples: [
          {
            name: "berachain-artio-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ETH on Berachain Artio Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Berachain/berachain-artio-testnet-starter",
          },
        ],
      },
      {
        code: "1501",
        name: "BEVM Testnet",
        chain_id: "1501",
        description:
          "A Bitcoin Layer-2 Network developed based on Substrate, fully compatible with the Ethereum Virtual Machine (EVM).",
        logo: "https://static.subquery.network/network-logos/1501.png",
        examples: [
          {
            name: "bevm-canary-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped BTC on BEVM Canary Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BEVM/bevm-canary-starter",
          },
        ],
      },
      {
        code: "11501",
        name: "BEVM Mainnet",
        chain_id: "11501",
        description:
          "A Bitcoin Layer-2 Network developed based on Substrate, fully compatible with the Ethereum Virtual Machine (EVM).",
        logo: "https://static.subquery.network/network-logos/1501.png",
        examples: [
          {
            name: "bevm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped BTC on BEVM Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BEVM/bevm-starter",
          },
        ],
      },
      {
        code: "200901",
        name: "Bitlayer",
        chain_id: "200901",
        description:
          "Bitlayer is the first Layer 2 solution offering Bitcoin-equivalent security and Turing completeness. It's also the first built on BitVM.",
        logo: "",
        examples: [
          {
            name: "bitlayer-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Tether USD (USDT) on Bitlayer",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Bitlayer/bitlayer-starter",
          },
        ],
      },
      {
        code: "81457",
        name: "Blast",
        chain_id: "81457",
        description:
          "The only Ethereum L2 with native yield for ETH and stablecoins.",
        logo: "https://static.subquery.network/network-logos/81457.png",
        examples: [
          {
            name: "blast-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth on Blast Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Blast/blast-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/blast-l2-mainnet",
        ],
      },
      {
        code: "168587773",
        name: "Blast Sepolia",
        chain_id: "168587773",
        description:
          "The only Ethereum L2 with native yield for ETH and stablecoins.",
        logo: "https://static.subquery.network/network-logos/168587773.png",
        examples: [
          {
            name: "blast-sepolia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth on Blast Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Blast/blast-sepolia-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/blast-sepolia"],
      },
      {
        code: "56",
        name: "BNB Smart Chain",
        onfinality_code: "bnb",
        chain_id: "56",
        description:
          "Binance's blockchain network, designed for fast and low-cost transactions, powering various DeFi applications and tokens within the Binance ecosystem.",
        logo: "https://static.subquery.network/network-logos/56.png",
        examples: [
          {
            name: "bsc-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Binance Peg Ethereum token on BNB Smart Chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BNB Smart Chain/bsc-starter",
          },
          {
            name: "bsc-mobox-rewards",
            description:
              "This SubQuery project indexes all deposits and withdrawls to MOBOX pools on BNB Smart Chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BNB Smart Chain/bsc-mobox-rewards",
          },
          {
            name: "bsc-pancake-swap",
            description:
              "This project can be use as a starting point for developing your new Binance SubQuery project, it indexes the standard PancakeSwap project on BSC",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BNB Smart Chain/bsc-pancake-swap",
          },
        ],
        guides: [
          {
            name: "BNB Smart Chain (BSC) Quick Start",
            description:
              "The goal of this quick start guide is to index all deposits and withdrawls to MOBOX pools.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/bsc.html",
            internal: true,
          },
          {
            name: "BNB Smart Chain (BSC) - PancakeSwap Example",
            description:
              "The goal of this quick start guide is to index the standard PancakeSwap project on BSC",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/bsc.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/binance"],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "BNB Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x2d/overview",
            endpoint: "https://bnb.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://bnb.rpc.subquery.network/public\'',
            tags: ["Layer-2"],
          },
        ],
      },
      {
        code: "97",
        name: "BNB Smart Chain Testnet",
        chain_id: "97",
        description: "",
        logo: "https://static.subquery.network/network-logos/56.png",
        examples: [
          {
            name: "bsc-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped BNB token on BNB Smart Chain Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BNB Smart Chain/bsc-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/binance-testnet",
        ],
      },
      {
        code: "204",
        name: "opBNB Mainnet",
        chain_id: "204",
        description: "",
        logo: "https://static.subquery.network/network-logos/56.png",
        examples: [
          {
            name: "opbnb-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth token on opBNB Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BNB Smart Chain/opbnb-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/opbnb-mainnet"],
      },
      {
        code: "60808",
        name: "BOB Mainnet",
        chain_id: "60808",
        description:
          "BOB is a hybrid L2 that combines the security of Bitcoin with the versatility of Ethereum. BOB's mission is to onboard the next billion users to Bitcoin.",
        logo: "",
        examples: [
          {
            name: "bob-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth token on BOB",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BOB/bob-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/bob-mainnet"],
      },
      {
        code: "56288",
        name: "Boba BNB Mainnet",
        chain_id: "56288",
        description:
          "A Multichain Optimistic Rollup Solution powered by HybridCompute.",
        logo: "https://static.subquery.network/network-logos/56288.png",
        examples: [
          {
            name: "boba-bnb-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped BOBA on Boba BNB Network.",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Boba/boba-bnb-starter",
          },
        ],
        guides: [
          {
            name: "Boba BNB Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped BOBA on Boba BNB Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/boba-bnb.html",
            internal: true,
          },
          {
            name: "Boba Documentation - SubQuery Entry",
            link: "https://docs.boba.network/for-developers/indexer/subquery-indexer",
            internal: false,
          },
        ],
      },
      {
        code: "288",
        name: "Boba Network",
        chain_id: "288",
        description:
          "A Multichain Optimistic Rollup Solution powered by HybridCompute.",
        logo: "https://static.subquery.network/network-logos/288.png",
        examples: [
          {
            name: "boba-eth-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth on Boba (Ethereum) Network.",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Boba/boba-eth-starter",
          },
        ],
        guides: [
          {
            name: "Boba ETH Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Eth on Boba Mainnet Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/boba-eth.html",
            internal: true,
          },
          {
            name: "Boba Documentation - SubQuery Entry",
            link: "https://docs.boba.network/for-developers/indexer/subquery-indexer",
            internal: false,
          },
        ],
      },
      {
        code: "3636",
        name: "Botanix Testnet",
        chain_id: "3636",
        description:
          "Botanix Labs solved one of the hardest problems for any Proof-of-Stake network - the Verifiable Random Function - by leveraging Bitcoin block hashes.",
        logo: "https://static.subquery.network/network-logos/3636.png",
        examples: [
          {
            name: "botanix-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Btc on Botanix Testnet.",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Botanix/botanix-testnet-starter",
          },
        ],
        guides: [
          {
            name: "Botanix Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Btc on Botanix Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/botanix.html",
            internal: true,
          },
        ],
      },
      {
        code: "223",
        name: "bSquared",
        chain_id: "223",
        description: "B² Network is the most practical Bitcoin Layer2 Network.",
        logo: "https://static.subquery.network/network-logos/223.png",
        examples: [
          {
            name: "bsquared-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Btc on bSquared.",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "bSquared/bSquared-mainnet-starter",
          },
        ],
      },
      {
        code: "22215",
        name: "BVM",
        chain_id: "22215",
        description:
          "BVM is the first modular Bitcoin L2 metaprotocol on Bitcoin. With a few clicks, anyone can plug and play the best-of-breed blockchain modules to launch their own Bitcoin L2 blockchain.",
        logo: "https://static.subquery.network/network-logos/22215.png",
        examples: [
          {
            name: "bvm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ETH on BVM Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BVM/bvm-starter",
          },
        ],
      },
      {
        code: "42220",
        name: "Celo",
        chain_id: "42220",
        description:
          "A blockchain platform focused on financial inclusion, offering a mobile-first approach for enabling easy access to decentralized financial services.",
        logo: "https://static.subquery.network/network-logos/42220.png",
        examples: [
          {
            name: "celo-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped EOS token on Celo Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Celo/celo-starter",
          },
        ],
        guides: [
          {
            name: "Celo Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Eth on Celo Mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/celo.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/celo-mainnet"],
      },
      {
        code: "62298",
        name: "Citrea Devnet",
        chain_id: "62298",
        description:
          "Citrea is the first rollup that enhances the capabilities of Bitcoin blockspace with zero knowledge technology. Citrea is the only scalability solution that uses Bitcoin both as a data availability and a settlement layer, via its BitVM-based trust-minimized two-way peg program - Clementine.",
        logo: "",
        examples: [
          {
            name: "citrea-devnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for ESADOSHI on Citrea DevNet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Citrea/citrea-devnet-starter",
          },
        ],
      },
      {
        code: "5115",
        name: "Citrea Testnet",
        chain_id: "5115",
        description:
          "Citrea is the first rollup that enhances the capabilities of Bitcoin blockspace with zero knowledge technology. Citrea is the only scalability solution that uses Bitcoin both as a data availability and a settlement layer, via its BitVM-based trust-minimized two-way peg program - Clementine.",
        logo: "",
        examples: [
          {
            name: "citrea-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDC on Citrea Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Citrea/citrea-testnet-starter",
          },
        ],
      },
      {
        code: "1116",
        name: "Core",
        chain_id: "1116",
        description:
          "Core is embracing the fundamentals of blockchain and building for a decentralized economy, starting with the communities most in need.",
        logo: "https://static.subquery.network/network-logos/1116.png",
        examples: [
          {
            name: "core-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDC on Core Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Core/core-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/core-mainnet"],
      },
      {
        code: "66665",
        name: "Creator Testnet",
        chain_id: "66665",
        description:
          "Layer 2 blockchain built on the Superchain by Optimism, designed to enhance scalability, efficiency, and reward-driven growth.",
        logo: "",
        examples: [
          {
            name: "creator-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDT on Creator Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Creator/creator-testnet-starter",
          },
        ],
      },
      {
        code: "388",
        name: "Cronos ZKEVM",
        chain_id: "388",
        description:
          "A zkEVM Layer-2 for Cronos, optimized for DeFi and NFTs, providing a scalable and secure environment for these applications.",
        logo: "https://static.subquery.network/network-logos/cronosmainnet_25-1.png",
        examples: [
          {
            name: "cronos-zkevm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for zkTCRO on Cronos zkEVM Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Cronos/cronos-zkevm-starter",
          },
        ],
        guides: [
          {
            name: "Cronos zkEVM Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the CRO token on Cronos zkEVM Mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cronos-zkevm.html",
            internal: true,
          },
        ],
      },
      {
        code: "282",
        name: "Cronos ZKEVM Testnet",
        chain_id: "282",
        description:
          "A zkEVM Layer-2 for Cronos, optimized for DeFi and NFTs, providing a scalable and secure environment for these applications.",
        logo: "https://static.subquery.network/network-logos/cronosmainnet_25-1.png",
        examples: [
          {
            name: "cronos-zkevm-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for zkTCRO on Cronos zkEVM Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Cronos/cronos-zkevm-testnet-starter",
          },
        ],
      },
      {
        code: "4157",
        name: "CrossFi Testnet",
        chain_id: "4157",
        description:
          "Dive into the world of blockchain ecosystem! Explore the opportunities of crypto banking, pay with crypto debit card, use web3 wallet and defi tools.",
        logo: "",
        examples: [
          {
            name: "crossfi-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the CrossFi Foundation Token (0xdb5c548684221ce2f55f16456ec5cf43a028d8e9) on CrossFi Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "CrossFi Testnet/crossfi-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/crossfi-testnet",
        ],
      },
      {
        code: "666666666",
        name: "Degen Chain",
        chain_id: "666666666",
        description:
          "Degen, an ERC-20 token launched in January 2024, has reshaped the Farcaster ecosystem by enabling Casters to reward others with DEGEN for posting quality content.",
        logo: "https://static.subquery.network/network-logos/666666666.png",
        examples: [
          {
            name: "degen-chain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for DEGEN on Degen Chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Degen/degen-chain-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/degen-chain"],
      },
      {
        code: "7979",
        name: "DOS Chain",
        chain_id: "7979",
        description:
          "DOS is the fastest and zero gas fee blockchain network to build a wide range of products from gaming, entertainment to finance.",
        logo: "",
        examples: [
          {
            name: "dos-chain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Heroes and Empires (HE) on DOS Chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "DOS Chain/dos-chain-starter",
          },
        ],
      },
      {
        code: "246",
        name: "Energy Web",
        chain_id: "246",
        description:
          "Decentralized Computation Powering the energy transition.",
        logo: "https://static.subquery.network/network-logos/246.png",
        examples: [
          {
            name: "energy-web-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped SolarCoin token on Energy Web",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Energy Web/energy-web-starter",
          },
        ],
      },
      {
        code: "17777",
        name: "EOS",
        chain_id: "17777",
        description:
          "A blockchain network designed for high-performance decentralized applications, known for its scalability, flexibility, and developer-friendly environment.",
        logo: "https://static.subquery.network/network-logos/17777.png",
        examples: [
          {
            name: "eos-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped EOS token on EOS EVM",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "EOS/eos-starter",
          },
        ],
      },
      {
        code: "1",
        name: "Ethereum",
        chain_id: "1",
        onfinality_code: "eth",
        description:
          "A leading decentralized blockchain platform for smart contracts and decentralized applications (DApps), known for its native cryptocurrency Ether (ETH).",
        logo: "https://static.subquery.network/network-logos/1.png",
        examples: [
          {
            name: "ethereum-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Ethereum Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-starter",
          },
          {
            name: "ethereum-poap",
            description:
              "This SubQuery project indexes all POAPs mints and transactions on the Ethereum mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-poap",
          },
          {
            name: "ethereum-bayc",
            description:
              "This SubQuery project indexes all transfers for the BAYC on Ethereum",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-bayc",
          },
          {
            name: "ethereum-ens",
            description:
              "This SubQuery project indexes all ENS Records in the ENS registry on Ethereum Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-ens",
          },
          {
            name: "ethereum-gravatar",
            description:
              "This SubQuery project indexes all Ethereum Gravatars created or updated on the Ethereum mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-gravatar",
          },
          {
            name: "ethereum-chainlink",
            description:
              "This SubQuery project provided below enables individuals to retrieve specific historical price data from the Ethereum Mainnet Chainlink Datafeeds",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-chainlink",
          },
          {
            name: "ethereum-opensea",
            description:
              "This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes NFT data from the Opensea marketplace",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-opensea",
          },
          {
            name: "ethereum-uniswap-v3",
            description:
              "This SubQuery project indexes the standard Uniswap V3 project on Ethereum Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-uniswap-v3",
          },
          {
            name: "ethscriptions",
            description:
              "This SubQuery project indexes inscriptions on Ethereum Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethscriptions",
          },
        ],
        guides: [
          {
            name: "Ethereum Quick Start - Gravatar (Simple)",
            description:
              "The goal of this quick start guide is to index all Ethereum Gravatars created or updated on the Ethereum mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html",
            internal: true,
          },
          {
            name: "Ethereum Quick Start - BAYC (Simple)",
            description:
              "The goal of this article is to provide a comprehensive guide to setting up an indexer for the Bored Ape Yacht Club (BAYC) smart contract.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-bayc.html",
            internal: true,
          },
          {
            name: "Ethereum Quick Start - Chainlink (Medium)",
            description:
              "This guide serves as your gateway to a comprehensive guide on setting up a SubQuery indexer specifically tailored to index data from Chainlink Data Feeds.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-chainlink.html",
            internal: true,
          },
          {
            name: "Ethereum Quick Start - Opensea (Medium)",
            description:
              "This guide is designed to seamlessly lead you through the steps of configuring your personal OpenSea SubQuery indexer.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-opensea.html",
            internal: true,
          },
          {
            name: "Ethereum Quick Start - Uniswap (Complex)",
            description:
              "The objective of this article is to offer a detailed, step-by-step guide on setting up a SubQuery indexer for Uniswap v3 protocol.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-uniswap.html",
            internal: true,
          },
          {
            name: "Ethereum Quick Start - ENS (Complex)",
            description:
              "This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes all ENS Records in the ENS registry.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-ens.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://ethereum.node.subquery.network/public",
          "https://dict-tyk.subquery.network/query/eth-mainnet",
        ],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Ethereum Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x04/overview",
            endpoint: "https://ethereum.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://ethereum.rpc.subquery.network/public\'',
            tags: [],
          },
        ],
      },
      {
        code: "5",
        name: "Ethereum Goerli",
        chain_id: "5",
        description: "",
        logo: "https://static.subquery.network/network-logos/5.png",
        examples: [
          {
            name: "ethereum-goerli-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Ethereum Goerli",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-goerli-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/eth-goerli"],
      },
      {
        code: "11155111",
        name: "Ethereum Sepolia",
        onfinality_code: "eth-sepolia",
        chain_id: "11155111",
        description: "",
        logo: "https://static.subquery.network/network-logos/11155111.png",
        examples: [
          {
            name: "ethereum-sepolia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Ethereum Sepolia",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-sepolia-starter",
          },
        ],
        dictionaries: [
          "https://ethereum-sepolia.node.subquery.network/public",
          "https://dict-tyk.subquery.network/query/eth-sepolia",
        ],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Ethereum Sepolia Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x27/overview",
            endpoint: "https://ethereum-sepolia.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://ethereum-sepolia.rpc.subquery.network/public\'',
            tags: ["Testnet"],
          },
        ],
      },
      {
        code: "250",
        name: "Fantom",
        chain_id: "250",
        description:
          "A fast and scalable blockchain platform designed for smart contracts and DeFi applications, aiming to provide high-speed and low-cost transactions.",
        logo: "https://static.subquery.network/network-logos/250.png",
        examples: [
          {
            name: "fantom-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped FTM on Fantom Opera Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Fantom/fantom-starter",
          },
        ],
        guides: [
          {
            name: "Fantom Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped FTM on Fantom Opera Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/fantom.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/fantom"],
      },
      {
        code: "14",
        name: "Flare",
        chain_id: "14",
        description:
          "A blockchain network focused on enabling smart contracts for non-native assets, bridging traditional finance and decentralized platforms, with its native token FLR.",
        logo: "https://static.subquery.network/network-logos/14.png",
        examples: [
          {
            name: "flare-starter",
            description: "",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Flare/flare-starter",
          },
        ],
        guides: [
          {
            name: "Flare Quick Start",
            description:
              "The goal of this quick start guide is to index all rewards from the Flare FTSO Reward Manager from Flare's Songbird network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/flare.html",
            internal: true,
          },
          {
            name: "Flare Documentation - SubQuery Entry",
            link: "https://docs.flare.network/dev/tools/?h=subq#indexing-and-querying",
            internal: false,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/flare-mainnet"],
      },
      {
        code: "19",
        name: "Flare Songbird",
        chain_id: "19",
        description: "",
        logo: "https://static.subquery.network/network-logos/19.png",
        examples: [
          {
            name: "songbird-starter",
            description: "",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Flare/songbird-starter",
          },
        ],
        guides: [
          {
            name: "Flare Documentation - SubQuery Entry",
            link: "https://docs.flare.network/dev/tools/?h=subq#indexing-and-querying",
            internal: false,
          },
        ],
      },
      {
        code: "747",
        name: "Flow",
        chain_id: "747",
        description:
          "Flow is a network of creative humans building culture, science, finance, digital ownership, & consumer experiences of tomorrow, reaching people where they are.",
        logo: "",
        examples: [
          {
            name: "flow-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Flow on Flow",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Flow/flow-starter",
          },
        ],
      },
      {
        code: "545",
        name: "Flow Testnet",
        chain_id: "545",
        description:
          "Flow is a network of creative humans building culture, science, finance, digital ownership, & consumer experiences of tomorrow, reaching people where they are.",
        logo: "",
        examples: [
          {
            name: "flow-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Flow on Flow testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Flow/flow-testnet-starter",
          },
        ],
      },
      {
        code: "100",
        name: "Gnosis",
        chain_id: "100",
        description:
          "A decentralized prediction market and oracle platform on Ethereum, facilitating various DeFi and prediction market applications with GNO and OWL tokens.",
        logo: "https://static.subquery.network/network-logos/100.png",
        examples: [
          {
            name: "gnosis-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the ChainLink Token on xDai on Gnosis Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Gnosis/gnosis-starter",
          },
          {
            name: "gnosis-poap",
            description:
              "This SubQuery project indexes all POAPs mints and transactions on the Gnosis Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Gnosis/gnosis-poap",
          },
        ],
        guides: [
          {
            name: "Gnosis Quick Start",
            description:
              "The goal of this quick start guide is to index all POAP mints and transactions on the Gnosis mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/gnosis.html",
            internal: true,
          },
          {
            name: "Gnosis Documentation - SubQuery Entry",
            link: "https://docs.gnosischain.com/tools/analytics/subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/gnosis-mainnet",
        ],
      },
      {
        code: "1625",
        name: "Gravity Alpha Mainnet",
        chain_id: "1625",
        description:
          "Gravity is a Layer-1 blockchain designed for mass adoption and an omnichain future.",
        logo: "",
        examples: [
          {
            name: "gravity-alpha-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for Wrapped Eth on Gravity Alpha Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Gravity/gravity-alpha-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/galxe-gravity"],
      },
      {
        code: "1666600000",
        name: "Harmony",
        chain_id: "1666600000",
        description:
          "A scalable blockchain network designed for high-throughput and low-latency applications, featuring sharding and its native ONE token for consensus and staking.",
        logo: "https://static.subquery.network/network-logos/1666600000.png",
        examples: [
          {
            name: "harmony-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ETH token on Harmony Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Harmony/harmony-starter",
          },
        ],
        guides: [
          {
            name: "Harmony Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Eth on Harmony Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/harmony.html",
            internal: true,
          },
        ],
      },
      {
        code: "128",
        name: "Heco Chain",
        chain_id: "128",
        description:
          "A blockchain built by Huobi, designed for DeFi and DApps, with a focus on cross-chain compatibility, providing HECO tokens for various use cases.",
        logo: "https://static.subquery.network/network-logos/128.png",
        examples: [
          {
            name: "heco-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped HT token on Heco Chain Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Heco/heco-starter",
          },
        ],
        guides: [
          {
            name: "Heco Chain Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped HT on Heco Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/heco.html",
            internal: true,
          },
        ],
      },
      {
        code: "13472",
        name: "Immutable Testnet",
        chain_id: "13472",
        description:
          " A blockchain protocol for trading and ownership of NFTs within the Ethereum ecosystem, ensuring security and transparency for digital assets.",
        logo: "https://static.subquery.network/network-logos/13472.png",
        examples: [
          {
            name: "immutable-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events tIMX gas token on Immutable Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Immutable/immutable-testnet-starter",
          },
        ],
        guides: [
          {
            name: "Immutable (Testnet) Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Immutable Testnet Gas Token on Immutable Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/immutable-testnet.html",
            internal: true,
          },
        ],
      },
      {
        code: "4689",
        name: "Iotex Network",
        chain_id: "4689",
        description:
          "IoTeX is the Platform for DePIN Builders. It combines fast, secure blockchain tech with the Internet of Things (IoT) and smart devices.",
        logo: "https://static.subquery.network/network-logos/4689.png",
        examples: [
          {
            name: "iotex-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for Wrapped Eth on Iotex Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Iotex/iotex-starter",
          },
        ],
      },
      {
        code: "81",
        name: "Japan Open Chain",
        chain_id: "81",
        description:
          "Japan Open Chain (JOC) is Ethereum-Compatible Layer1 Public Blockchain that prioritizes practicality. It operates in collaboration with trusted enterprises, providing a reliable blockchain infrastructure for businesses and local governments to confidently utilize.",
        logo: "https://static.subquery.network/network-logos/81.png",
        examples: [
          {
            name: "japan-open-chain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for Kiraboshi Coin Test on Japan Open Chain Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Japan Open Chain/japan-open-chain-starter",
          },
        ],
      },
      {
        code: "8217",
        name: "Kaia",
        chain_id: "8217",
        description:
          "A public blockchain platform from South Korea, developed by Kakao, focusing on user-friendly DApp development and featuring its native KLAY token.",
        logo: "https://static.subquery.network/network-logos/8217.png",
        examples: [
          {
            name: "kaia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events Orbit ETH token on Kaia",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Kaia/kaia-starter",
          },
        ],
        guides: [
          {
            name: "Kaia Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Orbit ETH on Kaia Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/kaia.html",
            internal: true,
          },
          {
            name: "Kaia Documentation - SubQuery Entry",
            link: "https://docs.kaia.io/build/tools/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "920637907288165",
        name: "Kakarot Starknet Sepolia",
        chain_id: "920637907288165",
        description:
          "Kakarot is a verifiable EVM, and KKRT Labs is bringing it to Starknet L2 as well as to all EVM chains - L1 and rollups alike.",
        logo: "",
        examples: [
          {
            name: "kakarot-starknet-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the kUSDC on Kakarot Starknet Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Kakarot Starknet/kakarot-starknet-testnet-starter",
          },
        ],
      },
      {
        code: "255",
        name: "Kroma",
        chain_id: "255",
        description: "A universal ZK Rollup based on the OP Stack",
        logo: "",
        examples: [
          {
            name: "kroma-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDT on Kroma Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Kroma/kroma-starter",
          },
        ],
      },
      {
        code: "3456",
        name: "LayerEdge Testnet",
        chain_id: "3456",
        description:
          "LayerEdge introducing an innovative layer of Optimistic Rollups and Hybrid Modular Data Availability (DA) to extend Bitcoin's capabilities.",
        logo: "",
        examples: [
          {
            name: "layeredge-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Tether token on LayerEdge Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "LayerEdge/layeredge-testnet-starter",
          },
        ],
      },
      {
        code: "59144",
        name: "Linea",
        chain_id: "59144",
        description: "",
        logo: "",
        examples: [
          {
            name: "linea-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Linea Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Linea/linea-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/linea-mainnet"],
      },
      {
        code: "42",
        name: "Lukso",
        chain_id: "42",
        description:
          "The blockchain built for SOCIAL, CULTURE and CREATORS, LUKSO is the foundation for the new decentralized social web.",
        logo: "",
        examples: [
          {
            name: "lukso-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the LYX token on Lukso Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Lukso/lukso-starter",
          },
        ],
      },
      {
        code: "169",
        name: "Manta Pacific",
        chain_id: "169",
        description:
          "Manta Pacific is the first EVM-equivalent ZK-application platform that is scalable and secure through Celestia DA and Polygon zkEVM.",
        logo: "https://static.subquery.network/network-logos/169.png",
        examples: [
          {
            name: "manta-pacific-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC token on Manta Pacific Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Manta/manta-pacific-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/manta-pacific"],
      },
      {
        code: "5000",
        name: "Mantle",
        chain_id: "5000",
        description: "",
        logo: "https://static.subquery.network/network-logos/5000.png",
        examples: [
          {
            name: "mantle-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Mantle Native token on Mantle Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Mantle/mantle-starter",
          },
        ],
        guides: [
          {
            name: "Mantle Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Mantle Native token on Mantle Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/mantle.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/mantle-mainnet",
        ],
      },
      {
        code: "82",
        name: "Meter",
        chain_id: "82",
        description:
          "A blockchain network designed for decentralized finance (DeFi) with a stablecoin, supporting high-speed transactions and energy-efficient consensus mechanisms.",
        logo: "https://static.subquery.network/network-logos/82.png",
        examples: [
          {
            name: "meter-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Meter Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Meter/meter-starter",
          },
        ],
        guides: [
          {
            name: "Meter Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Eth on Meter Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/meter.html",
            internal: true,
          },
          {
            name: "Meter Documentation - SubQuery Entry",
            link: "https://docs.meter.io/developer-documentation/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "1088",
        name: "Metis",
        chain_id: "1088",
        description:
          "A blockchain platform focusing on decentralized applications and organizations, providing scalable and customizable solutions with its Layer 2 framework.",
        logo: "https://static.subquery.network/network-logos/1088.png",
        examples: [
          {
            name: "metis-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Metis Token on Metis Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Metis/metis-starter",
          },
        ],
        guides: [
          {
            name: "Metis Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the METIS Token on Metis Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/metis.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/metis-mainnet"],
      },
      {
        code: "4200",
        name: "Merlin Mainnet",
        chain_id: "4200",
        description:
          "Unleashing Bitcoin's Potential with Native L1 Assets, Users and Protocols.",
        logo: "https://static.subquery.network/network-logos/4200.png",
        examples: [
          {
            name: "merlin-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for wrapped BTC on Merlin Chain Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Merlin/merlin-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/merlin-mainnet",
        ],
      },
      {
        code: "686868",
        name: "Merlin Testnet",
        chain_id: "686868",
        description:
          "Unleashing Bitcoin's Potential with Native L1 Assets, Users and Protocols.",
        logo: "https://static.subquery.network/network-logos/4200.png",
        examples: [
          {
            name: "merlin-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for wrapped BTC on Merlin Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Merlin/merlin-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/merlin-testnet",
        ],
      },
      {
        code: "185",
        name: "Mint",
        chain_id: "185",
        description:
          "A L2 blockchain built on OP Stack focusing on the NFT ecosystem.",
        logo: "",
        examples: [
          {
            name: "mint-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDC On Mint Network",
            remote: "https://github.com/subquery/ethereum-subql-starter/",
            path: "Mint/mint-starter",
          },
        ],
      },
      {
        code: "34443",
        name: "Mode Network",
        chain_id: "34443",
        description:
          "Mode is the Ethereum L2 that rewards you for growing the network via new economic mechanisms. Powered by Optimism.",
        logo: "",
        examples: [
          {
            name: "mode-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for wrapped Ether (WETH) on Mode Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Mode/mode-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/mode-mainnet"],
      },
      {
        code: "22222",
        name: "Nautilus",
        chain_id: "22222",
        description: "One of the fastest EVM rollups.",
        logo: "https://static.subquery.network/network-logos/22222.png",
        examples: [
          {
            name: "nautilus-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for wrapped Ether on Nautilus Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Nautilus/nautilus-starter",
          },
        ],
      },
      {
        code: "12227331",
        name: "Neo X Testnet",
        chain_id: "12227331",
        description:
          "Neo X is an EVM-compatible sidechain incorporating Neo's distinctive dBFT consensus mechanism.",
        logo: "",
        examples: [
          {
            name: "neox-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for GM token on Neo X Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Neo X/neox-testnet-starter",
          },
        ],
      },
      {
        code: "7210",
        name: "Nibiru Testnet",
        chain_id: "7210",
        description:
          "A secure smart contract platform driven by a vibrant community.",
        logo: "",
        examples: [
          {
            name: "nibiru-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for NIBI token on Nibiru Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Nibiru/nibiru-testnet-starter",
          },
        ],
      },
      {
        code: "2014",
        name: "Now Chain",
        chain_id: "2014",
        description:
          "Step into the future with NOW Chain, where cutting-edge technology meets unparalleled security.",
        logo: "",
        examples: [
          {
            name: "now-chain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for Tether USDT token on Now Chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Now Chain/now-chain-starter",
          },
        ],
      },
      {
        code: "42262",
        name: "Oasis Emerald",
        chain_id: "42262",
        description:
          "Oasis Emerald is a high-performance, privacy-focused blockchain platform designed to facilitate secure, scalable, and decentralized applications while prioritizing data confidentiality and integrity.",
        logo: "https://static.subquery.network/network-logos/42262.png",
        examples: [
          {
            name: "oasis-emerald-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the YUZU Token on Oasis Emerald",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Oasis/oasis-emerald-starter",
          },
        ],
      },
      {
        code: "23294",
        name: "Oasis Sapphire",
        chain_id: "23294",
        description:
          "Oasis Sapphire is a high-performance, privacy-focused blockchain platform designed to facilitate secure, scalable, and decentralized applications while prioritizing data confidentiality and integrity.",
        logo: "https://static.subquery.network/network-logos/23294.png",
        examples: [
          {
            name: "oasis-sapphire-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the OCEAN Token on Oasis Sapphire",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Oasis/oasis-sapphire-starter",
          },
        ],
      },
      {
        code: "185947263",
        name: "Open Frabric Testnet",
        chain_id: "185947263",
        description:
          "A planetary-scale network for building and connecting decentralized AI applications.",
        logo: "",
        examples: [
          {
            name: "ofn-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the OFN (0x8899ec96ed8c96b5c86c23c3f069c3def75b6d97) on OFN Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "OFN/ofn-testnet-starter",
          },
        ],
      },
      {
        code: "5040",
        name: "ONIGIRI Mainnet",
        chain_id: "5040",
        description:
          "We see ONIGIRI as a protocol in food. We aim to be the blockchain solution for various food-related services, including cooking apps, e-commerce, apps, health care apps and more.",
        logo: "https://static.subquery.network/network-logos/5039.png",
        examples: [
          {
            name: "onigiri-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the SQSample Token on ONIGIRI Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "ONIGIRI/onigiri-starter",
          },
        ],
      },
      {
        code: "5039",
        name: "ONIGIRI Testnet",
        chain_id: "5039",
        description:
          "We see ONIGIRI as a protocol in food. We aim to be the blockchain solution for various food-related services, including cooking apps, e-commerce, apps, health care apps and more.",
        logo: "https://static.subquery.network/network-logos/5039.png",
        examples: [
          {
            name: "onigiri-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the SQSample Token on ONIGIRI Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "ONIGIRI/onigiri-testnet-starter",
          },
        ],
      },
      {
        code: "10",
        name: "Optimism",
        onfinality_code: "optimism",
        chain_id: "10",
        description:
          "An Ethereum Layer 2 scaling solution, enhancing transaction speed and cost efficiency while maintaining compatibility with the Ethereum network and smart contracts.",
        logo: "https://static.subquery.network/network-logos/10.png",
        examples: [
          {
            name: "optimism-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDT token on Optimism Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Optimism/optimism-starter",
          },
          {
            name: "optimism-airdrop",
            description:
              "This SubQuery project indexes all the claim events of the Optimism Airdrop on Optimism Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Optimism/optimism-airdrop",
          },
        ],
        guides: [
          {
            name: "Optimism Quick Start",
            description:
              "The goal of this quick start guide is to index all claim events from the Optimism airdrop contract.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/optimism.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/optimism-mainnet",
        ],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Optimism Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x2f/overview",
            endpoint: "https://optimism.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://optimism.rpc.subquery.network/public\'',
            tags: ["Layer-2"],
          },
        ],
      },
      {
        code: "58",
        name: "Ontology EVM",
        chain_id: "58",
        description:
          "The Ontology blockchain is a high speed, low cost public blockchain bringing decentralized identity and data solutions to Web3.",
        logo: "",
        examples: [
          {
            name: "ontology-evm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WONT Token on Ontology EVM Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ontology/ontology-evm-starter",
          },
        ],
      },
      {
        code: "5851",
        name: "Ontology EVM Testnet",
        chain_id: "5851",
        description:
          "The Ontology blockchain is a high speed, low cost public blockchain bringing decentralized identity and data solutions to Web3.",
        logo: "",
        examples: [
          {
            name: "ontology-evm-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WONT Token on Ontology EVM Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ontology/ontology-evm-testnet-starter",
          },
        ],
      },
      {
        code: "62050",
        name: "Optopia",
        chain_id: "62050",
        description:
          "Optopia is an experimental Layer 2 network owned and driven by the community.",
        logo: "",
        examples: [
          {
            name: "optopia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Optopia Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Optopia/optopia-starter",
          },
        ],
      },
      {
        code: "137",
        name: "Polygon",
        onfinality_code: "polygon",
        chain_id: "137",
        description:
          "A multi-chain framework for Ethereum, promoting scalability and interoperability by facilitating the development of various blockchain solutions and dApps.",
        logo: "https://static.subquery.network/network-logos/137.png",
        examples: [
          {
            name: "polygon-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Polygon Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon/polygon-starter",
          },
          {
            name: "polygon-plasma-bridge",
            description:
              "This SubQuery project indexes all token deposits and users from the Polygon Plamsa Bridge on the Polgon Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon/polygon-plasma-bridge",
          },
          {
            name: "polygon-lens",
            description:
              "This SubQuery project indexes Profile Creation, Post, Follow events for the Lens Protocol on Polygon Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon/polygon-lens",
          },
        ],
        guides: [
          {
            name: "Polygon Quick Start",
            description:
              "The goal of this quick start guide is to index all token deposits from the Polygon Plasma Bridge.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polygon.html",
            internal: true,
          },
          {
            name: "Polygon Quick Start - Lens Protocol",
            description:
              "This article's purpose is to provide a clear, step-by-step guide on setting up an indexer for the Lens Protocol on the Polygon blockchain.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polygon-lens.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/polygon"],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Polygon Public RPC",
            description: "",
            rate_limit: {
              rate: 30,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x25/overview",
            endpoint: "https://polygon.rpc.subquery.network/public",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "eth_blockNumber"}\' \'https://polygon.rpc.subquery.network/public\'',
            tags: ["Layer-2"],
          },
        ],
      },
      {
        code: "1101",
        name: "Polygon zkEVM",
        chain_id: "1101",
        description:
          "Polygon zkEVM is a Layer 2 scaling solution that utilizes zero-knowledge proofs to enable efficient and secure decentralized applications on the Ethereum network.",
        logo: "https://static.subquery.network/network-logos/1101.png",
        examples: [
          {
            name: "polygon-zkevm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Polgon zkEVM Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon/polygon-zkevm-starter",
          },
        ],
        guides: [
          {
            name: "Polygon zkEVM Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Eth on Polygon zkEVM Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polygon-zkevm.html",
            internal: true,
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/polygon-zkevm"],
      },
      {
        code: "80001",
        name: "Polygon Mumbai",
        chain_id: "80001",
        description: "",
        logo: "https://static.subquery.network/network-logos/80001.png",
        examples: [
          {
            name: "polygon-mumbai-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Polygon Mumbai Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon/polygon-mumbai-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/polygon-mumbai",
        ],
      },
      {
        code: "424",
        name: "Public Goods Network",
        chain_id: "424",
        description:
          "Public Goods Network is the only L2 network in which the vast majority of net sequencer fees go to projects that are building and/or funding public goods.",
        logo: "https://static.subquery.network/network-logos/424.png",
        examples: [
          {
            name: "public-goods-network-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Merkly OFT (MERK) Token on Public Goods Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Public Goods Network/public-goods-network-starter",
          },
        ],
      },
      {
        code: "369",
        name: "Pulsechain",
        chain_id: "369",
        description: "",
        logo: "https://static.subquery.network/network-logos/369.png",
        examples: [
          {
            name: "pulsechain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDT on Pulsechain Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Pulsechain/pulsechain-starter",
          },
        ],
      },
      {
        code: "2020",
        name: "Ronin",
        chain_id: "2020",
        description:
          "Ronin is an EVM blockchain tailored for developers building player-owned economies.",
        logo: "",
        examples: [
          {
            name: "ronin-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDC on Ronin Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ronin/ronin-starter",
          },
        ],
      },
      {
        code: "2021",
        name: "Ronin Testnet",
        chain_id: "2021",
        description:
          "Ronin is an EVM blockchain tailored for developers building player-owned economies.",
        logo: "",
        examples: [
          {
            name: "ronin-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDC on Ronin Testnet Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ronin/ronin-testnet-starter",
          },
        ],
      },
      {
        code: "30",
        name: "Rootstock",
        chain_id: "30",
        description:
          "Deploy EVM compatible smart contracts on Rootstock and with the security of the Bitcoin network.",
        logo: "",
        examples: [
          {
            name: "rootstock-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for RIF on Rootstock Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Rootstock/rootstock-starter",
          },
        ],
      },
      {
        code: "3110",
        name: "SatoshiVM",
        chain_id: "3110",
        description:
          "A decentralized Bitcoin ZK Rollup Layer 2 solution compatible with the Ethereum Virtual Machine (EVM) ecosystem, using native BTC as gas.",
        logo: "https://static.subquery.network/network-logos/3110.png",
        examples: [
          {
            name: "satoshivm-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for SAVM on Satoshivm Testnet Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "SatoshiVM/satoshivm-testnet-starter",
          },
        ],
      },
      {
        code: "534352",
        name: "Scroll",
        chain_id: "534352",
        description:
          "A blockchain platform emphasizing privacy, featuring confidential transactions and data protection while allowing users to control the visibility of their data.",
        logo: "https://static.subquery.network/network-logos/534351.png",
        examples: [
          {
            name: "scroll-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC token on Scroll's Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Scroll/scroll-starter",
          },
        ],
        guides: [
          {
            name: "Scroll Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the USDC token on Scroll's Mainnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/scroll.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/scroll-mainnet",
        ],
      },
      {
        code: "534351",
        name: "Scroll Sepolia",
        chain_id: "534351",
        description:
          "A blockchain platform emphasizing privacy, featuring confidential transactions and data protection while allowing users to control the visibility of their data.",
        logo: "https://static.subquery.network/network-logos/534351.png",
        examples: [
          {
            name: "scroll-sepolia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth on Scroll's Sepolia Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Scroll/scroll-sepolia-starter",
          },
        ],
        guides: [
          {
            name: "Scroll (Sepolia Testnet) Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped Eth on Scroll's Sepolia Test Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/scroll-sepolia.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/scroll-sepolia",
        ],
      },
      {
        code: "2046399126",
        name: "Skale",
        chain_id: "2046399126",
        description:
          "A decentralized network focused on Ethereum scaling solutions, offering high-performance and low-cost smart contract execution through its Layer 2 architecture.",
        logo: "https://static.subquery.network/network-logos/2046399126.png",
        examples: [
          {
            name: "skale-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Skale Token on Skale Europa Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Skale/skale-starter",
          },
        ],
        guides: [
          {
            name: "Skale Europa Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the SKL Token on Skale Europa Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/skale.html",
            internal: true,
          },
        ],
      },
      {
        code: "57054",
        name: "Sonic Testnet (Blaze)",
        chain_id: "57054",
        description:
          "Sonic is an EVM layer-1 platform that offers developers attractive incentives and powerful infrastructure. The chain provides 10,000 TPS, sub-second finality, and the Sonic Gateway, a secure bridge to Ethereum for enhanced liquidity and asset security.",
        logo: "https://static.subquery.network/network-logos/17000.png",
        examples: [
          {
            name: "sonic-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WS on Sonic Testnet (Blaze)",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Sonic/sonic-testnet-starter",
          },
        ],
      },
      {
        code: "167008",
        name: "Taiko Katla",
        chain_id: "167008",
        description:
          "Taiko is a fully permissionless, Ethereum-equivalent based rollup. Inspired, secured, and sequenced by Ethereum.",
        logo: "https://static.subquery.network/network-logos/17000.png",
        examples: [
          {
            name: "taiko-katla-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Taiko Token Katla (TTKOk) on Taiko Katla",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Taiko/taiko-katla-starter",
          },
        ],
      },
      // This is the wrong network it should be ethereum holesky
      {
        code: "17000",
        name: "Taiko Holesky",
        chain_id: "17000",
        description:
          "Taiko is a fully permissionless, Ethereum-equivalent based rollup. Inspired, secured, and sequenced by Ethereum.",
        logo: "https://static.subquery.network/network-logos/17000.png",
        examples: [
          {
            name: "taiko-holesky-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Taiko Token Katla (TTKOk) on Taiko Holesky",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Taiko/taiko-holesky-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/eth-holesky"],
      },
      {
        code: "40",
        name: "Telos Mainnet",
        chain_id: "40",
        description:
          "Redefining Speed, Reliability, and Efficiency with the World's Fastest EVM.",
        logo: "https://static.subquery.network/network-logos/40.png",
        examples: [
          {
            name: "telos-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDT Token on Telos Mainnetwork",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Telos/telos-starter",
          },
        ],
      },
      {
        code: "41",
        name: "Telos Testnet",
        chain_id: "41",
        description:
          "Redefining Speed, Reliability, and Efficiency with the World's Fastest EVM.",
        logo: "https://static.subquery.network/network-logos/40.png",
        examples: [
          {
            name: "telos-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDT Token on Telos Mainnetwork",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Telos/telos-testnet-starter",
          },
        ],
      },
      {
        code: "8192",
        name: "Torus",
        chain_id: "8192",
        description:
          "An open source, non-custodial key management network. Making Web3 simple, secure, and easy to use.",
        logo: "",
        examples: [
          {
            name: "torus-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped TQF Token on Torus",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Torus/torus-starter",
          },
        ],
      },
      {
        code: "1301",
        name: "Unichain Testnet",
        chain_id: "1301",
        description:
          "Unichain, built by the Uniswap Labs, is a DeFi-native Ethereum L2, optimized to be the home for liquidity across chains.",
        logo: "",
        examples: [
          {
            name: "unichain-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for USDC on Unichain's Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Unichain/unichain-testnet-starter",
          },
          {
            name: "unichain-testnet-uniswap-v3",
            description:
              "This SubQuery project indexes the standard Uniswap Exchange-V3 project on Unichain Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Unichain/unichain-testnet-uniswap-v3",
          },
        ],
        guides: [
          {
            name: "Unichain Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from USDC on Unichain's Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/unichain.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/unichain-sepolia",
        ],
      },
      {
        code: "39",
        name: "Unicorn Ultra Solaris",
        chain_id: "39",
        description:
          "Unicorn Ultra (U2U) Solaris is the Layer-1 blockchain platform designed based on the venture builder model that enables creators and developers to build any potential projects to serve for a decentralized future.",
        logo: "https://static.subquery.network/network-logos/39.png",
        examples: [
          {
            name: "unicorn-ultra-solaris-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for U2DPNToken on Unicorn Ultra Solaris",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Unicorn Ultra Solaris/unicorn-ultra-solaris-starter",
          },
        ],
      },
      {
        code: "106",
        name: "Velas Network",
        chain_id: "106",
        description:
          "Velas is the world's fastest EVM Blockchain and Ecosystem for smart contracts and dApps.",
        logo: "https://static.subquery.network/network-logos/106.png",
        examples: [
          {
            name: "velas-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for Wrapped Eth on Velas Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Velas/velas-starter",
          },
        ],
      },
      {
        code: "88",
        name: "Viction",
        chain_id: "88",
        description:
          "Viction, previously known as TomoChain, is a people-centric layer-1 blockchain that provides zero-gas transactions and heightened security.",
        logo: "https://static.subquery.network/network-logos/88.png",
        examples: [
          {
            name: "viction-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for CUST on Viction",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Viction/viction-starter",
          },
        ],
      },
      {
        code: "196",
        name: "X Layer Mainnet",
        chain_id: "196",
        description:
          "A ZK-powered layer 2 network that connects the OKX and Ethereum communities to allow anyone to take part in a truly global on-chain ecosystem.",
        logo: "https://static.subquery.network/network-logos/40.png",
        examples: [
          {
            name: "xlayer-mainnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped ether token on X Layer Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "XLayer/xlayer-mainnet-starter",
          },
        ],
        guides: [],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/xlayer-mainnet",
        ],
      },
      {
        code: "195",
        name: "X Layer Testnet",
        chain_id: "195",
        description:
          "A ZK-powered layer 2 network that connects the OKX and Ethereum communities to allow anyone to take part in a truly global on-chain ecosystem.",
        logo: "https://static.subquery.network/network-logos/40.png",
        examples: [
          {
            name: "xlayer-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped ether token on X Layer Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "XLayer/xlayer-testnet-starter",
          },
        ],
        guides: [
          {
            name: "X Layer (Testnet) Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped ETH on X Layer Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/xlayer-testnet.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/xlayer-testnet",
        ],
      },
      {
        code: "50",
        name: "XDC Network",
        chain_id: "50",
        description:
          "The XDC Network sets a benchmark for digitizing trade finance by enabling the tokenization of diverse trade finance instruments and assets.",
        logo: "https://static.subquery.network/network-logos/51.png",
        examples: [
          {
            name: "xdc-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for EURS token on XDC Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "XDC/xdc-starter",
          },
        ],
      },
      {
        code: "51",
        name: "XDC Apothem Testnet",
        chain_id: "51",
        description:
          "The XDC Network sets a benchmark for digitizing trade finance by enabling the tokenization of diverse trade finance instruments and assets.",
        logo: "https://static.subquery.network/network-logos/51.png",
        examples: [
          {
            name: "xdc-apothem-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for FXD on XDC Apothem Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "XDC/xdc-apothem-starter",
          },
        ],
        guides: [
          {
            name: "XDC Apothem Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events for FXD on XDC Apothem Testnet.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/xdc-apothem.html",
            internal: true,
          },
        ],
      },
      {
        code: "7000",
        name: "Zetachain",
        chain_id: "7000",
        description: "",
        logo: "https://static.subquery.network/network-logos/7000.png",
        examples: [
          {
            name: "zetachain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the ETH on Zetachain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Zetachain/zetachain-starter",
          },
        ],
        guides: [
          {
            name: "ZetaChain Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events for Eth on ZetaChain.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/zetachain.html",
            internal: true,
          },
        ],
      },
      {
        code: "7001",
        name: "Zetachain Testnet",
        chain_id: "7001",
        description: "",
        logo: "https://static.subquery.network/network-logos/7001.png",
        examples: [
          {
            name: "zetachain-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for sETH.SEPOLIA on Zetachain Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Zetachain/zetachain-testnet-starter",
          },
        ],
      },
      {
        code: "324",
        name: "Zksync",
        chain_id: "324",
        description:
          "A Layer 2 scaling solution for Ethereum, utilizing zk-rollups to significantly improve transaction throughput and reduce gas fees while maintaining security.",
        logo: "https://static.subquery.network/network-logos/324.png",
        examples: [
          {
            name: "zksync-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped USDC token on Zksync Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Zksync/zksync-starter",
          },
        ],
        guides: [
          {
            name: "ZkSync (Era) Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Wrapped ETH on ZkSync Era Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/zksync-era.html",
            internal: true,
          },
          {
            name: "zkSync Documentation - SubQuery Entry",
            link: "https://docs.zksync.io/build/tutorials/tooling-guides/subquery.html#subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/zksync-mainnet",
        ],
      },
      {
        code: "7777777",
        name: "Zora",
        chain_id: "7777777",
        description: "",
        logo: "https://static.subquery.network/network-logos/7777777.png",
        examples: [
          {
            name: "zora-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WETH on Zora Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Zora/zora-starterr",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/zora-mainnet"],
      },
      {
        code: "16600",
        name: "0G Newton Testnet",
        chain_id: "16600",
        description: "",
        logo: "",
        examples: [
          {
            name: "0g-newton-testnet-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the FunToken (0x911a31a3450aabfd38d1484aae457c88b66d1561) on 0G Newton Testnet Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "0G Newton Testnet/0g-newton-testnet-testnet-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/0g-testnet"],
      },
      {
        code: "41455",
        name: "Aleph Zero EVM",
        chain_id: "41455",
        description: "",
        logo: "",
        examples: [
          {
            name: "aleph-zero-evm-mainet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Merkly Hyperlane FT (0xAFa5f9313F1F2b599173f24807a882F498Be118c) on Aleph Zero EVM Mainet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Aleph Zero EVM/aleph-zero-evm-mainet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/aleph-zero-evm-mainnet",
        ],
      },
      {
        code: "421614",
        name: "Arbitrum Sepolia",
        chain_id: "421614",
        description: "",
        logo: "",
        examples: [
          {
            name: "arbitrum-sepolia-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the TestUSDC (0x5fabd132b58b29d0f98A9eB51651A695fc46BD9c) on Arbitrum Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Arbitrum Sepolia/arbitrum-sepolia-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/arbitrum-sepolia",
        ],
      },
      {
        code: "10242",
        name: "Arthera Mainnet",
        chain_id: "10242",
        description: "",
        logo: "",
        examples: [
          {
            name: "arthera-mainnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the XPArthera (0x8FF4E393D983fb2EEdCfcFcB55a0aaB9250d0AE6) on Arthera Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Arthera Mainnet/arthera-mainnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/arthera-mainnet",
        ],
      },
      {
        code: "8333",
        name: "B3",
        chain_id: "8333",
        description: "",
        logo: "",
        examples: [
          {
            name: "b3-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Portal Fantasy XP (0xE01cc077f4E477e8f9A69BbB282aD5cc5267e013) on B3",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "B3/b3-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/b3-mainnet"],
      },
      {
        code: "1993",
        name: "B3 Sepolia",
        chain_id: "1993",
        description: "",
        logo: "",
        examples: [
          {
            name: "b3-sepolia-testnet-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the PEWPEW (0x79B4c9ceBD2C45f7c40d605868af6AC08b8554C2) on B3 Sepolia Testnet Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "B3 Sepolia Testnet/b3-sepolia-testnet-testnet-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/b3-sepolia"],
      },
      {
        code: "355110",
        name: "Bitfinity Mainnet",
        chain_id: "355110",
        description: "",
        logo: "",
        examples: [
          {
            name: "bitfinity-network-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the ICP (0x51cCdE9Ca75d95BB55eCe1775fCBFF91324B18A6) on Bitfinity Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Bitfinity Network/bitfinity-network-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/bitfinity-mainnet",
        ],
      },
      {
        code: "355113",
        name: "Bitfinity Testnet",
        chain_id: "355113",
        description: "",
        logo: "",
        examples: [
          {
            name: "bitfinity-network-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Test USD (0xbd9A5c1d9fBbBEC84633ec9Cb046C01fB79809f2) on Bitfinity Network Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Bitfinity Network/bitfinity-network-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/bitfinity-testnet",
        ],
      },
      {
        code: "32520",
        name: "Bitgert",
        chain_id: "32520",
        description: "",
        logo: "",
        examples: [
          {
            name: "bitgert-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Bitcoin Future (0x9Ba88b1edCBd8f24aa3fa0c7472e07903f6d0098) on Bitgert",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Bitgert/bitgert-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/bitgert-mainnet",
        ],
      },
      {
        code: "7701",
        name: "Canto Testnet",
        chain_id: "7701",
        description: "",
        logo: "",
        examples: [
          {
            name: "canto-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Canto/canto-testnet-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/canto-testnet"],
      },
      {
        code: "44787",
        name: "Celo Alfajores Testnet",
        chain_id: "44787",
        description: "",
        logo: "",
        examples: [
          {
            name: "celo-alfajores-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the MyTether USD (0x5C68B64d52B651916796f195fb776cB49bAa12d8) on Celo Alfajores Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Celo Alfajores/celo-alfajores-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/celo-alfajores-testnet",
        ],
      },
      {
        code: "4158",
        name: "CrossFi Mainnet",
        chain_id: "4158",
        description: "",
        logo: "",
        examples: [
          {
            name: "crossfi-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the CrossFi Foundation Token (0xdb5c548684221ce2f55f16456ec5cf43a028d8e9) on CrossFi",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "CrossFi/crossfi-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/crossfi-mainnet",
        ],
      },
      {
        code: "7560",
        name: "Cyber Mainnet",
        chain_id: "7560",
        description: "",
        logo: "",
        examples: [
          {
            name: "cyber-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the CyberConnect (0x14778860e937f509e651192a90589de711fb88a9) on Cyber",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Cyber/cyber-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/cyber-mainnet"],
      },
      {
        code: "111557560",
        name: "Cyberconnect L2 Testnet",
        chain_id: "111557560",
        description: "",
        logo: "",
        examples: [
          {
            name: "cyber-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Compound CYBER (0x580278859b01bfdc303ca80b36be364b438105d6) on Cyber Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Cyber/cyber-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/cyberconnect-l2-testnet",
        ],
      },
      {
        code: "53935",
        name: "DFK Chain",
        chain_id: "53935",
        description: "",
        logo: "",
        examples: [
          {
            name: "dfk-chain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WJEWEL Token (0xCCb93dABD71c8Dad03Fc4CE5559dC3D89F67a260) on DFK Chain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "DFK Chain/dfk-chain-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/dfk-chain"],
      },
      {
        code: "2000",
        name: "Dogechain",
        chain_id: "2000",
        description: "",
        logo: "",
        examples: [
          {
            name: "dogechain-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the XEN Crypto (0x948eed4490833D526688fD1E5Ba0b9B35CD2c32e) on Dogechain",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Dogechain/dogechain-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/dogechain-mainnet",
        ],
      },
      {
        code: "568",
        name: "Dogechain Testnet",
        chain_id: "568",
        description: "",
        logo: "",
        examples: [
          {
            name: "dogechain-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the uREKT Token (0x6F301941acF13997eF81E2F9e676f263d938b82D) on Dogechain Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Dogechain/dogechain-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/dogechain-testnet",
        ],
      },
      {
        code: "17000",
        name: "Ethereum Holesky",
        chain_id: "17000",
        description: "",
        logo: "",
        examples: [
          {
            name: "ethereum-holesky-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the GaspV2 (0x5620cDb94BaAaD10c20483bd8705DA711b2Bc0a3) on Ethereum Holesky Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum Holesky/ethereum-holesky-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/ethereum-holesky",
        ],
      },
      {
        code: "42793",
        name: "Etherlink Mainnet",
        chain_id: "42793",
        description: "",
        logo: "",
        examples: [
          {
            name: "etherlink-mainnet-etherlink-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Ether (0xfc24f770F94edBca6D6f885E12d4317320BcB401) on Etherlink Mainnet Etherlink",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Etherlink Mainnet/etherlink-mainnet-etherlink-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/etherlink-mainnet",
        ],
      },
      {
        code: "128123",
        name: "Etherlink Testnet",
        chain_id: "128123",
        description: "",
        logo: "",
        examples: [
          {
            name: "etherlink-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped XTZ (0xB1Ea698633d57705e93b0E40c1077d46CD6A51d8) on Etherlink Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Etherlink/etherlink-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/etherlink-testnet",
        ],
      },
      {
        code: "2109",
        name: "Exosama",
        chain_id: "2109",
        description: "",
        logo: "",
        examples: [
          {
            name: "exosama-network-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Stone (0x122EBE2B679cF54Bc8a6e89c1009714b354e2d10) on Exosama Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Exosama Network/exosama-network-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/exosama"],
      },
      {
        code: "4002",
        name: "Fantom Testnet",
        chain_id: "4002",
        description: "",
        logo: "",
        examples: [
          {
            name: "fantom-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the WFTM (0xE8175A3C1Dd1337aD276a8105ae6375367bf620B) on Fantom Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Fantom/fantom-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/fantom-testnet",
        ],
      },
      {
        code: "88153591557",
        name: "Arbitrum Blueberry",
        chain_id: "88153591557",
        description: "",
        logo: "",
        examples: [
          {
            name: "arbitrum-blueberry-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Playnance (0x73C3cDd1418c3F17D54A81148387d93122802E72) on Arbitrum Blueberry Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Arbitrum Blueberry/arbitrum-blueberry-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/gelato-arbitrum-blueberry",
        ],
      },
      {
        code: "123420111",
        name: "OP Celestia Raspberry",
        chain_id: "123420111",
        description: "",
        logo: "",
        examples: [
          {
            name: "optimism-celestia-raspberry-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the TEST (0x39008557c498c7B620Ec9F882e556faD8ADBdCd5) on Optimism Celestia Raspberry Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Optimism Celestia Raspberry/optimism-celestia-raspberry-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/gelato-opcelestia-raspberry",
        ],
      },
      {
        code: "13371",
        name: "Immutable zkEVM",
        chain_id: "13371",
        description: "",
        logo: "",
        examples: [
          {
            name: "immutable-zkevm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the BitGem (0xd82bbD600c5Ee9fAF1647d39f25F2aF356B2c565) on Immutable zkEVM",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Immutable zkEVM/immutable-zkevm-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/immutable-zkevm-mainnet",
        ],
      },
      {
        code: "13473",
        name: "Immutable zkEVM Testnet",
        chain_id: "13473",
        description: "",
        logo: "",
        examples: [
          {
            name: "immutable-zkevm-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Best Game Token (0x1303F139FEac224ff877e6071C782A41C30F3255) on Immutable zkEVM Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Immutable zkEVM/immutable-zkevm-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/immutable-zkevm-testnet",
        ],
      },
      {
        code: "3441006",
        name: "Manta Pacific Sepolia",
        chain_id: "3441006",
        description: "",
        logo: "",
        examples: [
          {
            name: "manta-pacific-sepolia-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the testUSDC (0x9c76c6304885661CdB97F3984b13114B6D4b5248) on Manta Pacific Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Manta Pacific Sepolia/manta-pacific-sepolia-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/manta-pacific-sepolia",
        ],
      },
      {
        code: "245022934",
        name: "Neon EVM",
        chain_id: "245022934",
        description: "",
        logo: "",
        examples: [
          {
            name: "neon-evm-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Mora (0x2043191e10a2A4b4601F5123D6C94E000b5d915F) on Neon EVM",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Neon EVM/neon-evm-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/neon-mainnet"],
      },
      {
        code: "11155420",
        name: "Optimism Sepolia",
        chain_id: "11155420",
        description: "",
        logo: "",
        examples: [
          {
            name: "op-sepolia-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC (0x5fd84259d66Cd46123540766Be93DFE6D43130D7) on OP Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "OP Sepolia/op-sepolia-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/optimism-sepolia",
        ],
      },
      {
        code: "3338",
        name: "Peaq",
        chain_id: "3338",
        description: "",
        logo: "",
        examples: [
          {
            name: "peaq-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the PEAQ (0x0000000000000000000000000000000000000809) on Peaq",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Peaq/peaq-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/peaq-mainnet"],
      },
      {
        code: "80002",
        name: "Polygon Amoy Testnet",
        chain_id: "80002",
        description: "",
        logo: "",
        examples: [
          {
            name: "polygon-amoy-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the ADIX (0xC9d291858a0F86A499835783093b643D812b3711) on Polygon Amoy Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon Amoy/polygon-amoy-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/polygon-amoy-testnet",
        ],
      },
      {
        code: "2442",
        name: "Polygon zkEVM Cardona Testnet",
        chain_id: "2442",
        description: "",
        logo: "",
        examples: [
          {
            name: "polygon-zkevm-cardona-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the LINK (0x5576815a38A3706f37bf815b261cCc7cCA77e975) on Polygon zkEVM Cardona Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon zkEVM Cardona/polygon-zkevm-cardona-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/polygon-zkevm-cardona-testnet",
        ],
      },
      {
        code: "157",
        name: "Puppynet Shibarium",
        chain_id: "157",
        description: "",
        logo: "",
        examples: [
          {
            name: "puppynet-shibarium-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the App Shib Club (0x165BD68cB3027Ca8fc0F5302cA427192121049aB) on Puppynet Shibarium",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Puppynet Shibarium/puppynet-shibarium-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/puppynet"],
      },
      {
        code: "109",
        name: "Shibarium",
        chain_id: "109",
        description: "",
        logo: "",
        examples: [
          {
            name: "shibarium-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the BAD IDEA AI (0xef99cd3e619C058658043F8775ED9077105D8581) on Shibarium",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Shibarium/shibarium-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/shibarium"],
      },
      {
        code: "93747",
        name: "StratoVM Testnet",
        chain_id: "93747",
        description: "",
        logo: "",
        examples: [
          {
            name: "stratovm-testnet-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the IceCream (0xcc82bD85a3CaAdE271756FB24C831456Ff7c053F) on StratoVM Testnet Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "StratoVM Testnet/stratovm-testnet-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/stratovm-sepolia",
        ],
      },
      {
        code: "53302",
        name: "Superseed Sepolia",
        chain_id: "53302",
        description: "",
        logo: "",
        examples: [
          {
            name: "superseed-sepolia-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC (0x85773169ee07022AA2b4785A5e69803540E9106A) on Superseed Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Superseed Sepolia/superseed-sepolia-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/superseed-sepolia",
        ],
      },
      {
        code: "167000",
        name: "Taiko Mainnet",
        chain_id: "167000",
        description: "",
        logo: "",
        examples: [
          {
            name: "taiko-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Ether (0xA51894664A773981C6C112C43ce576f315d5b1B6) on Taiko",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Taiko/taiko-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/taiko-mainnet"],
      },
      {
        code: "810180",
        name: "zkLink Nova Mainnet",
        chain_id: "810180",
        description: "",
        logo: "",
        examples: [
          {
            name: "zklink-nova-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped BTC (0xDa4AaEd3A53962c83B35697Cd138cc6df43aF71f) on zkLink Nova",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "zkLink Nova/zklink-nova-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/zklink-nova-mainnet",
        ],
      },
      {
        code: "300",
        name: "zkSync Sepolia",
        chain_id: "300",
        description: "",
        logo: "",
        examples: [
          {
            name: "zksync-sepolia-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Bonsai (0xB0588f9A9cADe7CD5f194a5fe77AcD6A58250f82) on zkSync Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "zkSync Sepolia/zksync-sepolia-testnet-starter",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/zksync-sepolia",
        ],
      },
      {
        code: "999999999",
        name: "Zora Sepolia",
        chain_id: "999999999",
        description: "",
        logo: "",
        examples: [
          {
            name: "zora-sepolia-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Atlantis (0xb9E09063BF9C3a9dbFC78Cb294DD9a65273d60e9) on Zora Sepolia Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Zora Sepolia/zora-sepolia-testnet-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/zora-sepolia"],
      },
      {
        code: "5678",
        name: "Tanssi Demo",
        chain_id: "5678",
        description:
          "Tanssi lets developers launch secure, scalable networks in minutes using no-code templates or fully customizable infrastructure.",
        logo: "",
        examples: [
          {
            name: "tannsi-demo-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Catzilla (0xfD523866EB0a1750310c901179b94b6cEE19Dd2C) on Tannsi Demo Testnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Tannsi Demo/tannsi-demo-testnet-starter",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/tanssi"],
      },
      /*
      {
        code: "592",
        name: "Astar",
        chain_id: "592",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/astar-mainnet"],
      },
      {
        code: "64668",
        name: "Bitgert Testnet",
        chain_id: "64668",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/bitgert-testnet",
        ],
      },
      {
        code: "1998",
        name: "Kyoto Testnet",
        chain_id: "1998",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/kyoto-testnet"],
      },
      {
        code: "1287",
        name: "Moonbase Alpha",
        chain_id: "1287",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/moonbase-testnet",
        ],
      },
      {
        code: "1284",
        name: "Moonbeam",
        chain_id: "1284",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/moonbeam-mainnet",
        ],
      },
      {
        code: "1285",
        name: "Moonriver",
        chain_id: "1285",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/moonriver-mainnet",
        ],
      },
      {
        code: "42225",
        name: "Naka Chain",
        chain_id: "42225",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/nakachain"],
      },
      {
        code: "245022926",
        name: "Neon EVM DevNet",
        chain_id: "245022926",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/neon-devnet"],
      },
      {
        code: "5611",
        name: "opBNB Testnet",
        chain_id: "5611",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/opbnb-testnet"],
      },
      {
        code: "98865",
        name: "Plume Mainnet",
        chain_id: "98865",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/plume-mainnet"],
      },
      {
        code: "98864",
        name: "Plume Testnet",
        chain_id: "98864",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/plume-testnet"],
      },
      {
        code: "97072271",
        name: "Prom Testnet",
        chain_id: "97072271",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/prom-testnet"],
      },
      {
        code: "584548796",
        name: "Prom Testnet (v2)",
        chain_id: "584548796",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/prom-testnet-v2",
        ],
      },
      {
        code: "336",
        name: "Shiden",
        chain_id: "336",
        description: "",
        logo: "https://static.subquery.network/network-logos/shiden-kusama.png",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/shiden-mainnet",
        ],
      },
      
      {
        code: "1482601649",
        name: "Skale Nebula",
        chain_id: "1482601649",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/skale-nebula"],
      },
      {
        code: "64165",
        name: "Sonic Testnet",
        chain_id: "64165",
        description: "",
        logo: "",
        examples: [
          {
            name: "name",
            description:
              "This SubQuery project indexes all transfers and approval events for the ",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "path",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/sonic-testnet"],
      },
      */
    ],
  },
  {
    code: "algorand",
    name: "Algorand",
    description:
      "Algorand is a blockchain platform known for its pure proof-of-stake consensus mechanism, ensuring high scalability, security, and decentralization. It's designed for fast, efficient, and cost-effective transaction processing and smart contract execution.",
    logo: "https://static.subquery.network/network-logos/algorand.png",
    networks: [
      {
        code: "algorand",
        name: "Algorand",
        chain_id: "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
        description:
          "A blockchain network known for its fast and efficient consensus mechanism, enabling high-speed and secure transactions for a wide range of applications.",
        logo: "https://static.subquery.network/network-logos/algorand.png",
        examples: [
          {
            name: "algorand-starter",
            description:
              "This SubQuery project indexes all transactions involving the Planet Watch asset on Algorand's Mainnet",
            remote: "https://github.com/subquery/algorand-subql-starter",
            path: "Algorand/algorand-starter",
          },
        ],
        guides: [
          {
            name: "Algorand Quick Start",
            description:
              "The goal of this quick guide is to adapt the standard starter project and start indexing all the PLANET token transfers from Algorand.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/algorand.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmYNRtrcD2QKftkff2UpjV3fr3ubPZuYahTNDAct4Ad2NW",
        ],
      },
    ],
  },
  {
    code: "cosmos",
    name: "Cosmos",
    description:
      "Cosmos is a network of interoperable blockchains that enable independent blockchains, known as 'zones' to communicate and share assets and data through its hub. It promotes blockchain scalability and cross-chain compatibility.",
    logo: "https://static.subquery.network/network-logos/cosmoshub-4.png",
    networks: [
      {
        code: "agoric-3",
        name: "Agoric",
        chain_id: "agoric-3",
        description:
          "Agoric is a blockchain platform designed to facilitate secure and enforceable smart contracts, enabling decentralized applications to operate with economic security and scalability.",
        logo: "https://static.subquery.network/network-logos/agoric-3.png",
        examples: [
          {
            name: "agoric-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Agoric",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Agoric/agoric-starter",
          },
        ],
        guides: [
          {
            name: "Agoric Quick Start",
            description:
              "The goal of this quick start guide is to index all transfer events and messages on the Agoric network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-agoric.html",
            internal: true,
          },
          {
            name: "Agoric Documentation - SubQuery Entry",
            link: "https://docs.agoric.com/guides/subquery-indexing.html",
            internal: false,
          },
        ],
      },
      {
        code: "akashnet-2",
        name: "Akash",
        chain_id: "akashnet-2",
        description:
          "A decentralized cloud computing platform leveraging blockchain technology to enable users to rent and share their compute resources, creating a decentralized cloud infrastructure.",
        logo: "https://static.subquery.network/network-logos/akashnet-2.png",
        examples: [
          {
            name: "akash-starter",
            description:
              "This SubQuery project indexes all rewards paid to delegators on Akash Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Akash/akash-starter",
          },
        ],
        guides: [
          {
            name: "Akash Quick Start",
            description:
              "The goal of this quick start guide is to index all reward transactions for delegators in the Akash network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-akash.html",
            internal: true,
          },
          {
            name: "Akash Documentation - SubQuery Entry",
            link: "https://docs.akash.network/deploy/subquery-indexer",
            internal: false,
          },
        ],
      },
      {
        code: "archway-1",
        name: "Archway",
        chain_id: "archway-1",
        description:
          "A blockchain platform designed for web3 applications and DeFi, enhancing interoperability and scalability within the blockchain ecosystem.",
        logo: "https://static.subquery.network/network-logos/archway-1.png",
        examples: [
          {
            name: "archway-starter",
            description:
              "This SubQuery project indexes all Archway contract metadata and associated rewards paid out to contract creators on Archway",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Archway/archway-starter",
          },
        ],
        guides: [
          {
            name: "Archway Quick Start",
            description:
              "The goal of this quick start guide is to index all Archway contract metadata as well as all rewards paid out to contract developers.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-archway.html",
            internal: true,
          },
          {
            name: "Archway Documentation - SubQuery Entry",
            link: "https://docs.archway.io/developers/developer-tools/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "axelar-dojo-1",
        name: "Axelar",
        chain_id: "axelar-dojo-1",
        description:
          "A decentralized network focused on cross-chain communication and interoperability, facilitating data and asset transfers between various blockchain platforms.",
        logo: "https://static.subquery.network/network-logos/axelar-dojo-1.png",
        examples: [
          {
            name: "axelar-starter",
            description:
              "This SubQuery project indexes all confirmed deposits on Axelar Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Axelar/axelar-starter",
          },
        ],
        guides: [
          {
            name: "Axelar Documentation - SubQuery Entry",
            link: "https://docs.axelar.dev/dev/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "laozi-mainnet",
        name: "Band",
        chain_id: "laozi-mainnet",
        description:
          "BandChain is a High-performance Blockchain Built for Data Oracle. Based on Cosmos' state-of-the-art SDK, BandChain allows efficient, flexible, and scalable data query secured through cryptographic proofs",
        logo: "",
        examples: [
          {
            name: "band-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Band",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Band/band-starter",
          },
        ],
      },
      {
        code: "canto_7700-1",
        name: "Canto",
        chain_id: "canto_7700-1",
        description:
          "https://static.subquery.network/network-logos/canto_7700-1.png",
        logo: "",
        examples: [
          {
            name: "canto-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Canto",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Canto/canto-starter",
          },
        ],
      },
      {
        code: "cheqd-mainnet-1",
        name: "Cheqd",
        chain_id: "cheqd-mainnet-1",
        description:
          "A blockchain for identity and credential verification, providing a trustless and efficient means to verify personal and professional information.",
        logo: "https://static.subquery.network/network-logos/cheqd-mainnet-1.png",
        examples: [
          {
            name: "cheqd-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Cheqd",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Cheqd/cheqd-starter",
          },
        ],
      },
      {
        code: "comdex-1",
        name: "Comdex",
        chain_id: "comdex-1",
        description:
          "A blockchain ecosystem aiming to transform the commodity trading industry by providing transparency and efficiency through decentralized technologies.",
        logo: "https://static.subquery.network/network-logos/comdex-1.png",
        examples: [
          {
            name: "comdex-starter",
            description:
              "This SubQuery project indexes all rewards paid and withdrawls made to delegators on Comdex",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Comdex/comdex-starter",
          },
        ],
      },
      {
        code: "coreum-mainnet-1",
        name: "Coreum",
        chain_id: "coreum-mainnet-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/coreum-mainnet-1.png",
        examples: [
          {
            name: "coreum-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Coreum",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Coreum/coreum-starter",
          },
        ],
        guides: [
          {
            name: "Coreum Quick Start",
            description:
              "The goal of this quick start guide is to index all transfer events and messages on the Coreum network",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-coreum.html",
            internal: true,
          },
        ],
      },
      {
        code: "cosmoshub-4",
        name: "CosmosHub",
        chain_id: "cosmoshub-4",
        description:
          "The hub of the Cosmos network, fostering blockchain interoperability and enabling sovereign, interconnected blockchains to exchange data and assets.",
        logo: "https://static.subquery.network/network-logos/cosmoshub-4.png",
        examples: [
          {
            name: "cosmoshub-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on CosmosHub",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "CosmosHub/cosmoshub-starter",
          },
        ],
      },
      {
        code: "crescent-1",
        name: "Crescent",
        chain_id: "crescent-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/crescent-1.png",
        examples: [
          {
            name: "crescent-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Crescent",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Crescent/crescent-starter",
          },
        ],
      },
      {
        code: "cronosmainnet_25-1",
        name: "Cronos",
        chain_id: "cronosmainnet_25-1",
        description:
          "A blockchain within the Cosmos ecosystem, optimized for DeFi and NFTs, providing a scalable and secure environment for these applications.",
        logo: "https://static.subquery.network/network-logos/cronosmainnet_25-1.png",
        examples: [
          {
            name: "cronos-evm-starter-via-rpc",
            description:
              "This SubQuery project indexes all transactions and approvals of Wrapped CRO Token on Cronos via the Terdermint RPC",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Cronos/cronos-evm-starter-via-rpc",
          },
          {
            name: "cronos-evm-starter-via-eth",
            description:
              "This SubQuery project indexes all transactions and approvals of Wrapped CRO Token on Cronos via the ETH RPC",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Cronos/cronos-evm-starter-via-eth",
          },
        ],
        guides: [
          {
            name: "Cronos Quick Start",
            description:
              "The goal of this quick start guide is to adapt the standard starter project in the Cronos Network and then begin indexing all transfers of Cro Crow Token.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-cronos.html",
            internal: true,
          },
        ],
      },
      {
        code: "cudos-1",
        name: "Cudos",
        chain_id: "cudos-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/cudos-1.png",
        examples: [
          {
            name: "cudos-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Cudos",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Cudos/cudos-starter",
          },
        ],
      },
      {
        code: "dydx-mainnet-1",
        name: "DYDX",
        chain_id: "dydx-mainnet-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/dydx-mainnet-1.png",
        examples: [
          {
            name: "dydx-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on dYdX",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "DYDX/dydx-starter",
          },
        ],
      },
      {
        code: "froopyland_100-1",
        name: "Dymension",
        chain_id: "froopyland_100-1",
        description:
          "Dymension is a home for easily deployable and lightning fast app-chains, called RollApps.",
        logo: "https://static.subquery.network/network-logos/froopyland_100-1.png",
        examples: [
          {
            name: "dymension-starter",
            description:
              "This SubQuery project indexes all transfer events on Dymension",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Dymension/dymension-starter",
          },
        ],
      },
      {
        code: "evmos_9001-2",
        name: "Evmos",
        chain_id: "evmos_9001-2",
        description:
          "A blockchain platform compatible with Ethereum Virtual Machine (EVM), allowing Ethereum developers to deploy their smart contracts and DApps on EVMOS.",
        logo: "https://static.subquery.network/network-logos/evmos_9001-2.png",
        examples: [
          {
            name: "evmos-starter",
            description:
              "This SubQuery project indexes all transfers and sent messages on EVMOS",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Evmos/evmos-starter",
          },
        ],
      },
      {
        code: "evmos_9000-4",
        name: "Evmos Testnet",
        chain_id: "evmos_9000-4",
        description: "",
        logo: "https://static.subquery.network/network-logos/evmos_9000-4.png",
        examples: [
          {
            name: "evmos-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and sent messages on EVMOS Testnet",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Evmos/evmos-testnet-starter",
          },
        ],
        guides: [
          {
            name: "Evmos Documentation - SubQuery Entry",
            link: "https://docs.evmos.org/develop/graphs-indexers",
            internal: false,
          },
        ],
      },
      {
        code: "fetchhub-4",
        name: "Fetch.ai",
        chain_id: "fetchhub-4",
        description:
          "A blockchain platform focusing on autonomous economic agents, enabling IoT devices and AI systems to interact, trade, and make decentralized decisions.",
        logo: "https://static.subquery.network/network-logos/fetchhub-4.png",
        examples: [
          {
            name: "fetchhub-starter",
            description:
              "This SubQuery project indexes all events and messages from Fetch.ai",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Fetch.ai/fetchhub-starter",
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmbtSt8USCUTBWeAqevN1AwmUhKzqmtvhSdFYHYA1BviC8",
        ],
        guides: [
          {
            name: "FetchAI Documentation - SubQuery Entry",
            link: "https://fetch.ai/docs/concepts/fetch-network/indexer/intro#indexer-/-ledger-subquery",
            internal: false,
          },
        ],
      },
      {
        code: "furya-1",
        name: "Furya",
        chain_id: "furya-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/furya-1.png",
        examples: [
          {
            name: "furya-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Furya",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Furya/furya-starter",
          },
        ],
      },
      {
        code: "gitopia",
        name: "Gitopia",
        chain_id: "gitopia",
        description:
          "Gitopia is the next-generation Code Collaboration Platform fuelled by a decentralized network and interactive token economy. It is designed to optimize the open-source software development process through collaboration, transparency, and incentivization.",
        logo: "",
        examples: [
          {
            name: "gitopia-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Gitopia",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Gitopia/gitopia-starter",
          },
        ],
      },
      {
        code: "humans_1089-1",
        name: "HumansAI",
        chain_id: "humans_1089-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/humans_1089-1.png",
        examples: [
          {
            name: "humansai-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on HumansAI",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "HumansAI/humansai-starter",
          },
        ],
      },
      {
        code: "injective-1",
        name: "Injective",
        chain_id: "injective-1",
        description:
          "A decentralized exchange (DEX) protocol built on Cosmos, allowing users to trade various assets with minimal fees and high performance.",
        logo: "https://static.subquery.network/network-logos/injective-1.png",
        examples: [
          {
            name: "injective-starter",
            description:
              "This SubQuery project indexes all spot limit orders on Injective",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Injective/injective-starter",
          },
        ],
      },
      {
        code: "irishub-1",
        name: "Iris",
        chain_id: "irishub-1",
        description:
          "Built with Cosmos-SDK, IRIS Hub enables cross-chain interoperability through a unified service model, while providing a variety of modules to support DeFi applications.",
        logo: "https://static.subquery.network/network-logos/irishub-1.png",
        examples: [
          {
            name: "iris-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Iris",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Iris/iris-starter",
          },
        ],
      },
      {
        code: "juno-1",
        name: "Juno",
        chain_id: "juno-1",
        description:
          "A blockchain within the Cosmos network, emphasizing on decentralized finance, enabling the creation of DeFi applications and interoperability.",
        logo: "https://static.subquery.network/network-logos/juno-1.png",
        examples: [
          {
            name: "juno-starter",
            description:
              "This SubQuery project indexes all events and messages from Juno",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Juno/juno-starter",
          },
        ],
        guides: [
          {
            name: "Juno Quick Start",
            description:
              "The goal of this quick start guide is to adapt the standard starter project in the Juno Network and then begin indexing all votes on the Terra Developer Fund (which also contributed to SubQuery) from Cosmos.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-juno.html",
            internal: true,
          },
          {
            name: "Juno Documentation - SubQuery Entry",
            link: "https://docs.junonetwork.io/developer-guides/subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmPjq55mgUt9S8S491Q3wEbb87fXyEkdxymT6Gwe2xe1Z1",
        ],
      },
      {
        code: "kava_2222-10",
        name: "Kava",
        chain_id: "kava_2222-10",
        description:
          "A DeFi-focused blockchain platform in the Cosmos ecosystem, providing collateralized loans, stablecoins, and other financial services through a secure infrastructure.",
        logo: "https://static.subquery.network/network-logos/kava_2222-10.png",
        examples: [
          {
            name: "kava-starter",
            description:
              "This SubQuery project indexes all sent transfers from Kava",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Kava/kava-starter",
          },
          {
            name: "kava-evm-starter",
            description:
              "This SubQuery project indexes all transactions and approvals of USDT token from Kava's EVM network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Kava/kava-evm-starter",
          },
        ],
      },
      {
        code: "kaiyo-1",
        name: "Kujira",
        chain_id: "kaiyo-1",
        description:
          "Kujira is a blockchain revolutionizing FinTech for web3 builders, dapps and protocols.",
        logo: "https://static.subquery.network/network-logos/kaiyo-1.png",
        examples: [
          {
            name: "kujira-starter",
            description:
              "This SubQuery project indexes all sent transfers from Kujira",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Kujira/kujira-starter",
          },
        ],
        guides: [
          {
            name: "Kujira Documentation - SubQuery Entry",
            link: "https://docs.kujira.app/developers/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "kyve-1",
        name: "Kyve",
        chain_id: "kyve-1",
        description: "https://static.subquery.network/network-logos/kyve-1.png",
        logo: "",
        examples: [
          {
            name: "kyve-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Kyve",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Kyve/kyve-starter",
          },
        ],
        guides: [
          {
            name: "KYVE Documentation - SubQuery Entry",
            link: "https://docs.kyve.network/web3_devs/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "mantle-1",
        name: "Mantle",
        chain_id: "mantle-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/mantle-1.png",
        examples: [
          {
            name: "mantle-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Mantle",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Mantle/mantle-starter",
          },
        ],
      },
      {
        code: "mars-1",
        name: "Mars",
        chain_id: "mars-1",
        description:
          "A blockchain network designed for enterprise solutions, providing a secure and scalable environment for businesses to build and deploy blockchain applications.",
        logo: "https://static.subquery.network/network-logos/mars-1.png",
        examples: [
          {
            name: "mars-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Mars",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Mars/mars-starter",
          },
        ],
        guides: [
          {
            name: "Mars Documentation - SubQuery Entry",
            link: "https://docs.marsprotocol.io/docs/develop/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "migaloo-1",
        name: "Migaloo",
        chain_id: "migaloo-1",
        description:
          "Migaloo is a privacy-focused blockchain network designed for confidential transactions and data sharing, offering enhanced security and anonymity features.",
        logo: "https://static.subquery.network/network-logos/migaloo-1.png",
        examples: [
          {
            name: "migaloo-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Migaloo",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Migaloo/migaloo-starter",
          },
        ],
      },
      {
        code: "neutron-1",
        name: "Neutron",
        chain_id: "neutron-1",
        description:
          "Neutron is a scalable blockchain platform known for its smart contract capabilities and decentralized applications, offering high-performance solutions for developers and users.",
        logo: "https://static.subquery.network/network-logos/neutron-1.png",
        examples: [
          {
            name: "neutron-starter",
            description:
              "This SubQuery project indexes all airdrop claims on Neutron Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Neutron/neutron-starter",
          },
        ],
        guides: [
          {
            name: "Neutron Quick Start",
            description:
              "The goal of this quick start guide is to index all airdrop claims on Neutron Network.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-neutron.html",
            internal: true,
          },
          {
            name: "Neutron Documentation - SubQuery Entry",
            link: "https://docs.neutron.org/tutorials/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "66",
        name: "OKX",
        chain_id: "66",
        description:
          "OKX is a cryptocurrency exchange platform that provides trading services for various digital assets, supporting a wide range of tokens and offering advanced trading features.",
        logo: "https://static.subquery.network/network-logos/66.png",
        examples: [
          {
            name: "okx-starter",
            description:
              "This SubQuery project indexes transactions and approvals of USDT on OKX/OKC Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "OKX/okx-starter",
          },
        ],
      },
      {
        code: "omniflixhub-1",
        name: "OmniFlix Hub",
        chain_id: "omniflixhub-1",
        description:
          "Omniflix is a blockchain network tailored for decentralized video streaming and content distribution, aiming to revolutionize the entertainment industry by eliminating intermediaries.",
        logo: "https://static.subquery.network/network-logos/omniflixhub-1.png",
        examples: [
          {
            name: "omniflixhub-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on OmniFlix Hub",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Omniflixhub/omniflixhub-starter",
          },
        ],
      },
      {
        code: "oraichain",
        name: "Oraichain",
        chain_id: "oraichain",
        description:
          "IBC-enabled Layer 1 to verify multidimensional trustworthiness of AI and to build Web3 applications with AI oracle",
        logo: "https://static.subquery.network/network-logos/oraichain.png",
        examples: [
          {
            name: "oraichain-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Oraichain",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Oraichain/oraichain-starter",
          },
        ],
      },
      {
        code: "osmosis-1",
        name: "Osmosis",
        chain_id: "osmosis-1",
        description:
          "Osmosis is a decentralized exchange platform built on the Cosmos blockchain, enabling users to trade various tokens and assets while maintaining interoperability with other chains.",
        logo: "https://static.subquery.network/network-logos/osmosis-1.png",
        examples: [
          {
            name: "osmosis-starter",
            description:
              "This SubQuery project indexes all swaps on Osmosis' on chain DEX",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Osmosis/osmosis-starter",
          },
        ],
        guides: [
          {
            name: "Osmosis Quick Start",
            description:
              "This guide acts as your entrance to a detailed tutorial for configuring a SubQuery indexer that is specifically designed to index swaps occurring on Osmosis.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-osmosis.html",
            internal: true,
          },
          {
            name: "Osmosis Documentation - SubQuery Entry",
            link: "https://docs.osmosis.zone/overview/integrate/external_projects/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "passage-2",
        name: "Passage",
        chain_id: "passage-2",
        description: "",
        logo: "https://static.subquery.network/network-logos/passage-2.png",
        examples: [
          {
            name: "passage-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Passage",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Passage/passage-starter",
          },
        ],
      },
      {
        code: "core-1",
        name: "Persistence",
        chain_id: "core-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/core-1.png",
        examples: [
          {
            name: "persistence-starter",
            description:
              "This SubQuery project indexes all rewards paid to delegators on Persistence Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Persistence/persistence-starter",
          },
        ],
        guides: [
          {
            name: "Persistence Documentation - SubQuery Entry",
            link: "https://docs.persistence.one/build/indexers/subquery/overview",
            internal: false,
          },
        ],
      },
      {
        code: "quasar-1",
        name: "Quasar",
        chain_id: "quasar-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/quasar-1.png",
        examples: [
          {
            name: "quasar-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Quasar",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Quasar/quasar-starter",
          },
        ],
      },
      {
        code: "ssc-1",
        name: "Saga Protocol",
        chain_id: "ssc-1",
        description:
          "Saga is a Layer-1 protocol that allows developers to automatically spin up parallelized, VM-agnostic, and interoperable dedicated chains, or “Chainlets,” that provide applications with infinite horizontal scalability.",
        logo: "",
        examples: [
          {
            name: "saga-starter",
            description:
              "This project can be use as a starting point for developing your Cosmos Saga based SubQuery project",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Saga/saga-starter",
          },
        ],
      },
      {
        code: "secret-4",
        name: "Secret Network",
        chain_id: "secret-4",
        description:
          "Secret Network is the first blockchain with customizable privacy. You get to choose what you share, with whom, and how. This protects users, and empowers developers to build a better Web3.",
        logo: "https://static.subquery.network/network-logos/secret-4.png",
        examples: [
          {
            name: "secret-starter",
            description:
              "This project can be use as a starting point for developing your Cosmos Secret based SubQuery project",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Secret/secret-starter",
          },
        ],
      },
      {
        code: "atlantic-2",
        name: "Sei",
        chain_id: "atlantic-2",
        description:
          "Sei is a blockchain platform designed to enable decentralized finance solutions and applications through its scalable, secure, and interoperable network.",
        logo: "https://static.subquery.network/network-logos/atlantic-2.png",
        examples: [
          {
            name: "sei-starter",
            description:
              "This SubQuery project indexes all eth-usd prices provided to the Levana Dex protocol by the Pyth price oracle on Sei Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Sei/sei-starter",
          },
        ],
        guides: [
          {
            name: "Sei Quick Start",
            description:
              "The goal of this quick start guide is to index all ETH-USD exchange rates provided to Levana's Sei DEX protocol by the Pyth price oracle.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-sei.html",
            internal: true,
          },
        ],
      },
      {
        code: "shentu-2.2",
        name: "Shentu",
        chain_id: "shentu-2.2",
        description: "",
        logo: "https://static.subquery.network/network-logos/shentu-2.2.png",
        examples: [
          {
            name: "shentu-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Shentu",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Shentu/shentu-starter",
          },
        ],
      },
      {
        code: "sommelier-3",
        name: "Sommelier",
        chain_id: "sommelier-3",
        description: "",
        logo: "https://static.subquery.network/network-logos/sommelier-3.png",
        examples: [
          {
            name: "sommelier-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Sommelier",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Sommelier/sommelier-starter",
          },
        ],
      },
      {
        code: "stargaze-1",
        name: "Stargaze",
        chain_id: "stargaze-1",
        description:
          "Stargaze is a blockchain platform dedicated to NFTs (Non-Fungible Tokens), allowing users to create, trade, and interact with unique digital assets.",
        logo: "https://static.subquery.network/network-logos/stargaze-1.png",
        examples: [
          {
            name: "stargaze-starter",
            description:
              "This SubQuery project indexes all events and messages on Stargaze Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Stargaze/stargaze-starter",
          },
        ],
        guides: [
          {
            name: "Stargaze Documentation - SubQuery Entry",
            link: "https://docs.stargaze.zone/developers/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "stride-1",
        name: "Stride",
        chain_id: "stride-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/stride-1.png",
        examples: [
          {
            name: "stride-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Stride",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Stride/stride-starter",
          },
        ],
      },
      {
        code: "phoenix-1",
        name: "Terra2",
        chain_id: "phoenix-1",
        description:
          "Fueled by a passionate community and deep developer talent pool, the Terra blockchain is built to enable the next generation of Web3 products and services.",
        logo: "https://static.subquery.network/network-logos/phoenix-1.png",
        examples: [
          {
            name: "terra2-starter",
            description:
              "This project can be use as a starting point for developing your Cosmos Terra2 based SubQuery project",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Terra2/terra2-starter",
          },
        ],
      },
      {
        code: "thorchain-mainnet-v1",
        name: "Thorchain",
        chain_id: "thorchain-mainnet-v1",
        description:
          "Thorchain is a decentralized liquidity protocol designed to enable cross-chain cryptocurrency swaps, promoting seamless asset exchange between different blockchain networks.",
        logo: "https://static.subquery.network/network-logos/thorchain-mainnet-v1.png",
        examples: [
          {
            name: "thorchain-starter",
            description:
              "This SubQuery project indexes all deposit events on Thorchain",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Thorchain/thorchain-starter",
          },
        ],
        guides: [
          {
            name: "Thorchain Quick Start",
            description:
              "The goal of this quick start guide is to indexing all deposit messages of Thorchain.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/cosmos-thorchain.html",
            internal: true,
          },
        ],
      },
      {
        code: "umee-1",
        name: "UX",
        chain_id: "umee-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/umee-1.png",
        examples: [
          {
            name: "ux-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on UX (formerly Umee)",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "UX/ux-starter",
          },
        ],
        guides: [
          {
            name: "UX Documentation - SubQuery Entry",
            link: "https://learning.ux.xyz/developers/indexers.html#subquery",
            internal: false,
          },
        ],
      },
      {
        code: "xion-testnet-1",
        name: "XION Testnet",
        chain_id: "xion-testnet-1",
        description:
          "XION empowers developers and brands to create frictionless Web3 experiences, with a Generalized Abstraction layer that removes technical barriers for all users.",
        logo: "",
        examples: [
          {
            name: "xion-testnet-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on XION Testnet",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "XION/xion-testnet-starter",
          },
        ],
      },
    ],
  },
  {
    code: "concordium",
    name: "Concordium",
    description:
      "Concordium´s innovative blockchain is ideal for building ID-centred and privacy-preserving solutions across verticals such as Web3, ESG, Supply Chain, and AI",
    logo: "https://static.subquery.network/network-logos/concordium.png",
    networks: [
      {
        code: "9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478",
        name: "Concordium",
        chain_id:
          "9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478",
        description: "",
        logo: "https://static.subquery.network/network-logos/concordium.png",
        examples: [
          {
            name: "concordium-starter",
            description:
              "This SubQuery project indexes all transfer transactions, updated transaction events, and block rewards on the Concordium Network",
            remote: "https://github.com/subquery/concordium-subql-starter",
            path: "Concordium/concordium-starter",
          },
        ],
        guides: [
          {
            name: "Concordium Documentation - SubQuery Entry",
            link: "https://developer.concordium.software/en/mainnet/net/indexers/subquery.html",
            internal: false,
          },
        ],
      },
      {
        code: "4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796",
        name: "Concordium Testnet",
        chain_id:
          "4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796",
        description: "",
        logo: "https://static.subquery.network/network-logos/concordium.png",
        examples: [
          {
            name: "concordium-testnet-starter",
            description:
              "This SubQuery project indexes all transfer transactions, updated transaction events, and block rewards on the Concordium Test Network",
            remote: "https://github.com/subquery/concordium-subql-starter",
            path: "Concordium/concordium-testnet-starter",
          },
        ],
        guides: [
          {
            name: "Concordium Quick Start",
            description:
              "The goal of this quick start guide is to index all transfer transactions, updated transaction events, and block rewards on the Concordium Test Network",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/concordium.html",
            internal: true,
          },
          {
            name: "Concordium Documentation - SubQuery Entry",
            link: "https://developer.concordium.software/en/mainnet/net/indexers/subquery.html",
            internal: false,
          },
        ],
      },
    ],
  },
  {
    code: "near",
    name: "NEAR",
    description:
      "NEAR is a blockchain platform focused on developer-friendly experiences, scalability, and user-friendly applications. It employs sharding to enhance speed and efficiency, making it suitable for decentralized applications and financial services.",
    logo: "https://static.subquery.network/network-logos/near.png",
    networks: [
      {
        code: "near",
        name: "Near",
        chain_id: "mainnet",
        description:
          "NEAR is a scalable blockchain platform offering smart contracts and decentralized applications, emphasizing usability and accessibility for developers and users.",
        logo: "https://static.subquery.network/network-logos/near.png",
        examples: [
          {
            name: "near-starter",
            description:
              "This SubQuery project indexes all transactions of thetoken.sweat contract token from sweat_welcome.near (which rewards users for physically moving around). It also indexes all storage_deposit calls for the same contract on the NEAR mainnet",
            remote: "https://github.com/subquery/near-subql-starter",
            path: "Near/near-starter",
          },
          {
            name: "near-priceoracle-example",
            description:
              "This is an example project that indexes price oracle feeds from the NEAR blockchain using SubQuery",
            remote: "https://github.com/subquery/near-subql-starter",
            path: "Near/near-priceoracle-example",
          },
          {
            name: "paras-starter",
            description: "",
            remote: "https://github.com/subquery/near-subql-starter",
            path: "Near/paras-starter",
          },
          {
            name: "near-ref-finance",
            description:
              "This SubQuery project indexes the swap actions of the v2.ref-finance.near contract on the NEAR mainnet",
            remote: "https://github.com/subquery/near-subql-starter",
            path: "Near/near-ref-finance",
          },
        ],
        guides: [
          {
            name: "NEAR Quick Start",
            description:
              "The goal of this quick start guide is to index all price submissions from priceoracle.near on NEAR's mainnet",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/near.html",
            internal: true,
          },
          {
            name: "NEAR Ref Finance",
            description:
              "The goal of this quick start guide is to index all price submissions from priceoracle.near on NEAR's mainnet",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/near-ref-finance.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmSKrk3BpzjWzKfS8sZRS5vyjmtXvkJnK8nHUVBhiCmz41",
        ],
      },
      {
        code: "near-aurora",
        name: "Near Aurora",
        chain_id: "1313161554",
        description:
          "NEAR Aurora is a set of tools and infrastructure that extends the NEAR blockchain, enhancing its capabilities and facilitating compatibility with the Ethereum ecosystem.",
        logo: "https://static.subquery.network/network-logos/near-aurora.png",
        examples: [
          {
            name: "near-aurora-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped NEAR token on NEAR's Aurora EVM-compatible Network",
            remote: "https://github.com/subquery/near-subql-starter",
            path: "Near/near-aurora-starter",
          },
        ],
        guides: [
          {
            name: "Aurora Quick Start (EVM)",
            description:
              "The goal of this quick start guide is to index transfers and approvals for the Wrapped NEAR smart contract on NEAR Aurora.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/near-aurora.html",
            internal: true,
          },
        ],
      },
    ],
  },
  {
    code: "polkadot",
    name: "Polkadot",
    description:
      "Polkadot is a multichain network that connects multiple blockchains, known as parachains, allowing them to share security and communicate. It enhances blockchain interoperability, scalability, and cross-chain applications within its ecosystem.",
    logo: "https://static.subquery.network/network-logos/polkadot.png",
    networks: [
      {
        code: "acala",
        name: "Acala",
        chain_id:
          "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c",
        description:
          "Acala is a decentralized financial hub on Polkadot, offering stablecoins, DeFi services, and cross-chain compatibility.",
        logo: "https://static.subquery.network/network-logos/acala.png",
        examples: [
          {
            name: "acala-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Acala/acala-starter",
          },
          {
            name: "acala-evm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Acala/acala-evm-starter",
          },
        ],
        guides: [
          {
            name: "Acala Documentation - SubQuery Entry",
            link: "https://wiki.acala.network/build/indexers/subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmUj8yYCE1YU5UNdtm4q4di4GBDEAmL8vprSRWVGrYeEFm",
        ],
      },
      {
        code: "acurast-canary",
        name: "Acurast Canary",
        chain_id:
          "0xce7681fb12aa8f7265d229a9074be0ea1d5e99b53eedcec2deade43857901808",
        description:
          "A truly decentralized compute layer hosted across the world offering confidential and verifiable computation.",
        logo: "https://static.subquery.network/network-logos/acala.png",
        examples: [
          {
            name: "acurast-canary-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Acurast/acurast-canary-starter",
          },
        ],
      },
      {
        code: "ajuna",
        name: "Ajuna",
        chain_id:
          "0xe358eb1d11b31255a286c12e44fe6780b7edb171d657905a97e39f71d9c6c3ee",
        description: "",
        logo: "https://static.subquery.network/network-logos/ajuna.png",
        examples: [
          {
            name: "ajuna-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Ajuna/ajuna-starter",
          },
        ],
      },
      {
        code: "altair",
        name: "Altair",
        chain_id:
          "0xaa3876c1dc8a1afcc2e9a685a49ff7704cfd36ad8c90bf2702b9d1b00cc40011",
        description: "",
        logo: "https://static.subquery.network/network-logos/altair.png",
        examples: [
          {
            name: "altair-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Altair/altair-starter",
          },
        ],
      },
      {
        code: "astar",
        name: "Astar",
        chain_id:
          "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
        description:
          "A parachain for blockchain developers, offering scalable and customizable smart contract execution environments.",
        logo: "https://static.subquery.network/network-logos/astar.png",
        examples: [
          {
            name: "astar-evm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Astar/astar-evm-starter",
          },
          {
            name: "astar-wasm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Astar/astar-wasm-starter",
          },
          {
            name: "astar-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Astar/astar-starter",
          },
        ],
        guides: [
          {
            name: "Astar (WASM) Quick Start",
            description:
              "This example project indexes all Transactions and Approvals from the Astar Wasm based lottery contract, as well as dApp staking events from Astar's dApp Staking functions.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polkadot-astar.html",
            internal: true,
          },
          {
            name: "Astar Documentation - SubQuery Entry",
            link: "https://docs.astar.network/docs/build/integrations/indexers/subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmapQ6cNKPtZE1jkeUp5V6xy7sPSiJiZpoqZcRRtyc4Stq",
          "https://dict-tyk.subquery.network/query/astar",
        ],
      },
      {
        code: "automata",
        name: "Automata",
        chain_id:
          "0xc8eda34601b5a48c73f47ee39a3a86a858c34f044185b17dc7d5ad155813dc63",
        description: "",
        logo: "https://static.subquery.network/network-logos/automata.png",
        examples: [
          {
            name: "automata-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Automata/automata-starter",
          },
        ],
      },
      {
        code: "avail",
        name: "Avail",
        chain_id:
          "0x6f09966420b2608d1947ccfb0f2a362450d1fc7fd902c29b67c906eaa965a7ae",
        description:
          "Avail is a Web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust minimized way.",
        logo: "https://static.subquery.network/network-logos/avail.png",
        examples: [
          {
            name: "avail-starter",
            description:
              "This SubQuery project indexes all asset transfers using the balances pallet on the Avail Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Avail/avail-starter",
          },
        ],
      },
      {
        code: "avail-turing",
        name: "Avail Turing",
        chain_id:
          "0xd3d2f3a3495dc597434a99d7d449ebad6616db45e4e4f178f31cc6fa14378b70",
        description:
          "Avail is a Web3 infrastructure layer that allows modular execution layers to scale and interoperate in a trust minimized way.",
        logo: "https://static.subquery.network/network-logos/avail-turing.png",
        examples: [
          {
            name: "avail-turing-starter",
            description:
              "This SubQuery project indexes all asset transfers using the balances pallet on the Avail Turing Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Avail/avail-turing-starter",
          },
        ],
      },
      {
        code: "bajun",
        name: "Bajun",
        chain_id:
          "0x35a06bfec2edf0ff4be89a6428ccd9ff5bd0167d618c5a0d4341f9600a458d14",
        description: "",
        logo: "https://static.subquery.network/network-logos/bajun.png",
        examples: [
          {
            name: "bajun-starter",
            description:
              "This SubQuery project indexes all asset transfers using the balances pallet on the Bajun Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Bajun/bajun-starter",
          },
        ],
      },
      {
        code: "basilisk",
        name: "Basilisk",
        chain_id:
          "0xa85cfb9b9fd4d622a5b28289a02347af987d8f73fa3108450e2b4a11c1ce5755",
        description: "",
        logo: "https://static.subquery.network/network-logos/basilisk.png",
        examples: [
          {
            name: "basilisk-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Basilisk/basilisk-starter",
          },
        ],
      },
      {
        code: "bifrost-kusama",
        name: "Bifrost",
        chain_id:
          "0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed",
        description: "",
        logo: "https://static.subquery.network/network-logos/bifrost-kusama.png",
        examples: [
          {
            name: "bifrost-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Bifrost/bifrost-starter",
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmcvcN4gZkiB2JkmK6BdHh7Wzy8Gfp8R7ZHSgGajbGv6Wy",
        ],
      },
      {
        code: "bitcountry-pioneer",
        name: "Bit.Country",
        chain_id:
          "0xf22b7850cdd5a7657bbfd90ac86441275bbc57ace3d2698a740c7b0ec4de5ec3",
        description:
          "Bitcountry enables the creation of decentralized virtual worlds and autonomous communities, giving users the tools to build their own blockchain-based nations.",
        logo: "https://static.subquery.network/network-logos/bitcountry-pioneer.png",
        examples: [
          {
            name: "bitcountry-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Bit.Country/bitcountry-starter",
          },
        ],
      },
      {
        code: "bitgreen",
        name: "BitGreen",
        chain_id:
          "0xc14597baeccb232d662770d2d50ae832ca8c3192693d2b0814e6433f2888ddd6",
        description: "",
        logo: "https://static.subquery.network/network-logos/bitgreen.png",
        examples: [
          {
            name: "bitgreen-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "BitGreen/bitgreen-starter",
          },
        ],
      },
      {
        code: "bittensor",
        name: "BitTensor",
        chain_id:
          "0x2f0555cc76fc2840a25a6ea3b9637146806f1f44b090c175ffde2a7e5ab36c03",
        description:
          "The Bittensor protocol establishes a marketplace that transforms machine intelligence into a tradable commodity.",
        logo: "https://static.subquery.network/network-logos/bittensor.png",
        examples: [
          {
            name: "bittensor-starter",
            description:
              "This SubQuery project indexes all asset transfers using the balances pallet on the Bittensor Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Bittensor/bittensor-starter",
          },
        ],
      },
      {
        code: "calamari",
        name: "Calamari",
        chain_id:
          "0x4ac80c99289841dd946ef92765bf659a307d39189b3ce374a92b5f0415ee17a1",
        description: "",
        logo: "https://static.subquery.network/network-logos/calamari.png",
        examples: [
          {
            name: "calamari-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Calamari/calamari-starter",
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmdrqzazvSmrr6rgfxJEssJH9jqhYCZARm92UxNXMv5f86",
        ],
      },
      {
        code: "centrifuge-polkadot",
        name: "Centrifuge",
        chain_id:
          "0xb3db41421702df9a7fcac62b53ffeac85f7853cc4e689e0b93aeb3db18c09d82",
        description:
          "A parachain enabling asset tokenization and decentralized finance with a focus on real-world assets and cross-chain compatibility.",
        logo: "https://static.subquery.network/network-logos/centrifuge-polkadot.png",
        examples: [
          {
            name: "centrifuge-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Centrifuge/centrifuge-starter",
          },
        ],
      },
      {
        code: "clover",
        name: "Clover",
        chain_id:
          "0x5c7bd13edf349b33eb175ffae85210299e324d852916336027391536e686f267",
        description: "",
        logo: "https://static.subquery.network/network-logos/clover.png",
        examples: [
          {
            name: "clover-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Clover/clover-starter",
          },
        ],
      },
      {
        code: "composable-finance",
        name: "Composable Finance",
        chain_id:
          "0xdaab8df776eb52ec604a5df5d388bb62a050a0aaec4556a64265b9d42755552d",
        description: "",
        logo: "https://static.subquery.network/network-logos/composable-finance.png",
        examples: [
          {
            name: "composable-finance-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Composable Finance/composable-finance-starter",
          },
        ],
      },
      {
        code: "contextfree",
        name: "contextfree",
        chain_id:
          "0x6254c948b5eb7199a112cb308be3385c39c8c942625540ac749c77fe2aebc299",
        description: "",
        logo: "",
        examples: [
          {
            name: "contextfree-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Contextfree/contextfree-starter",
          },
        ],
      },
      {
        code: "crust",
        name: "Crust",
        chain_id:
          "0x4319cc49ee79495b57a1fec4d2bd43f59052dcc690276de566c2691d6df4f7b8",
        description: "",
        logo: "https://static.subquery.network/network-logos/crust.png",
        examples: [
          {
            name: "crust-starter",
            description:
              "This SubQuery project indexes all asset transfers using the balances pallet on the Crust Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Crust/crust-starter",
          },
        ],
      },
      {
        code: "darwinia",
        name: "Darwinia",
        onfinality_code: "darwinia2",
        chain_id:
          "0xf0b8924b12e8108550d28870bc03f7b45a947e1b2b9abf81bfb0b89ecb60570e",
        description:
          "A parachain for facilitating cross-chain asset transfers and token migrations, enhancing Polkadot's interoperability.",
        logo: "https://static.subquery.network/network-logos/darwinia.png",
        examples: [
          {
            name: "darwinia-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Darwinia/darwinia-starter",
          },
        ],
        guides: [
          {
            name: "Darwinia Documentation - SubQuery Entry",
            link: "https://docs.darwinia.network/subquery-24d26214bead4a86a0afcc7b6d05da23",
            internal: false,
          },
        ],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Darwinia Public RPC",
            description: "",
            rate_limit: {
              rate: 200,
              burst: 200,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x48/overview",
            endpoint: "https://darwinia.rpc.subquery.network/public",
            endpoint_ws: "wss://darwinia.rpc.subquery.network/public/ws",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "chain_getBlock"}\' \'https://darwinia.rpc.subquery.network/public\'',
            tags: ["EVM"],
          },
        ],
      },
      {
        code: "efinity-polkadot",
        name: "Efinity",
        chain_id:
          "0x335369975fced3fc22e23498da306a712f4fd964c957364d53c49cea9db8bc2f",
        description: "",
        logo: "https://static.subquery.network/network-logos/efinity-polkadot.png",
        examples: [
          {
            name: "efinity-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Efinity/efinity-starter",
          },
        ],
      },
      {
        code: "encointer",
        name: "Encointer",
        chain_id:
          "0x7dd99936c1e9e6d1ce7d90eb6f33bea8393b4bf87677d675aa63c9cb3e8c5b5b",
        description:
          "A parachain experimenting with decentralized identity and community-driven economic models, focusing on fairness and inclusivity.",
        logo: "https://static.subquery.network/network-logos/encointer.png",
        examples: [
          {
            name: "Encointer-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Encointer/Encointer-starter",
          },
        ],
      },
      {
        code: "energy-web-x",
        name: "Energy Web X",
        chain_id:
          "0x5a51e04b88a4784d205091aa7bada002f3e5da3045e5b05655ee4db2589c33b5",
        description:
          "Decentralized Computation Powering the energy transition.",
        logo: "https://static.subquery.network/network-logos/energy-web-x.png",
        examples: [
          {
            name: "energy-web-x-starter",
            description:
              "This SubQuery project indexes all asset transfers using the balances pallet on the Energy Web X Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Energy Web X/energy-web-x-starter",
          },
        ],
      },
      {
        code: "equilibrium-polkadot",
        name: "Equilibrium",
        chain_id:
          "0x89d3ec46d2fb43ef5a9713833373d5ea666b092fa8fd68fbc34596036571b907",
        description: "",
        logo: "https://static.subquery.network/network-logos/equilibrium-polkadot.png",
        examples: [
          {
            name: "equilibrium-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Equilibrium/equilibrium-starter",
          },
        ],
      },
      {
        code: "frequency",
        name: "Frequency",
        chain_id:
          "0x4a587bf17a404e3572747add7aab7bbe56e805a5479c6c436f07f36fcc8d3ae1",
        description: "",
        logo: "https://static.subquery.network/network-logos/frequency.png",
        examples: [
          {
            name: "frequency-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Frequency/frequency-starter",
          },
        ],
      },
      {
        code: "hashed",
        name: "Hashed Network",
        chain_id:
          "0x331645ae3db556c7754a82f79cece12cce3420975d5b0219d51b1cb4f6ddc21c",
        description: "",
        logo: "https://static.subquery.network/network-logos/hashed.png",
        examples: [
          {
            name: "hashed-network-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "HashedNetwork/hashed-network-starter",
          },
        ],
      },
      {
        code: "humanode",
        name: "Humanode",
        chain_id:
          "0xc56fa32442b2dad76f214b3ae07998e4ca09736e4813724bfb0717caae2c8bee",
        description: "",
        logo: "https://static.subquery.network/network-logos/humanode.png",
        examples: [
          {
            name: "Humanode-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Humanode/Humanode-starter",
          },
        ],
        guides: [
          {
            name: "Humanode Quick Start",
            description:
              "This quick guide aims to adapt the standard starter project and index all transfers, bioauthenitcation events, and online validator nodes from Humanode chain.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polkadot-humanode.html",
            internal: true,
          },
        ],
      },
      {
        code: "hydradx",
        name: "HydraDX",
        chain_id:
          "0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d",
        description:
          "A parachain for decentralized exchange and liquidity management, designed for seamless asset swapping and DeFi services.",
        logo: "https://static.subquery.network/network-logos/hydradx.png",
        examples: [
          {
            name: "hydradx-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "HydraDX/hydradx-starter",
          },
        ],
      },
      {
        code: "integritee-polkadot",
        name: "Integritee Shell",
        chain_id:
          "0xe13e7af377c64e83f95e0d70d5e5c3c01d697a84538776c5b9bbe0e7d7b6034c",
        description: "",
        logo: "https://static.subquery.network/network-logos/integritee-polkadot.png",
        examples: [
          {
            name: "integritee-shell-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "IntegriteeShell/integritee-shell-starter",
          },
        ],
      },
      {
        code: "interlay",
        name: "Interlay",
        chain_id:
          "0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72",
        description:
          "A parachain working on bridging Bitcoin to Polkadot, enabling Bitcoin's use within the Polkadot ecosystem.",
        logo: "https://static.subquery.network/network-logos/interlay.png",
        examples: [
          {
            name: "interlay-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Interlay/interlay-starter",
          },
        ],
      },
      {
        code: "karura",
        name: "Karura",
        chain_id:
          "0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b",
        description: "",
        logo: "https://static.subquery.network/network-logos/karura.png",
        examples: [
          {
            name: "karura-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Karura/karura-starter",
          },
          {
            name: "karura-evm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Karura/karura-evm-starter",
          },
        ],
        guides: [
          {
            name: "Acala Documentation - SubQuery Entry",
            link: "https://wiki.acala.network/build/indexers/subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmPQQA28fxR1hePk25MHNS1vEYRs4Gbz3PXry8G4dfC76N",
        ],
      },
      {
        code: "khala",
        name: "Khala",
        chain_id:
          "0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d",
        description:
          "A parachain specializing in privacy and confidentiality solutions for decentralized applications within the Polkadot network.",
        logo: "https://static.subquery.network/network-logos/khala.png",
        examples: [
          {
            name: "khala-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Khala/khala-starter",
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmP2KRbGx4vLaL8HqugVXrNPMyziFL6aM9NAd4NbFqsPA9",
        ],
      },
      {
        code: "kilt-spiritnet",
        name: "KILT Spiritnet",
        chain_id:
          "0x411f057b9107718c9624d6aa4a3f23c1653898297f3d4d529d9bb6511a39dd21",
        description:
          "A parachain focusing on digital identity and trust solutions, empowering users to control their data and online presence.",
        logo: "https://static.subquery.network/network-logos/kilt-spiritnet.png",
        examples: [
          {
            name: "kilt-spiritnet-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Kilt/kilt-spiritnet-starter",
          },
          {
            name: "kilt-spiritnet-credentials-example",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Kilt/kilt-spiritnet-credentials-example",
          },
        ],
        guides: [
          {
            name: "Kilt Quick Start",
            description:
              "The example project indexes all Attestations created and revoked on the Kilt Spiritnet Blockchain.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polkadot-kilt.html",
            internal: true,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmeBTNuhahUo2EhTRxV3qVAVf5bC8zVQRrrHd3SUDXgtbF",
        ],
      },
      {
        code: "kusama",
        name: "Kusama",
        chain_id:
          "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe",
        description:
          "A sister network to Polkadot, providing a platform for experimenting with blockchain upgrades and innovations before deploying them on Polkadot.",
        logo: "https://static.subquery.network/network-logos/kusama.png",
        examples: [
          {
            name: "kusama-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Kusama/kusama-starter",
          },
        ],
        guides: [
          {
            name: "Polkadot Documentation - SubQuery Entry",
            link: "https://wiki.polkadot.network/docs/build-data#subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmVuW3RxNLySTXzv2mA3xknT7ndXzRWAYHkJ86biYqLUs1",
        ],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Kusama Public RPC",
            description: "",
            rate_limit: {
              rate: 50,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x31/overview",
            endpoint: "https://kusama.rpc.subquery.network/public",
            endpoint_ws: "wss://kusama.rpc.subquery.network/public/ws",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "chain_getBlock"}\' \'https://kusama.rpc.subquery.network/public\'',
            tags: [],
          },
        ],
      },
      {
        code: "kylin",
        name: "Kylin",
        chain_id:
          "0xf2584690455deda322214e97edfffaf4c1233b6e4625e39478496b3e2f5a44c5",
        description: "",
        logo: "https://static.subquery.network/network-logos/kylin.png",
        examples: [
          {
            name: "kylin-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Kylin/kylin-starter",
          },
        ],
      },
      {
        code: "litentry",
        name: "Litentry",
        chain_id:
          "0x2fc8bb6ed7c0051bdcf4866c322ed32b6276572713607e3297ccf411b8f14aa9",
        description: "",
        logo: "https://static.subquery.network/network-logos/litentry.png",
        examples: [
          {
            name: "litentry-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Litentry/litentry-starter",
          },
        ],
      },
      {
        code: "manta-atlantic",
        name: "Manta Atlantic",
        chain_id:
          "0xf3c7ad88f6a80f366c4be216691411ef0622e8b809b1046ea297ef106058d4eb",
        description: "",
        logo: "https://static.subquery.network/network-logos/manta-atlantic.png",
        examples: [
          {
            name: "manta-atlantic-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Manta/manta-atlantic-starter",
          },
        ],
      },
      {
        code: "moonbeam",
        name: "Moonbeam",
        chain_id:
          "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
        description:
          "Moonbeam is a Polkadot parachain focused on Ethereum compatibility, enabling seamless migration of Ethereum DApps to Polkadot while providing developers with smart contract capabilities.",
        logo: "https://static.subquery.network/network-logos/moonbeam.png",
        examples: [
          {
            name: "moonbeam-evm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Moonbeam/moonbeam-evm-starter",
          },
          {
            name: "Moonbeam-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Moonbeam/Moonbeam-starter",
          },
        ],
        guides: [
          {
            name: "Moonbeam (EVM) Quick Start",
            description:
              "The example project indexes all Transfers from the Moonbeam EVM FRAX ERC-20 contract, as well as Collators joining and leaving events from Moonbeam's Staking functions.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polkadot-moonbeam.html",
            internal: true,
          },
          {
            name: "Moonbeam Documentation - SubQuery Entry",
            link: "https://docs.moonbeam.network/builders/integrations/indexers/subquery/",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmUHAsweQYXYrY5Swbt1eHkUwnE5iLc7w9Fh62JY6guXEK",
        ],
      },
      {
        code: "moonriver",
        name: "Moonriver",
        chain_id:
          "0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b",
        description:
          "Moonriver is a canary network of Moonbeam, offering a stable environment for developers to test and deploy projects before launching on the Polkadot network.",
        logo: "https://static.subquery.network/network-logos/moonriver.png",
        examples: [
          {
            name: "moonriver-evm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Moonriver/moonriver-evm-starter",
          },
          {
            name: "Moonbeam-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Moonriver/moonriver-starter",
          },
        ],
        guides: [
          {
            name: "Moonbeam Documentation - SubQuery Entry",
            link: "https://docs.moonbeam.network/builders/integrations/indexers/subquery/",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmWhwLQA4P6iZv6bmQxUqG5zumNK8KDBwcq8wxN4G213dq",
        ],
      },
      {
        code: "nodle",
        name: "Nodle",
        chain_id:
          "0x97da7ede98d7bad4e36b4d734b6055425a3be036da2a332ea5a7037656427a21",
        description:
          "Nodle is a decentralized IoT network parachain on Polkadot, providing infrastructure for the Internet of Things, enabling efficient data sharing, and incentivizing network participants.",
        logo: "https://static.subquery.network/network-logos/nodle.png",
        examples: [
          {
            name: "nodle-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Nodle/nodle-starter",
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmZpj5wYpUbGqJDg6KWgbkK5bmeuCqYX6kwk317jdJ9DZ4",
        ],
      },
      {
        code: "origintrail-parachain",
        name: "OriginTrail",
        chain_id:
          "0xe7e0962324a3b86c83404dbea483f25fb5dab4c224791c81b756cfc948006174",
        description: "",
        logo: "https://static.subquery.network/network-logos/origintrail-parachain.png",
        examples: [
          {
            name: "origintrail-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "OriginTrail/origintrail-starter",
          },
        ],
      },
      {
        code: "parallel",
        name: "Parallel",
        chain_id:
          "0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97",
        description:
          "Parallel Finance is a DeFi-focused parachain that offers lending, borrowing, and yield farming services, enabling users to access decentralized financial tools on Polkadot.",
        logo: "https://static.subquery.network/network-logos/parallel.png",
        examples: [
          {
            name: "parallel-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Parallel/parallel-starter",
          },
        ],
      },
      {
        code: "heiko-kusama",
        name: "Parallel Heiko",
        chain_id:
          "0x64a1c658a48b2e70a7fb1ad4c39eea35022568c20fc44a6e2e3d0a57aee6053b",
        description: "",
        logo: "https://static.subquery.network/network-logos/heiko-kusama.png",
        examples: [
          {
            name: "parallel-heiko-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Parallel/parallel-heiko-starter",
          },
        ],
      },
      {
        code: "peaq",
        name: "Peaq",
        chain_id:
          "0xd2a5d385932d1f650dae03ef8e2748983779ee342c614f80854d32b8cd8fa48c",
        description:
          "Powering a global infrastructure revolution · The home of DePIN Decentralized Physical Infra Networks being built on peaq",
        logo: "https://static.subquery.network/network-logos/peaq.png",
        examples: [
          {
            name: "peaq-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for all ERC20 tokens on Peaq's EVM",
            remote: "https://github.com/subquery/subql-starter",
            path: "Peaq/peaq-starter",
          },
        ],
      },
      {
        code: "polkadex-standalone",
        name: "Polkadex",
        chain_id:
          "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c",
        description:
          "Polkadex is a decentralized exchange parachain aiming to provide a trustless, non-custodial, and high-performance trading platform for various assets within the Polkadot ecosystem.",
        logo: "https://static.subquery.network/network-logos/polkadex-standalone.png",
        examples: [
          {
            name: "polkadex-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Polkadex/polkadex-starter",
          },
        ],
      },
      {
        code: "polkadot",
        name: "Polkadot",
        chain_id:
          "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
        description:
          "Polkadot is the foundational parachain network connecting and coordinating various blockchains, enabling interoperability, scalability, and governance through its relay chain.",
        logo: "https://static.subquery.network/network-logos/polkadot.png",
        examples: [
          {
            name: "Polkadot-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Polkadot/Polkadot-starter",
          },
        ],
        guides: [
          {
            name: "Polkadot/Substrate Quick Start",
            description:
              "The goal of this quick guide is to adapt the standard starter project and start indexing all transfers from Polkadot.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/polkadot.html",
            internal: true,
          },
          {
            name: "Polkadot Documentation - SubQuery Entry",
            link: "https://wiki.polkadot.network/docs/build-data#subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmSxAgGGpaMrYzooWpydmwzutREwomL5nupLZqxURzuJTo",
        ],
        public_rpc: [
          {
            type: "ARCHIVE",
            name: "Polkadot Public RPC",
            description: "",
            rate_limit: {
              rate: 50,
              burst: 50,
            },
            explorer_url:
              "https://app.subquery.network/explorer/project/0x30/overview",
            endpoint: "https://polkadot.rpc.subquery.network/public",
            endpoint_ws: "wss://polkadot.rpc.subquery.network/public/ws",
            example_request:
              'curl -H \'content-type:application/json\' -d \'{"id": 1, "jsonrpc": "2.0", "method": "chain_getBlock"}\' \'https://polkadot.rpc.subquery.network/public\'',
            tags: [],
          },
        ],
      },
      {
        code: "quartz",
        name: "Quartz",
        chain_id:
          "0xcd4d732201ebe5d6b014edda071c4203e16867305332301dc8d092044b28e554",
        description: "",
        logo: "https://static.subquery.network/network-logos/quartz.png",
        examples: [
          {
            name: "quartz-subql-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Quartz/quartz-subql-starter",
          },
        ],
        guides: [
          {
            name: "Unique Documentation - SubQuery Entry",
            link: "https://docs.unique.network/tutorials/subquery-indexer.html",
            internal: false,
          },
        ],
      },
      {
        code: "reef",
        name: "Reef",
        chain_id:
          "0x7834781d38e4798d548e34ec947d19deea29df148a7bf32484b7b24dacf8d4b7",
        description:
          "Reef chain is an EVM compatible blockchain for DeFi. It is fast, scalable, has low transaction costs and does no wasteful mining.",
        logo: "https://static.subquery.network/network-logos/reef.png",
        examples: [
          {
            name: "reef-starter",
            description:
              "his SubQuery project indexes all asset transfers using the balances pallet on the Reef Network",
            remote: "https://github.com/subquery/subql-starter",
            path: "Reef/reef-starter",
          },
        ],
      },
      {
        code: "shiden-kusama",
        name: "Shiden",
        chain_id:
          "0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108",
        description:
          "Shiden is a smart contract parachain designed for developers to create and deploy decentralized applications, utilizing Ethereum-compatible tools and infrastructure within the Kusama network.",
        logo: "https://static.subquery.network/network-logos/shiden-kusama.png",
        examples: [
          {
            name: "shiden-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Shiden/shiden-starter",
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmPiTswpMTeipwnmJkAcwkcg5Se8XfrucGYVKbwuAxQgJ6",
        ],
        guides: [
          {
            name: "Astar Documentation - SubQuery Entry",
            link: "https://docs.astar.network/docs/build/integrations/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "kusama-asset-hub",
        name: "Kusama Asset Hub (Statemine)",
        chain_id:
          "0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a",
        description: "",
        logo: "https://static.subquery.network/network-logos/kusama-asset-hub.png",
        examples: [
          {
            name: "statemine-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Statemine/statemine-starter",
          },
        ],
        guides: [
          {
            name: "Polkadot Documentation - SubQuery Entry",
            link: "https://wiki.polkadot.network/docs/build-data#subquery",
            internal: false,
          },
        ],
      },
      {
        code: "polkadot-asset-hub",
        name: "Polkadot Asset Hub (Statemint)",
        chain_id:
          "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f",
        description: "",
        logo: "https://static.subquery.network/network-logos/polkadot-asset-hub.png",
        examples: [
          {
            name: "statemint-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Statemint/statemint-starter",
          },
        ],
        guides: [
          {
            name: "Polkadot Documentation - SubQuery Entry",
            link: "https://wiki.polkadot.network/docs/build-data#subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/Qme1iQvwLoeh1ZLZVL4zDGZBK1hnMG3xZz1oaLBRvZxT7X",
        ],
      },
      {
        code: "subsocial",
        name: "Subsocial",
        chain_id:
          "0x4a12be580bb959937a1c7a61d5cf24428ed67fa571974b4007645d1886e7c89f",
        description: "",
        logo: "https://static.subquery.network/network-logos/subsocial.png",
        examples: [
          {
            name: "subsocial-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Subsocial/subsocial-starter",
          },
        ],
      },
      {
        code: "t3rn",
        name: "T3rn",
        chain_id:
          "0x9a33d1af38c2736ecddbbbcdc2cb2c3023e9b91dc295ac3f1473fe226e5944a7",
        description: "",
        logo: "https://static.subquery.network/network-logos/t3rn.png",
        examples: [
          {
            name: "t3rn-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "T3rn/t3rn-starter",
          },
        ],
      },
      {
        code: "unique",
        name: "Unique",
        chain_id:
          "0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31",
        description:
          "Unique is a parachain for non-fungible tokens (NFTs), fostering the creation, exchange, and management of unique digital assets in the Polkadot ecosystem.",
        logo: "https://static.subquery.network/network-logos/unique.png",
        examples: [
          {
            name: "unique-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Unique/unique-starter",
          },
        ],
        guides: [
          {
            name: "Unique Documentation - SubQuery Entry",
            link: "https://docs.unique.network/tutorials/subquery-indexer.html",
            internal: false,
          },
        ],
      },
      {
        code: "vara",
        name: "Vara",
        chain_id:
          "0xfe1b4c55fd4d668101126434206571a7838a8b6b93a6d1b95d607e78e6c53763",
        description: "",
        logo: "https://static.subquery.network/network-logos/vara.png",
        examples: [
          {
            name: "vara-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Vara/vara-starter",
          },
        ],
        guides: [
          {
            name: "Vara Documentation - SubQuery Entry",
            link: "https://wiki.vara.network/docs/indexers/subquery",
            internal: false,
          },
        ],
      },
      {
        code: "watr",
        name: "Watr",
        chain_id:
          "0xb53c620c41860278fa3068a5367c8eedceefce8a7c29237d830bc09a71737b5d",
        description: "",
        logo: "https://static.subquery.network/network-logos/watr.png",
        examples: [
          {
            name: "watr-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Watr/watr-starter",
          },
        ],
      },
      {
        code: "westend",
        name: "Westend",
        chain_id:
          "0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e",
        description: "",
        logo: "https://static.subquery.network/network-logos/westend.png",
        examples: [
          {
            name: "westend-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Westend/westend-starter",
          },
        ],
        guides: [
          {
            name: "Polkadot Documentation - SubQuery Entry",
            link: "https://wiki.polkadot.network/docs/build-data#subquery",
            internal: false,
          },
        ],
        dictionaries: [
          "https://gateway.subquery.network/query/QmP1BMJoyJ5iFq6XLSfTJ3D23iWuTG1tnsEffJpNieQnwN",
        ],
      },
      {
        code: "zeitgeist",
        name: "Zeitgeist",
        chain_id:
          "0x1bf2a2ecb4a868de66ea8610f2ce7c8c43706561b6476031315f6640fe38e060",
        description: "",
        logo: "https://static.subquery.network/network-logos/zeitgeist.png",
        examples: [
          {
            name: "zeitgeist-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Zeitgeist/zeitgeist-starter",
          },
        ],
      },
    ],
  },
  {
    code: "starknet",
    name: "Starknet",
    description:
      "Starknet has emerged as a leading Ethereum Layer 2 network, powered by ZK-Rollup technology. Its ecosystem is thriving with innovative developers, from DeFi pioneers to gaming and privacy-focused builders, all driven by the limitless potential of ZKPs.",
    logo: "https://static.subquery.network/network-logos/starknet.png",
    networks: [
      {
        code: "0x534e5f4d41494e",
        name: "Mainnet",
        chain_id: "0x534e5f4d41494e",
        description:
          "Starknet has emerged as a leading Ethereum Layer 2 network, powered by ZK-Rollup technology. Its ecosystem is thriving with innovative developers, from DeFi pioneers to gaming and privacy-focused builders, all driven by the limitless potential of ZKPs.",
        logo: "https://static.subquery.network/network-logos/starknet.png",
        examples: [
          {
            name: "starknet-starter",
            description:
              "This SubQuery project indexes all withdraw call in Invoke transaction and desposit events for the ZkLend market on Starknet Mainnet.",
            remote: "https://github.com/subquery/starknet-subql-starter",
            path: "starknet-starter",
          },
        ],
      },
    ],
  },
  {
    code: "stellar",
    name: "Stellar",
    description:
      "Stellar is a blockchain platform for efficient cross-border payments and token issuance, emphasizing financial inclusion. Soroban is a decentralized, privacy-focused smart contract platform built on Stellar, enhancing confidentiality for decentralized applications.",
    logo: "https://static.subquery.network/network-logos/stellar.png",
    networks: [
      {
        code: "mainnet",
        name: "Mainnet",
        chain_id: "Mainnet",
        description: "",
        logo: "https://static.subquery.network/network-logos/stellar.png",
        examples: [
          {
            name: "soroban-starter",
            description:
              "The example project indexes all soroban transfer events on Stellar's Mainnet. It also indexes all account payments including credits and debits",
            remote: "https://github.com/subquery/stellar-subql-starter",
            path: "Stellar/soroban-starter",
          },
        ],
      },
      {
        code: "testnet",
        name: "Testnet",
        chain_id: "testnet",
        description: "",
        logo: "https://static.subquery.network/network-logos/stellar.png",
        examples: [
          {
            name: "soroban-testnet-starter",
            description:
              "The example project indexes all soroban transfer events on Stellar's Testnet. It also indexes all account payments including credits and debits",
            remote: "https://github.com/subquery/stellar-subql-starter",
            path: "Stellar/soroban-testnet-starter",
          },
        ],
      },
      {
        code: "futurenet",
        name: "Futurenet",
        chain_id: "futurenet",
        description: "",
        logo: "https://static.subquery.network/network-logos/stellar.png",
        examples: [
          {
            name: "soroban-futurenet-starter",
            description:
              "The example project indexes all soroban transfer events on Stellar's Futurenet. It also indexes all account payments including credits and debits",
            remote: "https://github.com/subquery/stellar-subql-starter",
            path: "Stellar/soroban-futurenet-starter",
          },
        ],
        guides: [
          {
            name: "Stellar & Soroban Quick Start",
            description:
              "The example project indexes all soroban transfer events on Stellar's Futurenet. It also indexes all account payments including credits and debits - it's a great way to quickly learn how SubQuery works on a real world hands-on example.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_chains/stellar.html",
            internal: true,
          },
        ],
      },
    ],
  },
  {
    code: "multi",
    name: "Multi-chain",
    description: "",
    logo: "https://static.subquery.network/network-logos/multichain.png",
    networks: [
      {
        code: "multi",
        name: "Multi-chain",
        chain_id: "multi",
        description: "",
        logo: "https://static.subquery.network/network-logos/multichain.png",
        examples: [
          {
            name: "Multichain Example - Galxe",
            description:
              "This SubQuery project indexes the Galxy NFT claims from various chains",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Multi-Chain/galxe",
          },
          {
            name: "Multichain Example - Plasma Bridge",
            description:
              "This sample project indexes transactions on the Plasma Bridge, transferring assets from Polygon to Ethereum",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Multi-Chain/polygon-plasma-bridge",
          },
          {
            name: "Multichain Example - Polkadot Transfers",
            description:
              "This SubQuery project is an example of a multi-chain project that indexes all transfers across both Polkadot and Kusama into the same dataset",
            remote: "https://github.com/subquery/subql-starter",
            path: "Multi-chain/transfers",
          },
          {
            name: "Multichain Example - Safe",
            description:
              "This SubQuery project indexes the Safe multisig signatures from various chains",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Multi-Chain/safe",
          },
          {
            name: "Multichain Example - Snapshot",
            description:
              "This SubQuery project indexes the Snapshot Protocol data from various chains",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Multi-Chain/snapshot",
          },
          {
            name: "Multichain Example - IBC Transfers",
            description:
              "This SubQuery project indexes all IBC transfer events between Cosmos Hub and Osmosis",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Multi-Chain/osmosis-cosmos-bridge",
          },
          {
            name: "Multichain Example - Kava",
            description:
              "This SubQuery project indexes both transactions and approvals of USDT on Kava EVM Network and all sent transfers from Kava Cosmos Co-chain",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Multi-Chain/kava-evm-cosmos-multi-chain",
          },
        ],
        guides: [
          {
            name: "Galxe - Multichain Quick Start",
            description:
              "A step-by-step guide on how to establish a multi-chain indexer that is compatible with Galxe, a prominent platform for creating web3 communities.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_multichain/galxe-nft.html",
            internal: true,
          },
          {
            name: "Plasma Bridge - Multichain Quick Start",
            description:
              "This page explains how to create an multi-chain indexer to index the bridge transfer that are coming from Polygon to Ethereum via the Polygon Plasma Bridge.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_multichain/polygon-plasma-bridge.html",
            internal: true,
          },
          {
            name: "Snapshot - Multichain Quick Start",
            description:
              "A step-by-step manual for establishing a multi-chain indexer compatible with Snapshot, a voting platform that facilitates effortless and gas-free voting for DAOs, DeFi protocols, and NFT communities.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_multichain/snapshot.html",
            internal: true,
          },
          {
            name: "Safe - Multichain Quick Start",
            description:
              "This page explains how to create an multi-chain indexer for [Safe](https://safe.global/), a system that makes secure wallets requiring multiple authorisations.",
            link: "https://academy.subquery.network/indexer/quickstart/quickstart_multichain/safe.html",
            internal: true,
          },
        ],
      },
    ],
  },
];

const publicAIModels: PublicAiModel[] = [
  {
    code: "llama-3-1-instruct-8b",
    name: "Llama 3.1",
    description:
      "Llama 3.1 is a state-of-the-art large language model developed by Meta (formerly Facebook). It builds on the advancements of its predecessors in the Llama series, offering improved natural language understanding, generation, and interaction. Llama 3.1 is designed to be highly efficient, with enhanced capabilities in text completion, translation, summarization, and more, making it useful across a wide range of applications. This version likely includes better contextual understanding, reduced biases, and optimized performance, reflecting the latest innovations in AI and machine learning research.",
    logo: "https://static.subquery.network/ai-logos/llama.png",
    extended_description: "https://llama.meta.com/",
    parameter_size: 405000000000,
    context_window_size: 128000,
    url: "https://subquery.network/ai/demo",
  },
  {
    code: "mistral-large-2",
    name: "Mistral",
    description:
      "Mistral is an advanced language model known for its exceptional performance in natural language processing tasks. Developed by a cutting-edge AI research team, Mistral focuses on delivering high efficiency and accuracy in tasks like text generation, translation, summarization, and comprehension. It is designed to handle complex language structures with ease, making it suitable for diverse applications in various industries. Mistral emphasizes scalability and robustness, offering a flexible solution for developers and businesses looking to leverage AI for language-related challenges.",
    logo: "https://static.subquery.network/ai-logos/mistral.png",
    extended_description: "https://mistral.ai/news/mistral-large-2407/",
    parameter_size: 123000000000,
    context_window_size: 128000,
    url: "https://subquery.network/ai/demo",
  },
  {
    code: "gemma-2",
    name: "Gemma 2",
    description:
      "Gemma 2 is an advanced language model developed by Google's AI research team, representing a significant evolution in natural language understanding and generation. Building on the strengths of its predecessor, Gemma 2 offers enhanced contextual comprehension, more accurate text generation, and improved handling of complex language tasks. It is designed to power a wide range of applications, from conversational AI and content creation to language translation and summarization. Gemma 2 is known for its scalability, efficiency, and the ability to integrate seamlessly into various platforms, making it a robust solution for developers and enterprises seeking cutting-edge AI capabilities.",
    logo: "https://static.subquery.network/ai-logos/gemma.png",
    extended_description:
      "https://blog.google/technology/developers/google-gemma-2/",
    parameter_size: 27000000000,
    context_window_size: 8000,
    url: "https://subquery.network/ai/demo",
  },
];

const dictionaryString = Object.fromEntries(
  networkFamilies.map((f) => [
    f.code.toString() === "evm" ? "ethereum" : f.code.toString(),
    Object.fromEntries(
      f.networks
        .filter((n) => !!n.dictionaries && n.dictionaries.length > 0)
        .map((network) => [network.chain_id, network.dictionaries])
    ),
  ])
);
// Hack till the SDK is ready
dictionaryString["substrate"] = dictionaryString["polkadot"];

const dictionaryJSONString = JSON.stringify(dictionaryString, null, 2);

writeFile("./dist/dictionary.json", dictionaryJSONString, (err) => {
  if (err) throw err;
});

const schemaJSONString = JSON.stringify(networkFamilies, null, 2);

writeFile("./dist/output.json", schemaJSONString, (err) => {
  if (err) throw err;
});

const rpcsOutput: {
  code: string;
  name: string;
  onfinality_code: string;
  chain_id: string;
  description: string;
  logo: string;
  network_family_code: string;
  network_family_name: string;
  rpc: PublicRPC;
}[] = networkFamilies
  .flatMap((nf) =>
    nf.networks
      .filter((n) => n.public_rpc && n.public_rpc.length > 0)
      .flatMap((n) =>
        n.public_rpc?.map((rpc) => {
          return {
            code: n.code,
            name: n.name,
            onfinality_code: n.onfinality_code || n.code,
            chain_id: n.chain_id,
            description: n.description,
            logo: n.logo,
            network_family_code: nf.code,
            network_family_name: nf.name,
            rpc: rpc,
          };
        })
      )
  )
  .flatMap((item) => (item ? [item] : []));

writeFile("./dist/rpcs.json", JSON.stringify(rpcsOutput), (err) => {
  if (err) throw err;
});

writeFile("./dist/ai-models.json", JSON.stringify(publicAIModels), (err) => {
  if (err) throw err;
});
