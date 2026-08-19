'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  deleteCategory,
  saveCategory,
  toggleCategoryStatus,
  updateCategoryOrders
} from '@/app/customers/admin/actions/categories';
import {
  getRandomCategoryColor,
  normalizeHexColor
} from '@/customers/lib/category-color';
import type { AdminManagedCategory, CategoryFormData } from './types';
import { withBasePath } from '@/customers/lib/base-path';

interface UseCategoryManagerProps {
  initialCategories: AdminManagedCategory[];
}

export function useCategoryManager({
  initialCategories
}: UseCategoryManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState('');
  const [isDeleteSubmitting, setIsDeleteSubmitting] = useState(false);
  const [isSuggestingSlug, setIsSuggestingSlug] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    id: '',
    name: '',
    slug: '',
    order: 0,
    color: getRandomCategoryColor()
  });

  const openModal = useCallback((category?: AdminManagedCategory) => {
    if (category) {
      setFormData({
        id: category._id,
        name: category.name,
        slug: category.slug,
        order: category.order,
        color: normalizeHexColor(category.color)
      });
    } else {
      setFormData({
        id: '',
        name: '',
        slug: '',
        order: categories.length,
        color: getRandomCategoryColor()
      });
    }

    setIsModalOpen(true);
  }, [categories.length]);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name) {
      toast.error('分类名称不能为空');
      return;
    }

    if (!formData.slug) {
      toast.error('分类 Slug 不能为空');
      return;
    }

    const nextFormData = {
      ...formData,
      color: normalizeHexColor(formData.color)
    };

    setIsSubmitting(true);
    const result = await saveCategory(nextFormData);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(formData.id ? '分类更新成功' : '分类创建成功');
      setIsModalOpen(false);
      window.location.reload();
    } else {
      toast.error(result.error || '保存失败');
    }
  }, [formData]);

  const handleSuggestSlug = useCallback(async () => {
    if (!formData.name.trim()) {
      toast.error('请先填写分类名称');
      return;
    }

    setIsSuggestingSlug(true);

    try {
      const response = await fetch(withBasePath('/api/admin/category-slug-suggest'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          excludeId: formData.id || undefined
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI 匹配 Slug 失败');
      }

      if (!data.slug) {
        throw new Error('AI 未返回 Slug');
      }

      setFormData((prev) => ({ ...prev, slug: data.slug }));
      toast.success('已匹配 Slug');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'AI 匹配 Slug 失败');
    } finally {
      setIsSuggestingSlug(false);
    }
  }, [formData.id, formData.name]);

  const handleToggle = useCallback(async (
    id: string,
    currentStatus: boolean,
    index: number
  ) => {
    const nextStatus = !currentStatus;
    const nextCategories = [...categories];
    nextCategories[index].isActive = nextStatus;
    setCategories(nextCategories);

    const result = await toggleCategoryStatus(id, nextStatus);
    if (result.success) {
      toast.success(`已${nextStatus ? '启用' : '禁用'}分类`);
      return;
    }

    nextCategories[index].isActive = currentStatus;
    setCategories([...nextCategories]);
    toast.error(result.error || '操作失败');
  }, [categories]);

  const confirmDelete = useCallback((id: string) => {
    setPendingDeleteId(id);
  }, []);

  const cancelDelete = useCallback(() => {
    if (isDeleteSubmitting) {
      return;
    }
    setPendingDeleteId('');
  }, [isDeleteSubmitting]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!pendingDeleteId) {
      return;
    }

    setIsDeleteSubmitting(true);
    const result = await deleteCategory(pendingDeleteId);
    setIsDeleteSubmitting(false);

    if (result.success) {
      toast.success('删除成功');
      setCategories((prev) => prev.filter((category) => category._id !== pendingDeleteId));
      setPendingDeleteId('');
    } else {
      toast.error(result.error || '删除失败');
    }
  }, [pendingDeleteId]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex((category) => category._id === active.id);
    const newIndex = categories.findIndex((category) => category._id === over.id);
    const nextCategories = arrayMove(categories, oldIndex, newIndex);
    const orderedCategories = nextCategories.map((category, index) => ({
      ...category,
      order: index
    }));

    setCategories(orderedCategories);

    const ordersPayload = orderedCategories.map((category) => ({
      id: category._id,
      order: category.order
    }));

    const result = await updateCategoryOrders(ordersPayload);
    if (!result.success) {
      toast.error('顺序保存失败');
    }
  }, [categories]);

  return {
    categories,
    isModalOpen,
    isSubmitting,
    isSuggestingSlug,
    formData,
    setFormData,
    setIsModalOpen,
    openModal,
    handleSubmit,
    handleSuggestSlug,
    handleToggle,
    confirmDelete,
    pendingDeleteId,
    isDeleteSubmitting,
    cancelDelete,
    handleDeleteConfirm,
    handleDragEnd
  };
}
