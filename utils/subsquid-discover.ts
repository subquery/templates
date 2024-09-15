import { apiGet } from './request';

const SUBSQUID_GATEWAY_EVM = 'https://cdn.subsquid.io/archives/evm.json';
interface Provider {
  data: string[];
  dataSourceUrl: string;
  provider: string;
  release: string;
  supportTier: number;
}

interface Archive {
  chainId: number;
  chainName: string;
  isTestnet?: boolean;
  network: string;
  providers: Provider[];
}

interface ArchivesResponse {
  archives: Archive[];
}

export async function discoverTykEndpointFromSubsquid(): Promise<Record<string, { chainName: string, network: string, tykEndpoint: string }>> {
  const resp: ArchivesResponse = await apiGet(SUBSQUID_GATEWAY_EVM);
  const tykEndpointInfo = Object.fromEntries(resp.archives.map((archive) => [
    `${archive.chainId}`,
    {
      chainName: archive.chainName,
      network: archive.network,
      tykEndpoint: `https://dict-tyk.subquery.network/query/${archive.network}`

    }
  ]))
  return tykEndpointInfo
}
