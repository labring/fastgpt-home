---
title: 解决FastGPT中系统级全局变量管理缺失的问题
slug: /zh/troubleshoot/fastgpt-system-global-vars
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4609
source_type: GitHub issue
---

# 解决FastGPT中系统级全局变量管理缺失的问题

## 现象
当前FastGPT仅支持会话级全局变量，无法实现跨会话、跨应用的变量共享，无法持久化存储插件所需的token等需长期保留的信息，难以满足插件接口token定期存储、不同会话或应用间共享信息、持久化存储记忆知识等场景的全局变量管理需求。
## 可能原因
系统仅内置了会话级的全局变量存储能力，未提供系统级的全局变量管理模块，无法实现全局范围的变量共享与持久化存储，无法覆盖跨会话、跨应用的变量管理场景。
## 排查步骤
1. 确认当前使用的FastGPT版本是否仅支持会话级全局变量；
2. 检查业务场景是否需要跨会话、跨应用的变量共享，或需要持久化存储token、记忆知识等信息；
3. 查看项目官方文档中是否有系统级变量管理的相关配置说明。
## 解决与验证
当前线程未提供具体的配置方法或实现方案，需按实际环境确认。可通过查看项目官方文档，或提交功能需求申请获取对应支持。
> 来源: [FastGPT GitHub issue #4609](https://github.com/labring/FastGPT/issues/4609)
