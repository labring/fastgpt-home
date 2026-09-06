---
title: 说明FastGPT Agent V2虚拟机的定义与使用方法
slug: /zh/glossary/fastgpt-agent-v2-vm-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/agentv2/vm
source_type: 官方文档
---

# 说明FastGPT Agent V2虚拟机的定义与使用方法

## 一句话定义
FastGPT Agent V2虚拟机是为每个对话会话动态预置并绑定的专用沙箱容器，用于支持Agent执行代码、读写文件与自定义运行环境。

## 在 FastGPT 里怎么用
开启"启用虚拟机"选项后，系统会为每个对话会话动态预置并绑定专用沙箱容器。可通过以下方式使用虚拟机功能：
1. 执行动态代码：通过代码执行器运行Python、Node.js甚至Shell脚本，自主进行复杂计算或数据处理；
2. 读写本地文件：在独立的`/workspace`目录下创建、修改和读取文件，包括生成图表、处理上传的CSV/Excel电子表格；
3. 环境自定义与启动脚本：关联SKILL包，或配置自定义启动脚本，在虚拟机拉起后且AI正式开始前自动在后台执行Shell命令，安装特定软件源、Python依赖包或系统级工具。
发布关联的SKILL包时，系统会自动应用项目根目录下`.gitignore`文件的忽略规则，若不存在则自动创建包含`node_modules`、`.venv`、`dist`等默认忽略项的文件，仅未被忽略的文件会被打包发布。

## 容易搞错的地方
发布关联的SKILL包时，若未关注`.gitignore`的忽略规则，可能导致需要的文件被忽略，或打包总体积超限导致发布失败。启动脚本仅在虚拟机拉起后且AI正式开始前自动执行，不会在其他阶段运行。不同对话会话的虚拟机拥有独立的运行环境与文件空间，不会共享资源。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/agentv2/vm)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
