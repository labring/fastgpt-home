---
title: 为FastGPT自部署环境配置系统插件远程调试功能
slug: /zh/deploy/fastgpt-self-host-plugin-debug-suite
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite
source_type: 官方文档
---

# 为FastGPT自部署环境配置系统插件远程调试功能

系统插件的远程调试功能套件用于将开发者本地运行的FastGPT系统插件临时接入FastGPT测试环境，适用于系统插件开发、联调和验收，不宜作为生产插件运行时使用。该功能仅商业版支持。优先推荐在FastGPT云服务版本中使用远程调试能力，自部署环境的运维成本更高，需额外维护Plugin Server、Connection Gateway、Redis、反向代理、TLS和密钥轮换等组件与配置。

默认的Docker Compose部署脚本仅包含FastGPT主服务和常规fastgpt-plugin运行环境，未包含Connection Gateway的公网WebSocket接入配置。这意味着自部署环境无法直接启用系统插件远程调试功能，需按照本文档的指引额外部署相关组件与配置。

### 部署配置步骤
1. 确认当前FastGPT环境为商业版，且调试中的插件仅用于测试场景，不投入生产运行。
2. 检查默认Docker Compose部署脚本的现有配置，确认未包含Connection Gateway的公网WebSocket接入相关配置项。
3. 额外部署Plugin Server、Connection Gateway、Redis三个核心组件，并完成反向代理、TLS证书配置与密钥轮换规则的设置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/remote-debug-suite)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
