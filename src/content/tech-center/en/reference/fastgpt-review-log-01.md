---
title: Knowledge Base Answer and Citation Review Log
slug: /en/reference/fastgpt-review-log-01
page_type: baseline
source: https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: Knowledge Base Answer and Citation Review Log
meta_description: Record expected sources, actual references, source access and reviewer findings for a FastGPT knowledge base answer, using this fillable review log.
delivery_metadata: {"source_front_matter":{"task_id":"W19-baseline-01","content_type":"baseline","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-review-log-01","article_id":"W19-baseline-01-en","slug":"fastgpt-review-log-01-en","language":"en","meta_title":"Knowledge Base Answer and Citation Review Log","meta_description":"Record expected sources, actual references, source access and reviewer findings for a FastGPT knowledge base answer, using this fillable review log.","keywords":"[\"knowledge base answers\",\"citation review\",\"source access\"]","source_language":"zh","source_sha256":"c03c87dccda04f5b97b13de3cebcdfadf83bec808cea71ae586d3f270c6d2885"},"editorial_notes":[]}
keywords: knowledge base answers, citation review, source access
schema_type: Article
date_modified: 2026-11-23
---

# Knowledge Base Answer and Citation Review Log

## Record the expected material first

Choose a real question whose answer can be checked against a source, such as the operating conditions for a model. Before testing, record the question, item, applicable document and version. Keep the expected passage or section number so someone else can review it. If two files apply, record what each one covers. Keep a separate example with no documented answer to check how the application handles a request for which it lacks evidence.

## Review the retrieved passage alongside the answer

After running the test, record the application entry point, identity and actual references. FastGPT [Dataset search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search) returns an array of references. An empty array means this search returned no passages. If passages are present, check the file, passage location and scope before deciding whether they support the answer. If a similar model or outdated policy appears, identify the actual material in the log so reviewers can trace the problem to document organization, search scope or the answer wording.

## Fill in the review log

Use one row for each run. If the same question is tested under a different account, sharing mode or knowledge scope, add a row and record the difference under Entry point. Fill outcomes from the observed result. The conclusion can state whether the answer covered the conditions, whether the reference came from the intended document and what to investigate next. For access checks, record both what was visible and the identity used.

| Question and item | Entry point and identity | Expected file and version | Actual reference and location | Answer support and access result | Reviewer’s conclusion and owner |
| --- | --- | --- | --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

## Check whether the reference opens its source

When the chat entry point permits source access, use the [Dataset Chunk Reader](https://doc.fastgpt.io/guide/chat/quoteList) to inspect the cited section and its context. For a shared entry point, record passage visibility and access to the original separately. Start with the references actually returned and that entry point’s display and access settings. After adjusting the material or entry point, repeat the same question under the same identity and retain both observations with a note about the change.

## Assign each finding to the right owner

If none of the tested entry points finds the same expected file, ask the content owner to verify ingestion and version before checking search scope. If only a particular sharing identity cannot open the source, ask the entry point owner to review citation display and access. Record what remains open and when to check again so the next reviewer can use the same question and material.
