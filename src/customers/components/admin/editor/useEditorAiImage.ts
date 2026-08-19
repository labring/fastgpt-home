'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { EditorFormData } from './types';
import { withBasePath } from '@/customers/lib/base-path';

interface UseEditorAiImageProps {
  formData: EditorFormData;
  setFormData: Dispatch<SetStateAction<EditorFormData>>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  ensureStorageFolder: () => Promise<string | undefined>;
}

export function useEditorAiImage({
  formData,
  setFormData,
  textareaRef,
  ensureStorageFolder
}: UseEditorAiImageProps) {
  const [isAiImageModalOpen, setIsAiImageModalOpen] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isSearchingAiImage, setIsSearchingAiImage] = useState(false);

  const handleAiImageGenerate = useCallback(async () => {
    if (!imagePrompt.trim()) {
      toast.error('请输入配图需求');
      return;
    }

    setIsSearchingAiImage(true);

    try {
      const storageFolder = await ensureStorageFolder();
      const response = await fetch(withBasePath('/api/admin/image-search'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: imagePrompt,
          storageFolder
        })
      });
      const data = await response.json();

      if (!response.ok || !data.success || !data.imageUrl) {
        throw new Error(data.error || 'AI 配图失败');
      }

      setIsAiImageModalOpen(false);
      setImagePrompt('');

      const textarea = textareaRef.current;
      const scrollPos = textarea?.scrollTop;
      const start = textarea?.selectionStart || formData.content.length;
      const before = formData.content.substring(0, start);
      const after = formData.content.substring(start);

      const imageMarkdown = `\n![${data.query || 'AI 配图'}](${data.imageUrl})\n`;
      const newContent = before + imageMarkdown + after;

      setFormData((prev) => ({
        ...prev,
        content: newContent
      }));

      toast.success(
        data.query
          ? `AI 已匹配配图：${data.query}`
          : 'AI 已成功插入配图'
      );

      // Focus back to textarea after insert
      if (textarea) {
        setTimeout(() => {
          if (scrollPos !== undefined) {
            textarea.scrollTop = scrollPos;
          }
          textarea.focus({ preventScroll: true });
          textarea.selectionStart = start + imageMarkdown.length;
          textarea.selectionEnd = start + imageMarkdown.length;
        }, 0);
      }
    } catch (error) {
      console.error('AI image search failed:', error);
      toast.error(error instanceof Error ? error.message : 'AI 配图失败');
    } finally {
      setIsSearchingAiImage(false);
    }
  }, [
    ensureStorageFolder,
    formData.content,
    imagePrompt,
    setFormData,
    textareaRef
  ]);

  return {
    isAiImageModalOpen,
    setIsAiImageModalOpen,
    imagePrompt,
    setImagePrompt,
    isSearchingAiImage,
    handleAiImageGenerate
  };
}
