---
title: Citations and Source Traceability for Corporate Sales and Product Training: Find Supporting Evidence
slug: /en/industry/education-d001-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Evidence
meta_description: Sales Training: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Find Supporting Evidence

## What this category's data looks like

In the enterprise sales product training scenario, product manuals, sales response messaging materials, and channel training schedules are the three core types of materials. Product manuals record product names, functional parameters, version numbers, and release dates; sales response messaging materials record communication messaging, objection handling, and applicable versions; channel training schedules record course names, training dates, participants, and signed acknowledgments. The three types of materials are maintained by different teams—product, sales, and channel—with differing update rhythms: manuals are updated with version iterations, messaging materials are adjusted with sales strategy, and schedules are generated according to scheduling. When the materials enter the knowledge base retrieval node, each assumes the role of a basis source: manuals provide product factual basis, messaging materials provide communication messaging basis, and schedules provide training record basis. In terms of field characteristics, names, quantities, dates, version numbers, and signatures are the key anchors for cross-material comparison. The name, quantity, and date of the same record may not match across two materials; unsynchronized versions, missing signatures, or missing acknowledgments are common inconsistencies.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing the original text fragment and source identifier, and the length can be 0. Even if no content is found, the output pipeline still completes. The basis entries that can be traced back to the original text are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Name, quantity, date, version number, and signature fields are consistent with the current version | In the node, check whether the selected knowledge base uses the same vector model, open `quoteList` to see whether the citation fragment corresponds to the original paragraph |
| Sales response messaging materials | Name, quantity, date, version number, and signature fields are consistent with the current version | Run a trial with a question that has no matching materials, and see whether the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues |
| Channel training schedule | Course name, training date, participants, signature or acknowledgment are consistent with the current version | Open the citation marker to compare against the source document, and register the number of citations and the `quoteMaxToken` budget separately |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the product manual and the sales response messaging materials. Cause: The two materials are maintained by different teams, their update rhythms are not synchronized, and their field definitions are not unified.
- Symptom: The channel training schedule version is not synchronized, and the old schedule is still retrieved. Cause: The knowledge base was not re-ingested according to the current version, and the old materials were not removed or marked as invalid.
- Symptom: The citation fragment does not match the original text, and there is no citation marker in the answer. Cause: First check whether this round hit anything and which material was hit, then look at length truncation, and do not directly attribute it to truncation.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline completes.

Business test: ask a cross-material basis question, and see whether the answer gives a traceable source.

- In the node, check the selected knowledge bases and their vector models, and confirm that the selected set uses the same vector model.
- Open the search parameter panel and check the values item by item, register the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
