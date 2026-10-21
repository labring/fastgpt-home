---
title: Where Custom Code Runs: the Code Node or the Agent VM, and Which Sandbox Backs the VM
slug: /en/guide/code-execution-environment-selection
page_type: Decision matrix
source_type: FastGPT v4.17.2 documentation and community threads
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_note: "Criteria taken from the FastGPT v4.17.2 documentation and community threads, verified 2026-10-13."
check_day: 2026-10-13
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: This guide helps technical decision makers and enterprise buyers select where custom code runs: FastGPT code node, OpenSandbox Agent VM, or Sealos Devbox Agent VM, covering core criteria, switching costs, and optimal timing.
date_published: 2026-10-14
date_modified: 2026-10-14
---

# Where Custom Code Runs: the Code Node or the Agent VM, and Which Sandbox Backs the VM

## When this decision has to be made
This decision is required when workflows need to execute custom data processing, format conversion, or logic calculation code, or when Agents need to dynamically plan code execution and handle uploaded files. Choosing a solution before requirements are clear will add unnecessary deployment complexity and resource consumption. Delaying the decision means you will need to refactor workflows and migrate existing code if the current environment cannot meet new needs, risking business downtime. You must advance this decision immediately when: you need to retain code execution environment state across sessions, read or write local files to generate or process data, install custom third-party dependencies, or configure a dedicated runtime environment via startup scripts. Documentation for the code node applies to version 4.14.8 and above; sandbox configuration parameters vary by version, confirm available capabilities with your deployed platform version.

## Criteria matrix
| Candidate | Supported programming language scope | Allowed module scope | File system access capability | Network access restrictions | Session environment persistence | Custom startup script configuration | Sandbox resource limit configuration | Sandbox provider deployment method |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Code Node (FastGPT built-in sandbox) | JavaScript (based on Bun runtime), Python 3 | JavaScript: whitelisted npm modules (lodash, moment, etc.); Python: whitelisted standard libraries and third-party libraries (math, pandas, etc.), prohibited system/network modules | Cannot read/write container file system | Automatically blocks internal IP addresses, maximum 30 requests per single execution, maximum response body 2MB | Each execution runs in an isolated sandbox process, no session-level persistence | Not supported | Default maximum runtime 60s, configurable adjustment; default single sandbox memory 256MB | Private deployment requires deploying the `fastgpt-sandbox` image and configuring the `CODE_SANDBOX_URL` environment variable |
| Agent VM (OpenSandbox sandbox) | Python, Node.js, Shell scripts | Can install Python dependencies (pip) and system-level tools via startup scripts; to install apt dependencies, use the `fastgpt-agent-sandbox-root` image and configure `AGENT_SANDBOX_APT_MIRROR` | Can read/write the `/workspace` directory, supports uploading files and injecting them into the `user_files/` directory | No network isolation by default, you can add custom security policies | Environment remains active within the same session, files and dependencies are retained | Supported, timeout controlled by `AGENT_SANDBOX_ENTRYPOINT_TIMEOUT_SECONDS`, default 30 seconds | Configurable `AGENT_SANDBOX_CPU_COUNT`, `AGENT_SANDBOX_MEMORY_MIB`, `AGENT_SANDBOX_STORAGE_SIZE_GI` | Requires deploying OpenSandbox Server, Volume Manager, and Agent Sandbox Proxy services |
| Agent VM (Sealos Devbox sandbox) | Python, Node.js, Shell scripts | Can install Python dependencies (pip) and system-level tools via startup scripts | Can read/write the `/workspace` directory, supports uploading files and injecting them into the `user_files/` directory | Not stated in the documentation; verify in your environment | Environment remains active within the same session, files and dependencies are retained | Supported, timeout controlled by `AGENT_SANDBOX_ENTRYPOINT_TIMEOUT_SECONDS`, default 30 seconds | Configurable `AGENT_SANDBOX_CPU_COUNT`, `AGENT_SANDBOX_MEMORY_MIB`, `AGENT_SANDBOX_STORAGE_SIZE_GI` | Only supported in commercial editions; requires applying for an access key, sandboxes are hosted by Sealos, and you must still configure Agent Sandbox Proxy-related variables |

## Why each criterion matters
### Supported programming language scope
This criterion determines the boundary of achievable code logic. If your business needs only simple data format conversion, JavaScript or Python will suffice, and the code node’s support range is sufficient. If you need to run Shell scripts for system-level operations or combine multiple languages to implement complex logic, the code node cannot cover these use cases, and you must select an Agent VM. Language adaptability directly affects code portability and development efficiency. A mismatched language range means existing code cannot be reused directly, requiring you to rewrite core logic.

### Allowed module scope
This criterion determines the boundary of tool capabilities available to your code. The code node uses a fixed whitelist mechanism, only allowing pre-approved modules. If you need to use third-party libraries not included in the whitelist, you cannot implement this via conventional means. Agent VMs support installing custom dependencies via startup scripts, allowing flexible adaptation to various business needs. If your business requires specific data analysis libraries or encryption tools, a mismatched module range will cause code execution to fail, requiring you to develop alternative logic and increasing development costs and timelines.

