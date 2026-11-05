---
title: Citations and Source Traceability for Kindergarten and Family Communication: Track Progress and Check Statistics
slug: /en/industry/education-d006-c004-f010
page_type: 行业问题页
application_area: education
meta_title: Family Communication | Citations | Progress
meta_description: Family Communication: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten and Family Communication: Track Progress and Check Statistics

## What this category's data looks like

This page's material comes from the kindergarten home-school co-education communication scenario, and is organized around four types of records: commitment items and response times, descriptions of children's performance, classification of parents' requests, and notification delivery. The raw materials include class group messages, home-school contact books, observation record sheets, notification receipts, and weekly report drafts, with an update rhythm of daily recording, weekly aggregation, and monthly verification. When entering the knowledge base retrieval node, class group messages and contact books take on the traceability role for commitments and response times, observation record sheets take on the comparison role for descriptions of children's performance, notification receipts take on the verification role for delivery status, and weekly report drafts take on the aggregation role for explaining statistical criteria. In citation output, each type of material retains the original text snippet and source identifier, making it easy for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text snippet and source identifier, and the length can be 0. The "progress table and statistical criteria explanation" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Commitment items and response times | The record count and statistical count match, the criteria are written in the table header, and unresponded commitments must be marked | Open the citation superscript, compare against the original text of class group messages and contact books, and verify whether the response time of each commitment falls within the same weekly interval |
| Descriptions of children's performance | When the wording does not match the observation records, the original text of the observation record sheet prevails | Open the citation superscript in the conversation, and compare item by item the wording of the description with the behavior records in the observation record sheet |
| Classification of parents' requests | When feedback is not categorized, the statistical criteria explanation must list the uncategorized entries | Check the number of items in the citation array and the header of the request classification table, and confirm that each piece of feedback is either categorized or marked as uncategorized |
| Notification delivery | The delivery status is consistent with the original text of the receipt, and missing receipts are listed separately | Compare against the original text of the notification receipt, and verify whether the delivery status field corresponds to the receipt time |

## Three common errors

- Phenomenon: unresponded commitments are counted as completed. Cause: during statistics, only the total number of items is counted, and response times are not verified item by item, causing unresponded commitments to be mixed into the total.
- Phenomenon: descriptions of children's performance do not match the observation records. Cause: the cited snippet is truncated and its meaning changes, and it is written into the progress table without referring back to the original paragraph.
- Phenomenon: parents' requests are not categorized. Cause: the classification field is left blank, the statistical criteria explanation does not state exception rules, and the items are grouped under the default category during aggregation.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and verify whether the citation array and superscripts can refer back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through. The number of citations is recorded by the array length, `quoteMaxToken` is recorded separately by the tokens of the cited text, and `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are used to verify the cited snippets and source identifiers.

Business test: use one week of records to verify the total, and see whether the criteria and exceptions are clearly stated.

- Open the search parameter panel, verify item by item whether the associated knowledge bases use the same vector model, and confirm that the pipeline continues even when the citation content output is empty.
- Open the citation superscript in the conversation, compare against the source documents to verify whether each citation can refer back to the original paragraph, and record the number of array items and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
