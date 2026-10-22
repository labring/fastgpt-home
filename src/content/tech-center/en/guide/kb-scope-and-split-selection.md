---
title: One Knowledge Base or Several: Collection Tags, Merged Search or Splitting by Use Case
slug: /en/guide/kb-scope-and-split-selection
page_type: Decision matrix
source_type: FastGPT v4.17.2 documentation and community threads
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/dataset_search
source_note: "Criteria taken from the FastGPT v4.17.2 documentation and community threads, verified 2026-10-13."
check_day: 2026-10-13
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A technical decision guide for enterprise AI platform buyers: choose between single knowledge base with tags, merged multi-base search, or use case-split independent knowledge bases, covering criteria, switching costs, and timing.
date_published: 2026-10-14
date_modified: 2026-10-14
---

# One Knowledge Base or Several: Collection Tags, Merged Search or Splitting by Use Case

## When this decision has to be made
You must make this decision when the number of collections in your enterprise knowledge base exceeds the threshold for manual management, or when your business requires multi-scenario data isolation and permission control, or when global search is disrupted by irrelevant content.
Moving too early on this choice increases initial configuration costs and wastes simplified deployment logic you have already set up. Moving too late leads to steadily declining search accuracy, unregulated data permissions, data confusion during team collaboration, sharply increased troubleshooting time, and slower business response speeds.
You also need to plan this selection in advance when workflow scenarios require cross-knowledge-base search or scenario-based data filtering, to avoid extra costs from later process restructuring. When cross-contamination occurs across data shared by multiple teams in a single knowledge base, adjust your selection promptly to ensure each team’s data access complies with business rules.

## Criteria matrix
| Candidate Solution | Retrieval Filtering Capability | Data Permission Isolation Capability | Workflow Adaptability | Multimodal Retrieval Adaptability | Operation and Maintenance Cost | Cross-scenario Data Sharing Capability |
| ------------------------------ | ---------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------- | ---------------- | ------------ | ------------------ |
| Single Knowledge Base + Collection Tags | Supports configuring tag conditions via the `collection filter` parameter, supports `$and`/`$or` logic, can filter collections without set tags; only available in commercial edition | Only supports collection-level filtering; cannot isolate across knowledge bases | Configure the `collection filter` to filter by tags during knowledge base search; the specific configuration method for workflow nodes is not stated in the documentation; verify in your environment | Image retrieval performance depends on whether the knowledge base has a visual model and image-compatible vector model configured | Moderate; tag management costs rise as the number of collections increases | A single collection can be assigned multiple tags, supporting data reuse across scenarios without reimporting |
| Multi-Knowledge Base Merged Search | You can select multiple knowledge bases with the same vector model in a knowledge base search node; merge results from multiple search nodes using the `Knowledge Base Search Reference Merge` node, reorder with RRF and support maximum tokens filtering | Each knowledge base configures collaborators independently; authentication rules for cross-base retrieval are not stated in the documentation; verify in your environment | Supports using multiple knowledge base search nodes in workflows, paired with a knowledge base search merge node to combine results | A single search node can only select knowledge bases with the same vector model; image retrieval performance depends on the visual model and vector model configuration of each base | Low; no extra tag management needed; manage directly by knowledge base dimension | You can share data across multiple knowledge bases, but you must configure the corresponding knowledge base list for each scenario |
| Split into Independent Knowledge Bases by Use Case | Each knowledge base is an independent search unit; you must specify the target knowledge base during search; no automatic cross-base merging capability | Each knowledge base configures permissions independently; you can assign access permissions by scenario | Supports selecting a single knowledge base for retrieval directly in workflows, or merging results from multiple independent bases via a merge node | Image retrieval performance depends on whether each knowledge base has a visual model and image-compatible vector model configured | High; you must repeat configuration of chunking, models, permissions and other parameters for each base | Data cannot be reused across bases; you must import the same data into multiple knowledge bases to share it |

