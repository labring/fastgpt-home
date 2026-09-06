---
title: FastGPT V4.8.2版本升级操作与更新内容说明
slug: /zh/deploy/upgrade-v4-8-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/482
source_type: 官方文档
---

# FastGPT V4.8.2版本升级操作与更新内容说明

## 这个版本改了什么
V4.8.2版本包含四项更新与修复。其一，新增js代码运行节点，支持更完整的type提醒，后续将继续完善该节点功能。其二，新增内容提取节点支持数据类型选择功能。其三，修复新增的站点同步无法使用的问题。其四，修复定时任务无法输入内容的问题。

## 升级前要确认的事
升级前需确认当前部署方式为Sealos或Docker。若使用Docker部署，需提前拉取最新docker-compose.yml文件参考配置。所有新增的sandbox容器简易不要开启外网访问，该容器未做凭证校验，直接暴露外网存在安全风险。

## 升级步骤（照做）
### Sealos部署步骤
1. 在应用管理中新建一个应用，镜像为registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:v4.8.1。
2. 无需配置外网访问地址，端口号设置为3000。
3. 部署完成后，复制该应用的内网地址。
4. 进入FastGPT应用的变更页面，修改环境变量，新增`SANDBOX_URL=内网地址`。

### Docker部署步骤
1. 新增一个名为sandbox的容器。
2. 为fastgpt和fastgpt-pro（商业版）容器新增环境变量`SANDBOX_URL`。
3. 拉取最新docker-compose.yml文件参考配置。

## 升级后怎么验证
升级完成后可通过以下方式验证配置与功能正常。其一，进入工作流编辑界面，确认js代码运行节点已新增，且节点支持完整的type提醒。其二，配置内容提取节点，确认可选择数据类型。其三，测试站点同步功能，确认可正常运行。其四，创建定时任务，确认可正常输入任务内容。其五，检查sandbox容器的运行状态，确认环境变量SANDBOX_URL配置正确。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/482)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
