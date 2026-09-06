---
title: 解决FastGPT导入OpenAPI时整数与数组参数标识异常问题
slug: /zh/troubleshoot/fastgpt-openapi-param-identification
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1310
source_type: GitHub issue
---

# 解决FastGPT导入OpenAPI时整数与数组参数标识异常问题

## 现象
该问题出现在私有部署版本V4.8-preview2的FastGPT中。导入符合OpenAPI规范的integer类型参数后，FastGPT未将其标识为数字类型；数组类型参数也未被正确标识。

## 可能原因
该问题的具体触发原因未在当前反馈中明确说明，未发现公开的通用触发条件说明，需结合实际部署环境与导入流程细节进一步确认。

## 排查步骤
1.  检查导入的OpenAPI规范文件内integer与数组参数的定义格式是否符合标准规范。
2.  确认当前FastGPT版本为V4.8-preview2，核对导入操作是否符合官方流程。
3.  确认使用的API密钥可正常使用，无权限或配置异常。

## 解决与验证
暂无明确通用解决步骤。可尝试重新导出符合规范的OpenAPI文件后再次导入，或联系项目维护者获取针对性支持。验证方式为导入后查看参数类型标识是否与OpenAPI规范定义匹配，确认integer参数显示为数字类型，数组参数被正确识别。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1310)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
