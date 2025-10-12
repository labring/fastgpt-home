import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FAQCardProps {
  id: string;
  data: {
    Category: string;
    Question: string;
    Answers: string;
  };
  langName?: string;
  locale?: any;
}

export default function FAQCard({ id, data, langName = 'zh', locale }: FAQCardProps) {
  // Create summary from answers (first 150 characters)
  const summary = data.Answers.substring(0, 150).trim() + '...';

  return (
    <Link
      href={`/${langName}/faq/${id}`}
      className="group block h-full"
    >
      <div className="h-full p-5 rounded-lg bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-accent/50 dark:hover:bg-zinc-800/80 transition-all duration-200 hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-primary/5">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary">
            {data.Category}
          </span>
        </div>

        {/* Question Title */}
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 text-foreground dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
          {data.Question}
        </h3>

        {/* Answer Summary */}
        <p className="text-sm text-muted-foreground dark:text-zinc-400 line-clamp-3 mb-4">{summary}</p>

        {/* Read More Link */}
        <div className="flex items-center gap-2 text-sm font-medium text-primary dark:text-primary group-hover:gap-3 transition-all">
          <span>{locale?.readDetail || 'Read detail'}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
