---
title: Building an Evaluation Set for Enterprise Open-Source AI Platforms: Pre-Launch Samples, Post-Launch Regression, and Scoring
slug: /en/guide/answer-evaluation-set
page_type: Deep-dive guide
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Build a fixed RAG evaluation set with target passages, negative samples, repeatable regression runs, and scoring rules for answer quality.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Building an Evaluation Set for Enterprise Open-Source AI Platforms: Pre-Launch Samples, Post-Launch Regression, and Scoring | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 深度内容-英文版/answer-evaluation-set-EN-V1.0-20260914.md
source_sha256: 51bacab34480aaa8e6cd847601cc02bf06c888e2dc95867f4bb16b87d6b9d316
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository, verified 2026-09-14.
---

# Building an Evaluation Set for Enterprise Open-Source AI Platforms: Pre-Launch Samples, Post-Launch Regression, and Scoring

## When this becomes a decision
You need to build a formal evaluation set when your enterprise-grade RAG knowledge base system enters stable operation. Temporary ad-hoc tests and subjective feedback no longer work to judge answer quality. As you update the knowledge base, upgrade retrieval model versions, or expand business scenarios, inconsistent judgment standards across teams make it impossible to quantify whether the system is improving or declining.

When you receive batch user feedback about incorrect answers or abnormal retrieval fluctuations, troubleshooting becomes blind without a fixed reference sample set. For example, if retrieval misses fragments or relevance filtering fails, you cannot tell if the issue comes from configuration changes, model fluctuations, or knowledge base updates with one-off random tests.

You also need this evaluation set when comparing system versions, verifying configuration adjustment impacts, or validating multi-turn dialogue workflows. Without a unified test set, you only have scattered test results and cannot make data-driven decisions. Multi-turn dialogue workflows require consistent sample validation to avoid fluctuating user experiences, making evaluation set construction a mandatory task.

## What to settle first
| Criterion | What to set | Basis |
| --- | --- | --- |
| Knowledge Base Recall Accuracy | Set a threshold for the proportion of target fragments recalled based on actual scenarios | Structured documents uploaded to the knowledge base may have inaccurate retrieval; you need to clarify the match rate between recalled content and expected fragments |
| Minimum Relevance Filtering Effectiveness | Ensure results below the configured threshold are not returned, and follow preset empty search response rules | The minimum relevance setting may fail in some cases; you need to ensure retrieval filtering logic aligns with configuration |
| Reranking Model Output Consistency | Ensure reranked results and their relevance scores align with the model’s return logic | The reranking model may return empty results or time out; you need to ensure the reranking workflow is stable |
| Retrieval Result Completeness | Measure recall against labeled relevant passages and record returned counts and retrieval-length limits | Full-text retrieval may have sorting anomalies or miss target content; you need to ensure retrieval coverage is sufficient |
| Workflow Node Stability | Fix the data, query, and configuration; compare retrieval stability against an agreed tolerance | Retrieval node results in the workflow may be inconsistent or configuration tampered with; you need to ensure consistent multi-turn execution |
| Empty Search Trigger Correctness | Trigger preset empty response content when no relevant results are found | Empty search responses may fail to trigger; you need to ensure compliant responses in abnormal scenarios |

These criteria should be adjusted based on business priorities. Knowledge base recall accuracy and empty search trigger correctness are core indicators that directly determine basic answer accuracy, so they are priority validation items for all scenarios. Minimum relevance filtering effectiveness ensures compliance of retrieval results, avoiding low-relevance content interfering with final answers, and is suitable for scenarios with high content rigor requirements. Reranking model output consistency and retrieval result completeness are supplementary indicators to optimize retrieval effects, improving relevance and coverage of recall results, suitable for scenarios requiring refined retrieval. Workflow node stability targets multi-turn dialogue and automated deployment scenarios, ensuring consistent long-term system operation. Different business scenarios can adjust priority: for internal knowledge bases with high compliance requirements, prioritize minimum relevance filtering effectiveness; for public knowledge bases with wide content coverage, prioritize retrieval result completeness.

## How to do it

Fix the knowledge base snapshot, retrieval mode, model, and parameters before comparing results. Score meaning and filtering behavior vary with the retrieval mode and reranking settings; calibrate each configuration separately. Handle empty retrieval results through an explicitly configured workflow branch.
For pre-launch evaluation set construction, extract fixed, multi-scenario samples from your existing knowledge base. First sort out sample sources: structured question-answer pair documents (in format `dataId,q,a,index1,index2`), unstructured document chunk fragments, and negative samples (queries unrelated to knowledge base content). Label clear expected results for each sample, including target fragment IDs to recall, preset minimum relevance thresholds, and expected reranked sorting results. Organize samples into standardized formats like JSON or CSV, and lock in sample content and metadata: associated knowledge base ID, retrieval mode, reranking model configuration, empty search response rules, etc. Use the exact same sample set for every test to avoid result bias from sample differences.

