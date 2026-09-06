---
title: 解决FastGPT本地启动时的JavaScript堆内存溢出报错问题
slug: /zh/troubleshoot/fastgpt-local-start-heap-oom
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/756
source_type: GitHub issue
---

# 解决FastGPT本地启动时的JavaScript堆内存溢出报错问题

## 现象
用户在`FastGPT/projects/app`目录下执行`pnpm dev`启动FastGPT项目，终端首先出现`ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time`的警告，随后提示端口3000被占用，自动切换到3001端口，完成`/404`和`/api/support/user/account/tokenLogin`等页面与接口的编译后，出现`react-i18next:: You will need to pass in an i18next instance by using initReactI18next`警告，MongoDB连接成功后，最终触发`FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`的JavaScript堆内存溢出报错，附带GC回收日志与JS堆栈跟踪。

## 可能原因
该问题的核心报错为JavaScript堆内存耗尽。结合启动过程中的全量编译环节，大概率是Node.js默认的堆内存上限无法满足当前项目启动时的资源占用需求。具体触发细节需按实际环境确认。

## 排查步骤
1.  查看完整终端输出日志，确认存在`ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time`警告、`react-i18next:: You will need to pass in an i18next instance by using initReactI18next`警告、`mongo connected`提示，以及最终的`FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`报错。
2.  确认当前执行启动命令的目录为`FastGPT/projects/app`，且使用的启动命令为`pnpm dev`。
3.  检查系统中是否存在占用3000或自动分配的3001端口的其他进程，避免端口冲突影响资源分配。
4.  通过系统自带的进程查看工具确认Node.js进程的内存使用情况，排查是否存在内存持续增长未释放的异常。

## 解决与验证
通过调整Node.js的堆内存上限参数，可以缓解内存不足问题。在启动命令前添加`NODE_OPTIONS="--max-old-space-size=4096"`，修改后的完整启动命令为`NODE_OPTIONS="--max-old-space-size=4096" pnpm dev`。执行该命令后，观察终端日志，确认编译环节正常完成，无内存溢出报错，项目成功启动即可验证问题解决。若仍存在`react-i18next`相关警告，需按照项目配置要求补充对应的i18next实例参数。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/756)
