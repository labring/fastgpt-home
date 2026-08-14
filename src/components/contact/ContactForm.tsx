'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, ChevronDown, LoaderCircle } from 'lucide-react';
import {
  getAttributionPayload,
  getVisitorId,
  reportAnonymousAttribution,
  trackVisit
} from '@/lib/leadAttribution';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import {
  CONTACT_OPTIONS,
  INITIAL_CONTACT_FORM,
  type ContactFormValues,
  getContactCopy,
  getContactOptionLabel
} from '@/components/contact/contactCopy';

type ContactFormProps = {
  locale: string;
  variant?: 'modal' | 'page';
  onDone?: () => void;
};

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL?.trim().replace(/\/$/, '') || '';

function FieldLabel({
  children,
  required,
  requiredText,
  optionalText
}: {
  children: string;
  required?: boolean;
  requiredText: string;
  optionalText: string;
}) {
  return (
    <span className="mb-2 flex items-center gap-1 text-[13px] font-medium leading-5 text-[#1d2939]">
      {required && (
        <span className="text-[15px] font-semibold leading-4 text-[#e5484d]" aria-hidden="true">
          *
        </span>
      )}
      {children}
      {!required && (
        <span aria-hidden="true" className="text-[11px] font-normal text-[#98a2b3]">
          {optionalText}
        </span>
      )}
      <span className="sr-only">{required ? requiredText : optionalText}</span>
    </span>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  placeholder,
  copy,
  required,
  fullWidth,
  onChange
}: {
  label: string;
  name: keyof ContactFormValues;
  value: string;
  options: readonly string[];
  placeholder: string;
  copy: ReturnType<typeof getContactCopy>;
  required?: boolean;
  fullWidth?: boolean;
  onChange: (name: keyof ContactFormValues, value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(options.findIndex((option) => option === value) + 1, 0);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuOptions = [
    { value: '', label: placeholder },
    ...options.map((option) => ({ value: option, label: getContactOptionLabel(copy, option) }))
  ];

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const selectOption = (nextValue: string) => {
    onChange(name, nextValue);
    closeMenu(true);
  };

  const moveActiveOption = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + menuOptions.length) % menuOptions.length);
  };

  return (
    <div
      className={'block min-w-0 ' + (fullWidth ? 'sm:col-span-2' : '')}
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <label htmlFor={name + '-button'} className="block">
        <FieldLabel required={required} requiredText={copy.required} optionalText={copy.optional}>
          {label}
        </FieldLabel>
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          required={required}
          onChange={(event) => onChange(name, event.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {getContactOptionLabel(copy, option)}
            </option>
          ))}
        </select>
        <button
          ref={buttonRef}
          id={name + '-button'}
          type="button"
          aria-label={label}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={name + '-options'}
          onClick={() => {
            setActiveIndex(selectedIndex);
            setOpen((current) => !current);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setActiveIndex(selectedIndex);
              setOpen(true);
            }
            if (event.key === 'Escape' && open) closeMenu(true);
          }}
          className={
            'flex h-11 w-full items-center justify-between gap-3 rounded-md border bg-white px-3 text-left text-[14px] outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-[#155eef]/15 ' +
            (open
              ? 'border-[#155eef] ring-2 ring-[#155eef]/15'
              : 'border-[#d0d5dd] hover:border-[#98a2b3]')
          }
        >
          <span className={'truncate ' + (value ? 'text-[#101828]' : 'text-[#98a2b3]')}>
            {value ? getContactOptionLabel(copy, value) : placeholder}
          </span>
          <ChevronDown
            aria-hidden
            size={16}
            strokeWidth={1.8}
            className={
              'shrink-0 text-[#667085] transition-transform duration-200 ' +
              (open ? 'rotate-180' : '')
            }
          />
        </button>

        {open && (
          <div
            id={name + '-options'}
            role="listbox"
            aria-label={label}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-lg border border-[#e4e7ec] bg-white p-1 shadow-[0_12px_28px_rgba(16,24,40,0.12)] ring-1 ring-black/[0.03]"
          >
            {menuOptions.map((option, index) => {
              const selected = value === option.value;
              const isPlaceholder = option.value === '';
              return (
                <button
                  key={option.value || 'placeholder'}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectOption(option.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      moveActiveOption(1);
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault();
                      moveActiveOption(-1);
                    } else if (event.key === 'Home') {
                      event.preventDefault();
                      setActiveIndex(0);
                    } else if (event.key === 'End') {
                      event.preventDefault();
                      setActiveIndex(menuOptions.length - 1);
                    } else if (event.key === 'Escape') {
                      event.preventDefault();
                      closeMenu(true);
                    }
                  }}
                  className={
                    'flex min-h-10 w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef]/25 ' +
                    (selected
                      ? 'bg-[#eef4ff] text-[#155eef]'
                      : 'text-[#344054] hover:bg-[#f9fafb] hover:text-[#101828]')
                  }
                >
                  <span className="flex size-4 shrink-0 items-center justify-center">
                    {selected && !isPlaceholder && (
                      <Check size={15} strokeWidth={2.2} aria-hidden />
                    )}
                  </span>
                  <span className={isPlaceholder ? 'text-[#98a2b3]' : ''}>{option.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactForm({ locale, variant = 'page', onDone }: ContactFormProps) {
  const copy = getContactCopy(locale);
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactFormValues>(INITIAL_CONTACT_FORM);
  const [visitorId, setVisitorId] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    queueMicrotask(() => {
      setVisitorId(getVisitorId());
    });
  }, []);

  const updateValue = (name: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  };

  const reset = () => {
    setValues(INITIAL_CONTACT_FORM);
    setError('');
    setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!CRM_API_URL) {
      setError(copy.configErrorBody);
      return;
    }
    const currentVisitorId = visitorId || getVisitorId();
    if (!currentVisitorId) {
      setError(copy.visitorError);
      return;
    }
    if (!values.usedOpenSource) {
      setError(copy.requiredError);
      return;
    }
    if (!values.consultationTopic || !values.projectStage) {
      setError(copy.requiredError);
      return;
    }

    const phoneDigits = values.phone.replace(/\D/g, '');
    if (phoneDigits.length < 6 || phoneDigits.length > 20) {
      setError(copy.phoneError);
      return;
    }
    if (!formRef.current?.reportValidity()) return;

    setStatus('submitting');
    try {
      trackVisit();
      // Attribution is best-effort telemetry and must not block the contact
      // form when its tracking endpoint is unavailable.
      void reportAnonymousAttribution();
      const attribution = getAttributionPayload();
      const response = await fetchWithTimeout(`${CRM_API_URL}/contacts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          position: values.position.trim(),
          used_open_source: values.usedOpenSource,
          consultation_topic: values.consultationTopic,
          project_stage: values.projectStage,
          budget: values.budget || null,
          notes: values.notes.trim() || null,
          locale,
          ...attribution,
          visitor_id: currentVisitorId
        })
      });

      if (!response.ok) {
        let detail = '';
        try {
          const data = (await response.json()) as { detail?: unknown; message?: unknown };
          detail =
            (typeof data.detail === 'string' && data.detail) ||
            (typeof data.message === 'string' && data.message) ||
            '';
        } catch {
          // Fall back to a localized message when the CRM does not return JSON.
        }
        throw new Error(
          response.status === 429 ? copy.rateLimitError : detail || copy.genericError
        );
      }

      setStatus('success');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : copy.genericError);
      setStatus('idle');
    }
  };

  if (!CRM_API_URL) {
    return (
      <div
        role="alert"
        data-crm-config-error
        className="flex min-h-[280px] flex-col items-start justify-center border-y border-[#fee4e2] bg-[#fffafa] px-5 py-10 sm:px-8"
      >
        <span className="mb-5 inline-flex size-10 items-center justify-center rounded-md border border-[#fecdca] bg-white text-[#d92d20]">
          <AlertTriangle size={20} aria-hidden />
        </span>
        <h2 className="m-0 text-[20px] font-semibold leading-7 text-[#101828]">
          {copy.configErrorTitle}
        </h2>
        <p className="mt-2 max-w-[520px] text-[14px] leading-6 text-[#667085]">
          {copy.configErrorBody}
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex min-h-[380px] flex-col items-center justify-center px-5 py-12 text-center sm:px-8"
      >
        <span className="mb-5 inline-flex size-12 items-center justify-center rounded-md bg-[#ecfdf3] text-[#079455]">
          <CheckCircle2 size={26} strokeWidth={1.8} aria-hidden />
        </span>
        <h2 className="m-0 text-[22px] font-semibold leading-8 text-[#101828]">
          {copy.successTitle}
        </h2>
        <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-[#667085]">
          {copy.successBody}
        </p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="h-10 rounded-md border border-[#d0d5dd] bg-white px-4 text-[13px] font-medium text-[#344054] transition-colors hover:bg-[#f9fafb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef]"
          >
            {copy.submitAnother}
          </button>
          {onDone && (
            <button
              type="button"
              onClick={onDone}
              className="h-10 rounded-md bg-[#155eef] px-5 text-[13px] font-medium text-white transition-colors hover:bg-[#004eeb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef] focus-visible:ring-offset-2"
            >
              {copy.closeAfterSuccess}
            </button>
          )}
        </div>
      </div>
    );
  }

  const textInputClass =
    'h-11 w-full rounded-md border border-[#d0d5dd] bg-white px-3 text-[14px] text-[#101828] outline-none placeholder:text-[#98a2b3] transition-colors focus:border-[#155eef] focus:ring-2 focus:ring-[#155eef]/15';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8">
      <input type="hidden" name="visitor_id" value={visitorId} />
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {(['name', 'phone', 'company', 'position'] as const).map((name) => (
          <label key={name} className="block min-w-0">
            <FieldLabel required requiredText={copy.required} optionalText={copy.optional}>
              {copy.fields[name]}
            </FieldLabel>
            <input
              name={name}
              type={name === 'phone' ? 'tel' : 'text'}
              inputMode={name === 'phone' ? 'tel' : undefined}
              autoComplete={
                name === 'name'
                  ? 'name'
                  : name === 'phone'
                  ? 'tel'
                  : name === 'company'
                  ? 'organization'
                  : 'organization-title'
              }
              value={values[name]}
              required
              maxLength={
                name === 'phone' ? 30 : name === 'company' ? 200 : name === 'position' ? 100 : 120
              }
              onChange={(event) => updateValue(name, event.target.value)}
              placeholder={copy.placeholders[name]}
              className={textInputClass}
            />
          </label>
        ))}

        <SelectField
          label={copy.fields.consultationTopic}
          name="consultationTopic"
          value={values.consultationTopic}
          options={CONTACT_OPTIONS.consultationTopic}
          placeholder={copy.selectPlaceholder}
          copy={copy}
          required
          onChange={updateValue}
        />
        <fieldset className="min-w-0">
          <legend>
            <FieldLabel required requiredText={copy.required} optionalText={copy.optional}>
              {copy.fields.usedOpenSource}
            </FieldLabel>
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CONTACT_OPTIONS.usedOpenSource.map((option) => {
              const selected = values.usedOpenSource === option;
              return (
                <label
                  key={option}
                  className={`flex h-11 cursor-pointer items-center justify-start gap-2 rounded-md border px-3 text-[14px] font-medium transition-colors focus-within:ring-2 focus-within:ring-[#155eef]/20 focus-within:ring-offset-1 ${
                    selected
                      ? 'border-[#155eef] bg-[#eef4ff] text-[#155eef]'
                      : 'border-[#d0d5dd] bg-white text-[#344054] hover:border-[#98a2b3] hover:bg-[#f9fafb]'
                  }`}
                >
                  <input
                    type="radio"
                    name="used_open_source"
                    value={option}
                    checked={selected}
                    required
                    onChange={() => updateValue('usedOpenSource', option)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                      selected ? 'border-[#155eef]' : 'border-[#98a2b3]'
                    }`}
                  >
                    {selected && <span className="size-2 rounded-full bg-[#155eef]" />}
                  </span>
                  {getContactOptionLabel(copy, option)}
                </label>
              );
            })}
          </div>
        </fieldset>
        <SelectField
          label={copy.fields.projectStage}
          name="projectStage"
          value={values.projectStage}
          options={CONTACT_OPTIONS.projectStage}
          placeholder={copy.selectPlaceholder}
          copy={copy}
          required
          onChange={updateValue}
        />
        <SelectField
          label={copy.fields.budget}
          name="budget"
          value={values.budget}
          options={CONTACT_OPTIONS.budget}
          placeholder={copy.selectPlaceholder}
          copy={copy}
          onChange={updateValue}
        />
        <label className="block min-w-0 sm:col-span-2">
          <FieldLabel requiredText={copy.required} optionalText={copy.optional}>
            {copy.fields.notes}
          </FieldLabel>
          <textarea
            name="notes"
            value={values.notes}
            maxLength={1000}
            rows={variant === 'modal' ? 3 : 4}
            onChange={(event) => updateValue('notes', event.target.value)}
            placeholder={copy.placeholders.notes}
            className="w-full resize-y rounded-md border border-[#d0d5dd] bg-white px-3 py-2.5 text-[14px] leading-6 text-[#101828] outline-none placeholder:text-[#98a2b3] transition-colors focus:border-[#155eef] focus:ring-2 focus:ring-[#155eef]/15"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#155eef] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#004eeb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#84adff]"
      >
        {status === 'submitting' && <LoaderCircle className="animate-spin" size={17} aria-hidden />}
        {status === 'submitting' ? copy.submitting : copy.submit}
      </button>

      {error && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 rounded-md border border-[#fecdca] bg-[#fffbfa] px-3 py-2.5 text-[13px] leading-5 text-[#b42318]"
        >
          <AlertTriangle className="mt-0.5 shrink-0" size={15} aria-hidden />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
