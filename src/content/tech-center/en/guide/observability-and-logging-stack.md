---
title: Observability Choices: What Each Layer Records, and How Long to Keep It
slug: /en/guide/observability-and-logging-stack
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Observability Choices: What Each Layer Records, and How Long to Keep It
meta_description: Understand key observability decisions for enterprise AI platforms. Learn what data to collect, how long to store it, and the impact of these choices.
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Observability Choices: What Each Layer Records, and How Long to Keep It

## When this decision has to be made
Observability and log collection decisions are not always urgent in enterprise tech architecture. For new projects or low-traffic systems, simple logging and file storage might suffice for daily troubleshooting. However, as systems scale, business complexity increases, or when facing specific conditions, this decision becomes a high priority.

First, if system troubleshooting takes too long, and you cannot pinpoint the root cause, your current logging system lacks sufficient information depth. For example, logs show "System unexpected error: name is not defined" or "Failed to create post presigned url." Without context, you cannot quickly trace these errors to specific code or configuration issues. Second, if you need continuous system performance monitoring and optimization, but lack unified performance metric collection and analysis, you need a more comprehensive observability solution. This applies if you cannot effectively track LLM request runtime, token consumption, or model cache hit rates. Third, as user and data volumes grow, you need detailed analysis of user behavior and conversation flows. For example, filtering conversation logs by IP address, application version, or likes/dislikes. Traditional log file management will then be inadequate.

Investing in complex observability systems too early can waste resources and increase maintenance costs. For example, deploying a full suite of distributed tracing and metric monitoring at the system's inception, but only using a small fraction of its features. Delaying this decision can lead to severe consequences. System instability, extended fault recovery times, poor user experience, and even business continuity impacts can occur. For example, a workflow deadlock or abnormal tool call truncation under high concurrency will be difficult to resolve without effective logs and tracing data. Therefore, make this decision at the critical juncture when your system evolves from "functional" to "reliable" and "scalable."

## Criteria matrix

