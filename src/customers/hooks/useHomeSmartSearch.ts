import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomerPublicHref } from '@/customers/lib/customer-url';
import { toast } from 'sonner';
import type { Customer } from '@/customers/components/CustomerCard';
import {
  fetchFirstMatchedCustomer,
  requestSmartSearchMatch,
  SMART_SEARCH_EMPTY_DESCRIPTION
} from '@/customers/lib/customer-search';
import { trackRybbitEvent } from '@/customers/lib/rybbit';
import { withBasePath } from '@/customers/lib/base-path';

interface UseHomeSmartSearchInput {
  customers: Customer[];
  onMatched: () => void;
}

export function useHomeSmartSearch({ customers, onMatched }: UseHomeSmartSearchInput) {
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

        let matchedCustomer: Customer | null =
          customers.find((customer) => customer.title === data.matched_case) || null;

        if (!matchedCustomer) {
          try {
            matchedCustomer = await fetchFirstMatchedCustomer<Customer>(data.matched_case);
          } catch (error) {
            console.error('Failed to fetch matched customer detail', error);
          }
        }

        if (matchedCustomer) {
          onMatched();
          router.push(withBasePath(getCustomerPublicHref(matchedCustomer)));
          toast.success(`为您找到匹配案例：${matchedCustomer.title}`);
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
  }, [onMatched, router, customers]);

  return {
    isAiSearching,
    handleSmartSearch
  };
}
