---
title: Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c054-f010
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Citations | Handover
meta_description: Self-Study Exams: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Self-Study Exam Records and Graduation Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The data in this category looks like this: Material drafting and responsibility handover for self-taught examination registration records and graduation review revolve around three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records come from registration information of provincial examination offices, with fields including admission ticket number, name, ID number, major code, and registration date; course qualification certificates come from the historical unified examination score database, with fields including course code, course name, passing score, examination date, and examining institution; graduation application forms are filled out jointly by candidates and study assistance centers, with fields including proposed graduation major, number of courses, exempted courses, signature, and receipt. The three types of materials have different update rhythms: registration records change with registration and transfer examinations, course qualification certificates are entered into the database by examination batch, and graduation application forms are submitted centrally according to the application cycle. When entering the knowledge base retrieval node, registration records are used to verify identity and major affiliation, course qualification certificates are used to verify the number of courses and scores, and graduation application forms are used to verify the completeness of signatures and receipts. Together, the three support issuable drafts and handover records.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | Whether admission ticket number, name, ID number, major code, and registration date are consistent item by item with the course qualification certificates and graduation application form | Open the citation marker to compare against the source document, and record the original text fragment and source identifier of each citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Course qualification certificates | Whether course code, course name, passing score, examination date, and examining institution match in name, quantity, and date across the two materials | Compare field by field when drafting according to the template, mark missing items and inconsistencies, and hand them to the next step for sign-off |
| Graduation application form | Whether the proposed graduation major, number of courses, exempted courses, signature, and receipt are complete, and whether the version and date are synchronized | Check the signature field and receipt records, and see whether the cited fragments in `quoteList` can point back to the original paragraphs |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials to confirm that the array is empty while the output chain is not interrupted |

## Three common errors

- Phenomenon: The same course name is written differently in the course qualification certificate and the graduation application form. Cause: The two materials are entered by different steps without name normalization, so the cited fragments cannot match when pointing back to the original text.
- Phenomenon: The number of courses is inconsistent between the two materials. Cause: Whether exempted courses are counted has not been unified, the versions are not synchronized, and the old form is directly used when drafting.
- Phenomenon: The graduation application form lacks a signature or receipt. Cause: The signature field was not checked item by item during handover, the receipt did not flow with the materials, and the missing item was only discovered when the next step signed off.

## How to verify the setup

Acceptance of this function: Ask a question with original text evidence, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Open the search parameter panel and check item by item, confirm that the selected knowledge base uses the same vector model, and record the number of citations in this round and the value of `quoteMaxToken`.
- Open the citation markers in the conversation, compare each citation against the source document to check whether it can point back to the original paragraphs, write inconsistencies into the handover record, and hand it to the next step for sign-off.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
