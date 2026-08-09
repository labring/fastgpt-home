export type PageStatus = 'preview' | 'published';

export type EvidenceStatus =
  | 'official-public'
  | 'not-publicly-listed'
  | 'poc-required'
  | 'contract-required';

export type ComparisonTableKind =
  | 'capability'
  | 'poc'
  | 'tco'
  | 'selection'
  | 'generic';

export interface ComparisonRow {
  id: string;
  cells: string[];
  sourceIds: string[];
  evidenceStatus: EvidenceStatus;
}

export interface ComparisonTable {
  id: string;
  title?: string;
  kind: ComparisonTableKind;
  columns: string[];
  rows: ComparisonRow[];
}

export interface MarkdownBlock {
  type: 'paragraph' | 'heading' | 'list' | 'table' | 'quote';
  level?: number;
  text?: string;
  items?: string[];
  table?: ComparisonTable;
}

export interface ComparisonSection {
  id: string;
  title: string;
  blocks: MarkdownBlock[];
}

export interface InternalLink {
  label: string;
  target: string;
  locale: string;
}

export interface PageAsset {
  path: string;
  alt: string;
  width: number;
  height: number;
}

export interface ComparisonHighlight {
  label: string;
  value: string;
}

export interface DateFields {
  datePublished: string;
  dateModified: string;
}

export interface ComparisonPage {
  slug: string;
  lang: 'zh';
  status: PageStatus;
  title: string;
  description: string;
  heroSummary: string;
  heroHighlights: ComparisonHighlight[];
  keywords: string[];
  intro: MarkdownBlock[];
  sections: ComparisonSection[];
  dates: DateFields;
  asset: PageAsset;
  internalLinks: InternalLink[];
  officialSource: string;
}
