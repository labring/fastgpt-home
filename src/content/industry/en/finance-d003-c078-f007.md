---
title: Workflow Orchestration for Pre-existing Condition Determination in Insurance Claim Initial Review
slug: /en/industry/finance-d003-c078-f007
page_type: Industry scenario page
article_section: Insurance Claim First-Level Review
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Pre-existing Condition
meta_description: Data required for pre-existing condition determination comes primarily from health declaration archives created during policy purchase, outpatient and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Pre-existing Condition Determination in Insurance Claim Initial Review

## What the use case data looks like
Data required for pre-existing condition determination comes primarily from health declaration archives created during policy purchase, outpatient and inpatient medical records submitted during the claim stage, settlement details from medical insurance handling institutions, and underwriting archives from prior policy purchases.
Data updates trigger per individual claim case. Only exclusive records for the current application load per single case. No global bulk updates are performed.
Document structure includes structured medical insurance settlement fields and unstructured medical record text. Structured fields include ICD-10 diagnosis codes, treating facility level, and expense amount (unit: yuan). Unstructured text length ranges from hundreds to tens of thousands of characters.

## What constraints do these characteristics impose on workflow orchestration?
Mixed structured and unstructured data requires both structured field parsing nodes and unstructured text extraction nodes in the workflow. A single parsing logic will miss critical information.
The per-case data update pattern means the workflow cannot rely on globally cached historical data. Each execution must re-import exclusive documents for the current claim application to avoid cross-case data mixing.
The wide range of unstructured text lengths requires dynamic text segmentation rules in the workflow. This adapts to medical records of different lengths and prevents exceeding model context limits.
Standardized medical insurance field formats require built-in field validation logic in the workflow. Validate the legality of formats such as ICD codes and expense amount units to reduce invalid inputs in subsequent determination steps.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300-600 seconds` | Medical records related to pre-existing conditions are usually long. Sufficient time is needed to complete structured and unstructured parsing to avoid mid-execution interruptions |
| `UPLOAD_FILE_MAX_SIZE` | `20-50 MB` | Single files of claim-related medical records and settlement lists usually do not exceed 50 MB. This range covers file upload requirements for most cases |
| `TEXT_SPLIT_CHUNK_SIZE` | `800-1200 characters` | Unstructured medical record text has a wide length range. This range balances context completeness and model processing efficiency, and adapts to input limits of most visual and text models |
| `STRUCTURED_FIELD_VALIDATION` | `Enable and validate ICD-10 codes, expense units` | Medical insurance-related fields must comply with industry standard formats to ensure valid and legal input data for subsequent determination steps |
| `BASE64_CONVERSION_ENABLE` | `Enabled` | Claim materials often include image-based medical records. They must first be converted to base64 format to be recognized and parsed by visual models |
| `WORKFLOW_TRIGGER_MODE` | `Trigger per single insurance claim case` | Data updates per individual claim case. No global scheduled triggering is needed to avoid cross-case data mixing |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- A workflow execution prompts "unsupported file format". This occurs when the `BASE64_CONVERSION_ENABLE` parameter is not configured, so uploaded image-based medical records cannot be converted to base64 format recognized by the model.
- After calling the workflow via API to upload a file, the system prompts "no data associated with knowledge base". This happens when imported medical files are not linked to a preset global knowledge base variable, or no knowledge base recall node is configured in the workflow.
- Workflow execution is interrupted after exceeding the preset time limit. This occurs when the `PARSE_FILE_TIMEOUT_SECONDS` parameter is not adjusted, so parsing time for long-text medical records exceeds the default threshold.

## How to Verify Proper Configuration
- Upload a standard medical insurance settlement list and outpatient medical record. Check if each workflow node successfully parses structured fields such as ICD-10 codes and treatment amount, as well as unstructured text describing past medical history.
- Call the test API, pass simulated claim case parameters and file paths. Check if the returned result includes complete data related to pre-existing condition determination, with no missing parameter errors.
- Configure a test timeout threshold, upload an extremely long medical record text. Verify that the workflow completes parsing within the preset time without timeout interruptions.
- Enable the field validation switch, pass an incorrectly formatted ICD code. Check if the workflow triggers a format validation prompt.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
