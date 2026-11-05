---
title: Citations and Source Traceability for Vocational College Program Registration: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Review
meta_description: Vocational Programs: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Trace Exceptions and Review Results

## What this category's data looks like

This category's data typically consists of three types of materials: program setup filing forms, talent demand justification, and faculty and equipment lists. The filing form records the program name, code, program length, enrollment scale, and signature fields; the talent demand justification contains the survey date, industry positions, demand quantity, and justification conclusion; the faculty and equipment list sets out the number of teachers, title structure, equipment names, and the number of units/sets. The three types of materials come from academic affairs, secondary colleges, and human resources and equipment departments, and their update cadence changes with the application batch. The same record often shows inconsistencies in name, quantity, and date between the filing form and the justification, with versions not synchronized or signature receipts missing. After entering the knowledge base retrieval node, the three types of materials are retrieved as documents in the associated knowledge base. The citation output is only responsible for returning the original text snippets and source identifiers; it is not responsible for comparing differences or generating a ledger.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. Even if no content is found, the output chain still runs through. The "exception list and review conclusion" is completed subsequently by an AI node, a code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether the fields, dates, and signatures are consistent with the talent demand justification | Take the program name, code, and program length in the filing form and compare them item by item with the corresponding fields in the justification; check the signature fields and receipt dates |
| Talent demand justification | Whether the name, quantity, and date of the same record match those in the filing form | Open the citation marker to point back to the original paragraph, compare the survey date, position name, and demand quantity, and confirm version synchronization |
| Faculty and equipment list | Whether the number of teachers, title structure, and equipment units/sets are consistent with the filing form | Check the quantity and dates item by item against the list, inspect for missing signatures or receipts, and record inconsistent entries |
| Cited content output | The number of array items matches the materials hit; being empty is also normal | Run a test with a question that matches no materials and see whether the output is empty while the chain continues; record the array length, and check `quoteMaxToken` separately as the content budget |

## Three common errors

- Symptom: the same program name is written differently in the filing form and the talent demand justification. Cause: the two materials are maintained by different departments, versions are not synchronized, and the cited snippets each point back to their own original text, so manual comparison is needed before unification.
- Symptom: the number of teachers or equipment units/sets does not match between the two materials. Cause: the faculty and equipment list is updated later than the filing form, and the citation output only returns original text snippets, so differences must be identified by subsequent nodes or manually.
- Symptom: the filing form lacks a signature or receipt, yet the citation array still returns snippets normally. Cause: the citation output does not verify signature completeness; an empty array or missing snippets are normal outputs and require manual review of the signature fields.

## How to verify the setup

Acceptance for this feature: ask a question with source evidence and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. Check that the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the materials hit, and that `quoteList` can expand the source identifiers.

Business test: create an exception record and see whether it can be traced back to the source material. Write entries with inconsistent names, quantities, and dates between the filing form and the justification into the exception list, have the reviewer sign, and then hand it to the person in charge for handling.

- Open the citation markers, check against the source documents whether each citation can point back to the original paragraph, record the array length and the `quoteMaxToken` budget, and do not compare the two for equality.
- Run a test with a question that matches no materials, confirm that the output is empty while the chain continues, and then check item by item that the search parameters are consistent with the values in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
