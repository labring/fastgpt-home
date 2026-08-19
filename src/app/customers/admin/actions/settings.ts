'use server';

import dbConnect from '@/customers/lib/db';
import { SystemConfig } from '@/customers/models/SystemConfig';
import { requireAdminSession } from '@/customers/lib/admin-auth';
import {
  readSystemSettings,
  SYSTEM_SETTINGS_KEYS,
  type SystemSettings,
  type SystemSettingsKey
} from '@/customers/lib/system-settings';

const SECRET_SETTING_KEYS: SystemSettingsKey[] = [
  'ai_api_key',
  'agent_api_key',
  'pexels_api_key',
  's3_secret_access_key',
  'admin_password'
];

function normalizeSettingsInput(settings: Partial<SystemSettings>) {
  return SYSTEM_SETTINGS_KEYS.reduce(
    (acc, key) => {
      const value = settings[key];
      if (value === undefined) {
        return acc;
      }

      acc[key] = String(value).trim();
      return acc;
    },
    {} as Partial<Record<SystemSettingsKey, string>>
  );
}

function maskSecret(value: string) {
  return value ? '********' : '';
}

function maskSystemSettings(settings: SystemSettings): SystemSettings {
  return {
    ...settings,
    ai_api_key: maskSecret(settings.ai_api_key),
    agent_api_key: maskSecret(settings.agent_api_key),
    pexels_api_key: maskSecret(settings.pexels_api_key),
    s3_secret_access_key: maskSecret(settings.s3_secret_access_key),
    admin_password: maskSecret(settings.admin_password)
  };
}

async function ensureAdminAction() {
  if (!(await requireAdminSession())) {
    return { success: false as const, error: '请先登录后台' };
  }

  return null;
}

export async function getSystemSettings(): Promise<SystemSettings> {
  const authError = await ensureAdminAction();
  if (authError) {
    return {
      ai_api_url: '',
      ai_api_key: '',
      ai_model: '',
      agent_api_key: '',
      pexels_api_key: '',
      s3_region: '',
      s3_endpoint: '',
      s3_access_key_id: '',
      s3_secret_access_key: '',
      s3_bucket: '',
      s3_public_url: '',
      admin_password: '',
      next_public_main_url: '',
      chatbot_src: ''
    };
  }

  return maskSystemSettings(await readSystemSettings());
}

export async function saveSystemSettings(settings: Partial<SystemSettings>) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    const normalizedSettings = normalizeSettingsInput(settings);
    for (const key of SECRET_SETTING_KEYS) {
      if (normalizedSettings[key] === '********') {
        delete normalizedSettings[key];
      }
    }

    const operations = Object.entries(normalizedSettings).map(([key, value]) => {
      return SystemConfig.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, returnDocument: 'after' }
      );
    });

    if (operations.length === 0) {
      return { success: true };
    }

    await Promise.all(operations);
    return { success: true };
  } catch (error: unknown) {
    console.error('Failed to save system settings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '保存失败'
    };
  }
}

export async function getPublicMainUrlSetting() {
  const authError = await ensureAdminAction();
  if (authError) return '';

  const settings = await readSystemSettings();
  return settings.next_public_main_url;
}
