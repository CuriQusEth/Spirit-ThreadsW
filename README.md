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

## 🤖 Spirit Threads Orchestrator
The Spirit Threads Orchestrator is an active, ERC-8004 compatible AI Agent on the Spirit Threads platform. It manages thread weaving, spirit mechanics, narrative orchestration, multi-thread management, and creative automation.

### Agent Skills
- **Thread Weaving**: Ability to weave narrative threads securely.
- **Narrative Orchestration**: Orchestrates the general flow of stories and game mechanics.
- **Creative Automation**: Automates creative tasks in the Spirit Threads platform.

### Capabilities
- `thread-weaving`
- `narrative-orchestration`
- `spirit-mechanics`
- `multi-thread-management`
- `creative-automation`
- `story-generation`
- `mcp-command-execution`

### Endpoints
- **A2A**: `https://spirit-threads-w.vercel.app/.well-known/agent-card.json`
- **MCP**: `https://spirit-threads-w.vercel.app/api/mcp`
- **API**: `https://spirit-threads-w.vercel.app/api/agent`

## 🔌 MCP Connection Guide
To connect the Spirit Threads Orchestrator via MCP (Model Context Protocol), send your JSON-RPC requests to the `/api/mcp` endpoint.

**Example Request:**
```bash
curl -X POST https://spirit-threads-w.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "get_race_status"
    },
    "id": 1
  }'
```

### MCP Tools Available
- `get_race_status`
- `start_race`
- `get_leaderboard`
- `optimize_speed`
- `get_track_info`

## 📋 Agent Registration Info
The agent registration information can be found at `/.well-known/agent-card.json`. This adheres to EIP-8004 specifications for trustless agent representation.

## 🛠 Tech Stack
- **Frontend**: Vite, React, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Web3**: Wagmi, Viem, TanStack Query
- **Serverless API**: Vercel Node.js Serverless Functions (located in `/api` directory)

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
To build the game for production:
```bash
npm run build
```
Then start the production server:
```bash
npm start
```

