---
title: FastGPT 镜像与架构适配 问题清单
slug: /zh/guide/image-architecture-issues
page_type: 问题清单聚合页
stage_members_heading: 已发布的文档清单（60 篇）
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT 镜像与架构适配 问题清单｜FastGPT 技术中心
meta_description: 查阅镜像与架构适配 问题清单，按症状与技术对象定位相关配置、排查步骤和已发布文档，结合版本边界确认适用条件。
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/中文-fastgpt.cn/guide/image-architecture-issues.md
source_sha256: e02d91ce102825a61603957ef44b5162d4a0d78d6967dcea42a9c71813933352
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT 镜像与架构适配 问题清单

本页汇总站内已发布的 60 篇容器镜像获取与处理器架构适配的问题，按症状分组列出，可按报错表现直接定位到对应文档。

## 属于这一环节的三类典型症状

1. 镜像拉取失败或版本不符
2. 处理器架构与镜像不匹配
3. 原生依赖在特定架构下加载失败

若症状与上述三类都不匹配，可返回[部署与环境问题全景](/zh/guide/deployment-issue-landscape)重新分流。

## 排查这一环节的通用顺序

1. 取后端服务日志中与该环节组件相关的完整报错，包括组件名与错误码
2. 在部署环境内验证该组件是否可独立访问，排除网络与权限因素
3. 核对该组件的版本与主服务版本的对应关系
4. 按下方清单中症状最接近的条目执行，完成后重新验证同一操作

## 已发布的文档清单（60 篇）

