---
title: Moving Apps Between Environments: What Export, Templates and Copies Carry Over
slug: /en/guide/app-migration-across-envs
page_type: Decision matrix
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A practical reference for technical decision makers and buyers evaluating cross-environment app migration for enterprise AI platforms, covering coverage, complexity, and rollback options.
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# Moving Apps Between Environments: What Export, Templates and Copies Carry Over

## When this decision has to be made
You must make this decision when your business requires multi-environment deployment. This includes syncing applications from development environments to testing, pre-production, or production environments, or sharing application configurations across teams.
Making this decision too early increases migration costs for unstable applications. You will face repeated configuration adjustments.
Making this decision too late creates configuration mismatches between production and development environments. This triggers launch failures and may disrupt business operations.
You also need to plan migration steps in advance if your application includes environment-dependent features: knowledge base configurations, workflow nodes, Agent Sandbox instances, or SSO integrations. Skipping these steps risks missing critical configurations.
Standardize application configurations across environments to avoid scenarios where testing passes but production fails. Without this standardization, functional consistency breaks.
You must act promptly when an application completes version iteration and needs a new version deployed across all environments. Timely migration ensures all environments receive updated functionality.

## Criteria matrix
| Candidate migration solution | Migration coverage scope | Configuration retention completeness | Dependency synchronization capability | Data migration scope | Operational complexity | Environment compatibility | Rollback feasibility |
|-------------------------------|-------------------------|---------------------------------------|----------------------------------------|-----------------------|-------------------------|---------------------------|-----------------------|
| Config export migration | Only core application configurations (Prompt, opening greeting, knowledge base associations, basic workflow configurations) | Retains custom metadata, chunking parameters, and knowledge base association configurations. Does not include Agent Sandbox startup scripts or skill bindings | Requires manual configuration of associated models and external service addresses | Does not include knowledge base chunks, session history, or file storage data | Low complexity, completed via built-in export functions | Requires manual adaptation of target environment variables | Retains export files for quick re-import to the original environment |
| Templated migration | Application template definitions (workflow structure, knowledge base association rules, Prompt templates) | Retains templated configuration items, supports custom parameters during import, and does not include real-time session data | Requires configuring target environment dependencies during import, supports template variable substitution | Does not include knowledge base chunks or session history. Knowledge base files must be imported manually | Medium complexity, requires creating templates and configuring variables | Template variables adapt to different environments; requires support for template import functions | Retains template files for re-import to the original environment |
| Full instance copy migration | All application configurations, knowledge base chunks, optional session history, Agent Sandbox configurations, and skill bindings | Fully retains all configurations including metadata, startup scripts, skill bindings, and SSO configurations | Automatically synchronizes some dependencies, requires manual updates of target environment-specific variables | Includes all stored data; cross-environment file synchronization requires additional processing | High complexity, requires executing migration API scripts and handling cross-environment file synchronization | Requires target environment version to match the original environment, requires version migration steps | Requires full backup of the original instance; rollback takes longer time |

## Why each criterion matters
Migration coverage scope is the core criterion. It directly determines the functional completeness of the application after migration.
Choose a full-data migration solution if your application needs to retain session history or knowledge base chunk data. Use a lightweight config export migration if you only need to sync configuration changes.
You need a migration solution that covers session history if your business has compliance requirements for retaining full operation records.
Configuration retention completeness determines whether the migrated application matches the original environment’s functionality. If your application uses custom metadata, chunking parameters, or specific Prompt configurations, confirm the migration solution preserves these items. Missing configurations will cause application functionality failures.
Dependency synchronization capability affects adaptation efficiency after migration. If your target environment differs from the original, choose a solution that supports automatic synchronization or variable substitution. This reduces manual configuration work.
Data migration scope determines data integrity after migration. For applications with large knowledge bases or user session data, select a migration solution that covers core data to avoid data loss.
Operational complexity impacts migration implementation costs. For small teams or resource-limited scenarios, a low-complexity config export migration is ideal. For large applications or complex environments, choose a solution with manageable operational complexity.
Environment compatibility determines whether migration completes successfully. If your target environment uses a different version than the original, select a solution that supports version migration steps. This avoids configuration incompatibility issues.
Rollback feasibility affects fault recovery efficiency. A solution that lets you quickly revert to the original environment reduces business downtime if migration issues occur.

## The cost of switching later
Switching to a different migration scheme after you select one incurs additional costs.
If you switch from config export migration to full instance copy migration, you must re-migrate knowledge base chunks, session history, and Agent Sandbox configurations. You will need to run dedicated migration API scripts. You may require a maintenance window to ensure data consistency. Validation work includes checking all configuration items and syncing object storage files. This process takes significant time.
If you switch from templated migration to config export migration, you must reconfigure all template variables. You will lose previously preset parameter configurations. You will need to manually adjust basic settings for each application. This risks configuration inconsistencies across environments.
If you switch from full instance copy migration to config export migration, you must delete unnecessary session history and file storage data. You will need to run data cleanup scripts. This carries a risk of accidental data deletion, so you must complete a full backup first.
Switching migration schemes may also introduce version compatibility issues. For example, you must follow official documentation’s version sequence when executing JSON Schema migration steps. Failing to do so causes configuration damage and requires extra troubleshooting and repair time.

## When this decision can wait
You can delay this decision if your application runs only in a single environment, with no need for cross-environment deployment or configuration sharing.
You can wait if your application is in a rapid iterative testing phase with frequent configuration changes. Frequent migration increases workloads. Wait until the application’s functionality stabilizes before unifying migration steps.
You can delay the decision if your target environment exactly matches the original environment and application configurations will not change. You can temporarily reuse the original environment’s configurations without extra migration work.
You can pause the decision if your team lacks sufficient manpower or resources to complete migration operations. Plan migration steps once resources become available.
You can skip dedicated migration steps if your application does not use Agent Sandbox, and has no associated skills or SSO integrations. You do not need to run full environment migration workflows at this time.

## Keep reading

- [Deployment Architecture: Images and Trade-offs on x86 and ARM Servers](/guide/cpu-arch-and-image-selection)
- [Chat History Depth: How Many Rounds to Carry, Where to Cut and When to Use Variables](/guide/history-rounds-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers

> Criteria taken from the open-source repository and community threads, verified 2026-09-28.
