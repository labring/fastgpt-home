---
title: Where Files Live: Local Volumes, Object Storage and External S3
slug: /en/guide/file-storage-selection
page_type: Decision matrix
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Compare local-volume-backed MinIO, shared MinIO, and external S3-compatible storage for FastGPT by capacity, access, backups, and migration needs.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Where Files Live: Local Volumes, Object Storage and External S3 | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 决策矩阵页-第2批/英文-fastgpt.io/guide/file-storage-selection.md
source_sha256: 9c7964d2c442188bab507e0f2e58a772fbd4be0660abd0f51f6e82fb1eedb8da
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository and community threads, verified 2026-09-14.
---

# Where Files Live: Local Volumes, Object Storage and External S3

## When this decision has to be made
Make this storage decision when self-hosting FastGPT on local infrastructure or in a public cloud for knowledge base uploads, plugins, session files, or tool resources. Here, local volumes are the persistence layer beneath self-hosted MinIO; FastGPT accesses files through object storage interfaces.
Choosing a storage design before understanding workload size can increase operating and migration costs. Plan capacity and a shared object storage service that all relevant application nodes can reach.
Delaying capacity, backup, and endpoint planning can disrupt uploads, parsing, or plugin use. Configure file access endpoints that the relevant user browsers or model services can reach.
You must finalize this decision before official launch if you plan to deploy FastGPT across multiple nodes, integrate with third-party object storage services, implement long-term file archiving, or meet compliance requirements.

## Criteria matrix
| Candidate Solution               | Storage Medium Dependency       | Cross-Node File Sharing Capability | External Access Compatibility                                                                 | Configuration Complexity | Data Persistence Scope                                                                 | Plugin/Knowledge Base File Adaptability                                                                 |
|----------------------------------|----------------------------------|-------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------|----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Local-volume-backed single-node MinIO | Local persistent volumes or bind mounts | Application nodes can share files through the MinIO service | Access through a MinIO endpoint reachable by the relevant clients | Low to medium | Persistent volumes survive container recreation; volume deletion or media failure requires backup recovery | Suitable for smaller deployments after capacity, performance, and backup validation |
| Shared MinIO service | Local or cloud disk storage volumes | Supported; validate reachability from each node | Configure a client-reachable address through `STORAGE_EXTERNAL_ENDPOINT` | Medium | Depends on persistent volumes, storage topology, and backups | Supports object storage scenarios such as knowledge base and plugin files; validate buckets and access |
| External S3-compatible storage (OSS/COS/R2 etc.) | Third-party cloud services | Supported; validate network access and permissions | Configure provider endpoints, signatures, and access permissions for the intended networks | High | Depends on provider persistence and configured backup, versioning, and retention policies | Validate compatibility by vendor, FastGPT version, and file scenario |

## Why each criterion matters
### Storage Medium Dependency
This criterion determines reliability and operational costs. Self-hosted MinIO can use persistent local volumes that retain data across container recreation. Volume deletion or storage media failure requires backup recovery. Plan capacity because full disks can block uploads. A `STORAGE_EXTERNAL_ENDPOINT` validation failure calls for checking URL format and endpoint configuration; check disk capacity separately. With external S3-compatible storage, the provider maintains the underlying storage, while your team evaluates availability, retention, backups, and compliance.