### File system access capability
This criterion determines your code’s ability to process local files. The code node cannot read or write the container file system, and is only suitable for simple calculation scenarios without file interaction. If your business needs to process uploaded Excel, CSV or other files, or generate temporary files for subsequent steps, the code node cannot meet these requirements. Agent VMs support reading and writing the `/workspace` directory, and can automatically inject user-uploaded files into the `user_files/` directory, making them suitable for file processing scenarios. Lack of file system access will prevent you from reading dependent files or outputting results, directly blocking your business process.

### Network access restrictions
This criterion determines the security boundary for external requests initiated by your code. The code node blocks internal IP addresses by default, effectively preventing SSRF attacks, making it suitable for scenarios requiring secure access to external public interfaces. The OpenSandbox solution for Agent VMs has no network isolation by default, and you can add custom security policies, making it suitable for deployment environments where you can control network access independently. The network policy for the Sealos Devbox solution is not stated in the documentation; verify in your environment. Improperly configured network restrictions will introduce security risks, leading to unauthorized access to internal networks, data leaks, or system intrusion.

### Session environment persistence
This criterion determines your ability to retain the environment state of code execution. The code node runs each execution in an isolated sandbox process with no session-level persistence, making it suitable for single-run stateless code execution. If your business needs to retain files, dependencies, or environment variables across multiple steps in the same session, the code node cannot meet these requirements. The session-level persistence feature of Agent VMs supports continuous debugging and data transfer for multi-round interactions, making it suitable for complex tasks requiring multi-step collaboration. Lack of environment persistence capabilities means each code execution requires reinitializing the environment, increasing execution time and resource consumption.

### Custom startup script configuration
This criterion determines the customizability of your runtime environment. The code node does not support startup script configuration, and can only use a preset sandbox environment. If your business needs to install specific software sources, Python dependencies, or system-level tools, the code node cannot implement this. Agent VMs support configuring startup scripts, which can automatically execute initialization commands after the sandbox starts, adapting to dedicated runtime environments. Lack of support for startup script configuration means you cannot pre-configure business-required dependencies, requiring you to manually install dependencies in code, increasing code complexity and execution time.

### Sandbox resource limit configuration
This criterion determines the resource usage upper limit of the sandbox. The code node’s single sandbox maximum memory is controlled by `SANDBOX_MAX_MEMORY_MB` (default 256 MB), with a default runtime timeout of 60 seconds, which can be adjusted via configuration. Agent VMs support custom CPU, memory, and storage capacity limits, allowing you to adjust resource allocation based on business needs. Improperly configured resource limits will cause the sandbox to be forcibly terminated due to insufficient resources, or waste excess server resources, affecting business operation efficiency.

### Sandbox provider deployment method
This criterion determines the deployment and maintenance costs of the sandbox. Private deployment of the code node only requires deploying the `fastgpt-sandbox` image and configuring environment variables, with low complexity. The OpenSandbox solution for Agent VMs requires deploying multiple services, with high maintenance complexity. The Sealos Devbox solution is only supported in commercial editions, sandboxes are hosted by Sealos, requires applying for an access key, and you must still configure Proxy-related variables. A mismatched deployment method will lead to a long deployment cycle or high maintenance difficulty, affecting project launch progress.

## The cost of switching later
Switching from the code node to an Agent VM requires migrating existing code and adjusting execution logic. Your existing code must adapt to the variable passing and environment persistence mechanisms of Agent VMs, such as changing stateless single execution to support session-level state retention. If you select the OpenSandbox solution, you need to deploy additional sandbox services and configure environment variables, involving service restarts and network policy adjustments, which may require a short downtime window. If you select the Sealos Devbox solution, you need to complete commercial edition permission application and access configuration, and adjust existing sandbox-related environment variables. During the migration process, you must verify all code execution results, including dependency installation, file reading and writing, network access, and other functions, to ensure that business logic is not affected. Additionally, the stateless nature of the original code node differs from the session persistence feature of Agent VMs, so you must adjust the workflow’s node orchestration logic to adapt to the new environment state transfer method.

## When this decision can wait
You can postpone this decision when workflows only need to call built-in tools to complete standardized tasks without executing custom code. When code execution needs only simple data format conversion and does not require handling files, custom dependencies, or session-level environment persistence, you can prioritize using the code node and consider upgrades after requirements are clear. When your deployment environment has not completed sandbox-related service preparations, such as not deploying OpenSandbox or applying for Sealos Devbox access permissions, you can temporarily use the code node as a transitional solution. When the project is in the early validation stage with unstable requirements, pre-selecting a solution may lead to frequent adjustments later and increase unnecessary workload. You can use the code node to complete basic function validation first, then conduct formal selection and deployment after requirements are clear.

## Keep reading

- [Knowledge Base Permissions: Team Roles, Dataset Collaborators or Collection-Level Access](/guide/dataset-permission-granularity)
- [Connecting a Bot to Chat Apps: WeCom, Feishu, DingTalk, Official Accounts and Personal WeChat](/guide/im-bot-channel-selection)

## References

- [Code run node](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)
- [Agent virtual machine](https://doc.fastgpt.cn/en/guide/build/agentv2/vm)
- [OpenSandbox configuration](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)
- [Sealos Devbox sandbox configuration](https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
