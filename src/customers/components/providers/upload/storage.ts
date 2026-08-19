import type { AutoSaveFailure, SaveIntent, UploadQueueItem } from '../uploadQueueTypes';

const DB_NAME = 'fastgpt-solution-upload-queue';
const DB_VERSION = 1;
const STORE_NAME = 'uploads';
const SAVE_INTENTS_KEY = 'solution_pending_save_intents_v1';
const UPLOADED_URLS_PREFIX = 'solution_uploaded_urls_';
const AUTO_SAVE_FAILURE_PREFIX = 'solution_auto_save_failure_';

let dbPromise: Promise<IDBDatabase> | null = null;

function openUploadQueueDb() {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('draftKey', 'draftKey', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error('打开上传队列数据库失败'));
  });

  return dbPromise;
}

async function withObjectStore<T>(
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore) => IDBRequest<T>
) {
  const db = await openUploadQueueDb();

  return new Promise<T>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = handler(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error('上传队列数据库操作失败'));
  });
}

export async function getAllUploadItems() {
  return withObjectStore<UploadQueueItem[]>('readonly', (store) => store.getAll());
}

export async function putUploadItem(item: UploadQueueItem) {
  await withObjectStore<IDBValidKey>('readwrite', (store) => store.put(item));
}

export async function deleteUploadItem(id: string) {
  await withObjectStore<undefined>('readwrite', (store) => store.delete(id));
}

function getTrackedUploadedUrlsStorageKey(draftKey: string) {
  return `${UPLOADED_URLS_PREFIX}${draftKey}`;
}

export function readTrackedUploadedUrls(draftKey: string) {
  try {
    const raw = localStorage.getItem(getTrackedUploadedUrlsStorageKey(draftKey));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function writeTrackedUploadedUrls(draftKey: string, urls: string[]) {
  localStorage.setItem(
    getTrackedUploadedUrlsStorageKey(draftKey),
    JSON.stringify([...new Set(urls)])
  );
}

export function appendTrackedUploadedUrl(draftKey: string, url: string) {
  writeTrackedUploadedUrls(draftKey, [...readTrackedUploadedUrls(draftKey), url]);
}

export function clearTrackedUploadedUrls(draftKey: string) {
  localStorage.removeItem(getTrackedUploadedUrlsStorageKey(draftKey));
}

function getAutoSaveFailureStorageKey(draftKey: string) {
  return `${AUTO_SAVE_FAILURE_PREFIX}${draftKey}`;
}

export function readAutoSaveFailure(draftKey: string) {
  try {
    const raw = localStorage.getItem(getAutoSaveFailureStorageKey(draftKey));
    return raw ? (JSON.parse(raw) as AutoSaveFailure) : null;
  } catch {
    return null;
  }
}

export function writeAutoSaveFailure(failure: AutoSaveFailure) {
  localStorage.setItem(
    getAutoSaveFailureStorageKey(failure.draftKey),
    JSON.stringify(failure)
  );
}

export function clearAutoSaveFailureRecord(draftKey: string) {
  localStorage.removeItem(getAutoSaveFailureStorageKey(draftKey));
}

export function readSaveIntents() {
  try {
    const raw = localStorage.getItem(SAVE_INTENTS_KEY);
    return raw ? (JSON.parse(raw) as SaveIntent[]) : [];
  } catch {
    return [];
  }
}

function writeSaveIntents(intents: SaveIntent[]) {
  localStorage.setItem(SAVE_INTENTS_KEY, JSON.stringify(intents));
}

export function upsertSaveIntent(intent: SaveIntent) {
  const nextIntents = readSaveIntents().filter(
    (item) => item.draftKey !== intent.draftKey
  );
  nextIntents.push(intent);
  writeSaveIntents(nextIntents);
}

export function removeSaveIntent(draftKey: string) {
  writeSaveIntents(readSaveIntents().filter((item) => item.draftKey !== draftKey));
}

export function readDraftSnapshot(draftKey: string) {
  try {
    const raw = localStorage.getItem(draftKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeDraftSnapshot(draftKey: string, value: Record<string, unknown>) {
  localStorage.setItem(
    draftKey,
    JSON.stringify({
      ...value,
      timestamp: Date.now()
    })
  );
}

export function updateDraftSnapshot(
  draftKey: string,
  updater: (draft: Record<string, unknown>) => Record<string, unknown>
) {
  const currentDraft = readDraftSnapshot(draftKey);
  if (!currentDraft) {
    return;
  }

  writeDraftSnapshot(draftKey, updater(currentDraft));
}
