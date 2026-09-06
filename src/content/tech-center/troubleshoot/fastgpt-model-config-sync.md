---
title: 解决FastGPT手动配置模型参数步骤繁琐的问题
slug: /zh/troubleshoot/fastgpt-model-config-sync
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1877
source_type: GitHub issue
---

# 解决FastGPT手动配置模型参数步骤繁琐的问题

## 现象
当前FastGPT的模型配置需手工通过config.json文件完成，无法快速同步公共模型参数模板，配置步骤繁琐，增加了部署和维护的工作量。

## 可能原因
FastGPT暂未集成公共模型参数同步功能，仅支持通过手动编辑config.json文件完成模型配置，无法直接导入预先整理的公共厂商及模型参数模板，导致每次部署或更新模型时都需手动填写参数，无法复用公共配置。

## 排查步骤
1. 定位FastGPT项目的config.json配置文件，确认文件路径与访问权限。
2. 打开config.json文件，检查模型配置字段的内容，确认是否为手动编辑的自定义参数。
3. 梳理当前需要配置的模型列表，确认是否存在可复用的公共参数模板。
4. 核对现有配置格式，确保符合公共模板的规范要求，避免出现配置错误。

## 解决与验证
目前FastGPT未提供内置的公共模型参数同步功能，需手动编辑config.json文件完成模型参数配置。如需使用公共模板，需先整理公共厂商及模型参数模板，将模板内容导入config.json文件的对应配置字段中，个性化配置可在导入完成后自行修改。验证方式为重启FastGPT服务，访问平台的模型配置页面，检查是否加载了配置的公共模型参数，确认配置生效。若需后续同步更新公共模板，需重新编辑config.json文件完成更新。

> 来源: [FastGPT GitHub issue #1877](https://github.com/labring/FastGPT/issues/1877)
