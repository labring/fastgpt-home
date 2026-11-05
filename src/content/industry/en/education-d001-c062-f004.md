---
title: Vector Models and Indexes for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f004
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Vector Indexes | Evidence
meta_description: Research Ethics: review vector indexes for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

In research ethics review scenarios, materials typically include three categories: ethics review applications, informed consent form templates, and risk assessment forms. Applications carry the research protocol and review elements, templates carry subject notification and consent fields, and assessment forms carry risk levels, dispositions, and receipts. When materials enter the knowledge base, applications and assessment forms mostly serve as basis sources, while templates mostly serve as field comparison sources. Field characteristics are concentrated in dates, signatures, quantities, and version numbers, and the same record often appears under different names in different materials. In terms of update cadence, templates are revised as regulations change, while applications and assessment forms are supplemented as projects progress. After these three categories of materials enter this feature, each generates vectors and raw data; vectors are used for recall, raw data is used for back-reference, and the index field records the multiple vector identifiers corresponding to one piece of data.

## Configuration and implementation checks

This step is executed by the index service and the vector library, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). "Basis entries that can be back-referenced to the original text" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields include review date, signature, and version number, and must be aligned item by item with the template and assessment form | Open one application data row, check whether the index field records multiple vector identifiers, then search for the date and signature items in that application |
| Informed consent form template | Fields include consent date, signature field, and version number, and must be consistent with the subject notification items in the application | In the knowledge base settings, check whether the index model is consistent with the vector model actually used by the knowledge base, then search for the signature field in the template |
| Risk assessment form | Fields include assessment date, risk level, quantity, and receipt signature, and must match the records in the application and template | View the data scope covered by the rebuild task, confirm that after changing models it is triggered only for data whose indexing has been completed, then search for the risk level in the assessment form |
| Data row | Multiple vector identifiers for one piece of data are all in the index field, and after retrieval, data in the same group is merged and the highest score is taken | Sample one data row to look at the index field, then search once to see whether the same group is merged, and check the reference text budget of `limit` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the assessment form. Inspect the following: are not merged by the same record, and different versions are retrieved during back-reference.
- Symptom: Recall quality declines after changing models. Inspect the following: The rebuild task is triggered only for data whose indexing has been completed; data rows that cannot be rebuilt do not participate in recall, so indexing must be completed first, and the index model is inconsistent with the vector model actually used by the knowledge base.
- Symptom: The template lacks a signature or receipt, yet retrieval can still recall it. Inspect the following: The index field records vector identifiers, but the signature field and receipt field in the raw data are empty, so the original text cannot be matched during back-reference.

## How to verify the setup

This feature's acceptance: sample one data row to look at the index field and confirm that multiple vector identifiers are all present; then search once to see whether data in the same group is merged and the highest score is taken. At the same time, check the reference text budget of `limit`; the number of array entries is recorded separately.

Business test: ask a cross-material basis question, see whether the answer gives a back-referenceable source, and confirm that the basis comes from the institution’s materials, that the version is current, and that the entries match the original text.

- In the knowledge base settings, check whether the index model is consistent with the vector model actually used by the knowledge base, and view the data scope covered by the rebuild task to confirm that after changing models it is triggered only for data whose indexing has been completed.
- Open one data row to check the index field and confirm that multiple vector identifiers for one piece of data are all present; then search once to confirm that data in the same group is merged and the highest score is taken, and that the status value recognizes only indexed and rebuild task records.
