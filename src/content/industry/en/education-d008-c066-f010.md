---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Access
meta_description: Journal Submissions: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Manage Authorized Access and External Services

## What this category's data looks like

In the scenario of initial review of academic journal submissions, the materials entering the authorized access and external services stage are mainly of three types: submitted manuscripts, author information forms, and plagiarism check reports. Manuscripts carry the main text and references, and are the primary basis for citation sources and traceability; author information forms record authorship, affiliation, contact information, and dates, and are used to verify identity and the scope of authorization; plagiarism check reports provide comparison conclusions and detection dates, and are used to determine whether versions are synchronized. The material update rhythm is consistent with the initial review rounds; after revision, the manuscript version, plagiarism check report date, and signed receipt need to be refreshed synchronously. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record often appears inconsistent across two materials. When versions are not synchronized or signed receipts are missing, the scope of authorized access and external services is difficult to determine stably.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length can be 0. The externally available entry points and authorization scope are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Whether the name, quantity, date, and signature are consistent with the author information form and plagiarism check report | Open the manuscript and author information form one by one, and verify the title, number of authors, manuscript date, and signature field |
| Author information form | Whether the authorship, affiliation, date, and receipt match the manuscript and plagiarism check report | Compare against the manuscript first page and plagiarism check report cover, and verify author names, affiliations, dates, and receipt signatures |
| Plagiarism check report | Whether the detection date and version are synchronized with the manuscript version, and whether signatures or receipts are missing | Open the plagiarism check report and manuscript, and verify the detection date, version number, and signed receipt |
| Citation content output | Whether the number of returned items matches the hit materials; being empty is also normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length |

## Three common errors

- Phenomenon: The author count and dates for the same manuscript do not match between the author information form and the plagiarism check report. Cause: The two materials were updated separately and were not synchronized to the same version.
- Phenomenon: The plagiarism check report date is earlier than the manuscript revision date, and the versions are not synchronized. Cause: After revision, only the manuscript was replaced, and the report was not rechecked or replaced.
- Phenomenon: The author information form lacks a signature or receipt, and the authorization scope cannot be confirmed. Cause: The signature documents and receipts were not collected during the material circulation stage.

## How to verify the setup

This feature's acceptance: ask a question with textual support, and verify whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. When checking, record the array length, and separately inspect the `quoteMaxToken` budget for citation text; do not compare the two for equality; if necessary, inspect `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting.

- Turn on citation superscripts, compare each item against the source document one by one, and confirm that the citation fragments are consistent with the original paragraphs
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the chain continues, and record the array length and citation text tokens

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
