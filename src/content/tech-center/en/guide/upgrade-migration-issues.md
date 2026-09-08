---
title: FastGPT Upgrades and migrations Issue List
slug: /en/guide/upgrade-migration-issues
page_type: Issue list
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT Upgrades and migrations Issue List | FastGPT Technical Center
meta_description: Explore Upgrades and migrations Issue List with symptom-based checks, published article links and practical guidance for troubleshooting your deployment.
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/英文-fastgpt.io/guide/upgrade-migration-issues.md
source_sha256: 02a75dc929305608001d7612bb0fa417b22ad5ecb41aa564e33c29f59e4122f9
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT Upgrades and migrations Issue List

This page collects the 114 published documents about the upgrade process and behaviour after upgrading, grouped by symptom, so a document can be found directly from what the error looks like.

## Three symptoms that belong to this stage

1. Behaviour changes after an upgrade
2. An upgrade stops partway or has to be rolled back
3. Dependency order when skipping several versions

If none of the three match, go back to the [deployment and environment issue landscape](/en/guide/deployment-issue-landscape) and narrow down again.

## The general order for this stage

1. Take the full error from the backend service log for this stage's component, including the component name and error code
2. Verify from inside the deployment that the component can be reached on its own, ruling out network and permission causes
3. Check the component version against the main service version
4. Follow the entry below whose symptom is closest, then repeat the same operation to verify

## Published documents (114)

