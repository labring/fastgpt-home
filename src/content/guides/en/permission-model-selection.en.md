<!--
slug: permission-model-selection
canonical: https://fastgpt.io/guide/permission-model-selection
hreflang: en | zh-CN → https://fastgpt.cn/guide/permission-model-selection | en → https://fastgpt.io/guide/permission-model-selection | x-default → https://fastgpt.io/guide/permission-model-selection
Meta title: FastGPT Permissions: Teams, Members and API Key Scope
Meta description: Define FastGPT permission boundaries for teams, members and API keys, with criteria for access control, administration, audits and migration planning.
keywords: permission model selection
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 程序化技术页-第6批/英文-fastgpt.io/guide/permission-model-selection.md
source_sha256: 22c8eb540a18d189c889ad0ed8d5df2ad10d128f0098e17a949d8556378b79ae
source_verified: 2026-09-07
publication_batch: Week08
-->

# Teams, Members and API Keys: Where to Draw Permission Boundaries

## When this decision has to be made
You must make this decision when: your team grows beyond 3 people, you have cross-role collaboration needs, you expose public API interfaces, or you handle sensitive data evaluations, knowledge base operations, or application orchestration.

Making the decision too early adds unnecessary deployment and learning costs, slowing your project launch. Making it too late leads to risks like accidental deletion of evaluation results, unauthorized access to sensitive knowledge bases, untraceable API key abuse, and non-compliance with audit requirements. Later permission system overhauls will require extra work such as data migration and business downtime.

Additionally, when you use commercial platform features or upgrade to v4.16.2 or later, your existing permission system triggers a cleanup and migration process. Teams without pre-planned permission boundaries face migration failures and data anomalies.

You also need to define permission boundaries if your business requires compliance with industry frameworks or offers standardized external API services. Failing to do so will prevent you from passing compliance audits or obtaining external service qualifications.

## Criteria matrix
| Candidate Permission Model | Permissions Granularity | Authentication Complexity | Audit Traceability | External API Adaptability | Compliance Support | Deployment Cost |
|-----------------------------|--------------------------|------------------------------|---------------------|---------------------------|--------------------|-----------------|
| Team-based permission model | Team-level resource permission control, supports resource sharing within the team | Low | Only records team operations, cannot trace to individual users | Requires extra permission layer encapsulation, average adaptability | Not stated in the documentation; verify in your environment | Low |
| Role-based permission model | Supports granular segmentation of team members by role, controls permissions to create root directory applications, knowledge bases, and API keys (added in v4.9.5) | Medium | Records role-level operations, supports permission traceability | Requires combining role information for authentication, good adaptability | Supports team member permission granularization and operation log recording (added in v4.9.5) | Medium |
| API Key-based permission model | Only supports application-level permissions, cannot associate with specific users | Low | Only records API Key calls, cannot associate with specific users | Natively supported, conforms to OpenAPI specifications | Not stated in the documentation; verify in your environment | Very Low |
| Hybrid team + role + API Key model | Supports multi-layer permission control for teams, roles, and API keys, covers team, individual, and external call scenarios | High | Can associate teams, roles, specific users, and API keys | Natively supports API Key, combines role-based authentication, optimal adaptability | Supports team operation logs and permission granularization, meets enterprise-level compliance requirements | High |
| Shared link permission model | Controls access via shared link outlinkUId, supports temporary permission assignment | Low | Only records shared link access, cannot associate with specific users | Requires combining sharing logic, average adaptability | Not stated in the documentation; verify in your environment | Medium |

## Why each criterion matters
### Permissions Granularity
Permissions granularity determines how precise your permission control is. If your team has multi-role collaboration or needs separate authorization for sensitive actions, overly coarse granularity leads to permission abuse. For example, a team-based model lets regular members gain unnecessary access to delete evaluation results, violating the principle of least privilege. Overly fine granularity raises configuration and maintenance costs. Choose based on your team size and collaboration scenarios.

The platform’s v4.9.5 update adds role-based granularity for controlling permissions to create root directory applications, knowledge bases, and API keys. This shows that granular permission control is a core requirement for enterprise scenarios. Failing to plan early requires later adjustments to permission table structures, adding development and migration costs.

### Authentication Complexity
Authentication complexity directly impacts system operational difficulty and user experience. Low-complexity methods like API Key authentication are easy to configure but cannot associate actions with specific users. They work well for general external API scenarios. High-complexity hybrid authentication enables fine-grained control but requires maintaining multi-layer permission mappings, raising learning and configuration costs for operations teams.

