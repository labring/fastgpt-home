---
title: Deployment and Upgrade for ID Document KYC
slug: /en/industry/finance-d001-c142-f015
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for ID Document KYC
meta_description: ID document KYC data primarily comes from user-uploaded physical document scans, mobile-taken document photos, and structured verification data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for ID Document KYC

## What this category of data looks like
ID document KYC data primarily comes from user-uploaded physical document scans, mobile-taken document photos, and structured verification data obtained via government service APIs in some scenarios.
There are two types of update rhythms: single static updates for user-submitted data, batch updates for bulk imports, and on-demand triggered data syncs via government APIs.
Document structure follows a fixed two-sided format: the front side includes fields such as full name, citizen identification number, issuing authority, and validity period. The back side includes fields such as document type and number of issuances.
Most fields use plain text or pixel-level photo data. Mainland resident identification numbers follow a fixed 18-digit numeric format.

## What constraints do these characteristics impose on deployment and upgrade
The fixed layout and two-sided structure of ID documents require configuring a two-page alignment parsing workflow during deployment to prevent field extraction misalignment.
OCR parsing relies on GPU acceleration. Corresponding compute resources must be reserved during deployment, and adjustments must be made to adapt to layout differences across regional ID documents.
Data sources include structured APIs and unstructured photos. Both structured data mapping rules and unstructured OCR parsing parameters must be configured during deployment.
Upgrades must maintain compatibility with legacy document parsing templates to avoid disrupting verification workflows for existing users. Compliance verification rules must also be updated synchronously to adapt to regulatory-mandated field changes.
The strong compliance nature of ID documents requires configuring data masking and storage encryption parameters during deployment. These configuration items must be retained during upgrades to ensure data processing meets regulatory requirements.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | ID document OCR parsing includes two-page alignment and field association verification. Standard parsing durations are relatively long. 600 seconds covers parsing requirements for most high-definition scans. |
| `UPLOAD_FILE_MAX_SIZE` | `1000 MB` | High-definition ID document scans can reach resolutions above 300 DPI, with individual file sizes reaching hundreds of MB. 1000 MB covers most upload scenarios. |
| `KYC_DOC_VALIDATE_ENABLE` | `Enabled` | ID documents require format compliance checks for fields such as full name and identification number. Enabling this parameter automatically blocks submissions with incorrect formats, meeting regulatory verification requirements. |
| `OCR_MODEL_VERSION` | `v0.1.2` | This version adapts to the 2023 edition of mainland resident ID document layouts. Upgrades can switch to corresponding versions as needed to adapt to regional ID documents. |
| `FETCH_INTERNAL_URL_WHITELIST` | `["gov-api.xxx.com"]` | Government API syncs of ID document data require configuring trusted domain whitelists to prevent blocking of internal interface calls. |
| `PARSE_FILE_ALLOW_EXT` | `["jpg", "png", "pdf"]` | Common upload formats for ID documents include JPG, PNG scans, and PDF electronic documents. Configuring this whitelist filters invalid upload files. |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Specific scenarios require individual analysis. It is recommended to test on your own samples before finalizing values.

## Three common errors
- A GPU driver incompatibility error occurs when running `docker run --gpus all -itd -p 7231:7231 marker_images:v0.1`. Cause: GPU driver version on the host machine was not confirmed before deployment, and the CUDA version required by the image does not match the host machine.
- After upgrading to version 4.9.0, background logs display `cannot fetch internal url` when calling government APIs to sync ID document data. Cause: The `FETCH_INTERNAL_URL_WHITELIST` parameter was not configured. The new version blocks untrusted internal interface requests by default.
- The ID document verification file processing plugin cannot be found in the knowledge base configuration page. Cause: OCR and KYC-related plugin packages were not enabled during deployment, or plugin versions do not match the current FastGPT version.

## How to confirm successful configuration
- Upload a high-definition photo of both sides of an ID document, check if core fields are fully extracted from the parsing results, and verify that field extraction accuracy meets business expectations.
- Call the internal government API to sync structured ID document data, confirm normal acquisition and mapping to knowledge base fields, and check that no interface call blocking errors occur.
- Adjust the parsing timeout parameter, upload a large-size scan, and verify that the parsing workflow completes within the configured duration without timeout exceptions.
- Check the plugin management page, confirm that OCR and verification plugins related to ID document verification are enabled, and that their versions match the current FastGPT instance.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
