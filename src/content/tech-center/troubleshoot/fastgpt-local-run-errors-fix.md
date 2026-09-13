---
title: 解决FastGPT更新代码后本地运行的两类报错问题
slug: /zh/troubleshoot/fastgpt-local-run-errors-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/476
source_type: GitHub issue
---

# 解决FastGPT更新代码后本地运行的两类报错问题

## 现象
FastGPT私有部署版本用户在更新最新代码后，本地运行项目先后出现两类报错。第一类报错为`ReferenceError: window is not defined`；修复该报错后，又出现`TypeError: Cannot read properties of null (reading 'useMemo')`，相关报错日志指向react、next-i18next及react-dom的服务端渲染模块。

## 可能原因
第一个报错的直接原因是echarts库在服务端渲染环境中引用了仅客户端可用的window对象。第二个报错的触发场景为服务端渲染时，next-i18next的appWithTranslation方法在无效上下文下调用了useMemo，从日志来看该问题出现在react-dom服务端渲染流程中。

## 排查步骤
1. 拉取FastGPT私有部署版本的最新代码，执行本地启动命令，查看控制台输出的报错信息。
2. 若出现`ReferenceError: window is not defined`报错，打开`components/Markdown/index.tsx`文件，定位EChartsCodeBlock组件的动态导入代码。
3. 完成第一个报错的修复后，再次启动项目，检查是否出现`TypeError: Cannot read properties of null (reading 'useMemo')`报错。
4. 若出现第二个报错，可参考提供的报错日志，定位到react、next-i18next及react-dom相关的服务端渲染环节进行排查。

## 解决与验证
针对第一个报错`ReferenceError: window is not defined`，可通过修改`components/Markdown/index.tsx`文件中的EChartsCodeBlock组件定义来修复，具体代码修改为：
```tsx
const EChartsCodeBlock = dynamic(() => import('./img/EChartsCodeBlock'), {ssr:false});
```
修改完成后，重新执行本地启动命令，验证该报错是否消失。
若修复第一个报错后出现`TypeError: Cannot read properties of null (reading 'useMemo')`报错，可结合提供的报错日志定位相关环节，需按实际环境确认具体修复方案。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/476)
