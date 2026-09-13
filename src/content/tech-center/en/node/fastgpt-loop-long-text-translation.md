---
title: Handle Long Text Translation with FastGPT Loop Nodes
slug: /en/node/fastgpt-loop-long-text-translation
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop
source_type: Official documentation
---

# Handle Long Text Translation with FastGPT Loop Nodes

Long text translation for AI-powered workflows presents consistent, impactful challenges. Common pain points include exceeding LLM token limits, failing to maintain consistent translation style across content, losing context coherence between segments, and requiring multiple refinement passes to achieve high-quality output.

### Targeted Translation Challenges
The core issues for long-form translation all stem from scaling standard translation workflows beyond LLM context window constraints, without preserving original content structure or contextual continuity.

### Batch Processing Node Solution
FastGPT’s Batch Processing node is purpose-built to address these exact challenges, enabling reliable long-form text translation by splitting content into structured, context-preserving segments before processing.

### Segmentation Implementation & Parameters
To preprocess and segment long text prior to translation, follow this standard workflow:
1. Add a Code Execution node to your FastGPT workflow
2. Paste the following JavaScript code to enforce structured content segmentation:
```javascript
const MAX_HEADING_LENGTH = 7; // Max heading length
const MAX_HEADING_CONTENT_LENGTH = 200; // Max heading content length
const MAX_HEADING_UNDERLINE_LENGTH = 200; // Max heading underline length
const MAX_HTML_HEADING_ATTRIBUTES_LENGTH = 100; // Max HTML heading attributes length
const MAX_LIST_ITEM_LENGTH = 200; // Max list item length
const MAX_NESTED_LIST_ITEMS = 6; // Max nested list items
const MAX_LIST_INDENT_SPACES = 7; // Max list indent spaces
const MAX_BLOCKQUOTE_LINE_LENGTH = 200; // Max blockquote line length
const MAX_BLOCKQUOTE_LINES = 15; // Max blockquote lines
const MAX_CODE_BLOCK_LENGTH = 1500; // Max code block length
const MAX_CODE_LANGUAGE_LENGTH = 20; // Max code language length
const MAX_INDENTED_CODE_LINES = 20; // Max indented code lines
const MAX_TABLE_CELL_LENGTH = 200; // Max table cell length
const MAX_TABLE_ROWS = 20; // Max table rows
const MAX_HTML_TABLE_LENGTH = 2000; // Max HTML table length
const MIN_HORIZONTAL_RULE_LENGTH = 3; // Min horizontal rule length
const MAX_SENTENCE_LENGTH = 400; // Max sentence length
const MAX_QUOTED_TEXT_LENGTH = 300; // Max quoted text length
const MAX_PARENTHETICAL_CONTENT_LENGTH = 200; // Max parenthetical content length
const MAX_NESTED_PARENTHESES = 5; // Max nested parentheses
const MAX_MATH_INLINE_LENGTH = 100; // Max inline math length
const MAX_MATH_BLOCK_LENGTH = 500; // Max math block length
const MAX_PARAGRAPH_LENGTH = 1000; // Max paragraph length
const MAX_STANDALONE_LINE_LENGTH = 800; // Max standalone line length
const MAX_HTML_TAG_ATTRIBUTES_LENGTH = 100; // Max HTML tag attributes length
const MAX_HTML_TAG_CONTENT_LENGTH = 1000; // Max HTML tag content length
const LOOKAHEAD_RANGE = 100; // Lookahead range for sentence boundaries

const AVOID_AT_START = `[\s\]})>,']`; // Characters to avoid at start
const PUNCTUATION = `[.!?…]|\.{3}|[\u2026\u2047-\u2049]|[\p{Emoji_Presentation}\p{Extended_Pictographic}]`; // Punctuation
const QUOTE_END = `(?:'(?=\`)|''(?=\`\`))`; // Quote end
const SENTENCE_END = `(?:${PUNCTUATION}(?<!${AVOID_AT_START}(?=${PUNCTUATION}))|${QUOTE_END})(?=\S|$)`; // Sentence end
const SENTENCE_BOUNDARY = `(?:${SENTENCE_END}|(?=[\r\n]|$))`; // Sentence boundary
const LOOKAHEAD_PATTERN = `(?:(?!${SENTENCE_END}).){1,${LOOKAHEAD_RANGE}}${SENTENCE_END}`; // Lookahead pattern
const NOT_PUNCTUATION_SPACE = `(?!${PUNCTUATION}\s)`; // Non-punctuation space
const SENTENCE_PATTERN = `${NOT_PUNCTUATION_SPACE}(?:[^\r\n]{1,{MAX_LENGTH}}${SENTENCE_BOUNDARY}|[^\r\n]{1,{MAX_LENGTH}}(?=${PUNCTUATION}|${QUOTE_END})(?:${LOOKAHEAD_PATTERN})?)${AVOID_AT_START}*`; // Sentence pattern

