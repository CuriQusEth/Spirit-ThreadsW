import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'

// Base Mainnet (Denim Upgrade: 200ms canonical blocks replacing Flashblocks)
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
} as const

export const config = createConfig({
  chains: [baseDenim],
  pollingInterval: 250, // 200ms-250ms polling aligned with Base Denim's 200ms native block cadence
  transports: {
    [baseDenim.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 150,
    }),
  },
})
