---
title: Incidents Worth Drilling: Writing a Runbook People Actually Use
slug: /en/guide/incident-drill-and-runbook
page_type: Deep-dive guide
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Incidents Worth Drilling: Writing a Runbook People Actually Use
meta_description: Learn how to write effective runbooks for your enterprise AI platform. This guide covers incident assessment, troubleshooting, and verification.
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Incidents Worth Drilling: Writing a Runbook People Actually Use

## When this becomes a decision

As system architecture grows more complex, service dependencies become intricate. An anomaly in one area can trigger a chain reaction. This is especially true in microservice and containerized deployments, like Docker Compose. Here, many components (FastGPT main service, FastGPT Pro, FastGPT Plugin, AIProxy, Agent Sandbox, Agent Volume Manager, MongoDB, PostgreSQL, MinIO, etc.) each have independent lifecycles and configurations.

An update, configuration change, or external environment fluctuation in a single component can cause unexpected failures. For example: a Docker image upgrade changes the Next.js listening address, leading to a 502 error; stricter environment variable validation causes service initialization failure due to missing or malformed variables; insufficient database shared memory causes a cleanup task error; or improper API proxy routing configuration blocks file upload functionality.

These issues often do not appear during development. They hide in the production environment. Once triggered, they directly impact user experience and business continuity. For complex systems, traditional reactive firefighting is inefficient and can even expand the impact. Therefore, proactively identifying potential failure scenarios and practicing them becomes crucial for system stability.

## What to settle first

| Criterion            | What to set                                | Basis                                                                   |
| :------------------- | :----------------------------------------- | :---------------------------------------------------------------------- |
| Incident Level       | P0 (Urgent), P1 (High), P2 (Medium), P3 (Low) | Impact scope, business loss, recovery time limit                        |
| Incident Discovery   | Monitoring alerts, user feedback, log anomalies, routine checks | Who first detects the problem, determines initial response flow         |
| Core Business Impact | Completely unavailable, partial function impaired, significant performance degradation, no impact | Degree of business continuity disruption, determines handling priority  |
| Data Loss Risk       | High, Medium, Low, None                    | Likelihood of data integrity compromise, determines data recovery strategy |
| Recovery Targets     | RTO (Recovery Time Objective), RPO (Recovery Point Objective) | Acceptable business interruption duration and data loss, guides recovery plan design |
| Handling Team        | Operations team, development team, database administrators, security team | Incident type and required expertise, identifies primary responders     |
| Automation Capability | Automatic recovery, semi-automatic recovery, manual recovery | Current tool and script support, assesses recovery efficiency and risk  |

These criteria are central to developing incident drills and runbooks. They are not independent. They are interconnected and jointly determine the incident response strategy and priority. Incident level is a comprehensive consideration. It combines core business impact, data loss risk, and recovery targets. This provides the team with a quick standard for judging incident severity. For instance, an incident causing core functionality to be completely unavailable with data loss risk, even with a short RTO, will be P0. It requires the highest priority handling.

The incident discovery method determines the starting point of the response. Monitoring alerts provide the most timely feedback, usually leading to automated or semi-automated processes. User feedback might mean the problem has spread, requiring faster manual intervention. Log anomalies provide troubleshooting clues. Routine checks can uncover potential hidden dangers. Team assignment ensures specialized personnel are involved immediately. For example, database issues need DBAs, and application layer issues need developers. Automation capability assessment helps identify the current system's maturity in incident recovery and guides future improvements. By defining these criteria, your team better understands the incident's nature. This avoids blind actions in chaos, building a more resilient system.

## How to do it

Writing incident drill and handling runbooks requires a practical approach. Break down common failure scenarios into executable steps, considering system component characteristics. Here are examples of specific runbook writing for typical failures.

First, consider a **file parsing failure** scenario. When a user uploads a large file (e.g., a 20,000-character PDF), FastGPT might show `Cannot polyfill DOMMatrix` or `failed to fe` errors. This prevents the AI model from summarizing content, even if logs show the document parsing module succeeded.

**Who finds it first:** User feedback (AI prompts "Please provide specific content"), or FastGPT logs (`fastgpt log`) show `Cannot polyfill DOMMatrix`, `failed to fe` errors.