For post-launch regression testing, build an automated execution workflow. First write automated test scripts that call the knowledge base retrieval interface, iterate over every query in the evaluation set, and capture returned recall fragments, relevance scores, and reranked results. The script should log each test’s execution status, and differences between returned and expected results. Compare test results against preset criteria: check if recall fragments include target IDs, if relevance scores meet thresholds, and if reranked results match expected order. For abnormal scenarios like vector database call errors or reranking model timeouts, the script should log error types and frequency, and generate reports with detailed test data. Run regression tests regularly: immediately after knowledge base updates, model upgrades, or system configuration changes, to ensure post-change system quality meets expectations.

For scoring framework implementation, adjust weights based on business needs. First assign sub-scores to each evaluation sample: for example, full points for correct recall, correct relevance filtering, correct reranked results, and correct empty search trigger. Aggregate sub-scores for each sample to calculate overall metrics like accuracy and consistency rate. Add deduction items for abnormal scenarios like failed minimum relevance filtering or empty reranking model results in the scoring rules to ensure accurate identification of issues. Regularly update the evaluation set: add new document fragments to the sample set after the knowledge base adds documents, to ensure the evaluation set covers the latest knowledge base content. Also adjust scoring weights based on business needs: for example, increase the weight of knowledge base recall accuracy for customer service scenarios, or increase the weight of workflow node stability for automated office scenarios.

## How to verify
1. Verify evaluation set loading completeness: Import the locked evaluation set file, confirm all sample query content, expected results, and associated metadata are fully loaded with no missing fields.
2. Verify basic retrieval functionality: Randomly select a percentage of semantic retrieval samples, confirm returned recall fragments include expected target content, and relevance scores match configured thresholds.
3. Verify relevance filtering functionality: Select samples that include low-relevance recall results, confirm results below the configured threshold are not returned, and preset empty search response content is triggered.
4. Verify reranking function stability: Run multiple consecutive reranking tests on the same sample, compare returned rankings and scores with the agreed stability range and record errors and variation.
5. Verify workflow node consistency: Add a knowledge base retrieval node to your workflow, run the same query multiple times, record returned passages and scores and compare them with the agreed stability range.
6. Verify abnormal scenario handling: Select negative samples unrelated to the knowledge base, confirm preset empty search responses are triggered with no irrelevant recall content.
7. Verify automated test script correctness: Run the full automated test script, confirm all test items complete without execution errors, and the generated test report includes complete test data and result comparison records.

## Limits: when this approach does not hold
This evaluation set approach has clear boundaries. It does not work when you add new retrieval modes not covered by existing samples, such as multimodal knowledge base retrieval or image-to-image search. Existing samples do not include queries or expected results for these new features, so you cannot effectively validate their quality.

It also fails when you perform major upgrades to models or retrieval components, such as switching embedding models or reranking models. The original evaluation set’s scoring standards may no longer fit the new model’s output logic, requiring you to adjust criteria and sample expected results.

The approach is invalid when business scenarios change drastically, such as switching from an internal professional knowledge base to an external third-party one. Original sample expected results no longer meet new business needs, so you cannot accurately assess system quality.

It cannot cover distributed load balancing deployment scenarios, where different instances have varying model or retrieval component configurations, leading to inconsistent reranked or recall results. The existing evaluation set cannot validate stability in this scenario.

Additionally, if the evaluation set has insufficient sample size to cover all business scenarios—for example, too few samples for industry-specific professional documents—test results will lack representativeness. Finally, this evaluation set cannot directly troubleshoot infrastructure-level issues, such as vector database restarts or API call timeouts. You will need to combine infrastructure monitoring tools for these checks.

## Keep reading

- [Decision Guide for Human Handoff in Open-Source Enterprise AI Platforms](/en/guide/human-handoff-design)
- [Decision Guide: What Data Should Not Enter Your Enterprise AI Knowledge Base](/en/guide/data-boundary-and-masking)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- [Contact sales](/en/contact): apply this process to your deployment
- [Get started](/en/start): validate the process on the cloud service
- [Pricing](/en/price): compare what each form covers
