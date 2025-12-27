#!/usr/bin/env node
/**
 * Shared script to get local IP address
 * Can be used by any app that needs to detect the local network IP
 *
 * Usage:
 *   node scripts/get-local-ip.js
 *   # Outputs: 192.168.1.100
 */

const { networkInterfaces } = require('os');

/**
 * Get the local IP address for network access
 * Uses the same logic as @repo/config/src/network
 */
function getLocalIP() {
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

const ip = getLocalIP();

if (!ip) {
  console.error('Error: Could not detect local IP address');
  process.exit(1);
}

console.log(ip);
