"use client";

import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url, { cache: 'no-store' }).then((res) => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        }),
        revalidateOnFocus: true, // 公共可变数据回到页面时重新确认服务端状态
        revalidateOnReconnect: true,
        shouldRetryOnError: false, // 失败后是否重试
        dedupingInterval: 10000, // 默认 10 秒内去重
      }}
    >
      {children}
    </SWRConfig>
  );
}
