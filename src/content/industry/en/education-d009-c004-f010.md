---
title: Citations and Source Traceability for Kindergarten and Family Communication: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Multilingual
meta_description: Family Communication: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the kindergarten home-school co-education communication scenario, with materials drawn from kindergarten notices, activity schedules, child observation records, parent request registrations, and multilingual parallel texts. When multilingual materials and terminology handling enter the knowledge base retrieval node, notice-type materials serve as the basis for verifying committed matters and response times, observation records serve as the basis for comparing descriptions of child performance, parent request registrations serve as the basis for verifying request classification and feedback categorization, and parallel texts serve as the basis for tracing terminology translations back to the original text. Source identifiers must retain the document name and paragraph position to facilitate citation superscripts tracing back. The update cadence follows the kindergarten's publication batches; after new notices, new observation records, new request registrations, and revised parallel texts enter, old citations still trace back according to the original paragraphs. Field characteristics center on committed matters, response times, descriptions of child performance, parent request classification, notice delivery status, and multilingual terminology wording.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The unified terminology glossary and parallel texts are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Notice-type materials | Whether the committed matters and response times can find corresponding expressions in the cited fragments | Open the citation superscript, compare against the original notice paragraphs, and check whether the committed matters and response times are consistent within the same document; record the number of entries in the citation array separately, `quoteMaxToken` serves only as the content budget |
| Child observation records | Whether the descriptions of child performance are consistent with the original text of the observation records | Run a trial with a question containing descriptions of child performance, check whether the cited fragments can trace back to the observation record paragraphs, and check whether the number of entries in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the matched materials |
| Parent request registrations | Whether the parent request classification and feedback categorization have corresponding sources in the citations | Check whether the number of entries in the citation array is consistent with the matched materials, trace each entry back to the original request registration text, and check whether the source identifiers in `detail` are complete |
| Multilingual parallel texts | Whether the same terminology is written consistently throughout the entire text and whether the translation can trace back to the original text | Sample three terms to check their wording throughout the entire text, and check whether the cited fragments correspond to the original paragraphs of the parallel texts |

## Three common errors

- Phenomenon: Committed matters appear in the answer, but the citation array is empty. Cause: This round did not match notice-type materials; an empty array is a normal output and does not equal retrieval failure.
- Phenomenon: Descriptions of child performance do not match the original text of the observation records. Cause: First check which material was matched in this round, then check whether the cited fragments were truncated; do not directly attribute this to length truncation.
- Phenomenon: Parent request classification and feedback categorization are mixed together in the answer. Cause: The cited fragments do not trace back to the original paragraphs of the request registrations, and subsequent comparison lacks source identifiers.

## How to verify the setup

Acceptance of this feature: Ask a question with textual evidence and check whether the citation array and superscripts can trace back to the original paragraphs; then ask a question with no matching materials and confirm that the array is empty while the pipeline runs through. When citation limits are involved, check the tokens of the cited text, record the number of entries in the array separately; `quoteMaxToken` is the content budget and is not used for equality comparison.

Business test: Sample three terms to check whether their wording is consistent throughout the entire text.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, keeping them consistent with the values set in the knowledge base retrieval section; run a trial with a question that has no matching materials, and see that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
