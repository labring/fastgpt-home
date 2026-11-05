---
title: Database Connections and Operations for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c026-f011
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Databases | Operations
meta_description: Degree Certificates: review databases for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Database Connections and Operations for Degree Awards and Certificate Information Reporting: Coordinate Operations and Application Handover

## What this category's data looks like

The category materials for degree conferral and certificate information reporting include degree application forms, thesis review forms, and defense resolutions. Their sources are training units and degree management departments, and their update cadence advances by batch and by semester. When entering the deployment, operations, and application handover function, the degree application form takes on the role of basic fields and dates, the thesis review form takes on the role of review comments and signatures, and the defense resolution takes on the role of voting conclusions and receipts. Field characteristics are concentrated in name, quantity, date, signature, and version. If the name, quantity, or date of the same record does not match across the two materials, if the version is not synchronized, or if a signature or receipt is missing, all of these will affect the handover-ready deployment status and operation records.

## Configuration and implementation checks

This link is determined by the connection configuration of the deployment environment (server side), not by the capability execution of a model node, and it outputs whether the connection is available (service startup result and connection logs). "Handover-ready deployment status and operation records" are then completed by deployment handover and subsequent business processing. Connection addresses are configured through environment variables: the main business database, log database, cache, and vector database can each point to different instances; if the log database is not configured separately, it reuses the main database.

| Object | Check | Verification action |
| --- | --- | --- |
| Main business database connection variable | Points to the main business database actually in use and can connect; verify that the `MONGODB_URI` value matches the database address | In the deployment environment, verify that the variable value matches the database address, and check the connection result in the startup logs |
| Log database connection variable | Configured separately, or left blank according to the instructions to reuse the main database; verify the database to which logs are written | Check whether the variable is set, verify the database to which logs are written, and confirm its relationship with the main business database |
| Cache connection variable | The cache instance can connect; verify that the `REDIS_URL` value matches the instance address | Connect once with a client, verify the response, and check the cache connection result in the startup logs |
| Vector database connection variable | Consistent with the vector database actually in use; verify the `PG_URL` value and the address of the selected vector database | Check the selected vector database and address against the deployment instructions, and check the vector database connection result in the startup logs |

## Three common errors

- Symptom: after startup, the logs continuously report connection timeouts. Cause: the main business database or cache connection variable does not match the instance address, and the server side cannot establish a connection.
- Symptom: the name, quantity, or date of the same record does not match between the degree application form and the defense resolution. Cause: the version is not synchronized, and fields across materials are not checked against the same batch.
- Symptom: the thesis review form is missing a signature or receipt. Cause: the handover form was not checked item by item, and signature and receipt records were not transferred together with the deployment status.

## How to verify the setup

Acceptance for this function: connect once to the main business database, log database, cache, and vector database item by item, check the connection results in the startup logs, and verify that the values of the three connection variables `MONGODB_URI`, `REDIS_URL`, and `PG_URL` match the instance addresses.

Business test: check once item by item according to the handover form, see which record is missing, and compare the name, quantity, date, and signature of the degree application form, thesis review form, and defense resolution.

- In the deployment environment, verify that the values of the main business database, log database, cache, and vector database connection variables match the instance addresses, and save the connection results from the startup logs.
- Check the name, quantity, date, and signature of the degree application form, thesis review form, and defense resolution item by item according to the handover form, record missing items, and hand them over to the next shift.
