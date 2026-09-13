---
title: Remove Legacy Worker Concurrency Settings for FastGPT 4.16.2
slug: /en/deploy/fastgpt-4162-remove-worker-concurrency-settings
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162
source_type: 官方文档
---

# Remove Legacy Worker Concurrency Settings for FastGPT 4.16.2

## Overview of Deprecated Worker Variables
FastGPT version 4.16.2 removes four fixed worker concurrency and memory limit environment variables. No replacement variables are provided for these deprecated settings. The affected variables are `PARSE_FILE_WORKERS`, `PARSE_FILE_WORKER_MEMORY_LIMIT_MB`, `HTML_TO_MARKDOWN_WORKERS`, and `TEXT_TO_CHUNKS_WORKERS`. Users must delete these variables and their associated values from either their standalone `.env` configuration file or the `environment` section of their Docker Compose deployment file prior to upgrading to 4.16.2.

## Automatic Worker Resource Allocation
FastGPT now uses dynamic, system-aware worker scheduling in place of fixed configuration values. For file parsing workers, concurrency is determined by Node.js’s detected CPU parallelism, which accounts for container CPU quotas and process affinity, with a minimum of one worker allocated. A memory-aware scheduler further adjusts concurrent task counts, and the maximum uncompressed size of an XLSX file is calculated dynamically using per-file parsing memory estimates, eliminating the fixed V8 old-generation memory limit.

For HTML-to-Markdown and text-chunking workers, the concurrency hard limit is the smaller of the available CPU parallelism and 5. Prior to starting any task, FastGPT checks for available memory outside the system safety reserve. If sufficient memory is not available, the task is placed in a queue. After a task completes, FastGPT retries immediately, and checks every 30 seconds if memory remains insufficient, with a maximum queue duration of 30 minutes. Idle workers are reclaimed after 60 seconds, with a maximum of one worker retained long-term.

## Step-by-Step Configuration Update
Follow these steps to remove deprecated worker settings:
1. Locate your FastGPT deployment’s configuration file:
   - For standalone installations: Use the `.env` file in your FastGPT root directory.
   - For Docker Compose deployments: Edit your `docker-compose.yml` file.
2. Search the configuration file for the four deprecated environment variables listed in the overview section.
3. Delete each matching variable and its assigned value from the file.
4. Save the modified configuration file, then restart your FastGPT services to apply the changes.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162)
