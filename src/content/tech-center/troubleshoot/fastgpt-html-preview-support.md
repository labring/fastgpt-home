---
title: 解决FastGPT中HTML内容预览与复杂表格显示问题
slug: /zh/troubleshoot/fastgpt-html-preview-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2423
source_type: GitHub issue
---

# 解决FastGPT中HTML内容预览与复杂表格显示问题

## 现象
FastGPT生成的内容中，带有rowspan属性的表格无法正常显示，生成HTML代码后无法直接在平台内预览，需下载到本地手动生成HTML文件才能查看效果。配合HTML的复杂图形输出也无法正常显示。

## 可能原因
当前FastGPT版本未支持HTML内容的渲染与预览功能，无法解析HTML标签及相关属性，也无法直接展示HTML格式的输出内容。

## 排查步骤
1. 确认生成的输出内容包含HTML标签或带有rowspan属性的表格。
2. 检查FastGPT界面是否存在HTML内容直接预览的入口或配置项。
3. 尝试将生成的HTML代码下载到本地打开，验证内容是否可正常显示。

## 解决与验证
目前FastGPT暂未支持HTML内容的直接预览与渲染，无法解决表格合并、复杂图形输出等依赖HTML的场景需求。若需实现该功能，可重新打开对应issue并补充相关使用场景信息。等待功能更新后，可通过平台内的HTML预览入口验证效果。

> 来源: [FastGPT GitHub issue #2423](https://github.com/labring/FastGPT/issues/2423)
