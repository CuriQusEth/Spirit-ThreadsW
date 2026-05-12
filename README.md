# Spirit Threads

**Spirit Threads** is a serene, emotional, and deeply satisfying thread-weaving game. You play as a **Thread Weaver**, a guardian of souls who connects lost spirits by weaving beautiful, glowing spiritual threads to restore harmony and create magnificent tapestries of fate.

## 🌌 Core Gameplay
- **Intuitive Drag & Drop**: Drag glowing threads between spirits to connect them.
- **Emotional Resonance**: Match the right emotional threads (Joy, Sorrow, Hope, Rage, Calm) to construct beautiful constellations.
- **Zen Experience**: Relaxing UI, minimal friction, and beautiful ethereal visuals powered by HTML5 Canvas and Framer Motion.
- **Mobile First**: Fully responsive and optimized for portrait mode.

## 🔗 Web3 & On-Chain Integration
Spirit Threads brings the tapestries to the blockchain:
- **Base Mainnet Ready**: Integrated with Wagmi, Viem, and Base accounts.
- **SIWE Integration**: Players can securely sign their tapestry scores on-chain via Sign-In with Ethereum.
- **ERC-8021 & ERC-8004 Ready**: Includes foundational configurations for Trustless Agents and on-chain attribution.
- **Agentic Infrastructure**: Includes an Orchestrator AI Agent configured with `agent-card.json` and Model Context Protocol (MCP) endpoints.

## 🛠 Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animation**: `motion/react`
- **Web3**: Wagmi, Viem, TanStack Query
- **Backend API**: Express (for MCP and Agent Routes)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x

### Installation & Setup
1. Clone this repository or download the source code.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. The application will be running on `http://localhost:3000`.

### Building for Production
To build the game and the Express server for production:
```bash
npm run build
```
Then start the production server:
```bash
npm start
```

## 📜 Lore
In the Ethereal Realm, lost souls drift like stars in a broken sky. As the Thread Weaver, you hold the power to mend these bonds. Every thread you weave pulses with the emotion of the spirits it connects. Will you achieve ultimate harmony?

## 🔒 Configuration & Security
This repository is configured to keep sensitive information secure.
When deploying, make sure to set up any environment variables and authentication keys securely managed by your hosting provider. Builder codes and API endpoints should be correctly injected via your CI/CD pipeline or environment settings.
