---
title: Local Debugging for FastGPT System Plugins
slug: /en/model/fastgpt-system-plugin-local-debug
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Local Debugging for FastGPT System Plugins

## Step-by-Step Debug Workflow
First, navigate to your target plugin directory and install required dependencies:
```bash
cd packages/tools/my-tool
pnpm install
```
To list all debuggable tools in the current directory, run the base debug command without execution flags:
```bash
pnpx @fastgpt-plugin/cli debug .
```
For direct execution of a single tool, add the `--run` flag alongside inline input and secrets data:
```bash
pnpx @fastgpt-plugin/cli debug . --run --input '{"query":"hello"}' --secrets '{"apiKey":"test"}'
```
To run a specific child tool within a Toolkit, include the `--tool` flag to specify the target tool name:
```bash
pnpx @fastgpt-plugin/cli debug . --run --tool search --input '{"query":"hello"}' --secrets '{"apiKey":"test"}'
```
When working with large input, secrets, or system variable data, use file-based loading instead of inline strings to avoid formatting errors:
```bash
pnpx @fastgpt-plugin/cli debug . --run --input-file input.json --secrets-file secrets.json --system-var-file system-var.json
```

## Debug Command Flag Reference
The following flags are available for the `pnpx @fastgpt-plugin/cli debug` command:
| Flag | Description |
|------|-------------|
| `--run` | Enables execution of the target tool code, rather than just listing debuggable tools |
| `--input <json-string>` | Passes inline JSON-formatted input data to the tool |
| `--secrets <json-string>` | Passes inline JSON-formatted secret values for tool authentication |
| `--tool <tool-name>` | Targets a specific child tool within a plugin Toolkit |
| `--input-file <file-path>` | Loads input data from a local JSON file |
| `--secrets-file <file-path>` | Loads secret values from a local JSON file |
| `--system-var-file <file-path>` | Loads system environment variables from a local JSON file |

## Local Debug Environment Boundaries
Local debugging has defined limitations and intended use cases:
- The `ctx.invoke.uploadFile()` method uses a local mock implementation, with a default storage path of `.fastgpt-plugin-debug/uploads`.
- Local debugging is intended to quickly validate plugin logic and schema correctness.
- The local debug environment does not simulate production-grade child-process pools, real Node.js IPC, network environments, server timeouts, or queue scheduling.
- Before deploying official plugins, complete end-to-end testing by manually installing the plugin in a dedicated test environment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
