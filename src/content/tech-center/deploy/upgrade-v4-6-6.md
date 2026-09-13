---
title: FastGPT 4.6.6版本升级配置与功能变更说明
slug: /zh/deploy/upgrade-v4-6-6
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/466
source_type: 官方文档
---

# FastGPT 4.6.6版本升级配置与功能变更说明

## 这个版本改了什么
旧版`config.json`配置说明不再维护，当前版本需参考[模型配置方案](../../config/model/intro.mdx)和[环境变量说明](../../config/env.mdx)。商业版更新包括：镜像更新至4.6.6版本；将旧版配置文件中的`SystemParams.pluginBaseUrl`迁移至环境变量`PRO_URL`，格式为PRO_URL=商业版镜像地址，无需以/API结尾，示例为PRO_URL=http://fastgpt-plugin.ns-hsss5d.svc.cluster.local:3000；配置文件中的`FeConfig`已被移除，相关参数和模型配置可直接在新的商业版镜像外网地址中配置，无需修改`config.json`。本次更新新增Http模块请求头支持Json编辑器、ReRank模型部署、分离向量语义检索、全文检索和重排并通过RRF合并排序的搜索方式；优化问题分类提示词与ID引导，国产商用API模型使用Prompt模式可正常分类；UI逐步替换新设计；优化Icon抽离和自动化获取的代码；修复链接读取数据集未保存选择器导致同步时不使用选择器的问题。

## 升级前要确认的事
需确认当前使用的配置方式基于旧版`config.json`，需提前了解新的模型配置与环境变量配置规则。商业版用户需确认旧版配置中`SystemParams.pluginBaseUrl`的配置值，以及`FeConfig`相关的配置内容，以便完成迁移。

## 升级步骤（照做）
1. 更新商业版镜像到4.6.6版本。
2. 将旧版配置文件中的`SystemParams.pluginBaseUrl`替换为环境变量PRO_URL，格式为PRO_URL=商业版镜像地址，无需以/API结尾，示例为PRO_URL=http://fastgpt-plugin.ns-hsss5d.svc.cluster.local:3000。
3. 移除配置文件中的`FeConfig`相关配置项，相关参数和模型配置直接在新的商业版镜像外网地址中完成配置。
4. 停止使用旧版`config.json`的配置方式，改用新的配置规则。

## 升级后怎么验证
1. 确认商业版镜像成功启动并运行4.6.6版本。
2. 验证PRO_URL环境变量配置正确，可通过商业版镜像的配置页面确认插件相关配置正常加载。
3. 测试Http模块，确认请求头支持Json编辑器功能正常。
4. 测试搜索功能，确认向量语义检索、全文检索、重排及RRF合并排序功能正常运行。
5. 测试问题分类功能，确认国产商用API模型使用Prompt模式可正常完成分类。
6. 测试链接读取数据集的同步功能，确认选择器配置已保存并生效，修复的问题已解决。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/466)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
