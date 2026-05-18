import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API constraints for MCP and Agent API
  app.get('/api/mcp', (req: Request, res: Response) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Spirit Threads MCP Endpoint",
      status: "active",
      description: "Active MCP server for Spirit Threads Orchestrator Agent",
      capabilities: ["thread-weaving", "narrative-orchestration", "creative-automation"],
      timestamp: new Date().toISOString()
    });
  });

  app.post('/api/mcp', (req: Request, res: Response) => {
    try {
      const body = req.body;
      const { method } = body;

      if (method === 'initialize') {
        res.json({
          protocolVersion: '1.0.0',
          capabilities: { tools: {}, prompts: {}, resources: {} },
          serverInfo: {
            name: 'Spirit Threads Orchestrator',
            version: '1.0.0'
          }
        });
        return;
      }

      const TOOLS = [
        { name: 'get_race_status', description: 'Get the current status of the race', inputSchema: { type: 'object', properties: {} } },
        { name: 'start_race', description: 'Start a new race', inputSchema: { type: 'object', properties: {} } },
        { name: 'get_leaderboard', description: 'Get the current leaderboard', inputSchema: { type: 'object', properties: {} } },
        { name: 'optimize_speed', description: 'Optimize weaving speed', inputSchema: { type: 'object', properties: {} } },
        { name: 'get_track_info', description: 'Get information about the current track', inputSchema: { type: 'object', properties: {} } }
      ];

      if (method === 'tools/list') {
        res.json({ tools: TOOLS });
        return;
      }

      if (method === 'tools/call') {
        const { params } = body;
        res.json({
          content: [{ type: 'text', text: `Tool ${params?.name} executed successfully.` }],
          isError: false
        });
        return;
      }

      res.json({
        status: "success",
        message: "MCP command received",
        agent: "Spirit Threads Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  app.get('/api/agent', (req: Request, res: Response) => {
    res.json({
      name: "Spirit Threads Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Spirit Threads",
      version: "1.0.0"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
