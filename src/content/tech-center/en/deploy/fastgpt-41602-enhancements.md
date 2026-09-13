---
title: Detailed Technical Improvements for FastGPT 4.16.02
slug: /en/deploy/fastgpt-41602-enhancements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41602
source_type: 官方文档
---

# Detailed Technical Improvements for FastGPT 4.16.02

## Publish Channels Page Redesign
The Publish Channels page has been fully redesigned to improve usability. The interface now organizes all configured channels into two distinct, visually separated groups: native FastGPT channels and third-party external channels. Each channel listing includes a prominent count of active configured connections, allowing administrators to quickly assess deployment coverage without navigating to individual channel settings.

## Tool Marketplace Batch Update Enhancements
Batch update operations in the Tool Marketplace have undergone targeted usability and reliability improvements. Prior to this release, partially failed batch updates would hide affected tools, making troubleshooting difficult. Now, any tools that fail to update remain visible in the marketplace interface. Users can initiate individual retries for failed updates, or uninstall problematic tools separately without affecting successfully updated tools. The interface also displays installed tool versions and update statuses with greater clarity, eliminating confusion during routine maintenance tasks.

## Portal Quick App Configuration Limits
FastGPT 4.16.02 enforces a new limit for portal quick apps, with a maximum of 3 active apps per portal. To avoid disrupting existing deployments, the update preserves full compatibility with any pre-existing portal quick app configurations that exceed the 3-app limit. A reference table for this configuration is below:
| Configuration Category | Current Limit | Compatibility Safeguard |
|------------------------|---------------|--------------------------|
| Portal quick apps      | 3 total       | Existing over-limit configurations remain fully functional |

## PDF Processing Edge Cropping Update
The PDF document parsing pipeline has been updated to improve content preservation. Previous versions used a fixed edge cropping method that occasionally truncated valid content located near the edges of a page. This release replaces fixed edge cropping with dynamic edge detection, which automatically analyzes each page to identify and retain all valid content, preventing accidental removal of boundary-adjacent text, images, or other elements.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41602)
