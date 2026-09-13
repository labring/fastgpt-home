/**
 * Rybbit 安全事件上报工具。全局脚本未加载时静默跳过，不影响业务逻辑。
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

export function trackRybbitEvent(name: string, props?: Record<string, unknown>) {
  try {
    window.rybbit?.event(name, props);
  } catch {
    // Analytics failures must not interrupt page rendering or CRM submission.
  }
}
