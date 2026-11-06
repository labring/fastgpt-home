---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Handover
meta_description: Compliance Training: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Corporate compliance and safety training involves three types of materials: compliance training courseware, safety operating procedures, and exam records. Courseware contains the course name, applicable regulatory clauses, target trainees, class hours, version number, and release date; procedures contain operating steps, risk points, responsible positions, effective date, and approval signature; exam records contain trainees, exam paper version, score, invigilator signature, and receipt. When materials enter the knowledge base retrieval node, each is cited as an independent source for subsequent nodes to compare fields. In terms of update cadence, regulatory changes trigger courseware version replacement, process adjustments trigger procedure revisions, and exam records are archived by batch. Common field characteristics include: the name, quantity, and date of the same record do not match across two materials; versions are not synchronized; signatures or receipts are missing. The knowledge base retrieval node is responsible for returning the hit original text fragments and source identifiers as an array, providing traceable material for subsequent drafting and handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | The course name, applicable regulatory clauses, class hours, version number, release date, and approval signature are complete, and the course name is consistent with that in the exam records | Open the citation superscript and check whether the courseware fragment can be traced back to the original text; compare whether the course name, class hours, and date in the courseware and exam records are consistent; record the number of citations and the `quoteMaxToken` budget |
| Safety operating procedures | The operating steps, risk points, responsible positions, effective date, and approval signature are complete, and the version number is consistent with the currently executed version | Check whether the procedure citation fragment corresponds to the original text; check whether the effective date and the handover record date are of the same version; use `responseData` (non-streaming module results returned with detailed output enabled) to view the length of the citation array and confirm that the number of entries matches the hit materials |
| Exam records | The trainees, exam paper version, score, invigilator signature, and receipt are complete, and the exam paper version corresponds to the courseware version | Check whether the exam record citation fragment can be traced back to the original text; compare whether the exam paper version and courseware version are synchronized; use `quoteList` to expand a single citation and confirm that the source identifier corresponds to the original text paragraph |
| Handover records | The handover parties, handover date, material version numbers, and signature or receipt are complete, and are consistent with the versions of the materials handed over | Draft one according to the template and complete a handover, and see whether missing items are blocked; check whether the material version numbers in the handover record are consistent with the courseware and procedure version numbers |

## Three common errors

- Symptom: The course name, class hours, and date of the same training record do not match between the courseware and the exam records. Cause: The two materials are maintained separately and are not checked against the original text via the same source identifier.
- Symptom: The procedure has already been version-replaced, but the handover record still cites the old version number, and the signature or receipt is missing. Cause: The versions are not synchronized, and the fields were not checked item by item according to the template before handover.
- Symptom: There is no citation superscript in the answer, and the citation array is empty yet there is still an answer. Cause: No materials were hit in this round; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, check whether the citation array and superscript can be traced back to the original text, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through.

Business test: draft one according to the template and complete a handover, and see whether missing items are blocked.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and use `responseData` to view the length of the citation array.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
