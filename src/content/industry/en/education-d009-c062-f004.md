---
title: Vector Models and Indexes for Research Ethics Review: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c062-f004
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Vector Indexes | Multilingual
meta_description: Research Ethics: review vector indexes for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Research Ethics Review: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the research ethics review scenario, materials usually come from ethics review applications, informed consent form templates, and risk assessment forms, and their update cadence follows version revisions and annual acknowledgments. When the three types of materials enter this feature, their roles differ: the ethics review application provides the study name, protocol number, and date fields; the informed consent form template carries terminology expressions and the signature section; the risk assessment form records quantities, levels, and signed acknowledgments. Multilingual materials and terminology handling require the same term to be written consistently throughout the entire document and the translated name to be able to refer back to the original text, so fields, dates, and signatures need to be aligned item by item. After the materials enter the index, the original data is stored in the business database data table, and the index field records the corresponding multiple vector identifiers, to provide supporting materials for subsequent retrieval and citation trimming.

## Configuration and implementation checks

This part is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The study name, protocol number, version date, and signature section need to be aligned item by item with the informed consent form template | Sample one application record and check whether the name, number, date, and signature are consistent with another material |
| Informed consent form template | The terminology writing is consistent throughout the entire document, the translated name can refer back to the original text, and the signature section and acknowledgment are complete | Open the template and check the terminology writing, then check whether the name, quantity, and date of the same record match across the application and the assessment form |
| Risk assessment form | The risk level, quantity, and date fields need to remain in the same version as the application and template | Open one data row and check the index field, confirm that multiple vector identifiers are all present, and view the data range covered by the rebuild task |
| Data row index field | Multiple vector identifiers of one piece of data are all recorded in the index field, and the status is indexed | Check the referenced text tokens of `limit`; the array count is recorded separately and is not compared for equality |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the informed consent form template. Inspect the following: Multilingual material terminology is not unified, versions are not synchronized.
- Symptom: The risk assessment form lacks a signature or acknowledgment, and the externally published draft still carries an old version. Inspect the following: and after changing models.
- Symptom: Duplicate entries appear in retrieval results, or a data row has content but cannot be retrieved. Inspect the following: The index model is inconsistent with the vector model actually used by the knowledge base, and data in the same group is not merged by the highest score.

## How to verify the setup

This feature's acceptance: sample one data row and look at the index field, confirm that multiple vector identifiers are all present and the status is indexed; then retrieve once to see whether the same group is merged, and check `defaultToken`, `maxToken`, and the rebuild task records.

Business test: sample three terms and check whether the writing is consistent throughout the entire document, whether the translated name can refer back to the original text, and whether dates and signatures are aligned.

- In the knowledge base settings, check the index model, confirm that it is consistent with the vector model actually used by the knowledge base, and view the data range covered by the rebuild task.
- Open one data row and check the index field, confirm that multiple vector identifiers are all present, then retrieve once to see whether data in the same group is merged and whether the score takes the highest value.
