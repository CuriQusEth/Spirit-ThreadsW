import { NextResponse } from 'next/server';

const TOOLS = [
  {
    name: 'get_race_status',
    description: 'Get the current status of the race',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'start_race',
    description: 'Start a new race',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_leaderboard',
    description: 'Get the current leaderboard',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'optimize_speed',
    description: 'Optimize weaving speed',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_track_info',
    description: 'Get information about the current track',
    inputSchema: { type: 'object', properties: {} }
  }
];

export async function GET() {
  return NextResponse.json(
    { status: "MCP Server Active. Use POST for JSON-RPC." },
    { headers: getCorsHeaders() }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.jsonrpc !== "2.0") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id || null,
        error: { code: -32600, message: "Invalid Request: missing or invalid jsonrpc version" }
      }, { status: 400, headers: getCorsHeaders() });
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
      return NextResponse.json({
        jsonrpc: "2.0",
        id: id || null,
        error: { code: -32601, message: "Method not found" }
      }, { status: 404, headers: getCorsHeaders() });
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result
    }, { headers: getCorsHeaders() });

  } catch (error) {
    return NextResponse.json({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" }
    }, { status: 400, headers: getCorsHeaders() });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
