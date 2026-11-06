---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Versions
meta_description: Continuing Education: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Maintain Document Versions and Changes

## What this category's data looks like

This category's data typically includes course filing forms, study certificates, and credit recognition forms, which respectively serve the roles of course source, learning process, and final recognition. The course filing form records the course name, number, credit hours, filing date, and handler's signature; the study certificate records the learner's identity, study start and end dates, completed credit hours, and the issuing unit's seal; the credit recognition form summarizes the recognized credit hours, recognition date, and review signature. After the materials enter the knowledge base retrieval node, they participate in traceability as citation sources; when a retrieval hit occurs, the original text snippet and source identifier are returned. In terms of update cadence, when course filing or recognition criteria are adjusted, the current version is changed first, then a change record is registered; the old version remains archived and traceable, and citations point synchronously to the current version. Field characteristics center on four categories: names, quantities, dates, and signatures. The same name written differently, the same credit hours with different numbers, the same date in different formats, or a missing signature or receipt will all cause the two materials to fail to match.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length may be 0. The "version ledger and change records" are completed subsequently by AI nodes, code nodes, or manually. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Fields include course name, number, credit hours, filing date, and handler's signature; check whether the name and credit hours match those in the study certificate | Compare the course name, credit hours, and filing date in the two materials, and check whether the signature field and receipt are complete |
| Study certificate | Fields include learner identity, study start and end dates, completed credit hours, and issuing unit's seal; check whether the dates and quantities match those in the recognition form | Check the start and end dates, completed credit hours, and seal item by item, and record any discrepancies in the change records |
| Credit recognition form | Fields include recognized credit hours, recognition date, and review signature; check that the current version is unique and that citations point to that version | After changing one recognized credit hour, see whether the version number and citations are updated synchronously, and whether the old version is still traceable |
| Citation content output | The number of returned items matches the hit materials; being empty is also normal; the `quoteList` structure can be viewed in `responseData` (non-streaming module results returned with detailed output enabled) | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues to run through |

## Three common errors

- Symptom: the name and credit hours of the same record do not match between the course filing form and the study certificate. Cause: the two materials are entered separately, and the field criteria are not unified according to the current version.
- Symptom: the recognition form has been revised, but retrieval still cites the old version's content. Cause: the version was not synchronized, the change record was not registered, and the citation does not point to the current version.
- Symptom: the study certificate lacks the issuing unit's seal or receipt, but the recognition form has already been signed. Cause: a signature was missed during material circulation, and the signature and receipt were not archived together with the version.

## How to verify the setup

This feature's acceptance check: ask a question with original-text support, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check the citation structure of `quoteList` in `responseData`.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously; the citation limit only checks the tokens of the citation text, and the array item count is recorded separately.

- Open the search parameter panel and check the values item by item, confirming that the associated knowledge base is a knowledge base of the same vector model.
- Open the citation superscript in the conversation, and compare each citation against the source document to check whether it can point back to the original text paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
