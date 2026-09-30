---
title: Usage and Capacity Review: Which Numbers to Watch and When to Scale
slug: /en/guide/usage-and-capacity-review
page_type: Deep-dive guide
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Usage and Capacity Review: Which Numbers to Watch and When to Scale
meta_description: Learn how to monitor and scale your enterprise AI application platform. Identify key metrics for CPU, memory, sandbox, and database performance.
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Usage and Capacity Review: Which Numbers to Watch and When to Scale

## When this becomes a decision
After deploying your system, continuous resource monitoring is crucial for stable service and performance. Initial resource allocation may rely on estimated loads. However, actual operations introduce uncertainties from user behavior, business growth, and feature updates. When your system experiences slow responses, processing delays, or even service interruptions, insufficient resources are often the root cause. For example, tasks like file parsing, HTML to Markdown conversion, and text chunking can rapidly deplete resources under high concurrency, leading to task queues or failures. CPU, memory, and storage limits in sandbox environments directly affect code execution efficiency and stability. Furthermore, sudden spikes in database connections, MongoDB write conflicts, and data migration or version compatibility issues with vector databases like Milvus can unexpectedly become severe performance bottlenecks.

Resource bottlenecks are not always obvious. They may manifest as occasional timeouts or intermittent errors, rather than a complete system crash. System feature iterations, such as the Agent V2 logic rewrite, plugin system architecture adjustments, or the introduction of new multimodal models supporting audio and video input, can alter the service's resource consumption model. When these changes conflict with existing resource configurations, problems emerge. Therefore, establishing a proactive, periodic usage and capacity review mechanism is essential. This transforms the vague concept of "is it enough?" into quantifiable, trackable metrics. This mechanism aims to identify potential bottlenecks, guide resource scaling, and prevent reactive problem-solving, thereby ensuring business continuity and user experience.

## What to settle first

| Criterion | What to set | Basis |
|---|---|---|
| File Parsing Worker Count | Node.js detected available CPU parallelism, minimum 1 | System automatically sets, considering container CPU quotas and process affinity. Actual runtime is limited by memory scheduling. |
| HTML to Markdown Worker Count | Minimum of available CPU parallelism and 5 | Hard limit. Before task launch, checks for memory headroom beyond system safety reserves. |
| Text Chunking Worker Count | Minimum of available CPU parallelism and 5 | Hard limit. Before task launch, checks for memory headroom beyond system safety reserves. |
| Sandbox Single Instance CPU Core Limit | `AGENT_SANDBOX_CPU_COUNT` environment variable, default `1` | Controls compute resources for sandbox code execution, affecting task concurrency and execution speed. |
| Sandbox Single Instance Memory Limit | `AGENT_SANDBOX_MEMORY_MIB` environment variable, default `2048` MiB | Controls memory consumption for sandbox code execution, preventing crashes due to insufficient memory. |
| Sandbox Storage Capacity | `AGENT_SANDBOX_STORAGE_SIZE_GI` environment variable, default `1` Gi | Affects the amount of persistent data a sandbox can store, especially PVC creation in Kubernetes mode. |
| Sandbox Inactive Suspend Time | `AGENT_SANDBOX_SUSPEND_MINUTES` environment variable, default `60` minutes | Controls resource release policy, balancing resource utilization and user experience. |

These criteria interact and involve trade-offs. For instance, the system automatically sets hard limits for file parsing, HTML to Markdown, and text chunking worker counts based on available CPU parallelism. However, the actual number of concurrently running tasks is also limited by file parsing memory scheduling. This means that even with ample CPU resources, tasks will queue if memory reserves are insufficient. HTML to Markdown and text chunking tasks will queue without memory headroom, waiting up to 30 minutes, directly impacting user experience. Therefore, when evaluating worker capacity, you must consider both CPU and memory usage.

Sandbox environment configuration variables, such as `AGENT_SANDBOX_CPU_COUNT` and `AGENT_SANDBOX_MEMORY_MIB`, directly define the performance boundaries of a single sandbox instance. Increasing these values enhances sandbox processing capability but also increases overall resource consumption. `AGENT_SANDBOX_STORAGE_SIZE_GI` affects the amount of data a sandbox can store, which is crucial for scenarios involving large files. Policies like `AGENT_SANDBOX_SUSPEND_MINUTES` and `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` balance resource utilization and user experience. Shorter suspension times release resources faster but may lead to frequent sandbox startup delays for users. Understanding the intrinsic connections and external impacts of these criteria is fundamental for capacity planning and scaling decisions. Before scaling, compare actual and expected values for these criteria to pinpoint the exact bottleneck, whether it's compute resources, memory, storage, or the scheduling policy itself.

