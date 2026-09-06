---
title: 解决FastGPT本地启动ReferenceError: window is not defined报错问题
slug: /zh/glossary/fastgpt-local-start-window-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/465
source_type: 官方文档
---

# 解决FastGPT本地启动ReferenceError: window is not defined报错问题

## 一句话定义
ReferenceError: window is not defined是FastGPT启动并访问页面时出现的运行时报错。
## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错的触发场景覆盖两类FastGPT启动模式：一是私有部署版本启动后访问页面，二是公有云版本本地启动后访问页面。触发该报错的常见条件为使用Node.js 18版本，克隆项目代码后启动服务即可触发该报错。用户在反馈该问题前，需完成指定例行检查项，包括确认无同类已提交issue、完整查看项目README与官方文档、确认使用的API密钥可正常使用、愿意协助跟进测试与反馈问题，以及理解并认可项目维护规则。
## 容易搞错的地方
部分使用者会误将该报错归因于API密钥异常。该报错的触发与密钥可用性无关联。部分使用者会误以为该报错无法稳定复现，但按照克隆项目代码后启动服务的标准步骤即可触发该报错。部分使用者会忽略Node.js版本因素，该报错在使用Node.js 18版本启动时出现概率更高。部分使用者会混淆报错触发时机，该报错仅在启动服务后访问页面时出现，启动过程中不会触发该报错。

> [FastGPT GitHub issue 465](https://github.com/labring/FastGPT/issues/465), [FastGPT GitHub issue 1303](https://github.com/labring/FastGPT/issues/1303)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
