'use client';

import type { ReactNode } from 'react';
import { WarningCircle, Warning, Info } from '@phosphor-icons/react';

export type ConfirmModalTone = 'default' | 'primary' | 'warning' | 'danger';

export interface ConfirmModalAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: ReactNode;
  description: ReactNode;
  onClose: () => void;
  icon?: ReactNode;
  tone?: ConfirmModalTone;
  actions: ConfirmModalAction[];
}

function getActionClassName(variant: ConfirmModalAction['variant']) {
  const base =
    'h-11 px-6 text-[15px] font-medium rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]';

  if (variant === 'primary') {
    return `${base} text-white bg-blue-600 hover:bg-blue-700 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(37,99,235,0.18)]`;
  }

  if (variant === 'danger') {
    return `${base} text-white bg-red-600 hover:bg-red-700 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(220,38,38,0.18)]`;
  }

  return `${base} text-zinc-700 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700`;
}

function getToneIconStyles(tone: ConfirmModalTone) {
  if (tone === 'danger') {
    return {
      bg: 'bg-red-50 dark:bg-red-950/50',
      text: 'text-red-600 dark:text-red-400',
      ring: 'ring-1 ring-red-100 dark:ring-red-900/40',
    };
  }
  if (tone === 'warning') {
    return {
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      text: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-1 ring-amber-100 dark:ring-amber-900/40',
    };
  }
  if (tone === 'primary') {
    return {
      bg: 'bg-blue-50 dark:bg-blue-950/50',
      text: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-1 ring-blue-100 dark:ring-blue-900/40',
    };
  }
  return {
    bg: 'bg-zinc-100 dark:bg-zinc-800',
    text: 'text-zinc-500 dark:text-zinc-400',
    ring: 'ring-1 ring-zinc-200 dark:ring-zinc-700/50',
  };
}

function getToneIcon(tone: ConfirmModalTone) {
  if (tone === 'danger') {
    return <WarningCircle size={28} weight="fill" />;
  }
  if (tone === 'warning') {
    return <Warning size={28} weight="fill" />;
  }
  return <Info size={28} weight="fill" />;
}

export default function ConfirmModal({
  isOpen,
  title,
  subtitle,
  description,
  onClose,
  icon,
  tone = 'default',
  actions,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const iconStyles = getToneIconStyles(tone);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.94) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes overlay-enter {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
        style={{ animation: 'overlay-enter 0.12s ease-out' }}
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="relative bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md overflow-hidden
          shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02),0_8px_16px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.06)]
          dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_1px_2px_rgba(0,0,0,0.12),0_8px_16px_rgba(0,0,0,0.14),0_20px_40px_rgba(0,0,0,0.18)]"
        style={{ animation: 'modal-enter 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="px-6 pt-8 pb-6 text-center">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 ${iconStyles.bg} ${iconStyles.text} ${iconStyles.ring} shadow-[0_1px_2px_rgba(0,0,0,0.04)]`}
          >
            {icon || getToneIcon(tone)}
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}

          {/* Description */}
          <div className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {description}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex items-center justify-center gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              disabled={action.disabled}
              className={getActionClassName(action.variant)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
