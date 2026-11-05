---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Operations
meta_description: Kindergarten Safety: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Coordinate Operations and Application Handover

## What this category's data looks like

This page addresses the kindergarten safety protection and emergency drill scenario. The materials come from hazard rectification forms, drill plans and sign-in sheets, access control and school bus inspection records, and responsible person signature pages, with an update cadence of refreshing once before each shift handover. When these materials enter the knowledge base retrieval node, each plays a different role: hazard rectification forms provide hazard items and rectification deadlines, used to determine whether the loop is closed; drill plans and sign-in sheets provide drill headcount and sign-ins, used to compare whether the plan matches the actual situation; access control and school bus inspection records provide item-by-item inspection results, used to detect missing items; responsible person signature pages provide signature confirmation, used to confirm the attribution of handover responsibility. Materials are ingested in batches by shift or rectification cycle. Field characteristics include hazard number, deadline, headcount, inspection item number, and signature position. During retrieval, they are cited in the form of original text fragments, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still completes. The handover-ready deployment status and operation records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard rectification form | Whether the hazard items and rectification deadlines are closed-loop, and whether the responsible person's signature is in place | Open the citation corner mark to compare against the original text, and check the hazard number, deadline, and signature position; record the array length and the `quoteMaxToken` budget, and do not compare the two against each other |
| Drill plan and sign-in sheet | Whether the drill headcount and sign-ins are consistent with the plan, and whether there are any missing items | Compare the sign-in records item by item against the plan entries, and check whether the cited fragments can point back to the original paragraphs; record an empty array as usual |
| Access control and school bus inspection records | Whether inspection items are missing, and whether the access control and school bus inspection items are implemented one by one | Check the cited content item by item according to the inspection item numbers, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Responsible person signature page | Whether the signatures cover the three types of records: hazards, drills, and inspections | Open the citation corner mark in the conversation, compare against the original text of the signature page, and check whether the source identifiers in `quoteList` correspond to the material names |

## Three common errors

- Symptom: The hazard rectification form has citations, but the deadline has passed and it still shows as not closed-loop. Cause: Only the number of citations was checked, without comparing hazard items and rectification deadlines one by one, so the closed-loop judgment was skipped.
- Symptom: The drill records do not match the plan, and the headcount and sign-ins do not align. Cause: The cited fragments do not match the original text, the corner mark was not opened to point back to the plan entries, and the summary was directly trusted when comparing fields.
- Symptom: Access control and school bus inspection items are missing, but the handover form shows they are complete. Cause: An empty citation array was treated as a retrieval failure and skipped, and the inspection item numbers were not checked one by one, so missing items were not discovered.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and corner marks can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain completes, and separately record the array count and the `quoteMaxToken` budget, without making an equality comparison.

Business test: check once item by item according to the handover form, see which record is missing, and check whether the version, connection, and task records are consistent.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, and run a trial with a question that has no matching materials to see whether the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
