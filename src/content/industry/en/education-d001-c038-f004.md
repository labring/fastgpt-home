---
title: Vector Models and Indexes for Continuing Education Training Hour Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c038-f004
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Vector Indexes | Evidence
meta_description: Continuing Education: review vector indexes for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for Continuing Education Training Hour Recognition: Find Supporting Evidence

## What this category's data looks like

This category's data looks like this
In the continuing education credit hour recognition scenario, three types of materials are involved: course filing forms, study certificates, and credit hour recognition forms. A course filing form records the course name, number of class hours, filing date, and handler's signature; a study certificate records the learner's name, course name, study start and end dates, and the institution's seal; a credit hour recognition form records the recognized credit hours, the corresponding course, the recognition date, and the reviewer's signature. The three types of materials are updated by batch, and within the same batch, the course names, quantities, and dates should remain consistent across the different materials. When the materials enter this feature, the course filing form serves as the source of the course definition, the study certificate serves as the source of study facts, and the credit hour recognition form serves as the source of the recognition conclusion; together, the three support basis entries that can be traced back to the original text, for tracing when replying to parents or writing into a proposal.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, and outputs vectors and index status (whether recall is possible, whether data in the same group is merged). "Basis entries that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The fields include the course name, number of class hours, filing date, and handler's signature; all three are complete and match the course name, quantity, and date in the study certificate | Open the corresponding data row in the course filing form, check whether the index field records multiple vector identifiers, and run a retrieval once to see whether data in the same group is merged |
| Study certificate | The fields include the learner's name, course name, study start and end dates, and the institution's seal; the dates are consistent with those recorded in the credit hour recognition form, and there are no missing signatures or receipts | In the knowledge base settings, check that the index model is consistent with the actual vector model, and view the data scope covered by the rebuild task |
| Credit hour recognition form | The fields include the recognized credit hours, the corresponding course, the recognition date, and the reviewer's signature; the version is the current one, and the name and quantity are consistent with the course filing form | Open a data row and check the index field, confirm that the status is indexed, and check whether the rebuild task record covers that data |

## Three common errors

- Symptom: the name, quantity, or date of the same course does not match across two materials. Inspect the following: the materials were entered separately and were not proofread in sync by batch.
- Symptom: recall quality drops after changing the model. Inspect the following: the rebuild is triggered only for data that has already been indexed, and does not cover all data rows.
- Symptom: a data row has content but cannot be retrieved. Inspect the following: the index field does not record all vector identifiers, or the row's status has not reached indexed.

## How to verify the setup

Acceptance for this feature: sample a data row to see whether the index field records multiple vector identifiers, then run a retrieval once to see whether data in the same group is merged and the highest score is taken.

Business test: ask a basis question that spans materials, see whether the answer gives a traceable source, and check that the number of citations and `quoteMaxToken` are recorded separately; do not compare the citation text tokens with the array count for equality.

- In the knowledge base settings, check that the index model is consistent with the vector model actually used by the knowledge base, and view the data scope covered by the rebuild task record.
- Open the data row and check the index field, confirm that the status is indexed, and check the values of `limit` in citation trimming.
