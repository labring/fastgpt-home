---
title: 解决FastGPT多知识库挂载后检索结果异常问题
slug: /zh/troubleshoot/fastgpt-multi-kb-retrieval-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4257
source_type: GitHub issue
---

# 解决FastGPT多知识库挂载后检索结果异常问题

## 现象
部署版本为FastGPT社区版私有部署v4.9.1。存在两个知识内容无关联的知识库A与B。创建仅挂载知识库A的应用时，可正常检索到预期的A知识库知识；创建同时挂载A与B的应用时，无法检索到预期的A知识库知识，且通过检索步骤排查后确认，A知识库的知识未被纳入检索范围。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 检查当前应用的知识库挂载配置，确认知识库A与B均已正确添加至应用列表。
2. 单独创建仅挂载知识库B的应用，验证B的检索功能是否可正常返回结果。
3. 进入知识库A的管理页面，检查知识的导入状态与启用状态，确认知识已成功入库且未被禁用。
4. 核对检索触发的相关配置项，确认未设置仅检索特定知识库的限制规则。

## 解决与验证
完成排查后，根据实际发现的问题执行对应修复操作。修复完成后，创建同时挂载A与B的应用，验证可正常检索到知识库A的预期知识。

> 来源: [FastGPT GitHub issue #4257](https://github.com/labring/FastGPT/issues/4257)
