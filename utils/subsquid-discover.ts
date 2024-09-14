import { apiGet } from './request';

const SUBSQUID_GATEWAY_PATH = 'https://cdn.subsquid.io/archives/evm.json';
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

apiGet(SUBSQUID_GATEWAY_PATH).then((data) => {

    console.log(data)
})