import 'server-only';

import dbConnect from '@/customers/lib/db';
import { SystemConfig } from '@/customers/models/SystemConfig';

export interface SystemSettings {
  ai_api_url: string;
  ai_api_key: string;
  ai_model: string;
  agent_api_key: string;
  pexels_api_key: string;
  s3_region: string;
  s3_endpoint: string;
  s3_access_key_id: string;
  s3_secret_access_key: string;
  s3_bucket: string;
  s3_public_url: string;
  admin_password: string;
  next_public_main_url: string;
  chatbot_src: string;
}

export const SYSTEM_SETTINGS_KEYS = [
  'ai_api_url',
  'ai_api_key',
  'ai_model',
  'agent_api_key',
  'pexels_api_key',
  's3_region',
  's3_endpoint',
  's3_access_key_id',
  's3_secret_access_key',
  's3_bucket',
  's3_public_url',
  'admin_password',
  'next_public_main_url',
  'chatbot_src'
] as const;

export type SystemSettingsKey = (typeof SYSTEM_SETTINGS_KEYS)[number];

export async function readSystemSettings(): Promise<SystemSettings> {
  await dbConnect();
  const configs = await SystemConfig.find({});
  const configMap = configs.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return {
    ai_api_url: configMap['ai_api_url'] || process.env.AI_API_URL || '',
    ai_api_key: configMap['ai_api_key'] || process.env.AI_API_KEY || '',
    ai_model: configMap['ai_model'] || process.env.AI_MODEL || '',
    agent_api_key: configMap['agent_api_key'] || process.env.AGENT_API_KEY || '',
    pexels_api_key: configMap['pexels_api_key'] || process.env.PEXELS_API_KEY || '',
    s3_region: configMap['s3_region'] || process.env.S3_REGION || '',
    s3_endpoint: configMap['s3_endpoint'] || process.env.S3_ENDPOINT || '',
    s3_access_key_id: configMap['s3_access_key_id'] || process.env.S3_ACCESS_KEY_ID || '',
    s3_secret_access_key: configMap['s3_secret_access_key'] || process.env.S3_SECRET_ACCESS_KEY || '',
    s3_bucket: configMap['s3_bucket'] || process.env.S3_BUCKET || '',
    s3_public_url: configMap['s3_public_url'] || process.env.S3_PUBLIC_URL || '',
    admin_password: configMap['admin_password'] || process.env.ADMIN_PASSWORD || '',
    next_public_main_url: configMap['next_public_main_url'] || '',
    chatbot_src: configMap['chatbot_src'] || '',
  };
}
