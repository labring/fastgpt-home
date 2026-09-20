---
title: Multi-turn Conversation and Prompt Engineering for ID Card KYC
slug: /en/industry/finance-d001-c142-f005
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Conversation and Prompt Engineering for ID Card
meta_description: ID card KYC data has two sources. One is official data accessed via national public security identity verification APIs. The other is user-uploaded
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Conversation and Prompt Engineering for ID Card KYC

## What this category of data looks like
ID card KYC data has two sources. One is official data accessed via national public security identity verification APIs. The other is user-uploaded scanned physical ID cards or captured photos.
For update frequency: public security API data syncs with the official database quarterly. User-uploaded documents have no fixed update cycle.
Documents follow a fixed layout, with five core fields: full name, citizen ID number, residential address, issuing authority, and valid period. All fields use standard Chinese phrasing, with no special units or custom formats.

## Constraints on Multi-turn Conversation and Prompt Engineering
ID card fields are fixed and follow standard formats. Multi-turn conversations must strictly focus on preset fields, and no irrelevant verification items can be added.
The sync cycle of public security API data limits the time range for real-time verification. Prompts must restrict the time interval for API calls to avoid using expired data.
User-uploaded images must first undergo OCR parsing. Multi-turn conversations must connect OCR extraction results with user-supplied supplementary information to ensure accuracy of field matching.
Additionally, single ID card data volume is small. Excessive context will interfere with subsequent field verification logic.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `10–15 turns of conversation context` | ID card KYC requires consistent verification of OCR results, user-supplementary information and verification rules. Excessive context will interfere with core field matching |
| `PROMPT_TEMPLATE` | `Fixed field verification template, only retain full name, citizen ID number, residential address, issuing authority, valid period` | ID card fields are fixed. Avoid introducing irrelevant verification items in prompts to ensure precise verification scope |
| `OCR_REQUIRE_FIELDS` | `Full Name, Citizen ID Number, Valid Period` | Automatically trigger follow-up questions when core fields are missing, reduce manual input costs for users and improve verification efficiency |
| `UPLOAD_FILE_MAX_SIZE` | `5 MB` | ID card scans or photos have small individual file sizes. Setting this limit prevents invalid large files from occupying platform resources |
| `CHAT_REPLY_FORMAT` | `Plain text format` | Matches output requirements without Markdown formatting, directly displays verification results and follow-up prompts |
| `maxRetryCount` | `2 times` | ID card verification requires strict matching with official data. Excessive retry times will extend the verification cycle and negatively impact user experience |

## Three Common Configuration Mistakes
- Symptom: Conversation results are only displayed in the side panel, with no content in the main dialog box. Cause: The `CHAT_DIRECT_REPLY` configuration is not enabled. Results are by default directed to the document analysis side bar.
- Symptom: A new conversation must be created for each KYC verification, and multi-turn conversations cannot be continued. Cause: `persistChatSession` is not set to `true`. Sessions are automatically destroyed after each single interaction ends.
- Symptom: AI replies automatically use Markdown formatting, and cannot be adjusted to plain text display. Cause: `CHAT_REPLY_FORMAT` is not configured as plain text. Markdown rendering logic is enabled by default.

## How to Confirm Successful Configuration
- Upload an ID card scan, and check if the main dialog box directly displays the OCR-extracted field results without side panel pop-ups or redirects.
- Continuously input supplementary ID card information, and confirm that the conversation session does not close automatically, allowing a smooth multi-turn verification process.
- Review AI reply content, and confirm that no Markdown formatting elements such as headings or lists appear, only plain text verification results and prompts are displayed.
- Test uploading an ID card photo that only contains some core fields, and confirm that the system automatically triggers follow-up questions for missing fields instead of directly returning an error prompt.

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
