---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Multilingual
meta_description: Kindergarten Safety: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the category of kindergarten safety protection and emergency drills. The materials come from hazard inspection records, rectification notices and closed-loop evidence, drill plans and sign-in sheets, access control and school bus checklists, responsible person signature pages, etc. Multilingual materials and terminology handling allow these materials to each take on different roles when entering the knowledge base retrieval node: the terminology glossary and comparison drafts are responsible for unifying translated names, hazard items and rectification deadlines are responsible for determining closure, drill headcount and sign-in are responsible for checking whether records match the plan, access control and school bus check items are responsible for identifying omissions, and responsible person signatures are responsible for confirming attribution of responsibility. The update rhythm follows the inspection and drill cycle. Field characteristics are mostly short sentences, numbers, dates, and signatures. The same term is prone to drift in wording across materials in different languages, so citation sources and traceability are needed to ensure that translated names can refer back to the original text.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The unified terminology glossary and comparison drafts must be handled subsequently by AI nodes, code nodes, or humans. This step is executed by the citation output of the knowledge base retrieval node, outputting an array of cited content, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Unified terminology glossary and comparison drafts | The same term must be written consistently throughout, and the translated name must be able to refer back to the original text; hazard items and rectification deadlines must correspond one by one | Open the citation markers in the conversation, check whether each citation can refer back to the original paragraph, and record the number of citations and the `quoteMaxToken` budget |
| Drill plans and sign-in sheets | The drill headcount and sign-in records must be consistent with the plan, and there must be no mismatch between records and the plan | Run a test with a question that has no matching materials, see whether the citation array is empty while the chain continues, then check the hit situation in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Access control and school bus checklists | Check items must be listed completely item by item, with no omissions; responsible person signatures must correspond to the check items | Open the search parameter panel and check the values item by item, and compare the source documents to check whether the cited fragments are consistent with the original text |
| Hazard inspection and rectification evidence | Hazard items and rectification deadlines must be closed-loop, and evidence before and after rectification must be complete | In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model |

## Three common errors

- Phenomenon: In the hazard inspection records, hazard items are not closed-loop, and the rectification deadline column is blank. Cause: When the materials enter retrieval, only the inspection fragment is retrieved, the rectification evidence is not retrieved, and the citation array lacks the basis for closure.
- Phenomenon: Drill records do not match the plan, and the sign-in headcount does not match the plan headcount. Cause: The plan and sign-in belong to different materials, retrieval hits one of them, and the other does not enter the citation array.
- Phenomenon: Access control and school bus check items are omitted, and responsible person signatures are missing. Cause: Checklist versions differ, retrieval hits an old version of the checklist, and the cited fragments do not match the current original text.

## How to verify the setup

This feature acceptance: Ask a question with original text support, and check whether the citation array and markers can refer back to the original paragraph; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: Sample three terms to check whether their wording is consistent throughout, and check whether the translated names can refer back to the original text.

- Open the citation markers in the conversation, compare them one by one against the source documents, and confirm that the cited fragments correspond to the original text.
- Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, then check the hit situation in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
