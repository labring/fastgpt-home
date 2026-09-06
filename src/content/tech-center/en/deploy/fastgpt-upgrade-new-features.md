---
title: FastGPT 498 Upgrade New Feature Breakdown
slug: /en/deploy/fastgpt-upgrade-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/498
source_type: 官方文档
---

# FastGPT 498 Upgrade New Feature Breakdown

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Parallel Tooling & Model Compatibility Updates
This update introduces support for parallel tool call execution. All built-in platform tasks have been transitioned from non-stream mode to stream mode by default, to resolve compatibility issues with models that do not support non-stream response formats. To override this default setting for a specific model, add the `stream=false` parameter to the model’s `Extra Body` configuration field.

## Security & Authentication Improvements
Two security-focused updates are included for user access control. First, password expiration is now a configurable system setting: once a user’s password reaches its configured expiration period, they will be required to change their password during their next login. Second, the password login flow has been updated to include preLogin temporary key verification, adding an additional validation step to authenticate incoming login requests.

## Dataset & Administrative Configuration Updates
Three key integration and admin panel updates are deployed. Official Qwen3 model presets are now available for quick setup within the platform. The Yuque Dataset integration now supports configuration of a custom root directory for imported content, allowing more structured organization of imported documentation. The admin panel now includes new controls to configure the visibility of publishing channels and third-party datasets, enabling administrators to manage access to these platform features.

## Configurable Parameter Reference
The following table lists all key configurable parameters introduced or modified in this release:
| Configuration Location | Parameter Name | Accepted Values | Core Function |
|-------------------------|----------------|----------------|---------------|
| Model-specific Extra Body settings | stream | `true` (default), `false` | Revert a single model’s built-in tasks to non-stream mode when set to `false` |
| Admin panel feature visibility | Publishing channel visibility | Toggle (Visible/Hidden) | Control whether platform publishing channels are visible to users |
| Admin panel feature visibility | Third-party dataset visibility | Toggle (Visible/Hidden) | Control whether imported third-party dataset tools are visible to users |
| User account settings | Password expiration | Configurable duration | Set the validity window for user passwords, triggering a forced password reset post-expiry |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/498)
