---
title: FastGPT 4.8.9私有部署启动后访问报错找不到package.json
slug: /zh/troubleshoot/fastgpt-package-not-found-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2494
source_type: GitHub issue
---

# FastGPT 4.8.9私有部署启动后访问报错找不到package.json

## 现象
用户在私有部署FastGPT 4.8.9版本时，执行`pnpm start -p 8002`启动服务，控制台输出Next.js 14.2.5的启动信息，包含警告`⚠ "next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.`，随后加载多个模型模块，显示`mongo connected`，之后抛出错误`Error: ENOENT: no such file or directory, open '/app/package.json'`，浏览器访问服务时出现报错。

## 可能原因
报错显示代码尝试读取`/app/package.json`文件但未找到，结合控制台的standalone模式启动警告，推测是使用了不匹配当前配置的启动命令。当`next.config.js`配置了`output: standalone`时，`next start`命令无法正常工作，此时服务运行的工作目录可能与预期不符，导致无法找到正确的package.json文件路径。

## 排查步骤
1. 查看启动控制台的输出，确认是否存在`"next start" does not work with "output: standalone"`的警告信息。
2. 检查项目的`next.config.js`配置文件，确认是否开启了`output: standalone`配置项。
3. 核对官方推荐的standalone模式启动命令，对比当前使用的`pnpm start -p 8002`命令是否匹配。
4. 查看当前服务运行的工作目录，确认实际的package.json文件所在路径，对比报错中的`/app/package.json`是否存在。

## 解决与验证
解决方法：停止使用`pnpm start`命令，按照控制台提示改用standalone模式的正确启动命令。若需指定端口，可通过`PORT`环境变量设置，例如执行`PORT=8002 node .next/standalone/server.js`。验证步骤：启动服务后，控制台无ENOENT相关报错，MongoDB连接与模型加载日志正常，访问服务页面可正常加载，无报错信息。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2494)
