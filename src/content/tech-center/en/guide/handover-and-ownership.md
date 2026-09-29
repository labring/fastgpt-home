---
title: Handing Over a Running Deployment: Ownership, Credentials, and Documentation
slug: /en/guide/handover-and-ownership
page_type: Deep-dive guide
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Handing Over a Running Deployment: Ownership, Credentials, and Documentation
meta_description: Technical decision-makers and platform operators: Learn how to manage ownership, credentials, and documentation when handing over an enterprise AI applicat
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Handing Over a Running Deployment: Ownership, Credentials, and Documentation

## When this becomes a decision

Transferring a system from development to production, or from one team to another, creates questions of ownership and accountability. This isn't always obvious. It becomes a core decision point under specific conditions:

*   **System complexity increases.** When a single engineer can no longer fully manage the system, dependencies between modules and services grow intricate. Missed information or misunderstandings during handover can cause production incidents.
*   **Team structure changes.** If developers leave, teams reorganize, or operations teams take over a new system, a lack of clear handover processes creates a steep learning curve and potential operational risks for new personnel.
*   **Business pressure and stability demands are high.** Any uncertainty during handover amplifies. For example, a core business system outage or performance drop due to poor handover directly impacts revenue and user experience.
*   **Architecture evolves.** As systems move from monolithic to microservices, cloud-native, and other distributed architectures, traditional verbal handovers or scattered documents no longer suffice. The number of components, heterogeneous deployment environments, and complex CI/CD processes require a standardized, measurable handover process and criteria.

A running system's value lies in its continuous, stable service. Poor handover can be its biggest threat.

## What to settle first

| Criterion                 | What to set                                | Basis                                                                 |
| :------------------------ | :----------------------------------------- | :-------------------------------------------------------------------- |
| System Maturity           | In Development / Pre-production / Production | Business importance, traffic volume, stability requirements, change frequency |
| Team Collaboration Model  | Independent Dev & Ops / DevOps / Cross-team | Team organizational structure, skill distribution, communication efficiency |
| Permission Granularity    | Coarse-grained / Fine-grained              | Sensitive data access needs, operational risk level, compliance requirements |
| Credential Management     | Centralized / Decentralized                | Security audit requirements, credential lifecycle complexity, system integration |
| Documentation Completeness | Draft / Internal Use / Public Standard     | System complexity, team turnover, knowledge-sharing culture           |
| Change Frequency          | High / Medium / Low                        | Feature iteration speed, configuration update frequency, dependency upgrade pace |
| External Dependency Complexity | Low / Medium / High                        | Number of third-party services, API stability, integration difficulty, contract terms |

These criteria influence each other. For example, a "Production" system means high business importance and strict stability. This often leads to "Fine-grained" permission management to limit sensitive operations. Documentation should reach "Internal Use" or even "Public Standard" to help different teams quickly get up to speed and troubleshoot.

Your team collaboration model directly impacts credential management and documentation. A "DevOps" model might allow more flexible credential sharing within the team, but still requires centralized management for auditability. "Cross-team" collaboration favors "Centralized" credential management with strict access controls.

High-change-frequency systems need agile handover mechanisms, like automated deployment scripts and detailed version control logs. This compensates for potentially outdated documentation. In such cases, documentation might focus more on architecture and core logic, rather than every configuration item.

Systems with high external dependency complexity require detailed dependency lists and incident response plans. This addresses third-party service uncertainties. Credential management must cover internal credentials and sensitive API keys for external systems, ensuring secure storage and rotation.

A comprehensive assessment of these criteria provides the foundation for specific handover strategies and accountability. This ensures stable system operation, efficient resource use, and minimized risk.

## How to do it

Effective system handover ensures information is complete, accurate, and actionable. This requires a structured approach covering credential management, permission configuration, and documentation.

First, **credential management**. System credentials are core assets. Their security and control directly affect system security. Before handover, categorize all credentials. This includes:

*   Database connection strings (`MONGODB_URI`, `PG_URL`)
*   API Keys (`CHAT_API_KEY`, `ROOT_KEY`, `FILE_TOKEN_KEY`, `TOKEN_KEY`)
*   Third-party service credentials (e.g., S3 storage, Loki Log Path `LOKI_LOG_URL`)
*   Key files (e.g., `mongodb.key`)

Use a centralized management strategy for these credentials, such as a dedicated key management service or encrypted configuration storage. Do not hardcode credentials in code or store them in plaintext in version control. New team members should gain credential access through an authorization process, not by direct value transfer. Provide a secure credential management system with role-based access control. This ensures only authorized users can view or use specific credentials. For high-privilege credentials like `ROOT_KEY`, pay special attention to rotation mechanisms and audit logs. Ensure every access is recorded. For default passwords like `DEFAULT_ROOT_PSW`, change them immediately after deployment and confirm this during handover.

