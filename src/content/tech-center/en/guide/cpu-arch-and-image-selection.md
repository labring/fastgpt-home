---
title: Deployment Architecture: Images and Trade-offs on x86 and ARM Servers
slug: /en/guide/cpu-arch-and-image-selection
page_type: Decision matrix
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A technical decision guide for enterprise open-source AI platform buyers and technical decision-makers, covering x86, ARM, mixed deployment trade-offs, criteria, switching costs, and timing deferral.
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# Deployment Architecture: Images and Trade-offs on x86 and ARM Servers

## When this decision has to be made
You must make this decision when you first plan enterprise-grade FastGPT service deployment, migrate existing deployments to new CPU architecture servers, or add new components that support multiple architectures.
If you do not confirm the matching relationship between architecture and images before deployment, you will face image pull failures, container startup errors, service unavailability, and extended deployment cycles.
If you discover architecture mismatches after deployment, you will need to rebuild images, adjust configurations, and restart services. This creates extra operational costs and risks disrupting normal business operations.
New server nodes that use an incompatible architecture with deployed images cannot join clusters, leading to wasted hardware procurement.
Confirming architecture and image selections in advance avoids future rework and ensures smooth deployment.

## Criteria matrix
| Candidate Deployment Scheme | Component Image Compatibility | Dependency Source Configuration Adaptability | Sandbox Resource Constraint Matching | Third-Party Acceleration Support | Image Maintenance Cost |
| --- | --- | --- | --- | --- | --- |
| Full x86 architecture deployment | Official x86 architecture component images run directly. ARM architecture images cannot run directly; cross-architecture compatibility is not stated in the documentation. | Only need to configure general dependency sources (NPM, PyPI). Use x86 architecture APT mirror addresses. | Default resource constraint configurations adapt to x86 server hardware specifications. Cross-architecture resource usage is not stated in the documentation. | Supports NVIDIA GPU acceleration, can use vLLM, Transformers inference backends. | Only maintain x86 architecture images; maintenance process is simple. |
| Full ARM architecture deployment | Official ARM architecture component images run directly. x86 architecture images cannot run directly; cross-architecture compatibility is not stated in the documentation. | Need to configure general dependency sources (NPM, PyPI). Use ARM architecture APT mirrors (such as Ubuntu Ports). | Default resource constraint configurations adapt to ARM server hardware specifications. Cross-architecture resource usage is not stated in the documentation. | Supports Apple Metal or corresponding ARM architecture GPU acceleration. Server-level ARM GPU acceleration support is not stated in the documentation. | Only maintain ARM architecture images; maintenance process is simple. |
| Mixed architecture deployment | Need to maintain both x86 and ARM architecture component images. Cross-architecture compatibility for some component images is not stated in the documentation. | Need to configure corresponding APT mirror sources based on node architecture; NPM and PyPI sources are general. | Need to adjust sandbox resource constraint configurations based on node architecture. Cross-architecture resource usage is not stated in the documentation. | Some nodes support corresponding architecture GPU acceleration; need to configure acceleration backends separately. | Need to maintain two architecture images; maintenance process is more complex. |

## Why each criterion matters
Component image compatibility is the foundation of normal service operation. Mismatched component images and deployment architectures cause image pull failures, container startup errors, and service runtime exceptions. For example, x86 architecture images run on ARM servers with an exec format error, preventing services from starting. If you do not confirm compatibility in advance, you will extend deployment cycles and may need to rebuild images, increasing operational costs. Official documentation does not clarify cross-architecture compatibility for some components, so you must verify if images for your target architecture are available before deployment.

Dependency source configuration adaptability directly affects the success rate of dependency installation in sandboxes. If APT mirror sources do not match the architecture, you will face issues like missing packages or version mismatches when installing system dependencies in sandboxes. For example, ARM architecture servers using x86 Ubuntu mirror sources cannot download architecture-appropriate software packages, leading to sandbox initialization failures. General NPM and PyPI sources work across architectures, but APT sources must be adjusted for architecture. This criterion is critical for normal sandbox operation.

Sandbox resource constraint matching must align with the hardware specifications of your deployed architecture servers. Resource utilization varies across architectures even with identical hardware specs. If you set resource limits too high, you will exhaust server resources. If you set limits too low, you will restrict sandbox runtime performance. Official documentation only provides default configuration values and does not clarify optimal configurations for different architectures, so you must adjust and verify based on your actual deployment architecture.

Third-party acceleration support significantly improves performance for tasks like large model inference and file parsing. Different architecture servers support different acceleration backends. x86 architectures typically support NVIDIA CUDA acceleration, while ARM architectures require adapted acceleration solutions. If you do not confirm acceleration support in advance, you will fail to fully utilize server hardware performance and reduce service response speeds. Official documentation only mentions acceleration support for some personal devices and does not clarify server-level ARM architecture acceleration support, so you must verify this in advance.

Image maintenance cost is a long-term factor to prioritize when selecting a deployment architecture. It directly impacts long-term operational workload. Mixed architecture deployments require maintaining two sets of images. Each component update requires building and pushing two images separately, increasing CI/CD workflow complexity. Single-architecture deployments only maintain one set of images, with a simpler process and lower error risk. This criterion is critical for long-term operational management.

## The cost of switching later
If you switch from one architecture deployment scheme to another after selecting an initial option, you will face multiple costs. First, you must migrate data and configurations: back up all business data stored in object storage and databases, as well as service configuration files, to ensure data integrity. Second, you will need a service downtime window. Switching architectures requires rebuilding images for the target architecture, adjusting all service configurations (such as dependency sources and resource constraints), and restarting all services. The length of the downtime window depends on the size of your service cluster, and may last several hours. You will also face additional validation work: retest component compatibility, dependency source configuration correctness, sandbox functionality availability, and third-party service integration, which requires significant test time and manpower. Additionally, if your original service had performance issues, you will need to re-optimize configurations after switching architectures, further increasing operational costs.

## When this decision can wait
You can delay this decision when your deployment environment’s CPU architecture is fixed and you have no plans to switch architectures in the short term. For example, if you have already procured a full x86 architecture server cluster and your business only needs to run services on this cluster, you can directly select x86 architecture images for deployment without considering ARM architecture adaptation. You can also temporarily use compatible images for internal testing when performance and compatibility requirements are low, without strictly following architecture selection rules. If you only deploy lightweight components and do not use features that require specific architecture optimization (such as GPU-accelerated large model inference), the matching relationship between architecture and images will have minimal impact on your service, and you can defer detailed selection decisions.

## Keep reading

- [Moving Apps Between Environments: What Export, Templates and Copies Carry Over](/guide/app-migration-across-envs)
- [Chat History Depth: How Many Rounds to Carry, Where to Cut and When to Use Variables](/guide/history-rounds-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers

> Criteria taken from the open-source repository and community threads, verified 2026-09-28.
