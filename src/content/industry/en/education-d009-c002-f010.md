---
title: Citations and Source Traceability for Kindergarten Play Activity Organization: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c002-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Citations | Multilingual
meta_description: Kindergarten Play: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Play Activity Organization: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the scenario of kindergarten play activity organization, multilingual materials and terminology processing involves observation records, area plans, material placement lists, activity objective tables, reflection-to-next-week plans, and other materials. Observation records correspond to area plans, the quantity of materials placed must be consistent with the plan, the achievement of activity objectives must be traceable back to observation segments, and the reflection-to-next-week plan must be updated. When these materials enter the knowledge base retrieval node, each plays a different role: observation records provide original segments, area plans provide a basis for comparison, material lists provide quantity verification, objective tables provide achievement determination, and reflection records provide update clues. Sources are mostly internal kindergarten documents and multilingual comparison drafts, and the update rhythm rolls with weekly plans and activity cycles. Field characteristics include the original term, translated name, occurrence location, and citation source identifier. The unified terminology glossary and comparison draft require the same term to be consistent throughout the entire text and the translated name to be traceable back to the original text. Before external release, three terms must be sampled to check whether their usage is consistent throughout the entire text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text segment and a source identifier, and the length can be 0. The "unified terminology glossary and comparison draft" is subsequently completed by an AI node, code node, or manually. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Observation records and area plans | Whether the correspondence between the two can be traced back in the cited segments, and whether the observation entries and plan entries point to the same activity | Open the citation superscript, compare with the source document, and verify item by item the corresponding paragraphs of the observation records and area plans |
| Material placement list | Whether the quantity of materials placed is consistent with the area plan, and whether the cited segments contain quantity fields | View the cited segments in the conversation, compare the material list quantity with the plan quantity, and record discrepancy items |
| Activity objective table | Whether the achievement of activity objectives is consistent with the observation records, and whether the objective entries can be traced back to observation segments | Search using objective keywords, and verify whether the objective entries in the citation array match the observation segments |
| Reflection-to-next-week plan | Whether the reflection content has been updated to the next week's plan, and whether the cited segments contain update markers | View the citation sources of the reflection records and next week's plan, and verify the update fields and plan entries |

## Three common errors

- Phenomenon: The quantity of materials placed is inconsistent with the area plan. Cause: The material list was not updated with the plan, and the cited segments still point to the old version.
- Phenomenon: Activity objectives do not match the observation records. Cause: The objective table was not synchronized with the observation segments, and the citation source identifier points to an expired document.
- Phenomenon: The reflection-to-next-week plan was not updated. Cause: The reflection records did not enter the knowledge base, and the citation array is empty but the chain continues.

## How to verify the setup

Acceptance of this feature: Ask a question with original text evidence, and verify whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Check the number of citation entries in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifiers in `quoteList`. The number of citation entries is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: Sample three terms to check whether their usage is consistent throughout the entire text and whether the translated names can be traced back to the original text, and record inconsistent entries.

- Open the search parameter panel and verify item by item, confirming that the associated knowledge base uses the same vector model, and verify the value of `quoteMaxToken` and the tokens of the cited text
- Open the citation superscript in the conversation, compare with the source document, check whether the cited segments correspond to the original paragraphs, and separately record the number of array entries

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
