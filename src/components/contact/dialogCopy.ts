import { getContactPublishedLocale, type ContactPublishedLocale } from '@/lib/publishedLocales';

type DialogCopy = {
  title: string;
  subtitle: string;
  eyebrow: string;
  close: string;
  formLoading: string;
};

const dialogCopy: Record<ContactPublishedLocale, readonly [string, string, string, string, string]> = {
  zh: [
    'FastGPT 商务咨询',
    '请留下项目情况和联系方式，FastGPT 商务团队会尽快与您联系。',
    '企业服务',
    '关闭',
    '正在加载咨询表单…'
  ],
  en: [
    'Contact FastGPT Sales',
    'Tell us about your project and our sales team will get back to you shortly.',
    'Enterprise services',
    'Close',
    'Loading inquiry form…'
  ],
  'zh-hant': [
    'FastGPT 商務諮詢',
    '請留下專案情況和聯絡方式，FastGPT 商務團隊會盡快與您聯絡。',
    '企業服務',
    '關閉',
    '正在載入諮詢表單…'
  ]
};

export function getDialogCopy(locale: string): DialogCopy {
  const [title, subtitle, eyebrow, close, formLoading] = dialogCopy[getContactPublishedLocale(locale)];
  return { title, subtitle, eyebrow, close, formLoading };
}
