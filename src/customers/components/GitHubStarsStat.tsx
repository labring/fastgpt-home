'use client';

import useSWR from 'swr';
import { withBasePath } from '@/customers/lib/base-path';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function GitHubStarsStat({ initial }: { initial: string }) {
  const { data } = useSWR<{ value?: string }>(withBasePath('/api/github-stars'), fetcher, {
    fallbackData: { value: initial },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60 * 60 * 1000,
    dedupingInterval: 60 * 1000
  });

  return <>{data?.value ?? initial}</>;
}
