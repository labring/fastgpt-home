---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Versions
meta_description: Undergraduate Programs: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Maintain Document Versions and Changes

## What this category's data looks like

This category's data covers three types of materials: program setup application forms, talent cultivation plans, and expert review opinions, each with its own characteristics in fields, dates, and signatures. The program setup application form carries the proposed program name, code, program length, degree-granting category, and application date; the talent cultivation plan records the curriculum system, credits and credit hours, practical components, and study requirements; the expert review opinions reflect the review conclusion, expert list, signatures, and acknowledgments. When these three types of materials enter the knowledge base retrieval node, they serve as the retrieved content in the associated knowledge base, and each is cited and output as an original text snippet for subsequent field comparison, ledger writing, and report generation. The update cadence changes with cultivation plan revisions, review conclusion changes, and signature completion, so the current version must remain unique, old versions traceable, and citations synchronized.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Check the program name, code, program length, degree-granting category, and application date, and check whether signatures and acknowledgments are complete | View the cited snippet in the node, trace it back to the original paragraph of the application form, and compare the names, quantities, and dates in the two materials |
| Talent cultivation plan | Check the curriculum system, credits and credit hours, practical components, and study requirements, and check the version number and revision date | Compare the fields of the same record in the two materials item by item, and when the version is not synchronized, take the current version as authoritative |
| Expert review opinions | Check the review conclusion, expert list, signatures, and acknowledgment date, and confirm consistency with the application form and cultivation plan | Open the citation marker to compare against the source document, and record the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Associated knowledge base and search parameters | Check that the selected collections are knowledge bases with the same vector model, and that the search parameters match the values in the knowledge base retrieval section | Open the search parameter panel and check item by item; when the citation limit is involved, check the tokens of the cited text, record the array length separately |

## Three common errors

- Symptom: the program name, credit quantity, and dates of the same record do not match between the application form and the cultivation plan. Cause: the two materials were revised separately, without field-level comparison and version synchronization.
- Symptom: an old version of the cultivation plan is still cited, and the current version is not unique. Cause: the version number and revision date were not updated with content changes, and citations were not synchronized.
- Symptom: expert review opinions lack signatures or acknowledgments. Cause: material archiving is incomplete, and the cited snippet cannot trace back to the complete original paragraph.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the cited content array and citation markers can trace back to the original paragraph; then ask a question with no matching material, and confirm that the array is empty while the output pipeline still runs through.

Business test: change one piece of content and see whether the version number and citations are updated synchronously.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the search parameters match the values in the knowledge base retrieval section.
- Run a test with a question that has no matching material, and see that the output is empty while the pipeline continues; when the citation limit is involved, check the tokens of the cited text, record the array length separately, and note that `quoteMaxToken` is a content budget and is not compared for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