## How to do it
The core of usage and capacity review is to periodically collect and analyze key metrics, then adjust resource configurations based on the analysis. This process requires examining multiple system layers, including core services, worker pools, sandbox environments, and databases.

First, monitor core service resources. For primary services like `fastgpt-app` and `fastgpt-pro`, continuously track CPU and memory utilization. When CPU utilization remains high for extended periods (e.g., over 80%) or memory usage approaches its limit, the primary service may be a bottleneck. Simultaneously, monitor request response times, especially for long-tail requests, to assess if the service is overloaded. Version v4.15.0 introduced worker pools for file parsing, HTML to Markdown, and text chunking to prevent resource exhaustion from high concurrency. Version v4.16.2 further optimized the hard limit setting for file parsing workers, automatically adjusting based on Node.js detected available CPU parallelism, considering container CPU quotas and process affinity, retaining a minimum of 1 worker. The actual number of concurrent tasks is also limited by file parsing memory scheduling. HTML to Markdown and text chunking workers have a hard limit of the minimum of available CPU parallelism and 5. Before task launch, the system checks for schedulable memory beyond safety reserves; if no headroom exists, tasks queue. After a task completes, it retries once; if still insufficient, it checks every 30 seconds, waiting up to 30 minutes. Idle workers are recycled after 60 seconds, retaining a maximum of 1 for longer periods. This means you need to monitor CPU parallelism, available memory, and task queue length and wait times to determine if the worker pool needs scaling.

Second, manage sandbox environment capacity. Version v4.16.0 introduced several configurable environment variables for `fastgpt-sandbox`, directly impacting its resource consumption. `AGENT_SANDBOX_CPU_COUNT` (default 1), `AGENT_SANDBOX_MEMORY_MIB` (default 2048 MiB), and `AGENT_SANDBOX_STORAGE_SIZE_GI` (default 1 Gi) are core parameters. Monitor CPU and memory usage of sandbox instances. If sandbox tasks frequently fail due to insufficient resources or take too long to execute, consider adjusting these parameters. Additionally, `AGENT_SANDBOX_SUSPEND_MINUTES` (default 60 minutes) and `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` (default 7 days) control sandbox instance lifecycles, affecting resource release and reuse. If users report slow sandbox startup, instances might be frequently suspended and archived, requiring adjustment of these time parameters to maintain more active instances. Sandbox security-related environment variables like `SANDBOX_MAX_TIMEOUT` (default 60000 milliseconds), `SANDBOX_MAX_MEMORY_MB` (default 256MB), and `SANDBOX_POOL_SIZE` (default 20) also require adjustment based on actual load to ensure the sandbox meets business needs and maintains system security. For example, if the `SANDBOX_MAX_OUTPUT_MB` (default 10MB) for code execution JSON output is insufficient, it may cause task failures, requiring an increase.

Finally, review the database and storage layers. For MongoDB, as the core data store, focus on connection counts, read/write latency, and potential write conflicts (such as reported `WriteConflict` issues). When `WriteConflict` errors occur, you may need to optimize MongoDB deployment configurations, for example, by ensuring replica set functionality or adjusting transaction processing logic. For Milvus, as a vector database, version compatibility is critical. Version v4.16.2 requires Milvus to be upgraded to 2.5.16 or higher and automatically switches to Milvus BM25 full-text retrieval. If the Milvus version is too low or BM25 capability validation fails, FastGPT will terminate startup. Therefore, before upgrading, you must confirm the Milvus version meets requirements and monitor its resource usage, including storage space and query performance. S3 and other object storage usage should also be part of the review, especially file upload/download bandwidth and latency. Version v4.15.0 added CDN support for S3, which can optimize file access performance. For files stored on S3, monitor their growth trends to assess storage costs and capacity needs.

In summary, the review process is not a one-time task but must integrate into daily operations. Through continuous monitoring, periodic analysis, and timely adjustments, ensure system resources consistently match business demands.

