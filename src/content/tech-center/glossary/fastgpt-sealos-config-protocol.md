---
title: 说明FastGPT中Sealos相关的开源协议与依赖源配置
slug: /zh/glossary/fastgpt-sealos-config-protocol
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/version/opensource/license
source_type: 官方文档
---

# 说明FastGPT中Sealos相关的开源协议与依赖源配置

## 一句话定义
Sealos是FastGPT开源协议附加条款的对接方，同时为FastGPT Agent沙箱提供依赖源配置支持。

## 在 FastGPT 里怎么用
一是开源协议相关：当使用FastGPT源码运营多租户SaaS服务，或修改移除控制台LOGO与版权信息时，需通过[REDACTED_PRIVATE_DATA]联系获取商业许可。二是依赖源配置：OpenSandbox与Sealos Devbox共用依赖源配置，可通过配置环境变量AGENT_SANDBOX_NPM_REGISTRY、AGENT_SANDBOX_PYPI_INDEX_URL、AGENT_SANDBOX_APT_MIRROR指定对应镜像源。其中apt镜像仅对root权限的Agent沙箱有效，初始化阶段不会执行apt-get update，arm64运行镜像需配置提供对应架构软件包的镜像地址。删除上述环境变量后，带有.copy备份的配置文件会恢复，无备份的文件会跳过。

## 容易搞错的地方
一是未获得明确书面授权前，不得使用fastgpt.io源码运营与fastgpt.io服务类似的多租户SaaS服务。二是apt镜像仅在root权限的Agent沙箱中生效，非root环境无法生效。三是删除配置环境变量后，仅带有.copy备份的配置文件会恢复，无备份的配置文件不会自动恢复。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/version/opensource/license)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
