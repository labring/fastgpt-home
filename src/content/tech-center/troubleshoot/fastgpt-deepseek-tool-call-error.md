---
title: 解决FastGPT私有化部署中deepseek模型调用工具报错问题
slug: /zh/troubleshoot/fastgpt-deepseek-tool-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4749
source_type: GitHub issue
---

# 解决FastGPT私有化部署中deepseek模型调用工具报错问题

## 现象
FastGPT私有化部署场景下，调用数据库工具时出现报错。使用deepseek-r1、deepseekV3模型时均触发错误，返回`400 status code (no body)`；使用qwen2.5:32b模型可正常调用数据库工具。

## 可能原因
目前无公开明确的根因说明，需结合实际部署环境、模型调用配置等信息进一步定位。

## 排查步骤
1.  记录触发报错的具体模型名称，如deepseek-r1、deepseekV3。
2.  对比测试其他模型的数据库工具调用情况，验证报错是否仅在deepseek系列模型中出现。
3.  查看工具调用返回的完整日志，确认`400 status code (no body)`的具体上下文。
4.  核对模型调用的配置参数，需按实际环境确认参数是否符合模型要求。

## 解决与验证
目前无公开的标准化解决方案。可按以下步骤验证与尝试：
1.  更换为线程中验证正常的qwen2.5:32b模型，确认数据库工具调用功能恢复。
2.  收集完整的报错日志与部署环境信息，提交至官方渠道获取进一步支持。

> 来源: [FastGPT GitHub issue #4749](https://github.com/labring/FastGPT/issues/4749)
