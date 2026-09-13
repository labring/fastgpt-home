---
title: Define FastGPT Plugin Icon File Standards
slug: /en/model/fastgpt-plugin-icon-standards
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Define FastGPT Plugin Icon File Standards

## Overview of Icon Processing
When building a FastGPT plugin using the official CLI tool, the build process automatically scans for icon files located in the plugin’s root directory. Detected icon data is then written to the final `dist/manifest.json` output file. All icon assets must be placed directly in the plugin root directory; nested subdirectories are not scanned for icon files. To avoid ambiguous scan results, only one file extension should be used for any single icon asset, whether it is a main plugin icon or a child tool icon.

## Main Plugin Icon Requirements
The primary icon for the full plugin uses a standardized naming convention. Accepted filenames for the main plugin icon include: `logo.svg`, `logo.png`, `logo.jpg`, `logo.jpeg`, `logo.webp`, or `logo.gif`. Only one of these files should be included in the plugin root directory to prevent the CLI from selecting an unintended icon asset during the build.

## Child Tool Icon Specifications
For plugin toolkits that include multiple child tools, custom icons can be assigned to individual child entries. The following table outlines the required naming conventions for both main and child tool icons:

| Scenario                  | Required File Names                                                                 |
|---------------------------|-------------------------------------------------------------------------------------|
| Main plugin icon          | `logo.svg`, `logo.png`, `logo.jpg`, `logo.jpeg`, `logo.webp`, or `logo.gif`         |
| Toolkit child tool icon   | `<childId>.logo.svg`, `<childId>.logo.png`, and similar standardized extensions      |

The `<childId>` placeholder in the child icon filename must exactly match the `id` field of the corresponding entry in the plugin’s `children[]` configuration array. Child tools that do not have a matching custom icon file will automatically reuse the main plugin icon by default.

## Post-Build Validation
After completing the plugin build process, confirm that the correct icon configuration was applied by checking the `icon` field in the generated `dist/manifest.json` file. This field will reflect the detected main plugin icon, and will include references to custom child icons if they were included in the plugin root directory.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