| 文档 | 类型 |
| --- | --- |
| [FastGPT 4.15.0-beta5版本镜像更新与配置操作指南](/zh/reference/fastgpt-beta5-mirror-update-guide) | 技术速查 |
| [FastGPT Agent Sandbox 镜像与环境变量配置说明](/zh/glossary/fastgpt-agent-sandbox-config-2) | 术语速查 |
| [FastGPT Agent沙箱的配置、镜像源设置及迁移流程说明](/zh/glossary/agent-sandbox-config-migration) | 术语速查 |
| [FastGPT OpenSandbox运行环境配置与CPU架构适配](/zh/deploy/fastgpt-opensandbox-env-config-2) | 部署场景 |
| [FastGPT私有部署镜像被扫描为挖矿程序的排查与解决](/zh/troubleshoot/fastgpt-mirror-mining-scan-troubleshoot) | 排错/错误码 |
| [FastGPT镜像拉取失败的排查与处理方法](/zh/glossary/fastgpt-image-pull-troubleshooting) | 术语速查 |
| [指导构建适配FastGPT的MinerU镜像并解决API调用422报错](/zh/glossary/fastgpt-compatible-mineru-mirror) | 术语速查 |
| [查询FastGPT各组件及部署源的官方标准镜像地址](/zh/reference/fastgpt-official-mirror-addresses) | 技术速查 |
| [解决CentOS部署FastGPT私有版时镜像拉取连接重置问题](/zh/troubleshoot/fastgpt-centos-image-pull-error) | 排错/错误码 |
| [解决FastGPT 4.8.0版本docker镜像编译失败的常见问题](/zh/troubleshoot/fastgpt-docker-build-troubleshooting) | 排错/错误码 |
| [解决FastGPT 4.8.13版本私有部署docker镜像构建失败问题](/zh/troubleshoot/fastgpt-docker-build-failure) | 排错/错误码 |
| [解决FastGPT 4.8.4版本docker compose拉取镜像停滞问题](/zh/troubleshoot/fastgpt-docker-compose-pull-stuck) | 排错/错误码 |
| [解决FastGPT Docker Compose启动时镜像拉取失败问题](/zh/troubleshoot/fastgpt-docker-compose-pull-error) | 排错/错误码 |
| [解决FastGPT Docker Compose部署的镜像与版本配置错误](/zh/troubleshoot/fastgpt-docker-deploy-error-fix) | 排错/错误码 |
| [解决FastGPT Docker构建时npm镜像配置冲突导致超时的问题](/zh/troubleshoot/fastgpt-docker-npm-registry-fix) | 排错/错误码 |
| [解决FastGPT Docker镜像构建与版本更新异常问题](/zh/troubleshoot/fastgpt-docker-build-update-troubleshooting) | 排错/错误码 |
| [解决FastGPT OpenSandbox镜像硬编码与配置缺失问题](/zh/troubleshoot/fastgpt-opensandbox-image-hardcode) | 排错/错误码 |
| [解决FastGPT v4.9.14版本构建mcp_server镜像失败的问题](/zh/troubleshoot/fastgpt-v4-9-14-mcp-build-error) | 排错/错误码 |
| [解决FastGPT代码沙箱镜像架构不匹配的报错问题](/zh/troubleshoot/fastgpt-code-sandbox-platform-mismatch) | 排错/错误码 |
| [解决FastGPT使用docker-compose拉取镜像提示镜像源不存在的问题](/zh/troubleshoot/fastgpt-docker-compose-image-pull-error) | 排错/错误码 |
| [解决FastGPT启动stawky/chatglm2-m3e镜像失败](/zh/troubleshoot/fastgpt-chatglm2-m3e-image-start-fail) | 排错/错误码 |
| [解决FastGPT增强PDF解析中marker镜像CPU启动失败问题](/zh/troubleshoot/fastgpt-marker-cpu-start-failure) | 排错/错误码 |
| [解决FastGPT安装时etcd镜像拉取失败的问题](/zh/glossary/fastgpt-install-etcd-image-pull-failed) | 术语速查 |
| [解决FastGPT安装过程中拉取quay.io镜像失败的问题](/zh/troubleshoot/fastgpt-quay-image-pull-fix) | 排错/错误码 |
| [解决FastGPT打包镜像加载Docker镜像元数据失败问题](/zh/troubleshoot/fastgpt-build-image-metadata-error) | 排错/错误码 |
| [解决FastGPT拉取阿里云容器镜像超时报错问题](/zh/troubleshoot/fastgpt-aliyun-registry-timeout) | 排错/错误码 |
| [解决FastGPT指定版本Docker镜像拉取失败问题](/zh/troubleshoot/fastgpt-docker-image-pull-failed) | 排错/错误码 |
| [解决FastGPT替换前端镜像后向量索引丢失问题](/zh/troubleshoot/fastgpt-frontend-index-loss) | 排错/错误码 |
| [解决FastGPT的mcp_server Docker镜像构建时的bun依赖报错问题](/zh/troubleshoot/fastgpt-mcp-server-build-bun-error) | 排错/错误码 |
| [解决FastGPT私有化部署arm架构镜像适配问题](/zh/troubleshoot/fastgpt-arm-image-deployment) | 排错/错误码 |
| [解决FastGPT私有部署ARM架构环境下code-sandbox启动失败问题](/zh/troubleshoot/arm-code-sandbox-start-failed) | 排错/错误码 |
| [解决FastGPT私有部署Redis镜像拉取失败的问题](/zh/troubleshoot/fastgpt-redis-pull-error-resolution) | 排错/错误码 |
| [解决FastGPT私有部署中镜像版本与配置不一致的问题](/zh/troubleshoot/fastgpt-docker-image-version-mismatch) | 排错/错误码 |
| [解决FastGPT私有部署后镜像重启报fetch failed的问题](/zh/troubleshoot/fastgpt-private-deploy-fetch-failed) | 排错/错误码 |
| [解决FastGPT私有部署容器镜像启动报错问题](/zh/troubleshoot/fastgpt-container-start-error) | 排错/错误码 |
| [解决FastGPT私有部署时Docker镜像构建失败的问题](/zh/troubleshoot/fastgpt-docker-build-fix) | 排错/错误码 |
| [解决FastGPT私有部署时sandbox镜像拉取失败的问题](/zh/troubleshoot/fastgpt-sandbox-image-pull-failure) | 排错/错误码 |
| [解决FastGPT私有部署构建自定义Docker镜像报错问题](/zh/troubleshoot/fastgpt-private-deploy-docker-build-error-2) | 排错/错误码 |
| [解决FastGPT私有部署构建镜像时resolve-url-loader CSS报错问题](/zh/troubleshoot/fastgpt-private-build-css-error) | 排错/错误码 |
| [解决FastGPT私有部署镜像打包后代码修改未生效的问题](/zh/troubleshoot/fastgpt-private-deploy-code-not-apply) | 排错/错误码 |
| [解决FastGPT私有部署镜像拉取时manifest未知报错问题](/zh/troubleshoot/fastgpt-private-deploy-manifest-error) | 排错/错误码 |
| [解决FastGPT调用MinerU API报错422及适配镜像构建问题](/zh/troubleshoot/fastgpt-mineru-error-build) | 排错/错误码 |
| [解决FastGPT部署中sandbox服务镜像未配置的问题](/zh/troubleshoot/fastgpt-sandbox-missing-image) | 排错/错误码 |
| [解决FastGPT部署时docker compose拉取镜像报undefined network vector错误](/zh/troubleshoot/fastgpt-deploy-network-vector-error) | 排错/错误码 |
| [解决FastGPT部署时docker compose拉取镜像超时失败问题](/zh/troubleshoot/fastgpt-docker-pull-timeout-error) | 排错/错误码 |
| [解决FastGPT部署时容器镜像无法下载的问题](/zh/troubleshoot/fastgpt-image-pull-failed) | 排错/错误码 |
| [解决FastGPT部署过程中镜像配置拉取失败的问题](/zh/glossary/fastgpt-image-configuration-pull-failure) | 术语速查 |
| [解决FastGPT部署镜像版本与发布包不一致的问题](/zh/troubleshoot/fastgpt-deploy-image-version-mismatch) | 排错/错误码 |
| [解决FastGPT配套bge-rerank-v2-m3镜像的Docker GPU部署启动错误问题](/zh/troubleshoot/bge-rerank-v2-m3-docker-gpu-fix) | 排错/错误码 |
| [解决FastGPT镜像标签与内置代码版本不一致问题](/zh/troubleshoot/fastgpt-image-version-mismatch) | 排错/错误码 |
| [解决FastGPT项目x86架构下mcp_server镜像打包失败的问题](/zh/troubleshoot/fastgpt-x86-mcp-build-failure) | 排错/错误码 |
| [解决Linux ARM64架构下FastGPT原生模块加载失败问题](/zh/troubleshoot/arm64-native-module-load-failed) | 排错/错误码 |
| [解决Mac ARM64环境下FastGPT依赖isolated-vm编译失败的问题](/zh/troubleshoot/fastgpt-mac-arm64-isolated-vm-fix) | 排错/错误码 |
| [解决WSL2 Ubuntu22.04部署FastGPT后镜像重启无法登录问题](/zh/troubleshoot/fastgpt-wsl2-restart-debug) | 排错/错误码 |
| [解决x86架构下FastGPT MCP服务镜像构建失败的问题](/zh/troubleshoot/fastgpt-mcp-image-build-failure) | 排错/错误码 |
| [解决本地ChatGLM镜像启动与配置文件关联的问题](/zh/troubleshoot/chatglm-docker-startup-config) | 排错/错误码 |
| [说明FastGPT Dockerfile镜像仓库的配置修改规则](/zh/glossary/fastgpt-dockerfile-registry-config) | 术语速查 |
| [说明FastGPT SSO服务镜像的部署配置方法](/zh/glossary/fastgpt-sso-image-deployment) | 术语速查 |
| [说明FastGPT部署Dockerfile的镜像源配置变更事项](/zh/glossary/fastgpt-dockerfile-registry-modification) | 术语速查 |
| [说明FastGPT镜像名的组成、分类与使用规则](/zh/glossary/fastgpt-image-name-rules) | 术语速查 |

## 这份清单的适用范围

清单中的条目来自可公开复现的情形，按症状归组。以下情形需要另行确认：

- 同一症状由多个原因共同导致时，需按上述顺序逐项排除
- 商业版特有配置项引发的同类症状
- 与具体基础设施环境耦合、无法在标准部署下复现的情形

## 继续阅读

- [FastGPT 部署与环境问题全景](/zh/guide/deployment-issue-landscape)
- [FastGPT 容器与编排 问题清单](/zh/guide/container-orchestration-issues)
- [FastGPT 版本升级 问题清单](/zh/guide/version-upgrade-issues)

## 参考资料

- [FastGPT Docker Compose 部署](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
- [FastGPT 升级说明](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## 问题仍未定位时

上述条目覆盖的是可依据公开信息复现与排查的情形。若问题涉及具体部署环境的配置细节、或需要结合运行日志逐项确认，可通过商务咨询获取部署阶段的技术支持；云服务形态可直接开始使用，不需要处理部署环节的环境依赖。

- [商务咨询](/zh/contact)： 获取私有部署与升级阶段的技术支持
- [立即开始](/zh/start)： 使用云服务形态，跳过环境准备
- [定价](/zh/price)： 对比云服务与私有部署两种形态的适用范围
