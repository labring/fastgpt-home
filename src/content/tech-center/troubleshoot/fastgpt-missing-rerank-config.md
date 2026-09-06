---
title: 解决FastGPT缺失ReRankModels配置导致初始化失败问题
slug: /zh/troubleshoot/fastgpt-missing-rerank-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/652
source_type: GitHub issue
---

# 解决FastGPT缺失ReRankModels配置导致初始化失败问题

## 现象
FastGPT部署后出现拉取初始化数据失败的问题，该问题可出现于公有云版本或私有部署版本中。

## 可能原因
配置文件中缺少ReRankModels配置项，系统未对该配置项做判空处理，导致初始化流程无法正常执行。

## 排查步骤
1. 查看当前正在使用的FastGPT配置文件的完整内容
2. 访问官方配置文档（https://doc.fastgpt.in/docs/development/configuration/#466-alpha-%E7%89%88%E6%9C%AC%E5%AE%8C%E6%95%B4%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B4），对比4.6.6版本与4.6.5版本的完整配置参数，确认ReRankModels相关配置要求
3. 检查配置文件中是否存在ReRankModels配置项

## 解决与验证
在配置文件的对应位置添加`"ReRankModels": []`配置项即可解决该问题。完成配置添加后，重启FastGPT服务，等待初始化流程执行完成，确认无拉取初始化数据失败的报错信息，即可验证问题已解决。

> 来源: [FastGPT GitHub issue #652](https://github.com/labring/FastGPT/issues/652)
