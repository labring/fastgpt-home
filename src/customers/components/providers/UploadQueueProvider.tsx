'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { toast } from 'sonner';
import { saveCustomer } from '@/app/customers/admin/actions/customers';
import {
  buildUploadContentMarkdown,
  removeUploadPlaceholder,
  replaceUploadPlaceholder
} from '@/customers/components/admin/editor/uploadContentMarkdown';
import { resolveUploadContentType } from '@/customers/lib/upload-content-type';
import type {
  AutoSaveFailure,
  DraftBridge,
  EnqueueContentUploadInput,
  EnqueueCoverUploadInput,
  ScheduleAutoSaveInput,
  UploadKind,
  UploadQueueItem
} from './uploadQueueTypes';
import {
  appendTrackedUploadedUrl,
  clearAutoSaveFailureRecord,
  clearTrackedUploadedUrls,
  deleteUploadItem,
  getAllUploadItems,
  putUploadItem,
  readAutoSaveFailure,
  readDraftSnapshot,
  readSaveIntents,
  readTrackedUploadedUrls,
  removeSaveIntent,
  updateDraftSnapshot,
  upsertSaveIntent,
  writeAutoSaveFailure,
  writeDraftSnapshot
} from './upload/storage';
import { uploadContentFile, uploadCoverFile } from './upload/api';
import {
  markUploadItemCompleted,
  markUploadItemFailed,
  markUploadItemQueuedForRetry,
  markUploadItemUploading,
  restoreInterruptedUploadItems,
  shouldRetryUpload
} from './upload/queue-reducer';

export type { AutoSaveFailure } from './uploadQueueTypes';

interface UploadQueueContextValue {
  registerDraftBridge: (draftKey: string, bridge: DraftBridge) => () => void;
  enqueueContentUpload: (input: EnqueueContentUploadInput) => Promise<void>;
  enqueueCoverUpload: (input: EnqueueCoverUploadInput) => Promise<void>;
  getDraftPendingUploadCount: (draftKey: string) => number;
  getDraftPendingUploadCountByKind: (draftKey: string, kind: UploadKind) => number;
  getTrackedUploadedUrls: (draftKey: string) => string[];
  getAutoSaveFailure: (draftKey: string) => AutoSaveFailure | null;
  clearAutoSaveFailure: (draftKey: string) => void;
  clearDraftUploadState: (draftKey: string) => Promise<void>;
  queueAutoSaveIntent: (input: ScheduleAutoSaveInput) => void;
  scheduleAutoSave: (input: ScheduleAutoSaveInput) => Promise<void>;
}

const UploadQueueContext = createContext<UploadQueueContextValue | null>(null);

