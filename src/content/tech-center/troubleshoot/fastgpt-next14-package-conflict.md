---
title: 解决FastGPT定制升级Next.js14后的包配置冲突报错问题
slug: /zh/troubleshoot/fastgpt-next14-package-conflict
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1568
source_type: GitHub issue
---

# 解决FastGPT定制升级Next.js14后的包配置冲突报错问题

## 现象
在FastGPT 4.6.9定制开发后升级Next.js到14版本，改用turbopack作为打包工具，合并4.8.x版本代码时，出现报错：`Error: The packages specified in the 'transpilePackages' conflict with the 'serverComponentsExternalPackages': mongoose, pg`。

## 可能原因
该报错源于FastGPT 4.8-preview版本新增的Next.js配置项冲突。具体配置包括`transpilePackages: ['@fastgpt/*', 'ahooks', '@chakra-ui/*', 'react']`，同时experimental配置中设置了`serverComponentsExternalPackages: ['mongoose', 'pg']`与`optimizePackageImports: ['mongoose', 'pg']`。Next.js 14中serverComponentsExternalPackages的优先级高于transpilePackages，当两者配置存在关联逻辑冲突时，触发该报错。

## 排查步骤
1. 确认项目基于FastGPT 4.6.9定制开发，已升级Next.js到14版本并使用turbopack打包工具。
2. 打开项目的next.config.js文件，查看transpilePackages与experimental.serverComponentsExternalPackages的配置内容。
3. 核对两个配置项的包列表，确认是否存在触发冲突的配置组合。
4. 运行项目，复现指定的报错文本。

## 解决与验证
根据报错提示与配置分析，需调整next.config.js中的配置项。首先确保transpilePackages与serverComponentsExternalPackages的包列表不会产生优先级冲突，可将serverComponentsExternalPackages中的包从transpilePackages中移除，或按照Next.js 14的配置规则优化配置。修改配置后重新启动项目，确认报错不再出现，项目可正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1568)