## Why each criterion matters
Retrieval filtering capability directly impacts answer accuracy. Insufficient filtering pulls in irrelevant content, leading off-target responses. For example, a customer service workflow only needs after-sales content, but without proper filtering, pre-sales materials will appear in results and mislead users. Single knowledge base with tags uses tag conditions to deliver precise filtering. Multi-knowledge base merged search relies on merge node logic to refine results. Split-by-use-case bases let you search directly by target base, eliminating the need for extra filtering steps.
Data permission isolation prevents unauthorized access to sensitive data. For example, if a shared knowledge base holds HR salary documents, the marketing team could accidentally retrieve them without proper isolation. Single knowledge base with tags only supports collection-level filtering, which cannot block cross-base access. Multi-knowledge base merged search and split-by-use-case bases let you configure permissions independently for each base, ensuring compliance with data access rules.
Workflow adaptability ensures your automated processes run smoothly. Poor adaptability breaks critical workflows, such as a content review pipeline that needs to search a compliance-focused knowledge base before classifying content. All three options support workflow integration, but their implementation differs: single base with tags requires filter parameters, multi-base merged search needs a merge node to combine results, and split bases let you select the target base directly without extra setup.
Operation and maintenance costs directly affect your team’s workload. As the number of collections grows, single base with tags requires ongoing maintenance of tag-collection associations, which becomes increasingly time-consuming. Split-by-use-case bases force you to repeat configuration for chunking, models, and permissions for every new base, adding significant work. Multi-knowledge base merged search avoids these issues, but you still need to maintain multiple bases. Choosing the right option reduces maintenance overhead and boosts team efficiency.
Cross-scenario data sharing eliminates redundant data imports and storage waste. For example, product documentation used in both customer service and employee training only needs to be imported once if you use a single base with multiple tags. Without cross-scenario sharing, you must reimport the same data into multiple bases, increasing storage costs and resource usage. Single base with tags supports this reuse, while multi-base merged search and split bases require repeated imports for shared data.

## The cost of switching later
Switching from one solution to another carries costs including data migration, index rebuilding, configuration adjustments, and validation checks.
If you switch from a single knowledge base with tags to split-by-use-case bases, official documentation does not provide guidance for cross-knowledge-base collection migration. Most often, you will need to reimport files into new knowledge bases and redo chunking and indexing. You must first test this process in a staging environment to avoid disruptions to production. During migration, verify the search accuracy and permission configuration for each new base to ensure full data integrity.
If you switch from split-by-use-case bases to a single knowledge base with tags, you must merge all data from multiple bases into one central base, reconfigure collection tags, adjust retrieval parameters in workflow nodes, and validate that the merged retrieval logic matches your business requirements.
If you switch from multi-knowledge base merged search to another solution, you must adjust the configuration of merge nodes in your workflows, rework your retrieval logic, and verify the sorting and filtering of merged results.
Before and after any migration, compare search results against your business questions one by one to confirm the retrieval range meets your expectations.

## When this decision can wait
You can delay this decision in several scenarios:
When the number of collections in your knowledge base is small, a single base meets all management and search needs without extra tag configuration or splitting.
When your business uses only a single scenario, with no need for cross-scenario data isolation or filtering, you can defer this choice.
If your team has not deployed the commercial edition of the platform, you cannot use collection tags, so you can wait until the commercial feature launches or your business scales up before making this decision.
If your business has low requirements for search accuracy, and global search suffices for your needs, you can hold off on this decision.
Even so, you should regularly evaluate the size of your knowledge base and your evolving business needs, to avoid facing sharply increased migration costs as your business grows.

## Keep reading

- [Where Custom Code Runs: the Code Node or the Agent VM, and Which Sandbox Backs the VM](/guide/code-execution-environment-selection)
- [Knowledge Base Permissions: Team Roles, Dataset Collaborators or Collection-Level Access](/guide/dataset-permission-granularity)

## References

- [Collection tags](https://doc.fastgpt.cn/en/guide/dataset/collection_tags)
- [Knowledge base search node](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/dataset_search)
- [Knowledge base search result merge](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/knowledge_base_search_merge)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
