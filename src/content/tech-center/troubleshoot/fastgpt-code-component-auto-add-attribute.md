---
title: 解决FastGPT代码组件退出编辑后自动添加result和data2属性的问题
slug: /zh/troubleshoot/fastgpt-code-component-auto-add-attribute
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1992
source_type: GitHub issue
---

# 解决FastGPT代码组件退出编辑后自动添加result和data2属性的问题

## 现象
代码组件退出编辑页面后重新进入，会自动添加result、data2两个属性，且代码引用的地方被自动修改为result。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 进入FastGPT代码组件的编辑界面，修改现有代码逻辑。
2. 退出当前编辑页面，重新进入该代码组件的编辑界面。
3. 检查代码组件的属性与引用配置，确认是否自动生成了result、data2属性，且引用被改为result。
4. 记录当前使用的FastGPT版本类型（公有云或私有部署版本）与相关配置信息。

## 解决与验证
结合实际排查结果调整代码组件的属性与引用配置，移除自动添加的result、data2属性，恢复原有引用设置。重新进入编辑页面，确认属性与引用未再次发生异常变更，即完成验证。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1992)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
