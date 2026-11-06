---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Checks
meta_description: Teaching Reviews: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Compare Documents and Locate Differences

## What this category's data looks like

In the district and county teaching research activity and classroom observation and evaluation scenario, materials usually come from three types: teaching research activity notices, classroom observation records, and classroom evaluation minutes. Notices are issued by the organizing party and contain the activity name, time, location, participants, agenda, and sign-off requirements; classroom observation records are filled in by the observer and contain the instructor, class, subject, topic, lesson type, observation time, observation points, and signature; classroom evaluation minutes are compiled by the recorder and contain review points, improvement suggestions, attendees, and receipts. The three types of materials have different update rhythms: notices are issued first, classroom observation records are generated during the class, and classroom evaluation minutes are added after the meeting. It is common for the name, quantity, and date of the same record to fail to match across two materials, for versions not to be synchronized, and for signatures or receipts to be missing. When entering this function, the notice is the factual source for the activity, the classroom observation record is the factual source for the classroom, and the classroom evaluation minutes are the factual source for the review. Together, the three support field comparison and discrepancy localization, and citation sources are used to point back to the original text passages.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is retrieved, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | Whether the activity name, date, number of participants, signature, or receipt is consistent with the ledger | In the node, check the selected knowledge base collections and their vector models; open the citation marker to compare against the original notice text, and compare the name, quantity, date, and signature column item by item |
| Classroom observation record | Whether the instructor, class, topic, observation time, observation points, and signature are consistent with the notice and minutes | Run a trial with one real record, and check whether the number of items in the citation array matches the materials hit; check whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original passage of the classroom observation record |
| Classroom evaluation minutes | Whether the review points, attendees, receipt, and date are consistent with the notice and classroom observation record | Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; when the citation limit is involved, check the tokens of the cited text, and record the number of array items separately |
| Cited content output | The number of returned items matches the materials hit, and being empty is also normal | Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues; open the citation marker in the conversation and compare it against the source document |

## Three common errors

- Phenomenon: the name, quantity, and date of the same record fail to match across two materials. Cause: notices are issued first, classroom observation records are generated during the class, and classroom evaluation minutes are added after the meeting; versions are not synchronized, and field definitions are not aligned.
- Phenomenon: classroom evaluation minutes lack a signature or receipt, and the sign-off column of the notice is empty. Cause: the material circulation step is not closed-loop; signatures and receipts are not archived in sync with the activity, and the ledger is disconnected from the materials.
- Phenomenon: there is no citation marker in the answer, and the cited fragments do not match the original text. Cause: first check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Acceptance of this function: ask a question with original-text support, and check whether the citation array and marker can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation and write-back, and check whether the citation sources in `quoteList` correspond to the original text passages.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; when the citation limit is involved, check the tokens of the cited text, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