Next, **permission configuration**. System permission handover happens at two levels: system-level access and application-level fine-grained permissions. System-level permissions include server login credentials, container orchestration tool access (e.g., Docker Compose), and CI/CD pipeline execution rights. Grant these permissions based on the new team's roles, following the principle of least privilege. For example, operations teams might need to operate Docker containers (e.g., `privileged=true`), while development teams need access to code repositories and deployment pipelines. Application-level permission management is more complex, especially for multi-tenant or multi-role systems. For example, FastGPT offers fine-grained permissions: evaluation module permissions (`issue #5395`), team member permission details (`v4.9.5`), and application chat log permissions (`v4.12.0`). During handover, define each team member's role and configure corresponding permission sets. For instance, only administrators can delete evaluation results; regular users can only view them. You can grant specific roles batch data export permissions. For permission table adjustments, like the Role-to-Permission mapping in `v4.12.0`, ensure the new team understands this mapping and can configure user permissions via the management interface or API. For commercial versions, `v4.9.5-alpha` mentions detailed team member permissions, controlling whether users can create applications/knowledge bases in the root directory or API Keys. Handover must clarify these detailed permission allocation rules.

Finally, **documentation**. Complete documentation is critical for system knowledge transfer. Handover documentation should include:

1.  **System Architecture and Deployment Topology**: Detail the deployment location, relationships, and network configuration of all system components (e.g., `fastgpt-app`, `fastgpt-pro`, `fastgpt-plugin`, `mongo`, `pg`, `Sandbox`, `AIProxy`). The `docker-compose.yml` file should be a core reference, with detailed comments explaining environment variables, port mappings, and volume mounts for each service (e.g., `pg`, `mongo`).
2.  **Environment Configuration Checklist**: List all necessary environment variables, such as `LOG_DEPTH`, `DB_MAX_LINK`, `OPENAI_BASE_URL`, `ONEAPI_URL`, `PRO_URL`, `HOME_URL`, `CHAT_TITLE_MODEL`, `AGENT_SANDBOX_OPENSANDBOX_IMAGE`. Explain their purpose and recommended values. For removed configurations like `PARSE_FILE_WORKERS`, state this clearly and provide alternatives or explain automatic configuration logic.
3.  **Upgrade and Maintenance Guide**: Provide detailed system upgrade steps, including image updates (e.g., `fastgpt-app` image tag: `v4.16.2`) and database migration script execution (e.g., `initPermission`, `initv4120`, `initSandboxArchive`, `initToolJsonSchemaStorage`) with precautions. For complex operations like Milvus vector database upgrades (`v4.16.2`), which have prerequisites and data migration steps, documentation should cover dry-run, resume points, result verification, and rollback steps.
4.  **Troubleshooting Manual**: Common problems and solutions, such as container startup failures due to permission issues (`issue #1346`) or local FastGPT failing to connect to Docker containers (`issue #1072`). Include log viewing methods (e.g., `LOG_LEVEL`, `STORE_LOG_LEVEL` configurations) and error code explanations.
5.  **Application Features and Operation Instructions**: Describe system features, such as form input, loop nodes, node folding, workflow comments (`v4.8.11`), skill modules (`v4.15.0`), and knowledge base chunking optimization (`v4.9.2`). For new features, like the user selection node in `v4.8.10`, explain its use cases and limitations.

Documentation should be clear, accurate, easy to retrieve, and updated regularly to reflect system changes.

## How to verify

System handover verification clarifies accountability and ensures system maintainability. Here are checkable actions and pass criteria:

1.  **Credential Access Verification**:
    *   **Action**: New team members attempt to retrieve and use all core system credentials (e.g., database connections, API Keys) via the specified credential management system or secure channel.
    *   **Pass Criteria**: All credentials are successfully retrieved. They allow normal access to corresponding services or authorized operations. Sensitive credentials are not passed in plaintext.

2.  **Permission Configuration Review**:
    *   **Action**: New team members log into the system with their assigned roles and attempt to perform both authorized and unauthorized operations.
    *   **Pass Criteria**: Authorized operations (e.g., viewing evaluation results, creating applications/knowledge bases) execute normally. Unauthorized operations (e.g., deleting evaluation results, adjusting training parameters) are explicitly rejected by the system with appropriate permission error messages.

3.  **Deployment and Startup Verification**:
    *   **Action**: New team members independently deploy, configure, and start the system in a new environment, following the documentation.
    *   **Pass Criteria**: All core services (e.g., `fastgpt-app`, `mongo`, `pg`) start successfully with no abnormal log output. The deployment process matches the documentation.

