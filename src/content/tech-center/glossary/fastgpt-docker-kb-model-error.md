---
title: 解决FastGPT创建知识库时的model属性读取报错问题
slug: /zh/glossary/fastgpt-docker-kb-model-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/842
source_type: 官方文档
---

# 解决FastGPT创建知识库时的model属性读取报错问题

## 一句话定义
该报错指使用Docker部署FastGPT后，创建知识库时控制台抛出TypeError: Cannot read properties of undefined (reading 'model')的JavaScript运行时错误，进而导致页面无法正常加载并崩溃，具体表现为创建知识库时页面无响应或直接退出。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错仅在使用Docker部署FastGPT后，执行创建知识库的操作时触发。操作流程为完成Docker部署后，进入知识库创建页面并执行创建操作，即可触发该报错。操作过程中控制台会输出类似framework-4044c6ea3e034f81.js:9 TypeError: Cannot read properties of undefined (reading 'model')的错误信息，完整错误堆栈包含t.default (440-5df7ec0198023c59.js:1:4607)、ak、i、oD等函数调用环节，以及framework-4044c6ea3e034f81.js和440-5df7ec0198023c59.js等前端文件的调用链路，具体错误位置在t.default函数调用环节。

## 容易搞错的地方
部分使用者可能误将该报错归因于模型配置错误或知识库参数设置异常，实际错误核心为代码尝试读取undefined对象的model属性。该报错的触发场景仅限Docker部署后的创建知识库环节，其他部署方式或操作场景不会出现该报错。需通过控制台输出的错误栈信息定位具体的代码执行环节，无需直接调整知识库配置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/842)
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/842)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
