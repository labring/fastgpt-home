---
title: FastGPT系统插件旧架构问题与拆分重构说明
slug: /zh/model/fastgpt-plugin-split-background
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/intro
source_type: 官方文档
---

# FastGPT系统插件旧架构问题与拆分重构说明

### 旧架构的局限
原先FastGPT的各项能力均在FastGPT主服务内维护，并通过Monorepo方式组织。系统插件也曾作为一个子仓库存在于`FastGPT/packages/plugin`下。随着系统工具数量和社区贡献增加，旧结构暴露出四个问题：
- 系统插件必须伴随FastGPT主服务一起发版，限制了插件迭代速度
- 社区贡献插件需要运行完整FastGPT应用，并直接向主仓库提交PR
- 使用自定义插件需要维护FastGPT fork，手动处理升级和合并
- Next.js/webpack构建模型不适合在运行时挂载新插件

### 拆分重构的实施
因此，系统插件被拆分到独立仓库：[FastGPT Plugin](https://github.com/labring/fastgpt-plugin)。FastGPT Plugin v1.0.0对插件项目进行了系统性重构，目标是让插件的安装、版本管理、运行隔离和运维配置形成统一模型。

### 适配操作要点
1. 插件可独立迭代，无需伴随FastGPT主服务发版
2. 社区贡献可直接向独立仓库提交PR，无需运行完整FastGPT应用
3. 自定义插件可独立管理版本，无需维护FastGPT fork并手动合并升级
4. 适配运行时挂载新插件的构建模型

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/intro)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
