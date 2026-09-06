---
title: FastGPT私有部署V4.9.0版本HTML无法预览的排错方法
slug: /zh/troubleshoot/fastgpt-html-unable-preview-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4077
source_type: GitHub issue
---

# FastGPT私有部署V4.9.0版本HTML无法预览的排错方法

## 现象
在FastGPT私有部署V4.9.0版本中，调用大语言模型生成HTML代码后，无法正常预览生成的HTML内容。

## 可能原因
预览HTML内容的容器未配置正确的sandbox权限参数，导致HTML内的脚本或同源资源无法正常加载，进而无法完成预览。

## 排查步骤
1. 定位到FastGPT中用于展示HTML预览的前端组件，查看对应的iframe标签配置。
2. 检查iframe的sandbox属性是否包含allow-scripts和allow-same-origin两个参数值。
3. 对比用户提供的预期配置，确认当前参数是否符合要求。
4. 若参数缺失或不完整，可手动修改配置后进行验证。

## 解决与验证
解决方法：修改HTML预览组件的iframe标签，添加`sandbox="allow-scripts allow-same-origin"`属性。
验证步骤：
1. 重新部署修改后的前端代码。
2. 调用大语言模型生成HTML代码，尝试进行预览。
3. 确认HTML内容可以正常显示，脚本和同源资源加载正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4077)
