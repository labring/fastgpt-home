---
title: Decision Guide: What Data Should Not Enter Your Enterprise AI Knowledge Base
slug: /en/guide/data-boundary-and-masking
page_type: Deep-dive guide
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Define what enters an AI knowledge base, mask sensitive data before model calls, and verify access controls, retention, and deletion.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Decision Guide: What Data Should Not Enter Your Enterprise AI Knowledge Base | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 深度内容-英文版/data-boundary-and-masking-EN-V1.0-20260914.md
source_sha256: 7e367269c7f0975b41d20f89922b2bfc5d7dc8da45f9d88507ae5af87c9970ed
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository, verified 2026-09-14.
---

# Decision Guide: What Data Should Not Enter Your Enterprise AI Knowledge Base

## When this becomes a decision
You face this decision when you start building your enterprise AI knowledge base and integrate multi-source business data, user-uploaded files, and third-party knowledge base content. As the knowledge base grows, irrelevant data will creep in, reducing recall accuracy and harming business performance. Unanonymized personal sensitive information or core business confidential data retrieved by the system may trigger compliance risks.
Your need for clear data boundaries becomes explicit during a data compliance audit, when a potential data leak occurs, or when you share knowledge base resources across departments. When workflows frequently reference knowledge base data and multiple permission roles access the same base, unmarked boundaries break permission controls, letting unauthorized users access sensitive data. If you enable virtual machine functions in tool calling modes and user-uploaded files inject directly into VMs, unspecified boundaries expose sensitive data in sandbox environments.
Manual screening can no longer meet the needs of large-scale knowledge base management. You must build an implementable rule system to lock down boundary controls and avoid both compliance and business risks later on.

## What to settle first
You must define these core criteria first, with a clear priority hierarchy. The table below lists mandatory checks:
| Criterion | What to set | Basis |
| --- | --- | --- |
| Contains personal sensitive information | Yes/No | Requirements from personal information protection-related regulations; must be anonymized or excluded |
| Qualifies as core business confidential data | Yes/No | Enterprise internal data classification standards; core confidential data must not be included |
| Relevant to the current knowledge base business scenario | Yes/No | Only include valid data that supports the target business scenario |
| Has legal data source usage authorization | Yes/No | Confirm authorization scope and term for third-party data source access |
| Has data expiration risk | Yes/No | Evaluate retention necessity per data lifecycle management rules |
| Violates the data minimization principle | Yes/No | Only include the minimum data volume required to achieve business goals |

Personal sensitive information and core business confidential data have the highest priority. Any dataset matching these criteria must not be added to the knowledge base. Business relevance is the next priority, ensuring the knowledge base only serves preset application scenarios and avoids irrelevant data interfering with recall. The remaining criteria are auxiliary checks. If multiple criteria conflict, conduct a weighted assessment based on enterprise compliance requirements and business scenarios. For example, if a third-party data source is partially relevant to your scenario but lacks clear authorization, complete the authorization process first before evaluating inclusion. You can adjust all criteria based on your industry and compliance requirements. Highly regulated industries like finance and healthcare can further refine the scope of the personal sensitive information criterion.

## How to do it

Inventory pending data sources with their content scope, usage authorization, permitted roles, and retention periods. Apply the same intake review to uploaded files, third-party knowledge bases, and workflow inputs. Implement sensitive-data detection and masking in an enterprise preprocessing service or controlled workflow before importing approved content. Validate the complete path with representative sensitive fields. `MAX_FOLDER_DEPTH` controls folder nesting; business rules and access controls enforce data admission.

Check data destinations before file parsing, model requests, and tool calls. `MULTIPLE_DATA_TO_BASE64` controls media conversion for model compatibility; the encoded content still enters the model request. Mask sensitive fields by redacting, removing, or substituting them, and review the model service's access and data-use terms. `AGENT_SANDBOX_NPM_REGISTRY` and `AGENT_SANDBOX_PYPI_INDEX_URL` select dependency download sources. Configure sandbox egress, file access, and log filtering separately. A tool's data-processing capabilities depend on its implementation and configuration.

Set separate retention and deletion rules for knowledge base documents, uploads, conversation logs, sandbox files, and backups. S3 CDN and pathStyle options control access addresses and request addressing; configure storage permissions, encryption, and object lifecycle in the storage service. `AGENT_SANDBOX_SUSPEND_MINUTES` and `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` control instance suspension and archiving. Verify deletion of archived data separately. After deleting knowledge base content, check background-task completion, retrieval results, source files, and retained backups. Training retries and `dataId` duplicate checks address execution and record consistency; sensitive-data cleanup requires its own procedure.

Grant minimum permissions separately for knowledge bases, apps, and conversation logs. Test ordinary members, read-only members, and external callers. When an upgrade requires permission migration, follow the target version's upgrade instructions with a backup and a tested migration procedure. Scope API keys to each integration, protect and rotate them, and revoke leaked keys promptly. Application context identifies the call target. Trusted-proxy configuration supports reliable client attribution; server-side permission checks enforce resource access.

## How to verify
1. Randomly select 10% of the data samples already added to the knowledge base, and check for personal sensitive information or core business confidential data. Pass if no content violates the highest-priority criteria.
2. Review access authorization documents for all third-party data sources. Pass if every source has a clear legal authorization scope and usage term.
3. Run a knowledge base search test to verify recall result relevance. Pass if all retrieved content is relevant to the current business scenario, with no irrelevant data interfering.
4. Check system configurations and data retention rules. Pass if directory depth aligns with the `MAX_FOLDER_DEPTH` setting, and expired data has been cleaned per lifecycle rules.
5. Simulate an unauthorized user accessing the knowledge base. Pass if unauthorized users cannot access knowledge base data or conversation logs beyond their permission scope.
6. Trigger the file processing flow for tool calls and virtual machine scenarios. Pass if sensitive data has been anonymized during injection, parsing, and storage stages.
7. For deployments that completed permission migration, check resource permission cleanup and migration results. Pass if invalid permission records have been deleted and full valid ACLs have been completed.
8. Validate API key and permission control logic. Pass if requests use credentials authorized for the target resource, and revoked keys and out-of-scope requests are rejected.

## Limits: when this approach does not hold
This data boundary control rule relies on specific external conditions and system configurations. These rules may no longer apply when these conditions change.
When new laws and regulations are introduced, or existing compliance requirements are updated, you may need to revise your original criteria. For example, new personal information processing rules may expand the scope of sensitive information.
When you integrate new data source types, such as untested audio and video knowledge bases or new third-party platforms, re-evaluate whether the data content of this source meets your criteria to avoid violations from unforeseen data formats.
When your business scenario undergoes major changes, such as expanding from an internal knowledge base to a customer-facing shared knowledge base, redraw your original data boundaries to ensure isolation between customer data and internal data.
When your system architecture is upgraded, such as switching vector database types or adjusting workflow node logic, reconfigure data processing and permission control rules to avoid boundary failures from architecture changes.
Failing to regularly audit data boundaries and compliance requirements, or update your criteria and configurations, may let non-compliant data gradually enter the knowledge base and lead to subsequent risks.

## Keep reading

- [Building an Evaluation Set for Enterprise Open-Source AI Platforms: Pre-Launch Samples, Post-Launch Regression, and Scoring](/en/guide/answer-evaluation-set)
- [Decision Guide for Human Handoff in Open-Source Enterprise AI Platforms](/en/guide/human-handoff-design)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- [Contact sales](/en/contact): apply this process to your deployment
- [Get started](/en/start): validate the process on the cloud service
- [Pricing](/en/price): compare what each form covers
