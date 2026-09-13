---
title: 解决FastGPT 4.9.6版本知识库问答后图片域名异常的问题
slug: /zh/troubleshoot/fastgpt-knowledgebase-image-domain-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4635
source_type: GitHub issue
---

# 解决FastGPT 4.9.6版本知识库问答后图片域名异常的问题

## 现象
FastGPT 4.9.6私有部署版本中，知识库内的图片在预览阶段可正常显示，但在问答环节偶发无法加载的问题。其中，手动上传到nginx /images静态目录的markdown图片、pdf解析生成的base64嵌入图片（路径格式为/api/system/img/图片名称）可正常预览，但问答时部分图片路径会被自动补充无关域名，导致原路径失效，图片无法显示。

## 可能原因
4.9.6版本新增了知识库工具调用结果自动补充图片域名的功能，该功能可能误将本地相对路径或未指定正确域名的图片路径，自动追加了与内容相关的域名，破坏了原有的有效路径格式，导致图片无法正常加载。

## 排查步骤
1. 检查知识库中图片的原始路径格式，确认是否为相对路径或未携带完整域名的路径，例如是否为/images/xxx或/api/system/img/xxx格式。
2. 对比知识库预览与问答生成回复中的图片URL，确认是否出现额外被追加的域名片段。
3. 核对nginx的location配置，确认/images路径指向正确的静态文件目录，/api路径正确转发至FastGPT服务。
4. 复现问题，记录触发异常的具体场景，例如特定格式的markdown图片是否会触发该问题。

## 解决与验证
临时规避方案：将知识库中的图片路径替换为携带完整正确域名的URL，例如https://你的域名/images/图片名称，重新上传至知识库后发起问答，确认图片可正常显示。若需彻底解决该问题，可等待版本更新修复该自动补充功能的误判逻辑，或按实际部署环境调整相关配置（需按实际环境确认）。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4635)
