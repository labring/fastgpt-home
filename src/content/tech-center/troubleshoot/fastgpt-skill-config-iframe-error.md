---
title: 解决FastGPT私有部署下skill配置页iframe加载错误问题
slug: /zh/troubleshoot/fastgpt-skill-config-iframe-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6909
source_type: GitHub issue
---

# 解决FastGPT私有部署下skill配置页iframe加载错误问题

## 现象
在`SHOW_SKILL=true`且使用K8s部署（OpenSandbox Server通过Ingress暴露）的场景下，Skill详情页的“skill配置”中内嵌iframe显示FastGPT自身页面，而非sandbox编辑器内容。当`AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY=true`（默认值）时，会生成错误的URL，将端口追加在路径末尾，例如`https://server-host/sandboxes/{id}/proxy/8080:8080`。

## 可能原因
根因是`proxy.ts`的URL拼接逻辑存在错误。当开启服务端代理模式时，OpenSandbox服务端返回的endpoint格式为`server-host/sandboxes/{id}/proxy/8080`，`@fastgpt-sdk/sandbox-adapter`的`getEndpoint()`会将整个字符串赋值给`host`字段（因无法找到冒号）。而`proxy.ts`固定拼接`${protocol}://${host}:${targetPort}`，导致端口被错误追加到路径末尾；同时`proxy.ts`未使用adapter返回的正确`url`字段，而是依赖`host`字段进行拼接。在K8s通过Ingress暴露OpenSandbox Server且无显式端口的场景下，该`host`解析逻辑会完全失效。

## 排查步骤
1. 确认当前为FastGPT私有部署版本v4.14.16，且已开启`SHOW_SKILL=true`，使用K8s部署OpenSandbox Server并通过Ingress暴露。
2. 检查配置项`AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY`是否为默认的`true`值，同时确认`AGENT_SANDBOX_OPENSANDBOX_BASEURL`已设置为正确的域名。
3. 打开Skill详情页的“skill配置”，查看浏览器网络请求，确认iframe加载的URL是否存在端口被追加到路径末尾的异常。
4. 验证SSE流是否正确返回sandbox endpoint（phase: ready），若SSE流正常但iframe显示异常，则可定位为此问题。

## 解决与验证
修复方案分为两部分：一是修改`proxy.ts`，使用adapter返回的`endpoint.url`替代`host:port`拼接逻辑；二是在Dockerfile的builder阶段，使用esbuild编译`server.ts`并覆盖standalone默认server，示例命令为`cd projects/app && ./node_modules/.bin/esbuild server.ts --bundle --platform=node --format=cjs --outfile=server-proxy.js --external:next`，并将编译后的文件复制到对应目录。完成修改并重新部署后，打开Skill详情页的“skill配置”，确认iframe正确加载sandbox编辑器内容，而非FastGPT自身页面，同时检查网络请求中的iframe URL是否为正确的转发地址。

> 来源：[FastGPT GitHub Issue #6909](https://github.com/labring/FastGPT/issues/6909)
