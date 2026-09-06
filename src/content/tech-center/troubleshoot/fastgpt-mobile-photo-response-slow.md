---
title: FastGPT移动端拍照提问响应慢的排查与解决方法
slug: /zh/troubleshoot/fastgpt-mobile-photo-response-slow
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1549
source_type: GitHub issue
---

# FastGPT移动端拍照提问响应慢的排查与解决方法

## 现象
移动端访问FastGPT时，使用手机拍照提问功能，响应速度过慢。

## 可能原因
可能的原因包含两类，一是二次开发过程中对上传的拍照图片进行了压缩处理，引发额外资源开销；二是当前部署环境的网络带宽不足，无法快速传输图片与请求数据。

## 排查步骤
1.  确认当前FastGPT的部署类型为4.8私有部署版本或公有云版本。
2.  核对二次开发的代码逻辑，检查是否对拍照上传的图片进行了自定义压缩处理。
3.  测试当前部署环境的网络带宽情况，确认带宽是否满足图片传输需求。

## 解决与验证
针对排查出的原因采取对应措施，若因图片压缩导致问题，调整图片压缩的相关参数，需按实际环境确认；若因带宽不足，增加网络带宽。验证时，在移动端重新发起拍照提问，确认响应时间恢复正常。

> 来源: [FastGPT GitHub issue #1549](https://github.com/labring/FastGPT/issues/1549)
