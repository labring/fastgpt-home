import { describe, expect, it } from 'vitest';
import { normalizeMermaidSource, parseEChartsOptions } from './charts';

describe('markdown chart helpers', () => {
  it('normalizes one-line mermaid declarations into renderable source', () => {
    expect(normalizeMermaidSource('flowchart TBA-->B')).toBe('flowchart TB\nA-->B');
    expect(normalizeMermaidSource('\uFEFFgraph LRA-->B   ')).toBe('graph LR\nA-->B');
  });

  it('preserves multi-line mermaid content while trimming trailing whitespace', () => {
    expect(normalizeMermaidSource('flowchart TB  \n  A-->B  ')).toBe('flowchart TB\n  A-->B');
  });

  it('parses valid ECharts object strings and rejects invalid input', () => {
    expect(parseEChartsOptions('{ title: { text: "Demo" }, series: [] }')).toMatchObject({
      title: { text: 'Demo' },
      series: []
    });
    expect(parseEChartsOptions('const nope = true')).toBeNull();
  });
});
