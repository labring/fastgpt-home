'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  CaretDownIcon,
  CheckIcon,
  EyeIcon,
  HeartIcon,
  LinkSimpleIcon,
  MagicWandIcon,
  SpinnerIcon,
  UploadSimpleIcon
} from '@phosphor-icons/react';
import CategoryBadge from '@/customers/components/CategoryBadge';
import CustomerHero from '@/customers/components/customer/CustomerHero';
import { withBasePath } from '@/customers/lib/base-path';
import type {
  EditorCategory,
  EditorFormData,
  EditorInitialData
} from './types';
import { buildAdminCustomerEditHref } from '@/customers/lib/admin-customer-routing';

interface EditorHeroSectionProps {
  isEditing: boolean;
  formData: EditorFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditorFormData>>;
  validCategories: EditorCategory[];
  selectedCategory?: EditorCategory;
  initialData?: EditorInitialData;
  prevCustomer?: { id: string; title: string; categorySlug?: string } | null;
  nextCustomer?: { id: string; title: string; categorySlug?: string } | null;
  isCategoryDropdownOpen: boolean;
  setIsCategoryDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploadingImage: boolean;
  isSearchingAiCover: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAiCoverSearch: () => void | Promise<void>;
}

function autoResizeTextarea(target: HTMLTextAreaElement) {
  target.style.height = 'auto';
  target.style.height = `${target.scrollHeight}px`;
}

