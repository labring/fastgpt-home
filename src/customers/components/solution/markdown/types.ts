import type React from 'react';

export type MarkdownAstNode = {
  value?: string;
  children?: MarkdownAstNode[];
  type?: string;
  tagName?: string;
};

export type MarkdownRendererProps = Record<string, unknown> & {
  action?: unknown;
  align?: unknown;
  href?: unknown;
  name?: unknown;
  size?: unknown;
  src?: unknown;
  alt?: unknown;
  title?: unknown;
  className?: string;
  children?: React.ReactNode;
  done?: unknown;
  emoji?: unknown;
  type?: unknown;
  width?: unknown;
  ['data-formula']?: unknown;
  ['data-display']?: unknown;
  ['background-color']?: unknown;
  ['border-color']?: unknown;
  ['expire-time']?: unknown;
  ['notify-time']?: unknown;
  ['should-notify']?: unknown;
  ['text-color']?: unknown;
  ['vertical-align']?: unknown;
  ['width-ratio']?: unknown;
  token?: unknown;
  url?: unknown;
};
