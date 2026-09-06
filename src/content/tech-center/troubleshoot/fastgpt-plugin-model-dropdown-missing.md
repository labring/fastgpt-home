---
title: 解决FastGPT私有部署4.8版本自定义模型不显示在插件下拉框的问题
slug: /zh/troubleshoot/fastgpt-plugin-model-dropdown-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2054
source_type: GitHub issue
---

# 解决FastGPT私有部署4.8版本自定义模型不显示在插件下拉框的问题

## 现象
在FastGPT私有部署4.8版本中，用户在config.json配置文件中添加qwen2-instruct-72b模型后，重新创建相关容器。进入高级编排模式并添加"文本内容提取"插件后，点击"AI模型"下拉框，此前配置的qwen2-instruct-72b模型未出现在可选列表中。不过该自定义模型可在其他插件的AI模型下拉框中正常选择。

## 可能原因
当前未查询到官方明确的根因说明，结合现象推测可能与特定插件的模型加载筛选逻辑存在差异有关，具体原因需按实际部署环境确认。

## 排查步骤
1. 确认已在config.json配置文件中正确添加目标模型qwen2-instruct-72b，且已重新创建相关容器使配置生效。
2. 进入FastGPT系统的高级编排模式，添加"文本内容提取"插件。
3. 点击该插件的"AI模型"下拉框，观察是否出现目标模型。
4. 切换至其他插件，查看"AI模型"下拉框是否可正常显示qwen2-instruct-72b模型，用于交叉验证模型配置的有效性。

## 解决与验证
若需在"文本内容提取"插件中使用自定义的qwen2-instruct-72b模型，可先验证模型配置的有效性：在其他插件中测试该模型是否可正常调用。目前暂无官方明确的修复方案，若问题持续，可记录当前部署版本、配置文件内容及现象，用于后续排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2054)
