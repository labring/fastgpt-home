---
title: Upgrade Pgvector for Sealos FastGPT Deployments
slug: /en/deploy/pgvector-upgrade-sealos-fastgpt
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45
source_type: 官方文档
---

# Upgrade Pgvector for Sealos FastGPT Deployments

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Upgrade Overview
This procedure covers upgrading the pgvector extension from version 0.4.1 to 0.5.0 for FastGPT deployments hosted on Sealos. The workflow includes updating the extension, adjusting database memory settings for index construction, rebuilding database indexes, and creating a new HNSW vector index.

## Step-by-Step Upgrade Workflow
Complete all steps in the listed order:
1. Launch the Sealos Desktop application via https://cloud.sealos.io?uid=fnWRt09fZP.
2. Navigate to the details page for the **pg** database application.
3. Select the Restart button in the upper-right corner of the details page, then wait for the database restart to finish.
4. Use the One-Click Connect option in the left sidebar to open the database terminal.
5. Execute the following SQL commands sequentially in the terminal:
```sql
-- Upgrade the extension
ALTER EXTENSION vector UPDATE;
-- Verify the upgrade was successful — the vector extension version should be 0.5.0 (previously 0.4.1)
\dx

-- The following two statements set the memory available to PG during index building. Adjust based on your database specs — a good rule of thumb is 1/4 of total memory.
alter system set maintenance_work_mem = '2400MB';
select pg_reload_conf();

-- Rebuild database indexes and collation
REINDEX DATABASE postgres;

-- Start building the index. This takes a very long time — just close the Terminal by clicking the X in the upper-right corner.
CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw (vector vector_ip_ops) WITH (m = 16, ef_construction = 64);
-- You can reconnect to the Terminal and run the command below. If you see "vector_index" hnsw (vector vector_ip_ops) WITH (m='16', ef_construction='64'), the build is complete (make sure there is no INVALID at the end).
\d modeldata
```

## Post-Upgrade Validation
To confirm the upgrade completed successfully:
1. First, verify the pgvector version by running `\dx` in the terminal; the output should list the vector extension as version 0.5.0.
2. If you closed the terminal during index creation, reconnect using One-Click Connect and run `\d modeldata`. Confirm the `vector_index` appears with the exact specified parameters and has no INVALID suffix.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45)
