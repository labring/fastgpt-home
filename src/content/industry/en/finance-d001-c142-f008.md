---
title: Tool Invocation and Plugins for ID Card KYC
slug: /en/industry/finance-d001-c142-f008
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Tool Invocation and Plugins for ID Card KYC
meta_description: ID card data originates from user-uploaded physical document scans, captured photos, or structured verification results returned by government service
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Invocation and Plugins for ID Card KYC

## What data for this category looks like
ID card data originates from user-uploaded physical document scans, captured photos, or structured verification results returned by government service APIs. The document structure has two layers: image layer and structured field layer. The image layer contains portraits, document national emblems, and layout elements. Most formats are JPG or PNG, and resolution typically requires no less than 300 dpi. The structured field layer includes standard text fields such as full name, citizen ID number, residential address, issuing authority, and validity period. It has no additional special units. Update frequency follows either a single submission verification cycle or the synchronization cycle of the connected API.

## What constraints these characteristics impose on tool invocation and plugins
ID card data includes both image and structured field carriers. This requires the tool invocation chain to cover three steps: image decoding, layout positioning, and field verification. Physical ID card images have fixed layout features. Configure layout recognition trigger rules in the plugin to avoid interference from non-target areas during recognition. Structured fields must follow national unified standard formats. The plugin must include built-in check logic for citizen ID number check digits and validity period formats. When connecting to government data sources, configure API field mapping rules to convert non-standard fields returned by government APIs into standard fields recognizable by the platform. Single verification tasks have large image data volumes. Adjust the tool invocation timeout threshold to match processing durations.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_IMAGE_TIMEOUT` | `60–120 seconds` | Average processing time for ID card image decoding, layout positioning, and field extraction is 30–90 seconds. Reserve buffer time to cover network latency scenarios |
| `UPLOAD_FILE_MAX_SIZE` | `10 MB` | Typical file size for high-definition ID card scans is 2–8 MB. Set an upper limit to avoid excessive storage and processing resource usage |
| `FIELD_VALIDATION_RULES` | `Enable ID number check digit and validity period format verification` | Match national unified ID card field standards, filter verification data with incorrect formats |
| `IMAGE_PREPROCESS_THRESHOLD` | `0.88–0.92` | Adapt to slightly blurry or angularly offset ID card images, balance layout recognition accuracy and recall rate |
| `STREAM_RESPONSE_TIMEOUT` | `180 seconds` | Full-process processing time for cross-government data source verification is long. Adjust the stream response timeout threshold separately |
| `PLUGIN_AUTH_TYPE` | `API_KEY authentication` | Universal authentication method for connecting to third-party verification interfaces, complies with industry security specifications |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Address specific issues on a case-by-case basis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- The symptom is a `408 Request Timeout` error returned when calling the plugin. The cause is failure to adjust the `PARSE_IMAGE_TIMEOUT` configuration. The default timeout duration is insufficient to cover the ID card image decoding and recognition process.
- The symptom is incorrect citizen ID number field format in plugin-returned verification results. The cause is failure to enable the `FIELD_VALIDATION_RULES` configuration. No national unified standard verification is performed on structured fields.
- The symptom is "stream response empty" prompt during the image decoding step. The cause is failure to specify decoding model parameters adapted to ID card images, or model output format does not match platform requirements.

## How to confirm configurations are set correctly
- Upload a standard ID card image, trigger plugin invocation, check if the returned `parse_status` field is `success`. Adjust timeout configurations based on actual processing duration.
- Import a sample citizen ID number with incorrect format, trigger field verification, check if the plugin returns a format error prompt. Confirm that the verification rule configuration is active.
- Connect to a third-party verification interface, run a full process call, check if returned fields match the preset mapping rules. Adjust mapping rules until full match is achieved.
- Upload an ID card image exceeding the preset size limit, check if the platform triggers a file size limit prompt. Confirm that the upload limit configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
