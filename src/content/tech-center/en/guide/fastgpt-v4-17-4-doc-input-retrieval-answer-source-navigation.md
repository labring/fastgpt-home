---
title: FastGPT File Handling and Citation Guide
slug: /en/guide/fastgpt-v4-17-4-doc-input-retrieval-answer-source-navigation
page_type: aggregation
source: https://doc.fastgpt.io/guide/build/general/fileInput
source_type: 深度场景内容
meta_title: FastGPT File Handling and Citation Guide
meta_description: Follow FastGPT documentation from file handling to knowledge retrieval and citation reading, with checks for document scope and the original source.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4-17-4-doc-input-retrieval-answer-source-navigation-en","task_id":"W19-hub-03","article_id":"W19-hub-03-en","language":"en","content_type":"hub","meta_title":"FastGPT File Handling and Citation Guide","meta_description":"Follow FastGPT documentation from file handling to knowledge retrieval and citation reading, with checks for document scope and the original source.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4-17-4-doc-input-retrieval-answer-source-navigation","source_language":"zh","source_sha256":"d015652d94be7a5d5db8ad6b09ecc92ab22ba435cd20ebbcb47267c0d38a43c5","keywords":"[\"document question answering\",\"file parsing\",\"citation review\"]"},"editorial_notes":[]}
keywords: document question answering, file parsing, citation review
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT File Handling and Citation Guide

## Choose the document path first

Turning PDFs or Word files into a question-answering application can mean maintaining a long-lived knowledge base or handling an attachment in one conversation. These paths differ in processing and retention. Establish how often files change, who owns them and which questions they serve before choosing the input route. FastGPT provides file handling and knowledge retrieval capabilities; the application needs a clear relationship between the documents, questions and outputs.

## Review input and parsing for uploaded files

For questions submitted with attachments, start with [file input](https://doc.fastgpt.io/guide/build/general/fileInput) and [document parsing](https://doc.fastgpt.io/guide/build/workflow/nodes/document_parsing). Start with document parsing for files with extractable text. Inspect the output when a file contains scanned pages. Route standalone images and audio through multimodal recognition with a model that supports that input. Inspect the text obtained and keep the filename with its processing result before passing it onward. This makes a missing field traceable to the relevant document stage.

## Search maintained knowledge collections

For manuals and policies used repeatedly, open [knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search). Confirm that the files have completed the required processing, then inspect passages returned for business questions. Knowledge bases in the same search node need the same embedding model. An empty reference array can still pass along the output path. An empty array records that this run returned no references. The application can ask for clarification or send the question to the document owner to check the material and scope.

## Filter mixed document collections

When a collection contains several departments or versions, consult commercial [collection tags](https://doc.fastgpt.io/guide/dataset/collection_tags). Maintain attributes such as department, category and effective date with each file, then filter for the query. Tags express search conditions; access permissions depend on authentication arrangements. Record the question, answer and associated file together so maintainers can explain why the file applies.

## Return from the answer to its source

Use the [citation reader](https://doc.fastgpt.io/guide/chat/quoteList) to inspect cited passages and their context. Visibility depends on sharing and access settings; an external entry point may expose only the cited portion. Compare conditions, figures and applicable subjects with the readable original, then repeat the question after a document update. Changes in processing, retrieval and answer wording can then be examined separately, giving document owners specific material to correct.
