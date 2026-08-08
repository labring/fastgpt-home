---
title: 配置FastGPT Agent Sandbox通用运行参数与部署步骤
slug: /zh/deploy/agent-sandbox-common-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/common
source_type: 官方文档
---

# 配置FastGPT Agent Sandbox通用运行参数与部署步骤

Agent Sandbox通用配置适用于opensandbox和sealosdevbox两种提供商，无论选择哪种提供商，都需先部署fastgpt-agent-sandbox-proxy服务，并按需配置沙盒内的依赖源。需注意，fastgpt-pro版本不提供Sandbox Editor和WebSocket proxy链路，其配置要求与标准版存在差异。

## 标准部署与配置步骤
1. 部署sandbox-proxy：参考agent-sandbox-proxy.yml将service添加到配置文件，开放外网访问端口，记录AGENT_SANDBOX_PROXY_SECRET环境变量（后续需使用）。该服务的环境变量包括默认监听端口1006、与主服务共用的密钥AGENT_SANDBOX_PROXY_SECRET（至少32位）、回源主服务的内网地址默认http://fastgpt-app:3000等。
2. 修改FastGPT环境变量：在fastgpt-app中添加三项环境变量：AGENT_SANDBOX_PROXY_SECRET（替换为32位以上随机密钥）、AGENT_SANDBOX_PROXY_URL（浏览器可访问的WebSocket地址，建议使用wss协议）、AGENT_SANDBOX_PREVIEW_PROXY_URL（沙盒文件预览的HTTP(S)地址）。对于fastgpt-pro，无需配置前两个变量，但必须配置AGENT_SANDBOX_PREVIEW_PROXY_URL，且建议该地址与FastGPT主站不同源，避免沙盒内的用户脚本访问主站凭证。
3. 启动验证：重启fastgpt-app、fastgpt-pro和fastgpt-agent-sandbox-proxy服务，访问代理服务的/health路径，正常返回OK即为部署成功。
4. 接入沙盒服务：完成proxy部署后，可选择Sealos cloud沙盒接入或Opensandbox部署方案。

## 额外配置与常见问题
可通过环境变量配置沙盒内的依赖源，如AGENT_SANDBOX_NPM_REGISTRY用于配置npm等包管理器的镜像源，默认使用https://registry.npmmirror.com；AGENT_SANDBOX_PYPI_INDEX_URL用于配置PyPI镜像源，默认使用https://pypi.tuna.tsinghua.edu.cn/simple。同时可配置资源限制参数，包括单实例CPU核数上限默认1核、内存上限默认2048MiB、存储容量默认1GiB等，以及生命周期参数，如自动暂停时间默认60分钟、自动归档时间默认7天。若启用Agent Sandbox后出现`AGENT_SANDBOX_PROXY_URL or AGENT_SANDBOX_PREVIEW_PROXY_URL is required`报错，需检查对应环境变量是否配置完整。此外，预览链接为短期只读权限，请勿分享给未授权访问该工作区的用户。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/common
