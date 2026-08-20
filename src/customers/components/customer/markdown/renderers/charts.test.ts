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

  it('rejects executable payloads instead of evaluating them (XSS guard)', () => {
    expect(parseEChartsOptions('(function(){ window.__xss = 1 })()')).toBeNull();
    expect(parseEChartsOptions('{ formatter: (v) => v }')).toBeNull();
    expect(parseEChartsOptions('{ data: [1].map(x => x) }')).toBeNull();
    expect(parseEChartsOptions('{ title: { text: "ok" } }; fetch("/evil")')).toBeNull();
    expect(parseEChartsOptions('{ a: Date.now() }')).toBeNull();
  });

  it('still accepts literal-only options with numbers and escaped strings', () => {
    expect(parseEChartsOptions('{ data: [-1, 0, 1.5], name: "it\'s fine" }')).toMatchObject({
      data: [-1, 0, 1.5],
      name: "it's fine"
    });
  });
});
