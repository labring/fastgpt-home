'use client';

interface AdminEmptyStateProps {
  message: string;
}

export default function AdminEmptyState({
  message
}: AdminEmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <p className="text-zinc-500">{message}</p>
    </div>
  );
}
