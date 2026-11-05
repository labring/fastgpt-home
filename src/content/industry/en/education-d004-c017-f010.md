---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Handover
meta_description: Undergraduate Programs: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers three types of materials: program establishment application forms, talent cultivation plans, and expert review opinions. The application form carries fields such as program name, code, length of schooling, degree-granting category, faculty, and conditions, and serves as the basis for initiating establishment; the cultivation plan carries the curriculum system, credit structure, practical components, and graduation requirements, and is updated along with review and revision; the expert review opinions carry review conclusions, expert lists, dates, and signatures, and are the key evidence for responsibility handover. When the materials enter the knowledge base retrieval node, the three reference one another: the application form fields must be consistent with the cultivation plan, and the review opinions must point back to the former two, forming a traceable chain. In terms of update rhythm, drafting is concentrated during the application period, repeated revisions occur during the review period, and archiving for the record happens after approval. Field characteristics center on names, quantities, dates, signatures, and version numbers; any inconsistency in any one of these will block issuance and handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program establishment application form | Fields, dates, and signatures are complete, and the name is consistent with the cultivation plan | Retrieve the original application form, check the program name, code, length of schooling, and signature fields item by item, and use `quoteList` to record missing items |
| Talent cultivation plan | Course, credit, and practical component quantities match the application form, and versions are synchronized | Compare the course and credit quantities in the two materials, check the version number and date, and use `responseData` (non-streaming module results returned with detailed output enabled) to retain the comparison results |
| Expert review opinions | Review conclusions, expert lists, dates, and signatures can point back to the first two materials | Open the citation marker to point back to the original review opinions, check the list and dates, and block handover if the receipt is missing |
| Cited content output | The number of returned entries matches the hit materials, and being empty is also normal | Run a test with a question that has no matching materials, and see that the array is empty while the chain continues; `quoteMaxToken` is only used as the content budget |

## Three common errors

- Symptom: the same program name is written differently in the application form and the cultivation plan. Cause: the field wording was not unified during drafting, and no character-by-character comparison was made before handover.
- Symptom: the course quantity or credits do not match between the two materials. Cause: after the cultivation plan was revised, it was not synchronized back to the application form, and the versions were not synchronized.
- Symptom: the review opinions lack expert signatures or the handover has no receipt. Cause: the responsibility handover step did not check the signature field and receipt, and missing items were not blocked.

## How to verify the setup

Acceptance of this function: ask a question with source-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge bases use the same vector model, and open the search parameter panel to check the values item by item.
- Against the source documents, check whether each citation can point back to the original paragraph, record the number of array entries, and separately check the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
