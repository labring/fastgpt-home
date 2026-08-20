/**
 * Rybbit 事件上报工具
 *
 * 全局脚本在 src/app/layout.tsx 中通过 Script 组件加载：
 *   https://track.fastgpt.cn/api/script.js  (data-site-id="fc126799627f")
 *
 * 使用方式：
 *   import { trackRybbitEvent } from '@/customers/lib/rybbit';
 *   trackRybbitEvent('poc_click', { source: 'home_hero', customer_id: 'xxx' });
 */

declare global {
  interface Window {
    rybbit?: {
      event: (name: string, props?: Record<string, unknown>) => void;
      pageview: (props?: Record<string, unknown>) => void;
      error: (error: Error, props?: Record<string, unknown>) => void;
      trackOutbound: (url: string, props?: Record<string, unknown>) => void;
      identify: (id: string, props?: Record<string, unknown>) => void;
    };
  }
}

/**
 * 安全上报 Rybbit 事件。脚本未加载时静默跳过，不抛异常。
 */
export function trackRybbitEvent(name: string, props?: Record<string, unknown>) {
  try {
    window.rybbit?.event(name, props);
  } catch {
    // 静默失败，不影响业务逻辑
  }
}
