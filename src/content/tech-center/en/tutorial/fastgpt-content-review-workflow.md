---
title: Build FastGPT Content Compliance Review Workflow
slug: /en/tutorial/fastgpt-content-review-workflow
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Build FastGPT Content Compliance Review Workflow

## Workflow Setup and Opening Prompt
Navigate to the FastGPT workflow homepage, click "New Workflow", and name the workflow `Content Review and Automatic Rewriting`. Enter the workflow editing page after creation. Configure the system opening message in workflow settings using this exact prompt:
```md
Hello! I am the Content Compliance Review Assistant 🛡️

Please send me the content you need reviewed, and I will automatically judge it according to the rules:

- **✅ Safe** — Content has no sensitive information and can be published directly
- **⚠️ Sensitive but Rewritable** — Contains correctable wording; I will rewrite it and send it back for your confirmation
- **🚫 Prohibited** — Contains red-line content and is rejected with an explanation

Supports single text review or batch submission (multiple items separated by line breaks).

**Let's get started.**
```

## Core Workflow Node Configuration
1.  **Dataset Retrieval Node**: Add a Dataset retrieval node, select your pre-created content compliance rules database. Set the node input to use the user's submitted content, and reference the output for subsequent AI processing. The node retrieves relevant rule fragments instead of loading the full rule base; start with a citation limit of 1-2 entries to keep context focused, and increase for larger, more detailed rule bases.
2.  **Content Review AI Node**: Add an AI Chat node and rename it "Content Review Node". Use this system prompt for classification:
    ```md
    You are a content compliance review expert. Based on the compliance rules retrieved from the Dataset, determine the compliance level of the user's input content.

    Classification criteria:

    - Safe: Content has no sensitive information and can be published directly
    - Sensitive but Rewritable: Contains correctable sensitive wording; can be published after rewriting
    - Prohibited: Contains red-line content and cannot be published

    Output format:
    Output only one of three labels: Safe / Sensitive but Rewritable / Prohibited
    ```
    Ensure the node uses the pre-selected compliance rules dataset. For demo use, restrict output to the three fixed labels; for production integration, switch to structured output to return classification, reasoning, and matched rules for downstream processing and logging.
3.  **Decision Node**: Add a decision node to branch workflow execution based on the three classification labels from the review node. Stable upstream output simplifies configuration; if the review node includes extra explanatory text, matching conditions may fail.

## Testing and Output Tuning
Run the Content Review Node individually via the top-right "Run" button, testing with three content types: a standard event announcement, marketing copy with absolute language, and clearly prohibited text. Verify classifications match expected results, and adjust the rule base wording or review prompt if classifications are unstable. To hide intermediate node output for end users, click the settings button on the right side of the Content Review Node and adjust basic display settings.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
