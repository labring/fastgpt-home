import getCaretCoordinates from 'textarea-caret';
import { buildMarkdownTocItems } from '@/customers/lib/toc';
import type { EditorCategory, EditorFormData, EditorInitialData } from './types';
import {
  isUntitledCustomerName,
  UNTITLED_CUSTOMER_PREFIX
} from '@/customers/lib/customer-storage';

export const AUTO_SAVED_UNTITLED_TITLE = `${UNTITLED_CUSTOMER_PREFIX}自动保存`;
const DEFAULT_AUTO_SAVED_DESCRIPTION = '自动保存的草稿方案，待补充说明。';
const DEFAULT_AUTO_SAVED_CONTENT = '## 自动保存草稿\n\n待补充内容。';

export function getValidCategories<T extends { _id: string; name: string }>(
  categories: T[]
) {
  return categories.filter(
    (category) =>
      category._id !== 'all' &&
      category.name !== '全部' &&
      category.name !== 'all'
  );
}

export function getDefaultCategoryId<T extends { _id: string; name: string }>(
  categories: T[]
) {
  const validCategories = getValidCategories(categories);
  return validCategories.length > 0 ? validCategories[0]._id : '';
}

export function getDraftStorageKey(draftId: string) {
  return `customer_draft_${draftId}`;
}

function extractDescriptionFromContent(content: string) {
  return content
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/<video[\s\S]*?<\/video>/g, ' ')
    .replace(/<img[^>]*>/g, ' ')
    .replace(/[#>*`\-\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

function isGeneratedUntitledDraft(formData: EditorFormData) {
  const title = formData.title.trim();
  const description = formData.description.trim();
  const content = formData.content.trim();

  return (
    isUntitledCustomerName(title) &&
    (!description || description === '待补充说明') &&
    (!content || content === '## 待补充内容') &&
    !formData.freeUseUrl.trim() &&
    formData.imageUrl === '/fastgpt.svg'
  );
}

export function hasMeaningfulEditorChanges(
  formData: EditorFormData,
  pendingUploadCount = 0
) {
  if (pendingUploadCount > 0) {
    return true;
  }

  if (isGeneratedUntitledDraft(formData)) {
    return false;
  }

  return Boolean(
    formData.title.trim() ||
      formData.description.trim() ||
      formData.content.trim() ||
      formData.freeUseUrl.trim() ||
      formData.imageUrl !== '/fastgpt.svg'
  );
}

export function hasUnsavedEditorChanges(
  formData: EditorFormData,
  initialFormData: EditorFormData,
  pendingUploadCount = 0
) {
  if (pendingUploadCount > 0) {
    return true;
  }

  if (isGeneratedUntitledDraft(formData)) {
    return false;
  }

  return (
    formData.title !== initialFormData.title ||
    formData.storageFolder !== initialFormData.storageFolder ||
    formData.description !== initialFormData.description ||
    formData.slug !== initialFormData.slug ||
    formData.metaTitle !== initialFormData.metaTitle ||
    formData.metaDescription !== initialFormData.metaDescription ||
    formData.publishedAt !== initialFormData.publishedAt ||
    formData.isPublicCase !== initialFormData.isPublicCase ||
    formData.caseOrg !== initialFormData.caseOrg ||
    formData.clearanceLevel !== initialFormData.clearanceLevel ||
    formData.caseNo !== initialFormData.caseNo ||
    formData.citedNumbers !== initialFormData.citedNumbers ||
    formData.categoryId !== initialFormData.categoryId ||
    formData.imageUrl !== initialFormData.imageUrl ||
    formData.freeUseUrl !== initialFormData.freeUseUrl ||
    formData.content !== initialFormData.content ||
    formData.isPublished !== initialFormData.isPublished
  );
}

export function buildAutoSavedFormData(formData: EditorFormData): EditorFormData {
  const fallbackTitle =
    formData.storageFolder.trim() || AUTO_SAVED_UNTITLED_TITLE;
  const fallbackDescription =
    extractDescriptionFromContent(formData.content) || DEFAULT_AUTO_SAVED_DESCRIPTION;

  return {
    ...formData,
    title: formData.title.trim() || fallbackTitle,
    description: formData.description.trim() || fallbackDescription,
    content: formData.content.trim() || DEFAULT_AUTO_SAVED_CONTENT,
    isPublished: false
  };
}

export function getInitialEditorFormData(
  initialData: EditorInitialData | undefined,
  categories: EditorCategory[]
): EditorFormData {
  return {
    id: initialData?._id || '',
    title: initialData?.title || '',
    storageFolder: initialData?.storageFolder || '',
    description: initialData?.description || '',
    slug: initialData?.slug || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    publishedAt: initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : '',
    isPublicCase: Boolean(initialData?.isPublicCase),
    caseOrg: initialData?.caseOrg || '',
    clearanceLevel: initialData?.clearanceLevel || '',
    caseNo: initialData?.caseNo || 0,
    citedNumbers: initialData?.citedNumbers || '',
    relatedCustomerIds: initialData?.relatedCustomerIds || [],
    categoryId: initialData?.categoryId || getDefaultCategoryId(categories),
    imageUrl: initialData?.imageUrl || '/fastgpt.svg',
    thumbnailUrl: initialData?.thumbnailUrl || initialData?.imageUrl || '/fastgpt.svg',
    freeUseUrl: initialData?.freeUseUrl || '',
    content: initialData?.content || '',
    isPublished: initialData?.isPublished ?? true
  };
}

export function getEditorWordCount(content: string) {
  if (!content) return 0;
  return content.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').length;
}

export function getEditorReadingTime(wordCount: number) {
  return Math.max(1, Math.ceil(wordCount / 400));
}

export function getEditorTocItems(content: string) {
  return buildMarkdownTocItems(content);
}

export function focusTextareaSelection(
  textarea: HTMLTextAreaElement,
  selectionStart: number,
  selectionEnd = selectionStart
) {
  const safeStart = Math.max(0, Math.min(selectionStart, textarea.value.length));
  const safeEnd = Math.max(safeStart, Math.min(selectionEnd, textarea.value.length));

  // Place the caret first so getCaretCoordinates can measure at the right position.
  textarea.focus({ preventScroll: true });
  textarea.setSelectionRange(safeStart, safeEnd);

  // Use the battle-tested textarea-caret library to get the exact pixel
  // offset — it creates a mirror div with every relevant CSS property
  // copied, so it accounts for all line wrapping.
  const coords = getCaretCoordinates(textarea, safeStart);
  const targetTop = Math.max(0, coords.top - coords.height * 2);

  const maxScrollTop = textarea.scrollHeight - textarea.clientHeight;
  const deficit = targetTop - maxScrollTop;

  // For targets near the end, briefly extend the scrollable area so the
  // caret can reach the viewport top.
  const originalPaddingBottom = textarea.style.paddingBottom;
  if (deficit > 0) {
    const computedPB = parseFloat(getComputedStyle(textarea).paddingBottom) || 0;
    textarea.style.paddingBottom = `${computedPB + deficit}px`;
  }

  textarea.scrollTo({ top: targetTop, behavior: 'smooth' });

  if (deficit > 0) {
    setTimeout(() => {
      textarea.style.paddingBottom = originalPaddingBottom;
    }, 350);
  }

  window.requestAnimationFrame(() => {
    textarea.focus({ preventScroll: true });
  });
}
