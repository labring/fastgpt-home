---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Handover
meta_description: Research Agreements: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

At the signing stage of a research project task statement, the materials are mainly the project task statement, the project task breakdown table, and the budget statement. The three belong to the same record family, and their fields interlock: the project task statement provides the name, start and end dates, and signature block; the project task breakdown table provides the project name, responsible person, quantity, and milestone dates; the budget statement provides the subject name, amount basis, and preparation date. The sources are the template library and historical archived documents of the research management department, and the update cadence follows the application batches and revision rounds. A common field characteristic is that the name, quantity, and date of the same record are each written as one set in two materials. When entering the knowledge base retrieval node, the three materials each exist as original-text passages that can be traced back to, with the task statement taking the role of the general outline, the breakdown table taking the role of project-level fields, and the budget statement taking the role of funding basis. The citation output is only responsible for bringing out the hit original-text fragments and source identifiers, and is not responsible for replacing any of the materials.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain will still run through. The material drafts that can be issued and the handover records are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task statement | Fields are complete, the responsible person is clear, and the version and date are consistent; check the name, start and end dates, and signature block | In the node, check the selected collections and their vector models, open the search parameter panel and check item by item, then see whether the cited fragments can be traced back to the original-text passages of the task statement |
| Project task breakdown table | The name, quantity, and date of the same record do not match across the two materials; check the project name, responsible person, quantity, and milestone dates | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, then check the quantity and date against the original text of the breakdown table |
| Budget statement | The version is not synchronized, or the signature or receipt is missing; check the subject name, amount basis, preparation date, and signature block | Open the citation superscript in the conversation, compare against the source document, record the number of array entries and the tokens of the cited text, and look at `quoteMaxToken` separately |
| Handover record | The responsible person is clear, and the version and date are consistent; check the recipient, handover date, and receipt | Draft one according to the template and complete one handover, see whether missing items are blocked, then see whether the citation array and superscript can be traced back to the original text |

## Three common errors

- Symptom: there is no citation superscript in the answer. Cause: no materials were hit in this round, or the citation array is empty; first check the hit situation, then look at the search parameters.
- Symptom: the name, quantity, and date of the same record do not match across the two materials. Cause: the versions are not synchronized, and the task statement and the breakdown table each keep one set of fields.
- Symptom: there is an answer but the citation array is empty. Cause: an empty array is a normal output and does not mean retrieval failed; check whether there really are no matching materials.

## How to verify the setup

Acceptance of this feature: ask a question that has original-text support, check whether the citation array and superscript can be traced back to the original text, record the number of array entries and the tokens of the cited text; `quoteMaxToken` is a content budget and is not compared for equality; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` according to the node's actual output.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, then check the cited fragments against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
