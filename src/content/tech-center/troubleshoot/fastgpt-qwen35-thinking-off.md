---
title: 解决FastGPT v4.14.8中Qwen3.5模型thinking模式无法彻底关闭的问题
slug: /zh/troubleshoot/fastgpt-qwen35-thinking-off
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6606
source_type: GitHub issue
---

# 解决FastGPT v4.14.8中Qwen3.5模型thinking模式无法彻底关闭的问题

## 现象
用户在私有部署的FastGPT社区版v4.14.8环境中使用Qwen3.5系列模型时，发现模型默认开启thinking模式。在应用的模型配置页面关闭思考输出开关后，仅实现了思考过程的前端显示隐藏，但后台仍实际启用了thinking模式，无法彻底关闭该功能。

## 可能原因
目前已知该问题出现在使用Qwen3.5系列模型且在FastGPT中配置关闭思考输出的场景下，暂未明确具体根因，相关逻辑需按实际环境进一步确认。

## 排查步骤
1.  确认当前FastGPT环境为社区版v4.14.8私有部署版本。
2.  进入对应应用的模型配置页面，核对是否仅关闭了“思考输出”的显示开关，未调整其他相关配置项。
3.  查看模型调用的实际日志，确认模型是否仍在生成thinking过程的相关内容。

## 解决与验证
暂未明确通用的一键解决方法，可尝试以下排查调整方向：1. 检查FastGPT应用的模型配置中是否存在未被前端展示的thinking模式控制参数；2. 结合模型调用日志，确认实际生效的配置项。所有调整需结合实际环境验证效果。

> 来源：[FastGPT GitHub Issue #6606](https://github.com/labring/FastGPT/issues/6606)
