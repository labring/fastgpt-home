'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { createSkeletonSolution } from '@/app/customers/admin/actions/solutions';
import { buildAdminSolutionEditHref } from '@/customers/lib/admin-solution-routing';

interface CreateSolutionButtonProps {
  className?: string;
  label?: string;
}

export default function CreateSolutionButton({
  className,
  label = '新建方案'
}: CreateSolutionButtonProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (isCreating) {
      return;
    }

    setIsCreating(true);

    try {
      const result = await createSkeletonSolution();

      if (!result.success || !result.id) {
        toast.error(result.error || '创建新方案失败');
        return;
      }

      router.push(buildAdminSolutionEditHref(result));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '创建新方案失败');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleCreate()}
      disabled={isCreating}
      className={className}
    >
      <PlusIcon size={20} />
      {isCreating ? '创建中...' : label}
    </button>
  );
}
