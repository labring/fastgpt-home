---
title: Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Financial Report Analysis
slug: /en/industry/finance-d014-c006-f013
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Traditional Chinese
meta_description: Traditional Chinese medicine (TCM) financial reports originate from public stock exchange disclosure platforms and official enterprise announcement
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Financial Report Analysis

## What Data for This Category Looks Like
Traditional Chinese medicine (TCM) financial reports originate from public stock exchange disclosure platforms and official enterprise announcement boards.
Annual reports are disclosed within four months after the end of each fiscal year. Semi-annual reports are disclosed within two months after the end of the first half of the fiscal year. Quarterly reports are disclosed within one month after the end of each quarter.
Documents use standardized periodic report formats, including modules such as basic enterprise information, core financial data, operating situation discussion and analysis. The TCM-specific module separately lists contents such as Chinese medicinal material procurement and inventory, production and processing capacity, and product sales details.
Fields include Chinese medicinal material procurement unit price, decoction pieces production capacity, R&D investment amount, and more. Corresponding units include yuan/kilogram, tons/year, ten thousand yuan, and others.

## What Constraints These Characteristics Impose on Knowledge Base Retrieval and Recall
TCM financial reports have many dedicated business modules and a high proportion of non-general fields. Failing to split content by module leads to retrieval of irrelevant general financial content during recall.
The fixed disclosure and update schedule requires the knowledge base synchronization cycle to match report release nodes. Expired data will be recalled if the cycle does not align.
Dedicated units require semantic matching between fields and units during retrieval to avoid results with mismatched units.
Individual financial report documents are lengthy, creating a large number of vector chunks after splitting. Adjust the recall threshold to avoid redundant recall.

## How to Configure

| Configuration Item | Recommended Value Range | Rationale |
|---|---|---|
| `Chunk Length` | 800–1200 characters | The content of TCM financial report-specific modules is moderately sized. This value range preserves complete semantics within modules and avoids mixing content across modules.
| `Recall Count` | Top 6–8 results | The number of valid chunks for a single TCM financial report is relatively high. Too many recalls will lead to redundant context, while too few will fail to cover core information.
| `Similarity Threshold` | 0.72–0.80 | The semantic similarity distinction for TCM-specific fields is relatively high. This interval filters low-correlation general financial chunks and retains accurately matched content.
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | A single TCM financial report contains a large amount of structured and unstructured content. A longer timeout ensures complete parsing.
| `Knowledge Base Sync Trigger Rule` | Manual trigger per disclosure node + weekly incremental sync | The update cycle of TCM financial reports is fixed. Manual trigger ensures newly disclosed reports are added to the knowledge base in a timely manner, while incremental sync reduces repeated parsing.
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Complete disclosure documents (including attachments) for a single TCM annual report typically do not exceed this size, preventing upload failures.

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and testing on local samples is recommended before finalizing settings.

## Three Common Errors
- Symptom: When calling the `/api/v1/chat/completions` API, the returned answer does not include source information for referenced documents, or the `source` field is empty. Cause: The document source switch was not enabled in the knowledge base configuration, or the `enableSource` parameter was not included in the request parameters.
- Symptom: After configuring `appId`, calling the chat API fails to match uploaded TCM financial report content. Cause: The knowledge base was not bound to the specified application, or the uploaded document did not complete the parsing verification process.
- Symptom: After parsing an uploaded TCM financial report, dedicated Chinese medicinal material-related fields are not correctly extracted. Cause: A dedicated financial report parsing model was not configured, or the general parsing model in use cannot recognize dedicated business fields of TCM financial reports.

## How to Confirm Configuration Is Complete
- Upload a single TCM financial report document, check the background parsing records to confirm the document has been parsed without errors.
- Initiate a test query targeting TCM financial report-specific fields, verify that retrieval results include matched document content.
- Call the chat API with the `enableSource` parameter, confirm that returned results include source information for referenced documents.
- Check the knowledge base sync logs to confirm the latest financial report documents have been successfully synced to the knowledge base.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
