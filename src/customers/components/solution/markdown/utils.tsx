import React from 'react';
import type { MarkdownAstNode } from './types';

const MERMAID_SINGLE_LINE_DECLARATIONS = [
  /^(flowchart\s+(?:TB|TD|BT|RL|LR))(?=\S)/,
  /^(graph\s+(?:TB|TD|BT|RL|LR))(?=\S)/,
  /^(sequenceDiagram)(?=\S)/,
  /^(classDiagram(?:-v2)?)(?=\S)/,
  /^(stateDiagram(?:-v2)?)(?=\S)/,
  /^(erDiagram)(?=\S)/,
  /^(journey)(?=\S)/,
  /^(gantt)(?=\S)/,
  /^(mindmap)(?=\S)/,
  /^(timeline)(?=\S)/,
  /^(gitGraph)(?=\S)/,
  /^(quadrantChart)(?=\S)/,
  /^(requirementDiagram)(?=\S)/,
  /^(xychart(?:-beta)?)(?=\S)/,
  /^(block-beta)(?=\S)/,
  /^(packet-beta)(?=\S)/,
  /^(architecture-beta)(?=\S)/,
  /^(sankey-beta)(?=\S)/
];

export function withoutMarkdownInternals(props: object) {
  const domProps: Record<string, unknown> = { ...props };
  delete domProps.node;
  delete domProps.sourcePosition;
  delete domProps.index;
  delete domProps.siblingCount;
  delete domProps.ordered;
  delete domProps.checked;
  delete domProps.action;
  delete domProps.align;
  delete domProps.done;
  delete domProps.emoji;
  delete domProps.type;
  delete domProps['background-color'];
  delete domProps['border-color'];
  delete domProps['expire-time'];
  delete domProps['notify-time'];
  delete domProps['should-notify'];
  delete domProps['text-color'];
  delete domProps['vertical-align'];
  delete domProps['width-ratio'];
  delete domProps.token;
  delete domProps.url;

  return domProps;
}

export function getDomProps<T extends object>(props: object) {
  return withoutMarkdownInternals(props) as T;
}

export function filterWhitespaceChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(
    (child) => typeof child !== 'string' || child.trim() !== ''
  );
}

export function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function getStringProp(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
}

export function getTextAlignClass(value: unknown) {
  switch (getStringProp(value)) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return undefined;
  }
}

export function normalizeMermaidSource(source: string) {
  const normalized = source
    .replace(/\uFEFF/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/\u00A0/g, ' ')
    .trim()
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n');

  if (!normalized || normalized.includes('\n')) {
    return normalized;
  }

  for (const pattern of MERMAID_SINGLE_LINE_DECLARATIONS) {
    if (pattern.test(normalized)) {
      return normalized.replace(pattern, '$1\n');
    }
  }

  return normalized;
}

export function extractTextFromMarkdownAst(node: MarkdownAstNode | undefined): string {
  if (!node) {
    return '';
  }

  const ownValue = typeof node.value === 'string' ? node.value : '';
  const childValue = Array.isArray(node.children)
    ? node.children.map((child) => extractTextFromMarkdownAst(child)).join('')
    : '';

  return `${ownValue}${childValue}`;
}

export function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join('');
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractTextFromReactNode(props.children);
  }
  return '';
}
