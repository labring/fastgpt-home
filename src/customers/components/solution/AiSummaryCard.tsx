"use client";

import { useCallback, useEffect, useRef, useState, startTransition } from "react";
import { SparkleIcon, CaretRightIcon, CaretDownIcon, PaperPlaneRightIcon, ChatCircleDotsIcon, StopCircleIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { createParser, EventSourceParser } from "eventsource-parser";
import { withBasePath } from "@/customers/lib/base-path";
import { markdownComponents } from "@/customers/components/solution/MarkdownComponents";
import {
  markdownRehypePlugins,
  markdownRemarkPlugins,
  prepareMarkdownContent
} from "@/customers/components/solution/markdownConfig";

interface AiSummaryCardProps {
  solutionId: string;
  contentVersion?: string;
}

type ChatHistoryItem = {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
};

type AiSummaryCacheSnapshot = {
  painPoints: string;
  capabilities: string;
  value: string;
  hasGeneratedSummary: boolean;
  chatHistory: ChatHistoryItem[];
};

export function buildAiSummaryCacheKey(solutionId: string, contentVersion: string | undefined, key: string) {
  const version = contentVersion?.trim() || 'current';
  return `ai_cache_${solutionId}_${version}_${key}`;
}

export function readAiSummaryCache(solutionId: string, contentVersion?: string): AiSummaryCacheSnapshot {
  if (typeof window === 'undefined') {
    return {
      painPoints: '',
      capabilities: '',
      value: '',
      hasGeneratedSummary: false,
      chatHistory: []
    };
  }

  const getCacheKey = (key: string) => buildAiSummaryCacheKey(solutionId, contentVersion, key);

  try {
    const cachedPainPoints = sessionStorage.getItem(getCacheKey('painPoints')) || '';
    const cachedCapabilities = sessionStorage.getItem(getCacheKey('capabilities')) || '';
    const cachedValue = sessionStorage.getItem(getCacheKey('value')) || '';
    const cachedHasGenerated = sessionStorage.getItem(getCacheKey('hasGenerated')) === 'true';
    const cachedChatHistory = sessionStorage.getItem(getCacheKey('chatHistory'));

    return {
      painPoints: cachedPainPoints,
      capabilities: cachedCapabilities,
      value: cachedValue,
      hasGeneratedSummary: cachedHasGenerated,
      chatHistory: cachedChatHistory ? JSON.parse(cachedChatHistory) : []
    };
  } catch (error) {
    console.error('Failed to load AI cache', error);
    return {
      painPoints: '',
      capabilities: '',
      value: '',
      hasGeneratedSummary: false,
      chatHistory: []
    };
  }
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function AiSummaryCard({ solutionId, contentVersion }: AiSummaryCardProps) {
  // Global Cache for persistence
  const getCacheKey = useCallback(
    (key: string) => buildAiSummaryCacheKey(solutionId, contentVersion, key),
    [solutionId, contentVersion]
  );
  const initialCache = readAiSummaryCache(solutionId, contentVersion);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'qa' | 'summary'>('qa');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedSummary, setHasGeneratedSummary] = useState(initialCache.hasGeneratedSummary);
  const [hasSummaryError, setHasSummaryError] = useState(false);

  const [painPoints, setPainPoints] = useState(initialCache.painPoints);
  const [capabilities, setCapabilities] = useState(initialCache.capabilities);
  const [value, setValue] = useState(initialCache.value);

  const abortControllerRef = useRef<AbortController | null>(null);

  // QA state
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(initialCache.chatHistory);
  const [inputValue, setInputValue] = useState("");
  const [isQaGenerating, setIsQaGenerating] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const qaScrollRef = useRef<HTMLDivElement>(null);
  const qaAbortControllerRef = useRef<AbortController | null>(null);

  // Stop generation when solutionId changes
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (qaAbortControllerRef.current) {
        qaAbortControllerRef.current.abort();
      }
    };
  }, [solutionId, contentVersion]);

  // Save to cache
  useEffect(() => {
    if (!isGenerating && hasGeneratedSummary) {
      sessionStorage.setItem(getCacheKey('painPoints'), painPoints);
      sessionStorage.setItem(getCacheKey('capabilities'), capabilities);
      sessionStorage.setItem(getCacheKey('value'), value);
      sessionStorage.setItem(getCacheKey('hasGenerated'), 'true');
    }
  }, [painPoints, capabilities, value, isGenerating, hasGeneratedSummary, getCacheKey]);

  useEffect(() => {
    if (!isQaGenerating && chatHistory.length > 0) {
      sessionStorage.setItem(getCacheKey('chatHistory'), JSON.stringify(chatHistory));
    }
  }, [chatHistory, isQaGenerating, getCacheKey]);

  const QUICK_QUESTIONS = [
    "快速总结本文的核心内容",
    "深度解读该方案的业务价值",
    "FastGPT 在此场景中发挥了怎样的价值？"
  ];

  useEffect(() => {
    if (qaScrollRef.current) {
      qaScrollRef.current.scrollTop = qaScrollRef.current.scrollHeight;
    }
  }, [chatHistory, isQaGenerating]);

  const fetchStream = async (type: string, onChunk: (text: string) => void, signal: AbortSignal) => {
    try {
      const res = await fetch(withBasePath('/api/ai-summary'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solutionId, type }),
        signal
      });

      if (!res.ok) throw new Error('API failed');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return true;

      // Buffer chunks to reduce React re-renders during SSE streaming
      let buffer = '';
      const FLUSH_INTERVAL = 60; // flush buffer every ~60ms to batch updates
      let lastFlush = 0;

      const parser: EventSourceParser = createParser({
        onEvent(event) {
          if (event.data !== '[DONE]') {
            try {
              const data = JSON.parse(event.data);
              const contentDelta = data.choices?.[0]?.delta?.content;
              if (contentDelta) {
                buffer += contentDelta;
                const now = Date.now();
                if (now - lastFlush >= FLUSH_INTERVAL) {
                  const batch = buffer;
                  buffer = '';
                  lastFlush = now;
                  startTransition(() => onChunk(batch));
                }
              }
            } catch {
              // Ignore parse errors for individual events
            }
          }
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        parser.feed(chunk);
      }

      // Flush remaining buffer
      if (buffer) {
        startTransition(() => onChunk(buffer));
      }
      return true;
    } catch (error: unknown) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error(`Stream error for ${type}:`, error);
        return false;
      }
      return true;
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleGenerateSummary = () => {
    if (isGenerating || (hasGeneratedSummary && !hasSummaryError)) return;

    setHasSummaryError(false);
    setPainPoints("");
    setCapabilities("");
    setValue("");
    setIsGenerating(true);
    setHasGeneratedSummary(true);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    Promise.all([
      fetchStream('pain_points', (chunk) => setPainPoints(prev => prev + chunk), signal),
      fetchStream('capabilities', (chunk) => setCapabilities(prev => prev + chunk), signal),
      fetchStream('value', (chunk) => setValue(prev => prev + chunk), signal)
    ]).then((results) => {
      if (results.includes(false)) {
        setHasSummaryError(true);
        toast.error('生成提炼失败，请重试');
      }
    }).finally(() => {
      setIsGenerating(false);
    });
  };

  const handleSendQa = async (overrideQuestion?: string) => {
    const targetQuestion = overrideQuestion || inputValue.trim();
    if (!targetQuestion || isQaGenerating) return;

    if (!overrideQuestion) {
      setInputValue("");
    }

    const newHistory = [...chatHistory, { role: 'user' as const, content: targetQuestion }];
    setChatHistory(newHistory);
    setIsQaGenerating(true);

    // Add empty assistant message to append to
    setChatHistory(prev => [...prev, { role: 'assistant', content: "" }]);

    qaAbortControllerRef.current = new AbortController();
    const signal = qaAbortControllerRef.current.signal;

    try {
      const res = await fetch(withBasePath('/api/ai-qa'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solutionId,
          question: targetQuestion,
          history: newHistory.slice(-5) // Send last 5 messages for context
        }),
        signal
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('提问过于频繁，请稍后再试');
        }
        throw new Error('API failed');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      let qaBuffer = '';
      const QA_FLUSH_INTERVAL = 60;
      let qaLastFlush = 0;

      const parser: EventSourceParser = createParser({
        onEvent(event) {
          if (event.data !== '[DONE]') {
            try {
              const data = JSON.parse(event.data);
              const contentDelta = data.choices?.[0]?.delta?.content;
              if (contentDelta) {
                qaBuffer += contentDelta;
                const now = Date.now();
                if (now - qaLastFlush >= QA_FLUSH_INTERVAL) {
                  const batch = qaBuffer;
                  qaBuffer = '';
                  qaLastFlush = now;
                  startTransition(() => {
                    setChatHistory(prev => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: updated[updated.length - 1].content + batch
                      };
                      return updated;
                    });
                  });
                }
              }
            } catch {
              // Ignore parse errors for individual events
            }
          }
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        parser.feed(chunk);
      }

      // Flush remaining buffer
      if (qaBuffer) {
        startTransition(() => {
          setChatHistory(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: updated[updated.length - 1].content + qaBuffer
            };
            return updated;
          });
        });
      }
    } catch (error: unknown) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        console.error('QA stream error:', error);
        toast.error(getErrorMessage(error, '回答获取失败，请重试'));
        setChatHistory(prev => {
          // 如果出错，把最后一条 assistant 气泡和用户的提问都删掉
          return prev.slice(0, -2);
        });
      }
    } finally {
      setIsQaGenerating(false);
    }
  };

  const handleStopQa = () => {
    if (qaAbortControllerRef.current) {
      qaAbortControllerRef.current.abort();
      setIsQaGenerating(false);
    }
  };

  const handleStopSummary = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 悬浮触发按钮：右侧居中、紧凑型侧边栏标签设计 */}
      <button
        onClick={handleOpen}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 group flex flex-col items-center gap-2 py-4 px-2 rounded-l-xl bg-white dark:bg-[#292d33] shadow-[-4px_0_20px_rgba(0,0,0,0.1)] dark:shadow-[-4px_0_18px_rgba(0,0,0,0.28)] border border-r-0 border-gray-200 dark:border-[#373c43] hover:pl-3 transition-all duration-300 ease-out transform-gpu ${isOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        <div className="relative">
          <SparkleIcon weight="fill" className="w-4 h-4 text-brand-500 animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-1 text-[11px] font-bold tracking-tight text-gray-600 dark:text-[#aeb4bc] group-hover:text-brand-500 transition-colors uppercase">
          <span className="leading-none">AI</span>
          <span className="mt-0.5">助</span>
          <span>手</span>
        </div>
        <CaretRightIcon weight="bold" className="w-3 h-3 text-gray-300 dark:text-[#8f959e] group-hover:text-brand-400" />
      </button>

      {/* 侧边面板：极简主义，移除多余图标，强化文字排版 */}
      <div
        className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-[calc(100vw-2rem)] sm:w-[380px] lg:w-[400px] bg-white dark:bg-[#292d33] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_18px_42px_rgba(0,0,0,0.34)] border border-gray-100 dark:border-[#373c43] flex flex-col overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
        style={{ maxHeight: 'calc(100vh - 8rem)' }}
      >

        {/* Header */}
        <div className="flex flex-col px-6 py-4 border-b border-gray-50 dark:border-[#373c43]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-gray-900 dark:text-[#f1f3f5] tracking-tight">AI 智能助手</span>
                {(isGenerating || isQaGenerating) && <span className="flex h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse"></span>}
              </div>
              <p className="text-[11px] text-gray-400 dark:text-[#8f959e] font-medium">深入解析文档核心价值</p>
            </div>

            <div className="flex items-center gap-1">
              {(isGenerating && activeTab === 'summary') && (
                <button
                  onClick={handleStopSummary}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors mr-1"
                  title="停止生成"
                >
                  <StopCircleIcon weight="fill" className="w-4 h-4 animate-pulse" />
                  <span className="text-[11px] font-medium">停止</span>
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:text-[#8f959e] dark:hover:text-[#f1f3f5] dark:hover:bg-[#30343b] transition-colors"
              >
                <CaretDownIcon weight="bold" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100/80 dark:bg-[#202124] p-1 rounded-lg w-full">
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[12px] py-1.5 rounded-md transition-all ${activeTab === 'qa' ? 'bg-white dark:bg-[#30343b] text-gray-900 dark:text-[#f1f3f5] font-semibold shadow-sm' : 'text-gray-500 dark:text-[#aeb4bc] hover:text-gray-700'}`}
            >
              <ChatCircleDotsIcon weight={activeTab === 'qa' ? "fill" : "regular"} className="w-3.5 h-3.5" />
              文档问答
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[12px] py-1.5 rounded-md transition-all ${activeTab === 'summary' ? 'bg-white dark:bg-[#30343b] text-gray-900 dark:text-[#f1f3f5] font-semibold shadow-sm' : 'text-gray-500 dark:text-[#aeb4bc] hover:text-gray-700'}`}
            >
              <SparkleIcon weight={activeTab === 'summary' ? "fill" : "regular"} className="w-3.5 h-3.5" />
              核心提炼
            </button>
          </div>
        </div>

        {/* 内容区 */}
        {activeTab === 'summary' ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-7 relative">
            {!hasGeneratedSummary && !isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-[#292d33]/95 z-10 px-6">
                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 text-brand-500 rounded-full flex items-center justify-center mb-4">
                  <SparkleIcon weight="fill" className="w-6 h-6" />
                </div>
                <h3 className="text-gray-900 dark:text-[#f1f3f5] font-bold text-[15px] mb-2 text-center">AI 智能提炼</h3>
                <p className="text-gray-500 dark:text-[#aeb4bc] text-[13px] text-center leading-relaxed mb-6">
                  点击开始生成，AI 将为您深入分析本文档的<br/>核心痛点、应用能力与最终业务价值。
                </p>
                <button
                  onClick={handleGenerateSummary}
                  className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-full text-[13px] font-medium transition-all shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
                >
                  <SparkleIcon weight="bold" className="w-4 h-4" />
                  开始生成提炼
                </button>
              </div>
            ) : null}

            {/* 栏目 1: 核心痛点 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3.5 bg-rose-500/80 rounded-full"></div>
                <h4 className="text-[13px] font-bold text-gray-900 dark:text-[#f1f3f5] tracking-wider">核心痛点</h4>
              </div>
              <div className="text-[13px] text-gray-600 dark:text-[#aeb4bc] leading-[1.8] font-normal pl-3 border-l border-gray-100 dark:border-[#373c43]">
                {painPoints || (isGenerating ? "" : "暂无分析内容")}
                {isGenerating && <span className="inline-block w-1 h-3 bg-brand-500/50 animate-pulse ml-1"></span>}
              </div>
            </div>

            {/* 栏目 2: 应用能力 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3.5 bg-blue-500/80 rounded-full"></div>
                <h4 className="text-[13px] font-bold text-gray-900 dark:text-[#f1f3f5] tracking-wider">应用能力</h4>
              </div>
              <div className="text-[13px] text-gray-600 dark:text-[#aeb4bc] leading-[1.8] font-normal pl-3 border-l border-gray-100 dark:border-[#373c43]">
                {capabilities || (isGenerating ? "" : "暂无分析内容")}
                {isGenerating && <span className="inline-block w-1 h-3 bg-brand-500/50 animate-pulse ml-1"></span>}
              </div>
            </div>

            {/* 栏目 3: 最终价值 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3.5 bg-emerald-500/80 rounded-full"></div>
                <h4 className="text-[13px] font-bold text-gray-900 dark:text-[#f1f3f5] tracking-wider">最终价值</h4>
              </div>
              <div className="text-[13px] text-gray-600 dark:text-[#aeb4bc] leading-[1.8] font-normal pl-3 border-l border-gray-100 dark:border-[#373c43]">
                {value || (isGenerating ? "" : "暂无分析内容")}
                {isGenerating && <span className="inline-block w-1 h-3 bg-brand-500/50 animate-pulse ml-1"></span>}
              </div>
            </div>

            {hasSummaryError && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleGenerateSummary}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-lg text-[13px] font-medium transition-colors"
                >
                  <SparkleIcon weight="fill" className="w-4 h-4" />
                  重新生成提炼
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div ref={qaScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6">
              {chatHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 space-y-3">
                  <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 text-brand-500 rounded-full flex items-center justify-center mb-1">
                    <ChatCircleDotsIcon weight="fill" className="w-6 h-6" />
                  </div>
                  <p className="text-[14px] font-bold text-gray-900 dark:text-[#f1f3f5]">
                    AI 智能问答
                  </p>
                  <p className="text-[13px] text-gray-500 dark:text-[#aeb4bc] leading-relaxed mb-2 max-w-[280px]">
                    您可以向我提问关于当前方案的任何问题，例如：
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-[280px]">
                    {QUICK_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendQa(q)}
                        className="text-left px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-[12px] rounded-xl transition-all shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="group relative max-w-[88%]">
                      <div className={`rounded-2xl px-4 py-2.5 text-[13px] leading-[1.6] ${
                        msg.role === 'user'
                          ? 'bg-brand-500 text-white rounded-tr-sm'
                          : 'bg-white dark:bg-[#2b2f36] text-gray-800 dark:text-[#dfe1e5] rounded-tl-sm border border-gray-100 dark:border-[#373c43] shadow-sm prose prose-sm dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5 prose-a:text-brand-500 max-w-none wrap-break-words'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <>
                            <ReactMarkdown
                              remarkPlugins={markdownRemarkPlugins}
                              rehypePlugins={markdownRehypePlugins}
                              components={markdownComponents}
                            >
                              {prepareMarkdownContent(
                                msg.content || (isQaGenerating && i === chatHistory.length - 1 ? " " : "")
                              )}
                            </ReactMarkdown>
                            {!isQaGenerating && msg.content && (
                              <button
                                onClick={() => handleCopy(msg.content, i)}
                                className="absolute -bottom-1 -right-8 p-1.5 text-gray-400 hover:text-gray-700 dark:text-[#8f959e] dark:hover:text-[#dfe1e5] opacity-0 group-hover:opacity-100 transition-opacity rounded-md hover:bg-gray-100 dark:hover:bg-[#30343b] z-10 bg-gray-50 dark:bg-[#292d33] shadow-sm border border-gray-100 dark:border-[#373c43]"
                                title="复制内容"
                              >
                                {copiedIndex === i ? (
                                  <CheckIcon weight="bold" className="w-3.5 h-3.5 text-emerald-500" />
                                ) : (
                                  <CopyIcon weight="fill" className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </>
                        ) : (
                          msg.content
                        )}
                        {!msg.content && isQaGenerating && i === chatHistory.length - 1 && (
                          <span className="inline-block w-1.5 h-3.5 bg-brand-500/50 dark:bg-brand-400/50 animate-pulse align-middle"></span>
                        )}
                      </div>
                      {/* QA error logic removed */}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input area */}
            <div className="p-4 bg-white dark:bg-[#292d33] border-t border-gray-100 dark:border-[#373c43] relative">

              {/* 快捷问题弹出层 (Popover) */}
              <div
                className={`absolute left-4 right-4 bottom-[calc(100%+8px)] bg-white dark:bg-[#2b2f36] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgb(0,0,0,0.32)] border border-gray-100 dark:border-[#373c43] p-2 transition-all duration-200 origin-bottom z-10 ${
                  isInputFocused && !isQaGenerating && !inputValue
                    ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-y-95 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="text-[11px] font-semibold text-gray-400 dark:text-[#8f959e] mb-1.5 px-2 tracking-wider">快捷提问</div>
                <div className="flex flex-col gap-0.5">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onMouseDown={(e) => {
                        // 阻止默认事件，防止输入框失去焦点
                        e.preventDefault();
                        handleSendQa(q);
                      }}
                      className="text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-[#30343b] text-gray-700 dark:text-[#dfe1e5] text-[12px] rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <span className="truncate">{q}</span>
                      <SparkleIcon className="w-3.5 h-3.5 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" weight="fill" />
                    </button>
                  ))}
                </div>
              </div>

              <div className={`relative flex items-center bg-gray-50 dark:bg-[#202124] border rounded-2xl transition-all duration-300 ${
                isInputFocused
                  ? 'border-brand-500/50 ring-2 ring-brand-500/10 shadow-sm dark:bg-[#2b2f36]'
                  : 'border-gray-200 dark:border-[#373c43] hover:border-gray-300 dark:hover:border-[#4b525c]'
              }`}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendQa();
                    }
                  }}
                  placeholder="基于当前文档提问..."
                  className="w-full bg-transparent pl-4 pr-11 py-3 text-[13px] text-gray-900 dark:text-[#f1f3f5] focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-[#8f959e]"
                />
                <button
                  onClick={isQaGenerating ? handleStopQa : () => handleSendQa()}
                  disabled={!isQaGenerating && !inputValue.trim()}
                  className={`absolute right-1.5 p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    isQaGenerating
                      ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20'
                      : inputValue.trim()
                        ? 'bg-brand-500 text-white shadow-md hover:bg-brand-600 hover:scale-105 active:scale-95'
                        : 'bg-transparent text-gray-300 dark:text-[#8f959e]'
                  }`}
                  title={isQaGenerating ? "停止生成" : "发送"}
                >
                  {isQaGenerating ? (
                    <StopCircleIcon weight="fill" className="w-4 h-4 animate-pulse" />
                  ) : (
                    <PaperPlaneRightIcon weight="fill" className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
