---
title: FastGPT使用Marker识别PDF后部分图片无法正常显示的排错方法
slug: /zh/troubleshoot/fastgpt-marker-pdf-image-path-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3824
source_type: GitHub issue
---

# FastGPT使用Marker识别PDF后部分图片无法正常显示的排错方法

## 现象
在私有部署V4.8.21版本的FastGPT中，使用Docker部署的Marker进行PDF知识库识别时，部分图片无法正常显示。异常图片的路径为类似`"8_Image_0.Png"`的本地文件名格式，正常显示的图片路径为`"/api/system/img/67b4cb4c0e6a8e9c15027750.png"`。新建知识库并上传带有多张图片的PDF，在数据识别详情中即可发现该问题，本次上传的PDF共识别到28张图片，仅8张可正常显示。在Marker的Docker文件系统内可找到对应异常图片，导出后图片内容正常。Marker处理PDF及FastGPT处理过程均无报错信息。

## 可能原因
根据异常路径与正常路径的对比，异常图片未生成符合FastGPT访问规范的完整API路径，仅保留了Marker生成的本地文件名，未被转换为FastGPT内置的系统图片访问路径格式，因此无法通过FastGPT的静态资源服务加载。目前未找到官方明确的根因说明，需结合实际部署配置进一步确认。

## 排查步骤
1.  进入Marker的Docker容器，检索对应异常图片文件名，确认文件是否存在且内容完整。
2.  对比正常显示与异常图片的路径格式，确认异常图片是否缺少`"/api/system/img/"`前缀及唯一标识字符串。
3.  检查FastGPT与Marker的部署网络配置，确认是否存在路径转发或资源访问权限缺失的情况。
4.  查看FastGPT及Marker的完整运行日志，排查是否存在未捕获的图片路径转换错误。

## 解决与验证
需调整图片路径转换逻辑，将Marker生成的本地图片文件名转换为`"/api/system/img/[唯一标识]"`格式的标准访问路径。验证方式为重新上传带有多张图片的PDF至知识库，检查识别后的所有图片路径是否符合标准API格式，确认所有图片均可正常显示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3824)