**Where to start looking:**
1.  **Check FastGPT logs:** Confirm file parsing error messages, such as `Cannot polyfill DOMMatrix`, `failed to fe`.
2.  **Check Ollama model status:** Confirm the Ollama model runs correctly and the maximum context parameter is active. Use `docker logs ollama` or the Ollama management interface.
3.  **Test small file upload:** Upload a file with fewer characters. Verify if small files parse and summarize correctly. This helps distinguish between a general issue and a large-file specific problem.
4.  **Test direct content copy to chat box:** Bypass the file parsing module. Copy large file content directly into the chat box. Observe if the Ollama model can process it. This determines if the issue lies in the handoff between file parsing and model invocation.
5.  **Check FastGPT configuration:** Confirm the prompt in `system` and the content in `human` pass to the model as expected. If community discussions suggest placing document parsed content in `human` might cause other issues, check if your current configuration follows best practices.

**What "fixed" looks like:** The AI model correctly identifies and summarizes content after a user uploads a large file. It no longer prompts "Please provide specific content," and FastGPT logs no longer show file parsing errors.

Next, consider a **Connection error** scenario. FastGPT calls an external API (e.g., OneAPI). It might time out and report `Connection error` with no new call logs in OneAPI.

**Who finds it first:** User feedback (chat unresponsive for a long time), or FastGPT logs show `Connection error`.

**Where to start looking:**
1.  **Check FastGPT logs:** Confirm `Connection error` and related stack information, such as `getaddrinfo EAI_AGAIN fastgpt-plugin`.
2.  **Check network connectivity:** Confirm network connectivity between FastGPT and OneAPI containers. If deployed in the same Docker network, use the container name (e.g., `oneapi:3000`). Using `127.0.0.1` or the host IP points to the container's own network namespace. If deployed on different Docker networks or hosts, confirm port mapping and firewall rules.
3.  **Check OneAPI status:** Confirm the OneAPI service runs correctly. Check its logs with `docker logs oneapi`.
4.  **Check FastGPT configuration:** Confirm `OPENAI_BASE_URL` and `CHAT_API_KEY` configurations are correct. Pay special attention to whether the URL includes the `/v1` path.
5.  **Attempt version rollback:** If the issue appeared after an upgrade, try rolling back the FastGPT version (e.g., to v4.6.8). Observe if it recovers. This helps determine if the new version introduced the problem.

**What "fixed" looks like:** FastGPT successfully calls OneAPI. Chat no longer shows `Connection error`. New call logs appear in OneAPI.

Finally, consider a **service startup failure after system upgrade** scenario. For example, after a Docker Compose upgrade, the FastGPT main service or related components (like fastgpt-code-sandbox) fail to start. This might show 502, `Connection reset by peer`, `Invalid environment variables`, or `Python warm child failed: load seccomp filter: operation canceled` errors.

**Who finds it first:** Deployment personnel observe abnormal container startup (gray status) after an upgrade. Or, users encounter a 502 error when accessing the service. Or, errors appear in `docker logs fastgpt`, `docker logs fastgpt-code-sandbox`.

**Where to start looking:**
1.  **Check FastGPT main service listening address:** Confirm the FastGPT main service (or FastGPT Pro) `environment` configures `HOSTNAME=0.0.0.0`. This prevents Next.js from only listening to the container's internal IP, which causes 502 errors.
2.  **Check environment variable validation:** Confirm required environment variables like `TOKEN_KEY`, `AES256_SECRET_KEY`, `FILE_TOKEN_KEY` for FastGPT and FastGPT Pro exist, have the correct format (e.g., not empty, not overly simple values), and match between FastGPT and FastGPT Pro. Check logs for `Invalid environment variables` or `System initialization failed`.
3.  **Check `fastgpt-code-sandbox` logs:** If `fastgpt-code-sandbox` fails to start with `Python warm child failed: load seccomp filter: operation canceled`, this might relate to incomplete seccomp BPF TSYNC multithreading synchronization support in the host kernel.
4.  **Check database shared memory:** If AIProxy's PostgreSQL shows `could not resize shared memory segment` error, check the `aiproxy_pg` service's `shm_size` configuration. Consider increasing it to `256mb`.
5.  **Check Nginx proxy configuration:** If file uploads result in 404s, confirm Nginx forwards the `/api/system/file/upload/` path specifically to the FastGPT main service. Proxying this path to FastGPT Pro can cause these 404s.
6.  **Check Nginx cache after Docker Compose rebuild:** If container IP changes cause a 502, try restarting the Nginx container.

**What "fixed" looks like:** All relevant service containers start and run normally, with no abnormal log output. Users can access all functions, including file uploads and AI conversations, without issues.

These detailed troubleshooting steps and recovery standards form the core of your runbook. Each step should be clear and unambiguous. Avoid vague descriptions. Ensure that in an emergency, any operator with basic skills can follow the instructions to quickly locate and resolve the problem.

