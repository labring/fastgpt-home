---
title: 解决FastGPT pnpm dev启动时useMemo读取null属性报错问题
slug: /zh/troubleshoot/fastgpt-pnpm-dev-usememo-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/440
source_type: GitHub issue
---

# 解决FastGPT pnpm dev启动时useMemo读取null属性报错问题

## 现象
用户执行`pnpm dev`启动项目时，出现`TypeError: Cannot read properties of null (reading 'useMemo')`报错。报错堆栈显示，错误触发于`next-i18next`的`appWithTranslation.js`文件第68行调用`useMemo`时，后续调用链涉及react-dom服务端渲染相关逻辑，涉及的依赖包版本包括react@18.2.0、next-i18next@14.0.3、next@13.5.2、react-dom@18.2.0。

## 可能原因
该报错源于`next-i18next`的高阶组件在调用`useMemo`时无法读取到有效对象，导致尝试读取`useMemo`属性失败。可能的相关因素包括：本地node_modules依赖缓存异常、依赖包版本组合冲突，或是项目的i18n初始化配置存在缺失或错误。

## 排查步骤
1.  删除本地node_modules目录和锁文件，重新安装依赖：执行`rm -rf node_modules pnpm-lock.yaml && pnpm install`
2.  检查项目内与next-i18next相关的初始化配置，确认配置文件完整且格式合规
3.  核对当前使用的react、next、next-i18next版本，与报错中提及的react@18.2.0、next@13.5.2、next-i18next@14.0.3版本是否一致
4.  重新运行`pnpm dev`命令，观察报错是否仍然出现

## 解决与验证
若报错由依赖缓存异常或版本冲突导致，执行依赖重装后即可解决问题；若为配置问题，修正对应配置后重新启动项目即可。验证标准为成功启动`pnpm dev`，且未再出现`TypeError: Cannot read properties of null (reading 'useMemo')`的报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/440)
