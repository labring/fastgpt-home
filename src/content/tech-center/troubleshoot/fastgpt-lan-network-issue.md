---
title: 解决FastGPT私有部署断网后功能无法正常运行的问题
slug: /zh/troubleshoot/fastgpt-lan-network-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/706
source_type: GitHub issue
---

# 解决FastGPT私有部署断网后功能无法正常运行的问题

## 现象
使用Docker部署FastGPT并接入ChatGLM3，启动容器登录后功能正常。断开外部网络并在局域网运行时，创建应用、创建知识库等操作会卡在创建页面。重新连接外部网络后，所有功能恢复正常。

## 可能原因
未在当前issue线程中明确提及具体技术成因，需结合实际部署环境进行确认。

## 排查步骤
1. 确认FastGPT部署是否存在依赖外部网络的配置项或第三方资源。
2. 断开外部网络，在局域网环境下启动FastGPT容器并完成登录。
3. 执行创建应用、创建知识库等操作，观察是否出现卡顿现象。
4. 重新连接外部网络，再次执行相同操作验证功能恢复情况。

## 解决与验证
未在当前issue线程中获取到明确的解决措施。若需解决该问题，需结合实际部署环境排查依赖项，调整相关配置。验证方式为断开外部网络后，在局域网内执行功能操作，确认是否不再出现卡顿。

> 来源: [FastGPT GitHub issue #706](https://github.com/labring/FastGPT/issues/706)
