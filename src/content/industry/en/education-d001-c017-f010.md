---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Find Supporting Evidence
slug: /en/industry/education-d001-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Evidence
meta_description: Undergraduate Programs: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Find Supporting Evidence

## What this category's data looks like

The materials for a business basis query on undergraduate program setup and dynamic adjustment usually include three types: program setup application forms, talent cultivation plans, and expert review opinions. The application form states the program name, code, degree-granting category, length of study, and the signature of the person in charge; the cultivation plan states the curriculum system, credits and class hours, and the semester in which courses are offered; the review opinions state the review date, list of experts, and signatures. When these three types of materials enter the knowledge base retrieval node, each serves as a citable source document: the application form answers the setup basis, the cultivation plan answers the training arrangements, and the review opinions answer procedural compliance. The update cadence changes with filing and revision batches, and older materials need version labels. Field characteristics center on names, quantities, dates, and signatures; when comparing across materials, the original text excerpts prevail.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original text excerpt and a source identifier; the length can be 0, and the basis entries that can be traced back to the original text must be handled next by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | Whether the name, code, degree-granting category, length of study, and signature field are consistent with the original text | Open the citation superscript, compare field by field against the original paragraph in the application form, and record the number of cited items and source identifiers |
| Talent cultivation plan | Whether the course names, credits and class hours, semester offered, and version date are consistent with the original text | Open the citation superscript in the conversation, check against the original plan text, and confirm the version is current and that there are no missing signatures or receipts |
| Expert review opinions | Whether the review date, expert list, conclusion, and signatures are consistent with the original text | Compare against the original review opinions, check the date and signatures, and compare names and quantities across materials to see whether they match |
| Cited content output | The number of returned items matches the materials hit; an empty result is also normal | Run a test with a question that has no matching materials, see whether the array is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: the same program name is written differently in the application form and the cultivation plan. Cause: the two materials were revised separately, without name alignment and version synchronization.
- Symptom: the number of courses or total credits does not match between the two materials. Cause: after the cultivation plan was updated, the application form was not synchronized, and the citation hit an older version excerpt.
- Symptom: the review opinions lack signatures or receipts, and the cited excerpt has no signature block. Cause: material archiving is incomplete, but retrieval still returns that paragraph.

## How to verify the setup

Acceptance for this feature: ask a question that has an original-text basis, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- Open the citation superscript and check the original text excerpts and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` against the source documents.
- Open the search parameter panel and check item by item, recording the array item count and the `quoteMaxToken` budget; do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
