import type { LocaleCode } from '@/lib/locales';

export type ContactFormValues = {
  name: string;
  phone: string;
  company: string;
  position: string;
  usedOpenSource: string;
  consultationTopic: string;
  projectStage: string;
  budget: string;
  notes: string;
};

export const INITIAL_CONTACT_FORM: ContactFormValues = {
  name: '',
  phone: '',
  company: '',
  position: '',
  usedOpenSource: '',
  consultationTopic: '',
  projectStage: '',
  budget: '',
  notes: ''
};

export const CONTACT_OPTIONS = {
  usedOpenSource: ['是', '否'],
  consultationTopic: ['私有化部署', 'SaaS 版', '渠道合作', '其他'],
  projectStage: ['调研阶段/竞品对比', '立项阶段/测试使用', '采购阶段/最终决策'],
  budget: ['0-3 万元', '3-10 万元', '10-30 万元', '30-100 万元', '100 万元以上']
} as const;

type ContactCopy = {
  title: string;
  subtitle: string;
  eyebrow: string;
  close: string;
  back: string;
  required: string;
  optional: string;
  fields: Record<keyof ContactFormValues, string>;
  placeholders: Partial<Record<keyof ContactFormValues, string>>;
  selectPlaceholder: string;
  options: Record<string, string>;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  closeAfterSuccess: string;
  returnHome: string;
  submitAnother: string;
  configErrorTitle: string;
  configErrorBody: string;
  visitorError: string;
  genericError: string;
  rateLimitError: string;
  phoneError: string;
  requiredError: string;
};

const zh: ContactCopy = {
  title: 'FastGPT 商务咨询',
  subtitle: '请留下项目情况和联系方式，FastGPT 商务团队会尽快与您联系。',
  eyebrow: '企业服务',
  close: '关闭',
  back: '返回',
  required: '必填',
  optional: '选填',
  fields: {
    name: '姓名',
    phone: '联系方式',
    company: '公司名称',
    position: '职位',
    usedOpenSource: '是否使用过开源版',
    consultationTopic: '想咨询的内容',
    projectStage: '项目进度',
    budget: '项目预算',
    notes: '补充说明'
  },
  placeholders: {
    name: '请输入姓名',
    phone: '请输入手机号或邮箱',
    company: '请输入公司名称',
    position: '请输入职位',
    notes: '可补充使用场景、部署规模或其他需求'
  },
  selectPlaceholder: '请选择',
  options: {},
  submit: '提交咨询',
  submitting: '正在提交',
  successTitle: '咨询已提交',
  successBody: '我们已收到您的信息，商务团队会尽快与您联系。',
  closeAfterSuccess: '完成',
  returnHome: '返回首页',
  submitAnother: '再提交一份',
  configErrorTitle: '商务咨询暂不可用',
  configErrorBody: 'CRM 服务尚未配置，请联系网站管理员。',
  visitorError: '无法获取 CRM 访客标识，请允许浏览器使用本地存储后重试。',
  genericError: '提交失败，请稍后重试。',
  rateLimitError: '提交过于频繁，请稍后再试。',
  phoneError: '请输入有效的手机号或邮箱。',
  requiredError: '请完整填写必填项。'
};

const en: ContactCopy = {
  title: 'Contact FastGPT Sales',
  subtitle: 'Tell us about your project and our sales team will get back to you shortly.',
  eyebrow: 'Enterprise services',
  close: 'Close',
  back: 'Back',
  required: 'Required',
  optional: 'Optional',
  fields: {
    name: 'Name',
    phone: 'Contact information',
    company: 'Company',
    position: 'Job title',
    usedOpenSource: 'Have you used the open-source edition?',
    consultationTopic: 'What would you like to discuss?',
    projectStage: 'Project stage',
    budget: 'Project budget',
    notes: 'Additional details'
  },
  placeholders: {
    name: 'Your name',
    phone: 'Your phone number or email',
    company: 'Company name',
    position: 'Your role',
    notes: 'Use case, deployment scale, or other requirements'
  },
  selectPlaceholder: 'Select an option',
  options: {
    是: 'Yes',
    否: 'No',
    私有化部署: 'Private deployment',
    'SaaS 版': 'SaaS edition',
    渠道合作: 'Channel partnership',
    其他: 'Other',
    '调研阶段/竞品对比': 'Researching / comparing products',
    '立项阶段/测试使用': 'Planning / testing',
    '采购阶段/最终决策': 'Procurement / final decision',
    '0-3 万元': 'CNY 0-30,000',
    '3-10 万元': 'CNY 30,000-100,000',
    '10-30 万元': 'CNY 100,000-300,000',
    '30-100 万元': 'CNY 300,000-1,000,000',
    '100 万元以上': 'Above CNY 1,000,000'
  },
  submit: 'Send inquiry',
  submitting: 'Sending',
  successTitle: 'Inquiry sent',
  successBody: 'We have received your information. Our sales team will contact you shortly.',
  closeAfterSuccess: 'Done',
  returnHome: 'Back home',
  submitAnother: 'Send another inquiry',
  configErrorTitle: 'Sales inquiries are unavailable',
  configErrorBody:
    'The CRM service has not been configured. Please contact the site administrator.',
  visitorError:
    'We could not create your CRM visitor ID. Allow local browser storage and try again.',
  genericError: 'Your inquiry could not be sent. Please try again later.',
  rateLimitError: 'Too many submissions. Please try again later.',
  phoneError: 'Enter a valid phone number or email.',
  requiredError: 'Complete all required fields.'
};

