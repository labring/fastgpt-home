---
title: 快速搭建FastGPT四类核心基础应用的操作速查指南
slug: /zh/reference/fastgpt-four-apps-quick-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/getting-started/quick-start
source_type: 官方文档小节
---

# 快速搭建FastGPT四类核心基础应用的操作速查指南

## 结论
本文可帮助你快速完成FastGPT四类核心基础应用的搭建，覆盖对话助手、知识库问答、工作流编排与智能数据分析场景。完成搭建后可通过对应测试资源验证应用运行效果。

## 具体怎么做
1. 提前准备所需资源：可用AI模型（如GLM-5.1）、知识库测试文件（如民法典）、邮箱SMTP授权码（如需测试邮件工具）、Excel/CSV示例文件（如需测试数据分析）。
2. 依次搭建四类应用：
   - 对话Agent：创建企业邮件撰写助手应用
   - 知识库+对话Agent：关联对应知识库搭建问答助手
   - 工作流：配置内容审核与自动改写流程
   - Agent V2：搭建智能数据分析Agent
3. 将原文中的参数与Prompt替换为自身业务资料、审核规则、通知渠道和数据文件，完成落地验证。

## 注意事项
1. 本页适合首次接触FastGPT的用户，以及售前、交付、运营、法务、行政等角色快速体验平台能力。
2. 阅读时需重点关注三类内容：每种应用类型适配的问题场景、关键配置的设计逻辑、验证时需观察的效果。
3. 不可直接复用所有参数，需根据实际业务调整对应配置。
4. 需提前配置好可用AI模型，否则无法完成应用搭建。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/getting-started/quick-start)
