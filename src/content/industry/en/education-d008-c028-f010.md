---
title: Citations and Source Traceability for Vocational College Program Registration: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Access
meta_description: Vocational Programs: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Manage Authorized Access and External Services

## What this category's data looks like

Vocational college program filing materials are mainly of three types: the program filing form, the talent demand justification, and the faculty and equipment list. Fields include program name, program length, planned enrollment number, justification date, equipment quantity, signatures, and receipts. The filing form provides the program name, program code, and program length; the talent demand justification provides industry positions, demand quantity, and justification date; the faculty and equipment list provides the number of teachers, title structure, equipment names, and unit counts. After these three types of materials enter the knowledge base retrieval node, each participates in citation output as an independent source and is not merged into a single record. The update cadence advances by academic year and batch: newly established programs complete justification before application, the filing form is replaced in sync with the approval receipt, and the faculty and equipment list is supplemented with signatures before acceptance. When materials enter this feature, the filing form carries the program identity, the justification and list carry conditional support, and the source identifier retains the document name and paragraph position to facilitate referring back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length may be 0. "Externally available entry points and authorization scope" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program filing form | Fields include program name, program code, program length, planned enrollment number, signature, and receipt date, and are consistent with the same-named program in the talent demand justification and faculty and equipment list | In the node, check the selected knowledge base and embedding model, open the citation markers, and refer back item by item to the original paragraphs of the filing form |
| Talent demand justification | Fields include position name, demand quantity, justification date, and signature of the justifying unit, and the demand quantity does not conflict with the planned enrollment number in the filing form | Run a trial with a question that has no matching materials, see that the citation array is empty while the chain continues, then check the citation source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) |
| Faculty and equipment list | Fields include number of teachers, title structure, equipment names, unit counts, and acceptance signature, and the equipment unit counts are consistent with the reporting basis in the filing form | Open the search parameter panel and check the values item by item, record the number of citations and the `quoteMaxToken` budget of the citation text, and record the two separately without comparing them for equality |
| Citation output chain | Citation content is output as an array, and the length may be 0; even if no content is retrieved, the output chain still completes | In the conversation, open the citation markers, compare against the source documents, and check the original text fragment and source identifier of each citation in `quoteList` |

## Three common errors

- Symptom: the name or planned enrollment number of the same program does not match between the filing form and the talent demand justification. Cause: the two materials are filed separately, versions are not synchronized, and there is no unified receipt number.
- Symptom: the faculty and equipment list lacks an acceptance signature or receipt, and the citation fragment cannot refer back to the complete original text. Cause: the material is entered into the knowledge base first and signed later, so the entered version and the signed version are inconsistent.
- Symptom: the citation array is empty but an answer is still generated, which is misjudged as a retrieval failure. Cause: an empty array is normal output; when no material is matched, the chain still completes and this is unrelated to retrieval failure.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, check whether the citation array and markers can refer back to the original text, and check the source identifiers in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the chain completes.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Open the citation markers, compare item by item against the source documents, check whether the citation fragments are consistent with the original paragraphs, and record the number of citations.
- Open the search parameter panel and check the values item by item, record the `quoteMaxToken` budget of the citation text, and record it separately from the array count.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
