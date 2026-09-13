---
title: 解决FastGPT私有部署版调用vllm时输入特定内容报failed to fetch问题
slug: /zh/troubleshoot/fastgpt-vllm-fetch-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4270
source_type: GitHub issue
---

# 解决FastGPT私有部署版调用vllm时输入特定内容报failed to fetch问题

## 现象
用户在FastGPT 4.9.1私有部署版本中，对接本地部署的vllm时，在对话框输入包含多行参数定义的Robot Framework风格关键字（如Config Audit Behavior Template By Webapi、Del Audit Behavior Template By Webapi及对应参数列表）时，页面提示报错failed to fetch，预期该输入可正常提交。

## 可能原因
该报错仅触发于输入该类特殊格式的多行参数定义文本时，可能的原因为FastGPT的内容解析逻辑对该类格式文本处理存在异常，或输入内容触发了系统内置的请求校验规则，导致fetch请求失败。

## 排查步骤
1.  复现报错场景，确认仅在输入该特定格式的文本时触发failed to fetch，使用其他正常内容输入无报错。
2.  查看FastGPT后端日志，核对对应请求的返回状态与错误信息，确认请求是否正常到达后端，或存在前端请求拦截情况。
3.  逐步简化输入的文本内容，移除部分参数行或关键字，定位触发报错的具体文本片段，明确异常触发的边界。
4.  核对FastGPT 4.9.1版本的相关配置文件，确认是否存在内容过滤、请求长度限制等配置项，需按实际环境确认配置是否对当前输入产生影响。

## 解决与验证
若为内容解析异常，可将输入的特殊格式文本使用代码块（```）包裹，避免FastGPT直接解析该类文本；若为校验规则拦截，可调整对应配置项的校验阈值或添加白名单，具体配置需按实际环境执行。验证方式为：重新输入原特定文本，确认不再提示failed to fetch，且对话流程可正常推进。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4270)
