---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Access
meta_description: Kindergarten Care: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Manage Authorized Access and External Services

## What this category's data looks like

Kindergarten childcare daily life management materials, including daily life schedules, morning and afternoon check records, and child health observation records, are formed day by day on a class basis. Fields include date, activity segment name, child name, observation item, quantity, signature, and receipt. The update rhythm is daily filling, weekly aggregation, and per-semester archiving. When these materials enter the authorized access and external services function, the daily life schedule assumes the skeleton role of the external entry point, while the morning and afternoon check records and child health observation records assume the traceability role, for subsequent nodes to compare fields, write ledgers, and generate reports. When material versions are not synchronized, or signatures or receipts are missing, the externally visible scope and citation sources need to be checked separately, to avoid the name, quantity, and date of the same record failing to match across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The externally available entry point and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Associated knowledge base | The selected knowledge bases use the same vector model and correspond to the material scope required for external services | In the node, check the selected collections and their vector models, and confirm that the daily life schedule, morning and afternoon check records, and child health observation records are all within the collections |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length |
| Citations correspond to the original text | Each citation can point back to the original paragraph, including date, activity segment, name, and signature fields | In the conversation, open the citation marker, compare it with the source document, and check whether the fields and date are consistent |
| Search parameters | Consistent with the values set in the knowledge base retrieval section; the cited content budget is recorded separately | Open the search parameters panel and check the `quoteMaxToken` value item by item, and view the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name, quantity, and date of the same record fail to match between the daily life schedule and the morning and afternoon check records. Cause: The two materials are filled in separately, versions are not synchronized, and no field-level comparison was performed.
- Symptom: The visible scope of external services exceeds authorization, and restricted identities can see materials that are not open. Cause: The authorization scope and material collections are not matched item by item, and the entry point is not filtered by identity.
- Symptom: The citation array is empty but an answer is still generated, or the cited fragments do not match the original text. Cause: No materials being matched in this round is a normal output; if they do not match, first check the matched entries and then check the trimming.

## How to verify the setup

Acceptance of this function: ask a question with original text support, check whether the citation array and markers can point back to the original text, and view the `quoteList` field in `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, confirm that unauthorized materials are not visible, and record the array entry count and the `quoteMaxToken` budget values separately.

- Check the fields, dates, and signatures of the daily life schedule, morning and afternoon check records, and child health observation records item by item, and mark places where names, quantities, and dates are inconsistent.
- Before opening access to parents or superiors, run a test once with a restricted identity, confirm that citation sources can point back to the original text, and that the chain still runs through in the empty-array scenario.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
