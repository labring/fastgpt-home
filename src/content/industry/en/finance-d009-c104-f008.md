---
title: Tool Calling and Plugins for Glass Research Report Retrieval
slug: /en/industry/finance-d009-c104-f008
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Glass Research Report Retrieval
meta_description: Glass research report data comes from four main sources: national building materials industry association industry statistics, commodity spot trading
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Glass Research Report Retrieval

## What the data for this category looks like
Glass research report data comes from four main sources: national building materials industry association industry statistics, commodity spot trading platform real-time quotes, securities firm building materials sector research reports, and national import and export statistical data.

Spot quote data is updated multiple times per day.
Industry monthly reports are released on fixed dates each month.
Securities firm research reports are released primarily during earnings seasons and periods of price volatility.

Document structures include structured price tables, production capacity statistics, unstructured policy interpretations, and market analysis.
Fields include product category, quotation unit, production capacity unit, release date, releasing institution, and other relevant fields.

## What constraints these characteristics impose on tool calling and plugins
Glass research report data is dispersed across multiple sources. Tool calling must connect to APIs or file import interfaces from multiple data source types simultaneously, and support parallel pulling and integration of data.

Different data sources have widely varying update frequencies. Configure differentiated scheduled synchronization rules for different data types to avoid unnecessary pulls or delayed updates.

Document structures mix structured tables and unstructured text. Tool calling must support mixed parsing modes to extract both standardized numerical fields and interpretive content.

Field units follow specific specifications. Complete automatic unit calibration and field mapping during tool calling to prevent data confusion.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxRecallNum` | `10–15 entries` | Individual glass research reports contain multiple sets of price and production capacity data. Too many recalled entries will cause excessive context redundancy. Too few will fail to cover complete market information |
| `parseMode` | `Structured + mixed parsing` | Glass research reports include standardized price tables and unstructured policy interpretations. Mixed parsing can extract both structured fields and interpretive content |
| `syncInterval` | `Spot data sources every 3600 seconds, industry reports every 86400 seconds` | Spot prices fluctuate frequently, requiring high-frequency synchronization. Industry reports have long update cycles, so lower synchronization frequencies can save resources |
| `allowedDataSource` | `Building Materials Industry Association API, Broker Research Report Library, Spot Trading Platform` | Glass research report data is dispersed across three types of channels. Configuring a whitelist limits valid data sources and prevents invalid data from being integrated |
| `fieldMapping` | `Map "quotation" to yuan/weight box, "production capacity" to ten thousand weight boxes per year` | Different data sources use inconsistent field naming. Unified mapping ensures consistent data formatting |
| `requestTimeout` | `600 seconds` | Some industry association APIs have slow response times. Extending the timeout period prevents normal calls from being incorrectly marked as failed |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: No referenced knowledge base ID field is returned after calling the chat interface. Cause: The `enableReturnSourceInfo` configuration item is not enabled, so the interface does not return reference source metadata.
- Symptom: Database connection tools fail to connect to Oracle databases. Cause: Oracle driver dependencies are not added to the data source configuration, and corresponding connection protocols and port parameters are not configured.
- Symptom: Email sending plugins fail to complete sending after configuration. Cause: Correct SMTP server address and authorization code are not filled in the plugin configuration, resulting in missing necessary authentication information during plugin calls.

## How to confirm configurations are correct
- Call the FastGPT chat interface, check if the `sourceInfo` field is included in the returned results, and confirm that the field contains the knowledge base ID and referenced research report fragments.
- Enter the data source configuration page, test connections for all configured data sources, and confirm that all connection statuses are normal.
- After starting the local MCP service, initiate a call on the FastGPT plugin debugging page, and confirm that the returned glass research report data matches the local data source.
- After configuring the email sending plugin, initiate a test call, and confirm that the plugin returns a `200 OK` status code.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