const regex = new RegExp(
  '(' +
    // 1. Headings (Setext-style, Markdown, and HTML-style, with length constraints)
    `(?:^(?:[#*=-]{1,${MAX_HEADING_LENGTH}}|\w[^\r\n]{0,${MAX_HEADING_CONTENT_LENGTH}}\r?\n[-=]{2,${MAX_HEADING_UNDERLINE_LENGTH}}|<h[1-6][^>]{0,${MAX_HTML_HEADING_ATTRIBUTES_LENGTH}}>)[^\r\n]{1,${MAX_HEADING_CONTENT_LENGTH}}(?:</h[1-6]>)?(?:\r?\n|$))` +
    '|' +
    // New pattern for citations
    `(?:\[[0-9]+\][^\r\n]{1,${MAX_STANDALONE_LINE_LENGTH}})` +
    '|' +
    // 2. List items (bulleted, numbered, lettered, or task lists, including nested, up to three levels, with length constraints)
    `(?:(?:^|\r?\n)[ \t]{0,3}(?:[-*+•]|\d{1,3}\.\w\.|\[[ xX]\])[ \t]+${SENTENCE_PATTERN.replace(/{MAX_LENGTH}/g, String(MAX_LIST_ITEM_LENGTH))}` +
    `(?:(?:\r?\n[ \t]{2,5}(?:[-*+•]|\d{1,3}\.\w\.|\[[ xX]\])[ \t]+${SENTENCE_PATTERN.replace(/{MAX_LENGTH}/g, String(MAX_LIST_ITEM_LENGTH))}){0,${MAX_NESTED_LIST_ITEMS}}` +
    `(?:\r?\n[ \t]{4,${MAX_LIST_INDENT_SPACES}}(?:[-*+•]|\d{1,3}\.\w\.|\[[ xX]\])[ \t]+${SENTENCE_PATTERN.replace(/{MAX_LENGTH}/g, String(MAX_LIST_ITEM_LENGTH))}){0,${MAX_NESTED_LIST_ITEMS}})?)` +
    '|' +
    // 3. Block quotes (including nested quotes and citations, up to three levels, with length constraints)
    `(?:(?:^>(?:>|\s{2,}){0,2}${SENTENCE_PATTERN.replace(/{MAX_LENGTH}/g, String(MAX_BLOCKQUOTE_LINE_LENGTH))}\r?\n?){1,${MAX_BLOCKQUOTE_LINES}})` +
    '|' +
    // 4. Code blocks (fenced, indented, or HTML pre/code tags, with length constraints)
    `(?:(?:^|\r?\n)(?:\`\`\`|~~~)(?:\w{0,${MAX_CODE_LANGUAGE_LENGTH}})?\r?\n[\s\S]{0,${MAX_CODE_BLOCK_LENGTH}}?(?:\`\`\`|~~~)\r?\n?` +
    `|(?:(?:^|\\``
```
3. Adjust the configurable maximum length parameters to match your specific content type and LLM context window limits
4. Connect the Code Execution node to your Batch Processing and translation workflow nodes

A core set of configurable segmentation parameters from the code includes:
| Parameter Name | Default Value | Purpose |
|----------------|---------------|---------|
| MAX_HEADING_LENGTH | 7 | Maximum allowed heading marker length |
| MAX_HEADING_CONTENT_LENGTH | 200 | Maximum length of heading content |
| MAX_LIST_ITEM_LENGTH | 200 | Maximum length of individual list items |
| MAX_PARAGRAPH_LENGTH | 1000 | Maximum length of standard paragraph text |
| MAX_SENTENCE_LENGTH | 400 | Maximum length of individual sentences |
| MAX_CODE_BLOCK_LENGTH | 1500 | Maximum length of fenced code blocks |
| MAX_TABLE_CELL_LENGTH | 200 | Maximum length of table cell content |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/loop)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