const zhHant: ContactCopy = {
  ...zh,
  title: 'FastGPT 商務諮詢',
  subtitle: '請留下專案情況和聯絡方式，FastGPT 商務團隊會盡快與您聯絡。',
  eyebrow: '企業服務',
  close: '關閉',
  back: '返回',
  required: '必填',
  optional: '選填',
  fields: {
    name: '姓名',
    phone: '聯絡方式',
    company: '公司名稱',
    position: '職位',
    usedOpenSource: '是否使用過開源版',
    consultationTopic: '想諮詢的內容',
    projectStage: '專案進度',
    budget: '專案預算',
    notes: '補充說明'
  },
  placeholders: {
    name: '請輸入姓名',
    phone: '請輸入手機號碼或電子郵件',
    company: '請輸入公司名稱',
    position: '請輸入職位',
    notes: '可補充使用情境、部署規模或其他需求'
  },
  selectPlaceholder: '請選擇',
  options: {
    是: '是',
    否: '否',
    私有化部署: '私有化部署',
    'SaaS 版': 'SaaS 版',
    渠道合作: '通路合作',
    其他: '其他',
    '调研阶段/竞品对比': '調研階段／競品比較',
    '立项阶段/测试使用': '立項階段／測試使用',
    '采购阶段/最终决策': '採購階段／最終決策',
    '0-3 万元': '人民幣 0–3 萬元',
    '3-10 万元': '人民幣 3–10 萬元',
    '10-30 万元': '人民幣 10–30 萬元',
    '30-100 万元': '人民幣 30–100 萬元',
    '100 万元以上': '人民幣 100 萬元以上'
  },
  submit: '提交諮詢',
  submitting: '正在提交',
  successTitle: '諮詢已提交',
  successBody: '我們已收到您的資訊，商務團隊會盡快與您聯絡。',
  closeAfterSuccess: '完成',
  returnHome: '返回首頁',
  submitAnother: '再提交一份',
  configErrorTitle: '商務諮詢暫不可用',
  configErrorBody: 'CRM 服務尚未配置，請聯絡網站管理員。',
  visitorError: '無法取得 CRM 訪客識別碼，請允許瀏覽器使用本機儲存後重試。',
  genericError: '提交失敗，請稍後重試。',
  rateLimitError: '提交過於頻繁，請稍後再試。',
  phoneError: '請輸入有效的手機號碼或電子郵件。',
  requiredError: '請完整填寫必填項目。'
};

const contactCopy: Partial<Record<LocaleCode, ContactCopy>> = {
  zh,
  'zh-hant': zhHant,
  en
};

export function getContactCopy(locale: string): ContactCopy {
  return contactCopy[locale as LocaleCode] || en;
}

export function getContactOptionLabel(copy: ContactCopy, value: string): string {
  return copy.options[value] || value;
}

export type ContactExperienceCopy = {
  nav: {
    home: string;
    sales: string;
  };
  hero: {
    title: string;
    body: string;
    primaryAction: string;
    secondaryAction: string;
  };
  services: {
    title: string;
    body: string;
    items: Array<{ key: string; title: string; body: string }>;
  };
  cases: {
    title: string;
    body: string;
    previous: string;
    next: string;
    items: Array<{
      key: string;
      title: string;
      metrics: Array<{ value: string; label: string }>;
    }>;
  };
  customers: {
    title: string;
    body: string;
  };
  action: {
    title: string;
    body: string;
    form: string;
    email: string;
  };
  footer: {
    home: string;
    docs: string;
    github: string;
    copyright: string;
  };
};

