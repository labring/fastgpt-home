---
title: 解决FastGPT中SVG文件上传导致的存储型XSS漏洞
slug: /zh/troubleshoot/fastgpt-svg-upload-xss
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6247
source_type: GitHub issue
---

# 解决FastGPT中SVG文件上传导致的存储型XSS漏洞

## 现象
在FastGPT公有云版本V4.14.5的系统文件上传功能中，未对上传文件做严格的安全限制，上传SVG格式文件至存储桶后，直接访问该文件的存储链接即可渲染SVG内容，存在存储型XSS漏洞风险。

## 可能原因
当前仅通过文件后缀或MIME类型判断文件安全性，未对SVG文件的实际内容进行服务端安全清洗，导致恶意SVG文件可绕过检测上传并渲染，触发存储型XSS漏洞。

## 排查步骤
1. 确认当前使用的FastGPT版本为公有云V4.14.5（或对应版本）。
2. 尝试上传任意SVG格式文件至系统文件存储桶。
3. 直接访问该SVG文件的存储链接，查看是否可正常渲染该文件。
4. 若可正常渲染且未做安全过滤，则存在该XSS漏洞风险。

## 解决与验证
1. 执行服务端内容清洗：使用专门的XML/HTML安全解析库对上传的SVG文件内容进行解析过滤，移除其中的恶意脚本代码。
2. 调整文件上传校验逻辑，不再仅依赖文件后缀或MIME类型判断文件安全性，结合内容清洗实现全面的安全校验。
3. 重新上传包含恶意代码的SVG文件至存储桶，访问其存储链接，确认无法执行恶意脚本，仅正常展示SVG图形。
4. 验证普通SVG文件可正常上传并展示，无功能异常。
需注意，具体的清洗规则需按实际业务场景确认。

> 来源：https://github.com/labring/FastGPT/issues/6247
