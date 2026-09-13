---
title: 解决FastGPT中自定义Javascript执行环境的配置与实现问题
slug: /zh/troubleshoot/fastgpt-javascript-execution-environment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/939
source_type: GitHub issue
---

# 解决FastGPT中自定义Javascript执行环境的配置与实现问题

## 现象
用户希望在FastGPT中通过iframe作为Javascript执行环境处理复杂场景，该需求旨在脱离服务器环境处理更多复杂业务，当前仅支持HTTP调用等简单功能，无法直接实现该需求。

## 可能原因
FastGPT应用运行于服务器环境，不支持浏览器端的iframe作为Javascript执行环境。单独开发自定义Runtime存在语法提示不全、无法引入第三方包、内存泄漏风险等问题。

## 排查步骤
1. 确认是否尝试使用iframe作为Javascript执行环境来处理复杂业务场景。
2. 检查当前FastGPT的版本是否为最新版，已确认最新版本暂不支持原生iframe方案。
3. 确认是否有适配的替代技术方案可满足自定义Javascript执行的需求。
4. 核实是否存在未配置的模块或规则可适配该执行场景。

## 解决与验证
可使用无服务器服务实现相关需求，无需额外部署。后续将融合相关服务，当前可通过定义类似openapi的规则，捕获代码结构生成出入参数来适配。也可使用vm2执行脚本作为精简的子模块实现需求，使用该方案时需注意内存泄漏风险，需按实际环境确认相关配置。

> 来源: [FastGPT GitHub issue #939](https://github.com/labring/FastGPT/issues/939)
