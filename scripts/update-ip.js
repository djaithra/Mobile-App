// Script to update API Base URL in .env

const os = require("os");
const fs = require("fs");
const interfaces = os.networkInterfaces();

let ip = "localhost";

// Try to find Wi-Fi/WLAN adapter first
const preferredNames = ["Wi-Fi", "WLAN", "Wireless Network Connection"];
let found = false;

for (const preferred of preferredNames) {
  if (interfaces[preferred]) {
    for (const iface of interfaces[preferred]) {
      if (iface.family === "IPv4" && !iface.internal) {
        ip = iface.address;
        found = true;
        break;
      }
    }
  }
  if (found) break;
}

// If not found, fallback to any non-internal IPv4
if (!found) {
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        ip = iface.address;
        found = true;
        break;
      }
    }
    if (found) break;
  }
}

const path = ".env";
const key = "EXPO_PUBLIC_API_URL";
const value = `http://${ip}:3001`;

let env = "";
if (fs.existsSync(path)) {
  env = fs.readFileSync(path, "utf8");
  // Remove any existing line with the key
  env = env.replace(new RegExp(`^${key}=.*$`, "m"), "");
  env = env.trim();
}

const newLine = `${key}=${value}`;
env = env ? `${env}\n${newLine}` : newLine;

fs.writeFileSync(path, env + "\n");
console.log(".env updated!");

