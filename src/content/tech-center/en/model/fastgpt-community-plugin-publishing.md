---
title: Publish FastGPT Community System Tool Plugins
slug: /en/model/fastgpt-community-plugin-publishing
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Publish FastGPT Community System Tool Plugins

### Overview of Community Plugin Publishing
FastGPT community workflow plugins extend the platform’s built-in tooling with custom, shareable functionality. The official publishing process requires two core phases: first, creating a dedicated public GitHub repository for your individual plugin, then integrating that repository into the central FastGPT community plugins repository via a pull request.

### Step-by-Step Standalone Plugin Repository Setup
First, navigate to the local directory for your plugin, which resides within the FastGPT tooling packages:
```bash
cd packages/tools/my-tool
```
Initialize a new local Git repository to track your plugin’s code:
```bash
git init
```
Stage all plugin files for your first commit:
```bash
git add .
```
Create a standardized initial commit for your plugin:
```bash
git commit -m "feat: add my-tool plugin"
```
Push your local repository to a new public GitHub repository using the GitHub CLI:
```bash
gh repo create --public --source=. --remote=origin --push
```
This command automatically creates a public GitHub repository, pushes your local codebase, and configures `origin` as the remote repository alias.

### Integrate with Central Community Repository
After your standalone plugin repository is live on GitHub, return to your local clone of the `fastgpt-community-plugins` repository. Update the repository’s submodule configuration or plugin references to point to your newly published public plugin repository. Commit these updated references to your local branch of the `fastgpt-community-plugins` repository, then push the changes to your personal fork of the official community plugins repo.

### Submit Pull Request
Once your changes to the `fastgpt-community-plugins` repository are pushed to your fork, open a pull request targeting the main branch of the upstream `labring/fastgpt-community-plugins` repository. Maintainers will review your submission to confirm alignment with community plugin guidelines before merging your contribution.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
