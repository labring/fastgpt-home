---
title: Citations and Source Traceability for Vocational College Program Registration: Track Progress and Check Statistics
slug: /en/industry/education-d006-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Progress
meta_description: Vocational Programs: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Track Progress and Check Statistics

## What this category's data looks like

Vocational college program offering filing materials usually consist of three documents: the program offering filing form, the talent demand justification, and the faculty and equipment list. The filing form carries the program name, code, enrollment scale, and program length; the justification material explains the correspondence with regional industries and the job gap; the faculty and equipment list sets out the number of full-time teachers, the title structure, and the practical training conditions. The three types of material form a sequence in time: justification first, list in support, and the filing form consolidated for submission. Field characteristics are concentrated in four categories: names, quantities, dates, and signature receipts, and the wording of the same program across different materials must remain consistent. When the materials enter the knowledge base retrieval node, each plays a different role: the filing form serves as the master record to locate the program entry, the justification material is used to verify the basis of demand, and the faculty and equipment list is used to verify the conditions for running the program. The update rhythm advances by academic year and application batch, and when versions iterate, old drafts must be replaced in sync, to avoid the same record having names, quantities, or dates that do not match across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length may be 0. The "progress table and statistical scope note" is completed next by a subsequent AI node, code node, or manually. Even if no content is retrieved, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Program offering filing form | Fields include program name, code, enrollment scale, program length, and signature column; dates and receipts must be consistent with the justification material | Bring up the cited fragments and compare field by field the program name, quantities, and dates in the filing form and the justification material; open the citation superscript to trace back to the original paragraph |
| Talent demand justification | Fields include industry correspondence, job gap, and justification conclusion; the version must be in sync with the filing form | Verify the date and signature of the justification conclusion; use the citation array to check whether the number of items and the hit materials are consistent, and record the array item count separately |
| Faculty and equipment list | Fields include the number of full-time teachers, title structure, and the number of practical training equipment units; missing signature or receipt means incomplete | Verify item by item the quantities in the list against the summary figures in the filing form; confirm that each citation can trace back to the original text, and that `quoteMaxToken` serves only as the citation content budget |
| Progress records and statistical scope | The number of records and the statistical figures must reconcile, and the scope must be stated in the header | Use one week of records to verify the total; check whether exceptions are noted with their scope in the header, and confirm the correspondence between each cited fragment and the original text one by one |

## Three common errors

- Symptom: the name or enrollment quantity of the same program does not match between the filing form and the justification material. Cause: the two materials were revised separately, the versions were not synchronized, and the old draft was not replaced.
- Symptom: the faculty and equipment list lacks a signature or receipt, yet the progress table still records it as submitted. Cause: the signature column was not included in the verification fields, and the receipt was not archived.
- Symptom: the answer has no citation superscript, or the cited fragment does not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

This feature's acceptance: ask a question that has a basis in the original text, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through.

Business test: use one week of records to verify the total, and see whether the scope and exceptions are clearly stated.

- Open the search parameter panel and verify the values item by item, confirming that the associated knowledge base uses the same vector model; check whether the number of citations and the hit materials in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are consistent.
- Open the citation superscript in the conversation and trace back to the original text item by item against the source document; run a test with a question that has no matching material, and see whether the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
