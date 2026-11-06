---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Handover
meta_description: Continuing Education: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category involves three types of materials: course filing forms, study certificates, and credit hour recognition forms. The course filing form records the course name, number, class hours, and start date, and is the original basis for the source of credit hours; the study certificate is issued by the teaching institution and contains the learner's name, course name, completion date, and institutional seal, and is used to prove actual participation; the credit hour recognition form summarizes the recognition results and contains the number of recognized credit hours, recognition date, handler, and approval signature, and is the core credential for issuance and handover. When these three types of materials enter the knowledge base retrieval node, each plays a different role: the filing form provides the course definition, the study certificate provides the fact of participation, and the recognition form provides the recognition conclusion. Materials are updated by batch; within the same batch, versions and dates must be consistent, and signatures and receipts must be complete. Missing fields, or mismatches in names, quantities, or dates between two materials, will be exposed during drafting and handover.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The draftable materials and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Fields include course name, number, class hours, and start date; consistent with the course name and class hours in the study certificate and recognition form | Check whether the vector models of the selected knowledge bases are the same, compare the course name and class hours item by item, and see whether the citation superscript can point back to the original paragraph in the filing form |
| Study certificate | Fields include learner name, course name, completion date, and institutional seal; corresponds to the course name in the filing form and the recognized credit hours in the recognition form | Run a test with a question that has no matching materials to confirm that the citation array is empty while the chain still works; then compare the cited snippet against the source document to see whether it matches the original text |
| Credit hour recognition form | Fields include the number of recognized credit hours, recognition date, handler, and approval signature; version and date are consistent within the same batch, and receipts are complete | Open the search parameter panel and check the values item by item; record the number of citations and the `quoteMaxToken` budget, and register them separately without comparing them for equality |
| Handover record | Fields include transferor, receiver, handover date, material list, and version number; missing signature or receipt is regarded as incomplete | Draft one according to the template and complete one handover to see whether missing items are blocked; check the citation source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The same course name is written differently in the filing form and the study certificate, and the quantity and date also do not match. Cause: During drafting, the filing form definition was not used as the standard, and the two materials were filled in separately.
- Symptom: The recognition form has been updated to a new version, but the study certificate is still the old version, and the date and credit hours are inconsistent. Cause: The versions were not synchronized, and the version number and date were not checked during handover.
- Symptom: The recognition form lacks the handler's signature or the receiving receipt, but the materials are still advanced to the next step. Cause: The handover record did not list signatures and receipts as required fields.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain still works.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, record the number of citations and the `quoteMaxToken` budget, and check the source identifiers against `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
