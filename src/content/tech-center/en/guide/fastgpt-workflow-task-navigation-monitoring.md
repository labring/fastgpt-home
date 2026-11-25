---
title: FastGPT for Reports, Review and Template Drafting
slug: /en/guide/fastgpt-workflow-task-navigation-monitoring
page_type: aggregation
source: https://doc.fastgpt.io/guide/build/workflow/nodes/http
source_type: 深度场景内容
meta_title: FastGPT for Reports, Review and Template Drafting
meta_description: Find FastGPT workflow documentation for reporting, document review and template drafting, keeping original inputs, draft text and final outputs distinct.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-workflow-task-navigation-monitoring-en","task_id":"W19-hub-08","article_id":"W19-hub-08-en","language":"en","content_type":"hub","meta_title":"FastGPT for Reports, Review and Template Drafting","meta_description":"Find FastGPT workflow documentation for reporting, document review and template drafting, keeping original inputs, draft text and final outputs distinct.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-workflow-task-navigation-monitoring","source_language":"zh","source_sha256":"34844491f480404dc7d861e0c15781c546711d4ea92ae11da8097d6040e2c384","keywords":"[\"operating report drafting\",\"document review\",\"workflow templates\"]"},"editorial_notes":[]}
keywords: operating report drafting, document review, workflow templates
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT for Reports, Review and Template Drafting

## Identify the intended deliverable

An operating report needs defined figures and commentary. Contract review needs original clauses and differences for consideration. Template drafting needs sources matched to sections. Prepare inputs for each task: API fields for reports, documents and reference rules for reviews, and sections with relevant sources for drafting. Identify what the final reader must inspect before selecting inputs and outputs. FastGPT can combine APIs, retrieval and text processing; document approval and office-file production continue through the existing work arrangements.

## Start operating reports with API fields

For operating reports, read [HTTP requests](https://doc.fastgpt.io/guide/build/workflow/nodes/http) and keep response fields with units and reporting periods. Structured values can go directly into a template while the model drafts explanatory passages. Define date scope and calculation sources before comparing periods, so cumulative values are not presented as daily additions. Retain the raw response to give editors a source for every figure.

## Connect document text with reference rules

For contract or document review, start with [text extraction](https://doc.fastgpt.io/guide/build/workflow/nodes/content_extract) and obtain reference clauses through [knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search). Keep document identity and version with the task. Distinguish original text, extracted fields and model-proposed differences. Reviewers can then return to the relevant passage and decide which differences need explanation or further action.

## Organize template drafting around section questions

For report and proposal templates, use [text concatenation](https://doc.fastgpt.io/guide/build/workflow/nodes/text_editor) and [AI Chat](https://doc.fastgpt.io/guide/build/workflow/nodes/ai_chat). Define the question each section answers, then supply facts for the current task. Keep fixed section requirements separate from project-specific content so editors can inspect the draft’s inputs. Sections without sufficient material need a route for supplementation; generic text should not be presented as current project progress.

## Connect final production after the text is checked

Each task needs original inputs and reviewable intermediate results: report fields and periods, review clauses and rules, or drafting sections and sources. Once the text is checked, the actual reporting, document or business tool handles layout, saving and distribution. Where an API writes the result back, inspect its receipt separately. This distinguishes completed text generation from a saved file and from a record accepted by the business system.
