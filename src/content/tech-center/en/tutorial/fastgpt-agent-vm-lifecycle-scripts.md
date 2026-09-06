---
title: Configure and Manage FastGPT Agent VM Lifecycle Scripts
slug: /en/tutorial/fastgpt-agent-vm-lifecycle-scripts
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/build/agentv2/vm
source_type: 官方文档
---

# Configure and Manage FastGPT Agent VM Lifecycle Scripts

## Startup Script Editor Access
Under the Computer Configuration section of the Agent Configuration Panel, you can write standard Shell commands directly inside the **Startup script (sh)** code editor.
![Startup Script Editor](/imgs/agent_startup_script_editor.png)
This editor accepts valid Shell syntax to define custom environment setup logic for your agent’s virtual machine.

## Script Execution Sequence and Scope
When a new agent session starts or the virtual machine is reconstructed, the system executes configured scripts sequentially in the background:
1. **App Startup Script**: The custom Shell script saved in the Agent panel executes inside the virtual machine’s working directory, which is typically `/workspace`. Its core purpose is to prepare app-specific dependencies and runtime environments required for the agent to function.
2. **Skill Entrypoint**: If your Agent is associated with published skills, the initialization entrypoint script (e.g., `entrypoint.sh`) bundled within the skill package will be extracted and executed in the skill’s dedicated deployment directory immediately after the App Startup Script completes.

> ⚠️ **Transactional Skill Deployment**: During skill deployment, packages are first extracted to a temporary folder (e.g., `.tmp-<versionId>-<random>`). Upon successful decompression, the folder is atomically renamed to the formal version directory to prevent corrupted partial extractions that could break skill functionality.

## Lifecycle Flowchart Reference
The official FastGPT documentation provides a visual lifecycle flowchart that maps the full sequence of virtual machine events tied to agent script execution.
![Lifecycle Flowchart](/imgs/sandbox_lifecycle_flow_en.jpg)
This chart illustrates triggers for script execution, including new session launches and virtual machine reconstructions, as well as the ordered execution of app and skill scripts.

## Step-by-Step Script Validation Workflow
1. Navigate to the Computer Configuration subsection of the Agent Configuration Panel.
2. Input a test Shell command (e.g., `echo "Startup script executed" > /workspace/startup-log.txt`) into the Startup script (sh) editor.
3. Save the updated agent configuration and launch a new agent session or trigger a virtual machine reconstruction.
4. Access the virtual machine’s `/workspace` directory to confirm the `startup-log.txt` file exists and contains the test message.
5. For agents linked to skills, verify the skill entrypoint script runs by checking logs in the skill’s deployment directory.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)