const zhExperience: ContactExperienceCopy = {
  nav: { home: '返回首页', sales: '商务咨询' },
  hero: {
    title: '把复杂的 AI 落地，交给真正懂业务的团队',
    body: '从需求诊断、架构设计到 POC 验证与生产交付，让每一步都围绕真实业务价值推进。',
    primaryAction: '开始咨询',
    secondaryAction: '了解 FastGPT'
  },
  services: {
    title: '从咨询到交付，全程有人负责',
    body: '成熟的方法、可验证的路径，以及陪伴项目走进生产环境的专业团队。',
    items: [
      { key: 'community', title: '开源生态支持', body: '社区模板文档齐备，助力团队快速上手。' },
      { key: 'consult', title: '专家咨询支持', body: '1v1 诊断痛点，完成架构咨询与 POC 验证。' },
      { key: 'deploy', title: '搭建落地辅助', body: '成熟方案全程陪跑，配套系统培训与交付支持。' },
      { key: 'custom', title: '企业定制开发', body: '深度集成业务系统，提供长期运维保障。' }
    ]
  },
  cases: {
    title: '真实业务，真实结果',
    body: 'FastGPT 已在知识管理、投研生产与费用审核等关键流程中持续创造价值。',
    previous: '上一个案例',
    next: '下一个案例',
    items: [
      {
        key: 'cetc',
        title: '缩短新员工适应期，构建研发知识助手',
        metrics: [
          { value: '1 周+', label: '培训周期缩短' },
          { value: '10%', label: '重复咨询降低' },
          { value: '30s', label: '检索耗时' }
        ]
      },
      {
        key: 'cms',
        title: '重塑投研生产力，基金研报自动化生成',
        metrics: [
          { value: '90%+', label: '自动化率超过' },
          { value: '<1%', label: '数据差错' },
          { value: '90%', label: '制作耗时缩短' }
        ]
      },
      {
        key: 'snow',
        title: '深度集成 OA 系统，费用报销智能审核',
        metrics: [
          { value: '50%', label: '审核提效' },
          { value: '70%', label: '异常检出提升' },
          { value: '60%', label: '终审错误降低' }
        ]
      }
    ]
  },
  customers: {
    title: '与 1000+ 企业一起，把 AI 放进真实业务',
    body: '从开源探索到企业级生产，FastGPT 服务持续增长的团队。'
  },
  action: {
    title: '让你的 AI 项目，从一次有效沟通开始',
    body: '留下项目情况，FastGPT 商务团队会尽快与你联系。',
    form: '填写咨询表单',
    email: '发送邮件'
  },
  footer: {
    home: '首页',
    docs: '文档中心',
    github: 'GitHub',
    copyright: '广州环际云计算有限公司 版权所有'
  }
};

const enExperience: ContactExperienceCopy = {
  nav: { home: 'Back home', sales: 'Contact sales' },
  hero: {
    title: 'Turn your AI ambition into a system that works',
    body: 'Move from discovery and architecture to POC validation and production delivery with a team focused on measurable business value.',
    primaryAction: 'Start a conversation',
    secondaryAction: 'Explore FastGPT'
  },
  services: {
    title: 'One accountable team, from consulting to delivery',
    body: 'A proven method, a testable path, and practical support all the way into production.',
    items: [
      {
        key: 'community',
        title: 'Open-source ecosystem',
        body: 'Community templates and documentation help teams move quickly.'
      },
      {
        key: 'consult',
        title: 'Expert consulting',
        body: 'One-to-one discovery, architecture guidance, and POC validation.'
      },
      {
        key: 'deploy',
        title: 'Implementation support',
        body: 'End-to-end rollout guidance with training and delivery support.'
      },
      {
        key: 'custom',
        title: 'Enterprise customization',
        body: 'Deep integration with business systems and long-term support.'
      }
    ]
  },
  cases: {
    title: 'Real workflows. Measurable outcomes.',
    body: 'FastGPT creates durable value across knowledge management, investment research, and expense review.',
    previous: 'Previous case',
    next: 'Next case',
    items: [
      {
        key: 'cetc',
        title: 'Shorter new-hire ramp with an R&D knowledge assistant',
        metrics: [
          { value: '1 week+', label: 'Training cycle shortened' },
          { value: '10%', label: 'Repeat inquiries reduced' },
          { value: '30s', label: 'Retrieval time' }
        ]
      },
      {
        key: 'cms',
        title: 'Investment research reinvented with automated fund reports',
        metrics: [
          { value: '90%+', label: 'Automation rate' },
          { value: '<1%', label: 'Data error rate' },
          { value: '90%', label: 'Production time saved' }
        ]
      },
      {
        key: 'snow',
        title: 'Intelligent expense review through deep OA integration',
        metrics: [
          { value: '50%', label: 'Review efficiency' },
          { value: '70%', label: 'Anomaly detection lift' },
          { value: '60%', label: 'Final-review error drop' }
        ]
      }
    ]
  },
  customers: {
    title: 'Helping 1,000+ enterprises put AI into real workflows',
    body: 'FastGPT supports growing teams from open-source exploration to enterprise production.'
  },
  action: {
    title: 'Start your AI project with a useful conversation',
    body: 'Share your project context and the FastGPT sales team will get back to you shortly.',
    form: 'Complete the form',
    email: 'Send an email'
  },
  footer: {
    home: 'Home',
    docs: 'Documentation',
    github: 'GitHub',
    copyright: 'labring. All rights reserved.'
  }
};

