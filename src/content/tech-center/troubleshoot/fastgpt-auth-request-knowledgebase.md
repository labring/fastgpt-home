---
title: 解决FastGPT嵌入系统后鉴权成功无法将问题传递至知识库
slug: /zh/troubleshoot/fastgpt-auth-request-knowledgebase
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1123
source_type: GitHub issue
---

# 解决FastGPT嵌入系统后鉴权成功无法将问题传递至知识库

## 现象
每次提问前调用后台鉴权接口，仅当接口返回code===200时触发知识库搜索，但当前配置下机器人直接返回回答，控制台未触发鉴权接口请求，无法将问题传递至知识库。

## 可能原因
1. 应用编排未配置正确的鉴权校验逻辑；
2. 用户身份参数未通过URL参数正确携带；
3. 外部鉴权相关的变量配置未正确关联至流程中。

## 排查步骤
1. 检查应用编排的变量配置，确认外部鉴权相关参数的关联状态；
2. 确认是否将用户特征ID以URL参数形式携带；
3. 查看控制台日志，确认鉴权接口是否被触发；
4. 验证编排中是否添加了HTTP校验模块。

## 解决与验证
编写HTTP模块完成鉴权校验，将配置中的用户身份变量（如Session-id）通过URL参数传递。调整应用编排配置，确保鉴权接口调用成功后再触发知识库搜索流程。验证时，确认鉴权接口被正常触发，当接口返回code===200时，问题可成功传递至知识库并返回对应回答。

> 来源: [FastGPT GitHub issue #1123](https://github.com/labring/FastGPT/issues/1123)
