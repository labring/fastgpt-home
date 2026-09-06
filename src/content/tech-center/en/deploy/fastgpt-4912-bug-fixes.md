---
title: FastGPT 4912 Update Bug Fix Resolutions
slug: /en/deploy/fastgpt-4912-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4912
source_type: 官方文档
---

# FastGPT 4912 Update Bug Fix Resolutions

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Bug Fix Summary
This update addresses six distinct issues across prompt handling, security, data storage, UI/UX, and dataset management. Each fix targets a specific reported bug or vulnerability to improve system stability and security for self-hosted FastGPT instances.

## Categorized Fix Details
The resolved issues are grouped by functional area:
1.  **Prompt and Template Management**:
    - Fixed an issue where custom QA extraction prompts were being overwritten unexpectedly during save operations.
    - Resolved a template import failure that occurred when empty indexes were present in the imported dataset data.
2.  **Security Hardening**:
    - Patched a potential cross-site scripting (XSS) vulnerability present on the login page to prevent unauthorized script injection.
3.  **Data Storage and Expiry**:
    - Corrected a bug where the Image TTL field was not cleared in Dataset documents, leading to unintended early expiration of uploaded images.
    - Fixed MCP tool storage handling by adding proper escaping for integer type data to prevent parsing errors.
4.  **UI/UX Input Handling**:
    - Fixed a bug where voice input in the text box caused attached file lists to be lost during active session use.

## Step-by-Step Validation Checklist
After deploying the FastGPT 4912 update, follow these steps to confirm all fixes are active:
1.  Navigate to the custom QA prompt configuration page, save a modified extraction prompt, then reload the page to confirm the changes persist without overwriting.
2.  Upload a dataset template containing empty indexes and verify the import process completes successfully without errors.
3.  Access the login page using a modern browser, test for script injection attempts to confirm no XSS vulnerability is present.
4.  Attach files to a text box, use voice input to add supplementary text, then check that the attached file list remains intact.
5.  Edit a Dataset document containing uploaded images, confirm the TTL field is cleared automatically on save, and verify images do not expire prematurely.
6.  Create an MCP tool with integer type configuration data, store the tool, then retrieve it to confirm the integer data is properly escaped and unmodified.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4912)