4.  **Core Functionality Testing**:
    *   **Action**: New team members execute core business processes, such as creating a knowledge base, uploading documents, conducting conversations, and using workflow features.
    *   **Pass Criteria**: All core functions operate normally and as expected. For example, knowledge base training completes successfully, conversations return correct results, and workflows execute according to design.

5.  **Upgrade Process Rehearsal**:
    *   **Action**: New team members simulate a system version upgrade (e.g., from `v4.16.1` to `v4.16.2`) based on documentation, including image updates and necessary database migration script execution.
    *   **Pass Criteria**: The upgrade completes smoothly, and the system runs stably on the new version. Data migration scripts (e.g., `initPermission`, `initToolJsonSchemaStorage`) execute successfully. Dry-run results match formal execution results, with no `migration.errors`.

6.  **Troubleshooting Rehearsal**:
    *   **Action**: Simulate a common system failure (e.g., database connection loss or a service container error). New team members locate and restore the fault using the documentation.
    *   **Pass Criteria**: They can quickly pinpoint the problem using log information (e.g., logs configured with `STORE_LOG_LEVEL`) and successfully restore the system following documented steps.

7.  **Documentation Completeness and Accuracy Assessment**:
    *   **Action**: New team members read all provided handover documentation and attempt to resolve issues encountered during the above verification steps using the documentation.
    *   **Pass Criteria**: Documentation is clear, accurate, unambiguous, and covers all critical aspects: system architecture, configuration, deployment, upgrade, maintenance, and common troubleshooting. All documented configurations, parameter names, and steps match the actual system behavior.

8.  **External Dependency Verification**:
    *   **Action**: Verify connections and interactions with all external dependencies (e.g., S3, Milvus, external model services).
    *   **Pass Criteria**: All external dependency services are accessible, and the system's integrated functions (e.g., file storage, vector retrieval) operate stably.

## Limits: when this approach does not hold

The effectiveness of this handover and accountability approach depends heavily on specific external conditions and environments. In some cases, this systematic method may not fully apply or guarantee expected results.

First, **insufficient team collaboration and commitment** is the biggest limit. If development or operations teams lack a proactive willingness to collaborate, and won't invest enough time and effort in documentation, knowledge sharing, and handover drills, even a perfect process cannot bridge information gaps. For example, if developers don't update system architecture diagrams or configuration lists, or use private instead of centralized credential management, handover becomes impossible.

Second, **highly dynamic system architecture and rapid iteration** can make documentation obsolete. In environments with fast-changing business needs and frequent architecture adjustments, if system change frequency is too high, documentation updates may not keep pace with code iteration. For instance, `v4.15.0` introduced skill modules, rewrote Agent V2 logic, and re-architected the plugin system. If every change requires immediate documentation updates and re-handover, this becomes a huge burden, causing documentation to diverge from the actual system. In such cases, documentation "completeness" may not reach "Public Standard," focusing instead on core design principles and key change logs.

Third, **extreme personnel turnover rates** also weaken this approach. If core team members leave en masse during the handover period, and new members are not yet fully familiar with the system, even detailed documentation may lead to misunderstandings due to a lack of direct knowledge transfer and experience sharing. While documentation carries knowledge, its depth and breadth usually cannot fully replace interpersonal communication and experience.

Fourth, **system complexity exceeding documentation capabilities** is another limitation. For some highly complex systems, internal logic and error handling mechanisms may involve extensive implicit knowledge and experience. Even with detailed documentation, it may not cover all edge cases and potential issues. For example, the Milvus upgrade in `v4.16.2` involves complex steps like migrating old vector data and switching to BM25 full-text retrieval. If operators are unfamiliar with Milvus itself, relying solely on documentation might still not address all unexpected situations.

Finally, **uncontrollable external dependencies** also affect handover effectiveness. If the system heavily relies on external third-party services, and their stability, API changes, or technical support are unpredictable, even excellent internal system handover cannot guarantee overall system stability. For example, Doc2x API updates causing parsing failures (`v4.12.0`) or OpenAI SDK updates causing TTS voice playback errors (`v4.15.0`) are external factors requiring continuous attention. They may require the new team to invest extra effort in adaptation and maintenance after handover. In this scenario, handover documentation can only provide current integration solutions, not predict future challenges from external dependencies.

## Keep reading

- [Keeping a Knowledge Base Fresh: Refresh Cadence, Signals and Ownership](/en/guide/corpus-freshness-operations)
- [Incidents Worth Drilling: Writing a Runbook People Actually Use](/en/guide/incident-drill-and-runbook)
- [Usage and Capacity Review: Which Numbers to Watch and When to Scale](/en/guide/usage-and-capacity-review)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers
