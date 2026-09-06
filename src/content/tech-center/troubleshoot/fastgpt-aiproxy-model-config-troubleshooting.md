---
title: FastGPT使用aiproxy配置自定义模型的排障指南
slug: /zh/troubleshoot/fastgpt-aiproxy-model-config-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4060
source_type: GitHub issue
---

# FastGPT使用aiproxy配置自定义模型的排障指南

## 现象
使用FastGPT 4.9.0私有部署版本，通过aiproxy管理模型时，新增渠道的厂商列表中无对应厂商，无法配置原使用的m3e模型，不确定厂商类型是否影响模型调用，同时询问嵌入模型是否需选择openai格式。

## 可能原因
所需厂商未被纳入aiproxy的预设厂商列表；未明确目标模型的接口格式类型，导致无法匹配正确的配置项。

## 排查步骤
1. 确认目标模型的接口格式类型。
2. 查看aiproxy新增渠道的厂商列表，确认是否存在与目标模型匹配的厂商。
3. 核对模型的实际调用参数与请求格式，确认是否符合所选配置项的要求。

## 解决与验证
若目标模型接口格式为openai兼容格式，直接选择openai格式的厂商类型进行配置即可。若所需厂商未在列表中，可提交相关需求补充该厂商。嵌入模型可按实际接口格式选择配置，openai兼容格式的嵌入模型可直接使用openai厂商类型完成配置。

> 来源: [FastGPT GitHub issue #4060](https://github.com/labring/FastGPT/issues/4060)
