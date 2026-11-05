---
title: Vector Models and Indexes for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f004
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Vector Indexes | Evidence
meta_description: Student Mental Health: review vector indexes for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Vector Models and Indexes for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

This page addresses primary and secondary school mental health screening and referral scenarios; the materials include three types: screening plans, interview records, and referral forms. Screening plans contain screening tools, batch dates, and organizational signatures; interview records contain student identifiers, interview times, and interviewer signatures; referral forms contain referral reasons, receiving-party acknowledgments, referral dates, and signatures from both parties. The three types of materials are updated by semester or batch; the same student may appear across materials, and field names, counts, and dates need to be aligned item by item. After the materials enter this feature, the screening plan serves as the primary basis providing the judgment criteria, interview records provide individual corroboration, and referral forms provide destination and acknowledgment evidence; together the three support basis entries that can be traced back to the original text, and when replying to parents or writing into plans, they are labeled separately by material source.

## Configuration and implementation checks

This step is executed by the indexing service and the vector database, outputting vectors and index status (whether recall is possible, whether data in the same group is merged). "Basis entries that can be traced back to the original text" is then completed by subsequent AI nodes, code nodes, or manual work (retrieval and citation trimming only take supporting materials).

| Object | Check | Verification action |
| --- | --- | --- |
| Screening plan | Check whether the screening tools, batch dates, and organizational signatures are consistent with the current version, and whether the fields can correspond to the interview records | In the knowledge base settings, check whether the indexing model is consistent with the vector model actually used by the plan; open a plan data row to see whether the index fields are complete, and confirm the status is indexed |
| Interview record | Check whether the interview time, interviewer signature, and student identifier match the screening plan and referral form | Search for the same student identifier to see whether data in the same group is merged and the score takes the highest; check the budget settings of `limit` in citation trimming |
| Referral form | Check whether the referral date, receiving-party acknowledgment, and signatures from both parties are complete, and whether the names and counts are consistent with the interview records | View the data range covered by the rebuild task records, and confirm that after changing the model, only data that has already been indexed is triggered; search for the referral reason to see whether the original text can be recalled |
| Data row index fields | Whether multiple vector identifiers of one data entry are all present, and whether data in the same group is merged | Open a data row to check the index fields, then search once more to see whether duplicate entries appear |

## Three common errors

- Symptom: the same student's name and counts do not match between the screening plan and the interview record. Inspect the following: the two materials are entered separately, without field alignment and version synchronization by student identifier.
- Symptom: the referral form lacks the receiving-party acknowledgment or signatures from both parties. Inspect the following: the referral process is not closed-loop, and the signature and acknowledgment fields are not checked when the materials are archived.
- Symptom: after changing the model, recall quality drops, and a data row has content but cannot be retrieved. Inspect the following: the rebuild task records do not cover all data that has already been indexed, and the index fields are not synchronized.

## How to verify the setup

Acceptance of this feature: take one data row and check the index fields, confirming that multiple vector identifiers are all present and the status is indexed; then search once more to see whether data in the same group is merged and whether the score takes the highest, and check the coverage of the rebuild task records.

Business test: ask a basis question that spans materials, and see whether the answer gives a traceable source, and whether the source matches the original text and dates and signatures of the screening plan, interview record, or referral form.

- In the knowledge base settings, check that the indexing model is consistent with the vector model actually used by the knowledge base, and open a data row to check the index fields, confirming the status is indexed.
- View the data range covered by the rebuild task records, confirm that after changing the model, only data that has already been indexed is triggered, and check the citation budget settings of `limit`.
