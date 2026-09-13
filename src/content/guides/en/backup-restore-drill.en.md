<!--
slug: backup-restore-drill
canonical: https://fastgpt.io/guide/backup-restore-drill
hreflang: en | zh-CN → https://fastgpt.cn/guide/backup-restore-drill | en → https://fastgpt.io/guide/backup-restore-drill | x-default → https://fastgpt.io/guide/backup-restore-drill
Meta title: FastGPT Backup and Restore Drill Acceptance Checklist
Meta description: Plan a FastGPT restore drill that validates backup integrity, dependencies, business data, permissions and recovery objectives before an outage occurs.
keywords: backup restore drill
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 深度内容-英文版/backup-restore-drill-EN-V1.0-20260907.md
source_sha256: 5c287451f9b36cb8fc63d4f6aebdb9d254b477b06819403c99279c1b7a4e1ed4
source_verified: 2026-09-07
publication_batch: Week08
-->

# Backups Are Not Recovery: How Far a Restore Drill Must Go

## When this becomes a decision
You face this critical decision when your privately deployed FastGPT instance experiences full application or knowledge base loss, post-upgrade service failure, or failed data loading after cross-environment migration. For example, some users roll back images after cross-version upgrades and find their database data missing, or fail to restore business data after migration due to incorrect export/import steps.

Backups are only a basic prerequisite. Validating that backups can be restored becomes the core decision point. This requirement becomes mandatory when you build fault recovery plans, run pre-upgrade risk checks, or execute cross-environment deployment migrations. Relying solely on the belief that backups exist will lead to unrecoverable data and prolonged business downtime during real outages. You must move from "having backups" to "having verified restorable backups" and build a full recovery drill system.

## What to settle first
You must define these criteria in priority order before starting any restore drill:

| Criterion | What to set | Basis |
| --- | --- | --- |
| Backup Integrity | Backup files include full MongoDB fastgpt database data, PG vector library data, core configuration files, and persistent storage directories | Community migration issues outline requirements for mongodump database exports and persistent directory backups |
| Recovery Environment Consistency | Recovery images and database versions match the backup; endpoints, credentials and volumes belong to the isolated drill environment | Community upgrade cases show data loss occurs due to mismatched configurations |
| Recovery Process Executability | Restore steps have no hidden operations, and operators can complete data export, import, and service startup per documentation | Community user feedback reports repeated migration failures due to undocumented steps |
| Core Data Accessibility | After restoration, the system allows normal login, and core business data such as applications, knowledge bases, and chat history displays fully | Community reports of post-upgrade data disappearance incidents |
| Dependent Service Connectivity | All services (FastGPT, Mongo, PG, Sandbox) have normal network connectivity, and health check interfaces return valid statuses | Community issues cover connection errors and Sandbox configuration failures |
| Permission Configuration Correctness | Database connections, API keys and ROOT_KEY target the isolated drill environment; permission scopes match the intended recovery policy | Community reports of connection failures caused by unsynchronized configuration file changes |

Backup integrity is the foundation. If backup files lack core data sets or persistent directories, all subsequent recovery work is meaningless. Recovery environment consistency follows next: different mirror versions have data structure changes, such as new sandbox environment variables added in v4.16.0 and deprecated old variables. Mismatched configurations will prevent normal data reading. Recovery process executability ensures no operational mistakes during the process. Core data accessibility is the final validation target, while dependent service connectivity and permission configuration correctness support this goal to ensure the restored system runs core business functions properly.

## How to do it
First, define the core resources to back up: MongoDB fastgpt business database, PG vector library data, system configuration files (docker-compose.yml, .env, config.json), and persistent storage directories.

Run these specific commands to back up data:
1. Enter the MongoDB container and run the export command:
   ```
   docker exec -it mongo bash -c "mongodump --db fastgpt -u 'username' -p 'password' --authenticationDatabase admin --out /data/backup"
   ```
2. Use the docker cp command to copy the backup directory from the container to the host machine, then compress the backup files to ensure integrity and portability.
3. Back up the PG database’s persistent directory, Sandbox storage directory, and all system configuration files to avoid missing critical settings.

Next, pull matching mirror versions for all core services: fastgpt-app, fastgpt-pro, mongo, pg, and any other dependent services. Ensure versions match the backup being restored.

Configure the recovery environment:
- Set environment variables such as AGENT_SANDBOX_PREVIEW_PROXY_URL and VM_VOLUME_NAME_PREFIX for sandbox features. Remove deprecated variables, such as PARSE_FILE_WORKERS and PARSE_FILE_WORKER_MEMORY_LIMIT_MB required for v4.16.2.
- Configure MONGODB_URI and PG_URL for isolated recovery databases, verify the target hosts and volumes, and retain compatible database versions and options.
- Set up the network environment so all services use the same Docker network or correct port mapping rules to avoid connectivity issues.
- If Agent Sandbox is enabled, configure related environment variables, follow single-port or multi-port deployment rules, and avoid same-origin deployment security boundary issues.

Execute the recovery steps:
1. Create an empty MongoDB data volume in the isolated recovery environment and verify its host and mount path before importing the backup.
2. Import the backed-up database data with the mongorestore command:
   ```
   docker exec -it mongo mongorestore -u "username" -p "password" --authenticationDatabase admin /tmp/backup/ --db fastgpt
   ```
