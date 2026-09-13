---
title: 解决FastGPT API调用对话日志不显示传入使用者信息的问题
slug: /zh/troubleshoot/fastgpt-api-user-info-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5014
source_type: GitHub issue
---

# 解决FastGPT API调用对话日志不显示传入使用者信息的问题

## 现象
API对接调用FastGPT时，即使通过API请求body的variables字段传入使用者标识参数（如{"name": "张三"}），对话日志与前端界面均无法显示该使用者信息，常见应用场景为通过第三方渠道调用API时期望展示对话人。

## 可能原因
FastGPT默认未将API调用传入的variables字段中的使用者标识信息同步至对话日志与前端界面，仅通过该字段传参无法触发使用者信息的展示。

## 排查步骤
1. 检查API请求的body参数，确认是否包含variables字段且其中存在使用者标识类参数。
2. 确认已将FastGPT升级至最新版本，排除版本兼容性问题。
3. 核对API调用流程是否符合FastGPT官方对接规范。

## 解决与验证
通过在API调用的body中配置特殊参数实现使用者信息展示，该方法为非标准实现，未收录于官方文档且后续可能发生变动。发起API调用后，查看对话日志与前端界面，确认使用者信息已正常显示。

> 来源: [FastGPT GitHub issue #5014](https://github.com/labring/FastGPT/issues/5014)
