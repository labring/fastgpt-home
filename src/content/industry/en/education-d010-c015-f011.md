---
title: Database Connections and Operations for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c015-f011
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Databases | Operations
meta_description: Student Mental Health: review databases for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for School Mental Health Screening and Referrals: Coordinate Operations and Application Handover

## What this category's data looks like

In the primary and secondary school mental health screening and referral scenario, the materials entering the deployment, operations, and application handover stage are mainly of three types: psychological screening plans, interview records, and referral forms. The psychological screening plan carries the screening subjects, scale names, administration dates, and signatures of the persons in charge; the interview record carries the interview time, interviewer, student pseudonym, and conclusions; the referral form carries the referral subject, referral destination, receipt of acceptance, and signatures of both parties. After deployment, the three types of materials are written by the business system into the primary business database, logs are written into the log database or reuse the primary database, the cache carries the streaming recovery mirror, and the vector database carries the retrieval index. The sources are the original forms submitted by the school psychological center and homeroom teachers, and the update rhythm advances according to semester screening batches and individual case referral milestones. When the materials enter this function, the screening plan is the batch entry point, the interview record is the process trace, and the referral form is the destination credential; the fields, dates, and signatures of the three must be aligned item by item on the handover form.

## Configuration and implementation checks

This link is executed by the connection configuration of the deployment environment (server side), not by the capability of the model node, and outputs whether the connection is available (service startup result and connection logs). The handover-ready deployment status and operation records are then completed by the deployment handover and subsequent business processing.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The fields include screening subjects, scale names, administration dates, and signatures of the persons in charge, and are consistent with the corresponding items in the interview records and referral forms | Check whether the subject list, scale names, dates, and signatures in the plan and the handover form are aligned item by item |
| Interview record | The fields include interview time, interviewer, student pseudonym, and conclusions, and match the names and quantities in the screening plan and referral form | Compare the names, quantities, and dates of the same record in the two materials, and check entries missing signatures or receipts |
| Referral form | The fields include referral destination, receipt of acceptance, and signatures of both parties, and the version is synchronized with the screening plan and interview records | Check the referral form receipt and signatures, and confirm that the version number is consistent with the handover form record |
| Primary business database connection variable | Points to the primary business database actually in use and can connect, and points to different instances from the log database, cache, and vector database respectively | Check in the deployment environment that the value of `MONGODB_URI` is consistent with the database address, and check the connection result in the startup logs |

## Three common errors

- Phenomenon: The pseudonym, quantity, and date of the same student in the screening plan and interview record do not match. Cause: The two materials were entered separately and were not checked item by item against the handover form.
- Phenomenon: The referral form version is not synchronized with the screening plan, and the receipt of acceptance is missing. Cause: During handover, only the connection status was checked, not the material version and signed receipt.
- Phenomenon: After startup, the logs continuously report connection timeouts, and business data and logs are mixed in the same place. Check: the write location was not checked according to the instructions. Logs use the primary database when no separate log database is configured; inspect the actual log destination separately.

## How to verify the setup

Acceptance of this function: Connect once item by item to the primary business database, log database, cache, and vector database, and check the connection results in the startup logs; check that the values of `MONGODB_URI`, `REDIS_URL`, and `PG_URL` are consistent with the deployment instructions.

Business test: Check item by item once according to the handover form, see which record is missing, and compare the fields, dates, and signatures of the screening plan, interview records, and referral forms.

- In the deployment environment, check that the values of `MONGODB_URI`, `REDIS_URL`, and `PG_URL` are consistent with the database addresses, and record the connection results in the startup logs.
- Check item by item according to the handover form the names, quantities, dates, signatures, and receipts of the screening plan, interview records, and referral forms, and mark missing items.
