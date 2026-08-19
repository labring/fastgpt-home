const MIME_TYPE_BY_EXTENSION: Record<string, string> = {
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  htm: 'text/html',
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  md: 'text/markdown',
  markdown: 'text/markdown',
  pdf: 'application/pdf',
  png: 'image/png',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

export function getFileExtension(fileName: string) {
  const match = /\.([a-z0-9]+)$/i.exec(fileName.trim());
  return match ? match[1].toLowerCase() : '';
}

export function inferContentTypeFromFileName(fileName: string) {
  const extension = getFileExtension(fileName);
  return MIME_TYPE_BY_EXTENSION[extension] || '';
}

export function resolveUploadContentType(fileName: string, providedType?: string) {
  const normalizedType = String(providedType || '').trim();
  if (normalizedType) {
    return normalizedType;
  }

  return inferContentTypeFromFileName(fileName) || 'application/octet-stream';
}
