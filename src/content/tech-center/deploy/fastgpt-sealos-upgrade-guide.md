---
title: Sealos环境下FastGPT的版本升级操作说明
slug: /zh/deploy/fastgpt-sealos-upgrade-guide
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos
source_type: 官方文档
---

# Sealos环境下FastGPT的版本升级操作说明

Sealos部署的FastGPT版本升级需遵循官方升级指引，所有操作需先查阅对应升级文档，明确目标版本的升级要求，严格禁止跨版本升级。跨版本升级可能引发系统异常或功能异常。例如，当前运行4.5版本时，升级至4.5.1版本仅需将镜像版本修改为v4.5.1，执行升级脚本后即可完成，若目标版本无需执行初始化步骤，则可直接完成升级流程。

## 升级操作步骤
1. 查阅[升级文档](../upgrading/upgrade-instruction.mdx)，确认目标版本，避免跨版本升级。
2. 打开Sealos的应用管理页面。
3. 页面内存在fastgpt、fastgpt-pro两个应用。
4. 点击对应应用右侧的三点图标选择变更，或进入应用详情页后点击右上角的变更按钮。
5. 修改镜像的版本号。
![../../../public/imgs/onsealos2.png]
6. 点击变更/重启按钮，系统将自动拉取对应版本的镜像完成更新。
7. 若目标版本要求执行初始化脚本，则完成更新后执行对应脚本。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
