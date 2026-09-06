---
title: 解决FastGPT私有部署后知识库上传调用错误模型的问题
slug: /zh/troubleshoot/fastgpt-private-deploy-wrong-model
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1239
source_type: GitHub issue
---

# 解决FastGPT私有部署后知识库上传调用错误模型的问题

## 现象
用户在FastGPT私有部署版本v4.7、v4.7.1中，修改config.json文件，移除了gpt-3.5-turbo、gpt-4-0125-preview、gpt-4-vision-preview的配置并添加国内大模型后，出现两类问题：一是上传知识库时，系统仍尝试调用gpt-3.5模型并触发报错；二是高级编排功能中的问题分类组件无可用模型选项，但AI对话功能可正常选择配置的国内大模型。

## 可能原因
结合问题表现，可能的原因是部分功能的模型配置未正确读取更新后的config.json文件，仍依赖原始内置的模型列表。其中知识库上传环节调用了默认的gpt-3.5相关模型，高级编排的问题分类组件未加载更新后的可用模型，而AI对话功能已正确读取新配置。

## 排查步骤
1. 确认已正确修改config.json文件，移除了gpt-3.5-turbo、gpt-4-0125-preview、gpt-4-vision-preview的配置，并添加了国内大模型的相关配置。
2. 重启FastGPT服务，确保配置修改的内容被正确加载。
3. 分别测试AI对话、知识库上传、高级编排问题分类三个功能的模型加载情况，对比各功能的表现差异。
4. 查看FastGPT服务的运行日志，定位调用错误模型时的具体报错信息，匹配issue中展示的报错内容。

## 解决与验证
1. 重启FastGPT服务，确保更新后的config.json配置被所有功能模块读取。
2. 再次尝试上传知识库，确认系统不再尝试调用gpt-3.5相关模型，报错消失。
3. 进入高级编排的问题分类组件，确认已显示配置的国内大模型选项。
4. 在AI对话功能中确认模型选项正常可用，验证配置的国内大模型可正常调用。
如果仍存在异常，需按实际环境确认config.json的配置格式是否正确，以及服务是否具备读取配置文件的权限。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1239)
