---
title: Migrate FastGPT MongoDB Deployments With mongodump
slug: /en/deploy/fastgpt-mongodb-migration-mongodump
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/migration/docker_mongo
source_type: Official documentation
---

# Migrate FastGPT MongoDB Deployments With mongodump

Migrate FastGPT's MongoDB database between deployments using `mongodump` and `mongorestore`.

## Prerequisites
Three separate environments are required for the migration:
1.  **Environment A**: Your existing active FastGPT deployment (e.g., on Alibaba Cloud) that requires migration.
2.  **Environment B**: The new target FastGPT deployment (e.g., on Tencent Cloud, or a NAS device such as Synology/QNAP). NAS-based deployments require MongoDB 4.2 or 4.4, while cloud deployments support the default FastGPT MongoDB version.
3.  **Environment C**: A local staging machine used to store backup files and coordinate the data transfer between Environment A and Environment B.

## Migration Workflow
Follow these ordered steps to complete the MongoDB migration:
1.  **Export Backup from Environment A**: Connect to the MongoDB instance in Environment A, then run `mongodump` to create a full backup of the FastGPT database. Replace placeholder values with your environment's specific details:
    ```bash
    mongodump --host ${A_MONGODB_HOST} --port ${A_MONGODB_PORT} --db ${FASTGPT_DB_NAME} --out ./fastgpt-migration-backup
    ```
2.  **Transfer Backup to Environment C**: Copy the generated backup directory from Environment A to your local staging machine using a secure transfer tool such as `scp`:
    ```bash
    scp -r ./fastgpt-migration-backup ${ENV_C_USER}@${ENV_C_HOST}:~/fastgpt-migration-backups/
    ```
3.  **Restore Backup to Environment B**: Connect to the MongoDB instance in Environment B, then use `mongorestore` to import the backup data. Ensure you target the correct database for the new FastGPT deployment:
    ```bash
    mongorestore --host ${B_MONGODB_HOST} --port ${B_MONGODB_PORT} --db ${FASTGPT_DB_NAME} ~/fastgpt-migration-backups/fastgpt-migration-backup/${FASTGPT_DB_NAME}
    ```

## NAS Deployment Specific Notes
If Environment B is a NAS-based FastGPT deployment, confirm that the installed MongoDB version is 4.2 or 4.4 prior to restoring the backup. Mismatched MongoDB versions may cause compatibility issues during the restore process or with the running FastGPT service. Cloud-based Environment B deployments do not require manual MongoDB version selection, as they use the default FastGPT-supported version.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/migration/docker_mongo)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