| Document | Area |
| --- | --- |
| [Add Agent-Sandbox Configuration for FastGPT Upgrade](/en/deploy/fastgpt-add-agent-sandbox-config) | deploy |
| [Add Mandatory Environment Variables for FastGPT 4.15 Upgrade](/en/deploy/fastgpt-415-upgrade-environment-variables) | deploy |
| [Adjust FastGPT Environment Variables for 4.15.04 Upgrade](/en/deploy/fastgpt-upgrade-environment-variables) | deploy |
| [Check FastGPT Version and Upgrade to Resolve Issues](/en/deploy/fastgpt-version-check-upgrade) | deploy |
| [Complete Required FastGPT Commercial Edition Initialization](/en/deploy/fastgpt-commercial-edition-initialization) | deploy |
| [Configure Agent Sandbox Environment Variables for FastGPT 4.16.1 Upgrade](/en/deploy/fastgpt-agent-sandbox-env-config) | deploy |
| [Configure FastGPT 4.14.11 Upgrade Environment Variables](/en/deploy/fastgpt-upgrade-env-vars) | deploy |
| [Configure and Upgrade FastGPT ReRank Models](/en/deploy/fastgpt-rerank-model-upgrade-config) | deploy |
| [Critical Impacts of FastGPT 4.15.00 Upgrade](/en/deploy/fastgpt-4-15-00-upgrade-impacts) | deploy |
| [Deploy FastGPT MCP Server for Self-Hosted Upgrades](/en/deploy/fastgpt-mcp-server-deployment) | deploy |
| [Detailed Technical Improvements for FastGPT 4.15.5 Upgrade](/en/deploy/fastgpt-4155-upgrade-improvements) | deploy |
| [Enforce FastGPT Skill Initialization Execution Constraints](/en/tutorial/fastgpt-skill-initialization-execution-constraints) | tutorial |
| [Execute FastGPT 4.15 Upgrade Migration Scripts](/en/deploy/fastgpt-415-migration-scripts) | deploy |
| [Execute FastGPT 4.8.6 Application Permission Initialization](/en/deploy/fastgpt-486-app-permission-init) | deploy |
| [Execute FastGPT 4.8.8 Dataset Permission Initialization](/en/deploy/fastgpt-488-dataset-initialization) | deploy |
| [Execute FastGPT v4.12.1 Commercial Migration Script](/en/deploy/fastgpt-v4121-migration-script) | deploy |
| [Execute FastGPT v4.14.51 Admin Upgrade Script](/en/deploy/fastgpt-41451-upgrade-script) | deploy |
| [Execute FastGPT v462 Initialization API for Self-Hosted Deployments](/en/deploy/fastgpt-v462-initialization-api) | deploy |
| [Execute FastGPT v464 Administrative Initialization API](/en/deploy/fastgpt-v464-init-api) | deploy |
| [Execute Self-Hosted FastGPT 4.14.7 Upgrade Script](/en/deploy/fastgpt-4147-upgrade-script) | deploy |
| [Execute the FastGPT 4.9.1 Upgrade Script](/en/deploy/fastgpt-491-upgrade-script) | deploy |
| [FastGPT 4.12.4 Key Functional Upgrade Improvements](/en/deploy/fastgpt-4124-upgrade-improvements) | deploy |
| [FastGPT 4.14.9 Upgrade Key Improvement Details](/en/deploy/fastgpt-4149-upgrade-improvements) | deploy |
| [FastGPT 4.15.0 Environment Variable Upgrade Changes](/en/deploy/fastgpt-4150-env-upgrade-changes) | deploy |
| [FastGPT 4822 Upgrade New Technical Features](/en/deploy/fastgpt-4822-upgrade-features) | deploy |
| [FastGPT 490 Upgrade New Feature Details](/en/deploy/fastgpt-490-new-features) | deploy |
| [FastGPT 491 Version Bug Fix Details](/en/deploy/fastgpt-491-bug-fixes) | deploy |
| [FastGPT 4910 Version Feature Improvement Breakdown](/en/deploy/fastgpt-4910-upgrade-improvements) | deploy |
| [FastGPT 4910 Version New Feature Enhancements](/en/deploy/fastgpt-4910-new-features) | deploy |
| [FastGPT 4911 Version New Feature Updates](/en/deploy/fastgpt-4911-new-features) | deploy |
| [FastGPT 4912 Technical Upgrade Feature Details](/en/deploy/fastgpt-4912-new-features) | deploy |
| [FastGPT 4912 Upgrade Functional Improvements](/en/deploy/fastgpt-4912-upgrade-improvements) | deploy |
| [FastGPT 498 Upgrade New Feature Breakdown](/en/deploy/fastgpt-upgrade-new-features) | deploy |
| [FastGPT Sandbox Environment Variable Changes for 4.15.03 Upgrade](/en/deploy/fastgpt-sandbox-env-changes) | deploy |
| [FastGPT Self-Hosted Upgrade 496 Feature Improvements](/en/deploy/fastgpt-upgrade-496-feature-improvements) | deploy |
| [FastGPT Version 4819 Release Updates](/en/deploy/fastgpt-4819-release-notes) | deploy |
| [FastGPT Version 4821 Full Release Notes](/en/deploy/fastgpt-v4821-release-notes) | deploy |
| [FastGPT v4.13.0 Core Technical Upgrade Improvements](/en/deploy/fastgpt-v4130-upgrade-improvements) | deploy |
| [FastGPT v4.14.5 Upgrade New Feature Details](/en/deploy/fastgpt-4145-upgrade-features) | deploy |
| [FastGPT v4818 Upgrade Feature and Fix Summary](/en/deploy/fastgpt-v4818-release-notes) | deploy |
| [Initialize API Key App Names for 4.15.1 Upgrade](/en/deploy/fastgpt-api-key-appname-initialization) | deploy |
| [Initialize FastGPT Commercial Edition Upgrade Data](/en/deploy/fastgpt-commercial-upgrade-init) | deploy |
| [Initialize FastGPT dataset.files collection via API](/en/deploy/fastgpt-dataset-initialization-api) | deploy |
| [Initialize Missing Fields in FastGPT Database Collections](/en/deploy/fastgpt-db-field-initialization) | deploy |
| [Key FastGPT Self-Hosted Upgrade Performance Improvements](/en/deploy/fastgpt-upgrade-performance-improvements) | deploy |
| [Key FastGPT v492 Version Upgrade Improvements](/en/deploy/fastgpt-v492-upgrade-improvements) | deploy |
| [Key Improvements in FastGPT 491 Self-Host Upgrade](/en/deploy/fastgpt-491-upgrade-improvements) | deploy |
| [Key Technical Improvements for FastGPT 490 Upgrade](/en/deploy/fastgpt-490-upgrade-improvements) | deploy |
| [Migrate Chat Title Model Configuration for FastGPT Upgrade](/en/deploy/fastgpt-chat-title-model-migration) | deploy |
| [Migrate FastGPT Agent Sandbox Data for 4.16.0](/en/deploy/fastgpt-4160-agent-sandbox-migration) | deploy |
| [Migrate FastGPT Config to Environment Variables](/en/deploy/fastgpt-config-migration-env) | deploy |
| [Migrate FastGPT Datasets for 4.14.3 Upgrade](/en/deploy/fastgpt-4143-dataset-migration) | deploy |
| [Migrate FastGPT Pro SSO and Sync Configurations](/en/deploy/fastgpt-pro-sso-sync-migration) | deploy |
| [Migrate FastGPT Workflow V1 to V2 Data During Upgrade](/en/deploy/fastgpt-workflow-v1-v2-migration) | deploy |
| [Migrate FastGPT config.json to environment variables](/en/deploy/fastgpt-config-env-migration) | deploy |
| [Migrate Legacy FastGPT File Upload Workflows](/en/deploy/fastgpt-legacy-file-upload-migration) | deploy |
| [Migrate Manual HTTP Tool Data for FastGPT 4.16.0](/en/deploy/fastgpt-4160-http-tool-migration) | deploy |
| [Migrate OneAPI Channels to AI Proxy](/en/deploy/migrate-oneapi-ai-proxy) | deploy |
| [Migrate User Avatars for FastGPT v4819 Upgrade](/en/deploy/fastgpt-v4819-avatar-migration) | deploy |
| [Migrate User-Bound OpenAI Accounts for FastGPT v4817](/en/deploy/fastgpt-v4817-openai-account-migration) | deploy |
| [Migrate and Clean Up Legacy Skill Debug Chat Data](/en/deploy/fastgpt-upgrade-legacy-skill-debug-cleanup) | deploy |
| [New Features for FastGPT Self-Host Upgrades](/en/deploy/fastgpt-upgrade-new-features-2) | deploy |
| [Perform FastGPT 4811 Commercial Edition Initialization](/en/deploy/fastgpt-4811-commercial-initialization) | deploy |
| [Perform FastGPT v469 Initialization Operations for Self-Hosted Deployments](/en/deploy/fastgpt-v469-initialization-script) | deploy |
| [Procedures for FastGPT Application Version Rollbacks](/en/tutorial/fastgpt-version-rollback) | tutorial |
| [Reinstall FastGPT System Tools During Upgrade](/en/deploy/fastgpt-reinstall-system-tools-upgrade) | deploy |
| [Reinstall FastGPT System Tools During Upgrade](/en/deploy/fastgpt-system-tools-reinstall) | deploy |
| [Resolved Bugs for FastGPT 4.13.0 Upgrade](/en/deploy/fastgpt-4130-bug-fixes) | deploy |
| [Resolved Bugs for FastGPT 4.14.0 Upgrade](/en/deploy/fastgpt-4140-bug-fixes) | deploy |
| [Resolved Bugs for FastGPT 4822 Upgrade](/en/deploy/fastgpt-4822-bug-fixes) | deploy |
| [Resolved FastGPT 498 Upgrade Bug Fixes](/en/deploy/fastgpt-498-upgrade-bug-fixes) | deploy |
| [Resolved Issues and Improvements for FastGPT 4823 Upgrade](/en/deploy/fastgpt-4823-upgrade-improvements) | deploy |
| [Resolved Issues in FastGPT 4.14 Upgrade Scripts](/en/deploy/fastgpt-414-upgrade-script-fixes) | deploy |
| [Resolved Issues in FastGPT 4.14.9 Upgrade](/en/deploy/fastgpt-4-14-9-bug-fixes) | deploy |
| [Resolved Issues in FastGPT v4.15.07 Upgrade](/en/deploy/fastgpt-v41507-upgrade-fixes) | deploy |
| [Run FastGPT 4.12.4 Commercial Migration Script](/en/deploy/fastgpt-4124-migration-script) | deploy |
| [Run FastGPT 4.14.0 System Tool Migration](/en/deploy/fastgpt-4140-system-tool-migration) | deploy |
| [Run FastGPT 4.8.23 Migration Script for Dataset Cleanup](/en/deploy/fastgpt-4823-migration-script) | deploy |
| [Run FastGPT 4.8.5 Upgrade Initialization Commands](/en/deploy/fastgpt-485-upgrade-initialization) | deploy |
| [Run FastGPT 4810 Administrative Initialization Tasks](/en/deploy/fastgpt-4810-admin-initialization) | deploy |
| [Run FastGPT 4822 Contact Data Migration](/en/deploy/fastgpt-4822-contact-migration) | deploy |
| [Run FastGPT Commercial Edition Initialization Steps](/en/deploy/fastgpt-commercial-edition-init-steps) | deploy |
| [Run FastGPT Post-Upgrade Initialization API Requests](/en/deploy/fastgpt-post-upgrade-init-api-requests) | deploy |
| [Run FastGPT v4.12.0 Commercial Migration Script](/en/deploy/fastgpt-commercial-4120-migration) | deploy |
| [Run FastGPT v4.8.18 Full-Text Migration Script](/en/deploy/fastgpt-v4818-fulltext-migration-script) | deploy |
| [Run FastGPT v445 Variable Node Initialization](/en/deploy/fastgpt-v445-init-api) | deploy |
| [Run FastGPT v447 Initialization API](/en/deploy/fastgpt-v447-initialization-api) | deploy |
| [Run FastGPT v451 Initialization API](/en/deploy/fastgpt-v451-initialization-api) | deploy |
| [Run Official FastGPT v4.14.5 Upgrade Script](/en/deploy/fastgpt-v4145-upgrade-script) | deploy |
| [Run Required FastGPT v46 Initialization APIs](/en/deploy/fastgpt-v46-initialization-apis) | deploy |
| [Run Required FastGPT v4815 Post-Upgrade Migration Scripts](/en/deploy/fastgpt-v4815-migration-scripts) | deploy |
| [Run the FastGPT 4.13.2 Upgrade Script](/en/deploy/fastgpt-4132-upgrade-script) | deploy |
| [Run the FastGPT 4.14.1 Upgrade Script](/en/deploy/fastgpt-4141-upgrade-script) | deploy |
| [Run the FastGPT 4.14.4 Upgrade Script](/en/deploy/fastgpt-4144-upgrade-script) | deploy |
| [Run the FastGPT 4.9.4 Upgrade Script](/en/deploy/fastgpt-494-upgrade-script) | deploy |
| [Run the FastGPT 4.90 Upgrade Script](/en/deploy/fastgpt-490-upgrade-script) | deploy |
| [Run the FastGPT 4101 Commercial Migration Script](/en/deploy/fastgpt-4101-commercial-migration-script) | deploy |
| [Run the FastGPT 4820 Configuration Migration Script](/en/deploy/fastgpt-4820-migration-script) | deploy |
| [Run the FastGPT v4.8.1 Initialization Script](/en/deploy/fastgpt-v481-initialization-script) | deploy |
| [Run the FastGPT v44 Initialization API](/en/deploy/fastgpt-v44-initialization-api) | deploy |
| [Run the FastGPT v463 Initialization API](/en/deploy/fastgpt-v463-init-api) | deploy |
| [Run the FastGPT v467 Initialization API](/en/deploy/fastgpt-v467-initialization-api) | deploy |
| [Run the Official FastGPT v4911 Upgrade Script](/en/deploy/fastgpt-v4911-upgrade-script) | deploy |
| [Run the Required FastGPT v43 Initialization API](/en/deploy/fastgpt-v43-init-api) | deploy |
| [Save and Publish FastGPT Version Snapshots](/en/tutorial/fastgpt-version-snapshot-publishing) | tutorial |
| [Set Up FastGPT Skill Initialization Scripts](/en/tutorial/fastgpt-skill-initialization-scripts) | tutorial |
| [Technical Improvements for FastGPT Self-Hosted Upgrades](/en/deploy/fastgpt-self-hosted-upgrade-improvements) | deploy |
| [Understand FastGPT Upgrade Script Core Requirements](/en/deploy/fastgpt-upgrade-script-guide) | deploy |
| [Understand FastGPT Workflow V2 Upgrade Changes](/en/deploy/fastgpt-workflow-v2-upgrade) | deploy |
| [Update FastGPT Environment Variables for 4.13.0 Upgrade](/en/deploy/fastgpt-4130-environment-variable-update) | deploy |
| [Update FastGPT System Plugins for 4.14.6 Upgrade](/en/deploy/fastgpt-plugin-update-4146) | deploy |
| [Upgrade FastGPT System Plugins for 4.14.7](/en/deploy/fastgpt-system-plugins-upgrade) | deploy |
| [Upgrade OpenSandbox to Fix Chinese File Downloads](/en/deploy/opensandbox-image-upgrade-fix-chinese-filenames) | deploy |
| [Validate Required Environment Variables for FastGPT Upgrade](/en/deploy/fastgpt-upgrade-environment-variable-check) | deploy |

## What this list does not cover

Entries cover cases that can be reproduced publicly, grouped by symptom. The following need separate confirmation:

- A symptom caused by several factors at once, which needs the order above to rule them out one by one
- The same symptom caused by configuration specific to the commercial edition
- Cases coupled to a particular infrastructure environment that cannot be reproduced in a standard deployment

## Keep reading

- [FastGPT deployment and environment issue landscape](/en/guide/deployment-issue-landscape)
- [FastGPT Environment and configuration issue list](/en/guide/environment-configuration-issues)
- [FastGPT Model serving and inference issue list](/en/guide/model-serving-issues)
- [FastGPT Workflow and nodes issue list](/en/guide/workflow-node-issues)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## If the problem is still not located

The entries above cover cases that can be reproduced from public information. If the problem depends on configuration details of a specific deployment, or needs runtime logs to confirm, contact sales for deployment-stage support; the cloud service can be used directly without handling environment dependencies.

- [Contact sales](/en/contact): support for self-hosting and upgrades
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what the cloud and self-hosted forms cover
