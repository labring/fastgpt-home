---
title: 解决FastGPT中PDF识别后HTML表格无法正确预览渲染的问题
slug: /zh/troubleshoot/fastgpt-pdf-html-table-preview-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4652
source_type: GitHub issue
---

# 解决FastGPT中PDF识别后HTML表格无法正确预览渲染的问题

## 现象
使用改进后的MinerU处理PDF文件后，识别得到的HTML格式表格无法在FastGPT中正确预览渲染，该问题在复杂表格的PDF场景中出现。

## 可能原因
目前暂未明确具体技术原因，仅已知该问题出现在复杂表格PDF经识别转换为HTML表格后，在FastGPT预览环节无法正常渲染的场景。

## 排查步骤
1. 确认已将MinerU升级至最新版本，完成内置模型的更新，确保识别能力符合改进后的配置。
2. 检查PDF识别流程中是否正确调用了改进后的MinerU相关API，确认识别输出格式为HTML表格。
3. 单独导出识别生成的HTML表格代码，使用本地HTML渲染工具验证代码本身是否存在语法或兼容性问题。
4. 对比非复杂表格PDF的识别结果，确认仅复杂表格场景出现渲染异常，排除通用识别格式问题。
5. 查看FastGPT预览模块的运行日志，排查是否存在解析HTML表格的相关报错信息，相关日志需按实际环境确认。

## 解决与验证
目前暂无公开的官方解决方案，若有相关解决方案可在对应GitHub issue下留言反馈。验证方式为：将识别得到的HTML表格内容在其他支持HTML渲染的环境中测试，确认HTML代码本身可正常渲染后，进一步排查FastGPT预览模块的配置或渲染逻辑，确认是否存在对HTML表格标签的支持限制。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4652)
