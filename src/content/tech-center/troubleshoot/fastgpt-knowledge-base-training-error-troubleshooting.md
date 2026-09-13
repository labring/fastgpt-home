---
title: FastGPT知识库上传训练后停滞及参数错误的排错方法
slug: /zh/troubleshoot/fastgpt-knowledge-base-training-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2534
source_type: GitHub issue
---

# FastGPT知识库上传训练后停滞及参数错误的排错方法

## 现象
在FastGPT私有部署版本4.8.9的环境中，用户创建知识库并上传文件后，训练进度条无任何变化。系统日志提示`prompt参数不正确，向量模型没找到`，前端页面同步出现对应报错。用户已按照官方文档配置向量模型，且在渠道配置中也完成了向量模型的设置。

## 可能原因
出现该问题的核心原因与向量模型的配置传递、系统识别有关。一是向量模型的prompt相关参数配置缺失或格式错误；二是FastGPT未能正确识别已配置的向量模型渠道；三是上传训练时的请求参数未符合系统要求。

## 排查步骤
1. 查看系统运行日志，确认报错信息是否为`prompt参数不正确，向量模型没找到`，定位报错对应的配置或请求环节。
2. 核对FastGPT中向量模型的配置项，确认配置的模型标识与实际可用模型一致。
3. 检查向量模型配置中的prompt相关参数，确保参数格式符合系统要求。
4. 确认已完成的向量模型配置未被遗漏或篡改，重新保存配置后重启相关服务。

## 解决与验证
首先，根据系统配置页面的要求，补全或修正prompt相关参数，确保参数格式正确。其次，重新保存向量模型配置，并重启FastGPT相关服务。最后，重新上传文件并启动训练，查看训练进度条是否正常更新，系统日志是否不再出现`prompt参数不正确，向量模型没找到`的报错。若问题仍未解决，需按实际环境进一步核对配置项。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2534)
