---
title: Where Tools Come From: System Tools, Team-Installed Plugins or Your Own
slug: /en/guide/plugin-source-selection
page_type: Decision matrix
source_type: FastGPT v4.17.2 documentation and community threads
source: https://doc.fastgpt.cn/en/plugin/intro
source_note: "Criteria taken from the FastGPT v4.17.2 documentation and community threads, verified 2026-10-13."
check_day: 2026-10-13
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A technical decision guide for enterprise AI platform buyers and technical decision makers: evaluate system tools, team-installed plugins, or custom-built tools, with clear criteria, switching costs, and timing guidance.
date_published: 2026-10-14
date_modified: 2026-10-14
---

# Where Tools Come From: System Tools, Team-Installed Plugins or Your Own

## When this decision has to be made
You face this mandatory decision when your enterprise needs to add third-party service integrations, custom business logic tooling, or when existing tools fail to meet current business requirements. The cost of acting too early includes wasting labor and resources from investing in unplanned work without clear business boundaries or use cases. For example, deploying custom tools too early may require full code refactoring after business adjustments, raising long-term maintenance costs. The cost of delaying the decision is more direct: missing critical tooling for business workflows reduces collaboration efficiency, blocks external system integrations, or fails to deliver personalized needs, harming business delivery quality. This decision also needs timely action when your team aims to unify tool usage standards, control permission boundaries, or optimize running resources, to avoid issues like multiple teams repeatedly installing identical plugins or permission chaos.

## Criteria matrix
| Candidate Solution       | Deployment Scope               | Visibility Scope               | Permission Management Owner | Iteration Cycle                     | Development/Maintenance Cost               | Runtime Isolation Capability                     | Configuration Independence                     |
|--------------------------|---------------------------------|--------------------------------|------------------------------|--------------------------------------|--------------------------------------------|------------------------------------------------|------------------------------------------------|
| System Tools             | Full system-wide                | Visible to all teams/system    | System administrator         | System plugins split to independent repos; no longer bundled with main service releases | No self-development required; relies on official maintenance | Managed via FastGPT Plugin service’s unified independent process pool | System-level global configuration; reusable keys and parameters |
| Team-Installed Plugins   | Limited to current team         | Visible only to current team members | Team administrator         | Independent updates; no dependency on main service releases | No self-development required; relies on plugin provider | Managed via FastGPT Plugin service’s unified independent process pool | Team-specific independent configuration; does not inherit system plugin configurations |
| Custom-Built Tools       | Customizable; can be configured for system/team level | Customizable; configurable for full system or within a team | Customizable; assigned by deployer | Fully controlled by development team; independent releases | Requires investment in development, testing, and maintenance labor | Can use independent process pools via FastGPT Plugin runtime | Fully customizable; full control over keys and parameters |

## Why each criterion matters
Deployment scope defines the tool’s usage coverage boundary. System-wide deployed system tools meet cross-team general needs, but may cause resource redundancy when only a single team requires exclusive tooling. Team-only plugins avoid unrelated teams accessing sensitive logic, but cannot reuse functionality across teams. Custom-built tools have customizable deployment scopes to fit flexible business scenarios, but require extra configuration management costs.

Visibility scope impacts security control and usage permissions. Tools visible to the full system simplify unified management, but may be misused by unauthorized teams. Tools visible only within a team protect exclusive business logic, but require internal usage standards to be established. Custom-built tools have adjustable visibility scopes to balance convenience and security requirements.

Permission management owner defines the tool’s maintenance responsibility. System tools are managed uniformly by system administrators, reducing team operational burdens, but cannot adapt to personalized needs. Team plugins are managed by team administrators, enabling rapid responses to internal changes, but require management effort. Custom-built tools allow business teams to fully control permission management, adapting to complex permission scenarios, but require corresponding management processes to be established.

Iteration speed affects feature update efficiency. System plugins split to independent repos no longer follow the main service’s release rhythm; update timelines are determined by maintainers. Team plugins can update independently, with faster cycles, but rely on the provider’s update plan. Custom-built tools’ iteration is fully controlled by the development team, enabling rapid responses to changes, but requires ongoing development and maintenance resources.

Development/maintenance cost determines return on investment. System tools require no extra development costs, but have limited functional flexibility. Team plugins’ development costs are borne by the provider; teams only bear installation and configuration costs, but may not fully match personalized needs. Custom-built tools have higher development and maintenance costs, but can fully fit exclusive requirements, reducing repeated procurement or customization costs over the long term.

Runtime isolation capability affects system stability. Isolation managed via FastGPT Plugin service avoids resource competition, improving overall stability. Custom-built tools using custom runtime environments require extra resource management costs, but can better fit specific runtime needs.

Configuration independence determines tool adaptation flexibility. System tools’ global configuration simplifies unified management, but cannot adapt to team-specific needs. Team plugins’ independent configurations meet team requirements, but require separate maintenance. Custom-built tools have fully customizable configurations, but require configuration management processes to be established.

## The cost of switching later
Switching from one selected tooling option to another carries multi-dimensional costs. Switching from system tools to team-installed plugins requires reconfiguring team-level tool usage permissions, migrating associated workflows and Agent nodes, verifying tool compatibility and stability, and may require a short downtime window to complete configuration updates. Switching from team-installed plugins to custom-built tools requires migrating existing plugin functionality to self-developed code, rebuilding and packaging plugin packages, deploying to the FastGPT Plugin service, migrating team configurations and workflow references, and completing full functional and performance validation; the validation cycle and coordination costs are relatively high. Switching from custom-built tools to full system-wide use allows a root user to upload the same `.pkg` plugin package to the system plugin management page for installation. Team plugins do not inherit keys or configurations from system plugins with the same ID, so you must complete separate configuration after conversion and update tool references in workflows and Agents. During any switch, back up existing configurations and data in advance to avoid configuration loss or functional anomalies, and complete full validation in a test environment before rolling out changes to production gradually.

## When this decision can wait
You can delay this decision when existing tools fully cover current business needs and there are no plans to add or adjust tooling capabilities. You can also delay the decision when business requirements are unclear, and you cannot define specific tool functions, use cases, or coverage scopes; conduct demand research and validation first without making a selection decision. Delay the decision if your team has limited resources and cannot invest in development, management, or coordination costs, and prioritize core business operations first. If your system administrator has not enabled team plugin upload functionality, and your team lacks the capability and resources to build custom tools, you can also wait until conditions mature before proceeding. Delaying does not mean abandoning; making selections once conditions are complete avoids wasting resources on unclear requirements.

## Keep reading

- [Where Custom Code Runs: the Code Node or the Agent VM, and Which Sandbox Backs the VM](/guide/code-execution-environment-selection)
- [Knowledge Base Permissions: Team Roles, Dataset Collaborators or Collection-Level Access](/guide/dataset-permission-granularity)

## References

- [Plugin overview](https://doc.fastgpt.cn/en/plugin/intro)
- [Installing plugins for a team](https://doc.fastgpt.cn/en/plugin/team-installation)
- [Developing system tools](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
