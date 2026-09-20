---
title: Forms and Interactions for Product Consultation Customer Service
slug: /en/industry/finance-d005-c010-f014
page_type: Industry scenario page
article_section: Customer Service and Account Enquiries
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Product Consultation Customer
meta_description: Product consultation data is sourced from official compliant documents of licensed financial institutions, including product specifications, fee
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Product Consultation Customer Service

## What the data for this category looks like
Product consultation data is sourced from official compliant documents of licensed financial institutions, including product specifications, fee schedules, subscription/purchase rules, risk rating reports, and similar materials. Data updates are triggered in sync with product adjustments, such as when new wealth management products launch or insurance policy terms are revised. Documents are structured by product category, with each product containing fields like basic information, fee parameters, eligibility criteria, redemption/payout rules, and more. Fields cover product codes, minimum investment amounts, risk levels, investment terms, and similar details. Units include yuan, years, percentage points, and others.

## What constraints these characteristics impose on the forms and interactions workflow
Since data originates from compliant documents, the interaction workflow must strictly restrict the generation of unapproved content, and only recall content from already synced compliant documents. Data updates occur at a high frequency, so interactions must prompt users about the update timeliness of current information to avoid providing outdated content. There are numerous specialized fields, so forms must be split into modules based on consultation scenarios. Additionally, validation rules must be set for numeric fields to prevent invalid input. The complex document structure requires interactions to support precise matching of product keywords, to avoid broadly recalling irrelevant content.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `RECALL_TOP_K` | Top 6-8 results | Product consultation requires precise matching of compliant content; excessive recall will introduce redundant information that interferes with user judgment |
| `SYNC_CRON` | `0 2 * * *` | Execute synchronization at 2:00 AM daily, which aligns with the high-frequency update rhythm of financial products and ensures information timeliness |
| `FORM_FIELD_VALIDATE` | Required field validation + numeric range validation | Product consultation involves numeric fields such as minimum investment amounts and investment terms; validation reduces invalid submissions |
| `PROMPT_TEMPLATE` | Answer based only on synced compliant product documents; do not generate unapproved content | Comply with financial industry compliance requirements and avoid generating unauthorized or unfiled product information |
| `VOICE_TRANS_TIMEOUT` | 15 seconds | Adapt to short-duration voice input scenarios for user consultations, and avoid interrupting normal interactions due to timeout |
| `GLOBAL_VAR_KNOWLEDGE_BASE` | Bind the knowledge base ID corresponding to the target product category | Precisely recall product data for the target category and avoid cross-category recall of irrelevant documents |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: An `unmarshal_resp` error pops up during voice input transcription. Cause: No validation rules for voice transcription response formats are configured, causing interface return data to fail normal parsing.
- Symptom: No staff contacts users after they submit a consultation form via WeChat Work integration. Cause: The `FORM_SUBMIT_NOTIFY` configuration item is not enabled, and no notification callback address is set after form submission.
- Symptom: Product consultation results do not match currently available products. Cause: The `SYNC_CRON` parameter is not configured as required, so the knowledge base does not sync the latest product compliant documents in a timely manner.

## How to Confirm Proper Configuration
- Submit a test form, check if notifications are received in the WeChat Work backend to confirm the `FORM_SUBMIT_NOTIFY` configuration is active.
- Initiate a voice input consultation lasting less than 10 seconds, wait for transcription to complete and obtain a compliant response to confirm the `VOICE_TRANS_TIMEOUT` configuration is appropriate.
- View the knowledge base synchronization logs to confirm the daily 2:00 AM synchronization task runs normally, verifying the `SYNC_CRON` configuration is correct.
- Check the global variable configuration page to confirm the bound knowledge base ID matches the target product category, verifying the `GLOBAL_VAR_KNOWLEDGE_BASE` parameter is filled correctly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