const zhHantExperience: ContactExperienceCopy = {
  ...zhExperience,
  nav: { home: '返回首頁', sales: '商務諮詢' },
  hero: {
    title: '把複雜的 AI 落地，交給真正懂業務的團隊',
    body: '從需求診斷、架構設計到 POC 驗證與生產交付，讓每一步都圍繞真實業務價值推進。',
    primaryAction: '開始諮詢',
    secondaryAction: '了解 FastGPT'
  },
  services: {
    title: '從諮詢到交付，全程有人負責',
    body: '成熟的方法、可驗證的路徑，以及陪伴專案走進生產環境的專業團隊。',
    items: [
      { key: 'community', title: '開源生態支持', body: '社區模板文檔齊備，協助團隊快速上手。' },
      { key: 'consult', title: '專家諮詢支持', body: '1v1 診斷痛點，完成架構諮詢與 POC 驗證。' },
      { key: 'deploy', title: '搭建落地輔助', body: '成熟方案全程陪跑，配套系統培訓與交付支持。' },
      { key: 'custom', title: '企業定製開發', body: '深度整合業務系統，提供長期運維保障。' }
    ]
  },
  cases: {
    title: '真實業務，真實結果',
    body: 'FastGPT 已在知識管理、投研生產與費用審核等關鍵流程中持續創造價值。',
    previous: '上一個案例',
    next: '下一個案例',
    items: [
      {
        key: 'cetc',
        title: '縮短新員工適應期，構建研發知識助手',
        metrics: [
          { value: '1 週+', label: '培訓週期縮短' },
          { value: '10%', label: '重複諮詢降低' },
          { value: '30s', label: '檢索耗時' }
        ]
      },
      {
        key: 'cms',
        title: '重塑投研生產力，基金研報自動化生成',
        metrics: [
          { value: '90%+', label: '自動化率超過' },
          { value: '<1%', label: '數據差錯' },
          { value: '90%', label: '製作耗時縮短' }
        ]
      },
      {
        key: 'snow',
        title: '深度整合 OA 系統，費用報銷智能審核',
        metrics: [
          { value: '50%', label: '審核提效' },
          { value: '70%', label: '異常檢出提升' },
          { value: '60%', label: '終審錯誤降低' }
        ]
      }
    ]
  },
  customers: {
    title: '與 1000+ 企業一起，把 AI 放進真實業務',
    body: '從開源探索到企業級生產，FastGPT 服務持續成長的團隊。'
  },
  action: {
    title: '讓你的 AI 專案，從一次有效溝通開始',
    body: '留下專案情況，FastGPT 商務團隊會盡快與你聯絡。',
    form: '填寫諮詢表單',
    email: '發送郵件'
  },
  footer: {
    home: '首頁',
    docs: '文檔中心',
    github: 'GitHub',
    copyright: '廣州環際雲計算有限公司 版權所有'
  }
};

export function getContactExperienceCopy(locale: string): ContactExperienceCopy {
  if (locale === 'zh') return zhExperience;
  if (locale === 'zh-hant') return zhHantExperience;
  return enExperience;
}
