import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSolutionPublicHref } from '@/customers/lib/solution-url';
import { toast } from 'sonner';
import type { Solution } from '@/customers/components/SolutionCard';
import {
  fetchFirstMatchedSolution,
  requestSmartSearchMatch,
  SMART_SEARCH_EMPTY_DESCRIPTION
} from '@/customers/lib/solution-search';
import { trackRybbitEvent } from '@/customers/lib/rybbit';

interface UseHomeSmartSearchInput {
  solutions: Solution[];
  onMatched: () => void;
}

export function useHomeSmartSearch({ solutions, onMatched }: UseHomeSmartSearchInput) {
  const router = useRouter();
  const [isAiSearching, setIsAiSearching] = useState(false);

  const handleSmartSearch = useCallback(async (query: string) => {
    setIsAiSearching(true);
    try {
      const data = await requestSmartSearchMatch(query);

      if (data.matched_case) {
        // Rybbit 上报：AI 搜索匹配成功
        trackRybbitEvent('search', {
          keyword: query,
          result_count: 1,
          search_type: 'ai'
        });

        let matchedSolution: Solution | null =
          solutions.find((solution) => solution.title === data.matched_case) || null;

        if (!matchedSolution) {
          try {
            matchedSolution = await fetchFirstMatchedSolution<Solution>(data.matched_case);
          } catch (error) {
            console.error('Failed to fetch matched solution detail', error);
          }
        }

        if (matchedSolution) {
          onMatched();
          router.push(getSolutionPublicHref(matchedSolution));
          toast.success(`为您找到匹配案例：${matchedSolution.title}`);
        } else {
          toast.info('抱歉，未能匹配到相关智能应用，请换个说法试试~', {
            description: SMART_SEARCH_EMPTY_DESCRIPTION
          });
        }
      } else {
        // Rybbit 上报：AI 搜索未匹配
        trackRybbitEvent('search', {
          keyword: query,
          result_count: 0,
          search_type: 'ai'
        });

        toast.info('抱歉，未能匹配到相关智能应用，请换个说法试试~', {
          description: SMART_SEARCH_EMPTY_DESCRIPTION
        });
      }
    } catch (error) {
      console.error('智能搜索请求失败', error);
      toast.error('请求失败，请检查网络或稍后重试');
    } finally {
      setIsAiSearching(false);
    }
  }, [onMatched, router, solutions]);

  return {
    isAiSearching,
    handleSmartSearch
  };
}
