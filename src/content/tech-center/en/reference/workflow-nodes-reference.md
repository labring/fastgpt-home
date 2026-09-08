---
title: FastGPT Workflow Node Reference
slug: /en/reference/workflow-nodes-reference
page_type: Reference data
source: https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/core/workflow/template/system
source_type: 官方文档
meta_title: FastGPT Workflow Node Reference | FastGPT Technical Center
meta_description: A grouped reference of the 34 workflow nodes defined in the FastGPT open-source repository, with node type, tool support and parameter counts.
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/英文-fastgpt.io/reference/workflow-nodes-reference.md
source_sha256: 2b9ebdeff5d1f0ae47f9cd3cb810f80ff98e13df6303be56696d8510482e2135
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT Workflow Node Reference

This table describes FastGPT development snapshot 5957d06 (2026-09-07). Development definitions can precede a stable release; check the version you deploy.

## How to use this table

This page lists the 34 workflow nodes defined in the open-source repository, grouped by category, with the node type identifier, whether the node can be mounted as a tool, and how many input and output parameters it declares. Use it to find which node provides a capability before building a workflow, or to locate a node by its type identifier in an exported workflow JSON.

## Columns

| Column | Meaning |
| --- | --- |
| Node type | The `flowNodeType` in the definition; used in exported workflow JSON, check compatibility when upgrading |
| Name | The node name shown in the interface |
| As tool | Yes means the node can be mounted as a tool by a tool-call node |
| Inputs / required | Declared input parameters, and how many are required |
| Outputs | Declared output parameters |
| Docs | The documentation path recorded in the definition |

## Three things to know before using this table

**1. Only 9 of the nodes record an introduced version, and the formats differ.**

| Node type | Name | Recorded version | Note |
| --- | --- | --- | --- |
| `agent` | Agent | `4.17.0` | not yet in a released version |
| `chatNode` | AI Chat | `4.9.7` | — |
| `classifyQuestion` | Classify | `4.9.2` | — |
| `comment` | — | `4811` | uses the older numbering format |
| `contentExtract` | Text Extract | `4.9.2` | — |
| `datasetSearchNode` | Dataset Search | `4.9.2` | — |
| `emptyNode` | — | `481` | uses the older numbering format |
| `toolCall` | Tool calling | `4.9.2` | — |
| `readFiles` | Read files | `4.9.2` | — |

The remaining 25 nodes have no such field, so this table cannot say which version first shipped them. To confirm whether a node exists in a given version, check the node panel of that deployment.

**2. 6 nodes have no readable name in the definition and are listed as missing.**

| Node type | Category |
| --- | --- |
| `appModule` | Other |
| `comment` | System input |
| `emptyNode` | System input |
| `pluginModule` | Other |
| `tool` | Other |
| `toolSet` | Other |

Most of these are internal or placeholder nodes and do not appear in the node panel.

**3. Parameter counts follow the definition, not the interface.** Some parameters are shown or hidden based on earlier choices, so the interface can show fewer than the number here; the node with the most inputs declares 33, and most scenarios only need the required ones.

## AI capabilities (8 nodes)

| Node type | Name | As tool | Inputs / required | Outputs | Docs |
| --- | --- | --- | --- | --- | --- |
| `chatNode` | AI Chat | Yes | 22 / 0 | 4 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/ai_chat) |
| `agent` | Agent | — | 33 / 0 | 2 | — |
| `classifyQuestion` | Classify | Yes | 5 / 0 | 1 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/question_classify) |
| `toolParams` | Custom Tool Variable | Yes | 0 / 0 | 0 | — |
| `datasetSearchNode` | Dataset Search | Yes | 14 / 1 | 2 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/dataset_search) |
| `stopTool` | Stop Tool calling | — | 0 / 0 | 0 | — |
| `contentExtract` | Text Extract | Yes | 5 / 1 | 3 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/content_extract) |
| `toolCall` | Tool calling | Yes | 20 / 0 | 2 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tool) |

