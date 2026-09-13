---
title: 解决FastGPT调用qwen-vl-max模型时的temperature参数报错问题
slug: /zh/troubleshoot/fastgpt-qwen-vl-max-temperature-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1700
source_type: GitHub issue
---

# 解决FastGPT调用qwen-vl-max模型时的temperature参数报错问题

## 现象
用户在私有部署的FastGPT 4.8.3版本中，配置了通过OneAPI接入的qwen-vl-max视觉模型。该模型可通过代码正常调用，调用时不添加temperature参数或设置temperature=0。但在FastGPT中使用该模型时，出现报错，报错原因为FastGPT后台调用OneAPI接口时添加了temperature参数。

## 可能原因
FastGPT在调用该qwen-vl-max模型的接口时，自动添加了temperature参数，该参数的传入导致接口调用失败。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.3私有部署版本。
2. 查看OneAPI中qwen-vl-max模型的config.json配置，确认模型支持的调用参数范围。
3. 通过代码直接调用OneAPI的qwen-vl-max接口，不添加temperature参数或设置为0，验证调用是否正常。
4. 对比代码调用与FastGPT调用的参数差异，确认temperature参数是否为FastGPT额外添加的参数。

## 解决与验证
可以通过调整FastGPT的模型调用参数配置解决该问题。具体操作如下：
1. 进入FastGPT的模型管理页面，找到qwen-vl-max的对应配置项。
2. 修改模型的调用参数配置，移除temperature参数，或设置其默认值为0。
3. 保存配置后，重新在FastGPT中发起调用，验证是否不再出现相关报错。
验证成功后，可正常使用该模型完成相关任务。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1700)
