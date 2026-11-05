---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Access
meta_description: Kindergarten Safety: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Manage Authorized Access and External Services

## What this category's data looks like

In the kindergarten safety protection and emergency drills category, materials include hazard items and rectification deadlines, drill participant counts and sign-ins, access control and school bus inspection items, and responsible person signatures. Sources are kindergarten inspection forms, drill plans and sign-in sheets, access control and school bus inspection records, and responsibility signature pages. The update cadence advances with daily inspections, each drill, and weekly access control and school bus checks, while signature pages are supplemented after the rectification loop is closed. When materials enter the knowledge base retrieval node, each assumes the role of cited source text: hazard items correspond to rectification deadlines, drill participant counts correspond to sign-ins, access control and school bus inspection items correspond to missing-item verification, and responsible person signatures correspond to closure evidence. In the authorized access and external services stage, parents or superiors match the visible scope by identity, and unauthorized content is not visible.

## Configuration and implementation checks

This stage is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the source text fragment and source identifier, and the length can be 0. "External-facing entry points and authorization scope" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard items and rectification deadlines | Whether the hazard is closed and whether the rectification deadline can be traced back to the source text | At the citation superscript, compare against the original inspection form text to check whether hazard items and rectification deadlines appear in pairs and whether unclosed items are still visible |
| Drill participant counts and sign-ins | Whether the drill record is consistent with the plan and whether the sign-in count matches | Open the cited source document and compare the drill plan, sign-in sheet, and cited fragment item by item, recording any participant count discrepancies |
| Access control and school bus inspection items | Whether inspection items are missing and whether responsible person signatures are complete | Access once with a restricted identity and check whether access control and school bus inspection items and responsible person signatures are complete within the visible scope |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues, and check the values of `quoteList` and `quoteMaxToken` |

## Three common errors

- Symptom: A hazard item has been registered but the rectification deadline is not closed, yet it is still externally visible. Cause: The inspection form and rectification signature page were not updated in sync, and the cited fragment remains on the old version.
- Symptom: The drill record does not match the plan, and the sign-in count does not match. Cause: After the plan was revised, the sign-in sheet was not re-entered, and the cited source points to the old plan paragraph.
- Symptom: Access control and school bus inspection items are missing, and responsible person signatures are absent. Cause: Inspection records were entered in multiple sessions, and the citation array only hit some entries, not covering all inspection items.

## How to verify the setup

Acceptance for this feature: ask a question with source-text support and check whether the citation array and superscripts can be traced back to the source text; then ask a question with no matching materials, confirm the array is empty while the pipeline runs through, and record the number of citations (array length) and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, confirm the citation array is empty while the output pipeline continues, and open the citation superscript to compare against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
