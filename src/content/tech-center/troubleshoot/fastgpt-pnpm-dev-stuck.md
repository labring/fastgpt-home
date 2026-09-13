---
title: 解决FastGPT执行pnpm dev后页面持续加载无响应问题
slug: /zh/troubleshoot/fastgpt-pnpm-dev-stuck
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/28
source_type: GitHub issue
---

# 解决FastGPT执行pnpm dev后页面持续加载无响应问题

## 现象
执行pnpm dev命令启动FastGPT后，访问localhost:3000，页面持续处于加载状态且无响应。telnet可正常连接对应端口，浏览器开发者工具控制台无报错信息，加载请求始终处于pending状态。该问题在M1、M2系列Mac设备上均有出现，使用Docker方式启动FastGPT也存在相同异常。

## 可能原因
该问题已知与环境版本不匹配相关，常见触发因素包括Node.js版本过低、项目依赖版本不符合要求，部分M1/M2系列Mac设备可能因环境适配问题出现异常。

## 排查步骤
1. 打开浏览器F12开发者工具，查看控制台是否存在报错信息。
2. 执行`node --version`、`pnpm -v`、`docker version`命令，记录当前Node.js、pnpm、Docker的版本信息。
3. 确认当前使用的设备是否为M1或M2系列Mac。

## 解决与验证
1. 升级Node.js版本至v19.6.0及以上，升级pnpm版本至8.3.1及以上。
2. 升级FastGPT项目的所有依赖包至适配版本。
3. 重新执行`pnpm dev`命令启动项目，访问localhost:3000，验证页面是否可正常加载并显示内容。
4. 若使用Docker启动，可同步升级Docker环境版本后重新尝试。

> 来源: [FastGPT GitHub issue #28](https://github.com/labring/FastGPT/issues/28)
