---
title: 解决FastGPT中/icon/resizer.svg资源未携带BASE_URL导致的404加载问题
slug: /zh/troubleshoot/fastgpt-resizer-svg-404-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4722
source_type: GitHub issue
---

# 解决FastGPT中/icon/resizer.svg资源未携带BASE_URL导致的404加载问题

## 现象
当访问部署后的FastGPT应用时，/icon/resizer.svg资源无法加载，浏览器控制台返回404错误。该资源的URL定义位于packages/web/styles/theme.ts文件中，且未携带NEXT_PUBLIC_BASE_URL。

## 可能原因
该CSS资源的URL未拼接项目部署所需的基础路径配置，导致浏览器请求的资源路径与实际部署路径不匹配，触发404错误。

## 排查步骤
1. 定位到packages/web/styles/theme.ts文件，查找/icon/resizer.svg的CSS URL定义内容。
2. 查看项目配置，确认NEXT_PUBLIC_BASE_URL的配置参数是否存在。
3. 打开浏览器开发者工具的网络面板，查看该资源的实际请求URL，确认是否缺少部署前缀。
4. 对比其他正常加载的资源URL，确认路径拼接逻辑是否一致。

## 解决与验证
修改packages/web/styles/theme.ts中的/icon/resizer.svg URL定义，调用packages/web/common/system/utils.ts的getWebReqUrl函数拼接基础路径。重新执行项目构建流程，部署更新后的代码。再次访问应用，检查/icon/resizer.svg资源的请求状态，确认404错误已消除。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4722)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
