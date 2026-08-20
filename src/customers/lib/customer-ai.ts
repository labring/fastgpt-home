import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { isValidObjectId } from '@/customers/lib/object-id';
import type { AIMessage } from '@/customers/lib/ai-chat';

export type CustomerSummaryType = 'pain_points' | 'capabilities' | 'value';

const SUMMARY_PROMPTS: Record<CustomerSummaryType, string> = {
  pain_points:
    '你是一个资深的业务架构师。请阅读以下解决方案文档，用一段话（80字以内）总结该方案解决的核心痛点。直接输出总结，不要任何前缀、解释或多余的格式。',
  capabilities:
    '你是一个资深的业务架构师。请阅读以下解决方案文档，用一段话（80字以内）总结该方案使用到的核心应用能力或技术模块。直接输出总结，不要任何前缀、解释或多余的格式。',
  value:
    '你是一个资深的业务架构师。请阅读以下解决方案文档，用一段话（80字以内）总结该方案带来的最终业务价值或收益。直接输出总结，不要任何前缀、解释或多余的格式。'
};

interface BuildCustomerQaMessagesOptions {
  content: string;
  question: string;
  history: unknown;
}

interface RawConversationMessage {
  role?: unknown;
  content?: unknown;
}

export function getCustomerSummaryPrompt(type: string) {
  return SUMMARY_PROMPTS[type as CustomerSummaryType] || null;
}

export async function getCustomerContentById(customerId: unknown) {
  if (!isValidObjectId(customerId)) {
    return null;
  }

  await dbConnect();
  const customer = await Customer.findOne({
    _id: customerId,
    isPublished: true
  }).select('content').lean();

  if (!customer) {
    return null;
  }

  return customer.content || '';
}

export function buildCustomerQaPrompt(content: string) {
  return `你是一个专业的方案咨询顾问。请根据以下提供的方案文档内容，回答用户的问题。
要求：
1. 答案必须基于提供的文档内容，不要编造。
2. 如果文档中没有相关信息，请明确告知“文档中未提及相关信息”。
3. 态度专业、客观、简洁。

【方案文档内容】
${content}`;
}

// 对话历史硬上限：防止公开 AI 接口被超长 history 放大 prompt token 成本。
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

export function normalizeConversationHistory(history: unknown): AIMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .flatMap((item) => {
      const message = item as RawConversationMessage;
      if (
        typeof message.role !== 'string' ||
        typeof message.content !== 'string' ||
        (message.role !== 'user' && message.role !== 'assistant')
      ) {
        return [];
      }

      return [
        {
          role: message.role,
          content: message.content.slice(0, MAX_MESSAGE_LENGTH)
        }
      ];
    })
    .slice(-MAX_HISTORY_MESSAGES);
}

export function buildCustomerQaMessages({
  content,
  question,
  history
}: BuildCustomerQaMessagesOptions): AIMessage[] {
  return [
    {
      role: 'system',
      content: buildCustomerQaPrompt(content)
    },
    ...normalizeConversationHistory(history),
    {
      role: 'user',
      content: question
    }
  ];
}
