---
title: FastGPT模型配置从文件修改改为页面配置的解决方案
slug: /zh/troubleshoot/fastgpt-model-config-page-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2961
source_type: GitHub issue
---

# FastGPT模型配置从文件修改改为页面配置的解决方案

## 现象
使用FastGPT新增模型时，需编辑config.json配置文件写入相关内容，完成后需重启Docker容器才能生效，流程繁琐，对上线应用的部署不够友好。

## 可能原因
当前FastGPT的模型配置采用静态配置文件的管理方式，无法在不重启服务的前提下更新模型配置，导致新增模型的操作步骤较多，影响部署效率。

## 排查步骤
1. 确认当前FastGPT的模型配置是否通过config.json文件进行管理。
2. 检查新增模型后是否需要重启Docker容器才能使配置生效。
3. 查找是否存在前台模型管理页面的相关配置入口。

## 解决与验证
推荐使用前台模型管理页面完成模型配置，无需编辑config.json文件，也无需重启Docker容器。验证流程如下：
1. 进入前台模型管理页面。
2. 完成新模型的相关配置参数填写。
3. 直接调用新模型进行功能测试，确认配置无需重启服务即可生效。

> 来源: [FastGPT GitHub issue #2961](https://github.com/labring/FastGPT/issues/2961)
