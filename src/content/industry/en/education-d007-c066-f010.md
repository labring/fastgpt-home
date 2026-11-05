---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Review
meta_description: Journal Submissions: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Trace Exceptions and Review Results

## What this category's data looks like

In the initial screening scenario for academic journal submissions, the materials entering the knowledge base retrieval node typically include the submitted manuscript, the author information form, and the plagiarism check report. The submitted manuscript is the primary material, carrying the title, authors, affiliations, abstract, main text, and references, and is used to extract citation sources and paragraph positions; the author information form provides author names, order, affiliations, contact details, and signature fields, and is used to verify the manuscript's authorship and authorization; the plagiarism check report provides duplicated passages, sources, and the detection date, and is used to compare the manuscript text with external literature. In the retrieval node, the three types of materials each serve as independent knowledge base sources, and the citation output returns the original text snippets and source identifiers according to the matched materials. The material update cadence is based on the manuscript version and the issuance time of the plagiarism check report. Common field characteristics include title, author name, affiliation name, date, signature, and receipt.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text snippet and a source identifier, and the length may be 0. Even if no content is found, the output pipeline still completes. The "anomaly list and review conclusion" is completed subsequently by an AI node, code node, or manual work, and is used to compare fields, write ledgers, and generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the title, author names, affiliation names, dates, and reference entries are consistent with the author information form and the plagiarism check report | Open the citation markers, trace each one back to the original paragraph, and verify the citation snippets and source documents in `responseData` (non-streaming module results returned with detailed output enabled) |
| Author information form | Whether the author names, order, affiliations, contact details, and signature fields are consistent with the manuscript's authorship, and whether dates and signatures are complete | Compare against the manuscript and the plagiarism check report, check whether the names, counts, and dates in the same record match, and record any missing signature or receipt |
| Plagiarism check report | Whether the duplicated passages, sources, and detection date are synchronized with the manuscript version, and whether the report receipt includes the issuance date | Verify whether the report version and the manuscript version are from the same batch; if citation snippets do not match the original text, first check the matched materials and then check `quoteMaxToken` truncation |
| Citation content array | The number of returned entries matches the matched materials; being empty is also normal; the number of entries is the array length | Run a test with a question that has no matching materials, observe that the output is empty while the pipeline continues, and separately record the array length and the `quoteMaxToken` budget |

## Three common errors

- Phenomenon: The same author name is written differently in the manuscript and the author information form. Cause: The two materials were entered separately without field-level comparison, so names, counts, and dates do not match.
- Phenomenon: The plagiarism check report date is earlier than the current manuscript version. Cause: The versions were not synchronized, and the old report continued to be cited, causing duplicated passages to mismatch the main text.
- Phenomenon: The author information form lacks a signature or receipt. Cause: Materials were not fully collected during the initial screening workflow, so the reviewer cannot sign to confirm the anomaly record.

## How to verify the setup

Acceptance for this feature: ask a question with textual support and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials and confirm that the array is empty while the pipeline completes.

Business test: create an anomaly record, see whether it can be traced back to the source material, and verify whether the citation snippets are consistent with the original paragraphs.

- Open the citation markers, trace each one back to the original paragraph, and verify whether the source identifiers are consistent with the material names.
- Run a test with a question that has no matching materials, record the array length and the `quoteMaxToken` budget, and confirm that the pipeline continues when the array is empty.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
