---
title: 解决FastGPT私有部署v4.9.3版视觉模型上传图片后报错问题
slug: /zh/troubleshoot/fastgpt-visual-model-tls-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4756
source_type: GitHub issue
---

# 解决FastGPT私有部署v4.9.3版视觉模型上传图片后报错问题

## 现象
使用FastGPT私有部署v4.9.3版本，调用硅基流动的Qwen/Qwen2-VL-72B-Instruct视觉模型时，上传图片后AI回答直接报错。将配置文件中的NODE_TLS_REJECT_UNAUTHORIZED配置项注释后，AI回答不再报错，但系统提示未识别到上传的图片。

## 可能原因
该问题与配置项NODE_TLS_REJECT_UNAUTHORIZED相关。启用该配置以跳过TLS证书验证时，会引发视觉模型调用报错；注释该配置恢复TLS证书验证后，又因证书校验失败无法正常加载上传的图片资源。

## 排查步骤
1. 确认当前FastGPT版本为v4.9.3，使用的视觉模型为硅基流动的Qwen/Qwen2-VL-72B-Instruct。
2. 检查配置文件中是否存在NODE_TLS_REJECT_UNAUTHORIZED配置项。
3. 分别测试启用和注释该配置项的场景，记录对应现象：启用时出现报错，注释后无报错但提示无图片。
4. 查看系统日志，确认报错相关的异常信息（需按实际环境确认）。

## 解决与验证
需结合实际环境调整TLS相关配置，确保既能正常完成TLS证书验证，又能正常加载上传的图片资源。验证步骤如下：
1. 修正配置文件中的TLS证书相关配置（需按实际环境确认具体参数）。
2. 重新上传图片并调用视觉模型，确认AI回答正常且能识别上传的图片。
3. 检查系统日志无相关报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4756)