## Tools (10 nodes)

| Node type | Name | As tool | Inputs / required | Outputs | Docs |
| --- | --- | --- | --- | --- | --- |
| `answerNode` | Assigned Reply | Yes | 1 / 1 | 0 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/reply) |
| `code` | Code run | Yes | 5 / 2 | 5 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/sandbox-v2) |
| `ifElseNode` | Condition | Yes | 1 / 0 | 1 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/tfswitch) |
| `httpRequest468` | HTTP | Yes | 10 / 3 | 4 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/http) |
| `loopRun` | Loop Node | Yes | 7 / 2 | 1 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/loop_run) |
| `loopRunBreak` | Loop break | — | 0 / 0 | 0 | — |
| `parallelRun` | Parallel Run | Yes | 7 / 3 | 3 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/parallel_run) |
| `textEditor` | Text Editor | Yes | 1 / 1 | 1 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/text_editor) |
| `readFiles` | Read files | Yes | 1 / 1 | 3 | — |
| `variableUpdate` | Update variables | Yes | 1 / 0 | 0 | — |

## System input (8 nodes)

| Node type | Name | As tool | Inputs / required | Outputs | Docs |
| --- | --- | --- | --- | --- | --- |
| `nestedEnd` | End | — | 1 / 1 | 0 | — |
| `loopRunStart` | Loop start | — | 3 / 0 | 3 | — |
| `pluginInput` | Plugin Input | — | 0 / 0 | 0 | — |
| `pluginOutput` | Plugin output | — | 0 / 0 | 0 | — |
| `nestedStart` | Start | — | 2 / 1 | 1 | — |
| `workflowStart` | Start | — | 1 / 0 | 1 | — |
| `comment` | — | — | 2 / 0 | 0 | — |
| `emptyNode` | — | — | 0 / 0 | 0 | — |

## Interactive (2 nodes)

| Node type | Name | As tool | Inputs / required | Outputs | Docs |
| --- | --- | --- | --- | --- | --- |
| `formInput` | Form input | Yes | 2 / 0 | 1 | — |
| `userSelect` | User Select | Yes | 2 / 0 | 1 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/user-selection) |

## Other (6 nodes)

| Node type | Name | As tool | Inputs / required | Outputs | Docs |
| --- | --- | --- | --- | --- | --- |
| `customFeedback` | Custom Feedback | Yes | 1 / 1 | 0 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/custom_feedback) |
| `datasetConcatNode` | Dataset search citation merge | — | 2 / 0 | 1 | [Node documentation](https://doc.fastgpt.io/en/guide/build/workflow/nodes/knowledge_base_search_merge) |
| `appModule` | — | — | 0 / 0 | 0 | — |
| `pluginModule` | — | Yes | 0 / 0 | 0 | — |
| `tool` | — | Yes | 0 / 0 | 0 | — |
| `toolSet` | — | Yes | 0 / 0 | 0 | — |

## When this table goes out of date

1. **New nodes and parameter changes ship with versions.** Counts follow the current definition files and need rechecking after an upgrade.
2. **The commercial edition may provide additional nodes.** This table covers the open-source repository only.
3. **Parameter count is not configuration effort.** Most nodes require one or two fields; the rest have defaults or apply to specific scenarios.
4. **Check node identifier and name compatibility when upgrading.** Use the identifier for programmatic checks.

## Next steps

The tables above can be checked against the open-source repository. If a specific deployment needs to be assessed against these values, contact sales for support; the cloud service can be used directly without preparing the environment first.

- [Contact sales](/en/contact): assess your deployment against these values
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what each form covers

## References

- [FastGPT workflow nodes reference — 5957d06](https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/core/workflow/template/system)

## Parameter counting

Parameter totals count array entries in each node definition, including shared templates. Required totals count flags declared directly in that definition; shared templates and runtime conditions can add required fields.
