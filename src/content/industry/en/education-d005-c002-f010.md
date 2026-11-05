---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Versions
meta_description: Kindergarten Play: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Maintain Document Versions and Changes

## What this category's data looks like

Kindergarten play activity organization involves observation records, area plans, material placement lists, activity objectives, and reflection-to-next-week plans. Observation records and area plans must correspond, material placement quantities must be verifiable, activity objectives must be consistent with observations, and reflections must be transferred into next week's plans. When these materials enter the knowledge base retrieval node, each has a different role: observation records and area plans serve as citation sources, material placement lists serve as the basis for quantity verification, activity objectives serve as the judgment baseline, and reflection-to-next-week plans serve as the entry point for change records. The update cadence advances weekly or by activity batch, and field characteristics include version number, effective date, source identifier, and cited snippet. Data versions and change maintenance require that the current version be unique, old versions be traceable, and citations be synchronized; after changing one piece of content, the version number and citations must be updated in sync.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | The correspondence between the two must be verifiable, and the observed behavior must be consistent with the activity arrangements in the area plan | Open the citation marker in the conversation, compare it with the source document, and check whether the original text snippet in `quoteList` corresponds to the area plan entry |
| Material placement quantity | The placement quantity must be consistent with the materials required by the activity objective, and any shortage or excess must be recorded | Check item by item the quantity in the material list against the actual usage in the observation records, and check whether the cited snippet in `responseData` (non-streaming module results returned with detailed output enabled) contains a quantity description |
| Activity objectives and observations | Goal achievement must be consistent with the observation records, and any mismatch between objectives and observations must be flagged | Run a test with a question involving goal achievement, and check whether the citation array and markers can point back to the objective entry and observation paragraph |
| Reflection-to-next-week plan | Reflection content must be transferred into next week's plan, and any failure to update the plan must be flagged | Change one piece of reflection content, see whether the version number and citations are updated in sync, and check that `quoteMaxToken` is the citation content budget, with the number of array items recorded separately |

## Three common errors

- Phenomenon: insufficient material placement quantity makes the activity objective difficult to achieve. Cause: the material list was not updated with the activity objective, and the correspondence between observation records and area plans is broken.
- Phenomenon: activity objectives do not match observations, and the judgment of goal achievement is distorted. Cause: the objective entry was not revised in sync with the observation records, and the cited snippet still points to the old version of the objective.
- Phenomenon: reflections are not transferred into next week's plan, and the plan is not updated. Cause: change records were not registered, old versions are traceable but citations are not synchronized, and the current version is not unique.

## How to verify the setup

Acceptance for this feature: ask a question with source evidence and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the pipeline still runs through.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues, and check that the citation count is the array length.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
