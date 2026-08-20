import { describe, expect, it } from 'vitest';
import { renderMathFormula } from './math';

describe('markdown math helpers', () => {
  it('renders valid inline formulas with KaTeX output', async () => {
    expect(await renderMathFormula('x^2', false)).toContain('katex');
  });

  it('falls back to non-throwing output for malformed formulas', async () => {
    await expect(renderMathFormula('\\bad{', true)).resolves.not.toThrow();
  });
});
