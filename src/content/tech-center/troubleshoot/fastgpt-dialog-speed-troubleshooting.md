---
title: FastGPT私有部署版对话文本输出速度不稳定的排查与解决方法
slug: /zh/troubleshoot/fastgpt-dialog-speed-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3019
source_type: GitHub issue
---

# FastGPT私有部署版对话文本输出速度不稳定的排查与解决方法

## 现象
在FastGPT私有部署版本4.8.11中进行AI对话后，对话框内输出的文字速度有时快有时慢，该问题仅影响文本输出环节。

## 可能原因
该问题通常与所使用API密钥对应的服务端数据返回速度有关，未发现其他明确关联因素。

## 排查步骤
1. 打开浏览器的F12开发者调试工具。
2. 找到对应AI对话请求的网络日志，录制该请求的Timing数据。
3. 将获取到的Timing数据与对话中的文字生成速度进行对比，以此确定问题的具体根源。

## 解决与验证
通过上述排查步骤定位问题根源后，若问题源于服务端数据返回速度，需按实际环境确认对应的优化方向。完成相关优化后，重复进行AI对话流程，对比文字生成速度与请求的Timing数据，确认问题是否得到解决。

> 来源: [FastGPT GitHub issue #3019](https://github.com/labring/FastGPT/issues/3019)
