import type { ReactNode } from 'react';
import type { TocItem } from '@/customers/lib/toc';

export interface EditorFormData {
  id: string;
  title: string;
  storageFolder: string;
  description: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  isPublicCase: boolean;
  caseOrg: string;
  clearanceLevel: 'A' | 'B' | 'C' | '';
  caseNo: number;
  citedNumbers: string;
  relatedCustomerIds: string[];
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  freeUseUrl: string;
  content: string;
  isPublished: boolean;
}

export interface EditorCategory {
  _id: string;
  name: string;
  slug?: string;
  color?: string;
}

export interface EditorInitialData {
  _id?: string;
  title?: string;
  storageFolder?: string;
  description?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string | Date | null;
  isPublicCase?: boolean;
  caseOrg?: string;
  clearanceLevel?: 'A' | 'B' | 'C' | '';
  caseNo?: number;
  citedNumbers?: string;
  relatedCustomerIds?: string[];
  categoryId?: string;
  categorySlug?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  content?: string;
  isPublished?: boolean;
  likesCount?: number;
  usageCount?: number;
  createdAt?: string;
}

export interface EditorCaretPosition {
  top: number;
  left: number;
  height: number;
}

export interface EditorSelectionPosition {
  top: number;
  left: number;
  width: number;
}

export interface EditorTextareaSelection {
  start: number;
  end: number;
}

export interface EditorPasteProgress {
  isActive: boolean;
  progress: number;
  message: string;
}

export type EditorToolbarAction = 'bold' | 'italic' | 'link' | 'code';
export type EditorTocItem = TocItem;

export interface SlashCommandItem {
  id: string;
  title: string;
  icon: ReactNode;
  keyword: string;
  group: string;
}
