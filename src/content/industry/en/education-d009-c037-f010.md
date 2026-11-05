---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Multilingual
meta_description: Training Subsidies: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Handle Multilingual Materials and Terminology

## What this category's data looks like

Vocational training subsidy application materials mainly consist of training class filing records, attendance records, and completion assessment forms. Fields cover trainee name, ID number, class name, training start and end dates, number of class hours, assessment score, handler signature, and receipt. The material sources are submissions from training institutions and archiving by competent authorities, and the update cadence is synchronized with class completion and subsidy application batches. When entering the knowledge base retrieval node, the class filing records define the class and personnel scope, the attendance records verify the fact of attendance, and the completion assessment forms confirm results and signatures. In the multilingual materials and terminology handling scenario, the same term must be consistent throughout and its translated name must be able to refer back to the original text, and citation sources and traceability require that each cited fragment can be located to a specific material paragraph. If the material names, quantities, or dates do not match between two materials, the versions are not synchronized, or signatures or receipts are missing, the usability of the terminology glossary and the comparison draft will be affected.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is completed subsequently by a downstream AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models |
| Training class filing records | The class name, training start and end dates, trainee scope, and signature fields are complete and consistent with the attendance records | Compare field by field the names, quantities, and dates in the filing records and attendance records |
| Attendance records | The attendance dates and number of class hours match those recorded in the completion assessment forms, and no receipt is missing | Sample three records and check the dates, quantities, and signature receipts |
| Completion assessment forms | The assessment scores and completion dates correspond to the filed class, and signatures are complete | Check the scores, dates, and signatures against the filing records and attendance records |

## Three common errors

- Symptom: The names, quantities, or dates of the same record do not match between the class filing records and the attendance records. Cause: The two materials were entered separately, and no field-level comparison was performed.
- Symptom: The material versions cited by the terminology glossary and comparison draft are not synchronized. Cause: After the materials were updated, the knowledge base was not re-indexed, and the citations still point to the old paragraphs.
- Symptom: The completion assessment forms lack signatures or receipts. Cause: The submission process did not collect them completely, and the cited fragments cannot refer back to the complete original text.

## How to verify the setup

This feature's acceptance check: ask a terminology question that has an original-text basis, check whether the citation array and footnote markers can refer back to the original paragraphs, and record the number of array items and the tokens of the cited text. `quoteMaxToken` is only a content budget and is not compared for equality with the number of items.

Then ask a question with no matching materials, and confirm that the citation array is empty while the pipeline still runs. An empty array is a normal output and does not mean retrieval failed.

- Turn on citation footnote markers, check whether each cited fragment matches the original paragraph against the source document, and check the length of the citation array in `responseData` (non-streaming module results returned with detailed output enabled).
- Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, and open the search parameter panel to check the values item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
