---
title: 调整FastGPT配置以隐藏页面红框内的指定内容
slug: /zh/troubleshoot/fastgpt-hide-page-redbox-content
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1240
source_type: GitHub issue
---

# 调整FastGPT配置以隐藏页面红框内的指定内容

## 现象
FastGPT页面出现红框标记的非预期内容，该内容的截图已在对应issue中提供，用户希望移除该红框内的页面元素。

## 可能原因
该红框内容的显示逻辑由FastGPT的前端渲染配置或后端系统配置控制，具体关联的配置项名称未在issue中明确，需按实际部署环境确认。

## 排查步骤
1. 进入FastGPT的系统配置管理页面，定位与页面显示元素相关的配置区域。
2. 根据FastGPT的通用配置逻辑，逐一核对当前启用的配置项，查找可能控制该红框内容显示的开关或参数。
3. 记录当前配置状态，避免误修改其他功能的相关设置。

## 解决与验证
1. 找到对应控制该红框内容显示的配置项后，关闭其启用状态并保存配置。
2. 刷新FastGPT页面，确认红框内的内容已被隐藏。
3. 若未找到直接关联的配置项，需按实际部署环境进一步排查配置来源。
4. 若存在多个关联配置选项，需逐一测试以确认正确的控制开关。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1240)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
