---
title: 解决FastGPT HTTP节点传入AI生成JSON提示无效格式问题
slug: /zh/troubleshoot/fastgpt-http-body-invalid-json
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1941
source_type: GitHub issue
---

# 解决FastGPT HTTP节点传入AI生成JSON提示无效格式问题

## 现象
AI可正常生成JSON格式内容，将其传入HTTP请求的Body处理时，系统提示无效JSON格式。直接将JSON内容写入HTTP节点的Body中，则不会出现该问题。部分场景下，报错提示JSON内容包含大量类似\n的特殊字符。

## 可能原因
经排查，怀疑HTTP模块的Body转换处理与验证机制存在异常。直接写入静态JSON内容可正常调用接口，但通过其他模块传入AI生成的JSON内容时，会触发JSON语法错误提示，且未发起接口调用。

## 排查步骤
1. 验证直接在HTTP节点的Body中写入静态JSON内容，确认接口调用是否可正常完成。
2. 提取AI生成的原始JSON输出内容，检查是否包含换行符\n等特殊字符。
3. 对比静态写入的JSON与模块传入的JSON格式差异，确认异常来源。

## 解决与验证
首先对AI生成的JSON内容进行特殊字符处理，移除或转义换行符\n等可能导致格式校验失败的字符。将处理后的JSON内容传入HTTP节点的Body中，再次发起调用，验证是否不再提示无效JSON格式，且接口调用成功。若处理后仍存在报错，需按实际环境确认HTTP模块的配置与转换逻辑是否符合预期。

> 来源: [FastGPT GitHub issue #1941](https://github.com/labring/FastGPT/issues/1941)
