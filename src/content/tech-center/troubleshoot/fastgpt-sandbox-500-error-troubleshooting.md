---
title: FastGPT v4.8.2代码运行节点调用sandbox返回500错误排查
slug: /zh/troubleshoot/fastgpt-sandbox-500-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1637
source_type: GitHub issue
---

# FastGPT v4.8.2代码运行节点调用sandbox返回500错误排查

## 现象
用户使用docker-compose部署FastGPT v4.8.2私有版本后，在工作流中运行JS代码节点时，返回AxiosError报错，具体报错信息为：
```json
{
  "message": "Request failed with status code 500",
  "name": "AxiosError",
  "method": "post",
  "url": "http://sandbox:3000/sandbox/js",
  "code": "ERR_BAD_RESPONSE"
}
```
FastGPT容器日志显示代码运行节点执行完成，但无有效返回结果；sandbox容器日志会重复输出`error => Not an invalid response`报错信息。

## 可能原因
结合报错日志与部署环境，存在两类核心可能原因：
1. FastGPT容器与sandbox容器之间的网络连通异常，无法正常访问sandbox服务的`http://sandbox:3000/sandbox/js`接口；
2. sandbox服务在处理JS代码运行请求时，返回了无效的响应内容，触发了500错误。

## 排查步骤
1. 确认sandbox容器运行状态：执行`docker ps`命令，检查sandbox容器是否处于正常启动状态，可通过查看sandbox容器日志确认是否输出`Application is running on: http://127.0.0.1:3000`字样。
2. 验证网络连通性：进入FastGPT容器内部，执行`curl http://sandbox:3000/sandbox/js`命令，检查是否能正常连通sandbox服务。
3. 查看sandbox错误日志：通过`docker logs -f sandbox容器名`命令查看sandbox容器的实时日志，确认是否重复出现`error => Not an invalid response`报错。
4. 检查环境变量配置：确认FastGPT的环境变量中已正确配置sandbox相关参数，确保服务地址指向正确的sandbox容器地址。

## 解决与验证
若排查发现是网络连通问题，需检查docker-compose.yml中的网络配置，确保FastGPT与sandbox容器处于同一网络环境，修复网络策略后重启容器。若为sandbox服务异常，可先重启sandbox容器，若问题仍存在，重新拉取v4.8.2版本的sandbox镜像并重新部署。
验证方式为：在FastGPT工作流中重新运行JS代码节点，确认不再出现500错误，且能正常返回代码运行结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1637)
