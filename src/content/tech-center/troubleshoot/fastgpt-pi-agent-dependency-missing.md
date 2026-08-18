---
title: FastGPT v4.14.16/17 Pi Agent空响应问题排查与解决
slug: /zh/troubleshoot/fastgpt-pi-agent-dependency-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6865
source_type: GitHub issue
---

# FastGPT v4.14.16/17 Pi Agent空响应问题排查与解决

## 现象
使用`ghcr.io/labring/fastgpt:v4.14.16`或`ghcr.io/labring/fastgpt:v4.14.17`镜像，配置`AGENT_ENGINE=pi`启动服务后，向带有chatNode工作流的应用发送聊天消息，会返回空内容且无错误日志。直接在对应容器内执行依赖检查命令，会提示`Cannot find module '@mariozechner/pi-ai'`。

## 可能原因
1.  Docker镜像构建遗漏依赖：`projects/app/Dockerfile`的runner阶段仅复制了`tiktoken`和`@zilliz/milvus2-sdk-node`两个node_modules目录，未包含`@mariozechner/pi-ai`和`@mariozechner/pi-agent-core`；且由于依赖通过动态`await import()`加载，Next.js standalone输出的tracing未自动捕获这些包。
2.  Next.js构建转换问题：Next.js会将动态`import()`编译为`require()`，而这两个包为ESM-only格式，`package.json`中仅声明了`"import"`导出，未声明`"require"`，引发CJS/ESM互操作问题。
3.  版本适配问题：受影响版本分别使用Node 20.14.0和Node 24.15.0，该互操作问题在对应版本中触发。

## 排查步骤
1.  执行依赖检查命令：替换对应镜像版本，运行`docker run --rm --entrypoint sh [镜像地址] -c 'node -e "require.resolve(\"@mariozechner/pi-ai\")"'`，若输出`Cannot find module '@mariozechner/pi-ai'`则确认存在依赖缺失问题。
2.  启动服务并测试：配置`AGENT_ENGINE=pi`启动FastGPT，创建包含chatNode工作流的应用，发送聊天消息，观察是否返回空内容且无错误日志。

## 解决与验证
解决方法：修改`projects/app/Dockerfile`的runner阶段，添加复制缺失依赖的指令，例如补充`COPY --from=maindeps /app/node_modules/@mariozechner/pi-ai ./node_modules/@mariozechner/pi-ai`和`COPY --from=maindeps /app/node_modules/@mariozechner/pi-agent-core ./node_modules/@mariozechner/pi-agent-core`；或调整Next.js构建配置以正确捕获动态导入的ESM依赖。
验证步骤：
1.  重新构建FastGPT镜像，确保缺失的依赖已被复制到镜像中。
2.  再次执行依赖检查命令，确认模块可被正常解析，无`Cannot find module`报错。
3.  启动服务并测试Pi Agent工作流，确认聊天消息可返回正常内容。

> 来源：[FastGPT GitHub Issue #6865](https://github.com/labring/FastGPT/issues/6865)
