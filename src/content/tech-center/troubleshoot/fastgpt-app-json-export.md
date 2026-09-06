---
title: FastGPT工作台已创建应用导出JSON配置的需求说明
slug: /zh/troubleshoot/fastgpt-app-json-export
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4799
source_type: GitHub issue
---

# FastGPT工作台已创建应用导出JSON配置的需求说明

## 现象
用户无法将FastGPT工作台中已创建的应用导出为JSON配置文件，仅支持通过新建->导入JSON的方式创建应用。该需求用于应用在不同FastGPT环境的迁移，包括开发环境、测试环境、生产验证环境及生产环境。

## 可能原因
当前FastGPT版本未提供已创建应用导出为JSON配置的内置功能，仅支持导入JSON配置创建应用。

## 排查步骤
1. 进入FastGPT工作台的应用管理页面。
2. 查看单个应用的操作菜单或详情页面，确认是否存在导出为JSON配置的选项。
3. 对比新建应用时的导入JSON入口位置，确认是否存在对应的导出功能入口。

## 解决与验证
目前FastGPT未内置该导出功能，若需实现跨环境迁移应用，需按实际环境确认功能支持情况，或参考现有导入JSON配置的格式手动整理应用配置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4799)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
