---
title: 解决FastGPT中OneAPI无法正常更新及更换的问题
slug: /zh/troubleshoot/fastgpt-oneapi-replacement-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3412
source_type: GitHub issue
---

# 解决FastGPT中OneAPI无法正常更新及更换的问题

## 现象
使用FastGPT过程中，部分用户感知到OneAPI无法正常更新，提出更换中转服务产品的需求；另有用户提出，向量模型归一化功能需由中转服务后台适配实现。

## 可能原因
官方计划替换现有中转服务，将新搭建的中转服务后台UI集成到FastGPT中；原服务存在更新停滞的感知，同时该开源项目衍生出多个扩展项目，可供选择的中转服务类型较多。

## 排查步骤
1. 检查当前FastGPT所配置的中转服务类型与相关参数，确认当前使用的服务是否为OneAPI，确保配置信息准确无误。
2. 查看官方发布的关于中转服务替换的相关说明与更新计划，了解官方替代方案的开发进度与集成安排。
3. 调研可用的替代中转服务的相关信息与仓库地址，对比各选项的功能适配情况，选择符合需求的服务。

## 解决与验证
官方将搭建新的中转服务后台，并将其UI集成到FastGPT中，该方案将覆盖向量模型归一化的适配需求，为后续使用提供统一的服务入口。若需临时更换中转服务，可使用指定的替代服务，其仓库地址为https://github.com/Calcium-Ion/new-api。完成更换后，需验证中转服务与FastGPT的连接状态，确认相关功能可正常运行，向量模型归一化等需求可被适配。同时，原OneAPI仍在更新，若需继续使用，可确认其最新更新状态与衍生项目的适配情况，确保服务稳定运行。

> 来源: [FastGPT GitHub issue #3412](https://github.com/labring/FastGPT/issues/3412)
