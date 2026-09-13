'use client';

import { useRouter } from 'next/navigation';
import SolutionCard, { type Solution } from '@customers/components/SolutionCard';
import { withBasePath } from '@customers/lib/base-path';

export default function RelatedSolutions({ solutions }: { solutions: Solution[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution, index) => (
        <SolutionCard
          key={solution.id}
          solution={solution}
          index={index}
          onCategoryClick={(categoryId) => {
            const categorySlug = solutions.find(
              (item) => String(item.categoryId) === String(categoryId)
            )?.categorySlug;
            if (categorySlug) {
              router.push(withBasePath(`/categories/${categorySlug}#customers`));
            }
          }}
        />
      ))}
    </div>
  );
}
