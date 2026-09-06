---
title: Manage Virtual Machine Container Files for Debugging
slug: /en/tutorial/fastgpt-vm-file-manager
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: Official documentation
---

# Manage Virtual Machine Container Files for Debugging

# Overview
The FastGPT Agent v2 Virtual Machine (VM) File Manager is a native tool for interacting with files stored inside a container during agent debugging. This tool streamlines debugging workflows by eliminating reliance on external file management utilities, creating a fully closed debugging loop for container-based agent development. Supported file types include charts, code files, and HTML previews, alongside other standard container-stored assets.

# Access Shortcut Locations
Two distinct shortcut entries provide access to the VM File Manager:
1.  A persistent, top-aligned shortcut on the chat window for the active Agent v2 deployment
2.  Contextual shortcuts that appear directly beneath chat bubbles containing VM operations

Selecting either shortcut opens a dedicated modal interface for all file management tasks related to the container.

# Core Modal Capabilities
The opened modal supports four core file management actions tailored for container debugging:
- Browse the complete hierarchical structure of the container’s file system
- Edit the content of existing files stored within the container
- Upload new local files to the container’s file system
- Download existing container files to a local machine

# Visual Reference
The following table displays the key visual components of the VM File Manager integration:

| Virtual Machine File Bubble Trigger | Virtual Machine File Manager Modal |
| :---------------------------------: | :--------------------------------: |
| ![Virtual Machine File Bubble](/imgs/agent_vm_file_bubble.png) | ![Virtual Machine File Manager](/imgs/agent_vm_file_manager.png) |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
