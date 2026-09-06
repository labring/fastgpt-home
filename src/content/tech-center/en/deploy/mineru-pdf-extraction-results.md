---
title: Extract Accurate PDF Content with MinerU
slug: /en/deploy/mineru-pdf-extraction-results
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/mineru
source_type: Official documentation
---

# Extract Accurate PDF Content with MinerU

## Core Extraction Capabilities
When integrating MinerU with FastGPT for self-hosted custom model deployments, you can extract comprehensive content from PDF documents. This reference uses the Tsinghua University *ChatDev Communicative Agents for Software Development* paper (available at https://arxiv.org/abs/2307.07924) — a standard academic paper with dense content — as a demonstration of extraction quality. MinerU captures all key content types within PDFs, including embedded images, mathematical formulas, and handwritten text processed via OCR, with no core content excluded from standard extraction workflows.

## Sample Extraction Result Comparison
The following table displays side-by-side extraction outputs and original PDF pages for the sample paper:

|                                                 |                                                 |                                                 |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| ![mineru3-1](../../../public/imgs/mineru3-1.png) | ![mineru4-1](../../../public/imgs/mineru4-1.png) | ![mineru5-1](../../../public/imgs/mineru5-1.png) |
| ![mineru3](../../../public/imgs/mineru3.png)   | ![mineru4](../../../public/imgs/mineru4.png)   | ![mineru5](../../../public/imgs/mineru5.png)   |

The top row contains chunked extraction results, while the bottom row shows the corresponding original PDF pages. All visible content—including images, formulas, and OCR’d handwritten text—is successfully extracted without significant loss or distortion.

## License Compliance Requirements
MinerU, the underlying extraction tool used in this integration, is licensed under the GPL-3.0 open-source license. Any user deploying FastGPT with MinerU must fully comply with the terms of this license to avoid legal violations, including adhering to source code disclosure and attribution requirements for redistributed or modified versions of the tool.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/mineru)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
