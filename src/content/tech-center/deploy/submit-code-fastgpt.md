---
title: 面向开发者向FastGPT开源仓库提交代码的详细操作流程
slug: /zh/deploy/submit-code-fastgpt
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# 面向开发者向FastGPT开源仓库提交代码的详细操作流程

## 提交前的准备工作
提交代码至FastGPT开源仓库前，需先完成官方仓库的Fork操作。FastGPT官方开源仓库地址为https://github.com/labring/FastGPT，通过该地址可获取可修改的代码副本，确保后续提交的代码基于官方最新版本。

## 提交代码的规范要求
提交代码需遵循少量提交的原则，每次提交仅解决一个独立问题。避免单次提交包含多个不相关的变更内容，确保代码变更的逻辑清晰，便于后续的审查与合并。

## 提交PR与后续处理
1.  向FastGPT官方仓库的main分支提交拉取请求（PR）。
2.  PR提交后，FastGPT团队或社区其他成员将对提交的代码进行审查。
3.  若遇到合并冲突或无法打开拉取请求，可参考GitHub官方拉取请求教程，教程链接为https://docs.github.com/en/pull-requests/collaborating-with-pull-requests，该教程可用于学习解决合并冲突及其他相关问题。
4.  当PR被成功合并后，提交者将被列入FastGPT开源仓库的贡献者列表，列表地址为https://github.com/labring/FastGPT/graphs/contributors。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/dev)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
