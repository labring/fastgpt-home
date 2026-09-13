---
title: 解决FastGPT私有部署中JS脚本运行时DOMParser未定义错误
slug: /zh/troubleshoot/fastgpt-domparser-script-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1834
source_type: GitHub issue
---

# 解决FastGPT私有部署中JS脚本运行时DOMParser未定义错误

## 现象
FastGPT 4.8.4私有部署版本中，运行自定义JS脚本时触发报错，报错提示文本为"DOMParser is not defined"，附带两张错误截图展示该报错的完整信息。

## 可能原因
出现该报错的核心原因为，运行JS脚本的环境中未内置DOMParser全局对象。DOMParser通常为浏览器环境内置的全局API，在部分非浏览器运行场景（如服务端脚本执行环境）中默认不存在该对象，从而导致脚本执行时抛出未定义错误。

## 排查步骤
1. 确认当前执行JS脚本的运行环境类型，判断是否为非浏览器环境。
2. 在当前环境中执行基础测试代码，打印全局对象列表，验证DOMParser是否可被正常访问。
3. 核对FastGPT 4.8.4私有部署的脚本运行配置，确认是否存在环境限制或全局对象缺失的相关情况。

## 解决与验证
解决方法需根据实际运行环境调整：若当前为非浏览器环境，需手动引入DOMParser的兼容实现或配置全局对象。验证步骤为：重新运行目标JS脚本，确认不再弹出"DOMParser is not defined"报错，脚本可正常完成预期执行逻辑。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1834)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
