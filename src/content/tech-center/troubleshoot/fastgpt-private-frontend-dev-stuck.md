---
title: FastGPT私有部署版本前端run dev启动卡住问题的排查指南
slug: /zh/troubleshoot/fastgpt-private-frontend-dev-stuck
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1481
source_type: GitHub issue
---

# FastGPT私有部署版本前端run dev启动卡住问题的排查指南

## 现象
FastGPT私有部署版本（app@4.8、nextjs@13.5.2、node@v20.12.0、pnpm@9.1.1、[REDACTED_PRIVATE_DATA].1）环境中，one-api模块编译启动正常，执行FastGPT前端run dev命令时进程卡住，无法完成启动流程。

## 可能原因
由于未获取到具体报错日志，可能原因需按实际环境确认，可涉及Node.js版本适配问题、依赖包安装异常、端口占用或Next.js运行配置冲突等场景。

## 排查步骤
1.  核对当前使用的环境版本，确认与部署版本（app@4.8、nextjs@13.5.2、node@v20.12.0、pnpm@9.1.1）一致。
2.  确认one-api模块正常启动，且相关端口未被其他进程占用。
3.  查看前端run dev命令执行时的控制台输出，记录所有报错信息。
4.  重新执行依赖安装命令，确认无依赖安装失败的情况。

## 解决与验证
若排查到具体报错信息，可根据报错文本调整对应配置或修复对应问题。若仅出现进程卡住无报错的情况，可尝试重启终端后重新执行run dev命令，或更换端口后再次启动。验证标准为前端run dev命令成功启动，无卡住情况，可正常访问前端服务。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1481)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
