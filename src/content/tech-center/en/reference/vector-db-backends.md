---
title: FastGPT Vector Database Backends Reference
slug: /en/reference/vector-db-backends
page_type: reference-data
source: https://github.com/labring/FastGPT
source_type: Open-source repository definitions (FastGPT v4.17.0, fastgpt-plugin v1.1.3)
description: Vector database backends supported in FastGPT v4.17.0, with connection settings and index parameters
language: en
check_day: 2026-09-29
meta_title: FastGPT Vector Database Backends Reference
meta_description: Vector database backends supported in FastGPT v4.17.0, with connection settings and index parameters
date_published: 2026-09-29
date_modified: 2026-09-29
---

# FastGPT Vector Database Backends Reference

This page lists the vector database backends FastGPT v4.17.0 actually dispatches to in code, together with each backend's own connection settings and index parameters. Data comes from the vector database controller and constant definitions in the open-source repository.

## Backends (4)

| Backend | Connection setting | Index and distance parameters |
| --- | --- | --- |
| Milvus | `MILVUS_ADDRESS / MILVUS_TOKEN` | `HNSW`, `IP` |
| OceanBase | `OCEANBASE_URL` | `ef_construction`, `m=16` |
| PostgreSQL (pgvector) | `PG_URL` | `ef_construction`, `ef_search`, `m = 32`, `vector_ip_ops` |
| openGauss | `OPENGAUSS_URL` | `ef_construction`, `ef_search`, `m = 32` |

## One compatibility detail that is easy to miss

- **SEEKDB** appears as a separate deployment option (`SEEKDB_URL`), but in code it reuses the OceanBase controller directly (MySQL wire-protocol compatible). Index parameters and configuration semantics are therefore identical, and the two should be treated as one option during selection.

## Three things to keep in mind

1. Once a backend is chosen and indexes are built, switching to another backend requires rebuilding all vector data; changing the connection string alone does not migrate anything.
2. Valid ranges for index parameters depend on the backend version. The table lists parameter names recognised in code; consult the backend's own documentation for supported values.
3. The same configuration behaves differently at different data volumes. Calibrate against measured data before scaling.

## Scope of this reference

Content is taken from open-source repository definitions at version v4.17.0. The following are out of scope:

- Deployment forms and settings specific to the commercial edition
- Parameter availability differences across backend versions
- Parameters managed by the provider in hosted deployments

## References

- [FastGPT source repository](https://github.com/labring/FastGPT)
- [fastgpt-plugin source repository](https://github.com/labring/fastgpt-plugin)
