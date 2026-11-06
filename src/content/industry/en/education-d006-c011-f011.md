---
title: Database Connections and Operations for School Exam Question Setting and Grading: Track Progress and Check Statistics
slug: /en/industry/education-d006-c011-f011
page_type: 行业问题页
application_area: education
meta_title: School Exams | Databases | Progress
meta_description: School Exams: review databases for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for School Exam Question Setting and Grading: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of exam question setting and marking in primary and secondary schools, organizing three types of materials around progress records and statistical verification: the two-way specification table for question setting, exam papers, and marking rubrics. The materials come from the school's question-setting group, marking group, and academic affairs archives, with updates advancing on a weekly basis and multiple revisions within the week. Field characteristics include name, quantity, date, signature, and receipt, and version numbers are often distinguished by date suffixes. The three types of materials play different roles when entering database and operations functions: the two-way specification table provides the correspondence between test points and question numbers, exam papers carry the question text and scores, and marking rubrics give scoring points and deduction boundaries. The progress table and statistical scope description are completed subsequently by deployment handover and follow-up business processing, and the materials themselves are not written into connection variables.

## Configuration and implementation checks

This link is executed by the connection configuration of the deployment environment (server side), not by the capability of the model node, and outputs whether the connection is available (service startup result and connection logs). The "progress table and statistical scope description" are completed subsequently by deployment handover and follow-up business processing. The connection address is configured by environment variables, and the main business database, log database, cache, and vector database can point to different instances respectively; when the log database is not configured separately, it reuses the main database.

| Object | Check | Verification action |
| --- | --- | --- |
| Two-way specification table for question setting | Fields include test points, question numbers, date, and signature; they must correspond item by item with the question numbers in the exam paper, and versions are distinguished by date suffixes | Check whether the name, quantity, and date of this table and the exam paper are consistent, check whether signatures and receipts are complete, and confirm that the main business database connection variable `MONGODB_URI` points to the database address actually in use |
| Exam paper | Fields include question numbers, scores, date, and signature; they must correspond with the scoring points in the marking rubric | Check whether the question numbers, scores, and date of the exam paper and the marking rubric are consistent, check whether the versions are synchronized, and confirm that the cache connection variable `REDIS_URL` is connectable |
| Marking rubric | Fields include scoring points, deduction boundaries, date, and signature; they must correspond with the test points in the two-way specification table | Check whether the test point names, quantity, and date of the rubric and the specification table are consistent, check for missing signatures or receipts, and confirm that the vector database connection variable `PG_URL` is consistent with the vector database actually in use |
| Progress table and statistical scope description | The number of records and the statistical count must match, the scope must be written in the header, and exceptions must be listed separately | Use one week of records to check the total, see whether the scope and exceptions are clearly written, and check the selected vector database and address against the deployment instructions |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the two-way specification table and the exam paper. Cause: The two are entered separately, lacking cross-checking and version synchronization.
- Phenomenon: The question numbers and scores of the marking rubric and the exam paper are inconsistent, and the versions are not synchronized. Cause: After revision, only one material was updated, while the other still retains the old version.
- Phenomenon: The progress table lacks signatures or receipts, and the statistical total does not match the number of records. Cause: The scope was not written in the header, and exceptions were not listed separately.

## How to verify the setup

Acceptance of this function: connect once to the main business database, log database, cache, and vector database item by item, check the connection results in the startup logs, and confirm that `MONGODB_URI`, `REDIS_URL`, and `PG_URL` each point to the instance actually in use.

Business test: use one week of records to check the total, and see whether the scope and exceptions are clearly written.

- In the deployment environment, check that the value of this variable is consistent with the database address, check whether the log database variable is set, and check the database to which logs are written.
- Use a client to connect to the cache once, check the return, and check the selected vector database and address against the deployment instructions.
