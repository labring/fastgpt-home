---
title: Manage and Filter Dataset Collections With Tags
slug: /en/tutorial/fastgpt-dataset-collection-tags
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/dataset/collection_tags
source_type: Official documentation
---

# Manage and Filter Dataset Collections With Tags

## What Are Dataset Collection Tags
Dataset Collection Tags is a commercial-exclusive feature within FastGPT. This tool enables users to tag and categorize individual data collections stored in a Dataset, supporting more organized and efficient data management. Additionally, these tags can be used as filters during Dataset-wide searches to return only precise, matching results. Three reference screenshots showcase core feature workflows: initial tag assignment, bulk tag adjustments, and the tag-based search filter interface.
![Collection Tag Management 1](/imgs/collection-tags-1.png)
![Collection Tag Management 2](/imgs/collection-tags-2.png)
![Tag-Based Search Filter](/imgs/collection-tags-3.png)

## Core Functional Details
This feature is limited to FastGPT’s commercial edition, and operates exclusively within the Dataset module. All assigned tags are linked directly to their parent data collections, and can be modified or removed at any time without altering the original source data. When used as a search filter, tags will narrow results to only those collections explicitly marked with the selected tag, reducing irrelevant results and accelerating data lookup.

## Step-by-Step Usage Workflow
1. Navigate to the target Dataset in your FastGPT commercial workspace.
2. Access the collection management view, where you can select single or multiple data collections to apply tags to.
3. Use the integrated tag tool to assign existing tags or create new custom tags for the selected collections (as demonstrated in the first two reference screenshots).
4. To filter collections by tag, open the Dataset search interface, activate the tag filter dropdown, and select the desired tag to narrow results to matching collections (as shown in the third reference screenshot).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/dataset/collection_tags)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