### Cross-Node File Sharing Capability
This criterion affects multi-node deployment. Application nodes need network access to the same object storage service. Single-node MinIO can serve multiple application nodes, with capacity and failure boundaries determined by its storage deployment. For [uploads stuck at progress 17](https://github.com/labring/FastGPT/issues/6319), investigate upload, object access, and parsing separately. Shared MinIO and external S3-compatible storage both require network, bucket-permission, and signed-access checks from all relevant nodes.

### External Access Compatibility
This criterion determines whether user browsers and model services can access required files. Self-hosted MinIO serves files through object storage endpoints. Set `STORAGE_EXTERNAL_ENDPOINT` to an address reachable by the relevant clients, and use private buckets and signed URLs where appropriate. For [pre-signed upload URL generation failures](https://github.com/labring/FastGPT/issues/6181), check endpoints, credentials, and bucket settings. External S3-compatible storage also requires endpoint, region, and network validation; see the [Huawei Cloud OBS configuration troubleshooting example](https://github.com/labring/FastGPT/issues/5169).

### Configuration Complexity
This criterion affects deployment and maintenance work. Local-volume-backed MinIO requires a persistent volume, an object storage service, buckets, and access credentials. A shared MinIO service also requires endpoint and node-reachability checks; the [external endpoint validation example](https://github.com/labring/FastGPT/issues/6770) helps identify URL configuration issues. Configure external storage endpoints, regions, credentials, and path-style access according to the provider. Validate SDK and build compatibility separately, including issues such as the [ali-oss variable reference error after packaging](https://github.com/labring/FastGPT/issues/6678).

### Data Persistence Scope
This criterion determines data security and maintainability. Persistent volumes and bind mounts can retain data across container recreation. Container writable layers, volume deletion, and host storage failure have different recovery boundaries. Self-hosted MinIO requires backups and recovery drills, with reliability depending on topology and failure domains. External providers maintain the underlying storage media; your team configures versioning, retention, and backups and checks availability and recovery commitments.

### Plugin/Knowledge Base File Adaptability
This criterion affects core FastGPT functions. Both local-volume-backed MinIO and a shared MinIO service require capacity, concurrency, and backup validation. Configure `fastgpt-public` and `fastgpt-private` buckets as appropriate, then test knowledge base, plugin, and session-file uploads, reads, and signed access. Validate external storage compatibility by `STORAGE_VENDOR`, provider, and FastGPT version. For example, `v4.15.5` added Cloudflare R2 support; each file scenario still requires validation.

## The cost of switching later
Switching from your chosen storage solution to another carries costs including data migration, configuration adjustments, and business interruptions.
Legacy upgrades include the v4.14.3 migration of MongoDB GridFS knowledge base files and the v4.14.4 migration of legacy upload data to S3 object storage. Follow the corresponding upgrade procedure, then verify signed URLs, plugin installation, knowledge base uploads, and file downloads.
To switch between self-hosted MinIO and external S3-compatible storage, migrate the relevant buckets and objects and update the vendor-specific environment settings, including `STORAGE_VENDOR`, endpoints, credentials, and the external access address. Validate initialization, uploads, downloads, and signed access.
To return to self-hosted storage, deploy MinIO with persistent volumes and migrate the objects into it. Plan a cutover window based on write synchronization and the chosen switching method, and validate object paths, permissions, and rollback.

## When this decision can wait
For a single-node test deployment with a small number of files, start with the default MinIO configuration and attach a persistent volume.
During initial evaluation, while deployment architecture and business scale are still being determined, use this MinIO setup to validate basic functions before finalizing the storage design.
When prioritizing model configuration and knowledge base training, record the current buckets, endpoints, credential management, and backup approach. Revisit selection as plugin use, multiple application nodes, external file access, or long-term archiving becomes relevant.
Retaining portable objects and configuration records helps reduce the cost of later scaling or switching. Choose the final design against measured capacity, performance, and recovery requirements.

## Keep reading

- [Releasing and Regression-Testing an App: Versions, Canary and Rollback](/en/guide/app-release-and-regression)
- [High Availability and Disaster Recovery: What Must Be Redundant, What Can Wait](/en/guide/high-availability-topology)

## References

- [FastGPT v4.17.0 storage environment variables](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/self-host/config/env.mdx)
- [FastGPT v4.14.3 GridFS migration](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/self-host/upgrading/4-14/4143.mdx)
- [FastGPT v4.14.4 legacy upload migration](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/self-host/upgrading/4-14/4144.mdx)
- [Docker volume persistence](https://docs.docker.com/engine/storage/volumes/)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
