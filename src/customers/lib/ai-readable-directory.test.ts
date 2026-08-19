import { describe, expect, it } from 'vitest';
import {
  buildHomeDirectoryJsonLd,
  formatCaseName,
  isPublicCitedNumbers,
  splitDirectoryEntries,
  toPublicCaseOrg,
  type AiDirectoryEntry
} from './ai-readable-directory';

function makeEntry(overrides: Partial<AiDirectoryEntry> = {}): AiDirectoryEntry {
  return {
    id: 'obj-id-1',
    slug: 'demo-case',
    categorySlug: 'medical-health-wellness',
    categoryName: '医疗/健康/康养',
    title: '示例案例',
    description: '示例描述',
    contentType: 'case',
    ...overrides
  };
}

describe('toPublicCaseOrg', () => {
  it('C 级剔除括号内的内部备注，只保留匿名主体', () => {
    expect(
      toPublicCaseOrg({
        clearanceLevel: 'C',
        caseOrg: '某制药企业（C 级匿名化，真实主体见《案例可公开范围确认清单》第 27 行，不进页面）'
      })
    ).toBe('某制药企业');
  });

  it('A/B 级保留原始客户名（含合法括号）', () => {
    expect(toPublicCaseOrg({ clearanceLevel: 'A', caseOrg: '朝阳永续（Go-Goal 金融终端）' })).toBe(
      '朝阳永续（Go-Goal 金融终端）'
    );
    expect(toPublicCaseOrg({ clearanceLevel: 'B', caseOrg: '招商证券国际（招证·灵瞳）' })).toBe(
      '招商证券国际（招证·灵瞳）'
    );
  });

  it('空客户名返回空串', () => {
    expect(toPublicCaseOrg({ clearanceLevel: 'A', caseOrg: '' })).toBe('');
  });
});

describe('isPublicCitedNumbers', () => {
  it('公开口径的指标可以通过', () => {
    expect(isPublicCitedNumbers('教师批改工作量降低 80%')).toBe(true);
    expect(isPublicCitedNumbers('日均咨询 1W+；人工转接率下降 42%')).toBe(true);
  });

  it('含内部备注的指标被拦截', () => {
    expect(isPublicCitedNumbers('（B 级：效果已改定性表述，原始数字不进页面）')).toBe(false);
    expect(isPublicCitedNumbers('前端业务员秒级输出专业方案（KB 未给量化值）')).toBe(false);
    expect(isPublicCitedNumbers('全域巡检时长从数天缩短至数小时；其余量化值按客户 2026-08-10 脱敏要求改为定性')).toBe(
      false
    );
    expect(isPublicCitedNumbers('KB 未给量化值')).toBe(false);
  });
});

describe('formatCaseName', () => {
  it('A 级拼接标题 + 客户名 + 公开指标', () => {
    expect(
      formatCaseName(
        makeEntry({
          title: 'AI学伴智能批改',
          caseOrg: '四川启鸣达人',
          clearanceLevel: 'A',
          citedNumbers: '教师批改工作量降低 80%'
        })
      )
    ).toBe('AI学伴智能批改（四川启鸣达人）：教师批改工作量降低 80%');
  });

  it('C 级展示匿名客户名，公开口径指标可进入锚文本', () => {
    expect(
      formatCaseName(
        makeEntry({
          title: 'GMP/SOP制度问答智能体',
          caseOrg: '某制药企业（C 级匿名化，真实主体见《案例可公开范围确认清单》第 27 行，不进页面）',
          clearanceLevel: 'C',
          citedNumbers: '制度查询从人工检索十几分钟到秒级响应'
        })
      )
    ).toBe('GMP/SOP制度问答智能体（某制药企业）：制度查询从人工检索十几分钟到秒级响应');
  });

  it('C 级含内部备注的指标不进入锚文本', () => {
    expect(
      formatCaseName(
        makeEntry({
          title: '三套专项智能助手',
          caseOrg: '某政府监管执法单位（C 级匿名化，真实主体见《案例可公开范围确认清单》第 19 行，不进页面）',
          clearanceLevel: 'C',
          citedNumbers: '涉密内容禁止上传，仅作参考（KB 未给量化值）'
        })
      )
    ).toBe('三套专项智能助手（某政府监管执法单位）');
  });
});

describe('splitDirectoryEntries', () => {
  it('案例按 caseNo 升序，方案保持原顺序', () => {
    const entries: AiDirectoryEntry[] = [
      makeEntry({ id: 'a', caseNo: 2, contentType: 'case' }),
      makeEntry({ id: 'b', caseNo: 1, contentType: 'case' }),
      makeEntry({ id: 'c', contentType: 'solution' }),
      makeEntry({ id: 'd', contentType: 'solution' })
    ];
    const { cases, solutions } = splitDirectoryEntries(entries);
    expect(cases.map((entry) => entry.id)).toEqual(['b', 'a']);
    expect(solutions.map((entry) => entry.id)).toEqual(['c', 'd']);
  });
});

describe('buildHomeDirectoryJsonLd', () => {
  it('输出 @graph，包含案例与解决方案两个 ItemList，URL 使用绝对语义地址', () => {
    const cases = [
      makeEntry({
        title: 'OA智能助手',
        caseOrg: '联邦制药',
        clearanceLevel: 'A',
        citedNumbers: '流程发起从 3-5 分钟缩短至 30 秒'
      })
    ];
    const solutions = [makeEntry({ title: '知识库问答', contentType: 'solution' })];
    const jsonLd = buildHomeDirectoryJsonLd({
      cases,
      solutions,
      absoluteUrlOf: (entry) => `https://fastgpt.cn/customers/${entry.categorySlug}/${entry.slug}`
    });

    expect(jsonLd).not.toBeNull();
    expect((jsonLd as { '@graph': unknown[] })['@graph']).toHaveLength(2);
    expect(JSON.stringify(jsonLd)).toContain('OA智能助手（联邦制药）：流程发起从 3-5 分钟缩短至 30 秒');
    expect(JSON.stringify(jsonLd)).toContain(
      'https://fastgpt.cn/customers/medical-health-wellness/demo-case'
    );
  });

  it('无条目时返回 null', () => {
    expect(
      buildHomeDirectoryJsonLd({
        cases: [],
        solutions: [],
        absoluteUrlOf: (entry) => `/customers/${entry.categorySlug}/${entry.slug}`
      })
    ).toBeNull();
  });
});
