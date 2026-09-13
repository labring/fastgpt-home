---
title: FastGPT 491 Version Bug Fix Details
slug: /en/deploy/fastgpt-491-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491
source_type: 官方文档
---

# FastGPT 491 Version Bug Fix Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT 491 Version Bug Fix Details

This technical reference covers all 11 resolved bugs in the FastGPT 491 self-hosted update, addressing issues across user interface (UI) rendering, API integrations, core dataset functionality, authentication workflows, and model configuration. All fixes are directly pulled from the official 491 upgrade documentation for self-hosted FastGPT deployments.

## Categorized Resolved Bugs
The fixes cover four functional groups.

### UI/UX and Frontend Bugs
- Corrected the max response tokens tooltip to display accurate, contextually appropriate values instead of pre-set incorrect numbers
- Fixed UI rendering errors triggered by missing null checks for the reasoning chain in prompt-mode tool calls
- Resolved an issue where editing an application’s basic information caused custom avatars to be lost
- Stopped share link titles from resetting to default values after refreshing the browser page
- Added complete translations for all user-facing error messages, eliminating unlocalized text prompts

### API and Integration Bugs
- Fixed parsing failures in the HTTP node when processing strings that contain embedded newline characters
- Corrected model provider testing to target the specified custom channel, rather than falling back to a default channel that was previously used unintentionally
- Prevented unintended saving of default model fields when adding a new custom model, which previously broke accurate detection of the default model configuration
- Fixed an incorrect array type schema in the content extraction node, resolving data formatting and parsing errors for array content

### Core Functionality Bugs
- Restored proper passing of conversation history during dataset query rewriting, a feature that was omitted in prior FastGPT versions
- Fixed authentication failures caused by incorrect parentPath calculations, which previously led to stored parentPath data being cleared unexpectedly

## Post-Upgrade Validation Steps
After deploying the FastGPT 491 update, follow these step-by-step checks to confirm all resolved bugs have been fixed:
1. Navigate to the Model Provider Testing page, select a configured custom channel, and run a test request. Verify the test execution uses the selected channel instead of a fallback default.
2. Create a new HTTP node, input a test string with embedded newline characters, and execute the node. Confirm the node successfully parses the full input string without truncation or error.
3. Edit an existing application’s basic information, retain or upload a custom avatar, and save the changes. Verify the avatar remains visible after saving the edits.
4. Generate a shareable link for an application, refresh the browser tab, and confirm the share link’s title matches the originally configured title.
5. Initiate a dataset query with an active conversation thread, confirm that the full conversation history is included in the dataset query rewrite request.
6. Log in with a restricted user account, navigate to a folder with a defined parentPath, and confirm the parentPath value is retained without being cleared after authentication.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/491)
