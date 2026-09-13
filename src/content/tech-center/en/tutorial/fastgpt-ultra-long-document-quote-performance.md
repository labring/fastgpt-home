---
title: Optimize Ultra-Long Document Quote List Performance
slug: /en/tutorial/fastgpt-ultra-long-document-quote-performance
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/chat/quoteList
source_type: Official documentation
---

# Optimize Ultra-Long Document Quote List Performance

# Smart Document Performance Optimization Overview
This technical section covers the built-in performance optimizations for FastGPT quote list interactions when working with ultra-long documents containing thousands of content chunks. The optimization stack is engineered to maintain system responsiveness in real-world enterprise document workloads, addressing the common performance challenges associated with loading and rendering massive document datasets.

# Core Intelligent Loading Mechanisms
FastGPT implements a targeted loading pipeline to minimize unnecessary memory usage and latency, reducing overhead for both server and client environments. The following core optimization components are deployed:
| Optimization Component | Operational Purpose |
|------------------------|---------------------|
| Citation Relevance Ranking | Prioritizes loading content directly associated with user-requested citations |
| Database Indexing | Facilitates rapid lookup and retrieval of specific document chunks from large datasets |
| On-Demand Rendering | Restricts in-memory content loading exclusively to content the user actively accesses, rather than loading the full document set upfront |

# User Experience Consistency
The optimization pipeline ensures consistent smooth performance across all user interactions with quote lists. Whether a user jumps directly to a specific cited document section or scrolls through the full list of available citations, the system maintains responsive behavior. This eliminates performance bottlenecks that typically arise with large document datasets, allowing FastGPT to efficiently handle enterprise-scale volumes of professional content without degraded usability.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/chat/quoteList)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
