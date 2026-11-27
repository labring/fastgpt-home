---
title: Full Documents and Question-Answer Entries in FastGPT
slug: /en/compare/dataset-shape-update-path
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: Full Documents and Question-Answer Entries in FastGPT
meta_description: Compare full documents and question-answer entries for enterprise knowledge by context, maintenance, source links and checks on retrieved answers.
delivery_metadata: {"source_front_matter":{"slug":"dataset-shape-update-path-en","task_id":"W19-matrix-04","article_id":"W19-matrix-04-en","language":"en","content_type":"matrix","meta_title":"Full Documents and Question-Answer Entries in FastGPT","meta_description":"Compare full documents and question-answer entries for enterprise knowledge by context, maintenance, source links and checks on retrieved answers.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"dataset-shape-update-path","source_language":"zh","source_sha256":"621196e0289a5f6b5003bdc9f98403c0121fe2549867e0fafdc01f2c73b94e37","keywords":"[\"source documents\",\"question-answer entries\",\"citation review\"]"},"editorial_notes":[]}
keywords: source documents, question-answer entries, citation review
schema_type: Article
date_modified: 2026-11-23
---

# Full Documents and Question-Answer Entries in FastGPT

## Identify the context that must stay together

Policies, contracts and manuals often contain definitions, exceptions and cross-references. A recurring question may need one stable explanation. Choose the source format from these relationships. Question-answer entries can focus an answer, while full documents preserve surrounding conditions; the two can coexist. Check whether FastGPT’s retrieved passages are sufficient for the specific question against the original material.

## Compare the units that need maintenance

A document revision can affect many questions, while the same provision may appear in several question-answer entries. Keeping each entry’s source and scope helps locate affected answers after a revision. The table compares what needs maintenance for each type of task. Readability, question wording and document age can all affect the content returned.

| Dimension | Full documents | Question-answer entries |
| --- | --- | --- |
| Context | Sections and neighboring conditions | Explicit conditions and original source links |
| Updates | File and affected sections | Entries and the provisions they cite |
| Suitable task | Inspect clauses and context | Answer curated recurring questions |

## Check retrieved passages and their sources

[Knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search) returns references that can be checked against the expected entry or document. Multiple knowledge bases in one search require the same embedding model. An empty result records that this run returned no passages. Check document processing and query scope first. When a passage contains only a conclusion, keep its applicable subjects and exceptions available in the source material.

## Keep the question linked to its original text

When turning a long document into question-answer entries, start with actual questions and locate supporting passages. [Text concatenation](https://doc.fastgpt.io/guide/build/workflow/nodes/text_editor) can organize inputs under fixed requirements, but formatting does not establish accuracy. Editors need to check whether advice became a rule, one scenario became a universal statement, and figures, dates or processing conditions were retained.

## Test maintenance with a revised source

Take a revised source, identify affected question-answer entries and rerun their questions to check the cited version. When using the [citation reader](https://doc.fastgpt.io/guide/chat/quoteList), ensure the sharing scope suits the audience. Connecting documents, entries and recheck results helps maintainers choose full documents, curated entries or both, with a clear view of the ongoing work each choice needs.
