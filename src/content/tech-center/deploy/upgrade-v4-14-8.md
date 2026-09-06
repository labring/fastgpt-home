---
title: FastGPT V4.14.8版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-14-8
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4148
source_type: 官方文档
---

# FastGPT V4.14.8版本升级内容与操作说明

## 这个版本改了什么
本次版本新增两项内容：Next.js版本升级到16，本地开发使用rspacak，本地开发性能提高3~5倍；重构代码沙盒，统一隔离方案，支持网络请求以及内置依赖包。
本次版本优化两项内容：兼容MCP中JSON Schema type类型不在枚举类型里的情况；知识库搜索变量引用文案修改为更直观的描述。
本次版本修复四项问题：新SDK兼容问题，连续调用同一个MCP服务时多次连接导致报错；文本与工具同时输出时保存后顺序异常；变量更新逻辑中输入$1会被替换为捕获组；API知识库返回值返回传入的文件title，若没有传入title则不返回内容。

## 升级前要确认的事
需确认是否需要配置fastgpt-sandbox的安全凭证，若需配置则需同时在fastgpt和fastgpt-pro中添加SANDBOX_TOKEN环境变量。需确认当前部署的FastGPT、FastGPT商业版、sandbox服务的现有镜像版本，无需改动fastgpt-plugin、mcp_server、AIProxy的现有配置。

## 升级步骤（照做）
1. 若需配置安全凭证，添加SANDBOX_TOKEN环境变量到fastgpt-sandbox、fastgpt、fastgpt-pro的部署配置中。
2. 更新对应服务的镜像tag：将FastGPT镜像tag改为v4.14.8，FastGPT商业版镜像tag改为v4.14.8，sandbox镜像tag改为v4.14.8。
3. 保留fastgpt-plugin、mcp_server、AIProxy的现有镜像配置，无需更新。
4. 重启所有更新了镜像或配置了环境变量的服务。

## 升级后怎么验证
1. 验证连续调用同一个MCP服务时无连接报错问题。
2. 验证文本与工具同时输出时保存后顺序正常。
3. 验证变量输入包含$1时，会被正确替换为捕获组。
4. 验证API知识库返回值包含传入的文件title，无title则不返回内容。
5. 验证知识库搜索变量引用文案显示正常。
6. 验证sandbox服务支持网络请求和内置依赖包。
7. 确认FastGPT服务可正常访问与使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4148)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
