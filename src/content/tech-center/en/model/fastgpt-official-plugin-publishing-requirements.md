---
title: Requirements for Publishing FastGPT Official Plugins
slug: /en/model/fastgpt-official-plugin-publishing-requirements
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Requirements for Publishing FastGPT Official Plugins

This page details the mandatory requirements for publishing official FastGPT system plugins, aligned with official development documentation.

## Mandatory Publishing Workflow Steps
The full publication process requires five sequential mandatory actions:
1.  Complete a formal code review of all plugin source code and associated configuration files.
2.  Execute the build, validation, testing, and packaging process for the plugin assets.
3.  Manually install the resulting `.pkg` plugin package in a dedicated isolated test environment to confirm basic deployment functionality.
4.  Conduct comprehensive functional testing covering external API integrations, secret configuration management, error handling paths, and concurrent plugin calls.
5.  Pass a pre-listing security review focused on critical risk categories.

## Targeted Pre-Listing Security Checks
All official plugins must pass a targeted security audit prior to listing. The review specifically validates against the following risk vectors:
- Server-Side Request Forgery (SSRF) vulnerabilities
- Unintended secret configuration data leakage
- Unauthorized arbitrary file system access
- Remote command execution risks
- Security vulnerabilities in bundled third-party dependencies

## Deployment and Functional Validation Standards
Prior to submission, plugins must complete two core validation phases:
1.  Manual deployment testing: Install the packaged `.pkg` file in an isolated test environment to confirm no installation errors or runtime startup failures.
2.  End-to-end functional testing: Verify all intended plugin behaviors, including proper handling of external API requests, correct loading and storage of secret configurations, graceful failure responses for invalid inputs or disrupted external services, and consistent performance during concurrent plugin invocations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
