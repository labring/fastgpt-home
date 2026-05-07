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
  const summary = data.Answers.substring(0, 150).trim() + '...';

  return (
    <Link
      href={`/${langName}/faq/${id}`}
      className="group block h-full"
    >
      <div
        className="h-full flex flex-col"
        style={{
          padding: 0,
          borderRadius: 16
        }}
      >
        <div className="mb-4">
          <span
            className="inline-block text-[12px] font-medium leading-[16px]"
            style={{
              padding: '4px 8px',
              borderRadius: 1000,
              backgroundColor: '#f7f8fa',
              color: '#667085'
            }}
          >
            {data.Category}
          </span>
        </div>

        <h3
          title={data.Question}
          className="text-[20px] font-normal mb-4 transition-colors cursor-default"
          style={{
            lineHeight: '32px',
            height: 32,
            color: '#020617',
            letterSpacing: '-0.56px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {data.Question}
        </h3>

        <p
          className="text-[16px] mb-4"
          style={{
            lineHeight: '24px',
            height: 48,
            color: '#6d6d6d',
            letterSpacing: '-0.16px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {summary}
        </p>

        <div className="flex items-center gap-1 text-[16px] font-normal transition-all" style={{ color: '#3370ff' }}>
          <span style={{ lineHeight: '24px', letterSpacing: '-0.16px' }}>{locale?.readDetail || '查看详情'}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
