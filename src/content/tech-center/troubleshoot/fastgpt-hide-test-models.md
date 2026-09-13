---
title: 配置FastGPT首页模型展示规则以隐藏测试阶段模型
slug: /zh/troubleshoot/fastgpt-hide-test-models
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5701
source_type: GitHub issue
---

# 配置FastGPT首页模型展示规则以隐藏测试阶段模型

## 现象
FastGPT首页会展示所有已接入的可用模型，处于测试阶段的模型也会直接展示在列表中，导致不符合预期的展示效果。部分用户希望仅展示指定的部分模型，隐藏测试阶段或未完成开发的模型，以规范内部模型使用权限，避免非授权人员接触未成熟的模型资源。

## 可能原因
需按实际环境确认。当前线程未提及具体的配置逻辑或系统限制，无法直接确定未隐藏测试模型的具体原因。

## 排查步骤
1. 确认已将FastGPT升级至最新版本，避免因旧版本存在的功能限制导致问题。
2. 访问FastGPT首页，查看当前展示的所有模型列表，记录需要隐藏的测试阶段模型名称。
3. 进入系统配置界面，核对是否存在与模型展示权限、过滤规则相关的设置项。
4. 检查是否存在可手动选择需展示模型的控制入口，或可配置模型展示白名单的功能。

## 解决与验证
目前官方暂未提供可直接控制FastGPT首页模型展示的配置功能。该需求已提交至官方GitHub仓库，可通过访问对应issue页面关注后续更新，以获取相关解决方案。

> 来源: [FastGPT GitHub issue #5701](https://github.com/labring/FastGPT/issues/5701)
