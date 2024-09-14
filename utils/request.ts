import fetch from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

const proxy = process.env.https_proxy || process.env.http_proxy || process.env.all_proxy;
const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

export async function apiGet(url: string): Promise<any> {
    return await fetch(url, { agent: agent }).then(res => res.json());
}
export async function apiPost(url: string, body: Record<string, any>): Promise<any> {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        // agent: agent
    }).then(res => res.json());
}
