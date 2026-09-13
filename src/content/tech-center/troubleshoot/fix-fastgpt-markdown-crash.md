---
title: 解决FastGPT中Markdown A组件渲染引发的页面崩溃问题
slug: /zh/troubleshoot/fix-fastgpt-markdown-crash
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4719
source_type: GitHub issue
---

# 解决FastGPT中Markdown A组件渲染引发的页面崩溃问题

## 现象
使用FastGPT私有部署版4.9.6或4.9.7时，渲染Markdown A组件会导致页面崩溃。浏览器控制台会出现如下警告：`Warning: React has detected a change in the order of Hooks called by A. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks`，同时会打印多轮Hook调用顺序不一致的日志。

## 可能原因
问题出在`projects/app/src/components/Markdown/A.tsx`组件中，该组件在if语句内调用了React Hooks。根据React Hooks的使用规则，Hooks必须在函数组件的顶层调用，不能在条件判断、循环等代码块内使用。当组件多次渲染时，if语句内的Hook会出现执行顺序不一致的情况，最终引发页面崩溃。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.9.6或4.9.7。
2. 打开浏览器开发者工具的控制台面板，查看是否出现React Hooks调用顺序异常的警告。
3. 定位到`projects/app/src/components/Markdown/A.tsx`组件文件，检查代码中是否存在if语句内调用Hooks的情况。

## 解决与验证
首先，将if语句内需要执行的Hook逻辑抽离为独立的函数组件，确保所有Hooks都在独立组件的顶层调用，避免执行顺序不一致的问题。其次，在项目的ESLint配置中加入`react-hooks/rules-of-hooks`规则，执行全量代码检查，修复其他可能存在的同类违规代码。验证时，重新构建并部署项目，确认页面不再崩溃，控制台无上述React Hooks警告。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4719)
