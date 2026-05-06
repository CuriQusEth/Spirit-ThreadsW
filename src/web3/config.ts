import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    // walletConnect({ projectId: 'YOUR_PROJECT_ID' }), // Placeholder if needed
  ],
  transports: {
    [base.id]: http(),
  },
});
