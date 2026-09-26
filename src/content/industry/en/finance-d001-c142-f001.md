---
title: HTTP Interface and External Systems for ID Card KYC
slug: /en/industry/finance-d001-c142-f001
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: HTTP Interface and External Systems for ID Card KYC
meta_description: ID card KYC data originates from public security identity verification APIs, physical ID card scans uploaded by users, and photos of physical ID cards
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# HTTP Interface and External Systems for ID Card KYC

## What the data for this category looks like
ID card KYC data originates from public security identity verification APIs, physical ID card scans uploaded by users, and photos of physical ID cards taken by users. Structured data includes fixed fields including full name, 18-digit ID number, gender, ethnicity, registered residence address, issuing authority, and validity period. Unstructured data consists of image files for the front and back of the ID card. Data update frequency is determined by its source. Public security API data sync follows a fixed schedule. Unstructured data uploaded by users is only valid for a single verification, and is not stored long-term. Field formats follow clear specifications. ID numbers must comply with the GB 11643-1999 standard. Validity periods use standard date formats.

## Constraints on HTTP Interfaces and External Systems from These Characteristics
Structured fields for ID cards have clear format requirements. Unstructured data takes the form of image files. Data sources enforce call frequency limits. These traits require FastGPT’s HTTP component to support two input parameter formats: JSON validation for structured fields, and form submission for unstructured files. Interface input parameters must include regular expression validation for ID numbers and date format validation logic, to filter invalid requests. The component must also adapt to data source call frequency limits, with configured request debouncing and retry mechanisms to avoid triggering third-party interface rate limits. Image file size and format restrictions also require external systems to complete format conversion and size validation before making calls, to meet the receiving requirements of third-party interfaces.

## How to Set Configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `http_request_timeout` | `30 seconds` | Third-party interfaces for ID verification typically respond within 10-20 seconds. This setting provides sufficient buffer to avoid timeout interruptions |
| `multipart_upload_enabled` | `Yes` | ID card image files must be submitted via form data, which complies with the upload requirements of third-party KYC interfaces |
| `param_validation_strictness` | `Strict mode` | ID card field formats have mandatory specifications. Strict validation filters invalid requests early, reducing the number of erroneous calls to third-party interfaces |
| `retry_max_times` | `2 times` | Third-party KYC interfaces may experience temporary instability. A small number of retries improves verification success rates and avoids failure from a single request |
| `response_parse_mode` | `Structured field mapping` | Structured data returned by ID card KYC must be accurately mapped to preset fields to avoid parsing confusion |
| `file_size_limit` | `5 MB` | Typical size of ID card scans or photos does not exceed 2 MB. This setting reserves reasonable buffer space |

> The parameter values provided on this page are common recommendations for use as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. Testing on internal samples is recommended before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: A `getaddrinfo ENOTFOUND` error is returned during HTTP calls, and the request cannot be completed. Cause: The KYC interface domain name configured for the external system is entered incorrectly, or the domain name cannot be properly resolved over the public internet.
- Symptom: Boolean fields parsed from the HTTP component become null values after being passed to the conditional judgment component. Cause: Type mapping for response fields is not configured. Boolean values returned by third-party interfaces are recognized as text types, and cannot be identified by the conditional judgment component.
- Symptom: The ID card verification process terminates early, and a format mismatch error is returned. Cause: Strict parameter validation mode is not enabled, and regular validation rules complying with GB 11643-1999 are not added for the ID number field. This causes invalid fields to enter subsequent processing flows.

## How to Verify Proper Configuration
- Initiate a single test call, pass standardized structured ID card data and image files, and review the full HTTP request log to confirm that input parameter formats match third-party interface requirements.
- Simulate error scenarios such as rate limiting and timeouts returned by third-party interfaces, to verify that the retry mechanism and error capture logic function correctly.
- Configure a conditional judgment component, pass the parsed boolean field, and confirm that the component can correctly recognize the field value and execute the corresponding logic.
- Check the external system's domain name configuration, confirm that the entered interface address has no spelling errors, and that it can be properly accessed from the current environment.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
