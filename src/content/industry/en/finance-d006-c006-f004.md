---
title: Vector Models and Indexing for Traditional Chinese Medicine Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f004
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Vector Models and Indexing for Traditional Chinese Medicine
meta_description: Sources of TCM investment research data include the National Drug Standard Database, industry academic journals, internal pharmaceutical company R&D
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Vector Models and Indexing for Traditional Chinese Medicine Investment Research Knowledge Base Construction

## What the Data for This Category Looks Like

Sources of TCM investment research data include the National Drug Standard Database, industry academic journals, internal pharmaceutical company R&D documents, and local Chinese herbal medicine processing specifications. Data follows three update rhythms: national pharmacopeia documents receive centralized revisions every 5 years, academic literature updates in real time with research progress, and internal enterprise documents adjust irregularly alongside R&D progress. Each individual document focuses on one or more Chinese medicinal herbs. Its structure includes fields such as origin description, processing technology flow, nature and tropism explanation, clinical application fragments, and quality inspection indicator parameters. Some documents contain quantitative parameters such as structured weight and concentration.

## What Constraints Do These Characteristics Impose on Vector Models and Indexing?

The multi-dimensional structure and update rhythm of TCM investment research data create multiple constraints for the vector model and indexing process. First, documents with mixed text and structured parameters require vector models to support multi-modal semantic encoding, avoiding separation of text and quality indicator associations. Second, real-time updated academic literature and periodically revised pharmacopeia documents require indexes to support incremental update and batch reconstruction functions, adapting to data with different update frequencies. Third, text dense with TCM professional terminology requires vector models to be fine-tuned on TCM corpora, improving recognition accuracy for professional semantics. Fourth, the long-text attribute of individual documents requires indexes to support a reasonable chunking strategy, avoiding excessive splitting of semantic units.

## Configuration Settings

| Configuration Item | Recommended Values | Rationale |
| --- | --- | --- |
| `Chunk size` | 800–1200 characters | TCM investment research documents contain continuous processing technology and clinical application text. This range matches the semantic unit length of TCM professional text, preventing term truncation or context breaks |
| `Chunk overlap` | 100–150 characters | Preserves professional term connections between adjacent chunks, preventing core terms such as authentic medicinal materials and processing for toxicity reduction from being split across chunks |
| `Recall count` | Top 8–12 results | Covers multi-dimensional investment research information for a single medicinal material, including origin, pharmacology, quality inspection and other types of data |
| `Batch Processing Size` | 16–32 | Matches the batch processing capacity of vectorization services, balancing request latency and overall processing efficiency |
| `Vector Model` | `阿里multimodal-embedding-v1` or a dedicated model adapted to TCM corpora | Supports joint vectorization of text and structured quality inspection parameters, matching the mixed modal characteristics of TCM investment research data |
| `Similarity threshold` | Calibrated based on actual measurements | Needs to be adjusted based on semantic similarity thresholds for TCM professional terms, avoiding recall of unrelated medicinal material documents |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Each scenario requires specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes

- Phenomenon: When calling the vectorization interface, the number of returned results does not match the number of submitted chunks, and only one result is returned. Cause: The `batch_size` related parameters are not configured correctly, or the FastGPT default logic does not enable batch chunk submission. Only a single chunk is passed to the vectorization service, failing to trigger batch processing.
- Phenomenon: When calling the `GET /api/index/chunks` chunk indexing API in fastgpt4.8.10, a `400 Bad Request` or empty array is returned. Cause: The chunk indexing record function is not enabled in the knowledge base configuration, or the correct knowledge base ID and chunk identifier are not included in the request parameters.
- Phenomenon: After manually adding the `阿里multimodal-embedding-v1` model, the interface prompts that the model configuration is abnormal. Cause: The correct API endpoint and access key are not filled in the model management interface, or the adaptation option for multi-modal embedding is not enabled.

## How to Confirm Proper Configuration

- View the FastGPT vectorization service logs, confirm that the number of submitted chunks matches the configured `batch_size`, and verify that the batch processing logic is triggered normally.
- Call the `GET /api/index/chunks` chunk indexing API, pass the correct knowledge base ID and chunk ID, and check if the returned results contain expected TCM-related text fragments and field information.
- Confirm that the added `阿里multimodal-embedding-v1` model status is "Available" in the model management interface, and initiate a test API call to verify that the model returns normal results.
- Initiate a test retrieval, check that the number and relevance of recall results meet the preset `Recall count` and `Similarity threshold` requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
