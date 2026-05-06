export interface AgentConfig {
  address: string;
  permissions: string[];
}

export function verifyTrustlessAgent(config: AgentConfig): boolean {
  // Mock verification of trustless agent for ERC-8004
  return config.address.length === 42 && config.address.startsWith('0x');
}
