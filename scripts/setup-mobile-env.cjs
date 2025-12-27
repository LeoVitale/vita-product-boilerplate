#!/usr/bin/env node
/**
 * Shared script to setup mobile app .env file with detected IP
 * Usage: node scripts/setup-mobile-env.js
 */

const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');

const MOBILE_DIR = path.join(__dirname, '..', 'apps', 'mobile');
const ENV_FILE = path.join(MOBILE_DIR, '.env');
const ENV_EXAMPLE_FILE = path.join(MOBILE_DIR, '.env.example');

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

function updateEnvFile(ip) {
  let envContent = '';

  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, 'utf-8');
  } else if (fs.existsSync(ENV_EXAMPLE_FILE)) {
    envContent = fs.readFileSync(ENV_EXAMPLE_FILE, 'utf-8');
  } else {
    envContent = `# Mobile App Environment Variables
# API Configuration - Auto-detected IP: ${ip}
EXPO_PUBLIC_API_HOST=${ip}
EXPO_PUBLIC_API_PORT=4000
`;
  }

  // Update or add EXPO_PUBLIC_API_HOST
  const lines = envContent.split('\n');
  let found = false;
  const updatedLines = lines.map((line) => {
    if (line.startsWith('EXPO_PUBLIC_API_HOST=')) {
      found = true;
      return `EXPO_PUBLIC_API_HOST=${ip}`;
    }
    return line;
  });

  if (!found) {
    // Add if not found
    updatedLines.push(`EXPO_PUBLIC_API_HOST=${ip}`);
  }

  // Ensure EXPO_PUBLIC_API_PORT exists
  let portFound = false;
  const finalLines = updatedLines.map((line) => {
    if (line.startsWith('EXPO_PUBLIC_API_PORT=')) {
      portFound = true;
      return line;
    }
    return line;
  });

  if (!portFound) {
    finalLines.push('EXPO_PUBLIC_API_PORT=4000');
  }

  fs.writeFileSync(ENV_FILE, finalLines.join('\n'));
  console.log(`✅ Updated .env file with IP: ${ip}`);
}

const ip = getLocalIP();

if (!ip) {
  console.error('❌ Could not detect local IP address.');
  console.log('\nPlease set EXPO_PUBLIC_API_HOST manually in .env file:');
  console.log('  EXPO_PUBLIC_API_HOST=your.ip.address.here');
  process.exit(1);
}

console.log(`🔍 Detected local IP: ${ip}`);
updateEnvFile(ip);
console.log(`\n📱 Your mobile app will connect to: http://${ip}:4000/graphql`);
