---
title: 解决FastGPT源码运行时MongoDB连接uri未定义的报错问题
slug: /zh/troubleshoot/fastgpt-mongo-uri-undefined-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2552
source_type: GitHub issue
---

# 解决FastGPT源码运行时MongoDB连接uri未定义的报错问题

## 现象
运行`pnpm dev`启动FastGPT源码后，访问`http://localhost:3000/` 出现MongoDB连接错误，报错文本为`MongooseError: The 'uri' parameter to 'openUri()' must be a string, got "undefined". Make sure the first parameter to 'mongoose.connect()' or 'mongoose.createConnection()' is a string.`。用户确认MongoDB可通过内网正常连接，启动过程中会打印`mongo start connect`日志，随后触发该报错。

## 可能原因
该报错来自代码调用栈中的`connectMongo`函数（位于`../../packages/service/common/mongo/init.ts`），核心问题是调用`mongoose.connect()`时传入的连接地址参数为`undefined`，通常是因为环境变量中未配置或未正确读取MongoDB连接地址。

## 排查步骤
1.  检查项目的环境变量配置文件，确认存在MongoDB连接地址的配置项，确认配置项名称与代码读取逻辑匹配（需按实际环境确认具体配置项名称）。
2.  确认启动项目前已正确加载环境变量，检查启动命令是否包含环境变量加载步骤，确保在配置完成的环境中执行启动命令。
3.  对照日志顺序，确认在打印`mongo start connect`后立即出现该报错，说明连接逻辑已触发但未获取到有效连接地址。
4.  查看`packages/service/common/mongo/init.ts`文件中的`connectMongo`函数，核对环境变量读取逻辑，确认是否正确获取到配置值。

## 解决与验证
解决方法：补全并修正环境变量中的MongoDB连接地址配置，确保`mongoose.connect()`接收的参数为有效字符串格式的连接地址。
验证步骤：
1.  将正确的MongoDB连接地址配置到环境变量中。
2.  执行`pnpm dev`重新启动项目。
3.  访问`http://localhost:3000/`，确认不再出现该MongoDB连接报错，且服务正常加载模型（如日志中出现`Load model====== chatitems`等正常加载日志）。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2552)
