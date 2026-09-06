---
title: List of Fixed Bugs in FastGPT 4.14.51
slug: /en/deploy/fastgpt-4-14-51-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41451
source_type: Official documentation
---

# List of Fixed Bugs in FastGPT 4.14.51

This page documents the official bug fixes released with FastGPT version 4.14.51, as part of the self-host upgrade workflow. All fixes address verified issues within the platform’s core features, user interface, and API endpoints.

## Official Fixed Bug Inventory
This table lists all confirmed issues and their corresponding resolved symptoms in the 4.14.51 release:
| Issue Category | Reported Symptom |
|----------------|------------------|
| System Toolkit Authentication | Child tools failed to read preconfigured system secret keys after setup |
| Global Variable Validation | Password-type global variables had incorrect required field validation |
| Global Variable UI | Month picker for time-type global variables was visually obscured |
| User Interface Dialog | Line breaks were lost in text displayed within the manual copy dialog |
| Chat API Endpoint | The chat API threw an error when file upload type variables were omitted from requests |

## Fix Impact and Scope
Each fix targets the root cause of the reported issue without altering supported workflows or introducing new platform features. The system toolkit authentication fix restores correct credential inheritance, ensuring child tools can access preconfigured secrets as intended. The global variable validation fix aligns required field checks for password-type inputs with standard user expectations, eliminating false validation errors. The UI fixes resolve layout disruptions for form components, while the chat API fix prevents unexpected runtime failures when file upload variables are not included in requests. The copy dialog fix restores proper line break formatting for copied text, improving content sharing usability.

## Deployment Note for Self-Host Operators
Self-hosted FastGPT instances running versions prior to 4.14.51 can apply the 4.14.51 upgrade to resolve all listed issues. No additional custom configuration changes are required beyond completing the standard FastGPT upgrade process for this release.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41451)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
