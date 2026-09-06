---
title: Describe FastGPT Agent Virtual Machine Features
slug: /en/tutorial/fastgpt-agent-vm-overview
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: 官方文档
---

# Describe FastGPT Agent Virtual Machine Features

## What is FastGPT Agent Virtual Machine
The FastGPT Agent Virtual Machine (VM) is an isolated, per-session sandbox environment that extends agent capabilities beyond standard chat interactions. When the "Enable Computer" toggle is activated for an agent, the system dynamically provisions and binds a dedicated sandbox container for every individual chat session in the background. Each container is strictly isolated from other sessions and the host system, preventing unintended data exposure or cross-session interference.
![Enable Computer Toggle](/imgs/agent_vm_enable.png)

## Core Functional Capabilities
When enabled, the FastGPT Agent VM enables three key operational use cases:
- **Execute Dynamic Code**: Run Python, Node.js, or Shell scripts via the built-in code executor to perform complex calculations, automate tasks, and manipulate structured or unstructured data.
- **Read and Write Local Files**: Create, modify, and read files exclusively within the isolated `/workspace` directory. This includes generating visual charts, processing uploaded CSV/Excel spreadsheet files, and saving generated output data for use in the active chat session.
- **Customize Runtime Environment**: Dynamically tailor the agent’s runtime environment by binding SKILL packages, or configuring custom Startup Scripts. These automated Shell commands execute immediately after the VM initializes, but before the AI workflow begins, allowing users to install required dependencies, set custom environment variables, or run other pre-execution setup tasks.

## Configuration Workflow
This step-by-step workflow covers enabling and configuring the FastGPT Agent VM for your agent:
1. Navigate to the agent build configuration page in your FastGPT deployment.
2. Locate the labeled "Enable Computer" toggle control in the agent capabilities panel.
3. Toggle the switch to the enabled state: the system will automatically provision a dedicated sandbox container for each new chat session initiated after this configuration change.
4. (Optional) Customize the runtime environment: Use the provided SKILL package binding tool to attach required runtime libraries or extensions.
5. (Optional) Configure automatic initialization: Enter valid Shell commands in the Startup Scripts configuration field. These commands will run automatically once the VM is fully initialized, before the AI agent’s workflow executes for the session.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)
