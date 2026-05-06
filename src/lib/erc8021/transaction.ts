export interface AttributionData {
  attributionCode: string;
  builderCode: string;
}

function stringToHex(str: string) {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16);
  }
  return hex;
}

export function generateERC8021Payload(data: AttributionData) {
  return {
    to: '0x0000000000000000000000000000000000000000', // Placeholder for GM/Record address
    value: 0n,
    data: `0x8021${stringToHex(JSON.stringify(data))}` as `0x${string}`,
  };
}
