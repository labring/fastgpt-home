'use client';

import { useState, useSyncExternalStore } from 'react';
import { ThumbsUpIcon, ThumbsDownIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { withBasePath } from '@/customers/lib/base-path';

type SavedVote = 'helpful' | 'unhelpful' | null;

const VOTE_STORAGE_EVENT = 'solution-vote-storage';

function getVoteStorageKey(solutionId: string) {
  return `solution_vote_${solutionId}`;
}

function readSavedVote(solutionId: string): SavedVote {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedVote = localStorage.getItem(getVoteStorageKey(solutionId));
  return savedVote === 'helpful' || savedVote === 'unhelpful' ? savedVote : null;
}

function subscribeSavedVote(solutionId: string, callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === getVoteStorageKey(solutionId)) {
      callback();
    }
  };
  const handleLocalStorageUpdate = () => callback();

  window.addEventListener('storage', handleStorage);
  window.addEventListener(VOTE_STORAGE_EVENT, handleLocalStorageUpdate);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(VOTE_STORAGE_EVENT, handleLocalStorageUpdate);
  };
}

function writeSavedVote(solutionId: string, vote: Exclude<SavedVote, null>) {
  localStorage.setItem(getVoteStorageKey(solutionId), vote);
  window.dispatchEvent(new Event(VOTE_STORAGE_EVENT));
}

export default function HelpfulFeedback({ solutionId }: { solutionId: string }) {
  const voted = useSyncExternalStore(
    (callback) => subscribeSavedVote(solutionId, callback),
    () => readSavedVote(solutionId),
    () => null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async (type: 'helpful' | 'unhelpful') => {
    if (voted) return; // 已经投票过

    setIsSubmitting(true);
    try {
      const res = await fetch(withBasePath(`/api/customers/${solutionId}/vote`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!res.ok) {
        throw new Error('投票失败');
      }

      const data = await res.json().catch(() => null);
      const savedType = data?.votedType === 'helpful' || data?.votedType === 'unhelpful'
        ? data.votedType
        : type;
      writeSavedVote(solutionId, savedType);
      toast.success(savedType === 'helpful' ? '感谢您的反馈！' : '感谢您的反馈，我们会努力改进！');
    } catch (error) {
      console.error(error);
      toast.error('操作失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 mb-0 border-t border-gray-200/80 py-4 dark:border-gray-800">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          这篇内容有帮助吗？
        </h3>
        <div className="flex items-center gap-2">
        <button
          onClick={() => handleVote('helpful')}
          disabled={isSubmitting || voted !== null}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all ${
            voted === 'helpful'
              ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
              : voted === 'unhelpful'
              ? 'opacity-50 grayscale cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800/50 dark:border-gray-700'
              : 'bg-transparent border-gray-200 text-gray-500 hover:bg-green-50 hover:border-green-200 hover:text-green-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-green-900/20 dark:hover:border-green-800 dark:hover:text-green-400'
          }`}
        >
          <ThumbsUpIcon size={16} weight={voted === 'helpful' ? 'fill' : 'regular'} />
          <span className="font-medium">有帮助</span>
        </button>
        <button
          onClick={() => handleVote('unhelpful')}
          disabled={isSubmitting || voted !== null}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all ${
            voted === 'unhelpful'
              ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
              : voted === 'helpful'
              ? 'opacity-50 grayscale cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800/50 dark:border-gray-700'
              : 'bg-transparent border-gray-200 text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:border-red-800 dark:hover:text-red-400'
          }`}
        >
          <ThumbsDownIcon size={16} weight={voted === 'unhelpful' ? 'fill' : 'regular'} />
          <span className="font-medium">待改进</span>
        </button>
        </div>
      </div>
      {voted && (
        <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400 animate-in fade-in slide-in-from-bottom-2">
          我们已收到您的反馈，这有助于我们持续提升内容质量。
        </p>
      )}
    </div>
  );
}
