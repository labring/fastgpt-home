'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import type { AdsLeadFormCopy } from '@/content/ads/pages';
import {
  ADS_ATTRIBUTION_FIELDS,
  ADS_SUBMISSION_SOURCE,
  buildAdsAttributionFields,
  type AdsAttributionFields
} from '@/lib/adsAttribution';
import { CONTACT_OPTIONS } from '@/components/contact/contactCopy';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import {
  getLastTouchUtmSnapshot,
  getVisitorId,
  reportAnonymousAttribution,
  trackVisit
} from '@/lib/leadAttribution';
import { trackRybbitEvent } from '@/lib/rybbit';
import { RYBBIT_EVENTS } from '@/lib/rybbitEvents';
import { getCurrentCanonicalPageUrl } from '@/lib/rybbitConversion';
import { isPreviewSite } from '@/lib/siteRouting';
import { fireUetConversion } from '@/lib/uet';
import styles from '@/components/ads/ads.module.css';

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL?.trim().replace(/\/$/, '') || '';
const PHONE_PATTERN = /^\+?[1-9]\d{6,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LABELS = {
  name: '姓名',
  phone: '手机或邮箱',
  company: '公司名称',
  consultationTopic: '咨询主题'
} as const;

const PLACEHOLDERS = {
  name: '请输入姓名',
  phone: '请输入手机号或邮箱',
  company: '请输入公司名称',
  consultationTopic: '请选择'
} as const;

const CONSENT_TEXT = '已阅读并同意《隐私政策》，同意 FastGPT 就本次咨询与我联系。';
const PHONE_ERROR = '请输入有效的手机号或邮箱。';
const CONSENT_ERROR = '请先勾选同意隐私政策，再提交咨询。';
const VISITOR_ERROR = '无法获取访客标识，请允许浏览器使用本地存储后重试。';
const SUBMITTING_TEXT = '正在提交…';
const CONFIG_ERROR = '提交通道尚未配置，请联系网站管理员。';
const GENERIC_ERROR = '提交失败，请稍后重试。';
const SUCCESS_TITLE = '咨询已提交';
const SUCCESS_BODY = '解决方案顾问会尽快与你联系，资料将按你留的联系方式发送。';
const SUCCESS_RESET = '再次填写';

function isValidPhoneOrEmail(value: string) {
  const normalizedPhone = value.replace(/[\s\-().]/g, '');
  return PHONE_PATTERN.test(normalizedPhone) || EMAIL_PATTERN.test(value);
}

export default function AdsLeadForm({ copy }: { copy: AdsLeadFormCopy }) {
  const consentRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({ name: '', phone: '', company: '', consultationTopic: '' });
  const [attribution, setAttribution] = useState<AdsAttributionFields>(
    () =>
      ({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
        source_page_path: '',
        visitor_id: '',
        consent_at: '',
        consent_version: ''
      }) as AdsAttributionFields
  );
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');

  // Attribution fields hydrate after mount so the SSR output keeps empty inputs
  // and the browser-only storage/URL lookups never cause a hydration mismatch.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAttribution(
      buildAdsAttributionFields({
        urlUtm: {
          utm_source: params.get('utm_source') ?? undefined,
          utm_medium: params.get('utm_medium') ?? undefined,
          utm_campaign: params.get('utm_campaign') ?? undefined,
          utm_term: params.get('utm_term') ?? undefined,
          utm_content: params.get('utm_content') ?? undefined
        },
        storedUtm: getLastTouchUtmSnapshot(),
        sourcePagePath: window.location.pathname,
        visitorId: getVisitorId(),
        consentAt: ''
      })
    );
  }, []);

  const updateValue = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const handleConsentChange = (checked: boolean) => {
    // consent_at is the tick that accompanies the submission; unchecking clears
    // it and a re-tick refreshes the timestamp.
    setAttribution((current) => ({
      ...current,
      consent_at: checked ? new Date().toISOString() : ''
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!values.phone.trim() || !isValidPhoneOrEmail(values.phone.trim())) {
      setError(PHONE_ERROR);
      return;
    }

    if (!consentRef.current?.checked) {
      setError(CONSENT_ERROR);
      return;
    }
    // Set at tick time by handleConsentChange; a checked box guarantees it.
    const consentAt = attribution.consent_at;

    // Preview builds without a CRM URL walk through a fake submission so the
    // full landing flow stays verifiable pre-launch (same policy as ContactForm).
    if (!CRM_API_URL) {
      if (isPreviewSite) {
        setStatus('success');
        return;
      }
      setError(CONFIG_ERROR);
      return;
    }

    const visitorId = attribution.visitor_id || getVisitorId();
    if (!visitorId) {
      setError(VISITOR_ERROR);
      return;
    }

    setStatus('submitting');
    try {
      trackVisit();
      // Best-effort anonymous attribution must not block the lead submission.
      void reportAnonymousAttribution();
      const response = await fetchWithTimeout(`${CRM_API_URL}/contacts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          consultation_topic: values.consultationTopic,
          position: null,
          used_open_source: null,
          project_stage: null,
          budget: null,
          notes: null,
          source: ADS_SUBMISSION_SOURCE,
          ...attribution,
          visitor_id: visitorId,
          consent_at: consentAt
        })
      });

      if (!response.ok) {
        throw new Error(GENERIC_ERROR);
      }

      setStatus('success');

      const pageUrl = getCurrentCanonicalPageUrl();
      void Promise.resolve()
        .then(() => response.json() as Promise<{ submission_id?: unknown }>)
        .then((result) => {
          if (typeof result.submission_id === 'string') {
            trackRybbitEvent(RYBBIT_EVENTS.businessConsultSubmitSuccess, {
              submission_id: result.submission_id,
              crm_visitor_id: visitorId,
              source: ADS_SUBMISSION_SOURCE,
              page_url: pageUrl,
              entry_page_url: pageUrl
            });
          }
        })
        .catch(() => {
          // Analytics failures must not turn a saved CRM lead into an error.
        });
      fireUetConversion();
    } catch {
      setError(GENERIC_ERROR);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.formSuccess} role="status">
        <h3 className={styles.formSuccessTitle}>{SUCCESS_TITLE}</h3>
        <p className={styles.formSuccessBody}>{SUCCESS_BODY}</p>
        <button
          type="button"
          className={styles.formSuccessReset}
          onClick={() => {
            setValues({ name: '', phone: '', company: '', consultationTopic: '' });
            setStatus('idle');
          }}
        >
          {SUCCESS_RESET}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>{copy.title}</h3>
      <p className={styles.formHint}>{copy.subtitle}</p>

      {(['name', 'phone', 'company'] as const).map((field) => (
        <div className={styles.field} key={field}>
          <label className={styles.label} htmlFor={`ads-${field}`}>
            {FIELD_LABELS[field]}
            <i className={styles.requiredMark}>*</i>
          </label>
          <input
            className={styles.input}
            id={`ads-${field}`}
            name={field}
            type="text"
            required
            maxLength={field === 'phone' ? 254 : 120}
            autoComplete={field === 'name' ? 'name' : field === 'phone' ? 'tel' : 'organization'}
            placeholder={PLACEHOLDERS[field]}
            value={values[field]}
            onChange={(event) => updateValue(field, event.target.value)}
          />
        </div>
      ))}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="ads-consultationTopic">
          {FIELD_LABELS.consultationTopic}
          <i className={styles.requiredMark}>*</i>
        </label>
        <select
          className={styles.input}
          id="ads-consultationTopic"
          name="consultationTopic"
          required
          value={values.consultationTopic}
          onChange={(event) => updateValue('consultationTopic', event.target.value)}
        >
          <option value="">{PLACEHOLDERS.consultationTopic}</option>
          {CONTACT_OPTIONS.consultationTopic.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {ADS_ATTRIBUTION_FIELDS.map((field) => (
        <input key={field} type="hidden" name={field} value={attribution[field]} />
      ))}

      <button
        type="submit"
        className={`${styles.btn} ${styles.solid} ${styles.submit}`}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? SUBMITTING_TEXT : copy.button}
      </button>

      <label className={styles.consent}>
        <input
          ref={consentRef}
          type="checkbox"
          name="consent"
          required
          onChange={(event) => handleConsentChange(event.target.checked)}
        />
        <span>{CONSENT_TEXT}</span>
      </label>

      {error && (
        <div className={styles.formError} role="alert">
          {error}
        </div>
      )}
    </form>
  );
}
