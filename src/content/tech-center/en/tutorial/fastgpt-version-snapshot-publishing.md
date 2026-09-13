---
title: Save and Publish FastGPT Version Snapshots
slug: /en/tutorial/fastgpt-version-snapshot-publishing
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/build/skill/version
source_type: 官方文档
---

# Save and Publish FastGPT Version Snapshots

## Introduction to FastGPT Version Snapshots
FastGPT enables users to preserve verified application states as official version snapshots, supporting consistent deployment and rollback of tested configurations. This process packages your current project setup into an immutable official release.

## Step-by-Step Publishing Workflow
Follow these structured steps to create and publish a version snapshot:
1. After completing successful testing of your application, click the **Publish** button located in the top-right corner of the FastGPT editor interface.
2. In the displayed modal dialog, enter a **Version Name**. The system pre-fills this field with the current timestamp by default, but users may input custom identifiers such as `v1.0.0` for clearer version tracking.
3. Confirm the dialog to finalize the publishing process. The system will solidify your current project state as an official version once completed.

## Publishing Ignore Rules and Size Constraints
During the publishing workflow, the system automatically applies ignore rules defined in the `.gitignore` file stored at the project root directory. If no `.gitignore` file exists, the system will generate a default file that excludes common non-essential directories including `node_modules`, `.venv`, and `dist`. Only files not excluded by these ignore rules will be included in the packaged version snapshot. Users must ensure the total combined size of these unignored files does not exceed the platform’s specified limit; exceeding this limit will result in a failed publishing attempt.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/skill/version)
