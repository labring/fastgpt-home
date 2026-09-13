---
title: List of Allowed JavaScript Modules in FastGPT Sandbox V2
slug: /en/node/fastgpt-sandbox-v2-js-module-whitelist
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: Official documentation
---

# List of Allowed JavaScript Modules in FastGPT Sandbox V2

## Overview of FastGPT Sandbox V2 JavaScript Whitelist
The FastGPT workflow sandbox v2 provides a secure isolated execution environment for custom JavaScript code integrated into workflow nodes. To mitigate security risks posed by unrestricted module access, the sandbox enforces a strict whitelist of approved npm packages. Only these pre-vetted modules may be loaded using the Node.js `require()` function within sandbox code. This restriction prevents custom code from accessing sensitive system resources, spawning external processes, or initiating unauthorized network connections.

## Approved npm Modules
The following npm modules are fully supported and may be imported directly via `require()` in sandbox node code, with no additional configuration required:

| Module | Description | Example |
|--------|-------------|---------|
| `lodash` | Utility library | `const _ = require('lodash')` |
| `moment` | Date handling | `const moment = require('moment')` |
| `dayjs` | Lightweight date library | `const dayjs = require('dayjs')` |
| `crypto-js` | Encryption library | `const CryptoJS = require('crypto-js')` |
| `uuid` | UUID generation | `const { v4 } = require('uuid')` |
| `qs` | Query string parsing | `const qs = require('qs')` |

Each module follows standard Node.js import syntax as shown in the example column, matching standard npm usage patterns for the listed packages.

## Security and Prohibited Modules
All npm modules and core Node.js built-in modules not explicitly included in the approved list are strictly prohibited. Common examples of blocked modules include `fs`, `child_process`, and `net`. These modules are restricted to eliminate risks of unauthorized file system modification, external process execution, and network communication from within the sandbox. Any attempt to import a prohibited module will result in sandbox execution failure, with standardized error handling to avoid exposing underlying system configuration details.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
