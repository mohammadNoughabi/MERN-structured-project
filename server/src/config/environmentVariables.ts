import process from "node:process";

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is missing!`);
  }
  return value;
};

export const ENV = {
  PORT: parseInt(getEnvVar("PORT", "3000"), 10),
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  MONGO_URI: getEnvVar("MONGO_URI"),
} as const;
