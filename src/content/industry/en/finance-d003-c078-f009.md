---
title: Citation Sources and Traceability for Pre-existing Condition Determination in Insurance Claim Initial Review
slug: /en/industry/finance-d003-c078-f009
page_type: Industry scenario page
article_section: Insurance Claim First-Level Review
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Pre-existing Condition
meta_description: Pre-existing condition determination data primarily comes from insured individuals’ medical insurance settlement details, past medical visit records
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Pre-existing Condition Determination in Insurance Claim Initial Review

## What This Use Case’s Data Looks Like
Pre-existing condition determination data primarily comes from insured individuals’ medical insurance settlement details, past medical visit records, physical examination reports, and outpatient prescriptions. Data updates sync with each individual claim process, or update regional medical insurance databases on a fixed schedule.
The data includes both structured fields and unstructured text. Structured fields include visit date (formatted as YYYY-MM-DD), ICD-10 diagnosis code, medical institution name, and insurance status (enumerated values). Unstructured parts consist of medical record details and medical advice content.

## What Constraints Do These Characteristics Impose on Citation Sources and Traceability?
Multi-source heterogeneous data structures require the traceability link to support precise positioning of both structured fields and unstructured text.
The unique nature of ICD-10 diagnosis codes means traceability must link to the specific medical document number for the corresponding diagnosis, rather than only returning the document name.
Data binding by insured individual requires traceability to additionally verify the associated insured ID and visit batch, to avoid cross-user data leaks or mix-ups.
Long text characteristics of unstructured medical records require traceability to locate specific paragraphs, rather than only returning the full document.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8-12 results` | Pre-existing condition determination needs to cover an insured individual’s 3-5 year past medical visit records. Too many recalled results increase context pressure, while too few may miss critical pre-existing condition data. |
| `Similarity Threshold` | `0.75-0.85` | Structured diagnosis codes require precise matching, while unstructured medical record text needs semantic matching. This range balances recall precision and recall coverage. |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Medical record documents may contain multi-page long text. Sufficient time is needed to complete slicing and parsing, to avoid parsing failure due to timeout. |
| `Chunk Length` | `800-1000 characters` | Key information for pre-existing condition determination is concentrated in three modules: visit date, diagnosis, and cost. This chunk length preserves module integrity and avoids slicing that splits critical information. |
| `Citation Display Format` | `Structured fields + unstructured snippets` | Pre-existing condition determination needs to display both the medical visit record corresponding to the diagnosis code and medical record details. This format clearly presents traceability basis.

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing values.

## Three Common Misconfigurations
- Phenomenon: The answer returned by the knowledge base QA API does not include citation snippet fields, and no citation entry is displayed in the interface. Cause: The "Return Reference Details" configuration option for the FastGPT knowledge base is not enabled, or the `withReference` parameter is not set to `true` when calling the API.
- Phenomenon: Recalled citation snippets include medical visit records for a non-current claim insured individual, leading to data mix-up. Cause: No insured ID filter condition is added to the recall rules, resulting in recall of cross-user pre-existing condition data.
- Phenomenon: Long medical record documents fail to parse, and the console returns a `504 Gateway Timeout` error. Cause: The value set for `PARSE_FILE_TIMEOUT_SECONDS` is less than the parsing time required for long-text medical records, causing the document to be terminated before slicing is completed.

## How to Confirm Proper Configuration
- Call the knowledge base QA API with the `withReference=true` parameter. Check if the returned results include the `references` field, and that the field contains pre-existing condition related information such as visit date and diagnosis code.
- Enter a pre-existing condition determination related query in the FastGPT knowledge base test panel. Check if the reply area displays traceability details for structured fields and unstructured snippets.
- Upload a multi-page medical record document. Confirm that the parsing task status shows "Completed", with no timeout or parsing failure error prompts.
- Enter a query request bound to a different insured ID. Confirm that the recall results do not return medical visit records for non-target insured individuals.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