## How to verify
1.  **Core Service Resource Utilization Check**: Confirm the average CPU and memory utilization of `fastgpt-app` and `fastgpt-pro` services during peak load. Pass standard: CPU utilization below 80%, memory utilization below 85%.
2.  **Worker Pool Task Processing Efficiency Validation**: Examine task queue length and average waiting time for worker pools handling file parsing, HTML to Markdown, and text chunking. Pass standard: Task queue length fluctuates within a normal range, average waiting time is below the defined business threshold.
3.  **Sandbox Environment Performance Metrics Assessment**: Monitor sandbox instance CPU and memory usage, along with sandbox task success rates and average execution times. Pass standard: Sandbox CPU and memory utilization are within set limits, task success rate is above the defined value, average execution time meets business requirements.
4.  **Database Connection and Performance Testing**: Review MongoDB and Milvus connection counts, read/write latency, and check for `WriteConflict` or other abnormal logs. Pass standard: Database connection counts are within the configured range, read/write latency is below the defined threshold, and no frequent `WriteConflict` errors occur.
5.  **Storage System Capacity and Access Performance Verification**: Check actual usage versus available capacity for S3 and other object storage, and test average response times for file uploads and downloads. Pass standard: Storage capacity is sufficient, file upload and download response times meet business needs.
6.  **Environment Variable Configuration Consistency Confirmation**: Verify environment variable configurations for all services (`fastgpt-app`, `fastgpt-pro`, `fastgpt-plugin`, `fastgpt-code-sandbox`, `fastgpt-agent-sandbox-proxy`, etc.), especially parameters related to resource limits and addresses. Pass standard: All relevant environment variables are correctly configured and consistent, with no omissions or misconfigurations.
7.  **System Upgrade Functionality Compatibility Validation**: After any upgrade (e.g., v4.16.2's Milvus version requirement), execute core business workflows to verify normal functionality, particularly for interactions between new and old components. Pass standard: All core functions operate normally, with no compatibility issues.
8.  **Review of Usage and Capacity Report and Action Plan**: Periodically generate usage and capacity review reports, and develop clear scaling, optimization, or adjustment plans based on report content. Pass standard: Report fully reflects system resource status and includes actionable plans.

## Limits: when this approach does not hold
This approach, based on periodic usage and capacity review, relies on several critical external conditions and assumptions. If these conditions are not met, its effectiveness will be limited.

First, **the completeness and accuracy of monitoring data** are fundamental. If the monitoring system cannot comprehensively and accurately collect key metrics like CPU, memory, network I/O, disk I/O, database connection counts, or worker task queues, or if data is delayed or lost, the review analysis will be partial or even misleading. For example, if you cannot accurately obtain sandbox instance resource usage, adjustments to `AGENT_SANDBOX_CPU_COUNT` or `AGENT_SANDBOX_MEMORY_MIB` lack data support.

Second, **relatively predictable business load patterns** are a crucial prerequisite. This method suits scenarios where business volume shows certain cyclicality and trending growth. If business load has highly unpredictable, sudden peaks or extremely complex change patterns, then relying on historical data and periodic reviews may not anticipate bottlenecks in time. For example, if a marketing campaign or external event causes a sudden surge in users far exceeding normal peaks, regular reviews may not timely detect and guide scaling, leading to service interruptions.

Third, **the system architecture's elasticity and scalability** also affect this method's effectiveness. If the system architecture itself lacks elasticity, scaling operations are complex and time-consuming, or if single points of bottleneck cannot be resolved by simply adding resources, then even if the review accurately identifies the problem, capacity adjustments cannot be made quickly and effectively. For example, if database scalability is limited by its deployment model, or if certain core components cannot scale horizontally, even if insufficient database connections are found, simple scaling may not resolve it.

Furthermore, this method **cannot fully predict and address potential performance regressions or new bottlenecks introduced by software version upgrades**. Every version upgrade (e.g., v4.15.0 or v4.16.2) may introduce new features (like multimodal model support for audio/video input, Agent V2 logic rewrite) or optimize existing components (like replacing PDF parsing with `liteparse`). These changes can fundamentally alter the service's resource consumption model. Reviews can only identify issues by observing actual usage after an upgrade, not precisely evaluate them beforehand. For example, upgrading Milvus to 2.5.16 or higher and automatically switching to BM25 full-text retrieval might cause FastGPT to terminate startup if old vector data migration fails. Such issues require additional compatibility testing and migration plans.

Finally, **the stability and capacity of external dependent services** are beyond this method's direct control. If third-party services on which the system relies (e.g., LLM services, object storage services) experience performance issues or capacity limitations, overall service quality may degrade even if your own service resources are sufficient. This review primarily focuses on your system's usage and capacity. Bottlenecks in external dependencies require communication and monitoring with external service providers.

## Keep reading

- [Keeping a Knowledge Base Fresh: Refresh Cadence, Signals and Ownership](/en/guide/corpus-freshness-operations)
- [Handing Over a Running Deployment: Ownership, Credentials, and Documentation](/en/guide/handover-and-ownership)
- [Incidents Worth Drilling: Writing a Runbook People Actually Use](/en/guide/incident-drill-and-runbook)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers
