---
title: Optimize Streaming Markdown Render Performance
slug: /en/deploy/fastgpt-streaming-markdown-rendering-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152
source_type: Official documentation
---

# Optimize Streaming Markdown Render Performance

## Streaming Render Performance Controls
This section covers core optimizations to reduce redundant processing during streaming Markdown rendering. A fixed cap limits render updates to 20 frames per second, which curtails excessive DOM updates and frame drops during lengthy model responses. Completed Markdown blocks are cached to eliminate repeated parsing, while active Markdown blocks reuse their existing parser and animation runtime to further lower processing overhead.
| Parameter | Default Value | Function |
|-----------|---------------|----------|
| Streaming Render FPS Threshold | 20 | Caps the number of render updates per second for streaming Markdown content |

## Consistent Animation Behavior
Prior to this update, visible text elements would restart fade-in animations when new Markdown content was parsed mid-stream. This change relocates all fade-in effects to a stable character timeline, ensuring only newly appended characters trigger fade-in animations. Existing visible text retains its animation state without interruption, delivering a smoother visual experience during extended responses.

## Formatting and Block Render Stability
Two targeted fixes resolve visual flickering and unexpected layout shifts during streaming:
1.  **Inline Formatting Completion**: Streaming tails for bold, italic, bold italic, strikethrough, nested emphasis, inline code, and block math are temporarily completed as content arrives. This prevents individual delimiter characters from altering the DOM structure of already rendered content, eliminating unexpected formatting shifts.
2.  **Deferred Block Rendering**: Complex block-level elements including lists, task items, blockquotes, headings, code fences, tables, links, images, and citation markers are not rendered until their full structure is known. This stops control markers from flashing and prevents previously rendered content from disappearing and reappearing as additional structure data is received.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/4152)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
