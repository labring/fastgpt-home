---
title: FastGPT 4.15.01 Operational and Security Fixes
slug: /en/deploy/fastgpt-4-15-01-improvements
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501
source_type: Official documentation
---

# FastGPT 4.15.01 Operational and Security Fixes

## User Experience Refinements
This release includes multiple UI and workflow improvements to reduce user friction:
- Mutually exclusive parent and child node selection: Eliminates unexpected UI jitter that occurred when selecting and moving both parent and child nodes simultaneously within the application’s knowledge tree.
- File injection context relocation: Moved message file injection logic from the system message context to the user message context, which increases cache hit rates for repeated, similar prompt sequences.
- Balance error messaging updates: Revised insufficient-balance notification text for non-administrator users and guest visitors to deliver clearer, more consistent feedback on quota limitations.
- Template visibility controls: Hides template selection options when the authenticated user lacks the required permission to create new resources, reducing visual clutter and confusion.

A new configurable option was added to improve model compatibility, as detailed below:
| Configurable Toggle | Purpose |
|---------------------|---------|
| Convert images to base64 | Encode uploaded images as base64 strings prior to transmission to AI models |

## Security Hardening Improvements
Critical security updates address potential exploit vectors:
- Third-party dataset SSRF protection: Enhanced security controls for all requests made to third-party dataset sources to mitigate server-side request forgery (SSRF) risks, preventing unauthorized access to internal network resources.
- Codex sandbox AST validation: Strengthened abstract syntax tree (AST) inspection within the codex-sandbox execution environment to block known code execution bypass attempts for untrusted user inputs.
- IP validation strengthening: Updated IP address validation logic across public and internal endpoints to prevent spoofing-based access bypasses, tightening access control for both authenticated and unauthenticated users.

## Operational Stability Fixes
Several stability and alerting improvements reduce operational overhead for self-hosted deployments:
- Duplicate rate limit alert suppression: Prevented duplicate site synchronization rate-limit messages from appearing in admin logs and user notifications, cutting down on unnecessary alert noise during repeated sync operations.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41501)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
