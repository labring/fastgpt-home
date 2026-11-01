---
title: FastGPT 配置与开发参考：部署与环境配置（67 篇清单）
slug: /zh/guide/ref-deploy-and-env
page_type: 问题清单聚合页
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker
source_type: 站内已发布文档的程序化归类
check_day: 2026-10-19
article_section: 配置与开发参考
is_part_of: FastGPT 技术中心
date_modified: 2026-10-26
---

# FastGPT 配置与开发参考：部署与环境配置

本页汇总站内已发布的Docker 部署、数据库、对象存储、镜像与环境变量相关文档，共 67 篇，按标题排序列出。

## 这一类文档通常在讲什么

1. Docker 与 Docker Compose 部署的步骤与常见问题
2. MongoDB、PostgreSQL 与对象存储的配置和报错
3. 部署用到的镜像地址与环境变量规则

若问题与上述三个方向都不匹配，可返回[配置与开发参考全景](/zh/guide/reference-overview)查找部署依赖与环境变量之外的关联主题。

## 阅读顺序建议

1. 先从表中选择与部署依赖与环境变量当前问题直接对应的条目，核对文档适用版本
2. 对照部署依赖与环境变量的关联条目，列出需要共同配置的依赖项
3. 将部署依赖与环境变量涉及的设置项逐一与参考资料中的官方说明对照

## 已发布的文档清单（67 篇）