## How to verify

1.  **Incident scenario reproduction:** Successfully reproduce the incident phenomenon in a test or pre-production environment. For example, upload a large file to cause AI summarization failure, or simulate a network outage to cause a Connection error.
2.  **Discovery path validation:** Team members can promptly discover the simulated incident through the specified discovery methods in the runbook (e.g., monitoring alerts, log retrieval, user feedback channels). Confirm discovery information matches the runbook description.
3.  **Troubleshooting step execution:** Team members strictly follow the troubleshooting process in the runbook. Each step yields expected intermediate results or clues. For example, finding specific error messages in FastGPT logs, or confirming Ollama model configuration.
4.  **Recovery operation effectiveness:** Team members follow the recovery steps in the runbook. Confirm the operations successfully resolve the incident and restore the system to normal operation.
5.  **Recovery standard verification:** After incident recovery, check against the "What 'fixed' looks like" standards defined in the runbook. Verify all metrics are met. For example, AI model summarizes normally, Connection error disappears, all service containers run green.
6.  **Handling timeliness assessment:** Record the total time from incident discovery to full recovery. Compare it with implicit or explicit RTO targets in the runbook. Assess handling efficiency.
7.  **Data integrity check:** For incidents with data loss risk, perform a data consistency check after recovery. Ensure data is undamaged or recovered according to RPO requirements.
8.  **Document update and improvement:** During the drill, record and update any inaccuracies, unclear points, or missing information found in the runbook. Ensure its continued effectiveness.

## Limits: when this approach does not hold

The effectiveness of this incident drill and runbook approach heavily relies on several key external conditions and assumptions. First, **system environment stability** is fundamental. If the underlying infrastructure (e.g., host resources, network hardware, Docker runtime itself) frequently experiences unexpected issues, or its configuration significantly deviates from the runbook description, then the troubleshooting and recovery steps based on a specific environment will not work. For instance, on a Synology NAS, a customized kernel's incomplete support for seccomp BPF TSYNC can cause the fastgpt-code-sandbox container to fail startup. An application-level runbook cannot directly solve such deep system issues.

Second, **a sound monitoring and logging system** is essential. The runbook assumes a complete monitoring and alerting system to detect anomalies promptly, and detailed logging (e.g., FastGPT's `LOG_ENABLE_CONSOLE`, `LOG_CONSOLE_LEVEL`, `LOG_ENABLE_OTEL` configurations) for troubleshooting. If monitoring coverage is insufficient, alerts are insensitive, or log levels are set improperly, causing critical information to be missing, then incident discovery will be delayed, troubleshooting will lack basis, and the "Who finds it first" and "Where to start looking" sections of the runbook will lose their guidance.

Furthermore, **the team's knowledge and skill level** are important factors. While the runbook aims to lower the barrier to incident handling, it still requires operators to have basic system operations knowledge, Docker skills, and an understanding of FastGPT's component functions. If team members lack fundamental knowledge of system architecture, databases (MongoDB, PostgreSQL, OceanBase), or network configuration, even a very detailed runbook might be ineffective due to an inability to understand the context or perform complex operations. For example, addressing continuously growing MongoDB connection counts requires knowledge of MongoDB's connection pool parameters (`maxPoolSize`, `minPoolSize`, `maxIdleTimeMS`).

Additionally, **incident complexity and novelty** can exceed the runbook's scope. The runbook primarily covers known and common failure modes. For never-before-seen "black swan" events involving multiple components, layers, and complex interactions, or entirely new bugs introduced by specific version upgrades (e.g., missing `mssql` dependency for Microsoft SQL Server system tools in v4.15.0), the runbook may not offer direct solutions. In such cases, teams rely on experience, emergency response mechanisms, and communication with the community or developers (e.g., GitHub Issue feedback) to resolve the issue.

Finally, **the absence of data backup and recovery mechanisms** renders data-related runbooks useless. If the system lacks regular, reliable database backups (like `mongodump`) and file backups, in case of data corruption or loss, even if the runbook specifies RPO and RTO targets, it cannot guarantee data recovery as required. In this situation, the runbook can only guide damage control, not full data recovery at the data layer.

## Keep reading

- [Keeping a Knowledge Base Fresh: Refresh Cadence, Signals and Ownership](/en/guide/corpus-freshness-operations)
- [Handing Over a Running Deployment: Ownership, Credentials, and Documentation](/en/guide/handover-and-ownership)
- [Usage and Capacity Review: Which Numbers to Watch and When to Scale](/en/guide/usage-and-capacity-review)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers
