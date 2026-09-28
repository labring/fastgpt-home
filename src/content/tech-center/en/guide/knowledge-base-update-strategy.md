---
title: Updating a Knowledge Base: Full Rebuild, Incremental Append or Scheduled Sync
slug: /en/guide/knowledge-base-update-strategy
page_type: Decision matrix
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Choose full rebuilds, incremental updates, or scheduled sync for a FastGPT knowledge base, with checks for freshness and retrieval quality.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Updating a Knowledge Base: Full Rebuild, Incremental Append or Scheduled Sync | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 决策矩阵页-第2批/英文-fastgpt.io/guide/knowledge-base-update-strategy.md
source_sha256: 0b61b7ad78a1f24f25c8230444ce8cec273c2bf57d3bf286fb8fa56099df4905
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository and community threads, verified 2026-09-14.
---

# Updating a Knowledge Base: Full Rebuild, Incremental Append or Scheduled Sync

## When this decision has to be made
You must make this decision when your knowledge base data scale grows to require regular maintenance, external data sources need synchronized updates, or your vector model or parsing scheme changes.
Performing updates too early wastes system resources on small datasets. For example, a full rebuild with small batch data uses unnecessary CPU and storage resources.
Performing updates too late causes knowledge base content to become outdated. This reduces retrieval result accuracy, harms AI response quality, impacts business decisions, and may introduce compliance risks.
Review API paths and parameters when upgrading. The v4.9.0 migration replaces `/api/core/dataset/collection/create/file` with `/api/core/dataset/collection/create/localFile`. Configure `trainingType` according to the selected API schema, for example `chunk` or `qa`.
Version 4.8.1 adds a knowledge base rebuild feature that lets you reselect a vector model. You must run the corresponding update operation when using this function.
Choose your update timing based on your data scale, business requirements, and system environment.

## Criteria matrix

Append and rebuild describe processing scope; scheduled sync describes a trigger and can be combined with either approach. Validate how additions, modifications, and deletions are handled.
| Candidate | Data Update Trigger Method | Historical Data Validity Requirement | System Resource Usage Level | Supported Data Source Types | Index Rebuild Requirement | API Compatibility Adaptation Requirement | Single Operation Duration |
|------------------------|--------------------------------------|--------------------|------------------|----------------------------------------------------------------------------------|----------------------------------|----------------------------------------------------------------------------------|----------------------------------|
| Full Rebuild Knowledge Base | Rebuild data and indexes within the selected scope | Validate consistency with the target source | Varies with scale, parsing, and embedding work | Local files and API imports; configure training and index parameters from the selected schema | Rebuild indexes within the selected scope | Migrate `/api/core/dataset/collection/create/file` to `/api/core/dataset/collection/create/localFile` | Measure against data volume and model throughput |
| Incremental Append Update | Process additions; update or replace the corresponding collections or chunks for changed content | Validate additions and removal of obsolete content | Varies with change volume and processing mode | Local files and API imports with version-appropriate parameters | Index additions; handle changed content through the selected update implementation | Adapt fields to the selected API schema | Measure against changes and model throughput |
| Scheduled Sync Update | Trigger source synchronization on a schedule | Validate addition, modification, and deletion coverage | Varies with changes, scope, and processing mode | Supported external libraries, API file libraries, and site sources; validate version-specific parameters | Determined by the sync strategy and change scope | Configure sync and training parameters for the source interface | Measure against sync scope and processing stages |

## Why each criterion matters
Choose both processing scope and trigger frequency. Full rebuild regenerates indexes within the target scope. Incremental append handles additions; modifications and deletions require corresponding update operations. A scheduled task can trigger the selected synchronization strategy.
For compliance-focused and core business knowledge bases, validate source consistency and retrieval results, including coverage of additions, modifications, and deletions. Select the update strategy according to those requirements.
Resource use depends on dataset size, the proportion changed, parsing, and embedding work. Scheduled execution still requires capacity assessment. Measure resource use and duration under the intended workload.
Connect local uploads, API imports, and external data sources using their supported integration methods. Scheduling is one option for triggering supported synchronization operations.
Index rebuild requirements determine the complexity of your update operation. Changing your vector model needs a full index rebuild. Adding new data only requires incremental index generation.
For API upgrades, verify complete endpoint paths and supported parameters. Configure fields such as `trainingType` from the selected schema and test the updated synchronization calls.
You must estimate single operation duration ahead of time to prevent timeouts that disrupt business operations.

## The cost of switching later
Switching from your chosen update scheme to another carries costs for data migration, index adjustment, and system adaptation.
When moving from full rebuild to append, validate index creation for new data and preservation of existing data. For changed content, verify replacement and cleanup of the corresponding collections or chunks. Review deduplication and API parameters for the chosen implementation.
When moving to full rebuild, back up first and use the system’s rebuild procedure for the selected scope. Validate retrieval results and recovery, then schedule any required window according to the actual rebuild and cutover method.
Coordinate scheduled tasks by pausing or adjusting them during rebuilds to prevent duplicate processing. Validate how source conflicts, updates, and deletions are resolved.
If the strategy change also includes upgrading to v4.16.2, remove legacy settings such as `PARSE_FILE_WORKERS` according to that release’s requirements.
Validate additions, modifications, deletions, repeated synchronization, and recovery from interrupted or failed operations.

## When this decision can wait
You can delay making this decision if your knowledge base has a small dataset and very low update frequency, with only occasional small volumes of new data added. In this case, you can use manual file uploads or simple API calls to complete updates without building a complex update strategy.
You do not need to invest resources in a formal update strategy if your business has low requirements for retrieval accuracy, and the knowledge base is only used for internal testing or non-core scenarios.
You can temporarily use a simple full rebuild approach if you have not yet finalized your chosen vector model or data source type. Adjust your update strategy once you confirm your core configuration settings.
During testing, measure resource use and duration on representative data. Before production launch, confirm freshness requirements, modification and deletion handling, and failure recovery.
Keep existing synchronization logic while its interfaces remain supported by the deployed version, and validate new paths and fields before a planned upgrade.

## Keep reading

- [Releasing and Regression-Testing an App: Versions, Canary and Rollback](/en/guide/app-release-and-regression)
- [Where Files Live: Local Volumes, Object Storage and External S3](/en/guide/file-storage-selection)

## References

- [FastGPT v4.9.0 local file API migration](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/self-host/upgrading/outdated/490.mdx)
- [Dataset training mode enum](https://github.com/labring/FastGPT/blob/v4.17.0/packages/global/core/dataset/constants.ts)
- [Dataset collection API schema](https://github.com/labring/FastGPT/blob/v4.17.0/packages/global/openapi/core/dataset/collection/api.ts)
- [Changed collection replacement behavior](https://github.com/labring/FastGPT/blob/v4.17.0/packages/service/core/dataset/collection/utils.ts)
- [FastGPT v4.16.2 parsing Worker configuration changes](https://github.com/labring/FastGPT/releases/tag/v4.16.2)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