| Candidate Solution | Log Collection Scope | Tracing Granularity | Storage Medium | Retention Period | Troubleshooting Capability | Performance Monitoring Dimensions |
|---|---|---|---|---|---|---|
| **FastGPT Default Logs (v4.14.2)** | Error, Info, Warn logs, Mongo slow operation logs | Application-level events | File system/Console | Retained by default, no automatic cleanup | Basic error information, e.g., "System unexpected error" | Excludes performance monitoring middleware for log models |
| **FastGPT Default Logs (v4.8.10)** | LOG_LEVEL=debug, STORE_LOG_LEVEL=warn | Application-level events | File system/Console | Retained by default, no automatic cleanup | Basic error information | No explicit performance monitoring |
| **FastGPT LLM Request Tracing (v4.14.7)** | LLM request body, LLM response | Single LLM request | Memory/Temporary storage | Default 6 hours, adjustable via `LLM_REQUEST_TRACKING_RETENTION_HOURS` | Detailed LLM request and response content | LLM request tracing |
| **FastGPT LogTape Refactored Logging System (v4.14.7)** | Log printing, log collection, log analysis | Application-level events | OTEL collector | Not stated in the documentation; verify in your environment | Unified logging system for easier analysis | Unified logging system for easier analysis |
| **FastGPT OTEL Log Collection (v4.14.7)** | Console output (LOG_ENABLE_CONSOLE=true, LOG_CONSOLE_LEVEL=debug), OTEL collection (LOG_ENABLE_OTEL=true, LOG_OTEL_LEVEL=info, LOG_OTEL_SERVICE_NAME=fastgpt-client, LOG_OTEL_URL=http://localhost:4318/v1/logs) | Application-level events | OTEL collector | Not stated in the documentation; verify in your environment | Structured logs for external system analysis | Structured logs for external system analysis |
| **FastGPT Conversation Logs (v4.14.4)** | Tool calls, AI credit alerts, IP address attribution, application version name, like/dislike records | Single conversation | Database | Permanent retention, no automatic cleanup | Conversation flow, user feedback | AI Token consumption, runtime duration |
| **FastGPT Conversation Logs (v4.14.7)** | Error log filtering, precise user filtering | Single conversation | Database | Permanent retention, no automatic cleanup | Precise identification of erroneous conversations and users | Model monitoring cache hit rate |
| **FastGPT Optimized OTEL Log Collection Format (v4.15.0)** | OTEL log collection format optimization | Application-level events | OTEL collector | Not stated in the documentation; verify in your environment | Improved log readability and analysis efficiency | Improved log readability and analysis efficiency |
| **FastGPT Milvus BM25 Full-Text Search (v4.16.2)** | Full-text search related logs | Knowledge base retrieval | Milvus `modeldata_v2` collection | Permanent retention | Knowledge base retrieval issues | Knowledge base retrieval performance |

## Why each criterion matters
**Log Collection Scope**: This criterion determines what types of information you can get from the system. If you only collect error logs, you might only know "an error occurred" during a system anomaly. You will not know the system state, user operations, or related data before the error. For example, when FastGPT reports "Cannot polyfill `DOMMatrix`" or "failed to fe," if the log scope is limited to error messages, it is hard to determine if it is a frontend environment issue or a backend parsing module issue. A broader collection scope, such as Info and Warn level logs, and Mongo slow operation logs, provides more comprehensive context. This helps quickly pinpoint issues. For example, Mongo slow operation logs accurately print collection names and operation content, which aids in optimizing database queries.

**Tracing Granularity**: Tracing granularity determines the depth of visibility into internal system operations. Coarse-grained tracing might only record the start and end of a request. Fine-grained tracing can delve into function calls, database operations, and external service requests. For example, the LLM request tracing feature retains all LLM request bodies and responses. This is crucial for debugging why large models fail with specific inputs (e.g., "Please provide specific content" prompt, but logs show content already parsed). For complex workflows, if tracing granularity is insufficient, when a workflow deadlocks or a tool call is abnormal, it will be difficult to determine which step is stuck or which tool returned an unexpected result.

**Storage Medium**: The choice of storage medium directly impacts log reliability, scalability, and query performance. Storing logs on the file system is simple. However, as log volume grows, management and querying become difficult. Database storage (like FastGPT conversation logs) can provide structured query capabilities, but may increase database load. Using dedicated log collectors (like OTEL collectors) decouples logs from the application. They provide unified collection, transmission, and storage capabilities, facilitating integration with professional log analysis platforms. Different mediums also have significant differences in cost, operational complexity, and data security.

**Retention Period**: Log retention is a trade-off between cost and traceability. Short-term storage saves storage costs but limits the ability to analyze historical issues. For example, LLM request tracing data retained for a default of 6 hours might be insufficient to analyze intermittent issues or problems requiring cross-day observation. Long-term storage requires larger storage capacity and higher costs. However, it is crucial for compliance requirements, long-term trend analysis, and tracing infrequent issues. For example, permanent retention of conversation logs has long-term value for user behavior analysis and product iteration.

**Troubleshooting Capability**: This criterion measures the effectiveness of the logging and observability system in discovering, diagnosing, and resolving system faults. An excellent system should help quickly pinpoint the time, location, cause, and impact of a fault. For example, conversation logs support filtering by error logs, allowing you to quickly focus on problem sessions. When a frontend crash like "Minified React error #310" occurs, if logs provide more detailed stack information and user operation context, it will significantly accelerate problem resolution. Lacking effective troubleshooting capabilities will prolong Mean Time To Recovery (MTTR), impacting business continuity.

**Performance Monitoring Dimensions**: This criterion focuses on how the system measures and optimizes performance. It includes collecting and analyzing metrics like response time, throughput, resource utilization, and cache hit rate. For example, FastGPT v4.14.7 adds a cache hit rate metric for model monitoring. This is critical for evaluating and optimizing model service efficiency. If performance monitoring dimensions are singular or missing, it will be difficult to find performance bottlenecks. This leads to slow system responses, wasted resources, and even service degradation or unavailability during peak times. For example, when a rerank model interface times out, and logs only show "exceeded 30000," lacking detailed performance metrics makes it difficult to determine if it is a model performance issue, network latency, or excessive data volume.

## The cost of switching later
Once you select and implement an observability and log collection solution, switching later incurs significant costs.

**Data Migration**: The most direct cost is historical data migration. If your current solution uses file system storage for logs, switching to a structured database or OTEL collector requires parsing, cleaning, and importing vast historical log files into the new system. This might involve complex script development, data format conversion, and a lengthy import process. Data loss or consistency issues could occur during this time. If existing conversation logs are stored in MongoDB, switching to another database or log platform also requires data export and import. You must ensure all fields and relationships are correctly mapped. For `modeldata` collections in Milvus vector libraries, switching to `modeldata_v2` requires merging and migration, and ensuring Milvus version compatibility.

**Index Reconstruction**: New logging systems or observability platforms typically have their own indexing mechanisms to accelerate queries. Switching solutions means redesigning and rebuilding indexes according to the new system's requirements. For example, switching from one log aggregation tool to another might require redefining log fields and re-indexing historical data. This process can be very time-consuming, especially with large data volumes. During index reconstruction, log query performance might be severely affected, or effective querying might be impossible.

**Downtime Window**: To ensure data integrity and system stability, many migration and switching operations require downtime windows. Modifying log configurations, changing storage mediums, or deploying new collectors might all require restarting application services or log services. Even rolling upgrades might introduce brief service interruptions or performance fluctuations during the switch. For critical business systems, any downtime means business loss.

**Validation Workload**: After switching between old and new systems, extensive validation is needed. This ensures all logs are correctly collected, transmitted, stored, and parsed, and that observability metrics are accurate. This includes, but is not limited to: checking log levels, completeness of fields, accuracy of query results, proper triggering of alert rules, and correct display of dashboards. Any oversight in any link could lead to the new system failing to provide effective support during a fault. Additionally, team members need time to familiarize themselves with the new system's interface and query language, incurring additional training costs.

## When this decision can wait
In certain specific scenarios, you can postpone complex observability and log collection decisions. You can adopt a lighter-weight approach to avoid unnecessary resource investment and decision burden.

First, for **prototype projects or Minimum Viable Products (MVPs) in early validation stages**. These projects focus on rapid iteration and feature implementation. User scale and traffic are typically small. System stability is not the primary consideration. Simple file logging with basic error capture mechanisms is sufficient. For example, during FastGPT's early development, default console print logs and basic error messages were enough to pinpoint issues.

Second, when the **system architecture is extremely simple, with a limited number of components, and no complex distributed call chains**. For example, a single-service application where all operations are local, with no cross-service calls or asynchronous message queues. In this case, viewing log files via SSH or using `docker logs` for Docker containers easily provides the necessary information. There is no need for distributed tracing systems or complex log aggregation platforms.

Third, when the **team is small, and operational capabilities are limited**. Implementing a full-featured observability system requires specialized configuration, maintenance, and troubleshooting skills. If the team lacks the necessary skills and manpower, blindly adopting a complex system can become a burden. In this situation, prioritize easy-to-use, simple-to-configure logging solutions. For example, outputting logs directly to the console or standard log files, supplemented by simple log rotation mechanisms.

Finally, if **budget and resources are constrained, and current business needs do not urgently require real-time capabilities, high availability, or fine-grained analysis**. With limited resources, focus efforts on core business function development and optimization. Observability can be a later-stage task, to be gradually improved as the business grows and resources become abundant. For example, in the short term, you might accept longer fault investigation times or compensate for a lack of automated monitoring with manual checks.

## Keep reading

- [Chunking by Document Type: How Each Class Splits and What Values to Use](/en/guide/chunking-strategy-selection)
- [When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths](/en/guide/index-rebuild-and-migration)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