3. Restore the PG database’s persistent directory if applicable.
4. Start all services and wait for initialization to complete. Check https://{{proxy-host}}/health on the Agent Sandbox Proxy to confirm proxy reachability, then verify the main application, databases and business functions separately, and review Sandbox service logs for connection or configuration errors.
5. Run this migration only when the restore crosses an applicable Agent Sandbox migration version and the backup contains legacy Sandbox data. For a same-version restore, validate existing data first. Review pending records with the dry-run request:
   ```
   curl -X POST 'https://your-domain/api/admin/4160/initUserSandbox' -H 'Content-Type: application/json' -H 'rootkey: your-ROOT_KEY' -d '{"dryRun":true}'
   ```
   After confirming backups and scope, follow the release notes to run dryRun:false. The formal request normalizes data first and proceeds once pendingCount reaches zero. Verify normalization.pendingCount=0, normalizationBlocked=false and failedCount=0 in the formal result. Use skipError:true only after confirming that every failure is a missing or deleted source App/Skill. Skipped records remain unmigrated; review skipped and skippedCount separately.

Additional notes for specific deployments:
- If you use a Milvus vector library, upgrade it to version 2.5.16 or higher before deploying FastGPT v4.16.2 or later, otherwise the system will fail to start. To migrate Milvus vector data, call the GET /api/admin/4162/milvus endpoint to move old data to the modeldata_v2 collection and avoid re-generating embeddings.
- If the restore also upgrades a commercial deployment across an ACL migration version, follow that release’s permission cleanup and migration instructions, including dry-run and post-migration checks.
- Follow the official upgrade guide step-by-step for version upgrades, and avoid direct cross-major version jumps to prevent data structure incompatibility.

## How to verify
Run these checkable items to confirm a successful restore:
1. **Backup file validation**: Confirm backup file size and quantity match expected values. Run the mongorestore dry-run mode to verify backup integrity; the command must return success with no missing or corrupted data errors.
2. **Recovery environment validation**: Check that service images and database versions match the backup and that endpoints, credentials and volumes belong to the isolated drill environment. Run health check endpoints for all services; all must return normal status with no configuration error logs.
3. **Core data validation**: Use Mongo Compass to connect to the restored MongoDB database, and confirm the document count of core collections (app, dataset, chat) in the fastgpt database matches pre-backup levels. No core business data should be missing.
4. **System function validation**: Log in to the FastGPT system, verify that application lists, knowledge base lists, and chat history display correctly. Create a new application, upload a file to a knowledge base, and test parsing functionality. All core business functions must run without errors.
5. **Dependent service validation**: Test Sandbox code execution functionality, confirm the Sandbox address configuration is correct, and run a curl command to test Sandbox connectivity. No errors should appear in Sandbox logs or during code execution.
6. **Permission and integration validation**: Confirm environment variables including API keys, database connection parameters, and ROOT_KEY are correct. Test external API calls; all must succeed with no permission or connection errors.
7. **Upgrade and migration validation**: If a version upgrade requires Sandbox migration, inspect its formal result for normalization.pendingCount=0, normalizationBlocked=false and failedCount=0. Review skipped and skippedCount separately; a later dry-run alone does not establish completed migration.

## Limits: when this approach does not hold
This recovery process will not work in these scenarios:
1. **Dependent service version mismatches**: If the recovery environment’s dependent service versions differ significantly from production (for example, upgrading MongoDB from 4.4 to 6.0), backup data formats may be incompatible. You must run additional data migration scripts before recovery.
2. **Corrupted or missing backup files**: If a backup process (such as mongodump) is interrupted by network issues, leading to missing or corrupted collection data, you must re-run the full backup operation.
3. **Third-party object storage missing**: If you use a third-party object storage for file storage and do not back up the full bucket data, restored systems will lose access to uploaded files. You must add object storage bucket backups to your workflow.
4. **Unbacked custom resources**: If your system uses custom plugins, workflows, or third-party integrations that are not included in backups, restored systems may fail to run these features. You must back up all custom resources separately.
5. **Multi-cluster or cross-region deployments**: This process only applies to single-node deployments. Multi-cluster or cross-region data sync environments require additional steps to ensure data consistency.
6. **Unupgraded Milvus**: If your FastGPT v4.16.2 or later deployment uses Milvus below 2.5.16, the system will fail to start. You must complete the Milvus upgrade first.
7. **Operator error or lack of training**: Even with complete backups and a matching recovery environment, recovery may fail if operators do not know the correct steps or have not run prior drills.

## Keep reading

- [Decision Guide for Upgrade Cadence: Version-Skip Risks and Rollback Readiness](/en/guide/version-upgrade-decision)
- [API Integration Acceptance Criteria: Auth, Rate Limits, and Error Handling](/en/guide/api-integration-acceptance)
- [Observability Baseline Before Go-Live: Logs, Metrics and Alert Ownership](/en/guide/observability-baseline)

## References

- [FastGPT Agent Sandbox Proxy health check](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/common)
- [FastGPT 4.16.0 Agent Sandbox migration](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)
- [FastGPT deployment environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT 4.16.2 migration instructions](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4162)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- [Contact sales](/en/contact): apply this process to your deployment
- [Get started](/en/start): validate the process on the cloud service
- [Pricing](/en/price): compare what each form covers
