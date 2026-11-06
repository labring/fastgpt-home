---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Versions
meta_description: Pastoral Education: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Maintain Document Versions and Changes

## What this category's data looks like

This page focuses on data versions and change maintenance in the context of school moral education and homeroom teacher work. The core materials include themed class meeting plans, student comprehensive quality records, and home visit records. A themed class meeting plan contains activity objectives, procedures, date, and homeroom teacher signature; a student comprehensive quality record contains evaluation dimensions, semester date, and student and teacher signatures; a home visit record contains visit time, location, subject, content summary, and parent receipt. When these materials enter the knowledge base retrieval node, each serves as an independent knowledge base or a document collection within the same knowledge base, providing original text snippets and source identifiers for citation output. In terms of update cadence, class meeting plans iterate each semester or per theme, comprehensive quality records are updated per semester or academic year, and home visit records are generated per visit. Field characteristics require that the name, quantity, and date of the same record remain consistent across different materials, signatures or receipts are complete, and version numbers stay in sync with citations.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original text snippet and a source identifier, and the length can be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | The activity name, date, and signature in the plan are consistent with the old version record, and the citation can point back to the original text | In the node, check the selected knowledge base collection and vector model; open the citation marker to compare against the source document; run a test with a non-matching question to see that the output is empty while the pipeline continues |
| Student comprehensive quality record | The evaluation dimensions, quantity, and semester date in the record match another material, and signatures are complete | Check that the search parameters are consistent with the values in the knowledge base retrieval section; check whether the citation snippet corresponds to the original paragraph; register the number of citations and the `quoteMaxToken` budget separately |
| Home visit record | The home visit time, subject, and content summary are complete with the parent receipt, and the version number is updated in sync with the citation | After changing one home visit date, retrieve again to see whether the citation array updates in sync; check whether the citation source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` point to the new version |
| Knowledge base retrieval node | Citation content is output as an array, the length can be 0, and an empty array also completes the pipeline | Run a test with a question that has no matching material to confirm that the output is empty while the pipeline continues; check that the selected knowledge base uses the same vector model |

## Three common errors

- Symptom: the name and date of the same themed class meeting plan do not match across two materials. Cause: the version was not synchronized, the old version citation is still being retrieved, and the knowledge base or external document was not updated in time.
- Symptom: the quantity in the student comprehensive quality record is inconsistent with another material, and the teacher signature is missing. Cause: fields were not compared item by item during maintenance, and signatures or receipts were not completed along with version changes.
- Symptom: there is no citation marker in the answer, or the citation snippet does not match the original text. Cause: the corresponding material was not hit in this round, or an old version snippet was hit; first verify the hit material, then check the trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline completes.

Business test: change one piece of content and see whether the version number and citation update in sync.

- Open the search parameters panel and check item by item to confirm consistency with the values in the knowledge base retrieval section; check that the selected knowledge base uses the same vector model.
- In the conversation, open the citation markers to compare against the source document, record the number of citations and the `quoteMaxToken` budget, and register the source identifiers in `quoteList` within `responseData` separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
