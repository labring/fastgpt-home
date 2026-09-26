---
title: Workflow Orchestration for ID Document KYC
slug: /en/industry/finance-d001-c142-f007
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for ID Document KYC
meta_description: ID document data originates from public security household registration management departments or authorized electronic certificate platforms. Updates
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for ID Document KYC

## What the data for this category looks like
ID document data originates from public security household registration management departments or authorized electronic certificate platforms. Updates occur only when a certificate is applied for, renewed, or reissued. Documents are fixed-format printed materials or electronic files, with standard fields including citizen ID number, full name, gender, ethnicity, date of birth, address, issuing authority, and validity period. The citizen ID number is an 18-character fixed-length string. Validity periods are marked in years. Addresses are standardized address strings. Electronic certificate files typically support common formats such as PDF and JPG.

## What constraints these characteristics impose on workflow orchestration
Fixed document structure requires OCR recognition areas in the workflow to accurately match the printed scope of the certificate, to avoid interference from non-certificate regions. A fixed set of fields allows pre-configured clear validation rules, such as checksum verification for citizen ID numbers and date comparison for validity periods. Low update frequency means frequent incremental data synchronization is unnecessary, but validity period verification steps must be embedded in the workflow to prevent expired certificates from passing verification. Multi-format file input requires the workflow to adapt to different parsing engines, while file volume must be limited to avoid parsing timeouts.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `OCR_TARGET_REGION` | `[80, 40, 770, 520]` (pixel coordinates) | The standard printed area of the second-generation resident ID card is fixed. This coordinate range covers all key verification fields and reduces recognition interference from non-certificate areas |
| `ID_CARD_VALIDATE_STRICT` | `true` | Enable strict verification mode. This verifies the checksum of the citizen ID number and the validity of the certificate validity period, preventing invalid certificates from entering subsequent processes |
| `WORKFLOW_STEP_TIMEOUT` | `150 seconds` | OCR parsing and identity information verification require calls to external tools. Reserve sufficient execution time to avoid forced mid-process interruptions |
| `INVALID_DOC_HANDLER` | `terminate_and_notify` | Expired or forged ID documents cannot pass KYC verification. Directly terminate the workflow and trigger an alert to reduce invalid resource usage |
| `TOOL_INVOCATION_LOGGING` | `enabled` | Record the invocation parameters and return results of each MCP tool to facilitate troubleshooting of workflow execution exceptions |
| `FILE_UPLOAD_MAX_SIZE` | `10 MB` | ID card scans or electronic certificate files are typically small. This threshold avoids invalid large files occupying storage and parsing resources |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The console outputs two separate thought process texts during workflow debugging. Cause: The automatic thinking configuration of the tool call node and the global thinking switch of the workflow are enabled at the same time, causing duplicate triggering of thinking logic.
- Phenomenon: The locally deployed code runtime component throws a missing dependency error when executing simple code. Cause: Basic dependency packages required by the code runtime environment are not installed during local deployment, or the component is not granted sufficient file access permissions.
- Phenomenon: The results returned by the knowledge base retrieval in the workflow do not match the preset tags. Cause: Corresponding classification tags are not added to documents during the knowledge base import process, or the retrieval node is not configured with tag filtering parameters.

## How to confirm correct configuration
- Upload a standard ID document to trigger workflow execution, and check the field integrity of the OCR recognition results.
- Upload an ID document with an expired validity period, and check whether the workflow executes the termination or alert action as configured.
- Trigger the workflow via API, view the tool invocation logs, and confirm that all MCP tool invocation records are correctly saved.
- Import documents into the knowledge base and add specified tags, configure tag filtering rules in the workflow retrieval node, and check that returned results only include documents with matching tags.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
