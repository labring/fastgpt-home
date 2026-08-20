'use client';

import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { createParser } from 'eventsource-parser';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { getAiSystemPrompt, saveAiSystemPrompt } from '@/app/customers/admin/actions/customers';
import { withBasePath } from '@/customers/lib/base-path';
import type { EditorFormData } from './types';

interface UseEditorAiAssistantProps {
  formData: EditorFormData;
  setFormData: Dispatch<SetStateAction<EditorFormData>>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export function useEditorAiAssistant({
  formData,
  setFormData,
  textareaRef
}: UseEditorAiAssistantProps) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const handleAiGenerate = useCallback(async () => {
    if (!aiPrompt.trim()) {
      toast.error('请输入内容要求');
      return;
    }

    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(withBasePath('/api/admin/ai-generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error('AI 生成请求失败');
      }

      if (!response.body) {
        throw new Error('响应为空');
      }

      setIsAiModalOpen(false);

      const startMarker = formData.content.length > 0 ? '\n\n---\n\n' : '';
      setFormData((prev) => ({ ...prev, content: prev.content + startMarker }));

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const parser = createParser({
        onEvent: (event) => {
          if (event.data === '[DONE]') return;

          try {
            const data = JSON.parse(event.data);
            const delta = data.choices[0]?.delta?.content || '';

            if (!delta) return;

            setFormData((prev) => ({ ...prev, content: prev.content + delta }));

            const textarea = textareaRef.current;
            if (textarea) {
              textarea.scrollTop = textarea.scrollHeight;
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error);
          }
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        parser.feed(decoder.decode(value, { stream: true }));
      }

      toast.success('AI 生成完成');
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.info('已取消生成');
      } else {
        console.error('AI Generate Error:', error);
        toast.error(error instanceof Error ? error.message : 'AI 生成出错');
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
      setAiPrompt('');
    }
  }, [aiPrompt, formData.content, setFormData, textareaRef]);

  const handleOpenSettings = useCallback(async () => {
    setIsLoadingSettings(true);
    setIsSettingsOpen(true);

    try {
      const prompt = await getAiSystemPrompt();
      setSystemPrompt(prompt);
    } catch {
      toast.error('获取系统提示词失败');
    } finally {
      setIsLoadingSettings(false);
    }
  }, []);

  const handleSaveSettings = useCallback(async () => {
    if (!systemPrompt.trim()) {
      toast.error('系统提示词不能为空');
      return;
    }

    setIsSavingSettings(true);

    try {
      const result = await saveAiSystemPrompt(systemPrompt);
      if (result.success) {
        toast.success('系统提示词已更新');
        setIsSettingsOpen(false);
      } else {
        toast.error(result.error || '保存失败');
      }
    } catch {
      toast.error('保存出错');
    } finally {
      setIsSavingSettings(false);
    }
  }, [systemPrompt]);

  return {
    isAiModalOpen,
    setIsAiModalOpen,
    aiPrompt,
    setAiPrompt,
    isGenerating,
    stopGenerating,
    handleAiGenerate,
    isSettingsOpen,
    setIsSettingsOpen,
    systemPrompt,
    setSystemPrompt,
    isSavingSettings,
    isLoadingSettings,
    handleOpenSettings,
    handleSaveSettings
  };
}
