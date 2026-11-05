---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Checks
meta_description: Degree Certificates: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses the scenario of degree conferral and certificate information reporting. The core materials include three types: degree application forms, thesis review forms, and defense resolutions, with a ledger attached as the comparison baseline. The degree application form carries the applicant's identity, discipline category, proposed degree level, and application date; the thesis review form carries the reviewer's opinion, review conclusion, review date, and signature; the defense resolution carries the composition of the defense committee, voting results, resolution date, and committee members' signatures. The three types of materials enter the reporting process in batches. Each batch uses the ledger record as an anchor, verifying names, quantities, dates, and signature receipts field by field. After the materials enter the knowledge base retrieval node, each is cited and output as an independent source, and the cited snippets point back to the original paragraphs for subsequent nodes to compare field discrepancies. The node only outputs an array of cited content; material version discrepancies must be located by subsequent nodes or manually during comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original snippet and a source identifier, and the length may be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Fields, dates, and signatures: whether the applicant's name, proposed degree level, application date, and signature are complete | Open the citation marker to point back to the original paragraph in the degree application form, verify fields and dates item by item, and record inconsistencies with the ledger |
| Thesis review form | Fields, dates, and signatures: reviewer's name, review conclusion, review date, signature or receipt | Compare the cited snippets with the ledger, verify the number of review conclusions and dates, and flag entries missing signatures or receipts |
| Defense resolution | Fields, dates, and signatures: composition of the defense committee, voting results, resolution date, committee members' signatures | Verify the number of committee members and the resolution date in the cited sources, compare item by item with the ledger, and locate discrepant fields |
| Cited content output | The number of returned entries matches the materials hit; being empty is also normal | Run a test with a question that matches no materials, confirm the array is empty while the pipeline runs through, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the same record has different name spellings in the degree application form and the defense resolution. Cause: the two materials were filled in at different stages and entered reporting without unified proofreading.
- Symptom: the thesis review form version was not synchronized, and the cited snippet points to an old conclusion. Cause: the knowledge base source was not updated after revision, so retrieval hit the old material.
- Symptom: the defense resolution is missing committee members' signatures or receipts, yet the cited array still returns that entry. Cause: the signature page was not ingested together with the body text, so citations only cover the body paragraphs.

## How to verify the setup

This feature's acceptance check: ask a question with original-text support and verify whether the cited array and citation markers can point back to the original paragraphs; then ask a question that matches no materials and confirm the array is empty while the pipeline runs through. Check the number of entries in the cited array and the source identifiers in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled). The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: use a real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, keeping them consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
