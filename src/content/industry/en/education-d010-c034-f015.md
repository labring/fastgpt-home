---
title: Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c034-f015
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Retrieval | Operations
meta_description: Skills Certification: review retrieval for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Public Vocational Skills Level Assessment: Coordinate Operations and Application Handover

## What this category's data looks like

This category's data includes the assessment implementation plan, candidate registration form, and assessor dispatch form; their fields, dates, and signatures must be aligned item by item during deployment, operations, and application handover. The assessment implementation plan contains the certification occupation, level, batch, and assessment method; the candidate registration form contains name, ID number, declared occupation and level, years of work experience, education, photo, and personal signature; the assessor dispatch form contains assessor name, certificate number, dispatch date, session, and institutional seal. When these materials enter knowledge base retrieval and recall, they respectively serve the roles of plan basis, personnel qualification verification, and dispatch receipt. The update cadence rolls with batches; for each batch, the plan, registration, and dispatch materials must be version-synchronized to avoid mismatches in names, quantities, and dates for the same record across two materials.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The handover-ready deployment state and operation records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Assessment implementation plan | Fields include certification occupation, level, batch, assessment method, and date; the signature section must have the institutional seal and responsible person's signature; if either is missing, it is considered unclosed | In the search test, switch `searchMode` to semantic, full-text, and hybrid, and compare the candidate count and score of plan clauses respectively; check whether the plan version number and the registration form batch number are consistent |
| Candidate registration form | Name, ID number, declared occupation and level, years of work experience, education, photo, and personal signature must be complete; the name, quantity, and date of the same candidate in the two materials must be consistent | Search once each using the same candidate name and ID number, and record the candidate count and score; turn `usingReRank` on and off, and compare the ordering of the top few results; check the dates, signatures, and receipts of the registration form and dispatch form |
| Assessor dispatch form | Assessor name, certificate number, dispatch date, session, and institutional seal must correspond to the registration form batch; if the signature or receipt is missing, it is considered unclosed | Search the dispatch form session and assessor name, and record the candidate count and score; check whether the dispatch date and plan date fall within the same batch; check whether the receipt is attached |
| Retrieval node and search test | The candidate count and score are output after pattern, merge, rerank, filter, and limit trimming; `similarity` and `limit` determine filtering and the number of items | In the search test, adjust `similarity` and `limit`, and observe changes in candidate count and score; check and record the tokens and array item count of the cited text separately, without comparing them for equality |

## Three common errors

- Symptom: the name and date of the same candidate do not match between the registration form and the dispatch form. Cause: the two materials were entered separately without version synchronization, and fields and signatures were not checked item by item during handover.
- Symptom: the versions of the plan, registration form, and dispatch form are not synchronized, and the retrieved clauses do not match the current batch. Cause: the update cadence was not unified, old versions were not archived, and retrieval returned a mix of candidates and cited content.
- Symptom: the dispatch form lacks the institutional seal or receipt, and the registration form lacks the personal signature. Cause: the handover sheet did not list signature items, and the materials entered the retrieval and recall step before being closed.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then turn rerank on and off to see the ordering of the top few results; check the values of `searchMode`, `similarity`, and `limit` and the records of candidate count and score.

Business test: check item by item according to the handover sheet to see which item record is missing; check the fields, dates, and signatures of the assessment implementation plan, candidate registration form, and assessor dispatch form, and confirm that version, connection, and task records are consistent.

- In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, record the candidate count and score each time, and compare the order of the top few results after turning `usingReRank` on and off.
- Check the fields, dates, and signatures of the assessment implementation plan, candidate registration form, and assessor dispatch form item by item according to the handover sheet, and after confirming that version, connection, and task records are consistent, hand over to operations or the next shift.
