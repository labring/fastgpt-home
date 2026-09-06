---
title: FastGPT v4818 Upgrade Feature and Fix Summary
slug: /en/deploy/fastgpt-v4818-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# FastGPT v4818 Upgrade Feature and Fix Summary

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT v4818 Upgrade Feature and Fix Summary

## New Functional Additions
This release introduces five core new capabilities for self-hosted and commercial FastGPT deployments:
1. Direct application creation via JSON configuration: Users can build FastGPT applications using JSON configuration files instead of the standard visual UI workflow.
2. Rapid HTTP plugin creation via CURL scripts: The platform now supports generating HTTP plugins quickly using pre-written CURL scripts, reducing setup time for custom integrations.
3. Department-based permission structure (Commercial edition): Commercial tier deployments gain access to a hierarchical departmental access control system for granular permission management.
4. Custom CORS security policies: Administrators can configure custom cross-origin resource sharing rules. The default policy allows fully open access, with the following default settings:
| Configuration Setting | Default Value |
|----------------------|---------------|
| Allowed Origins      | `*`           |
| Permitted HTTP Methods | All         |
| Permitted Request Headers | All     |
5. Private deployment model troubleshooting documentation: Official troubleshooting guides are now available for self-hosted private FastGPT model deployments.

## System and Security Improvements
Twelve operational and security enhancements were implemented to improve reliability and user experience:
- Enhanced HTTP body parsing to resolve newline handling issues in string variables
- Updated share links to generate random user avatars for improved visual consistency
- Strengthened image upload security validation, including unique avatar image storage to prevent cumulative storage bloat
- Separated MongoDB full-text index tables to optimize database query performance
- Merged dataset search queries to reduce unnecessary database calls
- Improved CSV file encoding detection to reduce garbled text in uploaded CSV files
- Implemented asynchronous file content reading to minimize process blocking during file uploads
- Updated the file viewer to download HTML files directly instead of rendering them inline in the browser

## Resolved Bug Fixes
Two critical bugs were resolved in this release:
1. Fixed an issue where Base64-encoded embedded images in uploaded HTML files failed to auto-convert to public image URLs
2. Resolved incorrect plugin billing calculation errors for commercial deployments

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4818)