If complexity exceeds your team’s capabilities, you risk misconfigurations that cause permission breaches or blocked user access. For example, exposing unprotected API interfaces leads to unauthorized access. The requirement for API calls to include authentication parameters means your auth logic must align with your business scenarios.

### Audit Traceability
Audit traceability is critical for compliance and security troubleshooting. When data leaks or accidental changes occur, you need audit logs to locate the specific operator and time of the action. The v4.9.5 update adding team member operation logs shows that audit capabilities are now standard for enterprise-level features.

Without audit traceability, you cannot track API Key callers or sensitive data access paths, failing compliance requirements and slowing incident response. For example, a team-based model cannot distinguish between individual team members’ actions, making responsibility unclear after an incident.

### External API Adaptability
External API adaptability determines how well your system integrates with external systems. If you rebuild conversation pages via APIs or integrate third-party tools, a poorly adaptable permission model adds integration costs. The requirement for API calls to pass parameters like appId and source, plus some interfaces relying on cookie authentication, means your native auth logic must align with external permission systems.

If your permission model does not support API Key authentication or role association, you need to build extra permission layers, extending development cycles and maintenance work. For example, a team-based model cannot assign fine-grained API access to third-party applications, limiting your system’s integration capabilities.

### Compliance Support
Compliance support directly impacts your enterprise’s compliance risk. Different industries have clear rules for permission control and auditing, such as requirements to log access and enforce permission boundaries. The platform’s commercial features supporting SSO and member sync show that compliance support ties to platform versions.

If your permission model fails to meet compliance requirements, your business faces penalties and cannot pass security certifications. For example, missing operation log records violates audit requirements for certain compliance frameworks, leading to failed audits.

### Deployment Cost
Deployment cost includes development, configuration, and learning costs. Permission models vary widely in deployment cost. For example, an API Key-based permission model requires no extra development, so deployment cost is very low. A hybrid model requires integrating existing permission systems, so deployment cost is high.

If deployment costs exceed your team’s budget, you might delay or abandon permission optimizations, leading to later security risks. For example, a small team choosing a high-complexity hybrid model might struggle with operational capabilities, leading to a disorganized permission system.

## The cost of switching later
Switching to a new permission model after selecting one carries multiple costs: data migration, business downtime, and validation work.

First, data migration costs: You must move existing permission data from the old model’s storage structure to the new model’s database tables. For example, switching from a team-based to a role-based model requires mapping existing team members’ role fields to a new role permission table. The v4.16.2 permission migration process requires a dry-run and formal migration step, meaning you need extra scripts and testing. A failed migration can lead to lost permission data.

Second, downtime costs: Switching permission models requires pausing system operations to adjust database table structures and migrate data. The downtime length depends on data volume and migration script efficiency. Large teams with large amounts of permission data could face several hours of downtime, disrupting normal business operations.

Third, validation and training costs: You need to write unit and integration tests to verify the new model’s effectiveness and security. For example, test API access permissions for different roles and audit log recording. The baseline testing and validation work takes 2 person-days, and switching models adds to this workload. You must cover all existing business scenarios to avoid permission gaps.

You also need to train team members on the new permission configuration and workflows, adding communication and training costs. Failing to back up data before switching can lead to irreversible permission data loss, requiring extra work to recover data. For example, not backing up the database before migration leads to corrupted permission configurations, forcing manual reconfiguration and massive extra work.

## When this decision can wait
You can delay this decision in these scenarios:

First, your team has fewer than 3 people, and one person handles all system operations and maintenance. A single user can manage all resource access without complex permission segmentation, avoiding over-engineering and unnecessary initial costs.

Second, your system is only for personal testing or single-user internal use, with no exposed external APIs or cross-role collaboration needs. For example, using the platform to organize personal knowledge bases and run test conversations without inviting other members or offering external APIs. The benefits of permission segmentation here are far lower than the configuration costs.

Third, your project is in rapid iteration, with core features unstable. Adjusting the permission system could delay core feature development. Use the default permission model temporarily, and optimize permissions once core features are stable.

Fourth, your team lacks sufficient operations and development resources to handle permission model configuration and maintenance. Prioritize launching core business first, but remember to define permission boundaries later if team size or business scenarios change, to avoid security and compliance risks.

## Keep reading

- [Cloud, Community Self-Hosting or Commercial Private Deployment: Six Criteria](/en/guide/deployment-form-selection)
- [Choosing a Document Parser: Built-in, Enhanced and External Services](/en/guide/doc-parser-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
