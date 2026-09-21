---
title: 解决FastGPT技能配置页iframe显示非沙箱编辑器的问题
slug: /zh/troubleshoot/fastgpt-skill-iframe-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6909
source_type: GitHub issue
---

# 解决FastGPT技能配置页iframe显示非沙箱编辑器的问题

## 现象
当`SHOW_SKILL=true`且使用K8s部署，OpenSandbox Server通过Ingress暴露时，技能详情页的"skill配置"内嵌iframe显示的是 FastGPT 自身页面，不是沙箱编辑器内容。SSE流正确返回sandbox endpoint（phase: ready），但iframe加载`/proxy/{sandboxId}/{port}/`后显示错误页面。

## 可能原因
当`AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY=true`（默认值）时，OpenSandbox服务端返回的endpoint格式为`server-host/sandboxes/{id}/proxy/8080`。`@fastgpt-sdk/sandbox-adapter`的`getEndpoint()`将整个字符串赋给`host`字段，因为`lastIndexOf(":")`找不到冒号。`proxy.ts`固定拼接`${protocol}://${host}:${targetPort}`，会生成错误URL，例如`https://server-host/sandboxes/{id}/proxy/8080:8080`，将端口追加在路径末尾。根因是`proxy.ts`假设`host`是纯主机名后拼接端口，但`useServerProxy=true`模式下endpoint是带路径的URL，`host`字段包含完整路径，未使用adapter返回的正确`url`字段。

## 排查步骤
1. 确认部署环境为K8s，且OpenSandbox Server通过Ingress暴露，使用HTTPS且无显式端口。
2. 检查配置项`AGENT_SANDBOX_OPENSANDBOX_BASEURL`是否设置为实际域名地址。
3. 确认`AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY`为默认值`true`。
4. 打开技能详情页，点击"skill配置"，查看SSE日志是否正确返回sandbox endpoint（phase: ready）。
5. 查看iframe加载的URL，确认是否存在端口追加在路径末尾的错误。

## 解决与验证
### 修复方案
1. 修改`proxy.ts`：使用`endpoint.url`替代`host:port`拼接，不再手动拼接端口。
2. 调整Dockerfile构建流程：在builder阶段用esbuild编译`server.ts`，覆盖standalone默认server，示例代码：
```dockerfile
RUN cd projects/app && ./node_modules/.bin/esbuild server.ts \
    --bundle --platform=node --format=cjs \
    --outfile=server-proxy.js --external:next
COPY --from=builder /app/projects/app/server-proxy.js /app/projects/app/server-proxy.js
```
### 验证步骤
重新部署服务后，打开技能详情页的"skill配置"，确认 iframe 加载后显示沙箱编辑器内容，不再显示 FastGPT 自身页面。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6909)
