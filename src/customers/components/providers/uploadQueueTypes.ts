import type { UploadContentKind } from '@/customers/components/admin/editor/uploadContentMarkdown';
import type { EditorFormData } from '@/customers/components/admin/editor/types';

export type UploadKind = 'content' | 'cover';
export type ContentUploadKind = UploadContentKind;
export type UploadStatus = 'queued' | 'uploading' | 'completed' | 'failed';

export interface UploadQueueItem {
  id: string;
  draftKey: string;
  storageFolder: string;
  kind: UploadKind;
  contentKind?: ContentUploadKind;
  contentLabel?: string;
  placeholder?: string;
  file: File;
  fileName: string;
  contentType: string;
  status: UploadStatus;
  attempts: number;
  resultThumbnailUrl?: string;
  resultUrl?: string;
  error?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SaveIntent {
  draftKey: string;
  publishStatus: boolean;
  requestedAt: number;
  snapshot: EditorFormData;
}

export interface AutoSaveFailure {
  draftKey: string;
  message: string;
  failedAt: number;
}

export interface DraftBridge {
  replaceContentPlaceholder: (placeholder: string, markdown: string, fileUrl: string) => void;
  setCoverImage: (fileUrl: string, thumbnailUrl: string) => void;
  removeContentPlaceholder: (placeholder: string) => void;
}

export interface EnqueueContentUploadInput {
  draftKey: string;
  storageFolder: string;
  file: File;
  placeholder: string;
  contentKind: ContentUploadKind;
  contentLabel?: string;
}

export interface EnqueueCoverUploadInput {
  draftKey: string;
  storageFolder: string;
  file: File;
}

export interface ScheduleAutoSaveInput {
  draftKey: string;
  formData: EditorFormData;
  publishStatus: boolean;
}
