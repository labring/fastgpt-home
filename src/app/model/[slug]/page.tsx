import { createRootTechArticleRoute } from '@/app/tech-article-route';

const route = createRootTechArticleRoute('model');

export default route.Page;
export const generateMetadata = route.generateMetadata;
export const generateStaticParams = route.generateStaticParams;
export const dynamicParams = false;
