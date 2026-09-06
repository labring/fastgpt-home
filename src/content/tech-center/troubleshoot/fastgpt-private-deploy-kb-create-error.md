---
title: 解决FastGPT私有部署新建知识库的页面报错问题
slug: /zh/troubleshoot/fastgpt-private-deploy-kb-create-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3214
source_type: GitHub issue
---

# 解决FastGPT私有部署新建知识库的页面报错问题

## 现象
用户使用v4.8.13-fix私有部署版本的FastGPT，在config.json中配置datasetProcess项为true或false时，执行以下操作会触发报错：访问管理后台，点击左侧导航栏"知识库"，选择"新建-通用知识库"后，页面黑屏并显示报错信息"Application error: a client-side exception has occurred (see the browser console for more information)."，1至2秒后浏览器自动回退到访问知识库前的页面，FastGPT容器内无日志输出。

## 可能原因
该版本FastGPT的datasetProcess配置项逻辑存在异常。无论将该配置项设为true还是false，都会触发前端客户端异常，导致新建通用知识库的页面无法正常加载，进而出现黑屏报错与自动回退的问题。该问题与已上报的issue #3182相关。

## 排查步骤
1. 确认当前部署的FastGPT版本为v4.8.13-fix私有部署版本。
2. 打开项目根目录下的config.json文件，查看datasetProcess配置项的当前取值。
3. 修改datasetProcess配置项为true或false，保存文件后重启FastGPT容器。
4. 复现新建通用知识库的操作，记录浏览器控制台显示的具体客户端异常内容。

## 解决与验证
参考关联issue的修复思路，修正config.json中datasetProcess配置项的加载逻辑，完成代码修改后重启FastGPT容器。验证时，访问管理后台进入知识库页面，点击新建通用知识库，确认页面可以正常加载，无黑屏报错与自动回退现象。如果仍存在异常，需结合浏览器控制台的具体报错信息进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3214)
