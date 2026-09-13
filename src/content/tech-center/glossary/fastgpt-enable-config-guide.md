---
title: FastGPT Agent与日志启用配置的含义与使用说明
slug: /zh/glossary/fastgpt-enable-config-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/agentv2/vm
source_type: 官方文档
---

# FastGPT Agent与日志启用配置的含义与使用说明

## 一句话定义
FastGPT的enable配置包含Agent虚拟机启用与日志功能启用两类，用于开启对应功能以支持沙箱运行或日志采集。
## 在 FastGPT 里怎么用
1. Agent虚拟机启用：在Agentv2的虚拟机配置页面开启“启用虚拟机”选项，开启后系统为每个对话会话动态预置并绑定专用沙箱容器。支持运行Python、Node.js、Shell脚本，在独立的/workspace目录下创建、修改和读取文件，可关联SKILL包或配置启动脚本，在虚拟机拉起后且AI正式开始前自动执行Shell命令，用于安装软件源、Python依赖包或系统级工具。
2. 日志功能启用：通过修改环境变量配置，包括`LOG_ENABLE_CONSOLE=true`开启控制台打印，`LOG_CONSOLE_LEVEL=debug`设置控制台打印最低日志等级，`LOG_ENABLE_OTEL=true`开启OTEL日志收集，`LOG_OTEL_LEVEL=info`设置OTEL日志收集最低等级，`LOG_OTEL_SERVICE_NAME=fastgpt-client`设置服务名称，`LOG_OTEL_URL=http://localhost:4318/v1/logs`设置OTLP收集器地址。配置完成后需重启FastGPT生效。
## 容易搞错的地方
1. Agent虚拟机启用后，仅可在独立的/workspace目录下进行文件读写操作。
2. 日志功能的OTLP收集器地址需完整包含`/v1/logs`路径，不可遗漏。
3. Agent虚拟机的启动脚本需在虚拟机拉起后且AI正式开始前执行，需使用Shell命令格式。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/agentv2/vm)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
