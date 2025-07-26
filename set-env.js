const { writeFileSync, existsSync, mkdirSync } = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// Load .env file
const env = dotenv.config().parsed;

if (!env) {
  throw new Error('.env file not found or empty');
}

const targetDir = path.resolve(__dirname, 'src/environments');
const targetPath = path.resolve(targetDir, 'environment.ts');

// Create folder if not exists
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Build the env object string dynamically
let envVariables = '';
Object.keys(env).forEach((key) => {
  // You can filter keys if needed (e.g., only keys starting with APP_ or something)
  envVariables += `  ${key.toUpperCase()}: '${env[key]}',\n`;
});

const envConfigFile = `export const ENV = {\n${envVariables}};\n`;

// Write to environment.ts
writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });

console.log(`Environment file generated at ${targetPath}`);