| 文档 |
| --- |
| [FastGPT 4.15.0-beta5版本镜像更新与配置操作指南](/reference/fastgpt-beta5-mirror-update-guide) |
| [FastGPT App与Admin共享环境变量配置参数速查](/reference/fastgpt-app-admin-shared-env-vars) |
| [FastGPT Connection Gateway的部署配置与参数说明](/reference/fastgpt-connection-gateway-deploy) |
| [FastGPT Docker Compose部署的配置与操作说明](/tutorial/fastgpt-docker-compose-deploy) |
| [FastGPT Docker版本部署配置与三种部署方法](/tutorial/fastgpt-docker-deployment-methods) |
| [FastGPT Docker环境MongoDB数据恢复与迁移操作](/reference/fastgpt-docker-mongo-restore-migration) |
| [FastGPT Docker部署场景下常见问题的排查与解决指南](/reference/fastgpt-docker-deploy-common-issues) |
| [FastGPT MinIO对象存储配置参数与操作说明](/reference/fastgpt-minio-storage-config) |
| [FastGPT Volume Manager环境变量配置参数说明](/reference/fastgpt-volume-manager-env-config) |
| [FastGPT docker compose部署新增agent-sandbox配置指南](/reference/fastgpt-docker-compose-add-agent-sandbox-config) |
| [FastGPT 环境变量速查全表（136 项 · 按用途分组）](/reference/env-variables-reference) |
| [FastGPT 自托管场景Admin额外环境变量配置参考](/reference/fastgpt-admin-extra-env-vars) |
| [FastGPT 自托管部署的App额外环境变量配置速查](/reference/fastgpt-self-hosted-app-env-vars) |
| [FastGPT 阿里云OSS对象存储配置方法速查](/reference/fastgpt-aliyun-oss-config-guide) |
| [FastGPT中CHAT_TITLE_MODEL环境变量的配置说明](/glossary/chat-title-model-env-var) |
| [FastGPT中relation "modeldata"相关数据库报错的处理方法](/glossary/fastgpt-modeldata-relation-errors) |
| [FastGPT中数据库column列相关报错的排查与说明](/glossary/fastgpt-database-column-troubleshooting) |
| [FastGPT使用Helm方式部署的相关说明与注意事项](/glossary/fastgpt-helm-deployment-guide) |
| [FastGPT商业版各部署方式的收费与服务说明](/reference/fastgpt-commercial-pricing-deployment) |
| [FastGPT容器restart: always自动重启参数配置速查](/glossary/fastgpt-container-restart-always-config) |
| [FastGPT工作流相关环境变量与功能配置说明](/glossary/fastgpt-workflow-configuration) |
| [FastGPT应用与管理后台日志指标追踪环境变量配置速查](/reference/fastgpt-log-metrics-tracing-config) |
| [FastGPT开源版config.json配置迁移为环境变量的操作指南](/reference/fastgpt-open-source-config-migration) |
| [FastGPT本地部署调试配置与新建工作流报错处理](/glossary/fastgpt-local-debug-error-resolution) |
| [FastGPT私有部署Mongo相关配置选项的使用与排障](/glossary/fastgpt-mongo-deploy-options) |
| [FastGPT私有部署数据库表或字段缺失报错排查指南](/glossary/fastgpt-private-deploy-db-missing-error) |
| [FastGPT腾讯云COS对象存储的配置参数与操作步骤](/reference/fastgpt-tencent-cos-storage-config) |
| [FastGPT自托管部署与运行常见问题排查速查](/reference/fastgpt-self-hosted-faq-check) |
| [FastGPT自部署时常用服务及配置的环境变量说明](/reference/fastgpt-self-deploy-env-vars) |
| [FastGPT部署与GPT4-V功能使用的常见报错排查方法](/glossary/fastgpt-deployment-gpt4v-troubleshooting) |
| [FastGPT部署时修改环境变量的配置要求与操作步骤](/reference/fastgpt-deploy-env-config) |
| [FastGPT部署的域名与运行时环境变量配置说明](/reference/fastgpt-domain-runtime-env-config) |
| [FastGPT镜像拉取失败的排查与处理方法](/glossary/fastgpt-image-pull-troubleshooting) |
| [介绍FastGPT商业版的功能差异、部署配置与收费规则](/tutorial/fastgpt-commercial-edition-config-pricing) |
| [介绍FastGPT环境中m3e-large-api的部署与使用步骤](/glossary/fastgpt-m3e-large-api-usage) |
| [介绍FastGPT自部署的环境与核心配置项设置](/tutorial/fastgpt-self-host-config) |
| [介绍FastGPT部署中环境变量的配置规则与用法](/glossary/fastgpt-deployment-environment-vars) |
| [使用Docker Compose部署FastGPT的完整操作步骤与配置说明](/tutorial/fastgpt-docker-compose-deploy-2) |
| [完成Docker部署FastGPT的Mongo数据库手动更新](/reference/fastgpt-docker-mongo-manual-update) |
| [快速准备FastGPT自部署所需的Docker和Docker-compose运行环境](/reference/fastgpt-deploy-docker-compose-env) |
| [排查FastGPT私有部署的docker-compose配置格式错误问题](/glossary/fastgpt-private-deploy-compose-format-error) |
| [查询FastGPT各组件及部署源的官方标准镜像地址](/reference/fastgpt-official-mirror-addresses) |
| [环境变量清单生成器：136 项分 15 组，按部署形态与要启用的能力筛出该配哪些](/reference/env-variable-checklist) |
| [解决FastGPT安装时etcd镜像拉取失败的问题](/glossary/fastgpt-install-etcd-image-pull-failed) |
| [解决FastGPT本地部署的Maximum call stack size exceeded报错问题](/glossary/fastgpt-max-stack-exceeded-error) |
| [解决FastGPT私有化部署中modeldata表不存在的报错问题](/glossary/fastgpt-private-deploy-modeldata-error) |
| [解决FastGPT私有部署中MongoDB副本集初始化报错问题](/glossary/fastgpt-mongodb-replica-set-init) |
| [解决FastGPT私有部署新建工作流的客户端异常报错](/glossary/fastgpt-private-deploy-workflow-client-exception) |
| [解决FastGPT私有部署时Mongo服务的插值格式报错问题](/glossary/fastgpt-mongo-interpolation-error) |
| [解决FastGPT私有部署过程中出现的docker build failed to solve报错](/glossary/fastgpt-docker-build-failed-solve) |
| [解决FastGPT自托管部署Mongo副本集自动初始化失败问题](/reference/fastgpt-mongo-replica-init-fail) |
| [解决FastGPT自部署时Mongo副本集自动初始化失败问题](/reference/fastgpt-mongo-replica-init-fix) |
| [解决FastGPT部署中数据库初始化连接失败的问题](/glossary/fastgpt-database-connection-error) |
| [解决FastGPT部署过程中镜像配置拉取失败的问题](/glossary/fastgpt-image-configuration-pull-failure) |
| [讲解FastGPT中not-null数据库约束报错的相关处理方法](/glossary/fastgpt-null-constraint-error) |
| [讲解FastGPT部署与安全场景中的target术语含义与用法](/glossary/fastgpt-target-term-guide) |
| [详细说明FastGPT自托管环境配置的服务与环境变量规则](/glossary/fastgpt-self-hosted-env-config) |
| [说明FastGPT Dockerfile镜像仓库的配置修改规则](/glossary/fastgpt-dockerfile-registry-config) |
| [说明FastGPT中Mongo数据库的连接配置与适配要点](/glossary/fastgpt-mongo-connection-notes) |
| [说明FastGPT中fastgpt-plugin的定义与部署配置](/glossary/fastgpt-plugin-deployment-config) |
| [说明FastGPT中m3e-large-api的部署与使用要点](/glossary/fastgpt-m3e-large-api-usage-2) |
| [说明FastGPT商业版的功能差异、部署方案与收费标准](/tutorial/fastgpt-commercial-edition-specs) |
| [说明FastGPT无需Docker环境的部署相关问题](/glossary/fastgpt-dockerless-deployment) |
| [说明FastGPT通过Helm Chart部署的相关配置与操作方法](/glossary/fastgpt-helm-chart-install) |
| [说明FastGPT镜像名的组成、分类与使用规则](/glossary/fastgpt-image-name-rules) |
| [说明FastGPT项目VSCode调试配置的编写方法](/glossary/fastgpt-vscode-debug-config) |
| [配置FastGPT对接Cloudflare R2对象存储的参数与步骤](/reference/fastgpt-cloudflare-r2-storage-config) |

## 这份清单的适用范围

这份部署依赖与环境变量清单依据文档标题归类；跨主题的问题还需查阅关联目录。使用时先核对以下条件：

- 部署依赖与环境变量的文档版本与当前部署版本是否一致
- 当前版本是否包含部署依赖与环境变量所需的商业版功能
- 部署依赖与环境变量涉及的环境依赖是否与私有化部署文档一致

## 继续阅读

- 从部署依赖与环境变量返回[FastGPT 配置与开发参考全景](/zh/guide/reference-overview)
- 核对部署依赖与环境变量前阅读[版本升级与变更说明](/zh/guide/ref-upgrade-and-changes)
- 配合部署依赖与环境变量查看[模型接入与配置](/zh/guide/ref-model-integration)

## 参考资料

- [Docker Compose 部署](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
- [环境变量](https://doc.fastgpt.cn/zh-CN/self-host/config/env)

## 需要进一步确认时

这些条目可用于核对部署依赖与环境变量的配置前提。确定实施方式前，建议准备当前版本、部署形态和一组真实样本；涉及现有系统的数据边界或业务流程时，可据此进行商务咨询并评估实施条件。

- 商务咨询：结合现有系统讨论部署依赖与环境变量的实施条件
- 立即开始：用真实样本验证部署依赖与环境变量
- 定价：按部署依赖与环境变量的部署需求比较可选形态
