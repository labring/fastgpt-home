---
title: 解决FastGPT配置模型额外参数后返回结果为空的问题
slug: /zh/troubleshoot/fastgpt-model-extra-param-empty-response
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5627
source_type: GitHub issue
---

# 解决FastGPT配置模型额外参数后返回结果为空的问题

## 现象
在FastGPT私有部署v4.12.3版本中，用户为模型配置额外参数`{"format": "json"}`，模型服务的运行日志显示该参数已正常生效，但FastGPT界面提示返回结果为空。直接通过脚本调用对应模型接口时，可以正常获取返回结果。

## 可能原因
结合观测到的现象，可能是FastGPT的响应解析逻辑未正确适配配置了格式参数后的模型返回内容，导致无法识别有效返回内容。

## 排查步骤
1. 确认FastGPT为v4.12.3私有部署版本，核对模型配置中的额外参数是否为`{"format": "json"}`。
2. 查看模型服务的运行日志，确认配置的额外参数是否已正常加载生效。
3. 直接通过脚本调用对应模型接口，验证是否可以正常获取返回结果，排除模型本身的问题。
4. 检查FastGPT的系统日志，查找与响应解析相关的报错信息。

## 解决与验证
在配置模型额外参数前，可先通过直接调用模型接口验证返回格式是否符合预期。在FastGPT中完成参数配置后，重新发起对话测试，确认FastGPT可以正常识别并展示返回结果。若仍出现返回为空的情况，需结合FastGPT系统日志进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5627)
