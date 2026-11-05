---
title: Citations and Source Traceability for College Entrance Exam Application Eligibility: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c051-f010
page_type: 行业问题页
application_area: education
meta_title: Entrance Exam Eligibility | Citations | Checks
meta_description: Entrance Exam Eligibility: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Entrance Exam Application Eligibility: Compare Documents and Locate Differences

## What this category's data looks like

The general college entrance examination registration qualification review involves three core types of materials: the college entrance examination registration form, household registration and student status certificates, and materials for children accompanying migrant workers. The registration form is filled in by the candidate, with fields including name, ID number, graduating school, examination subject category, signature, and date; the household registration and student status certificates are issued by the public security authorities and the school, including household registration address, move-in time, student status number, start and end dates of enrollment, and seal; the materials for children accompanying migrant workers include the parents' residence permit, social insurance payment records, proof of stable residence, and receipt. The three types of materials come from different sources and have different update rhythms: the registration form changes as the candidate modifies it, the household registration and student status certificates are updated by issuance batch, and the accompanying migrant materials roll over according to the social insurance and residence permit cycles. When the materials enter the knowledge base retrieval node, each is split and vectorized as an independent document, and the citation output returns the original text and source identifier according to the hit segment, providing a traceable segment basis for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text segment and source identifier, and the length can be 0. The "discrepancy list" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| College entrance examination registration form | Check field by field against the household registration and student status certificates: whether name, ID number, graduating school, examination subject category, signature, and date are consistent | Open the citation marker to compare against the original segment of the registration form, record inconsistent fields, and mark the source identifier |
| Household registration and student status certificates | Check against the registration form for household registration address, move-in time, student status number, and start and end dates of enrollment; check whether the seal and issuance date are complete | Retrieve the original citation of the certificate, check the seal position and date, and list missing items in the to-be-supplemented list |
| Materials for children accompanying migrant workers | Check the name, quantity, date, and receipt signature of the parents' residence permit, social insurance records, and proof of stable residence | Trace each cited segment one by one, and compare whether the number of social insurance months and the validity period of the residence permit cover the registration period |
| Citation content output | The number of returned entries is consistent with the hit materials; being empty is also normal; `quoteMaxToken` is the content budget, and the number of array entries is recorded separately | Run a test with a question that has no matching materials to confirm that the array is empty while the pipeline still works; check the citation structure in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Phenomenon: the same candidate's name is written differently in the registration form and the household registration certificate. Cause: the materials are entered by different issuing parties, and no unified field comparison has been made; the cited segments can trace back to both original texts but require manual judgment.
- Phenomenon: the student status number or move-in date does not match between the two materials. Cause: versions are not synchronized, and the old version of the certificate is still hit in the knowledge base; the citation source identifier must be checked to confirm the version.
- Phenomenon: accompanying migrant materials are missing a signature or receipt. Cause: the scanned copy omits the signature page; the citation array still returns segments, but field completeness must be checked separately.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still works.

Business test: use one real record to find fields inconsistent with the ledger.

- Open the search parameter panel and check the values item by item, confirm they are consistent with the settings in the knowledge base retrieval section, and check whether the selected collection is a knowledge base of the same vector model.
- Open the citation markers in the conversation, compare each citation against the source document to check whether it can trace back to the original paragraph, and register the number of entries and the `quoteMaxToken` budget separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
