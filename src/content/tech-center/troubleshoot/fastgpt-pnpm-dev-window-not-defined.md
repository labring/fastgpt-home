---
title: 解决FastGPT私有化部署pnpm dev时window未定义报错问题
slug: /zh/troubleshoot/fastgpt-pnpm-dev-window-not-defined
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1030
source_type: GitHub issue
---

# 解决FastGPT私有化部署pnpm dev时window未定义报错问题

## 现象
私有部署FastGPT完成后，执行`pnpm dev`命令时出现报错，核心报错文本为`ReferenceError: window is not defined`。该错误发生在页面生成阶段，调用栈指向`echarts@5.4.1`的依赖文件`echarts/dist/echarts.js`，以及项目中的`src/components/Markdown/img/EChartsCodeBlock.tsx`组件。

## 可能原因
该报错的核心原因是在Next.js服务端渲染（SSR）环境中，直接引入了依赖浏览器`window`全局对象的`echarts`库。Next.js服务端运行环境不存在浏览器的`window`对象，当服务端编译或渲染包含`echarts`依赖的代码时，就会触发`window is not defined`的错误。当前用户环境的node版本为v21.7.1，pnpm版本为8.15.5，部署步骤未出现异常报错。

## 排查步骤
1.  根据调用栈定位到报错相关的组件文件`src/components/Markdown/img/EChartsCodeBlock.tsx`，确认该组件的依赖引入情况。
2.  检查该组件是否在未做客户端限制的情况下直接导入了`echarts`库。
3.  确认当前项目使用Next.js框架，服务端渲染阶段确实不存在`window`全局对象。
4.  核对当前使用的`echarts`版本为5.4.1，确认该版本的兼容性配置。

## 解决与验证
可以通过Next.js的动态导入功能，将ECharts相关组件配置为仅在客户端渲染加载。具体操作示例：使用`next/dynamic`导入组件并关闭SSR选项，代码大致为`import dynamic from 'next/dynamic'; const EChartsCodeBlock = dynamic(() => import('./EChartsCodeBlock.tsx'), { ssr: false });`。修改完成后，重新执行`pnpm dev`命令，确认不再出现`ReferenceError: window is not defined`的报错，项目可以正常启动运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1030)
