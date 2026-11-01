---
title: FastGPT 配置与开发参考全景：按主题找到对应清单
slug: /zh/guide/reference-overview
page_type: 问题全景聚合页
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction
source_type: 站内已发布文档的程序化归类
check_day: 2026-10-19
article_section: 配置与开发参考
is_part_of: FastGPT 技术中心
date_modified: 2026-10-26
---

# FastGPT 配置与开发参考全景

本页把站内已发布的 909 篇配置与开发参考文档（速查、术语、教程、节点、集成、接口、知识库七个栏目）按主题归类，用于先判断一个问题属于哪个主题，再进入对应清单查具体条目。归类依据文档标题中的关键词。

## 先判断问题属于哪个主题

| 问题里出现的对象 | 指向的主题 |
| --- | --- |
| 版本号、升级脚本、环境变量变更、更新内容 | 版本升级与变更说明 |
| 语言模型、索引模型、重排模型、语音模型、模型渠道 | 模型接入与配置 |
| 对话 Agent、技能、插件、MCP、沙盒 | Agent、技能与插件 |
| 团队、成员、邀请、SSO、自定义域名 | 团队、账号与权限 |
| OpenAPI、接口、鉴权、分享链接、即时通讯渠道 | API 与对外发布 |
| 知识库、集合、检索、引用、第三方知识库 | 知识库与检索 |
| Docker、数据库、对象存储、镜像、环境变量 | 部署与环境配置 |
| 工作流、节点、HTTP 请求、循环与并行 | 工作流与节点 |

一篇文档同时涉及多个主题时，按上表从上到下第一个匹配的主题归入。

## 各主题的范围与条目数量

| 主题 | 范围 | 已发布文档 | 清单 |
| --- | --- | --- | --- |
| 版本升级与变更说明 | 各版本的升级操作、升级脚本、环境变量变更与更新内容 | 170 | [进入清单](/zh/guide/ref-upgrade-and-changes) |
| 模型接入与配置 | 语言模型、索引模型、重排模型与语音模型的接入和配置 | 77 | [进入清单](/zh/guide/ref-model-integration) |
| Agent、技能与插件 | 对话 Agent、技能、系统插件、MCP 与沙盒的配置 | 106 | [进入清单](/zh/guide/ref-agent-skill-plugin) |
| 团队、账号与权限 | 团队、成员、邀请、SSO 与自定义域名 | 52 | 见本页下方 |
| API 与对外发布 | OpenAPI 接口调用、鉴权，以及发布到即时通讯渠道与网页 | 110 | [进入清单](/zh/guide/ref-api-and-publishing) |
| 知识库与检索 | 知识库建设、第三方知识库接入、检索参数与引用 | 99 | [进入清单](/zh/guide/ref-knowledge-base) |
| 部署与环境配置 | Docker 部署、数据库、对象存储、镜像与环境变量 | 67 | [进入清单](/zh/guide/ref-deploy-and-env) |
| 工作流与节点 | 工作流各节点的用法、参数与运行规则 | 88 | [进入清单](/zh/guide/ref-workflow-nodes) |

以上 8 个主题共覆盖 769 篇文档，其中 7 个主题已建独立清单。另有 140 篇文档的主题较为分散（多为单个参数或字段的含义说明），尚未归入以上主题，可通过站内搜索按关键词查找。

## 篇数较少的主题

**团队、账号与权限（52 篇）**：篇数较少，不单独建清单，条目直接列在这里。

