---
title: Configure Startup Scripts for FastGPT VM Sandboxes
slug: /en/tutorial/fastgpt-vm-startup-scripts
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: 官方文档
---

# Configure Startup Scripts for FastGPT VM Sandboxes

## What Are FastGPT VM Startup Scripts
When the **Computer** configuration option is enabled for a FastGPT Agent v2 virtual machine sandbox, a dedicated **Startup Script** configuration field is activated. This script executes automatically immediately after the sandbox environment finishes initializing, and before the attached AI workflow begins its official execution. The script runs within the isolated sandbox session, with access to the sandbox's shell environment for executing authorized commands.

## Intended Use Cases
The Startup Script is designed for specific sandbox preparation tasks as outlined in official FastGPT documentation. Valid use cases include:
- Configuring custom environment variables for the sandbox session to pass runtime values to dependent tools
- Modifying internal software package source repositories to use custom or regional mirrors
- Installing required Python packages using the `pip` package manager to extend sandbox functionality
- Installing system-level utility packages to support additional shell-based operations within the sandbox

## Step-by-Step Configuration Workflow
Follow these structured steps to set up a Startup Script for your FastGPT Agent v2 VM:
1. Access the Agent v2 VM creation or editing page within your FastGPT workspace.
2. Locate the **Computer** toggle option and enable it to unlock sandbox environment capabilities.
3. Once enabled, the **Startup Script** text input field will appear directly below the Computer option.
4. Input valid shell commands into the text field; multiple commands can be added on separate lines for sequential execution.
5. Review the entered commands to confirm they align with your sandbox preparation requirements, then save the VM configuration to apply the changes.

### Example Valid Shell Commands
Sample commands matching common use cases include:
- Set a custom environment variable: `export CUSTOM_RUNTIME_KEY=sample-value`
- Modify software package source configurations: `sed -i 's/default-repo-url/custom-repo-url/g'`
- Install a Python package via `pip`: `pip install scipy`
- Install a system-level utility: `apt install -y curl`

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)
