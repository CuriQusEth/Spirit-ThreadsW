import type { VercelRequest, VercelResponse } from '@vercel/node';

const TOOLS = [
  { name: 'get_race_status', description: 'Get the current status of the race', inputSchema: { type: 'object', properties: {} } },
  { name: 'start_race', description: 'Start a new race', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_leaderboard', description: 'Get the current leaderboard', inputSchema: { type: 'object', properties: {} } },
  { name: 'optimize_speed', description: 'Optimize weaving speed', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_track_info', description: 'Get information about the current track', inputSchema: { type: 'object', properties: {} } }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: "MCP Server Active. Use POST for JSON-RPC." });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};

      if (body.jsonrpc !== "2.0") {
        return res.status(400).json({
          jsonrpc: "2.0",
          id: body.id || null,
          error: { code: -32600, message: "Invalid Request: missing or invalid jsonrpc version" }
        });
      }

      const { method, params, id } = body;
      let result;

      if (method === 'initialize') {
        result = {
          protocolVersion: '1.0.0',
          capabilities: { tools: {}, prompts: {}, resources: {} },
          serverInfo: {
            name: 'Spirit Threads Orchestrator',
            version: '1.0.0'
          }
        };
      } else if (method === 'tools/list') {
        result = { tools: TOOLS };
      } else if (method === 'tools/call') {
        result = {
          content: [{ type: 'text', text: `Tool ${params?.name} executed successfully.` }],
          isError: false
        };
      } else if (method === 'prompts/list') {
        result = { prompts: [] };
      } else if (method === 'resources/list') {
        result = { resources: [] };
      } else {
        return res.status(404).json({
          jsonrpc: "2.0",
          id: id || null,
          error: { code: -32601, message: "Method not found" }
        });
      }

      return res.status(200).json({
        jsonrpc: "2.0",
        id,
        result
      });

    } catch (error) {
      return res.status(400).json({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" }
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
