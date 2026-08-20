import { NextResponse } from 'next/server';
import { rateLimit } from '@/customers/lib/rate-limit';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { requireAdminSession } from '@/customers/lib/admin-auth';
import { getEnvAIConfig, getRequestClientIp, requestAIChat } from '@/customers/lib/ai-chat';
import { readJsonRecord } from '@/customers/lib/request-json';

// === 核心业务逻辑解耦 ===

/**
 * 组装 AI 提示词
 */
function buildSystemPrompt(caseList: string[]): string {
  const caseListStr = caseList.map(c => `- ${c}`).join('\n');
  return `你是一个系统内部的智能匹配助手。你的任务是将用户的自然语言需求匹配到系统现有的案例中。

【系统现有案例列表】
${caseListStr}

【匹配规则】
1. 仔细分析用户需求，从上述列表中找出语义最符合的一个案例。
2. 如果找到了匹配项，请严格以 JSON 格式输出，仅包含该案例名。例如：{"matched_case": "虚拟房产销售顾问"}。
3. 如果用户需求与列表中任何案例都不相关，请返回：{"matched_case": null}。
4. 不要输出任何多余的解释性文字。`;
}

/**
 * 调用 AI 接口获取匹配结果
 */
async function fetchAIMatch(query: string, systemPrompt: string) {
  const response = await requestAIChat({
    config: getEnvAIConfig(),
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ],
    stream: false,
    temperature: 0.0
  });

  if (!response.ok) {
    throw new Error(`AI API request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * 解析 AI 返回的 JSON 数据
 */
function parseAIResponse(content: string) {
  try {
    const jsonStr = content.replace(/```json\n?/, '').replace(/```/, '').trim();
    return JSON.parse(jsonStr);
  } catch {
    console.error('AI 解析失败:', content);
    return { matched_case: null };
  }
}

type CustomerTitleRow = {
  _id?: unknown;
  title?: string;
  categoryId?: {
    slug?: string | null;
  } | null;
  isPublished?: boolean;
};

function normalizeScope(value: unknown) {
  return value === 'admin' ? 'admin' : 'public';
}

function serializeMatchedCustomer(customer: CustomerTitleRow | null) {
  if (!customer?._id || !customer.title) {
    return null;
  }

  const id = String(customer._id);

  return {
    id,
    _id: id,
    title: customer.title,
    categorySlug: customer.categoryId?.slug || '',
    isPublished: customer.isPublished
  };
}

// === 路由处理函数 ===

export async function POST(req: Request) {
  try {
    const ip = getRequestClientIp(req);
    const { success } = rateLimit(ip, 20, 60 * 1000); // 限制每个 IP 每分钟 20 次智能搜索请求

    if (!success) {
      return NextResponse.json({ error: '搜索过于频繁，请稍后再试', matched_case: null }, { status: 429 });
    }

    const body = await readJsonRecord(req);
    const query = typeof body.query === 'string' ? body.query.trim() : '';
    const rawScope = body.scope;
    if (!query) {
      return NextResponse.json({ matched_case: null, matched_customer: null });
    }

    const scope = normalizeScope(rawScope);

    if (scope === 'admin' && !(await requireAdminSession())) {
      return NextResponse.json(
        { error: '请先登录后台', matched_case: null, matched_customer: null },
        { status: 401 }
      );
    }

    // 1. 获取所有现有案例名称并组装 Prompt
    await dbConnect();
    const customersQuery =
      scope === 'admin'
        ? {}
        : { isPublished: true };
    const customers = await Customer.find(customersQuery)
      .select('title categoryId isPublished')
      .populate('categoryId', 'slug')
      .lean<CustomerTitleRow[]>();
    const caseList = customers
      .map((customer) => customer.title?.trim())
      .filter((title): title is string => Boolean(title));

    // 为了方便调试，可以在开发环境下打印一下获取到的案例数量
    if (process.env.NODE_ENV === 'development') {
      console.log(`Smart Search is using ${caseList.length} cases for AI matching.`);
    }

    const systemPrompt = buildSystemPrompt(caseList);

    // 2. 调用 AI 接口
    const aiData = await fetchAIMatch(query, systemPrompt);
    const content = aiData.choices?.[0]?.message?.content || '{}';

    // 3. 解析结果并返回
    const result = parseAIResponse(content);
    const matchedCase = typeof result.matched_case === 'string'
      ? result.matched_case.trim()
      : null;
    const matchedCustomer = matchedCase
      ? customers.find((customer) => customer.title?.trim() === matchedCase) || null
      : null;

    return NextResponse.json({
      matched_case: matchedCase,
      matched_customer: serializeMatchedCustomer(matchedCustomer)
    });

  } catch (error) {
    console.error('Smart Search Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', matched_case: null, matched_customer: null },
      { status: 500 }
    );
  }
}
