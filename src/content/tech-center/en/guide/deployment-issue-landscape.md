---
title: FastGPT Deployment and Environment Issue Landscape
slug: /en/guide/deployment-issue-landscape
page_type: Issue landscape
article_section: Deployment
is_part_of: FastGPT Tech Center
delivery_source_type: Programmatic grouping of published pages
source_type: 官方文档
source: https://github.com/labring/FastGPT
meta_title: FastGPT Deployment and Environment Issue Landscape | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-28
source_file: 聚合页-第2批/英文-fastgpt.io/guide/deployment-issue-landscape.md
source_sha256: 1cb5620dd12705e0f33b84ffc827fec92328ca888300ac83f0f30b92779c2c2c
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Entries taken from published documents, grouped programmatically by the technical objects in their titles. Verified 2026-09-14.
meta_description: Navigate 440 FastGPT troubleshooting articles across 10 deployment stages, from containers and storage to model access and authentication.
---

# FastGPT Deployment and Environment Issue Landscape

This page links to 10 deployment-stage issue lists covering 440 published articles. Use the routing steps to identify the failing stage, then open its list for detailed troubleshooting.

## Narrowing down: three steps

| Step | What to confirm | Points to |
| --- | --- | --- |
| 1 | Whether the service process started, and the state of container and orchestration components | Process not up &rarr; containers and orchestration, images and architecture; process up but unreachable &rarr; startup and reachability |
| 2 | Whether backend logs show connection errors from dependencies (database, object storage, inference service) | Database or storage errors &rarr; databases and object storage; model call errors &rarr; model serving and inference |
| 3 | Whether the problem appeared after a version or configuration change | After a change &rarr; upgrades and migrations, environment and configuration; unrelated to a change &rarr; follow the conclusion from steps 1 and 2 |

## Stages, how to tell them apart, and document counts

| Stage | How to tell | Published documents | List |
| --- | --- | --- | --- |
| Images and architecture | container images and processor architecture | 13 | [Open list](/en/guide/image-architecture-issues) |
| Containers and orchestration | container runtime and orchestration | 18 | [Open list](/en/guide/container-orchestration-issues) |
| Databases and object storage | database connections and object storage configuration | 17 | [Open list](/en/guide/database-storage-issues) |
| Upgrades and migrations | the upgrade process and behaviour after upgrading | 114 | [Open list](/en/guide/upgrade-migration-issues) |
| Environment and configuration | environment variables and configuration files | 125 | [Open list](/en/guide/environment-configuration-issues) |
| Startup and reachability | services that start but cannot be reached | 13 | [Open list](/en/guide/startup-accessibility-issues) |
| Model serving and inference | self-hosted inference services and model integration | 41 | [Open list](/en/guide/model-serving-issues) |
| Agent and MCP | the agent runtime and MCP tool integration | 29 | [Open list](/en/guide/agent-mcp-issues) |
| API and authentication | API calls and authentication | 33 | [Open list](/en/guide/api-authentication-issues) |
| Workflow and nodes | workflow orchestration and node configuration | 37 | [Open list](/en/guide/workflow-node-issues) |

The 10 stage lists cover 440 published articles. For other issues, search the [Technical Center](/en/tech-center) using the specific error message.

## Three ordering mistakes to avoid

1. **Changing configuration before reading logs.** Most deployment problems name the component and the error code in the backend log. Adjusting environment variables or orchestration files before reading the log removes the baseline for everything that follows.
2. **Going straight to the main service and skipping its dependencies.** When the database, object storage or inference service is unreachable, the main service looks broken in every case, so starting there leads nowhere.
3. **Not separating before and after a change.** A problem that appeared after an upgrade or configuration change follows a different path from one that appeared during steady operation; confirming the time relation halves the search space.

## Checks before go-live and before any change

1. Confirm every environment variable added or removed by the target version has been handled
2. Confirm each companion component image matches the main service version
3. Confirm database and object storage connection details work in the target environment
4. Confirm the processor architecture matches the selected image
5. Confirm the inference service is reachable from inside the deployment network, and complete one call to verify

## What this landscape does not cover

Grouping follows the technical objects named in document titles. A document may touch several stages; it is placed in the first stage it matches. The following are outside the scope of this page:

- Deployment forms and configuration specific to the commercial edition
- Network and permission setup coupled to a specific cloud provider
- Performance and capacity questions that need runtime data to judge

## Keep reading

- [FastGPT Containers and orchestration issue list](/en/guide/container-orchestration-issues)
- [FastGPT Databases and object storage issue list](/en/guide/database-storage-issues)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## If the problem is still not located

The entries above cover cases that can be reproduced from public information. If the problem depends on configuration details of a specific deployment, or needs runtime logs to confirm, contact sales for deployment-stage support; the cloud service can be used directly without handling environment dependencies.

- [Contact sales](/en/contact): support for self-hosting and upgrades
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what the cloud and self-hosted forms cover
