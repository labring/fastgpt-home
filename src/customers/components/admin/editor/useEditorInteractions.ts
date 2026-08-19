'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import getCaretCoordinates from 'textarea-caret';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { filterSlashCommands, getSlashCommandInsert, groupSlashCommands } from './slashCommands';
import type {
  EditorCaretPosition,
  EditorFormData,
  EditorTextareaSelection,
  EditorSelectionPosition,
  EditorToolbarAction
} from './types';

interface UseEditorInteractionsProps {
  content: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  setFormData: Dispatch<SetStateAction<EditorFormData>>;
  isEditing: boolean;
}

export function useEditorInteractions({
  content,
  textareaRef,
  setFormData,
  isEditing
}: UseEditorInteractionsProps) {
  const [caretPos, setCaretPos] = useState<EditorCaretPosition | null>(null);
  const [showPlus, setShowPlus] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuFilter, setSlashMenuFilter] = useState('');
  const [selectionPos, setSelectionPos] = useState<EditorSelectionPosition | null>(null);
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [textareaSelection, setTextareaSelection] = useState<EditorTextareaSelection>({
    start: 0,
    end: 0
  });

  const isPlusMenuOpenRef = useRef(isPlusMenuOpen);
  const showSlashMenuRef = useRef(showSlashMenu);

  useEffect(() => {
    isPlusMenuOpenRef.current = isPlusMenuOpen;
    showSlashMenuRef.current = showSlashMenu;
  }, [isPlusMenuOpen, showSlashMenu]);

  const filteredSlashCommands = useMemo(
    () => filterSlashCommands(slashMenuFilter),
    [slashMenuFilter]
  );

  const groupedSlashCommands = useMemo(
    () => groupSlashCommands(filteredSlashCommands),
    [filteredSlashCommands]
  );

  const updateCaretPosition = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (isPlusMenuOpenRef.current || showSlashMenuRef.current) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setTextareaSelection({ start, end });

    if (start !== end) {
      const startCoords = getCaretCoordinates(textarea, start);
      const endCoords = getCaretCoordinates(textarea, end);
      const top = startCoords.top - textarea.scrollTop;
      const left = startCoords.left + (endCoords.left - startCoords.left) / 2;

      setSelectionPos({ top, left, width: Math.abs(endCoords.left - startCoords.left) });
      setShowFloatingToolbar(true);
      setShowPlus(false);
      setShowSlashMenu(false);
      return;
    }

    setShowFloatingToolbar(false);

    const before = content.substring(0, start);
    const after = content.substring(start);
    const lastNewLine = before.lastIndexOf('\n');
    const nextNewLine = after.indexOf('\n');
    const lineStart = lastNewLine + 1;
    const lineEnd = nextNewLine === -1 ? content.length : start + nextNewLine;
    const currentLine = content.substring(lineStart, lineEnd);
    const textBeforeCursorInLine = content.substring(lineStart, start);

    if (currentLine.trim() === '') {
      const coords = getCaretCoordinates(textarea, start);
      setCaretPos({
        top: coords.top - textarea.scrollTop,
        left: coords.left,
        height: coords.height
      });
      setShowPlus(true);
      setShowSlashMenu(false);
    } else if (textBeforeCursorInLine.startsWith('/')) {
      const coords = getCaretCoordinates(textarea, start);
      setCaretPos({
        top: coords.top - textarea.scrollTop,
        left: coords.left,
        height: coords.height
      });
      setShowPlus(false);
      setShowSlashMenu(true);
      setSlashMenuFilter(textBeforeCursorInLine.substring(1).toLowerCase());
    } else {
      setShowPlus(false);
      setIsPlusMenuOpen(false);
      setShowSlashMenu(false);
    }
  }, [content, textareaRef]);

  const handleTextareaClick = useCallback(() => {
    setIsPlusMenuOpen(false);
    setShowSlashMenu(false);
    updateCaretPosition();
  }, [updateCaretPosition]);

  useEffect(() => {
    updateCaretPosition();
  }, [content, isEditing, updateCaretPosition]);

  const focusSelectionRange = useCallback((
    textarea: HTMLTextAreaElement,
    start: number,
    end: number,
    shouldUpdateCaret = false
  ) => {
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start;
      textarea.selectionEnd = end;
      if (shouldUpdateCaret) {
        updateCaretPosition();
      }
    }, 0);
  }, [updateCaretPosition]);

  const handleToolbarAction = useCallback((action: EditorToolbarAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selectedText = value.substring(start, end);

    if (!selectedText) return;

    if (action === 'link') {
      const newValue =
        value.substring(0, start)
        `[${selectedText}](url)`
        value.substring(end);

      setFormData((prev) => ({ ...prev, content: newValue }));
      focusSelectionRange(
        textarea,
        start + selectedText.length + 3,
        start + selectedText.length + 6,
        true
      );
      return;
    }

    const wrapperMap: Record<Exclude<EditorToolbarAction, 'link'>, string> = {
      bold: '**',
      italic: '*',
      code: '`'
    };

    const wrapper = wrapperMap[action as Exclude<EditorToolbarAction, 'link'>];
    if (!wrapper) return;

    const newValue =
      value.substring(0, start)
      wrapper
      selectedText
      wrapper
      value.substring(end);

    setFormData((prev) => ({ ...prev, content: newValue }));
    focusSelectionRange(
      textarea,
      start + wrapper.length,
      start + wrapper.length + selectedText.length,
      true
    );
  }, [focusSelectionRange, setFormData, textareaRef]);

  const handleSlashCommand = useCallback((command: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const before = content.substring(0, start);
    const after = content.substring(start);
    const lineStart = before.lastIndexOf('\n') + 1;
    const newBefore = content.substring(0, lineStart);
    const { insertText, cursorOffset } = getSlashCommandInsert(command);
    const newValue = newBefore + insertText + after;

    setFormData((prev) => ({ ...prev, content: newValue }));
    setShowSlashMenu(false);
    focusSelectionRange(
      textarea,
      lineStart + cursorOffset,
      lineStart + cursorOffset
    );
  }, [content, focusSelectionRange, setFormData, textareaRef]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    if (showSlashMenu) {
      if (event.key === 'Escape' || event.key === ' ') {
        setShowSlashMenu(false);
        return;
      }
      if (event.key === 'Enter' && filteredSlashCommands.length > 0) {
        event.preventDefault();
        handleSlashCommand(filteredSlashCommands[0].id);
        return;
      }
    }

    const pairs: Record<string, string> = {
      '[': ']',
      '(': ')',
      '{': '}',
      '<': '>',
      '"': '"',
      "'": "'",
      '`': '`'
    };

    if (pairs[event.key] && start === end) {
      event.preventDefault();
      const closingChar = pairs[event.key];
      const newValue =
        value.substring(0, start)
        event.key
        closingChar
        value.substring(end);

      setFormData((prev) => ({ ...prev, content: newValue }));
      focusSelectionRange(textarea, start + 1, start + 1);
      return;
    }

    if ((event.metaKey || event.ctrlKey) && !event.shiftKey && !event.altKey) {
      const selectedText = value.substring(start, end);
      let wrapper = '';
      let defaultText = '';

      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          wrapper = '**';
          defaultText = '加粗文字';
          break;
        case 'i':
          event.preventDefault();
          wrapper = '*';
          defaultText = '斜体文字';
          break;
        case 'k':
          event.preventDefault();
          const newValue =
            value.substring(0, start)
            `[${selectedText || '链接文本'}](url)`
            value.substring(end);

          setFormData((prev) => ({ ...prev, content: newValue }));

          if (selectedText) {
            focusSelectionRange(
              textarea,
              start + selectedText.length + 3,
              start + selectedText.length + 6
            );
          } else {
            focusSelectionRange(textarea, start + 1, start + 5);
          }
          return;
      }

      if (wrapper) {
        const textToInsert = selectedText || defaultText;
        const newValue =
          value.substring(0, start)
          wrapper
          textToInsert
          wrapper
          value.substring(end);

        setFormData((prev) => ({ ...prev, content: newValue }));
        focusSelectionRange(
          textarea,
          start + wrapper.length,
          start + wrapper.length + textToInsert.length
        );
        return;
      }
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      const before = value.substring(0, start);
      const lastNewLine = before.lastIndexOf('\n');
      const currentLine = before.substring(lastNewLine + 1);
      const listMatch = currentLine.match(/^(\s*)([-*+]|\d+\.|>)\s+(.*)$/);

      if (listMatch) {
        event.preventDefault();
        const indent = listMatch[1];
        const marker = listMatch[2];
        const currentLineContent = listMatch[3];

        if (!currentLineContent.trim()) {
          const newValue =
            value.substring(0, start - currentLine.length)
            '\n'
            value.substring(end);

          setFormData((prev) => ({ ...prev, content: newValue }));
          focusSelectionRange(
            textarea,
            start - currentLine.length + 1,
            start - currentLine.length + 1
          );
          return;
        }

        let nextMarker = marker;
        if (/^\d+\.$/.test(marker)) {
          const num = parseInt(marker, 10);
          nextMarker = `${num + 1}.`;
        }

        const insertText = `\n${indent}${nextMarker} `;
        const newValue =
          value.substring(0, start)
          insertText
          value.substring(end);

        setFormData((prev) => ({ ...prev, content: newValue }));
        focusSelectionRange(
          textarea,
          start + insertText.length,
          start + insertText.length
        );
      }
    }
  }, [
    filteredSlashCommands,
    focusSelectionRange,
    handleSlashCommand,
    setFormData,
    showSlashMenu
  ]);

  return {
    caretPos,
    showPlus,
    isPlusMenuOpen,
    setIsPlusMenuOpen,
    showSlashMenu,
    textareaSelection,
    selectionPos,
    showFloatingToolbar,
    filteredSlashCommands,
    groupedSlashCommands,
    updateCaretPosition,
    handleTextareaClick,
    handleToolbarAction,
    handleKeyDown,
    handleSlashCommand
  };
}
