---
title: FastGPT私有部署MongoDB版本安全漏洞升级指导
slug: /zh/troubleshoot/fastgpt-mongodb-security-upgrade
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3190
source_type: GitHub issue
---

# FastGPT私有部署MongoDB版本安全漏洞升级指导

## 现象
当前FastGPT私有部署版本为4.8.13，环境中MongoDB版本为5.0.18，该版本被扫描出存在安全漏洞。官方默认搭载的MongoDB版本即为5.0.18，需确认自主升级的可行性及对FastGPT功能的影响。

## 可能原因
FastGPT私有部署4.8.13版本默认使用MongoDB 5.0.18版本，该版本存在公开安全漏洞。用户希望升级至符合安全要求的新版本（最低要求为5.0.25），但不确定升级是否会影响FastGPT的正常功能。

## 排查步骤
1. 查看当前MongoDB的实际运行版本，可通过MongoDB命令行执行`db.version()`获取版本信息。
2. 核对FastGPT官方推荐的MongoDB兼容版本要求，当前提及最低兼容版本为5.0.25。
3. 确认当前FastGPT业务是否依赖MongoDB的特定版本特性，需按实际环境确认。

## 解决与验证
1. 如需升级MongoDB版本，可按照MongoDB官方发布的升级流程执行操作，升级前需备份MongoDB全量数据。
2. 升级完成后，启动FastGPT服务，验证核心业务功能是否正常运行。
3. 再次扫描或查看MongoDB版本，确认已升级至目标安全版本。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3190)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
