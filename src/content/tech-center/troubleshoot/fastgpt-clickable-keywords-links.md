---
title: 为FastGPT输出文本中的关键词配置可点击交互链接
slug: /zh/troubleshoot/fastgpt-clickable-keywords-links
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/904
source_type: GitHub issue
---

# 为FastGPT输出文本中的关键词配置可点击交互链接

## 现象
使用FastGPT的HTTP模块调用后，输出文本含有关键词，需为关键词配置可点击交互链接，实现点击后触发对话的功能，参考内置的关键词可点击引导模块的效果。

## 可能原因
需按实际环境确认，当前线程未明确说明该功能未生效的具体原因，仅描述了期望实现的功能场景。

## 排查步骤
1. 确认已将FastGPT升级至最新正式版本
2. 检查HTTP模块输出的文本格式是否符合平台内置的可点击交互规则
3. 核对超链接相关配置的参数是否符合要求

## 解决与验证
使用Markdown格式编写目标关键词，格式为`[需要点击的文本](href)`，当href为空时，FastGPT会触发发送问题功能，实现关键词点击对话的交互效果。将该格式应用于HTTP模块输出的文本关键词，即可完成配置。验证时，点击配置后的关键词，即可触发对话交互，达成目标功能。

> 来源: [FastGPT GitHub issue #904](https://github.com/labring/FastGPT/issues/904)