export function UploadQueueProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<UploadQueueItem[]>([]);
  const itemsRef = useRef<UploadQueueItem[]>([]);
  const bridgesRef = useRef(new Map<string, DraftBridge>());
  const hasLoadedRef = useRef(false);
  const isProcessingRef = useRef(false);
  const savingDraftsRef = useRef(new Set<string>());

  const updateItemsState = useCallback((updater: (prev: UploadQueueItem[]) => UploadQueueItem[]) => {
    setItems((prev) => {
      const next = updater(prev);
      itemsRef.current = next;
      return next;
    });
  }, []);

  const syncItem = useCallback(async (item: UploadQueueItem) => {
    await putUploadItem(item);
    updateItemsState((prev) => {
      const index = prev.findIndex((entry) => entry.id === item.id);
      if (index === -1) {
        return [...prev, item];
      }

      const next = prev.slice();
      next[index] = item;
      return next;
    });
  }, [updateItemsState]);

  const clearDraftUploadState = useCallback(async (draftKey: string) => {
    const targets = itemsRef.current.filter((item) => item.draftKey === draftKey);

    await Promise.all(targets.map((item) => deleteUploadItem(item.id)));
    updateItemsState((prev) => prev.filter((item) => item.draftKey !== draftKey));
    clearTrackedUploadedUrls(draftKey);
    removeSaveIntent(draftKey);
    clearAutoSaveFailureRecord(draftKey);
  }, [updateItemsState]);

  const getDraftPendingUploadCount = useCallback((draftKey: string) => {
    return items.filter(
      (item) =>
        item.draftKey === draftKey &&
        (item.status === 'queued' || item.status === 'uploading')
    ).length;
  }, [items]);

  const getDraftPendingUploadCountByKind = useCallback(
    (draftKey: string, kind: UploadKind) => {
      return items.filter(
        (item) =>
          item.draftKey === draftKey &&
          item.kind === kind &&
          (item.status === 'queued' || item.status === 'uploading')
      ).length;
    },
    [items]
  );

  const getTrackedUploadedUrls = useCallback((draftKey: string) => {
    return readTrackedUploadedUrls(draftKey);
  }, []);

  const getAutoSaveFailure = useCallback((draftKey: string) => {
    return readAutoSaveFailure(draftKey);
  }, []);

  const clearAutoSaveFailure = useCallback((draftKey: string) => {
    clearAutoSaveFailureRecord(draftKey);
  }, []);

  const queueAutoSaveIntent = useCallback(({
    draftKey,
    formData,
    publishStatus
  }: ScheduleAutoSaveInput) => {
    clearAutoSaveFailureRecord(draftKey);
    writeDraftSnapshot(draftKey, {
      ...formData,
      isPublished: publishStatus
    });
    upsertSaveIntent({
      draftKey,
      publishStatus,
      requestedAt: Date.now(),
      snapshot: {
        ...formData,
        isPublished: publishStatus
      }
    });
  }, []);

  const applyUploadSuccess = useCallback((item: UploadQueueItem, fileUrl: string) => {
    appendTrackedUploadedUrl(item.draftKey, fileUrl);

    if (item.kind === 'content' && item.placeholder && item.contentKind) {
      const { contentKind, placeholder } = item;
      const markdown = buildUploadContentMarkdown(
        contentKind,
        item.contentLabel || item.fileName,
        fileUrl,
        item.file.size
      );

      updateDraftSnapshot(item.draftKey, (draft) => ({
        ...draft,
        content: replaceUploadPlaceholder(
          String(draft.content || ''),
          placeholder,
          markdown
        )
      }));

      bridgesRef.current
        .get(item.draftKey)
        ?.replaceContentPlaceholder(placeholder, markdown, fileUrl);
      return;
    }

    const thumbnailUrl = item.resultThumbnailUrl || fileUrl;
    updateDraftSnapshot(item.draftKey, (draft) => ({
      ...draft,
      imageUrl: fileUrl,
      thumbnailUrl
    }));
    bridgesRef.current.get(item.draftKey)?.setCoverImage(fileUrl, thumbnailUrl);
  }, []);

  const applyUploadFailure = useCallback((item: UploadQueueItem, message: string) => {
    if (item.kind === 'content' && item.placeholder) {
      const { placeholder } = item;
      bridgesRef.current.get(item.draftKey)?.removeContentPlaceholder(placeholder);
      updateDraftSnapshot(item.draftKey, (draft) => ({
        ...draft,
        content: removeUploadPlaceholder(String(draft.content || ''), placeholder)
      }));
    }

    toast.error(message);
  }, []);

  const processAutoSave = useCallback(async (draftKey: string, silent = false) => {
    if (savingDraftsRef.current.has(draftKey)) {
      return;
    }

    const intent = readSaveIntents().find((item) => item.draftKey === draftKey);
    if (!intent) {
      return;
    }

    const hasBlockingUploads = itemsRef.current.some(
      (item) =>
        item.draftKey === draftKey &&
        (item.status === 'queued' || item.status === 'uploading')
    );

    if (hasBlockingUploads) {
      return;
    }

    savingDraftsRef.current.add(draftKey);

    try {
      const draft = readDraftSnapshot(draftKey) || intent.snapshot;
      const result = await saveCustomer({
        ...draft,
        isPublished: intent.publishStatus,
        newlyUploadedUrls: readTrackedUploadedUrls(draftKey)
      });

      if (result.success) {
        localStorage.removeItem(draftKey);
        await clearDraftUploadState(draftKey);
        if (!silent) {
          toast.success('后台上传完成，案例已自动保存');
        }
      } else {
        writeAutoSaveFailure({
          draftKey,
          message: result.error || '自动保存失败，请重新进入编辑器确认',
          failedAt: Date.now()
        });
        removeSaveIntent(draftKey);
        toast.error(result.error || '自动保存失败，请重新进入编辑器确认');
      }
    } catch (error) {
      writeAutoSaveFailure({
        draftKey,
        message:
          error instanceof Error
            ? error.message
            : '自动保存失败，请重新进入编辑器确认',
        failedAt: Date.now()
      });
      removeSaveIntent(draftKey);
      toast.error(
        error instanceof Error
          ? error.message
          : '自动保存失败，请重新进入编辑器确认'
      );
    } finally {
      savingDraftsRef.current.delete(draftKey);
    }
  }, [clearDraftUploadState]);

  const processQueue = useCallback(async () => {
    if (isProcessingRef.current || !hasLoadedRef.current) {
      return;
    }

    isProcessingRef.current = true;

    try {
      while (true) {
        const nextItem = itemsRef.current.find((item) => item.status === 'queued');
        if (!nextItem) {
          break;
        }

        const uploadingItem = markUploadItemUploading(nextItem);
        await syncItem(uploadingItem);

        try {
          let fileUrl: string;
          let completedItem: UploadQueueItem;

          if (uploadingItem.kind === 'content') {
            fileUrl = await uploadContentFile(uploadingItem);
            completedItem = markUploadItemCompleted(uploadingItem, fileUrl);
          } else {
            const coverResult = await uploadCoverFile(uploadingItem);
            fileUrl = coverResult.url;
            completedItem = markUploadItemCompleted(uploadingItem, fileUrl, coverResult.thumbnailUrl);
          }

          await syncItem(completedItem);
          applyUploadSuccess(completedItem, fileUrl);
          toast.success(
            completedItem.kind === 'cover' ? '封面图上传成功' : '媒体上传成功'
          );
          await processAutoSave(completedItem.draftKey, false);
        } catch (error) {
          const message = error instanceof Error ? error.message : '上传失败';

          if (shouldRetryUpload(uploadingItem)) {
            const retryItem = markUploadItemQueuedForRetry(uploadingItem, message);
            await syncItem(retryItem);
            await new Promise((resolve) =>
              window.setTimeout(resolve, uploadingItem.attempts * 1500)
            );
          } else {
            const failedItem = markUploadItemFailed(uploadingItem, message);
            await syncItem(failedItem);
            writeAutoSaveFailure({
              draftKey: failedItem.draftKey,
              message: `${failedItem.fileName} 上传失败，请重新进入编辑器处理`,
              failedAt: Date.now()
            });
            applyUploadFailure(failedItem, `${failedItem.fileName} 上传失败`);
            removeSaveIntent(failedItem.draftKey);
          }
        }
      }
    } finally {
      isProcessingRef.current = false;
    }
  }, [applyUploadFailure, applyUploadSuccess, processAutoSave, syncItem]);

  const enqueueContentUpload = useCallback(async ({
    draftKey,
    storageFolder,
    file,
    placeholder,
    contentKind,
    contentLabel
  }: EnqueueContentUploadInput) => {
    const item: UploadQueueItem = {
      id: crypto.randomUUID(),
      draftKey,
      storageFolder,
      kind: 'content',
      contentKind,
      contentLabel,
      placeholder,
      file,
      fileName: file.name,
      contentType: resolveUploadContentType(file.name, file.type),
      status: 'queued',
      attempts: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await syncItem(item);
    void processQueue();
  }, [processQueue, syncItem]);

  const enqueueCoverUpload = useCallback(async ({
    draftKey,
    storageFolder,
    file
  }: EnqueueCoverUploadInput) => {
    const item: UploadQueueItem = {
      id: crypto.randomUUID(),
      draftKey,
      storageFolder,
      kind: 'cover',
      file,
      fileName: file.name,
      contentType: resolveUploadContentType(file.name, file.type),
      status: 'queued',
      attempts: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await syncItem(item);
    void processQueue();
  }, [processQueue, syncItem]);

  const scheduleAutoSave = useCallback(async ({
    draftKey,
    formData,
    publishStatus
  }: ScheduleAutoSaveInput) => {
    queueAutoSaveIntent({
      draftKey,
      formData,
      publishStatus
    });
    await processAutoSave(draftKey, false);
  }, [processAutoSave, queueAutoSaveIntent]);

  const registerDraftBridge = useCallback((draftKey: string, bridge: DraftBridge) => {
    bridgesRef.current.set(draftKey, bridge);

    return () => {
      bridgesRef.current.delete(draftKey);
    };
  }, []);

  useEffect(() => {
    void (async () => {
      const storedItems = await getAllUploadItems();
      const restoredItems = restoreInterruptedUploadItems(storedItems);

      if (restoredItems.some((item, index) => item !== storedItems[index])) {
        await Promise.all(restoredItems.map((item) => putUploadItem(item)));
      }

      itemsRef.current = restoredItems;
      setItems(restoredItems);
      hasLoadedRef.current = true;

      void processQueue();
    })().catch((error) => {
      console.error('Failed to restore upload queue:', error);
      hasLoadedRef.current = true;
    });
  }, [processQueue]);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      return;
    }

    void processQueue();
  }, [items, processQueue]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const hasActiveUploads = itemsRef.current.some(
        (item) => item.status === 'queued' || item.status === 'uploading'
      );

      if (!hasActiveUploads) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const value = useMemo<UploadQueueContextValue>(() => ({
    registerDraftBridge,
    enqueueContentUpload,
    enqueueCoverUpload,
    getDraftPendingUploadCount,
    getDraftPendingUploadCountByKind,
    getTrackedUploadedUrls,
    getAutoSaveFailure,
    clearAutoSaveFailure,
    clearDraftUploadState,
    queueAutoSaveIntent,
    scheduleAutoSave
  }), [
    clearAutoSaveFailure,
    clearDraftUploadState,
    enqueueContentUpload,
    enqueueCoverUpload,
    getAutoSaveFailure,
    getDraftPendingUploadCount,
    getDraftPendingUploadCountByKind,
    getTrackedUploadedUrls,
    queueAutoSaveIntent,
    registerDraftBridge,
    scheduleAutoSave
  ]);

  return (
    <UploadQueueContext.Provider value={value}>
      {children}
    </UploadQueueContext.Provider>
  );
}

export function useUploadQueue() {
  const context = useContext(UploadQueueContext);

  if (!context) {
    throw new Error('useUploadQueue must be used within UploadQueueProvider');
  }

  return context;
}
