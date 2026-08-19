'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { saveSolution } from '@/app/customers/admin/actions/solutions';
import AiGenerateModal from '@/customers/components/admin/editor/AiGenerateModal';
import EditorHeroSection from '@/customers/components/admin/editor/EditorHeroSection';
import EditorTopBar from '@/customers/components/admin/editor/EditorTopBar';
import EditorWorkspace from '@/customers/components/admin/editor/EditorWorkspace';
import SystemPromptModal from '@/customers/components/admin/editor/SystemPromptModal';
import ConfirmModal from '@/customers/components/admin/shared/ConfirmModal';
import type {
  EditorCategory,
  EditorFormData,
  EditorInitialData
} from '@/customers/components/admin/editor/types';
import { findImageAtSelection } from '@/customers/components/admin/editor/imageMarkdown';
import { withBasePath } from '@/customers/lib/base-path';
import { useEditorAiAssistant } from '@/customers/components/admin/editor/useEditorAiAssistant';
import { useEditorAiImage } from '@/customers/components/admin/editor/useEditorAiImage';
import { useEditorInteractions } from '@/customers/components/admin/editor/useEditorInteractions';
import { useEditorMediaUpload } from '@/customers/components/admin/editor/useEditorMediaUpload';
import { useEditorPendingUploadsCleanup } from '@/customers/components/admin/editor/useEditorPendingUploadsCleanup';
import { useUploadQueue } from '@/customers/components/providers/UploadQueueProvider';
import { useSyncedToc } from '@/customers/components/solution/useSyncedToc';
import AiImageModal from '@/customers/components/admin/editor/AiImageModal';
import {
  buildAutoSavedFormData,
  getInitialEditorFormData,
  getDraftStorageKey,
  getEditorReadingTime,
  getEditorTocItems,
  getEditorWordCount,
  hasUnsavedEditorChanges,
  getValidCategories,
  hasMeaningfulEditorChanges
} from '@/customers/components/admin/editor/utils';
import {
  removeUploadPlaceholder,
  replaceUploadPlaceholder
} from '@/customers/components/admin/editor/uploadContentMarkdown';

export interface SolutionEditorProps {
  initialData?: EditorInitialData;
  categories: EditorCategory[];
  draftId: string;
  prevSolution?: { id: string; title: string; categorySlug?: string } | null;
  nextSolution?: { id: string; title: string; categorySlug?: string } | null;
}

