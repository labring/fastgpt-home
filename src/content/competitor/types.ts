export type PageStatus = 'preview' | 'published';

export type EvidenceStatus =
  | 'official-public'
  | 'not-publicly-listed'
  | 'poc-required'
  | 'contract-required';

export type SignoffStatus = 'pending' | 'approved';

export type ComparisonTableKind =
  | 'capability'
  | 'poc'
  | 'tco'
  | 'selection'
  | 'generic';

export interface SourceRef {
  id: string;
  title: string;
  url?: string;
  localPath?: string;
  section: string;
  verifiedOn: string;
  version: string;
  evidenceStatus: EvidenceStatus;
}

export interface ComparisonFact {
  id: string;
  text: string;
  sourceIds: string[];
  evidenceStatus: EvidenceStatus;
}

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
  facts: ComparisonFact[];
}

export interface InternalLink {
  label: string;
  target: string;
  locale: string;
  external: boolean;
  verified: boolean;
}

export interface PageAsset {
  path: string;
  alt: string;
  width: number;
  height: number;
}

export interface DateFields {
  sourceVerifiedOn: string;
  datePublished: string;
  dateModified: string;
  nextReviewOn: string;
}

export interface Signoff {
  role: 'product' | 'sales' | 'legal';
  status: SignoffStatus;
  signer: string;
  timestamp: string;
  evidenceRef: string;
}

export interface SourceFooter {
  source: string;
  verifiedOn: string;
  version: string;
  updateRecord: string;
}

export interface ComparisonPage {
  slug: string;
  lang: 'zh';
  status: PageStatus;
  title: string;
  description: string;
  keywords: string[];
  sourcePath: string;
  sourceHash: string;
  draftVersion: string;
  titleText: string;
  intro: MarkdownBlock[];
  sections: ComparisonSection[];
  facts: ComparisonFact[];
  sourceRefs: SourceRef[];
  dates: DateFields;
  asset: PageAsset;
  internalLinks: InternalLink[];
  signoffs: Signoff[];
  sourceFooter: SourceFooter;
  officialSources: string[];
}
