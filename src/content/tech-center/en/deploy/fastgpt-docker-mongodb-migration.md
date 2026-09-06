---
title: Migrate FastGPT Docker MongoDB Data
slug: /en/deploy/fastgpt-docker-mongodb-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/migration/docker_mongo
source_type: Official documentation
---

# Migrate FastGPT Docker MongoDB Data

# Pre-Migration Directory Preparation
First, set up temporary backup directories for the migration. On the source FastGPT Docker container (Environment A), create a backup directory inside the container:
```
docker exec -it fastgpt sh
mkdir -p /data/backup
```
Exported MongoDB files will auto-sync to the host’s `fastgpt/data/backup` directory via configured volume mounts. If auto-sync fails, use `docker cp` to manually transfer files. On the source host, create a matching backup subdirectory in the FastGPT mongo folder:
```
mkdir -p /fastgpt/data/backup
```
Create a dedicated backup directory on the target host (Environment B) to store the transferred archive:
```
mkdir -p /fastgpt/mongobackup
```

# Export Source MongoDB Data
Export the fastgpt database from the source MongoDB instance. You can run this command directly on the source host without entering the container:
```
docker exec -it mongo bash -c "mongodump --db fastgpt -u 'username' -p 'password' --authenticationDatabase admin --out /data/backup"
```
Alternatively, enter the container and execute the export workflow step-by-step:
1.  `docker exec -it fastgpt sh`
2.  `mkdir -p /data/backup`
3.  `mongodump --host 127.0.0.1:27017 --db fastgpt -u "username" -p "password" --authenticationDatabase admin --out /data/backup`
If exported files do not auto-sync to the source host, copy them manually:
```
docker cp mongo:/data/backup [local-fastgpt-dir]:/fastgpt/data/backup
```

# Validate and Transfer Backup Archive
Compress the backup directory to verify integrity before transfer. Navigate to the source host’s FastGPT mongo data directory:
```
cd /usr/fastgpt/mongo/data
```
Create a timestamped compressed archive:
```
tar -czvf ../fastgpt-mongo-backup-$(date +%Y-%m-%d).tar.gz ./
```
Extract the archive on a staging environment (Environment C) to confirm valid `.bson` files:
```
tar -xvzf fastgptbackup-2024-05-03.tar.gz -C user/fastgpt/mongobackup/data
```
Verify the extracted file count matches the source to prevent incomplete data imports. Transfer the verified archive to the target host:
```
scp -i /Users/path/[your-pem-file] root@[old-server-ip]:/usr/fastgpt/mongo/fastgptbackup-2024-05-03.tar.gz root@[new-server-ip]:/Downloads/fastgpt2
```
Upload the archive to the target host’s designated backup directory (do not use `fastgpt/data/` to avoid import errors):
```
scp -rfv [local-path]/Downloads/fastgpt/fastgptbackup-2024-05-03.tar.gz root@[new-server-ip]:/Downloads/fastgpt/backup
```

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/migration/docker_mongo)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
