'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  FloppyDiskIcon,
  DatabaseIcon,
  RobotIcon,
  CloudIcon,
  LockKeyIcon,
  GlobeIcon,
  EyeIcon,
  EyeSlashIcon
} from '@phosphor-icons/react';
import { saveSystemSettings } from '@/app/customers/admin/actions/settings';
import type { SystemSettings } from '@/customers/lib/system-settings';

type PasswordFieldName =
  | 'ai_api_key'
  | 'agent_api_key'
  | 'pexels_api_key'
  | 's3_secret_access_key'
  | 'admin_password';

export default function SettingsForm({
  initialSettings
}: {
  initialSettings: SystemSettings;
}) {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [visiblePasswordFields, setVisiblePasswordFields] = useState<Record<PasswordFieldName, boolean>>({
    ai_api_key: false,
    agent_api_key: false,
    pexels_api_key: false,
    s3_secret_access_key: false,
    admin_password: false
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await saveSystemSettings(settings);
      if (res.success) {
        toast.success('系统配置保存成功');
      } else {
        toast.error(res.error || '保存失败');
      }
    } catch {
      toast.error('保存时发生错误');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: PasswordFieldName) => {
    setVisiblePasswordFields((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderPasswordInput = ({
    name,
    value,
    placeholder
  }: {
    name: PasswordFieldName;
    value: string;
    placeholder?: string;
  }) => (
    <div className="relative">
      <input
        type={visiblePasswordFields[name] ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 pr-11 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility(name)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
        aria-label={visiblePasswordFields[name] ? '隐藏内容' : '显示内容'}
      >
        {visiblePasswordFields[name] ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
      </button>
    </div>
  );

  return (
    <div className="p-4 lg:p-8 w-full max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            系统配置中心
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">管理 AI、存储、安全等全局环境变量配置。</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <FloppyDiskIcon size={20} weight="bold" />
          {isSaving ? '保存中...' : '保存所有配置'}
        </button>
      </div>

      <div className="space-y-6">
        {/* AI 配置 */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex items-center gap-2">
            <RobotIcon size={20} className="text-zinc-500 dark:text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">AI API 配置</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">API URL</label>
              <input
                type="text"
                name="ai_api_url"
                value={settings.ai_api_url}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                placeholder="https://api.openai.com/v1/chat/completions"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">API Key</label>
                {renderPasswordInput({
                  name: 'ai_api_key',
                  value: settings.ai_api_key,
                  placeholder: 'sk-...'
                })}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">模型名称 (Model)</label>
                <input
                  type="text"
                  name="ai_model"
                  value={settings.ai_model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                  placeholder="gpt-4o / qwen-max"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Agent API Key
              </label>
              {renderPasswordInput({
                name: 'agent_api_key',
                value: settings.agent_api_key,
                placeholder: 'fgpt_sol_agent_...'
              })}
              <p className="text-xs text-zinc-500 mt-1.5">
                用于 `/api/v1` Agent 维护接口的统一鉴权，请求需通过 `apikey` 请求头传递此值。
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Pexels API Key
              </label>
              {renderPasswordInput({
                name: 'pexels_api_key',
                value: settings.pexels_api_key,
                placeholder: '请输入 Pexels API Key'
              })}
              <p className="text-xs text-zinc-500 mt-1.5">
                用于 admin 封面区的“AI 匹配封面”功能，优先读取这里的值。
              </p>
            </div>
          </div>
        </div>

        {/* S3 存储配置 */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex items-center gap-2">
            <CloudIcon size={20} className="text-zinc-500 dark:text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">S3 对象存储配置</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Region</label>
                <input
                  type="text"
                  name="s3_region"
                  value={settings.s3_region}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                  placeholder="us-east-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Endpoint</label>
                <input
                  type="text"
                  name="s3_endpoint"
                  value={settings.s3_endpoint}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                  placeholder="https://s3.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Access Key ID</label>
                <input
                  type="text"
                  name="s3_access_key_id"
                  value={settings.s3_access_key_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Secret Access Key</label>
                {renderPasswordInput({
                  name: 's3_secret_access_key',
                  value: settings.s3_secret_access_key
                })}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Bucket Name</label>
                <input
                  type="text"
                  name="s3_bucket"
                  value={settings.s3_bucket}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Public URL (带协议)</label>
                <input
                  type="text"
                  name="s3_public_url"
                  value={settings.s3_public_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                  placeholder="https://s3.example.com/bucket"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 基础配置 */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex items-center gap-2">
            <DatabaseIcon size={20} className="text-zinc-500 dark:text-zinc-400" />
            <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">基础配置</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <LockKeyIcon size={16} className="text-zinc-500" />
                  后台管理密码
                </label>
                {renderPasswordInput({
                  name: 'admin_password',
                  value: settings.admin_password
                })}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <GlobeIcon size={16} className="text-zinc-500" />
                  前台访问 URL
                </label>
                <input
                  type="text"
                  name="next_public_main_url"
                  value={settings.next_public_main_url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                  placeholder="https://your-main-site.com"
                />
                <p className="text-xs text-zinc-500 mt-1.5">用于从后台直接跳转到前台界面的地址</p>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  <RobotIcon size={16} className="text-zinc-500" />
                  首页客服机器人 URL
                </label>
                <input
                  type="text"
                  name="chatbot_src"
                  value={settings.chatbot_src}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-zinc-900 dark:text-zinc-100 transition-colors"
                  placeholder="https://cloud.fastgpt.cn/chat/share?shareId=..."
                />
                <p className="text-xs text-zinc-500 mt-1.5">
                  用于首页右下角客服机器人 iframe；留空时不加载机器人入口。
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
