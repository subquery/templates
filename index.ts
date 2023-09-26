import { writeFile } from "fs";

type Examples = {
  name: string;
  description: string;
  remote: string;
  path: string;
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
};

type NetworkFamily = {
  code: "evm" | "algorand" | "cosmos" | "near" | "polkadot";
  name: string;
  description: string;
  logo: string;
  networks: Network[];
};

const networkFamilies: NetworkFamily[] = [
  {
    code: "evm",
    name: "EVM Networks",
    description: "",
    logo: "https://static.subquery.network/network-logos/1.png",
    networks: [
      {
        code: "42161",
        name: "Arbitrum One",
        chain_id: "42161",
        description: "",
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
      },
      {
        code: "42170",
        name: "Arbitrum Nova",
        chain_id: "42170",
        description: "",
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
      },
      {
        code: "43114",
        name: "Avalanche",
        chain_id: "43114",
        description: "",
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
      },
      {
        code: "43113",
        name: "Avalanche Fuji",
        chain_id: "43113",
        description: "",
        logo: "",
        examples: [
          {
            name: "avalanche-fuji-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped AVAX on Avalanche Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Avalanche/avalanche-fuji-starter",
          },
        ],
      },
      {
        code: "8453",
        name: "Base",
        chain_id: "8453",
        description: "",
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
      },
      {
        code: "56",
        name: "BNB Smart Chain",
        chain_id: "56",
        description: "",
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
      },
      {
        code: "56288",
        name: "Boba BNB Mainnet (ETH)",
        chain_id: "56288",
        description: "",
        logo: "",
        examples: [
          {
            name: "boba-bnb-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped BOBA on Boba BNB Network.",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Boba/boba-bnb-starter",
          },
        ],
      },
      {
        code: "288",
        name: "Boba Network (ETH)",
        chain_id: "288",
        description: "",
        logo: "",
        examples: [
          {
            name: "boba-eth-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped Eth on Boba (Ethereum) Network.",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Boba/boba-eth-starter",
          },
        ],
      },
      {
        code: "17777",
        name: "EOS",
        chain_id: "17777",
        description: "",
        logo: "",
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
        description: "",
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
            name: "ethereum-uniswap-v3",
            description:
              "This SubQuery project indexes the standard Uniswap V3 project on Ethereum Mainnet",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-uniswap-v3",
          },
        ],
      },
      {
        code: "5",
        name: "Ethereum Goerli",
        chain_id: "5",
        description: "",
        logo: "",
        examples: [
          {
            name: "ethereum-goerli-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Ethereum Goerli",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-goerli-starter",
          },
        ],
      },
      {
        code: "11155111",
        name: "Ethereum Sepolia",
        chain_id: "11155111",
        description: "",
        logo: "",
        examples: [
          {
            name: "ethereum-sepolia-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Ethereum Sepolia",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Ethereum/ethereum-sepolia-starter",
          },
        ],
      },
      {
        code: "14",
        name: "Flare",
        chain_id: "14",
        description: "",
        logo: "https://static.subquery.network/network-logos/14.png",
        examples: [
          {
            name: "flare-starter",
            description: "",
            remote: "https://github.com/subquery/flare-subql-starter",
            path: "Flare/flare-starter",
          },
        ],
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
      },
      {
        code: "250",
        name: "Fantom",
        chain_id: "250",
        description: "",
        logo: "",
        examples: [
          {
            name: "fantom-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped FTM on Fantom Opera Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Fantom/fantom-starter",
          },
        ],
      },
      {
        code: "100",
        name: "Gnosis",
        chain_id: "100",
        description: "",
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
      },
      {
        code: "1666600000",
        name: "Harmony",
        chain_id: "1666600000",
        description: "",
        logo: "",
        examples: [
          {
            name: "harmony-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped ETH token on Harmony Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Harmony/harmony-starter",
          },
        ],
      },
      {
        code: "128",
        name: "Heco Chain",
        chain_id: "128",
        description: "",
        logo: "",
        examples: [
          {
            name: "heco-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Wrapped HT token on Heco Chain Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Heco/heco-starter",
          },
        ],
      },
      {
        code: "13472",
        name: "Immutable Testnet",
        chain_id: "13472",
        description: "",
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
      },
      {
        code: "8217",
        name: "Klaytn",
        chain_id: "8217",
        description: "",
        logo: "",
        examples: [
          {
            name: "klaytn-starter",
            description:
              "This SubQuery project indexes all transfers and approval events Orbit ETH token on Klaytn",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Klaytn/klaytn-starter",
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
      },
      {
        code: "5000",
        name: "Mantle",
        chain_id: "5000",
        description: "",
        logo: "",
        examples: [
          {
            name: "mantle-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Mantle Native token on Mantle Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Mantle/mantle-starter",
          },
        ],
      },
      {
        code: "82",
        name: "Meter",
        chain_id: "82",
        description: "",
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
      },
      {
        code: "1088",
        name: "Metis",
        chain_id: "1088",
        description: "",
        logo: "",
        examples: [
          {
            name: "metis-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Metis Token on Metis Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Metis/metis-starter",
          },
        ],
      },
      {
        code: "10",
        name: "Optimism",
        chain_id: "10",
        description: "",
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
      },
      {
        code: "137",
        name: "Polygon",
        chain_id: "137",
        description: "",
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
        ],
      },
      {
        code: "1101",
        name: "Polygon zkEVM",
        chain_id: "1101",
        description: "",
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
      },
      {
        code: "80001",
        name: "Polygon Mumbai",
        chain_id: "80001",
        description: "",
        logo: "",
        examples: [
          {
            name: "polygon-mumbai-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the wrapped Ether token on Polygon Mumbai Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Polygon/polygon-mumbai-starter",
          },
        ],
      },
      {
        code: "534351",
        name: "Scroll Sepolia",
        chain_id: "534351",
        description: "",
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
      },
      {
        code: "2046399126",
        name: "Skale",
        chain_id: "2046399126",
        description: "",
        logo: "",
        examples: [
          {
            name: "skale-starter",
            description:
              "This SubQuery project indexes all transfers and approval events for the Skale Token on Skale Europa Network",
            remote: "https://github.com/subquery/ethereum-subql-starter",
            path: "Skale/skale-starter",
          },
        ],
      },
      {
        code: "324",
        name: "Zksync",
        chain_id: "324",
        description: "",
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
      },
    ],
  },
  {
    code: "algorand",
    name: "Algorand",
    description: "",
    logo: "https://static.subquery.network/network-logos/algorand.png",
    networks: [
      {
        code: "algorand",
        name: "Algorand",
        chain_id: "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8",
        description: "",
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
      },
    ],
  },
  {
    code: "cosmos",
    name: "Cosmos",
    description: "",
    logo: "https://static.subquery.network/network-logos/cosmoshub-4.png",
    networks: [
      {
        code: "agoric-3",
        name: "Agoric",
        chain_id: "agoric-3",
        description: "",
        logo: "",
        examples: [
          {
            name: "agoric-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Agoric",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Agoric/agoric-starter",
          },
        ],
      },
      {
        code: "akashnet-2",
        name: "Akash",
        chain_id: "akashnet-2",
        description: "",
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
      },
      {
        code: "archway-1",
        name: "Archway",
        chain_id: "archway-1",
        description: "",
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
      },
      {
        code: "axelar-dojo-1",
        name: "Axelar",
        chain_id: "axelar-dojo-1",
        description: "",
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
      },
      {
        code: "cheqd-mainnet-1",
        name: "Cheqd",
        chain_id: "cheqd-mainnet-1",
        description: "",
        logo: "",
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
        description: "",
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
        code: "cosmoshub-4",
        name: "CosmosHub",
        chain_id: "cosmoshub-4",
        description: "",
        logo: "https://static.subquery.network/network-logos/cosmoshub-4.png",
        examples: [
          {
            name: "cosmoshub-starter",
            description:
              "This SubQuery project indexes all transfer evetns and messages on CosmosHub",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "CosmosHub/cosmoshub-starter",
          },
        ],
      },
      {
        code: "cronosmainnet_25-1",
        name: "Cronos",
        chain_id: "cronosmainnet_25-1",
        description: "",
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
      },
      {
        code: "evmos_9001-2",
        name: "Evmos",
        chain_id: "evmos_9001-2",
        description: "",
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
      },
      {
        code: "fetchhub-4",
        name: "Fetch.ai",
        chain_id: "fetchhub-4",
        description: "",
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
      },
      {
        code: "injective-1",
        name: "Injective",
        chain_id: "injective-1",
        description: "",
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
        code: "juno-1",
        name: "Juno",
        chain_id: "juno-1",
        description: "",
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
      },
      {
        code: "kava_2222-10",
        name: "Kava",
        chain_id: "kava_2222-10",
        description: "",
        logo: "https://static.subquery.network/network-logos/kava_2222-10.png",
        examples: [
          {
            name: "kava-starter",
            description:
              "This SubQuery project indexes all sent transfers from Kava",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Kava/kava-starter",
          },
        ],
      },
      {
        code: "mars-1",
        name: "Mars",
        chain_id: "mars-1",
        description: "",
        logo: "",
        examples: [
          {
            name: "mars-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Mars",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Mars/mars-starter",
          },
        ],
      },
      {
        code: "migaloo-1",
        name: "Migaloo",
        chain_id: "migaloo-1",
        description: "",
        logo: "",
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
        description: "",
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
      },
      {
        code: "66",
        name: "OKX",
        chain_id: "66",
        description: "",
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
        description: "",
        logo: "",
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
        code: "osmosis-1",
        name: "Osmosis",
        chain_id: "osmosis-1",
        description: "",
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
      },
      {
        code: "atlantic-2",
        name: "Sei",
        chain_id: "atlantic-2",
        description: "",
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
      },
      {
        code: "stargaze-1",
        name: "Stargaze",
        chain_id: "stargaze-1",
        description: "",
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
      },
      {
        code: "thorchain-mainnet-v1",
        name: "Thorchain",
        chain_id: "thorchain-mainnet-v1",
        description: "",
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
      },
      {
        code: "umee-1",
        name: "Umee",
        chain_id: "umee-1",
        description: "",
        logo: "",
        examples: [
          {
            name: "umee-starter",
            description:
              "This SubQuery project indexes all transfer events and messages on Umee",
            remote: "https://github.com/subquery/cosmos-subql-starter",
            path: "Umee/umee-starter",
          },
        ],
      },
    ],
  },
  {
    code: "near",
    name: "NEAR",
    description: "",
    logo: "https://static.subquery.network/network-logos/near.png",
    networks: [
      {
        code: "near",
        name: "Near",
        chain_id: "mainnet",
        description: "",
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
            name: "paras-starter",
            description: "",
            remote: "https://github.com/subquery/near-subql-starter",
            path: "Near/paras-starter",
          },
        ],
      },
      {
        code: "near-aurora",
        name: "Near Aurora",
        chain_id: "1313161554",
        description: "",
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
      },
    ],
  },
  {
    code: "polkadot",
    name: "Polkadot",
    description: "",
    logo: "https://static.subquery.network/network-logos/polkadot.png",
    networks: [
      {
        code: "acala",
        name: "Acala",
        chain_id:
          "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c",
        description: "",
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
        description: "",
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
      },
      {
        code: "bitcountry-pioneer",
        name: "Bit.Country",
        chain_id:
          "0xf22b7850cdd5a7657bbfd90ac86441275bbc57ace3d2698a740c7b0ec4de5ec3",
        description: "",
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
      },
      {
        code: "centrifuge-polkadot",
        name: "Centrifuge",
        chain_id:
          "0xb3db41421702df9a7fcac62b53ffeac85f7853cc4e689e0b93aeb3db18c09d82",
        description: "",
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
        code: "darwinia",
        name: "Darwinia",
        chain_id:
          "0xf0b8924b12e8108550d28870bc03f7b45a947e1b2b9abf81bfb0b89ecb60570e",
        description: "",
        logo: "https://static.subquery.network/network-logos/darwinia.png",
        examples: [
          {
            name: "darwinia-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Darwinia/darwinia-starter",
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
        description: "",
        logo: "https://static.subquery.network/network-logos/encointer.png",
        examples: [
          {
            name: "encointer-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Encointer/encointer-starter",
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
            path: "Hashed Network/hashed-network-starter",
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
            name: "humanode-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Humanode/humanode-starter",
          },
        ],
      },
      {
        code: "hydradx",
        name: "HydraDX",
        chain_id:
          "0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d",
        description: "",
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
            path: "Integritee Shell/integritee-shell-starter",
          },
        ],
      },
      {
        code: "interlay",
        name: "Interlay",
        chain_id:
          "0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72",
        description: "",
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
      },
      {
        code: "khala",
        name: "Khala",
        chain_id:
          "0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d",
        description: "",
        logo: "https://static.subquery.network/network-logos/khala.png",
        examples: [
          {
            name: "khala-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Khala/khala-starter",
          },
        ],
      },
      {
        code: "kilt-spiritnet",
        name: "KILT Spiritnet",
        chain_id:
          "0x411f057b9107718c9624d6aa4a3f23c1653898297f3d4d529d9bb6511a39dd21",
        description: "",
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
      },
      {
        code: "kusama",
        name: "Kusama",
        chain_id:
          "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe",
        description: "",
        logo: "https://static.subquery.network/network-logos/kusama.png",
        examples: [
          {
            name: "kusama-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Kusama/kusama-starter",
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
        code: "moonbeam",
        name: "Moonbeam",
        chain_id:
          "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
        description: "",
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
      },
      {
        code: "moonriver",
        name: "Moonriver",
        chain_id:
          "0x401a1f9dca3da46f5c4091016c8a2f26dcea05865116b286f60f668207d1474b",
        description: "",
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
      },
      {
        code: "nodle",
        name: "Nodle",
        chain_id:
          "0x97da7ede98d7bad4e36b4d734b6055425a3be036da2a332ea5a7037656427a21",
        description: "",
        logo: "https://static.subquery.network/network-logos/nodle.png",
        examples: [
          {
            name: "nodle-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Nodle/nodle-starter",
          },
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
        description: "",
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
        code: "polkadex-standalone",
        name: "Polkadex",
        chain_id:
          "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c",
        description: "",
        logo: "https://static.subquery.network/network-logos/polkadex-standalone.png",
        examples: [
          {
            name: "polkedex-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Polkadex/polkedex-starter",
          },
        ],
      },
      {
        code: "polkadot",
        name: "Polkadot",
        chain_id:
          "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
        description: "",
        logo: "https://static.subquery.network/network-logos/polkadot.png",
        examples: [
          {
            name: "Polkadot-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Polkadot/Polkadot-starter",
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
      },
      {
        code: "shiden-kusama",
        name: "Shiden",
        chain_id:
          "0xf1cf9022c7ebb34b162d5b5e34e705a5a740b2d0ecc1009fb89023e62a488108",
        description: "",
        logo: "https://static.subquery.network/network-logos/shiden-kusama.png",
        examples: [
          {
            name: "shiden-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Shiden/shiden-starter",
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
      },
      {
        code: "unique",
        name: "Unique",
        chain_id:
          "0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31",
        description: "",
        logo: "https://static.subquery.network/network-logos/unique.png",
        examples: [
          {
            name: "unique-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Unique/unique-starter",
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
        logo: "",
        examples: [
          {
            name: "westend-starter",
            description: "",
            remote: "https://github.com/subquery/subql-starter",
            path: "Westend/westend-starter",
          },
        ],
      },
    ],
  },
];

const schemaString = JSON.stringify(networkFamilies, null, 2);

writeFile("./dist/output.json", schemaString, (err) => {
  if (err) throw err;
});
