---
title: Citation Source and Traceability for District Heating Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c095-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for District Heating
meta_description: District heating category data mainly comes from thermal company SCADA collection systems, energy consumption monitoring platforms, meteorological
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for District Heating Investment Research Knowledge Base Construction

## What the data for this category looks like
District heating category data mainly comes from thermal company SCADA collection systems, energy consumption monitoring platforms, meteorological linkage interfaces, and pipe network operation and maintenance document libraries. Real-time measurement point data such as pipe network pressure and water supply temperature updates at a second-to-minute level. Batch operation and maintenance documents including maintenance reports and energy consumption monthly reports update in daily batches. Each single data document includes fields such as measurement point ID, timestamp, real-time value, threshold range, and operation and maintenance notes. Units include industrial general measurement standards such as MPa, m³/h, and ℃. There are no redundant non-business fields.

## What constraints these characteristics impose on the citation source and traceability link
The second-level update requirement of real-time measurement point data requires traceability to bind timestamps accurate to the second, to avoid referencing expired historical pipe network status data. The associated characteristics of multiple measurement points require traceability to simultaneously associate measurement point IDs and collection sources, to ensure that referenced data comes from real pipe network nodes. Industrial measurement unit requirements require traceability to retain complete unit information, to prevent mismatches between values and business scenarios. The batch update requirement for batch operation and maintenance documents requires traceability to associate maintenance batch numbers, to facilitate tracing pipe network operating conditions during corresponding periods. At the same time, business compliance requirements for thermal data require that traceability information can be audited, and collection sources and update times cannot be hidden.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `recall_top_k` | Top 10 to 15 entries | Thermal data includes multiple associated measurement points, requiring coverage of sufficient pipe network node data |
| `similarity_threshold` | 0.75 to 0.85 | Thermal data has high business correlation requirements, requiring filtering of low-match unrelated data |
| `reference_field_include` | `Measuring Point ID, Timestamp, Collection Unit` | Retain core identifiers and measurement information of thermal data to ensure clear traceability |
| `max_source_age` | 3600 seconds | Limit the reference validity period of real-time thermal data to avoid using expired pipe network status data |
| `workflow_ref_plugin_sync` | Enabled | Ensure that when importing workflows across environments, associated thermal data traceability plugins can sync normally |
| `parse_heat_doc_timeout` | 600 seconds | Adapt to the longer length of thermal operation and maintenance documents to avoid parsing timeouts |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: After exporting a workflow and its associated JSON files and importing them into a new environment, the thermal data traceability plugin referenced in the workflow cannot be found. Cause: The `workflow_ref_plugin_sync` configuration is not enabled, and the bound thermal data source plugin configuration is not synced.
- Symptom: The end of the knowledge base answer paragraph displays "No permission to operate this conversation record", and reference content cannot be displayed normally. Cause: `reference_permission_control` is not configured as disabled, or access permissions for traceability data of conversation records are not enabled.
- Symptom: The number of citation sources returned by knowledge base searches is far lower than expected. Cause: The value of `recall_top_k` is too low, failing to cover associated data of multiple thermal pipe network measurement points.

## How to confirm correct configuration
- Enter the knowledge base configuration page, check if `source_trace_enable` is enabled, and confirm that the reference field list includes exclusive thermal data identifiers such as measurement point ID, timestamp, and collection unit.
- Initiate a search that includes thermal measurement point keywords, check if the reference column of returned results displays complete collection time and unit information.
- Export the workflow configuration of the current environment, import it into a test environment, and confirm that the associated thermal data traceability plugin loads normally without errors.
- Adjust `recall_top_k` to the recommended range, then search and verify that the number of returned citation sources meets business expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
