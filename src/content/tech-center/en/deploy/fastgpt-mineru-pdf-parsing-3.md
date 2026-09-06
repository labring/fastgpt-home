---
title: Configure MinerU PDF Parsing for FastGPT
slug: /en/deploy/fastgpt-mineru-pdf-parsing-3
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/mineru
source_type: Official documentation
---

# Configure MinerU PDF Parsing for FastGPT

## Limitations of FastGPT’s Default PDF Parsing
PDF is a relatively complex file format. FastGPT’s built-in PDF parser relies on the pdfjs library, which uses logical parsing logic and cannot effectively handle complex PDF files. When parsing PDFs containing images, tables, formulas, or other non-plain-text content, the resulting extracted text and structure is often poor and incomplete.

## MinerU Parsing Capabilities
Multiple PDF parsing solutions are available for use with FastGPT. MinerU is a dedicated parsing tool that leverages YOLO, PaddleOCR, and table recognition models for vision-based parsing. This approach enables reliable extraction of images, tables, formulas, and other complex non-plain-text content from PDF documents, resolving the limitations of FastGPT’s default parser.

## Configuration for MinerU Integration
The following table outlines configuration requirements for both FastGPT deployment options:
| Deployment Edition | Configuration Location | Target Configuration Field |
|---------------------|-------------------------|-----------------------------|
| Community Edition   | `config.json` file      | `systemEnv.customPdfParse`  |
| Commercial Edition  | Admin panel form        | N/A (UI-configured)         |

For Community Edition users:
1. Locate the `config.json` file in your FastGPT deployment directory.
2. Insert the `systemEnv.customPdfParse` configuration entry into the file. No additional parameter values are specified in official documentation for this setting.

For Commercial Edition users:
Configure the MinerU PDF parsing feature directly via the Admin panel using the provided form. Official step-by-step tutorial details for this workflow are referenced in the official documentation.

> [FastGPT public documentation](https://doc.fastgpt.cn/en/self-host/custom-models/mineru)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
