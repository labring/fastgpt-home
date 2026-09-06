---
title: 解决FastGPT部署后断网导致页面与创建操作加载异常的问题
slug: /zh/troubleshoot/fastgpt-offline-loading-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2443
source_type: GitHub issue
---

# 解决FastGPT部署后断网导致页面与创建操作加载异常的问题

## 现象
完成FastGPT部署，获取所需的docker-compose.yml与配置文件后，通过docker compose up -d命令启动成功。断开主机网络连接，访问localhost:3000时页面加载失败，创建应用或知识库的操作持续处于加载状态。部分场景下知识库创建操作仍无法完成。

## 可能原因
相关功能依赖useQuery组件，该组件会校验网络状态，内网环境下可正常发起请求，但未配置网络的环境中无法触发请求，导致页面与操作无法正常加载。

## 排查步骤
1. 确认已获取FastGPT部署所需的docker-compose.yml与配置文件，且通过docker compose up -d命令正常启动，无启动报错。
2. 断开部署主机的所有网络连接。
3. 访问localhost:3000，观察页面加载状态与应用、知识库创建操作的反馈。
4. 打开浏览器开发者工具的网络面板，检查是否存在未触发的接口请求。

## 解决与验证
PR#2488针对该问题进行了优化，强制在未配置网络的情况下也可发出请求。完成包含该优化的FastGPT版本部署后，断开主机网络连接，访问localhost:3000，页面可正常加载，应用与知识库创建操作可正常触发流程。

> 来源: [FastGPT GitHub issue #2443](https://github.com/labring/FastGPT/issues/2443)
