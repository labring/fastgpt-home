---
title: Configure Associated Skills and Tools for FastGPT Agent V2
slug: /en/tutorial/fastgpt-agentv2-skill-tool-settings
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/agentv2/settings
source_type: Official documentation
---

# Configure Associated Skills and Tools for FastGPT Agent V2

## Associated Skills Setup
Associate published skill packages from the FastGPT skill library to add extended functionality to your Agent V2 instance. When the agent’s virtual machine (VM) initializes, the entrypoint script included in each bound skill package will run automatically to activate the skill’s capabilities.

### Step-by-Step Skill Association Workflow
1. Navigate to the settings page for your target FastGPT Agent V2 deployment
2. Locate the **Associated SKILLs** configuration panel
3. Select one or more published skill packages from the integrated skill library dropdown menu
4. Confirm and save your changes to apply the bound skills
5. Enable the VM sandbox to avoid runtime errors

If you bind skills without enabling the VM sandbox, the system will display the explicit warning string: `Virtual Machine Not Ready`. For detailed guidance on writing, testing, and packaging custom skill packages, refer to the official [Development & Debugging](../skill/development) documentation.

![Virtual Machine Not Ready Warning](/imgs/agent_skill_vm_not_ready.png)

## Tools Integration Setup
Bind supported tools to your Agent V2 instance to expand its operational capabilities. Three categories of tools are available for integration:
- System built-in tools, including search engines and data visualization charts
- Custom team or personal tools, such as HTTP and MCP tools
- Pre-built created applications linked to your FastGPT workspace

### Step-by-Step Tool Binding Workflow
1. Access the settings page for your FastGPT Agent V2 instance
2. Locate the **Tools** configuration panel
3. Select the desired tool category from the available options
4. Choose specific tools to bind to your agent from the selected category
5. Save your configuration to activate the integrated tools

![Tools](/imgs/agent_integrate_tools.png)

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/agentv2/settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
