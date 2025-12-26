import { networkInterfaces } from 'node:os';

/**
 * Get the local IP address for network access
 *
 * Returns the first non-internal IPv4 address found in network interfaces.
 * Useful for displaying API endpoints accessible from other devices on the network.
 *
 * @returns The local IP address (e.g., "192.168.1.100") or null if not found
 *
 * @example
 * ```ts
 * const ip = getLocalIP();
 * if (ip) {
 *   console.log(`API accessible at: http://${ip}:4000`);
 * }
 * ```
 */
export function getLocalIP(): string | null {
  const interfaces = networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    const nets = interfaces[name];
    if (!nets) continue;

    for (const net of nets) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }

  return null;
}
