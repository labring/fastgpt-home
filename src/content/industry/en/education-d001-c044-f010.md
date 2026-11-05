---
title: Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Find Supporting Evidence
slug: /en/industry/education-d001-c044-f010
page_type: 行业问题页
application_area: education
meta_title: Training Schedules | Citations | Evidence
meta_description: Training Schedules: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Training Provider Scheduling and Lesson Records: Find Supporting Evidence

## What this category's data looks like

For class scheduling and class-hour deduction in training institutions, the materials include class schedules, class-hour deduction records, class-change applications, as well as the institution's own academic administration policies and parent receipts. A class schedule carries fields for class, teacher, time slot, and classroom; a class-hour deduction record carries the student, number of class hours, date, and signature; a class-change application carries the original time slot, new time slot, reason, and approval signature. These materials are updated by semester or by month, and the current published version prevails; historical versions must not be mixed into the current basis. When entering the knowledge base retrieval node, the class schedule, class-hour deduction records, and class-change applications are each associated as independent sources, and after a retrieval hit, the cited snippet points back to the original passage. In cross-material inquiries, the name, quantity, or date of the same record may not match across two materials, and versions may be out of sync or signature receipts may be missing, so a basis item must be able to point back to a specific source and passage for subsequent field comparison, ledger writing, or replying to parents.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original passage and a source identifier, and the length may be 0. Even if no content is found, the output chain still runs through. The "basis items that can point back to the original text" are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class schedule | Whether the class, teacher, time slot, and classroom fields and the current version date are complete, and whether they are consistent with the class name in the class-hour deduction records | In the conversation, open the citation marker, point back to the original passage in the class schedule, and verify the fields and date; use `quoteList` to view the details of the hit materials |
| Class-hour deduction record | Whether the student, number of class hours, date, and signature are complete, and whether the name, quantity, and date of the same record can be matched in the class schedule and class-change application | Compare the fields one by one against the source document; the number of cited items is the array length, and the tokens of the cited text are separately verified with `quoteMaxToken` |
| Class-change application | Whether the original time slot, new time slot, reason, and approval signature are complete, and whether they are in sync with the versions of the class schedule and class-hour deduction records | Open the citation marker to point back to the original application; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation output structure for this round and confirm that each item contains the original passage and a source identifier |
| Cited content output | The number of returned items matches the hit materials; being empty is also normal, and the output chain continues | Run a test with a question that has no matching materials and see that the array is empty while the chain runs through; then ask a question with an original-text basis and verify whether the citation marker can point back to the original text |

## Three common errors

- Symptom: The class hours for the same student do not match between the class-hour deduction record and the class-change application. Cause: The two materials are maintained separately, names or quantities are not unified, and the cited snippet must point back to the original text for comparison.
- Symptom: The class schedule has been updated, but the class-hour deduction record still cites the old version. Cause: The versions are out of sync, the current version does not cover historical materials, and the basis item may point to an outdated passage.
- Symptom: The class-change application lacks an approval signature or parent receipt. Cause: The process is not closed-loop; although the cited snippet can point back to the original text, the material itself is incomplete and cannot be used directly as a basis for a reply.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis and verify whether the citation array and citation marker can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. The number of cited items is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality. If a citation upper limit is involved, verify the tokens of the cited text, and record the array item count separately.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and then use it to compare the fields, dates, and signatures of the class schedule, class-hour deduction records, and class-change applications.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, confirming that they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
