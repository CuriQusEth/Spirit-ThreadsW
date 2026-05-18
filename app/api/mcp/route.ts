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
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Spirit Threads Orchestrator MCP Endpoint",
    status: "active",
    description: "Active MCP server for Spirit Threads Orchestrator Agent",
    capabilities: ["thread-weaving", "narrative-orchestration", "creative-automation"],
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { method } = body;

    if (method === 'initialize') {
      return NextResponse.json({
        protocolVersion: '1.0.0',
        capabilities: { tools: {}, prompts: {}, resources: {} },
        serverInfo: {
          name: 'Spirit Threads Orchestrator',
          version: '1.0.0'
        }
      }, { headers: getCorsHeaders() });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
        tools: TOOLS
      }, { headers: getCorsHeaders() });
    }

    if (method === 'tools/call') {
      const { params } = body;
      return NextResponse.json({
        content: [{ type: 'text', text: `Tool ${params?.name} executed successfully.` }],
        isError: false
      }, { headers: getCorsHeaders() });
    }

    if (method === 'prompts/list') {
      return NextResponse.json({ prompts: [] }, { headers: getCorsHeaders() });
    }

    if (method === 'resources/list') {
      return NextResponse.json({ resources: [] }, { headers: getCorsHeaders() });
    }

    return NextResponse.json({
      status: "success",
      message: "MCP command received",
      agent: "Spirit Threads Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    }, { headers: getCorsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400, headers: getCorsHeaders() });
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
