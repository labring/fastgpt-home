---
title: Choosing an Integration Channel: API, Share Link, Embed or MCP
slug: /en/guide/integration-channel-selection
page_type: Decision matrix
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Compare API access, share links, embedded chat, and MCP for FastGPT using authentication, user experience, and integration requirements.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Choosing an Integration Channel: API, Share Link, Embed or MCP | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 决策矩阵页-第2批/英文-fastgpt.io/guide/integration-channel-selection.md
source_sha256: 8bf358232f61d8b9da4815ae5d49d40ff776aa44d03ab78627c53dfd7e947006
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository and community threads, verified 2026-09-14.
---

# Choosing an Integration Channel: API, Share Link, Embed or MCP

## When this decision has to be made
You must make this decision when you need to expose the capabilities of FastGPT-built applications to external users, or expose internal tools to external users via FastGPT.
If you select an integration method before clarifying external scenario details like user scale, permission requirements and security standards, you will need to refactor your access link later. This increases development costs, requires reconfiguring permission systems and disrupts existing business stability.
Delaying selection until external collaboration projects launch will cause project delays, missed service delivery timelines and lost business opportunities.
You also need to make this decision when integrating multiple external tools, or enabling cross-team or cross-organization application calls. Clarifying access channel boundaries avoids permission chaos and call failures.
Additionally, if your enterprise needs to meet compliance requirements such as data privacy and access auditing, different integration channels carry different compliance costs. You must select a channel in advance to align with these requirements.
Per FastGPT’s MCP tool access requirements, if you need to call internal or local tools, you must confirm the appropriate access plan in advance. Without this, you cannot achieve secure internal tool calls, limiting your application’s deployment scenarios.

## Criteria matrix
| Candidate | API Documentation Support | Authentication Method | Network Reachability Requirement | Integration Scenarios | Development Cost | Security Protection Capabilities |
| --- | --- | --- | --- | --- | --- | --- |
| API Call | DevAPI and System OpenAPI documentation | Configure the appropriate API Key and required application context | The caller can reach the FastGPT service | API integration with systems and workflows | Varies with integration scope | Validate authentication, request restrictions, and access boundaries for each endpoint |
| Share Link | Share integration instructions | Custom share identity verification is a commercial-edition feature; uid must be at most 255 UTF-8 bytes and exclude pipe, slash, and backslash characters | User browsers can reach the share page and required services | Chat interactions with a specified application | Low for basic sharing | Validate identity restrictions and chat file allowlists for the application |
| Embed | Embedding instructions | Explicitly integrate share-link authentication; custom share identity verification is a commercial-edition feature | User browsers can load FastGPT pages and resources | Add chat capabilities to existing webpages | Depends on page and identity integration | Validate share authentication, CSP, and iframe policies; handle cross-origin API requests according to configuration |
| MCP | MCP publishing and tool integration instructions | Configure an app publishing key or remote tool authentication headers according to call direction | Clients can reach published app endpoints; FastGPT can reach remote tools it calls | Publish apps to MCP clients or integrate MCP tools into workflows | Depends on client compatibility and tool integration | Validate app-publishing and remote-tool permission boundaries separately |

## Why each criterion matters
Each criterion directly impacts your integration efficiency, security, deployment complexity and business alignment.
### API Documentation Support
API documentation affects integration efficiency. API Call provides DevAPI and System OpenAPI documentation for deep system integration. Share Link and Embed have their own integration instructions for quickly adding chat entry points. Use a compatible MCP client; custom adapters are needed only for unsupported integration requirements.
### Authentication Method
Configure authentication explicitly throughout the call chain. Use the appropriate API Key for API access. Share Link and Embed use share-link authentication, and custom share identity verification is a commercial-edition feature. Configure keys or authentication headers separately for MCP app publishing and remote tool calls, then validate the resulting resource permissions.
### Network Reachability Requirement
The caller or user browser must be able to reach the required service. Choose private-network or public deployment according to the business scenario, and configure appropriate TLS and access controls for public services. For app publishing through the independent SSE MCP service, `SSE_MCP_SERVER_PROXY_ENDPOINT` sets the client-facing address. For remote tool calls, validate reachability from FastGPT to the tool service.
### Integration Scenarios
Integration scenarios determine the applicable scope of each access channel. API Call supports integration into any system or workflow, enabling complex business logic, ideal for enterprise-grade deep integration. Share Link only supports direct chat access, suitable for quickly building external chat services. Embed supports embedding into webpages, ideal for adding FastGPT chat capabilities to existing websites. MCP supports integrating tools into workflows and exposing application calls externally, ideal for consolidating multiple internal tools.
### Development Cost
Development costs depend on business logic, identity integration, and client compatibility. Basic Share Link publishing can provide a quick validation path. API integration requires adapting application logic, Embed requires page and identity integration, and MCP requires configuring a compatible client or tool server and its authentication.
### Security Protection Capabilities
Security validation should cover API permissions, share identity checks and upload-type restrictions, embedded-page policies, and the actual resource permissions throughout MCP calls. Verify these controls against the application and deployment configuration.

## The cost of switching later
Once you have selected an integration channel, switching will incur multiple types of costs.
First, identity and conversation continuity: API and Share Link conversations are persisted on the server. Validate appId, chatId, user identifiers, and read authorization, and migrate or map identities and conversations where needed.
Second, permission and call-record changes depend on the actual integration. Review API Keys, share authentication, MCP addresses, and tool permissions for the new channel.
Third, cutover and validation: test through a validation environment or parallel entry point, then schedule a switching window according to identity and data-continuity requirements. Cover functionality, performance, access controls, and existing call scenarios.
Additionally, you will face user adaptation costs: existing users familiar with Share Link will need guidance to adopt the new access method, increasing operational overhead.

## When this decision can wait
You can delay this decision in the following scenarios:
1.  If your enterprise only uses FastGPT’s application capabilities internally, with no need to expose services or integrate externally.
2.  If your external service scenarios are unclear, such as undetermined user scale, permission requirements or security standards. You can use a temporary access method like FastGPT’s internal chat interface first, and finalize selection once scenarios are clarified.
3.  If your project timeline is tight and you do not have time to select an integration channel, you can use a default option like Share Link first, and optimize after the project launches.
4.  If your external service is only temporary, such as short-term external demos or testing, with no need for long-term maintenance of the access channel, you can delay formal selection.
Note that if you plan to launch external services later, you still need to plan integration channel selection in advance to avoid compatibility issues later.

## Keep reading

- [Releasing and Regression-Testing an App: Versions, Canary and Rollback](/en/guide/app-release-and-regression)
- [Where Files Live: Local Volumes, Object Storage and External S3](/en/guide/file-storage-selection)

## References

- [FastGPT v4.17.0 share link authentication and uid rules](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/guide/build/publish/link.mdx)
- [FastGPT v4.17.0 MCP app publishing](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/guide/build/publish/mcp_server.mdx)
- [FastGPT v4.17.0 MCP tool integration](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/guide/build/tools/mcp_tools.mdx)
- [Share conversation initialization from MongoChat](https://github.com/labring/FastGPT/blob/v4.17.0/projects/app/src/pages/api/core/chat/outLink/init.ts)
- [Chat persistence with shareId and outLinkUid](https://github.com/labring/FastGPT/blob/v4.17.0/packages/service/core/chat/saveChat.ts)
- [OpenAPI local server example](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/openapi/intro.mdx)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
