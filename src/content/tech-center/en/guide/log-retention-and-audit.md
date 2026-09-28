---
title: Conversation Logs: Retention Scope, Access Boundaries and Cleanup
slug: /en/guide/log-retention-and-audit
page_type: Decision matrix
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Define FastGPT conversation-log retention, access, export, and cleanup based on deployment capabilities and your audit requirements.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Conversation Logs: Retention Scope, Access Boundaries and Cleanup | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 决策矩阵页-第2批/英文-fastgpt.io/guide/log-retention-and-audit.md
source_sha256: da0583c5f863e96b121b92d5f18ac6bdd4b2360f4f8f4f96296d199cce12ebe2
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository and community threads, verified 2026-09-14.
---

# Conversation Logs: Retention Scope, Access Boundaries and Cleanup

## When this decision has to be made
You must make this decision when you deploy FastGPT to a production environment, run formal business interactions, enable multi-tenant collaboration, or need to meet data compliance audit requirements.

Setting overly strict retention and access rules too early in the testing phase increases temporary debugging operational costs and limits developers’ ability to backtest conversation data. Delaying this decision too long means you will not quickly retrieve records when facing user complaints, system failures requiring traceability, or regulator requests for compliance audit data. You may even face compliance risks from unstandardized data retention or uncontrolled access permissions.

Additionally, when you enable Agent Sandbox, tool calling, and other features, external tool return content may enter conversation logs. Without clear access boundaries and retention rules, you face content security risks. Complete this decision early to avoid future issues.

## Criteria matrix

The following are retention design options implemented through collection, archival, access, and cleanup mechanisms. Validate the actual coverage and the time at which each rule takes effect.
| Candidate Scheme | Data Retention Duration | Access Permission Scope | Storage Resource Usage | Compliance Adaptability | Operational Complexity | Content Security Coverage |
| --- | --- | --- | --- | --- | --- | --- |
| Basic Retention Mode | LLM request tracking defaults to 6 hours; define separate chat and audit retention periods | Validate permissions for each record type | Varies with fields, traffic, and duration | Validate against business policies | Lower, depending on implementation | Inspect actual request, response, and chat fields and apply appropriate redaction |
| Full Retention Mode | Define periods by data class and implement archival or cleanup | Configure administrator, audit, and business access by responsibility | Increases as collection expands | Validate completeness, access, and archival requirements | Depends on collection and archival mechanisms | Verify actual capture of interactions, tool calls, and Sandbox outputs |
| Team Tiered Retention Mode | Define and implement retention rules for each team | Configure and validate team and resource permissions | Varies with team rules and traffic | Validate against each team’s applicable requirements | Depends on rule count and implementation | Define and verify collection and redaction scope by team |
| Temporary Session Mode | Define short retention or immediate cleanup and verify deletion timing | Restrict identity and record access permissions | Depends on actual retained scope | Assess against applicable retention obligations | Requires maintained and tested cleanup mechanisms | Verify retained data across chats, tracking, archives, and backups |
| Compliance Mandatory Retention Mode | Determine duration from applicable business rules and institutional policies | Apply least privilege to audit and necessary business access | Varies with duration and collection scope | Validate completeness, access control, and archival requirements | Depends on requirements and implementation | Capture and validate interactions and tool outputs within the required audit scope |

## Why each criterion matters
### Data Retention Duration
This factor directly impacts compliance risk and storage costs. Too short retention fails to meet regulatory audit or issue traceability needs: for example, if you need to verify historical conversations during a business dispute, you cannot provide valid evidence if data has been deleted. Too long retention increases storage resource consumption and expands the risk of data leaks.

`LLM_REQUEST_TRACKING_RETENTION_HOURS` defaults to six hours for LLM request tracking. Determine chat-history and audit-log retention separately from their actual configuration, business policies, and archival workflows. Validate storage and cleanup rules for each record type in production.

### Access Permission Scope
This factor directly determines data security risk. Overly loose permissions allow unauthorized personnel to access sensitive conversation content, leading to data leak risks. Overly strict permissions block compliance auditors or troubleshooting staff from accessing necessary data, reducing problem handling efficiency.

Agent Sandbox or external tool outputs may contain sensitive information, so validate where they are recorded and who can access them. Enterprises can assign access by responsibility, for example restricting core business records to authorized audit and business roles and configuring team access for ordinary business records.

### Storage Resource Usage
Expanding collection to include tool call details and Sandbox outputs generally increases storage and query workloads. Estimate capacity from the actual fields, request traffic, retention periods, and archival approach.

Validate query performance and cleanup behavior when selecting a retention design that balances operating costs and business traceability needs.

### Compliance Adaptability
Compliance requirements depend on jurisdiction, business type, and institutional policy. Determine financial-record retention periods from the rules applicable to the specific business, and assess relevant privacy requirements for healthcare scenarios.

Translate these obligations into record-specific retention periods, access permissions, and archival rules. Validate completeness, cleanup boundaries, and audit usability against the applicable requirements.

### Operational Complexity
Operational complexity depends on the rules and implementation. Expanded collection and team-tiered retention require maintaining more permission, duration, and archival rules. Temporary sessions also require implemented and tested cleanup mechanisms.

You must select an appropriate retention mode based on your enterprise’s operations team capacity and business needs to avoid excessive operational burden.

### Content Security Coverage
Content security coverage depends on actual collected fields and their redaction rules. LLM requests and responses may include tool data. Validate chat records, tool call details, and Sandbox output coverage separately.

Expanded collection can support auditing while increasing the sensitive content requiring protection. Configure access control, redaction, and cleanup for the actual data captured.

## The cost of switching later
Switching retention designs carries collection, archival, and configuration costs. Expanded collection applies to requests after the policy takes effect. Historical tool details and Sandbox outputs can be supplemented only to the extent that recoverable source data already exists. Estimate the additional storage and processing workload.

Second is downtime window costs: some configuration changes require restarting services to take effect. Switching modes may cause temporary system unavailability, so you must select a low-business-activity period to avoid impacting user experience.

Third is validation workload costs: after switching modes, you must verify that the new retention rules work correctly, including whether data is retained as required, whether access permissions are correctly configured, and whether content security coverage meets requirements. This requires significant testing and validation work.

When adjusting compliance retention, maintain historical records for their applicable retention obligations and validate the new audit rules and permissions.

## When this decision can wait
During testing with test data, while business scale and audit requirements are still being evaluated, start with an explicit short-term retention policy and prioritize deployment and basic function checks.

Confirm the actual chat and request-tracking data captured during testing so that problems can be traced and records cleaned up as planned. Complete applicable retention, access, and archival rules before launching formal business interactions, multi-tenant collaboration, or sensitive tool calls.

Check that the selected testing retention period is sufficient for troubleshooting and that the cleanup mechanism works as intended.

## Keep reading

- [Releasing and Regression-Testing an App: Versions, Canary and Rollback](/en/guide/app-release-and-regression)
- [Where Files Live: Local Volumes, Object Storage and External S3](/en/guide/file-storage-selection)

## References

- [FastGPT v4.17.0 LLM request tracking retention](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/self-host/config/env.mdx)
- [LLM request record TTL schema](https://github.com/labring/FastGPT/blob/v4.17.0/packages/service/core/ai/record/schema.ts)
- [Persistent chat schema](https://github.com/labring/FastGPT/blob/v4.17.0/packages/service/core/chat/chatSchema.ts)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
