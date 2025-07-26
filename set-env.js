const { writeFileSync, existsSync, mkdirSync } = require('fs');
const dotenv = require('dotenv');
const path = require('path');

const env = dotenv.config().parsed;

if (!env) {
  throw new Error('.env file not found or empty');
}

const targetDir = path.resolve(__dirname, 'src/environments');
const targetPath = path.resolve(targetDir, 'environment.ts');

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

let envVariables = '';
Object.keys(env).forEach((key) => {
  envVariables += `  ${key.toUpperCase()}: '${env[key]}',\n`;
});

const envConfigFile = `export const ENV = {\n${envVariables}};\n`;

writeFileSync(targetPath, envConfigFile, { encoding: 'utf8' });

console.log(`Environment file generated at ${targetPath}`);