export default function SolutionEditor({
  initialData,
  categories,
  draftId,
  prevSolution,
  nextSolution,
}: SolutionEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EditorFormData>(() =>
    getInitialEditorFormData(initialData, categories)
  );

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [isSearchingAiCover, setIsSearchingAiCover] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const previewArticleRef = useRef<HTMLElement>(null);

  // 记录本次会话中上传的文件 URL
  // 标记是否已经保存
  const isSavedRef = useRef(false);
  const formDataRef = useRef(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const DRAFT_KEY = getDraftStorageKey(draftId);
  const {
    registerDraftBridge,
    getDraftPendingUploadCount,
    getTrackedUploadedUrls,
    getAutoSaveFailure,
    clearAutoSaveFailure,
    clearDraftUploadState,
    scheduleAutoSave
  } = useUploadQueue();

  const {
    isUploadingImage,
    isUploadingMedia,
    isDragging,
    pasteProgress,
    handleImageUpload,
    handleMediaChange,
    handleAttachmentChange,
    handlePaste,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useEditorMediaUpload({
    formData,
    setFormData,
    fileInputRef,
    mediaInputRef,
    attachmentInputRef,
    textareaRef,
    draftKey: DRAFT_KEY
  });

  const {
    caretPos,
    showPlus,
    isPlusMenuOpen,
    setIsPlusMenuOpen,
    showSlashMenu,
    selectionPos,
    showFloatingToolbar,
    filteredSlashCommands,
    groupedSlashCommands,
    updateCaretPosition,
    handleTextareaClick: onTextareaClick,
    handleToolbarAction,
    handleKeyDown,
    handleSlashCommand
  } = useEditorInteractions({
    content: formData.content,
    textareaRef,
    setFormData,
    isEditing
  });

  const {
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
  } = useEditorAiAssistant({
    formData,
    setFormData,
    textareaRef
  });

  useEditorPendingUploadsCleanup({
    draftKey: DRAFT_KEY
  });

  useEffect(() => {
    return registerDraftBridge(DRAFT_KEY, {
      replaceContentPlaceholder: (placeholder, markdown) => {
        setFormData((prev) => ({
          ...prev,
          content: prev.content.includes(placeholder)
            ? replaceUploadPlaceholder(prev.content, placeholder, markdown)
            : prev.content
        }));
      },
      setCoverImage: (fileUrl, thumbnailUrl) => {
        setFormData((prev) => ({ ...prev, imageUrl: fileUrl, thumbnailUrl }));
      },
      removeContentPlaceholder: (placeholder) => {
        setFormData((prev) => ({
          ...prev,
          content: removeUploadPlaceholder(prev.content, placeholder)
        }));
      }
    });
  }, [DRAFT_KEY, registerDraftBridge]);

  useEffect(() => {
    const failure = getAutoSaveFailure(DRAFT_KEY);
    if (!failure) {
      return;
    }

    const timer = window.setTimeout(() => {
      toast.error(failure.message);
      clearAutoSaveFailure(DRAFT_KEY);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [DRAFT_KEY, clearAutoSaveFailure, getAutoSaveFailure]);

  const validCategories = useMemo(() => getValidCategories(categories), [categories]);
  const selectedCategory = categories.find(c => c._id === formData.categoryId);
  const initialFormData = useMemo(
    () => getInitialEditorFormData(initialData, categories),
    [initialData, categories]
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isSavedRef.current) {
        return;
      }

      const pendingUploadCount = getDraftPendingUploadCount(DRAFT_KEY);
      if (!hasUnsavedEditorChanges(formDataRef.current, initialFormData, pendingUploadCount)) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [
    DRAFT_KEY,
    getDraftPendingUploadCount,
    initialFormData
  ]);

  const ensureStorageFolder = useCallback(async () => {
    return formData.storageFolder;
  }, [formData.storageFolder]);

  const {
    isAiImageModalOpen,
    setIsAiImageModalOpen,
    imagePrompt,
    setImagePrompt,
    isSearchingAiImage,
    handleAiImageGenerate
  } = useEditorAiImage({
    formData,
    setFormData,
    textareaRef,
    ensureStorageFolder
  });

  // 由于现在采用 Skeleton 方案，进入编辑器时 id 和 storageFolder 均已分配，
  // 故不再需要前端主动请求初始化。

  const handleAiCoverSearch = useCallback(async () => {
    if (!formData.title.trim() && !formData.description.trim() && !formData.content.trim()) {
      toast.error('请先填写标题、描述或正文内容');
      return;
    }

    setIsSearchingAiCover(true);

    try {
      const storageFolder = await ensureStorageFolder();
      const response = await fetch(withBasePath('/api/admin/cover-search'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          storageFolder
        })
      });
      const data = await response.json();

      if (!response.ok || !data.success || !data.imageUrl) {
        throw new Error(data.error || 'AI 匹配封面失败');
      }

      setFormData((prev) => ({
        ...prev,
        storageFolder,
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl || data.imageUrl
      }));

      toast.success(
        data.query
          ? `AI 已匹配横向封面：${data.query}`
          : 'AI 已匹配横向封面'
      );
    } catch (error) {
      console.error('AI cover search failed:', error);
      toast.error(error instanceof Error ? error.message : 'AI 匹配封面失败');
    } finally {
      setIsSearchingAiCover(false);
    }
  }, [
    ensureStorageFolder,
    formData.content,
    formData.description,
    formData.title
  ]);

  const ensureDraftCreatedOnExit = async () => {
    const pendingUploadCount = getDraftPendingUploadCount(DRAFT_KEY);
    if (!hasMeaningfulEditorChanges(formData, pendingUploadCount)) {
      return true;
    }

    const draftFormData = buildAutoSavedFormData(formData);

    if (pendingUploadCount > 0) {
      await scheduleAutoSave({
        draftKey: DRAFT_KEY,
        formData: draftFormData,
        publishStatus: false
      });
      return true;
    }

    const result = await saveSolution({
      ...draftFormData,
      isPublished: false,
      newlyUploadedUrls: getTrackedUploadedUrls(DRAFT_KEY)
    });

    if (!result.success) {
      return false;
    }

    isSavedRef.current = true;
    localStorage.removeItem(DRAFT_KEY);
    await clearDraftUploadState(DRAFT_KEY);
    clearAutoSaveFailure(DRAFT_KEY);
    return true;
  };

  const handleBackToList = async () => {
    if (isSubmitting) {
      return;
    }

    const pendingUploadCount = getDraftPendingUploadCount(DRAFT_KEY);
    if (!hasUnsavedEditorChanges(formData, initialFormData, pendingUploadCount)) {
      await clearDraftUploadState(DRAFT_KEY);
      router.push('/customers/admin/customers');
      router.refresh();
      return;
    }

    setIsExitConfirmOpen(true);
  };

  const handleDiscardAndExit = () => {
    setIsExitConfirmOpen(false);
    router.push('/customers/admin/customers');
    router.refresh();
  };

  const handleSaveDraftAndExit = async () => {
    setIsSubmitting(true);
    const created = await ensureDraftCreatedOnExit();
    setIsSubmitting(false);

    if (!created) {
      toast.error('保存草稿失败，请稍后重试');
      return;
    }

    setIsExitConfirmOpen(false);
    router.push('/customers/admin/customers');
    router.refresh();
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>,
    publishStatus?: boolean
  ) => {
    event.preventDefault();
    if (!formData.title || !formData.categoryId || !formData.content) {
      toast.error('请填写完整的必填信息');
      return;
    }

    setIsSubmitting(true);
    const nextPublishStatus =
      publishStatus !== undefined ? publishStatus : formData.isPublished;
    const pendingUploadCount = getDraftPendingUploadCount(DRAFT_KEY);

    if (pendingUploadCount > 0) {
      await scheduleAutoSave({
        draftKey: DRAFT_KEY,
        formData,
        publishStatus: nextPublishStatus
      });
      setIsSubmitting(false);
      toast.success(`仍有 ${pendingUploadCount} 个文件在后台上传，上传完成后将自动保存`);
      router.push('/customers/admin/customers');
      router.refresh();
      return;
    }

    const finalData = {
      ...formData,
      isPublished: nextPublishStatus,
      newlyUploadedUrls: getTrackedUploadedUrls(DRAFT_KEY)
    };

    const res = await saveSolution(finalData);
    setIsSubmitting(false);

    if (res.success) {
      isSavedRef.current = true;
      localStorage.removeItem(DRAFT_KEY);
      await clearDraftUploadState(DRAFT_KEY);
      clearAutoSaveFailure(DRAFT_KEY);
      toast.success('保存成功');
      router.push('/customers/admin/customers');
      router.refresh();
    } else {
      toast.error(res.error || '保存失败');
    }
  };

  const wordCount = useMemo(() => {
    return getEditorWordCount(formData.content);
  }, [formData.content]);

  const readingTime = useMemo(() => {
    return getEditorReadingTime(wordCount);
  }, [wordCount]);

  const tocItems = useMemo(() => {
    return getEditorTocItems(formData.content);
  }, [formData.content]);
  const {
    tocItems: syncedTocItems,
    activeId,
    handleTocItemClick
  } = useSyncedToc({
    containerRef: previewArticleRef,
    markdownContent: formData.content,
    enabled: !isEditing,
    scrollContainerSelector: 'main'
  });

  // 点击 textarea 时，若光标落在图片 Markdown 行则滚动右侧预览到对应图片
  const handleTextareaClick = useCallback(() => {
    onTextareaClick();

    const textarea = textareaRef.current;
    if (!textarea || !isEditing) return;

    const imageAtSelection = findImageAtSelection(
      formData.content,
      textarea.selectionStart,
      textarea.selectionEnd
    );

    if (imageAtSelection) {
      const previewImg = document.querySelector<HTMLElement>(
        `[data-line-start="${imageAtSelection.lineStart}"]`
      );
      previewImg?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [onTextareaClick, isEditing, formData.content, textareaRef]);

  return (
    <div className="flex flex-col flex-1 min-h-[700px]">
      <EditorTopBar
        title={formData.id ? '编辑解决方案' : '新建解决方案'}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onBack={handleBackToList}
        onSaveDraft={(event) => handleSubmit(event, false)}
        onPublish={(event) => handleSubmit(event, true)}
      />

      {/* 全屏编辑/预览区 */}
      <div
        id="editor-scroll-container"
        className="flex-1 bg-[#f5f6f7] dark:bg-[#202124] relative scroll-smooth"
        onDoubleClick={() => {
          if (!isEditing) setIsEditing(true);
        }}
      >
        <div className="min-h-full">
          <EditorHeroSection
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
            validCategories={validCategories}
            selectedCategory={selectedCategory}
            initialData={initialData}
            prevSolution={prevSolution}
            nextSolution={nextSolution}
            isCategoryDropdownOpen={isCategoryDropdownOpen}
            setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
            fileInputRef={fileInputRef}
            isUploadingImage={isUploadingImage}
            isSearchingAiCover={isSearchingAiCover}
            onImageUpload={handleImageUpload}
            onAiCoverSearch={handleAiCoverSearch}
          />

          <EditorWorkspace
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            formData={formData}
            setFormData={setFormData}
            textareaRef={textareaRef}
            mediaInputRef={mediaInputRef}
            attachmentInputRef={attachmentInputRef}
            articleRef={previewArticleRef}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
            tocItems={syncedTocItems.length > 0 ? syncedTocItems : tocItems}
            activeId={activeId}
            onTocItemClick={handleTocItemClick}
            isGenerating={isGenerating}
            isUploadingMedia={isUploadingMedia}
            isDragging={isDragging}
            pasteProgress={pasteProgress}
            wordCount={wordCount}
            readingTime={readingTime}
            caretPos={caretPos}
            selectionPos={selectionPos}
            showPlus={showPlus}
            isPlusMenuOpen={isPlusMenuOpen}
            setIsPlusMenuOpen={setIsPlusMenuOpen}
            showSlashMenu={showSlashMenu}
            showFloatingToolbar={showFloatingToolbar}
            filteredSlashCommands={filteredSlashCommands}
            groupedSlashCommands={groupedSlashCommands}
            updateCaretPosition={updateCaretPosition}
            handleTextareaClick={handleTextareaClick}
            handlePaste={handlePaste}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleKeyDown={handleKeyDown}
            handleToolbarAction={handleToolbarAction}
            handleSlashCommand={handleSlashCommand}
            handleMediaChange={handleMediaChange}
            handleAttachmentChange={handleAttachmentChange}
            openAiModal={() => setIsAiModalOpen(true)}
            openAiImageModal={() => setIsAiImageModalOpen(true)}
            stopGenerating={stopGenerating}
          />
        </div>
      </div>

      {/* AI 生成模态框 */}
      {isAiModalOpen && (
        <AiGenerateModal
          aiPrompt={aiPrompt}
          isGenerating={isGenerating}
          onPromptChange={setAiPrompt}
          onClose={() => setIsAiModalOpen(false)}
          onOpenSettings={handleOpenSettings}
          onGenerate={handleAiGenerate}
        />
      )}

      {isAiImageModalOpen && (
        <AiImageModal
          imagePrompt={imagePrompt}
          isSearching={isSearchingAiImage}
          onPromptChange={setImagePrompt}
          onClose={() => setIsAiImageModalOpen(false)}
          onGenerate={() => void handleAiImageGenerate()}
        />
      )}

      {/* 系统提示词设置模态框 */}
      {isSettingsOpen && (
        <SystemPromptModal
          isLoading={isLoadingSettings}
          isSaving={isSavingSettings}
          systemPrompt={systemPrompt}
          onClose={() => setIsSettingsOpen(false)}
          onChange={setSystemPrompt}
          onSave={handleSaveSettings}
        />
      )}

      {isExitConfirmOpen && (
        <ConfirmModal
          isOpen={isExitConfirmOpen}
          title="返回列表"
          subtitle="检测到未保存的编辑修改"
          tone="warning"
          description="是否将当前修改保存为草稿后返回列表？如果直接返回，本次未保存的编辑内容将不会写入案例。"
          onClose={() => setIsExitConfirmOpen(false)}
          actions={[
            {
              label: '取消',
              onClick: () => setIsExitConfirmOpen(false),
              disabled: isSubmitting
            },
            {
              label: '直接返回',
              onClick: handleDiscardAndExit,
              disabled: isSubmitting
            },
            {
              label: isSubmitting ? '保存中...' : '保存为草稿并返回',
              onClick: handleSaveDraftAndExit,
              variant: 'primary',
              disabled: isSubmitting
            }
          ]}
        />
      )}
    </div>
  );
}
