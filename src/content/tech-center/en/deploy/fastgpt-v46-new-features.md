---
title: Detailed Breakdown of FastGPT V4.6 New Features
slug: /en/deploy/fastgpt-v46-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46
source_type: 官方文档
---

# Detailed Breakdown of FastGPT V4.6 New Features

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Core New Functional Capabilities
This release introduces three foundational new features for self-hosted FastGPT deployments. First, native team management tools are now fully supported, enabling organized collaborative workspaces and role-based access controls for multi-user teams. Second, multi-vector support allows mapping multiple distinct vector embeddings to a single dataset, letting users combine different embedding models or chunking strategies to tailor retrieval context to specific use cases. Third, integrated text-to-speech (TTS) functionality converts generated chat responses to audio, expanding platform accessibility for users with visual or auditory accessibility needs.

## Dataset & Retrieval Optimization
Two key updates enhance dataset management and information retrieval accuracy. Administrators can now configure custom text preprocessing models directly within dataset settings, allowing automated cleaning, formatting, and chunking of uploaded documents prior to embedding. For online FastGPT environments, a new ReRank vector recall module is available to improve retrieval accuracy by reordering retrieved document chunks based on semantic alignment with the user’s query, ensuring more relevant context is passed to the LLM.

## Step-by-Step Dataset Preconfiguration
To set up custom text preprocessing for a dataset, follow these steps:
1. Navigate to the Datasets management page in your FastGPT workspace.
2. Select an existing dataset or create a new dataset via the creation workflow.
3. Locate the Text Preprocessing configuration panel within the dataset settings.
4. Select your preferred preprocessing model from the available options.
5. Save the settings to apply the configured preprocessing to all future document uploads.

## Improved User Experience Workflows
The dataset export workflow has been updated to use streaming downloads instead of a static loading spinner. This change provides real-time progress visibility during export, eliminates delayed download initiation for large datasets, and reduces user perceived wait time by providing immediate feedback on export status.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/46)
