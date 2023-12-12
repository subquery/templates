import { writeFile } from "fs";

type Examples = {
  name: string;
  description: string;
  remote: string;
  path: string;
};

type Guide = {
  name: string;
  description: string;
  link: string;
};

type Network = {
  // Code is special and must be http url param compatible (e.g. no spaces or special chars)
  // For EVM chains, we use the chain_id
  // For Cosmos chains, we use the chain_id
  // For Polkadot chains, we use the network ID to match Talisman's
  //   > https://github.com/TalismanSociety/chaindata/blob/v3/chaindata.json
  code: string;
  name: string;
  chain_id: string;
  description: string;
  logo: string;
  examples: Examples[];
  guides: Guide[];
  dictionaries?: string[]; // Array of URLs
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
    | "multi";
  name: string;
  description: string;
  logo: string;
  networks: Network[];
};

const networkFamilies: NetworkFamily[] = [
  {
    code: "evm",
    name: "EVM Networks",
    description:
      "Ethereum is a blockchain platform for decentralized applications and smart contracts. The Ethereum Virtual Machine (EVM) is its decentralized computing environment, enabling the execution of code on the network.",
    logo: "https://static.subquery.network/network-logos/1.png",
    networks: [
      {
        code: "42161",
        name: "Arbitrum One",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/arbitrum.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/arbitrum"],
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
        guides: [],
        dictionaries: ["https://dict-tyk.subquery.network/query/arbitrum-nova"],
      },
      {
        code: "11820",
        name: "Artela Testnet",
        chain_id: "11820",
        description: "",
        logo: "", // "https://static.subquery.network/network-logos/11820.png",
        examples: [
          {
            name: "artela-testnet-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ART (Artella) Token on Artela Test Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Artela/artela-testnet-starter",
          },
        ],
        guides: [],
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
            name: "Astar zKatana Testnet Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the GACHA Token on Astar's zKatana Test Network.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/astar-zkatana.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/avalanche.html",
          },
          {
            name: "Avalanche Quick Start - Crabada NFTs",
            description:
              "The goal of this quick start guide is to index all Crabada NFTs on Avalanche's C-chain.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/avalanche-crabada.html",
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
        guides: [],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/avalanche-testnet",
        ],
      },
      {
        code: "8453",
        name: "Base",
        chain_id: "8453",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/base.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/base-mainnet"],
      },
      {
        code: "84531",
        name: "Base Goerli",
        chain_id: "84531",
        description: "",
        logo: "",
        examples: [
          {
            name: "base-goerli-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDC token on Base's Goerli Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Base/base-goerli-starter",
          },
          {
            name: "base-goerli-faucet",
            description:
              "This SubQuery project indexes all the drips from the USDC faucet contract and calculates the total amount of USDC faucet dripped per day on Base's Goerli Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Base/base-goerli-faucet",
          },
        ],
        guides: [
          {
            name: "Base Goerli Quick Start",
            description:
              "The goal of this quick start guide is to index the total faucets dripped to users from the USDC Faucet contract on Base Goerli Testnet.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/base-goerli.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/base-goerli"],
      },
      {
        code: "56",
        name: "BNB Smart Chain",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/bsc.html",
          },
          {
            name: "BNB Smart Chain (BSC) - PancakeSwap Example",
            description:
              "The goal of this quick start guide is to index the standard PancakeSwap project on BSC",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/bsc.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/binance"],
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
        guides: [],
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
            name: "opbnb-subql-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth token on opBNB Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "BNB Smart Chain/opbnb-starter",
          },
        ],
        guides: [],
      },
      {
        code: "56288",
        name: "Boba BNB Mainnet",
        chain_id: "56288",
        description:
          "A privacy-focused blockchain project, offering features like confidential transactions and data protection to enhance user privacy and security.",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/boba-bnb.html",
          },
        ],
      },
      {
        code: "288",
        name: "Boba Network",
        chain_id: "288",
        description:
          "A privacy-focused blockchain project, offering features like confidential transactions and data protection to enhance user privacy and security.",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/boba-eth.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/celo.html",
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
        guides: [],
      },
      {
        code: "1",
        name: "Ethereum",
        chain_id: "1",
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
        ],
        guides: [
          {
            name: "Ethereum Quick Start - Gravatar (Simple)",
            description:
              "The goal of this quick start guide is to index all Ethereum Gravatars created or updated on the Ethereum mainnet.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html",
          },
          {
            name: "Ethereum Quick Start - BAYC (Simple)",
            description:
              "The goal of this article is to provide a comprehensive guide to setting up an indexer for the Bored Ape Yacht Club (BAYC) smart contract.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/ethereum-bayc.html",
          },
          {
            name: "Ethereum Quick Start - Chainlink (Medium)",
            description:
              "This guide serves as your gateway to a comprehensive guide on setting up a SubQuery indexer specifically tailored to index data from Chainlink Data Feeds.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/ethereum-chainlink.html",
          },
          {
            name: "Ethereum Quick Start - Opensea (Medium)",
            description:
              "This guide is designed to seamlessly lead you through the steps of configuring your personal OpenSea SubQuery indexer.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/ethereum-opensea.html",
          },
          {
            name: "Ethereum Quick Start - Uniswap (Complex)",
            description:
              "The objective of this article is to offer a detailed, step-by-step guide on setting up a SubQuery indexer for Uniswap v3 protocol.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/ethereum-uniswap.html",
          },
          {
            name: "Ethereum Quick Start - ENS (Complex)",
            description:
              "This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes all ENS Records in the ENS registry.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/ethereum-ens.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/eth-mainnet"],
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
        guides: [],
        dictionaries: ["https://dict-tyk.subquery.network/query/eth-goerli"],
      },
      {
        code: "11155111",
        name: "Ethereum Sepolia",
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
        guides: [],
        dictionaries: ["https://dict-tyk.subquery.network/query/sepolia"],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/fantom.html",
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
            remote: "https://github.com/subquery/flare-subql-starter",
            path: "Flare/flare-starter",
          },
        ],
        guides: [
          {
            name: "Flare Quick Start",
            description:
              "The goal of this quick start guide is to index all rewards from the Flare FTSO Reward Manager from Flare's Songbird network.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/flare.html",
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
            remote: "https://github.com/subquery/flare-subql-starter",
            path: "Flare/songbird-starter",
          },
        ],
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/gnosis.html",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/gnosis-mainnet",
        ],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/harmony.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/heco.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/immutable-testnet.html",
          },
        ],
      },
      {
        code: "8217",
        name: "Klaytn",
        chain_id: "8217",
        description:
          "A public blockchain platform from South Korea, developed by Kakao, focusing on user-friendly DApp development and featuring its native KLAY token.",
        logo: "https://static.subquery.network/network-logos/8217.png",
        examples: [
          {
            name: "klaytn-starter",
            description:
              "This SubQuery project indexes all transfers and approval events Orbit ETH token on Klaytn",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Klaytn/klaytn-starter",
          },
        ],
        guides: [
          {
            name: "Klaytn Quick Start",
            description:
              "The goal of this quick start guide is to index all transfers and approval events from the Orbit ETH on Klaytn Network.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/klaytn.html",
          },
        ],
      },
      {
        code: "59144",
        name: "Linea",
        chain_id: "59144",
        description: "",
        logo: "https://static.subquery.network/network-logos/59144.png",
        examples: [
          {
            name: "linea-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Linea Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Linea/linea-starter",
          },
        ],
        guides: [],
        dictionaries: ["https://dict-tyk.subquery.network/query/linea-mainnet"],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/mantle.html",
          },
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/meter.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/metis.html",
          },
        ],
      },
      {
        code: "42262",
        name: "Oasis Emerald",
        chain_id: "42262",
        description:
          "Oasis Emerald is a high-performance, privacy-focused blockchain platform designed to facilitate secure, scalable, and decentralized applications while prioritizing data confidentiality and integrity.",
        logo: "",
        examples: [
          {
            name: "oasis-emerald-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the YUZU Token on Oasis Emerald",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Oasis/oasis-emerald-starter",
          },
        ],
        guides: [],
      },
      {
        code: "10",
        name: "Optimism",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/optimism.html",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/optimism-mainnet",
        ],
      },
      {
        code: "137",
        name: "Polygon",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polygon.html",
          },
          {
            name: "Polygon Quick Start - Lens Protocol",
            description:
              "This article's purpose is to provide a clear, step-by-step guide on setting up an indexer for the Lens Protocol on the Polygon blockchain.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polygon-lens.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/polygon"],
      },
      {
        code: "1101",
        name: "Polygon zkEVM",
        chain_id: "1101",
        description: "Polygon zkEVM is a Layer 2 scaling solution that utilizes zero-knowledge proofs to enable efficient and secure decentralized applications on the Ethereum network.",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polygon-zkevm.html",
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
        guides: [],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/polygon-mumbai",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/scroll.html",
          },
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/scroll-sepolia.html",
          },
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/skale.html",
          },
        ],
      },
      {
        code: "40",
        name: "Telos Mainnet",
        chain_id: "40",
        description:
          "Redefining Speed, Reliability, and Efficiency with the World's Fastest EVM.",
        logo: "",
        examples: [
          {
            name: "telos-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDT Token on Telos Mainnetwork",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Telos/telos-starter",
          },
        ],
        guides: [],
      },
      {
        code: "41",
        name: "Telos Testnet",
        chain_id: "41",
        description:
          "Redefining Speed, Reliability, and Efficiency with the World's Fastest EVM.",
        logo: "",
        examples: [
          {
            name: "telos-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the USDT Token on Telos Mainnetwork",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Telos/telos-testnet-starter",
          },
        ],
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/zksync-era.html",
          },
        ],
        dictionaries: [
          "https://dict-tyk.subquery.network/query/zksync-mainnet",
        ],
      },
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
        chain_id: "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/algorand.html",
          },
        ],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/Algorand-Dictionary",
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
        description: "Agoric is a blockchain platform designed to facilitate secure and enforceable smart contracts, enabling decentralized applications to operate with economic security and scalability.",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-agoric.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-akash.html",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-archway.html",
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
        guides: [],
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
        guides: [],
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
        guides: [],
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/cosmos-hub-dictionary",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-cronos.html",
          },
        ],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/cosmos-cronos-dictionary",
        ],
      },
      {
        code: "froopyland_100-1",
        name: "Dymension",
        chain_id: "froopyland_100-1",
        description:
          "Dymension is a home for easily deployable and lightning fast app-chains, called RollApps.",
        logo: "",
        examples: [
          {
            name: "dymension-starter",
            description:
              "This SubQuery project indexes all transfer events on Dymension",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Dymension/dymension-starter",
          },
        ],
        guides: [],
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
        guides: [],
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
        guides: [],
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/cosmos-fetch-ai-dictionary",
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
        guides: [],
      },
      {
        code: "irishub-1",
        name: "Iris",
        chain_id: "irishub-1",
        description:
          "Built with Cosmos-SDK, IRIS Hub enables cross-chain interoperability through a unified service model, while providing a variety of modules to support DeFi applications.",
        logo: "",
        examples: [
          {
            name: "iris-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Iris",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Iris/iris-starter",
          },
        ],
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-juno.html",
          },
        ],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/cosmos-juno-dictionary",
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
        guides: [],
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
        guides: [],
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
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-neutron.html",
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
        guides: [],
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
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-osmosis.html",
          },
        ],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/cosmos-osmosis-dictionary",
        ],
      },
      {
        code: "core-1",
        name: "Persistence",
        chain_id: "core-1",
        description: "",
        logo: "",
        examples: [
          {
            name: "persistence-starter",
            description:
              "This SubQuery project indexes all rewards paid to delegators on Persistence Network",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Persistence/persistence-starter",
          },
        ],
        guides: [],
      },
      {
        code: "atlantic-2",
        name: "Sei",
        chain_id: "atlantic-2",
        description: "Sei is a blockchain platform designed to enable decentralized finance solutions and applications through its scalable, secure, and interoperable network.",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-sei.html",
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/cosmos-stargaze-dictionary",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/cosmos-thorchain.html",
          },
        ],
      },
      {
        code: "umee-1",
        name: "Umee",
        chain_id: "umee-1",
        description: "",
        logo: "https://static.subquery.network/network-logos/umee-1.png",
        examples: [
          {
            name: "umee-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Umee",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Umee/umee-starter",
          },
        ],
        guides: [],
      },
    ],
  },
  {
    code: "concordium",
    name: "Concordium",
    description: "Concordium´s innovative blockchain is ideal for building ID-centred and privacy-preserving solutions across verticals such as Web3, ESG, Supply Chain, and AI",
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
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/concordium.html",
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
        ],
        guides: [
          {
            name: "NEAR Quick Start",
            description:
              "The goal of this quick start guide is to index all price submissions from priceoracle.near on NEAR's mainnet",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/near.html",
          },
        ],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/near-dictionary",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/near-aurora.html",
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
        guides: [],
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
        guides: [],
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
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polkadot-astar.html",
          },
        ],
        dictionaries: ["https://dict-tyk.subquery.network/query/astar"],
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
        guides: [],
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
        guides: [],
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/bifrost-parachain-dictionary",
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
        guides: [],
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
        guides: [],
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/calamari-dictionary",
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
        guides: [],
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
        guides: [],
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
        guides: [],
      },
      {
        code: "darwinia",
        name: "Darwinia",
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
        guides: [],
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
        guides: [],
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
            name: "encointer-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Encointer/encointer-starter",
          },
        ],
        guides: [],
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
        guides: [],
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
        guides: [],
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
            path: "Hashed Network/hashed-network-starter",
          },
        ],
        guides: [],
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
            name: "humanode-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Humanode/humanode-starter",
          },
        ],
        guides: [
          {
            name: "Humanode Quick Start",
            description:
              "This quick guide aims to adapt the standard starter project and index all transfers, bioauthenitcation events, and online validator nodes from Humanode chain.",
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polkadot-humanode.html",
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
        guides: [],
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
            path: "Integritee Shell/integritee-shell-starter",
          },
        ],
        guides: [],
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
        guides: [],
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
        guides: [],
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
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polkadot-kilt.html",
          },
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
        guides: [],
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
        guides: [],
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
            name: "moonbeam-substrate-evm-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Moonbeam/moonbeam-substrate-evm-starter",
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polkadot-moonbeam.html",
          },
        ],
        dictionaries: [],
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
        guides: [],
        dictionaries: [],
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
        guides: [],
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
        guides: [],
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/parallel-dictionary",
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
        guides: [],
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
            name: "polkedex-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Polkadex/polkedex-starter",
          },
        ],
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/polkadot.html",
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
            name: "quartz-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Quartz/quartz-starter",
          },
        ],
        guides: [],
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/shiden-dictionary",
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
        guides: [],
        dictionaries: [
          "https://api.subquery.network/sq/subquery/statemint-dictionary",
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
        guides: [],
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
        guides: [],
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
        guides: [],
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
        guides: [],
      },
      {
        code: "westend",
        name: "Westend",
        chain_id:
          "0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e",
        description: "",
        logo: "",
        examples: [
          {
            name: "westend-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Westend/westend-starter",
          },
        ],
        guides: [],
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
        guides: [],
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
            link: "https://academy.subquery.network/quickstart/quickstart_chains/stellar.html",
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
            remote: "https://github.com/subquery/subql-starter",
            path: "Multi-Chain/polygon-plasma-bridge",
          },
          {
            name: "Multichain Example - Polkadot Transfers",
            description:
              "This SubQuery project is an example of a multi-chain project that indexes all transfers across both Polkadot and Kusama into the same dataset",
            remote: "https://github.com/subquery/subql-starter",
            path: "Multi-Chain/transfers",
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
        ],
        guides: [
          {
            name: "Galxe - Multichain Quick Start",
            description:
              "A step-by-step guide on how to establish a multi-chain indexer that is compatible with Galxe, a prominent platform for creating web3 communities.",
            link: "https://academy.subquery.network/quickstart/quickstart_multichain/galxe-nft.html",
          },
          {
            name: "Plasma Bridge - Multichain Quick Start",
            description:
              "This page explains how to create an multi-chain indexer to index the bridge transfer that are coming from Polygon to Ethereum via the Polygon Plasma Bridge.",
            link: "https://academy.subquery.network/quickstart/quickstart_multichain/polygon-plasma-bridge.html",
          },
          {
            name: "Snapshot - Multichain Quick Start",
            description:
              "A step-by-step manual for establishing a multi-chain indexer compatible with Snapshot, a voting platform that facilitates effortless and gas-free voting for DAOs, DeFi protocols, and NFT communities.",
            link: "https://academy.subquery.network/quickstart/quickstart_multichain/snapshot.html",
          },
          {
            name: "Safe - Multichain Quick Start",
            description:
              "This page explains how to create an multi-chain indexer for [Safe](https://safe.global/), a system that makes secure wallets requiring multiple authorisations.",
            link: "https://academy.subquery.network/quickstart/quickstart_multichain/safe.html",
          },
        ],
      },
    ],
  },
];

const dictionaryString = Object.fromEntries(
  networkFamilies.map((f) => [
    f.code.toString() === "evm" ? "ethereum" : f.code.toString(),
    Object.fromEntries(
      f.networks
        .filter((n) => !!n.dictionaries && n.dictionaries.length > 0)
        .map((network) => [network.code, network.dictionaries])
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
