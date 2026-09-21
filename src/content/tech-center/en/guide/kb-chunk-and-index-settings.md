---
title: Knowledge Base Chunk and Index Settings Estimator: What Each Parameter Actually Becomes
slug: /en/guide/kb-chunk-and-index-settings
page_type: Interactive module page
source: https://doc.fastgpt.io/docs/guide/dataset
source_type: 官方文档
meta_title: Knowledge base chunk and index settings estimator
meta_description: Adjust the processing mode and chunk parameters to see the value each setting actually takes under auto and custom mode, plus the estimated chunk and index counts.
keywords: knowledge base chunking, index size, chunk size, QA split, split mode
schema_type: TechArticle
date_published: 2026-09-09
date_modified: 2026-09-09
interactive_module: parameter-simulator
interactive_data: a2-chunk-index-settings.json
---

# Knowledge Base Chunk and Index Settings Estimator: What Each Parameter Actually Becomes

Two numbers have to be decided before documents go in: how long each piece of content is, and how long an index to build for it. Both are editable in the interface, and neither is guaranteed to be the value that takes effect - the processing mode and the setting mode rewrite some of them. The module below lays out those rewrites: pick a processing mode and a setting mode, and the effective value of every parameter, the ones that get overwritten, and the estimated chunk and index counts all move with it.

## When these settings are worth real attention

With a small document set in a single format, the defaults are fine and tuning is not worth the time. Four situations change that.

The first is a long file with uneven density - a several-hundred-page manual that holds both a table of contents and parameter tables. Splitting on a fixed length cuts through those tables, retrieval returns half a table, and the model cannot tell what the fields mean.

The second is a document with explicit structure, such as a specification organised by chapter. Paragraph splitting keeps that structure; length splitting crosses chapter boundaries, and retrieval then tends to staple two unrelated chapters together.

The third is preparing for QA split. QA split calls a large model to rewrite the source into question and answer pairs, and its chunk-size ceiling and index size both differ from plain chunking. The index size is also rewritten under this mode, so whatever the interface shows will not apply.

The fourth is estimating index volume before a bulk import. The index count drives vector storage and index build time directly, and an order-of-magnitude difference changes resource use during the import completely.

## Interactive module: chunk and index settings estimator

Choose a processing mode and a setting mode, enter the file count and average length, and the module reports the effective value of each parameter, which ones were overwritten, and the estimated chunk and index counts.

<!-- fastgpt-interactive: parameter-simulator | data: a2-chunk-index-settings.json | fallback-table-below -->

| Control | Parameter | Range | Default | Notes |
| --- | --- | --- | --- | --- |
| Processing mode | trainingType | Chunk / QA split / Image parse | Chunk | QA split rewrites the index size |
| Setting mode | chunkSettingMode | Auto / Custom | Auto | Auto overrides the four rows below and clears the separator |
| Split mode | chunkSplitMode | Paragraph / Size / Separator | Paragraph | Paragraph depth applies only in paragraph mode |
| Chunk size | chunkSize | 64 to the model ceiling | 1000 | Capped by the model ceiling in custom mode |
| Index size | indexSize | 64 / 128 / 256 / 512 / 768 / 1024 / 1536 / 2048 / 3072 / 4096 / 5120 / 6144 / 7168 / 8192 | 512 | Options are filtered by the embedding model ceiling |
| File count and average length | — | Entered by the reader | — | Used to estimate chunk and index counts |

### Effective values under each setting mode

This table is the full basis for the module above and can also be read on its own. Rows marked forced in the auto column mean the value in the interface does not apply.

| Parameter | Setting mode: Auto | Setting mode: Custom |
| --- | --- | --- |
| Split mode (chunkSplitMode) | Forced to paragraph | As selected |
| Paragraph AI mode (paragraphChunkAIMode) | Forced to forbid | As selected |
| Paragraph depth (paragraphChunkDeep) | Forced to 5 | Uses the value you set only when the split mode is paragraph; set to 0 for every other mode |
| Paragraph minimum size (paragraphChunkMinSize) | Forced to 100 | As set |
| Chunk size (chunkSize) | QA split uses the model default (capped at 8000); every other mode uses 1000 | The smaller of the value you set and max(model context, 4000) |
| Index size (indexSize) | QA split uses the embedding model maximum; other modes use the embedding model default (both 512) | Still overwritten with the embedding model maximum under QA split, so your value does not apply |
| Custom separator (chunkSplitter) | Cleared | As entered |
| Minimum chunk size (minChunkSize) | 64 | 64 |

