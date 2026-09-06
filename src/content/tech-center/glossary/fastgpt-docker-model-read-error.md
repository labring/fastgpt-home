---
title: 解决FastGPT Docker部署后创建知识库的model读取报错
slug: /zh/glossary/fastgpt-docker-model-read-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/842
source_type: 官方文档
---

# 解决FastGPT Docker部署后创建知识库的model读取报错

## 一句话定义
TypeError: Cannot read properties of undefined (reading 'model')是FastGPT在Docker部署环境下，执行创建知识库操作时触发的前端运行时错误，会直接导致页面崩溃，同时在浏览器控制台输出指定的错误堆栈信息。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错仅在使用Docker部署FastGPT后，进入知识库创建流程时触发。当执行创建知识库的操作时，页面会突然崩溃，此时打开浏览器开发者工具的控制台面板，可以看到如下错误信息：framework-4044c6ea3e034f81.js:9 TypeError: Cannot read properties of undefined (reading 'model')，同时伴随完整的调用堆栈，包括t.default、ak、i、oD、framework-4044c6ea3e034f81.js:9:98944、oO、oE、oP、r5等函数调用节点的详细信息，这些节点记录了错误发生时的前端代码执行路径。

## 容易搞错的地方
部分使用者可能误以为该报错与知识库的配置参数直接相关，或归因于后端配置问题，但根据现有反馈，该报错仅出现在Docker部署的场景中，未在其他部署方式下出现同类问题。该报错的直接原因是运行时无法获取到预期的model相关属性，错误堆栈指向前端框架的model属性读取逻辑，说明报错源于前端代码执行时的属性缺失，该报错的直接诱因与知识库配置环节无关。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/842)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/842)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
