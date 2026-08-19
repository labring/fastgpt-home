import { markdownToReadableText } from '@/customers/lib/solution-readable-content';

type SolutionReadableArticleProps = {
  solution: {
    id: string;
    title: string;
    description: string;
    categoryName: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export default function SolutionReadableArticle({ solution }: SolutionReadableArticleProps) {
  const readableContent = markdownToReadableText(solution.content);

  return (
    <section className="sr-only" aria-label="AI 可读解决方案正文">
      <div>{solution.title}</div>
      <p>分类：{solution.categoryName}</p>
      <p>简介：{solution.description}</p>
      {solution.createdAt && <p>发布时间：{solution.createdAt}</p>}
      {solution.updatedAt && <p>更新时间：{solution.updatedAt}</p>}
      <p>
        预约方式：如需验证该方案是否适合你的业务，可在页面中申请免费 POC。商务顾问将在 1 天内联系你，
        确认需求后最快 3 天交付 POC 验证。FastGPT 团队会基于真实业务数据评估知识库接入、系统集成、
        AI 解决率、响应时间和人工分流效果，并助力后续生产级交付。
      </p>
      <article>{readableContent}</article>
    </section>
  );
}
