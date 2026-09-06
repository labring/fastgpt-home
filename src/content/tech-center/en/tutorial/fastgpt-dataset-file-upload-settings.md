---
title: Configure FastGPT Dataset and File Upload Settings
slug: /en/tutorial/fastgpt-dataset-file-upload-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/agentv2/settings
source_type: Official documentation
---

# Configure FastGPT Dataset and File Upload Settings

## Dataset Configuration
This section enables linking dedicated corporate documents to your FastGPT agent, fine-tuning retrieval optimization behaviors, and managing granular team member access permissions for linked datasets. All configurations directly impact how the agent retrieves and uses stored corporate content during interactions. Key configurable options include:
- Associating approved internal corporate documents with the agent to define the agent’s knowledge base
- Tuning core retrieval settings: enabling or disabling hybrid search, and toggling reranking functionality to refine search result relevance
- Configuring team member permissions to control which team members can view, edit, or use the linked dataset resources

## File Uploads Configuration
This section controls end-user file upload functionality for deployed FastGPT agents. Administrators can toggle the feature on or off, and specify permitted file categories including images, audio, video, or custom file extensions. The set of supported file types automatically adapts based on the multimodal feature set of the large language model (LLM) selected for the agent, ensuring compatibility with the model’s processing capabilities. For detailed guidance on advanced file input configurations, refer to the linked [File Input](../general/fileInput) documentation.

## Step-by-Step Configuration Workflow
Follow this workflow to apply dataset and file upload settings for your Agent V2 instance:
1. Access the Agent V2 settings dashboard for your target agent deployment.
2. Navigate to the Dataset & File Uploads configuration subsection.
3. Complete dataset configuration:
   a. Select and associate the desired corporate documents to build the agent’s custom knowledge base
   b. Adjust retrieval optimization settings: enable hybrid search to combine multiple retrieval methods, toggle reranking to improve result ranking, or disable these features as needed
   c. Set team member permissions to define access levels for the linked dataset, ensuring only authorized team members can interact with the stored content
4. Complete file uploads configuration:
   a. Toggle the end-user file upload switch to enable or disable the feature for end-users
   b. Specify allowed file types: choose from images, audio, video, or define custom file extensions to permit
   c. Verify that the selected file types align with the multimodal capabilities of the agent’s configured LLM, as unsupported file types will not be processed
5. Save all changes to finalize the configuration updates.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/agentv2/settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
