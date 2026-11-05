---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Multilingual
meta_description: Continuing Education: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data looks like this: Continuing education credit recognition involves three types of materials: course filing forms, study certificates, and credit recognition forms, which respectively record course names, study start and end dates, recognized credits, and signed receipts. When handling multilingual materials and terminology, the translated names of the same course in materials of different languages must be able to refer back to the original text, and the terminology glossary and comparison draft are unified accordingly. When materials enter the knowledge base retrieval node, the course filing form provides the course name and filing date, the study certificate provides the learner, study period, and seal, and the credit recognition form provides the recognized quantity, handler signature, and date. The update rhythm changes with batches and versions; the name, quantity, and date of the same record in two materials may not match, and versions not being synchronized or missing signed receipts are also common. The field characteristics are four categories: name, quantity, date, and signature, which need to be compared item by item.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text snippet and a source identifier, and the length can be 0. The unified terminology glossary and comparison draft are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The course name, filing date, and signature field must be consistent item by item with the study certificate and credit recognition form | Open the citation superscript, compare the source document to verify the course name and filing date, and record the number of array entries and the `quoteMaxToken` budget |
| Study certificate | The learner, study period, seal, and receipt must be able to refer back to the original text and correspond to the quantity in the recognition form | Open the citation superscript in the conversation, check the original text snippet and source identifier, and inspect the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) |
| Credit recognition form | The recognized credit quantity, handler signature, and date must match the filing form and study certificate | Open the search parameter panel and check item by item, view the hit materials in `quoteList`, and confirm the signature and date fields |
| Associated knowledge base | The selected knowledge base uses the same vector model, and terminology translations can refer back to the original text | Check the selected collections and their vector models in the node, and run a test with a no-match question to see that the output is empty while the pipeline continues |

## Three common errors

- Phenomenon: The translated name of the same course differs between the filing form and the study certificate. Cause: Multilingual materials have not unified terminology, versions are not synchronized, and cited snippets are independent of each other.
- Phenomenon: The quantity in the credit recognition form does not match the study period in the study certificate. Cause: The quantity and date of the same record in the two materials have not been checked item by item, and the receipt is missing.
- Phenomenon: The answer has content but the citation array is empty or the superscript is missing. Cause: No materials were hit in this round, or the correspondence between citations and the original text has not been checked; an empty array is a normal output.

## How to verify the setup

Acceptance of this feature: Ask a terminology question with original text evidence, check whether the citation array and superscript can refer back to the original text, record the number of array entries, and separately examine the `quoteMaxToken` budget; then ask a question with no matching materials to confirm that the array is empty while the pipeline runs through.

Business testing: Sample three terms to check whether their spelling is consistent throughout the document, whether the translated names can refer back to the original text, and compare the names, quantities, dates, and signatures in the course filing form, study certificate, and credit recognition form.

- Open the citation superscript, compare the source document to check whether each citation can refer back to the original text paragraph, and record the citation array length.
- Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, then open the search parameter panel and check the values item by item.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
