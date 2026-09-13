---
title: Configure FastGPT content review and rewrite workflows
slug: /en/tutorial/fastgpt-content-review-rewrite-workflow
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Configure FastGPT content review and rewrite workflows

## Pre-Workflow Planning
Before configuring individual workflow nodes, map the full end-to-end process to align with core design principles. A key best practice is to split responsibilities across multiple nodes rather than assigning multiple tasks to a single AI node. Avoid having one AI node handle rule retrieval, content classification, rewriting, and explanation generation simultaneously. This approach results in shorter, more stable prompts and simplifies future troubleshooting by isolating each workflow component’s purpose.

## Step-by-Step Workflow Configuration
Follow this structured sequence to build the content review and auto-rewrite workflow:
1.  **User Input Node**: Set as the workflow’s starting trigger, configured to accept raw content submitted for review.
2.  **Dataset Retrieval Node**: Connect to the pre-built content compliance rules dataset. Per official recommendations, set the citation limit to 1-2 entries to avoid overwhelming downstream nodes with excess context. This node retrieves relevant compliance rules to inform the content classification step.
3.  **AI Classification Node**: Combine the user-provided input content and retrieved compliance rules as context for the AI model. Configure the node to output one of three standardized classifications: Safe, Sensitive but Rewritable, or Prohibited.
4.  **Conditional Branching Node**: Define three distinct routing branches mapped directly to each classification outcome.
5.  **Safe Content Branch**: Pass the original user input directly to the final output node, with a pre-configured annotation indicating the content is approved for publication.
6.  **Sensitive Rewritable Branch**: Route the flagged content to an AI rewriting node to adjust non-compliant elements, then send the polished rewritten content to a user confirmation step before final delivery.
7.  **Prohibited Branch**: Generate a formal rejection explanation paired with targeted revision suggestions, then pass this communication to the final output node.
8.  **Final Output Node**: Consolidate and return the appropriate result: original approved text, rewritten approved text, or rejection and revision details to the end user.

## Troubleshooting with Clear Node Boundaries
With separated node responsibilities, you can quickly isolate and resolve workflow issues:
- If the dataset retrieval node fails to return relevant compliance rules, verify the citation limit setting and dataset connection configuration.
- If the AI classification node produces incorrect results, audit the context provided to the model and the classification prompt logic.
- If content fails to route to the intended branch, check the conditional branching node’s condition mappings to ensure they align with the three standard classification outputs.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
