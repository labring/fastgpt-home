import {
  getContactPublishedLocale,
  type ContactPublishedLocale
} from '@/lib/publishedLocales';

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
  submitAnother: '再提交一份',
  configErrorTitle: '商务咨询暂不可用',
  configErrorBody: 'CRM 服务尚未配置，请联系网站管理员。',
  visitorError: '无法获取 CRM 访客标识，请允许浏览器使用本地存储后重试。',
  genericError: '提交失败，请稍后重试。',
  rateLimitError: '提交过于频繁，请稍后再试。',
  phoneError: '请输入有效的手机号或邮箱。',
  requiredError: '请完整填写所有必填项。'
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
  submitAnother: '再提交一份',
  configErrorTitle: '商務諮詢暫不可用',
  configErrorBody: 'CRM 服務尚未配置，請聯絡網站管理員。',
  visitorError: '無法取得 CRM 訪客識別碼，請允許瀏覽器使用本機儲存後重試。',
  genericError: '提交失敗，請稍後重試。',
  rateLimitError: '提交過於頻繁，請稍後再試。',
  phoneError: '請輸入有效的手機號碼或電子郵件。',
  requiredError: '請完整填寫所有必填項。'
};

const contactCopy: Record<ContactPublishedLocale, ContactCopy> = {
  zh,
  'zh-hant': zhHant,
  en
};

export function getContactCopy(locale: string): ContactCopy {
  return contactCopy[getContactPublishedLocale(locale)];
}

export function getContactOptionLabel(copy: ContactCopy, value: string): string {
  return copy.options[value] || value;
}
