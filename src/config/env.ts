import { config } from 'dotenv';
import { resolve } from 'path';

type TEnvironments =
  | 'TELEGRAM_BOT_TOKEN'
  | 'NODE_ENV'
  | 'PORT'
  | 'REDIS_URL'
  | 'DATABASE_URL'
  | 'BOT_ADMIN_ID'
  | 'WEBHOOK_BASE_URL';

config({ path: resolve(process.cwd(), '.env') });

export default function getEnvVariable(key: TEnvironments, fallback?: string): string {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value ?? fallback!;
}
