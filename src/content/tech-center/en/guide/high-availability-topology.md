---
title: High Availability and Disaster Recovery: What Must Be Redundant, What Can Wait
slug: /en/guide/high-availability-topology
page_type: Decision matrix
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Choose redundancy for FastGPT services, databases, storage, and model access based on recovery objectives and tested failover procedures.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: High Availability and Disaster Recovery: What Must Be Redundant, What Can Wait | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 决策矩阵页-第2批/英文-fastgpt.io/guide/high-availability-topology.md
source_sha256: 34aa7747574923a9c6d85b295bc08d6c244fe11ce0f934275c05a10d888214b5
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository and community threads, verified 2026-09-14.
---

# High Availability and Disaster Recovery: What Must Be Redundant, What Can Wait

## When this decision has to be made
Plan component failure boundaries when your deployment needs multiple Pods or a defined availability target for production. Chat history is persisted in MongoDB; legacy SSE MCP connection state also requires validated session affinity and request routing. Redundancy improves availability, while persistence, independent backups, and recovery drills determine data recovery capability.

If past version upgrades caused service startup failures, 502 errors, or similar issues, plan redundancy ahead to lower upgrade risks. When your business goes live officially and requires uninterrupted service, you must complete high-availability topology redundancy configuration.

Early redundancy adds complexity, resource use, and launch time. Delayed planning can increase the impact of traffic peaks and upgrade failures. Data recovery during legacy upgrades, multi-Pod SSE routing, and container restart behavior have different constraints; validate backups, migrations, connection dispatch, and failure recovery separately before choosing redundancy scope.

## Criteria matrix
| Candidate Deployment | Support multi-Pod horizontal scaling capability | Data persistence reliability guarantee | Component version compatibility requirements | Upgrade fault tolerance capability | Session state consistency guarantee | Resource consumption scale |
|----------------------|-----------------------------------------------|---------------------------------------|------------------------------------------|-----------------------------------|------------------------------------|---------------------------|
| Single-node deployment | Currently one node; scaling requires topology changes | Depends on persistent volumes, backups, and recovery procedures | Select compatible components for the target version | Depends on maintenance windows and rollback | Chat history is persisted in MongoDB; SSE MCP connection state belongs to its service instance | Low |
| Database replica set + single app instance | Currently one app instance | Replication improves availability; independent backups support recovery | Check database and application dependency compatibility | Validate replica-set failover and application recovery | Chat history is persisted in MongoDB; validate connection state for the selected protocol | Medium |
| Multi-Pod app deployment | Supported with validated connection routing and dependencies | Depends on shared data services, replication, and backups | Select compatible application and dependency versions | Validate readiness checks and migration compatibility for rolling updates | Validate affinity for legacy SSE MCP and the connection model for Streamable HTTP | Medium-high |
| Shared persistent services + validated connection routing | Supported with topology validation | Depends on replication, failure domains, and backups | Select compatible components for the target version | Validate storage recovery, traffic cutover, and rollback | Validate persistent chat data and MCP connection behavior separately | High |
| Full-component redundancy (database, app, sandbox, proxy) | Validate scaling support for each component | Depends on replication, failure domains, and independent backups | Check compatibility across component versions | Validate failover and recovery time by component | Validate connection routing, reconnection, and consistent data access | Very high, depending on replica counts |

## Why each criterion matters
### Support multi-Pod horizontal scaling capability
Increasing application instances can relieve traffic pressure, while data-service capacity and connection routing also require validation. Legacy SSE MCP services keep transports in process memory, so initial SSE requests and subsequent POST requests must reach the corresponding instance. Validate session affinity, timeouts, and reconnection for this protocol, and validate Streamable HTTP multi-instance behavior against its connection model. Include peak-load and dependency-bottleneck checks.

### Data persistence reliability guarantee
Persistence and recoverability protect application and knowledge base data. When evaluating legacy upgrades such as v4.7, check database volumes, migration procedures, and recoverable backups; determine specific failure causes from logs and deployment configuration. Replica-set and shared-storage availability depend on replication and failure domains. Independent backups and recovery drills validate data recovery targets.

### Component version compatibility requirements
Component compatibility supports stable operation. Select FastGPT, sandbox, AI Proxy, and database versions according to the target release requirements, and apply corresponding configuration changes when coordinated upgrades or shared-memory settings are required. Validate startup, knowledge base uploads, chat, and code execution before upgrading or scaling.

### Upgrade process fault tolerance capability
Upgrade-related 502 errors or startup failures can involve listener addresses, environment variables, and dependency configuration. Check these conditions and validate readiness checks, traffic cutover, and rollback to reduce interruption risk. Confirm the topology’s fault tolerance through failure and upgrade drills.

### Session state consistency guarantee
Chat history is persisted in MongoDB. Legacy SSE MCP transports are stored in service-process memory. Routing initial SSE requests and subsequent POST requests to different instances can prevent the matching transport from being found and cause timeouts. Validate session affinity, connection routing, and reconnection for that service. Validate Streamable HTTP multi-instance behavior separately against its actual connection model.

### Resource consumption scale
Multiple Pods, database replicas, shared storage, and redundant proxies increase resource use according to replica counts, capacity, and connection handling. Plan Redis and other dependencies according to actual component requirements, then balance investment against availability targets through peak-load, recovery, and maintenance-window tests.

## The cost of switching later
When moving from a single node to multiple Pods, confirm that instances access the same persistent data services and configure load balancing, readiness checks, and connection routing. Validate session affinity and reconnection for legacy SSE MCP, and validate the multi-instance connection behavior of Streamable HTTP.

When migrating persistent data, follow the database or storage service’s migration procedure. Validate consistency, backups, and recovery, and schedule a cutover window according to the chosen migration method.

When extending redundancy to more components, select compatible FastGPT, sandbox, AI Proxy, and database versions and environment settings for the target release. Schedule upgrades according to actual dependency changes, and test uploads, chat, code execution, failover, and recovery time.

Additionally, switching processes may face data migration failures or configuration errors that prevent service startup. You must prepare backups and rollback plans ahead to handle exceptions during the switch.

## When this decision can wait
You can delay redundancy configuration if your deployment scale is small. This includes single-instance test environments with low traffic that do not require horizontal scaling.

You can also wait if your business has high tolerance for data loss and service interruptions, and does not need long-term stable operation. If you are still in the development phase and have not officially launched your business, you do not need to configure high availability right away.

If your resources are limited and you cannot afford the resource costs of redundant deployments, you can delay configuration temporarily. In this case, you must set up regular backups to restore data if issues occur. Remember to add redundant configurations promptly as your business scale grows or you move to official production environments, to avoid faults disrupting normal operations.

## Keep reading

- [Releasing and Regression-Testing an App: Versions, Canary and Rollback](/en/guide/app-release-and-regression)
- [Where Files Live: Local Volumes, Object Storage and External S3](/en/guide/file-storage-selection)

## References

- [MongoDB-backed chat schema](https://github.com/labring/FastGPT/blob/v4.17.0/packages/service/core/chat/chatSchema.ts)
- [Legacy SSE MCP process-local transports](https://github.com/labring/FastGPT/blob/v4.17.0/projects/mcp_server/src/index.ts)
- [Streamable HTTP app endpoint](https://github.com/labring/FastGPT/blob/v4.17.0/projects/app/src/pages/api/mcp/app/%5Bkey%5D/mcp.ts)
- [FastGPT v4.17.0 MCP publishing documentation](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/guide/build/publish/mcp_server.mdx)
- [FastGPT v4.17.0 release and dependency requirements](https://github.com/labring/FastGPT/releases/tag/v4.17.0)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
