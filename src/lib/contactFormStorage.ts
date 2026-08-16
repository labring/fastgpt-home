import type { ContactFormValues } from '@/components/contact/contactCopy';

export const CONTACT_FORM_STORAGE_KEY = 'fastgpt_contact_form_draft';

const CONTACT_FORM_FIELDS: readonly (keyof ContactFormValues)[] = [
  'name',
  'phone',
  'company',
  'position',
  'usedOpenSource',
  'consultationTopic',
  'projectStage',
  'budget',
  'notes'
];

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isContactFormValues(value: unknown): value is ContactFormValues {
  if (!isRecord(value)) return false;

  return CONTACT_FORM_FIELDS.every((field) => typeof value[field] === 'string');
}

export function readContactFormDraft(): ContactFormValues | null {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(CONTACT_FORM_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return isContactFormValues(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeContactFormDraft(values: ContactFormValues): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(CONTACT_FORM_STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Form input must continue to work when localStorage is unavailable.
  }
}

export function clearContactFormDraft(): void {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.removeItem(CONTACT_FORM_STORAGE_KEY);
  } catch {
    // Ignore cleanup failures so a successful submission is still displayed.
  }
}
