---
title: Explain FastGPT File and Data Storage Relationships
slug: /en/deploy/fastgpt-file-data-storage-relationships
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/design/dataset
source_type: Official documentation
---

# Explain FastGPT File and Data Storage Relationships

## Storage Architecture Separation
FastGPT uses two distinct storage systems for dataset-related data. All uploaded files are stored using MongoDB’s GridFS, a specification built for storing large binary files. Core dataset records, including text and associated metadata, are stored exclusively in PostgreSQL. Every row in the PostgreSQL dataset table includes a `file_id` column that references the unique identifier of the corresponding stored file. This separation optimizes storage and access for each data type’s specific needs.

## Reserved `file_id` Values
To support backward compatibility, manual data input workflows, and annotated dataset entries, the `file_id` field includes two reserved special values. These values substitute standard file reference IDs for non-file-based dataset entries. The following table lists the reserved `file_id` values and their official purposes:
| `file_id` Value | Purpose |
|------------------|---------|
| `manual`         | Manually entered dataset data |
| `mark`           | Manually annotated dataset data |

## Immutable `file_id` Assignment
The `file_id` field follows a strict write-once policy. It is only written to a PostgreSQL dataset row during the initial data insertion process. Once the `file_id` value is set, it cannot be modified or altered for the existing dataset record. This constraint ensures consistent reference between dataset entries and their associated stored files, maintaining data integrity across the dataset.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/design/dataset)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
