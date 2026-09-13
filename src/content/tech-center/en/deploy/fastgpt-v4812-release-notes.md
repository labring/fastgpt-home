---
title: FastGPT v4812 Feature Updates and Fixes
slug: /en/deploy/fastgpt-v4812-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4812
source_type: 官方文档
---

# FastGPT v4812 Feature Updates and Fixes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## New Functional Additions
This release delivers a range of new capabilities for FastGPT users and administrators:
- Global variables now support the number data type, with configurable default values and input field parameters
- All plugin custom input fields (text, number, select boxes, toggles) can be referenced as variables by default, simplifying workflow variable integration
- Tool calls now support using the interaction node for enhanced user workflow control
- Debug mode now allows inputting global variables during workflow testing
- Official Chat OpenAPI documentation is now available for API integration
- Three new plugins: Wiki search, Google search, and database connection and operation tools
- A cookie privacy policy prompt has been added to the user interface
- The HTTP node now supports JSONPath expressions for targeted data parsing
- Apps and Datasets now support member group permission configuration for access control

## Configuration & Environment Variables
A new environment variable is introduced to resolve file URL handling inconsistencies. A reference table for this parameter is provided below:
| Parameter Name | Purpose | Resolved Issue |
|----------------|---------|----------------|
| `FE_DOMAIN` | Adds a complete domain suffix to uploaded files and images | Fixes cases where large language models fabricate image domains for DOCX file image links |

## Performance Improvements & Bug Fixes
### Performance Improvements
- The loop node now supports selecting variables from external nodes, expanding available variable access within workflows
- DOCX file reading has been optimized, with faster HTML-to-Markdown conversion and significantly reduced memory consumption

### Bug Fixes
- File extension detection now ignores query string parameters to improve file handling accuracy
- Empty AI responses no longer cause unintended LLM history record merging
- The user interaction node now correctly blocks workflow execution as expected
- Creating a new app no longer occasionally throws a null pointer error
- Multiple loop nodes in a single workflow now execute correctly without configuration errors
- Variable modifications made inside loop nodes now propagate properly across the workflow
- In non-stream mode, nested child apps and plugins now correctly receive child app responses
- The data chunking strategy now splits each Markdown section independently, improving content processing precision

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4812)
