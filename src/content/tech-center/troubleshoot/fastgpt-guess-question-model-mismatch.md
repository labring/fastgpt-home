---
title: 解决FastGPT猜你想问功能调用模型与所选不一致的问题
slug: /zh/troubleshoot/fastgpt-guess-question-model-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1473
source_type: GitHub issue
---

# 解决FastGPT猜你想问功能调用模型与所选不一致的问题

## 现象
在FastGPT私有部署4.8版本中，当用户在界面选择的模型未处于config.json配置文件的第一个位置时，开启猜你想问功能，会调用config.json中的第一个模型，与用户在界面选择的模型不一致。使用本地部署的模型时，该问题会导致实际调用的模型与预期不符。

## 可能原因
猜你想问功能的模型调用逻辑未正确绑定用户在界面选择的模型，直接读取config.json中的第一个模型配置，导致调用结果与用户选择不匹配。

## 排查步骤
1. 确认当前使用的FastGPT为私有部署4.8版本。
2. 打开项目的config.json配置文件，查看已配置的模型列表顺序。
3. 记录FastGPT界面中当前选择的模型名称，对比其在config.json中的位置是否为第一项。
4. 开启猜你想问功能，观察实际调用的模型是否与界面选择的模型一致。

## 解决与验证
临时解决方式为调整config.json中的模型排序，将用户需要使用的模型移至列表第一项，此时猜你想问功能将调用该模型。验证方式为开启猜你想问功能，确认实际调用的模型与界面选择的模型一致。若需自定义猜你想问功能的专属调用模型，需按实际环境确认对应配置参数的修改方式。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1473)
