---
title: 解决FastGPT源码部署文档中requirements文件名拼写错误问题
slug: /zh/troubleshoot/fastgpt-deploy-filename-typo-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/865
source_type: GitHub issue
---

# 解决FastGPT源码部署文档中requirements文件名拼写错误问题

## 现象
执行FastGPT源码部署的依赖安装步骤时，出现无法找到指定依赖文件的提示，或依赖安装流程失败。根据issue反馈，该问题由部署文档中的文件名拼写错误导致。

## 可能原因
FastGPT开发部署文档的源码部署章节中，将标准依赖文件名requirements.txt误写为requirments.txt，执行安装命令时，系统无法匹配到本地实际存在的正确文件，导致安装失败。

## 排查步骤
1. 查看部署文档中依赖安装步骤提及的文件名，确认是否存在拼写问题
2. 进入本地FastGPT源码目录，检查实际存在的依赖文件名
3. 对比文档提及的文件名与本地实际文件名是否一致

## 解决与验证
1. 将部署文档中的requirments.txt修正为requirements.txt
2. 若本地目录中已存在正确的requirements.txt文件，直接修正文档引用即可；若未存在，需先创建对应文件后再执行安装
3. 重新执行依赖安装命令，例如pip install -r requirements.txt
4. 确认依赖安装成功后，继续执行后续部署流程

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/865)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
