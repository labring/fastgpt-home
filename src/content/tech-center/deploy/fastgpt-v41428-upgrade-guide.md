---
title: FastGPT V4.14.28版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41428-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41428
source_type: 官方文档
---

# FastGPT V4.14.28版本升级操作与变更说明

本页面为FastGPT V4.14.28版本的官方升级说明文档，面向已完成FastGPT基础部署的自部署用户，提供该版本的标准化升级操作步骤与变更内容说明。FastGPT的自部署版本按版本系列划分，V4.14.28属于4.14.x版本升级分支，该分支包含多个迭代更新版本，每个版本均针对不同的运行问题进行优化。

## 升级操作步骤
该版本的升级操作仅需更新对应服务的镜像标签即可完成，具体步骤如下：
1.  更新fastgpt-app（FastGPT主服务）的镜像tag为v4.14.28；
2.  更新fastgpt-pro（FastGPT商业版）的镜像tag为v4.14.28。
其中，fastgpt-app为FastGPT的核心主服务，负责处理核心业务逻辑；fastgpt-pro为FastGPT的商业版服务，提供商业相关功能支持，两个服务需同步更新至v4.14.28版本的镜像，以保证版本一致性与功能兼容性。

## 本次变更说明
本次V4.14.28版本仅包含一项核心修复变更：修复admin服务的Node.js版本兼容问题。在自部署过程中，若部署环境的Node.js版本与官方要求不匹配，可能导致admin服务启动异常、运行报错或功能失效，本次变更针对该问题进行了优化，可有效避免因版本不匹配引发的服务异常，提升了版本部署的兼容性与稳定性。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41428