| 文档 |
| --- |
| [FastGPT OpenAPI接口调用配置与权限使用说明](/api/fastgpt-openapi-config) |
| [FastGPT SSO服务的部署配置与使用说明](/glossary/fastgpt-sso-service-config-2) |
| [FastGPT SSO标准接口获取用户信息的具体操作方法](/reference/fastgpt-sso-get-user-info) |
| [FastGPT 钉钉内置通用SSO协议的配置步骤速查](/reference/fastgpt-dingtalk-sso-quick-ref) |
| [FastGPT中SSO与飞书接入的Token配置说明](/glossary/fastgpt-sso-token-usage) |
| [FastGPT中国大陆版与国际版账号登录问题排查说明](/tutorial/fastgpt-account-login-troubleshooting) |
| [FastGPT中权限相关报错的排查与说明](/glossary/fastgpt-permission-errors-troubleshooting) |
| [FastGPT云服务的介绍及官方服务地址与账号规则说明](/tutorial/fastgpt-cloud-service-regional-addresses) |
| [FastGPT云服务的服务地址与账号互通规则说明](/tutorial/fastgpt-cloud-service-account-rules) |
| [FastGPT云服务账号登录与基础使用常见问题解答](/tutorial/fastgpt-cloud-login-basic-faq) |
| [FastGPT免登录窗口与问题扩展的常见报错处理](/glossary/fastgpt-login-window-extension-errors) |
| [FastGPT免登录窗口发布的配置、参数及使用说明](/integration/fastgpt-guest-link-config) |
| [FastGPT团队、成员组及资源权限精细化配置方法](/tutorial/fastgpt-team-role-permission) |
| [FastGPT团队协作者权限管理的配置与使用方法](/tutorial/fastgpt-team-collaborator-permissions) |
| [FastGPT团队及应用知识库资源权限管理说明](/tutorial/fastgpt-team-resource-permissions) |
| [FastGPT团队成员组权限配置与鉴权规则说明](/tutorial/fastgpt-team-permission-management) |
| [FastGPT团队成员身份认证与MongoDB报错排查指南](/glossary/fastgpt-member-auth-troubleshoot) |
| [FastGPT团队邀请链接的创建、使用与管理规则说明](/tutorial/fastgpt-team-invitation-link) |
| [FastGPT团队邀请链接的创建与使用完整操作说明](/tutorial/fastgpt-team-invite-link) |
| [FastGPT工作区团队权限与邀请配置](/tutorial/fastgpt-workspace-team-management) |
| [FastGPT工作区团队角色权限的配置与使用说明](/tutorial/workspace-team-role-permissions) |
| [FastGPT工作区自定义域名的配置与维护注意事项](/tutorial/fastgpt-workspace-custom-domain-2) |
| [FastGPT平台中团队模式的配置规则与参数说明](/glossary/fastgpt-team-mode-config) |
| [FastGPT权限系统的存储结构与设计规则速查](/reference/fastgpt-permission-storage-design) |
| [FastGPT知识库读权限成员可修改训练参数问题说明](/glossary/fastgpt-knowledge-base-permission-override) |
| [FastGPT管理员后台SSO与外部成员同步功能的配置方法](/reference/fastgpt-sso-external-member-sync) |
| [FastGPT自定义域名的完整配置流程与注意事项](/glossary/fastgpt-custom-domain-config-setup) |
| [FastGPT自定义域名配置的完整操作步骤](/tutorial/fastgpt-custom-domain-config) |
| [FastGPT获取团队成员列表的标准接口使用说明](/reference/fastgpt-team-member-api) |
| [FastGPT账号登录相关问题的排查与使用说明](/glossary/fastgpt-account-login-guide) |
| [为FastGPT配置标准OAuth2.0单点登录的完整接入参数](/tutorial/fastgpt-oauth2-sso-config) |
| [介绍FastGPT中国大陆版与国际版的账号登录规则](/glossary/fastgpt-cloud-edition-differences) |
| [介绍FastGPT团队邀请链接的创建、使用与失效管理规则](/tutorial/fastgpt-team-invitation-link-2) |
| [介绍FastGPT团队邀请链接的创建配置与使用流程](/glossary/fastgpt-team-invitation-link) |
| [获取FastGPT SSO登录重定向地址的技术速查](/reference/fastgpt-get-sso-redirect-url) |
| [解决FastGPT API调用超限与登录密钥配置错误问题](/glossary/fastgpt-common-error-fix-guide) |
| [详细介绍FastGPT SSO服务的docker-compose具体部署配置方法](/glossary/fastgpt-sso-docker-deploy) |
| [详细说明FastGPT免登录窗口shareId与URL参数提取用法](/glossary/fastgpt-shareid-url-params) |
| [说明FastGPT SSO服务镜像的部署配置方法](/glossary/fastgpt-sso-image-deployment) |
| [说明FastGPT团队邀请链接的创建步骤与使用规则](/glossary/fastgpt-team-invitation-link-2) |
| [说明FastGPT支持的三种团队模式及详细配置规则](/tutorial/fastgpt-team-mode-configuration-2) |
| [部署FastGPT SSO服务并完成对应对接配置的操作指南](/tutorial/fastgpt-sso-deployment-guide) |
| [配置FastGPT企业微信SSO单点登录的具体操作步骤](/tutorial/fastgpt-wecom-sso-config) |
| [配置FastGPT免登录分享链接及身份验证流程](/integration/fastgpt-share-link-auth) |
| [配置FastGPT免登录链接的身份验证接口与响应规则](/reference/fastgpt-no-login-link-auth) |
| [配置FastGPT商业版的单点登录及成员同步功能](/reference/fastgpt-pro-sso-member-sync) |
| [配置FastGPT团队模式与团队成员同步规则](/tutorial/fastgpt-team-mode-configuration) |
| [配置FastGPT团队模式以规范管理团队和成员资源](/tutorial/fastgpt-team-mode-config) |
| [配置FastGPT工作区的自定义域名与解析验证流程](/tutorial/fastgpt-workspace-custom-domain) |
| [配置FastGPT的SSO外部成员同步与单点登录功能](/tutorial/fastgpt-sso-member-sync-config) |
| [配置FastGPT的SSO登录与外部成员同步功能](/tutorial/fastgpt-sso-external-member-sync) |
| [配置飞书单点登录对接FastGPT的详细操作步骤与参数说明](/tutorial/feishu-sso-fastgpt-config) |

## 查阅时的三个建议

1. **先确认部署形态与版本。** 同一项配置在社区版、商业版与云服务版之间可能不同，旧版本的说明不一定适用于当前版本。
2. **涉及升级时先看版本升级清单。** 环境变量与升级脚本按版本列出，跨多个版本升级时需逐个核对。
3. **具体参数以官方文档为准。** 本页条目用于定位，参数取值与默认值请回到参考资料中的官方文档核对。

## 这张分类表的适用范围

归类依据是文档标题中的关键词，同一篇文档可能同时涉及多个主题，本页按首个匹配的主题归入一处。以下情形不在本页覆盖范围内：

- 具体报错信息的排查（见报错与排障问题全景）
- 部署过程中遇到的问题（见部署问题全景）
- 需要结合实例运行数据才能判断的性能与容量问题

## 继续阅读

- [FastGPT 报错与排障问题全景](/zh/guide/troubleshooting-overview)
- [FastGPT 部署问题全景](/zh/guide/deployment-issue-landscape)

## 参考资料

- [升级说明](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)
- [环境变量](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [Docker Compose 部署](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
- [模型配置说明](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)

## 需要进一步确认时

上述条目是可以依据公开文档核对的配置与开发说明。若需要结合具体部署环境、数据边界与业务流程确定方案，可通过商务咨询获取评估支持；云服务形态可直接开始使用，先验证业务可行性再决定部署形态。

- 商务咨询：结合现有系统讨论配置与开发参考目录的实施条件
- 立即开始：用真实样本验证配置与开发参考目录
- 定价：按配置与开发参考目录的部署需求比较可选形态
