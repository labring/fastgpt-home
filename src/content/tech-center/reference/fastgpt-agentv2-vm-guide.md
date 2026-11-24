---
title: FastGPT Agent V2虚拟机的核心概念与使用说明
slug: /zh/reference/fastgpt-agentv2-vm-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/agentv2/vm
source_type: 官方文档小节
---

# FastGPT Agent V2虚拟机的核心概念与使用说明

## 结论
FastGPT Agent V2虚拟机是专为每个会话分配的物理隔离轻量Linux运行沙盒环境。它可为Agent提供真实的计算、代码执行与文件读写操作能力，支持AI通过实际运行代码解决复杂任务。可通过官方联调指南深入了解其运行设计细节。

## 具体怎么做
1. 进入FastGPT后台的应用构建模块，打开对话Agent V2专项配置页面，该页面位于应用构建导航下的对话Agent V2配置分类中。
2. 找到虚拟机配置入口，参考官方提供的联调指南完成相关配置与调试。

## 注意事项
1. 虚拟机仅为当前会话单独分配，不与其他会话共享运行环境，具备物理隔离特性。
2. 运行环境为轻量级Linux沙盒，仅支持Linux兼容的操作。
3. 需通过Agent调用才能使用虚拟机的相关能力，不可直接手动操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/agentv2/vm)
