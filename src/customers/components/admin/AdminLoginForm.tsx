'use client';

import Image from 'next/image';
import { withBasePath } from '@/customers/lib/base-path';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      toast.error('请输入密码');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(withBasePath('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (data.success) {
        toast.success('登录成功');
        router.push('/customers/admin');
        router.refresh();
      } else {
        toast.error(data.error || '密码错误');
      }
    } catch {
      toast.error('登录请求失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="grid min-h-screen w-full bg-white dark:bg-zinc-950 lg:grid-cols-[1.12fr_0.88fr]">
        <section className="relative min-h-[320px] overflow-hidden bg-zinc-100 dark:bg-zinc-950 lg:min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 via-transparent to-white/10" />
          <div className="relative h-full min-h-[320px] lg:min-h-screen">
            <Image
              src={withBasePath('/admin-login-cover.jpg')}
              alt="FastGPT 后台登录封面"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-320px)] items-center justify-center bg-white px-6 py-10 dark:bg-zinc-950 sm:px-10 lg:min-h-screen lg:px-16">
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-500/10 dark:bg-brand-500/10 dark:ring-brand-400/20">
                <Image src={withBasePath('/fastgpt.svg')} alt="FastGPT" fill sizes="44px" className="p-2.5 object-contain" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  FastGPT Customer Stories
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">后台登录</h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              请输入管理员密码继续访问控制台。
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5" aria-busy={isLoading}>
              <div className="space-y-2">
                <label htmlFor="admin-password" className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  管理员密码
                </label>

                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="请输入密码"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => setIsCapsLockOn(e.getModifierState('CapsLock'))}
                    onKeyUp={e => setIsCapsLockOn(e.getModifierState('CapsLock'))}
                    autoComplete="current-password"
                    autoFocus
                    spellCheck={false}
                    disabled={isLoading}
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3.5 pr-14 text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-brand-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(value => !value)}
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                    className="absolute inset-y-2 right-2 inline-flex items-center justify-center rounded-xl px-3 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>

                <p className={`min-h-5 text-xs ${isCapsLockOn ? 'text-amber-600 dark:text-amber-300' : 'text-zinc-400 dark:text-zinc-500'}`}>
                  {isCapsLockOn ? '检测到大写锁定已开启。' : '支持密码管理器自动填充。'}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || password.trim().length === 0}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3.5 text-base font-medium text-white transition-all hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:bg-brand-600/60"
              >
                {isLoading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}
                {isLoading ? '验证中...' : '登录'}
              </button>
            </form>

            <p className="mt-6 text-xs leading-5 text-zinc-400 dark:text-zinc-500">
              仅限管理员访问，请在可信设备上登录。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
