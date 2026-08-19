import fs from 'node:fs';
import postcss from 'postcss';

const filePath = new URL('../src/customers/styles.css', import.meta.url);
const source = fs.readFileSync(filePath, 'utf8');
const root = postcss.parse(source);

function isKeyframes(node) {
  let current = node.parent;
  while (current) {
    if (current.type === 'atrule' && /keyframes$/i.test(current.name)) return true;
    current = current.parent;
  }
  return false;
}

function scopeSelector(selector) {
  const trimmed = selector.trim();
  if (trimmed.includes('.customers-scope')) return trimmed;
  if (trimmed.startsWith(':root')) return `.customers-scope${trimmed.slice(':root'.length)}`;
  if (trimmed.startsWith('html:not(.dark)')) {
    return `.customers-scope:not(.dark)${trimmed.slice('html:not(.dark)'.length)}`;
  }
  if (trimmed.startsWith('.dark body')) {
    return `.dark .customers-scope${trimmed.slice('.dark body'.length)}`;
  }
  if (trimmed === 'body') return '.customers-scope';
  if (trimmed.startsWith('body ')) return `.customers-scope${trimmed.slice('body'.length)}`;
  if (trimmed.startsWith('.dark ')) {
    return `.dark .customers-scope${trimmed.slice('.dark'.length)}`;
  }
  return `.customers-scope ${trimmed}`;
}

root.walkRules((rule) => {
  if (!isKeyframes(rule)) {
    rule.selector = rule.selectors.map(scopeSelector).join(',');
  }
});

root.walkAtRules('layer', (atRule) => {
  atRule.replaceWith(...atRule.nodes);
});

fs.writeFileSync(filePath, root.toString());
