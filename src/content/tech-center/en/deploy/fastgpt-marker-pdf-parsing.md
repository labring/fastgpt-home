---
title: Enable Marker PDF Parsing for FastGPT
slug: /en/deploy/fastgpt-marker-pdf-parsing
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/marker
source_type: Official documentation
---

# Enable Marker PDF Parsing for FastGPT

## PDF Parsing Limitations in FastGPT
PDF is a relatively complex file format. FastGPT’s built-in PDF parser relies on the pdfjs library, which uses logical parsing and cannot effectively handle complex PDF files. When parsing PDFs containing images, tables, formulas, or other non-plain-text content, the resulting extracted text and structure are often incomplete or poorly formatted. This limitation impacts users who need accurate extraction of visually rich document content for downstream AI processing workflows.

## Marker PDF Parsing Solution
Marker is a specialized PDF parsing tool designed to address these limitations. It uses the Surya model for vision-based parsing, which enables effective extraction of images, tables, formulas, and other non-plain-text content that traditional logical parsers struggle with. This integration is supported starting from FastGPT v4.9.0 for all eligible user tiers. Before configuring FastGPT to use Marker, ensure you have pulled the latest Marker container image, as the tool’s API format has changed in recent releases, and older images may not be compatible.

## Configuration Instructions
Configuration steps differ between the FastGPT Community and Commercial deployment options:
### FastGPT Community Edition
1.  Locate the `config.json` file in your FastGPT deployment directory.
2.  Add the `systemEnv.customPdfParse` configuration parameter to the root level of the JSON file. No additional sub-parameters are required for basic activation.
3.  Save the modified `config.json` file, then restart all FastGPT services to apply the new configuration settings.

### FastGPT Commercial Edition
Commercial edition users do not need to manually edit configuration files. Instead, access the FastGPT Admin panel, navigate to the PDF parsing configuration section, and use the provided form to enable and adjust the `customPdfParse` option. All changes are saved and applied immediately without requiring manual service restarts.
> [FastGPT public documentation](https://doc.fastgpt.cn/en/self-host/custom-models/marker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