function CustomSelectField({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label || '请选择';

  return (
    <div>
      <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          <span className="truncate">{selectedLabel}</span>
          <CaretDownIcon
            size={14}
            className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    value === option.value
                      ? 'font-semibold text-blue-600 dark:text-blue-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && (
                    <CheckIcon size={14} weight="bold" className="shrink-0 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function EditorHeroSection({
  isEditing,
  formData,
  setFormData,
  validCategories,
  selectedCategory,
  initialData,
  prevCustomer,
  nextCustomer,
  isCategoryDropdownOpen,
  setIsCategoryDropdownOpen,
  fileInputRef,
  isUploadingImage,
  isSearchingAiCover,
  onImageUpload,
  onAiCoverSearch
}: EditorHeroSectionProps) {
  type SlugCheckState = {
    slug: string;
    status: 'idle' | 'checking' | 'valid' | 'taken' | 'invalid';
  };
  const [slugCheck, setSlugCheck] = useState<SlugCheckState>({ slug: '', status: 'idle' });
  const [isSuggestingSlug, setIsSuggestingSlug] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const checkSlug = useCallback(async (slug: string, excludeId?: string) => {
    if (!slug) {
      setSlugCheck({ slug: '', status: 'idle' });
      return;
    }
    setSlugCheck({ slug, status: 'checking' });
    try {
      const response = await fetch(withBasePath('/api/admin/customer-slug-check'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, excludeId })
      });
      if (response.ok) {
        setSlugCheck({ slug, status: 'valid' });
      } else if (response.status === 409) {
        setSlugCheck({ slug, status: 'taken' });
      } else {
        setSlugCheck({ slug, status: 'invalid' });
      }
    } catch {
      setSlugCheck({ slug, status: 'invalid' });
    }
  }, []);

  const handleSuggestSlug = useCallback(async () => {
    if (!formData.title.trim()) {
      toast.error('请先填写案例标题');
      return;
    }

    setIsSuggestingSlug(true);

    try {
      const response = await fetch(withBasePath('/api/admin/customer-slug-suggest'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title.trim(),
          excludeId: formData.id || undefined
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI 生成 Slug 失败');
      }

      if (!data.slug) {
        throw new Error('AI 未返回 Slug');
      }

      setFormData((prev) => ({ ...prev, slug: data.slug }));
      toast.success('已生成 Slug');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'AI 生成 Slug 失败');
    } finally {
      setIsSuggestingSlug(false);
    }
  }, [formData.id, formData.title, setFormData]);

  useEffect(() => {
    const currentSlug = formData.slug.trim();
    const timer = setTimeout(() => {
      void checkSlug(currentSlug, formData.id || undefined);
    }, 400);
    return () => clearTimeout(timer);
  }, [formData.slug, formData.id, checkSlug]);

  const slugStatus =
    slugCheck.slug === formData.slug.trim() ? slugCheck.status : 'idle';

  const advancedFilledCount =
    [
      formData.slug,
      formData.metaTitle,
      formData.publishedAt,
      formData.metaDescription,
      formData.clearanceLevel,
      formData.caseOrg,
      formData.citedNumbers
    ].filter((value) => typeof value === 'string' && value.trim()).length +
    (formData.caseNo > 0 ? 1 : 0);
  const advancedSummary =
    advancedFilledCount > 0 ? `已填 ${advancedFilledCount}/8` : '待填写';

  if (!isEditing) {
    return (
      <CustomerHero
        customer={{
          id: initialData?._id || 'preview',
          title: formData.title || '标题预览',
          description: formData.description || '在这里实时预览您的描述文案...',
          categoryId: formData.categoryId,
          categoryName: selectedCategory?.name || '分类标签',
          categoryColor: selectedCategory?.color,
          imageUrl: formData.imageUrl || '/fastgpt.svg',
          freeUseUrl: formData.freeUseUrl,
          createdAt: initialData?.createdAt || new Date().toISOString()
        }}
        prevCustomer={prevCustomer}
        nextCustomer={nextCustomer}
        getNavHref={(id) => {
          const navCustomer =
            prevCustomer && String(prevCustomer.id) === String(id)
              ? prevCustomer
              : nextCustomer;

          return buildAdminCustomerEditHref(navCustomer || { id });
        }}
        localLikes={initialData?.likesCount || 0}
        isLiked={false}
        localUsage={initialData?.usageCount?.toLocaleString() || '0'}
        hasViewed={false}
        handleLikeToggle={() => {}}
        openModal={() => {}}
      />
    );
  }

  return (
    <div className="w-full bg-slate-100 dark:bg-gray-900 border-b border-gray-200/60 dark:border-gray-800 pt-10 pb-12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="relative flex flex-col md:flex-row items-center min-h-[360px] lg:pl-4">
          <div className="flex-1 space-y-5 z-20 md:pr-12 lg:pr-10 w-full md:max-w-[48%] relative">
            <div className="relative inline-block">
              <CategoryBadge
                label={selectedCategory ? selectedCategory.name : '请选择所属分类'}
                color={selectedCategory?.color}
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="px-3.5 pr-9 py-1.5 text-sm font-semibold shadow-sm"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 z-60">
                <CaretDownIcon size={14} className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </span>

              {isCategoryDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  />
                  <div className="absolute z-50 mt-2 left-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-y-auto max-h-72 py-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {validCategories.map((category) => (
                      <button
                        key={category._id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, categoryId: category._id }));
                          setIsCategoryDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white transition-colors"
                      >
                        <div className="inline-flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                        {formData.categoryId === category._id && (
                          <CheckIcon size={16} className="text-blue-600 dark:text-blue-400 font-bold" weight="bold" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <textarea
              value={formData.title}
              onChange={(event) => {
                setFormData((prev) => ({ ...prev, title: event.target.value }));
                autoResizeTextarea(event.target);
              }}
              className="w-full text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white font-display leading-tight bg-transparent border-none outline-none resize-none p-0 focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-700"
              placeholder="输入解决方案标题..."
              rows={1}
              style={{ height: 'auto', overflow: 'hidden' }}
              onFocus={(event) => autoResizeTextarea(event.target)}
            />

            <textarea
              value={formData.description}
              onChange={(event) => {
                setFormData((prev) => ({ ...prev, description: event.target.value }));
                autoResizeTextarea(event.target);
              }}
              className="w-full text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl bg-transparent border-none outline-none resize-none p-0 focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-700"
              placeholder="输入解决方案描述..."
              rows={2}
              style={{ height: 'auto', overflow: 'hidden' }}
              onFocus={(event) => autoResizeTextarea(event.target)}
            />

            <div className="max-w-xl rounded-xl border border-gray-200/70 bg-white/75 p-3 shadow-sm shadow-black/[0.03] backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/55">
              <label
                htmlFor="customer-free-use-url"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400"
              >
                <LinkSimpleIcon size={15} weight="bold" />
                <span>案例体验链接</span>
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  可选
                </span>
              </label>
              <input
                id="customer-free-use-url"
                type="url"
                inputMode="url"
                value={formData.freeUseUrl}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, freeUseUrl: event.target.value }))
                }
                placeholder="https://"
                className="mt-2 w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-600"
              />
            </div>

            <div className="max-w-xl overflow-hidden rounded-xl border border-gray-200/70 bg-white/75 shadow-sm shadow-black/[0.03] backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/55">
              <button
                type="button"
                onClick={() => setIsAdvancedOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-3 p-3 text-left transition-colors hover:bg-white/70 dark:hover:bg-gray-800/40"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400">
                    SEO 与发布信息
                  </span>
                  <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {advancedSummary}
                  </span>
                </div>
                <CaretDownIcon
                  size={14}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                    isAdvancedOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isAdvancedOpen && (
                <div className="space-y-3 border-t border-gray-200/70 p-3 dark:border-gray-700/70">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      SEO 与 URL
                    </span>
                    <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      保存时校验唯一
                    </span>
                  </div>

              <div>
                <label
                  htmlFor="customer-slug"
                  className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  案例 Slug（唯一）
                </label>
                <div className="mt-1 flex overflow-hidden rounded-lg border border-gray-200 bg-white transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-blue-500 dark:focus-within:ring-blue-900/30">
                  <input
                    id="customer-slug"
                    type="text"
                    value={formData.slug}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, slug: event.target.value }))
                    }
                    placeholder="如 financial-terminal-ai-search"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={handleSuggestSlug}
                    disabled={isSuggestingSlug || !formData.title.trim()}
                    className="inline-flex shrink-0 items-center gap-1.5 border-l border-gray-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                  >
                    {isSuggestingSlug ? (
                      <SpinnerIcon size={14} className="animate-spin" />
                    ) : (
                      <MagicWandIcon size={14} weight="bold" />
                    )}
                    {isSuggestingSlug ? '生成中' : 'AI 生成'}
                  </button>
                </div>
                {formData.slug.trim() && (
                  <p className="mt-1 break-all text-[11px] text-gray-400">
                    {selectedCategory?.slug ? `/customers/${selectedCategory.slug}/` : '/customers/…/'}
                    <span className="text-gray-500">{formData.slug.trim()}</span>
                  </p>
                )}
                {slugStatus === 'checking' && (
                  <p className="mt-1 text-[11px] text-gray-400">检查唯一性中…</p>
                )}
                {slugStatus === 'valid' && (
                  <p className="mt-1 text-[11px] text-emerald-600">✓ Slug 可用</p>
                )}
                {slugStatus === 'taken' && (
                  <p className="mt-1 text-[11px] text-red-500">✗ Slug 已存在，请更换</p>
                )}
                {slugStatus === 'invalid' && (
                  <p className="mt-1 text-[11px] text-red-500">
                    Slug 格式错误：仅允许小写字母、数字和连字符
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="customer-meta-title"
                    className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Meta 标题（搜索引擎）
                  </label>
                  <input
                    id="customer-meta-title"
                    type="text"
                    value={formData.metaTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, metaTitle: event.target.value }))
                    }
                    placeholder="如 FastGPT助力金融终端智能检索"
                    className="mt-1 w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customer-published-at"
                    className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    发布时间
                  </label>
                  <input
                    id="customer-published-at"
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, publishedAt: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="customer-meta-description"
                  className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Meta 描述（搜索结果摘要）
                </label>
                <textarea
                  id="customer-meta-description"
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, metaDescription: event.target.value }))
                  }
                  placeholder="70-90 字符，突出客户与量化价值"
                  className="mt-1 w-full resize-none rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                    企业公开案例
                  </span>
                  <label className="mt-1 flex h-[34px] cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
                    <input
                      type="checkbox"
                      checked={formData.isPublicCase}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          isPublicCase: event.target.checked
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{formData.isPublicCase ? '客户案例' : '普通方案'}</span>
                  </label>
                </div>
                <CustomSelectField
                  label="公开层级"
                  value={formData.clearanceLevel}
                  options={[
                    { value: '', label: '未设置' },
                    { value: 'A', label: 'A · 客户名与数字可公开' },
                    { value: 'B', label: 'B · 客户名可公开，数字定性' },
                    { value: 'C', label: 'C · 匿名化，数字可用' }
                  ]}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      clearanceLevel: value as 'A' | 'B' | 'C' | ''
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="customer-case-org"
                    className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    客户名（内部登记）
                  </label>
                  <input
                    id="customer-case-org"
                    type="text"
                    value={formData.caseOrg}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, caseOrg: event.target.value }))
                    }
                    placeholder="如 朝阳永续"
                    className="mt-1 w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customer-case-no"
                    className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    案例序号（对账）
                  </label>
                  <input
                    id="customer-case-no"
                    type="number"
                    min={0}
                    value={formData.caseNo || ''}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        caseNo: Number(event.target.value) || 0
                      }))
                    }
                    className="mt-1 w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="customer-cited-numbers"
                  className="block text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  引用数字登记（内部对账）
                </label>
                <textarea
                  id="customer-cited-numbers"
                  rows={1}
                  value={formData.citedNumbers}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, citedNumbers: event.target.value }))
                  }
                  placeholder="如 覆盖 70% 用户检索需求；客服咨询量下降 60%"
                  className="mt-1 w-full resize-none rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-base text-gray-500 dark:text-gray-400 opacity-50 pointer-events-none">
              <div className="flex items-center gap-1.5">
                <HeartIcon className="text-[20px]" weight="regular" />
                <span className="font-semibold">{initialData?.likesCount || 0}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <EyeIcon className="text-[20px]" weight="regular" />
                <span className="font-semibold">{initialData?.usageCount?.toLocaleString() || '0'}</span>
              </div>
            </div>

	            <div className="pt-4">
	              <button disabled className="px-10 py-3.5 text-base font-bold rounded-xl text-white bg-brand-600/50 cursor-not-allowed">
	                验证该方案
	              </button>
	            </div>
          </div>

          <div className="w-full mt-10 md:mt-0 md:w-[52%] shrink-0 z-10">
            <div
              className="relative w-full aspect-video md:aspect-[16/9] overflow-hidden rounded-2xl border border-gray-200/70 shadow-sm dark:border-gray-700/70 cursor-pointer pointer-events-auto group"
              onClick={() => fileInputRef.current?.click()}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  void onAiCoverSearch();
                }}
                disabled={isUploadingImage || isSearchingAiCover}
                className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg shadow-black/10 backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-700/70 dark:bg-gray-900/85 dark:text-gray-100 dark:hover:bg-gray-900"
              >
                {isSearchingAiCover ? (
                  <SpinnerIcon size={16} className="animate-spin" />
                ) : (
                  <MagicWandIcon size={16} weight="fill" />
                )}
                <span>{isSearchingAiCover ? 'AI 查找中' : 'AI 匹配封面'}</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageUpload}
                accept="image/*"
                className="hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.thumbnailUrl || formData.imageUrl || '/fastgpt.svg'}
                alt="封面图"
                key={formData.imageUrl}
                fetchPriority="high"
                loading="eager"
                className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${isUploadingImage ? 'opacity-50' : 'opacity-100'}`}
                onError={(event) => {
                  (event.target as HTMLImageElement).src = '/fastgpt.svg';
                }}
              />

              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                {isUploadingImage ? (
                  <div className="flex flex-col items-center text-white">
                    <SpinnerIcon className="animate-spin text-white mb-2" size={32} />
                    <span className="text-sm font-medium">正在上传到对象存储...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-white transform group-hover:scale-110 transition-transform">
                    <UploadSimpleIcon size={48} className="mb-2 drop-shadow-md" />
                    <span className="text-lg font-bold drop-shadow-md">点击上传封面图</span>
                    <span className="text-sm text-gray-200 mt-1 drop-shadow-sm">支持本地上传或 AI 匹配横向封面</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
