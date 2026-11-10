import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Base Mainnet (Denim Upgrade: 200ms canonical blocks)
export const baseDenim = {
  ...base,
  name: 'Base Mainnet (Denim)',
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: ['https://mainnet.base.org'],
      webSocket: ['wss://mainnet.base.org'],
    },
  },
} as const;

export const wagmiConfig = createConfig({
  chains: [baseDenim],
  connectors: [
    injected(),
  ],
  pollingInterval: 250, // 200ms-250ms polling cadence for Base Denim 200ms blocks
  transports: {
    [baseDenim.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 150,
    }),
  },
});