## Auto and custom differ more than the interface suggests

The difference goes beyond which inputs are editable. Under auto, the split mode is fixed to paragraph, paragraph AI recognition is fixed to forbid, paragraph depth is fixed to 5, and the paragraph minimum size is fixed to 100, whatever the interface displays.

The custom separator is the one most often missed. Auto mode clears it. So a separator entered under custom mode does not survive a switch back to auto, and nothing in the interface says so. Documents that depend on a separator have to stay on custom.

Custom mode carries two rewrites of its own. Chunk size is capped by the model ceiling, which is the larger of the model context length and 4000; a larger value takes the ceiling instead. Paragraph depth is used only when the split mode is paragraph - under length or separator splitting it is set to 0, and any depth entered earlier stops having an effect.

## Three typical cases

Long documents with clear structure, such as manuals, specifications and standards. Auto is enough: it splits on paragraphs and keeps the structure, and a depth of 5 covers documents with several heading levels. If retrieval keeps returning content that crosses chapters, switch to custom and increase the depth.

Semi-structured documents in a uniform format, such as records exported with a fixed separator, or question and answer files. Custom is required, the split mode has to be separator, and the actual separator has to be entered. Paragraph depth goes to 0 in this case, which is expected and needs no action.

Documents headed for QA split. Chunk size follows the large model default with a ceiling of 8000, well above the 1000 used for plain chunking, because the model needs enough context to generate pairs. Index size takes the embedding model maximum under this mode and the interface value does not apply, so that field is not worth time.

## Estimating chunk and index counts

Chunk count is total characters divided by the effective chunk size. The effective value is the one to use, not the value in the interface - for the rows overwritten in the table above, the rewritten number is the denominator. Paragraph splitting usually produces somewhat more chunks than that estimate, because paragraph boundaries do not land exactly on the size ceiling and a short paragraph still becomes its own chunk.

Index count is at least the chunk count: every chunk gets one index by default. Custom indexes multiply that for the content they cover - three custom indexes on one chunk means three entries. Adding custom indexes therefore deserves a quick total, because it grows faster than the chunk count.

These two numbers set the scale of three things. Vector storage grows with the index count and the dimension of the embedding model in use, so moving to a higher-dimension model scales it proportionally. Index build time and call volume follow the index count, since every entry passes through the embedding model once. Model calls for QA split follow the chunk count, and because the QA chunk ceiling is far larger than for plain chunking, the same documents produce noticeably fewer chunks under QA split.

Estimating all three before a bulk import costs less than discovering mid-import that resources fall short. For a first large import in particular, run a dozen files through, then scale from the chunk count actually produced - that beats the formula.

## Three common misreadings

The first is treating a larger chunk size as a way to improve retrieval precision. Longer chunks carry more complete content, and also more topics per chunk, which dilutes similarity during semantic retrieval. Which direction pays off depends on the document shape, so test on a small batch first.

The second is reading index size as chunk size. They are different quantities: chunk size decides how long a piece of content is, index size decides how much of that piece is used to build the index. Index size has fourteen fixed options and is filtered by the embedding model ceiling, so options above that ceiling never appear in the interface.

The third is setting chunk size too low. The floor is 64 and anything below it does not apply; in practice a very small size leaves every chunk short of context, and the model receives fragments that make wrong answers more likely.

## Version differences and expiry

Values on this page come from v4.16.2. The chunk and index values are identical in this version and on the development branch, but the default and available index sizes depend on the embedding model configuration in use, so they need rechecking after an embedding model change. The available processing modes have been added to and removed between versions; follow the deployed version.

## Keep reading

- [Understand FastGPT RAG Retrieval Phase Workflows](/en/tutorial/fastgpt-rag-retrieval-phase)
- [Knowledge base index strategy decision matrix](/en/guide/kb-index-strategy-selection)

> Parameters and rules on this page are taken from the FastGPT open-source repository at v4.16.2, verified 2026-09-09.

## References

- [FastGPT knowledge base configuration](https://doc.fastgpt.io/docs/guide/dataset)
- [FastGPT open-source repository](https://github.com/labring/FastGPT)
