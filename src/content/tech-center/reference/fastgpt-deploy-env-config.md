---
title: FastGPT部署时修改环境变量的配置要求与操作步骤
slug: /zh/reference/fastgpt-deploy-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/deploy/docker
source_type: 官方文档小节
---

# FastGPT部署时修改环境变量的配置要求与操作步骤

# FastGPT部署时修改环境变量的配置要求与操作步骤

## 结论
部署FastGPT时需按要求配置指定环境变量，正确配置可保障服务正常访问与沙盒功能生效。FastGPT自部署需配置指定的环境变量才能正常运行，根据部署场景不同，需配置的环境变量存在差异，部分场景还有额外必填项或操作要求，若启用Agent/Skill沙盒，还需额外配置对应代理地址参数。

## 具体怎么做
1.  配置必填环境变量`FE_DOMAIN`：设置为用户实际访问FastGPT的完整地址，格式为协议+主机+可选端口，示例为`https://fastgpt.example.com`，不可留空，不可使用容器内部地址。
2.  如需启用Agent/Skill沙盒，额外配置以下参数：
    - `AGENT_SANDBOX_PROXY_URL`：浏览器访问Sandbox Proxy的WebSocket地址，使用`ws://`或`wss://`，需指向3006端口，示例为`wss://sandbox-proxy.example.com`。
    - 4.16及以上版本额外配置`AGENT_SANDBOX_PREVIEW_PROXY_URL`：浏览器访问沙盒文件预览的HTTP(S)地址，需指向3006端口，示例为`https://sandbox-proxy.example.com`。
3.  部署Zilliz版本需参考官方文档获取账号和密钥，参考对应部署指引，其他版本可直接进入下一步。
4.  使用交互式安装脚本时，脚本会在确认部署前询问上述地址。

## 注意事项
1.  `FE_DOMAIN`为强制必填项，不可留空，不可填写容器内部地址。
2.  Agent沙盒相关配置仅在启用对应功能时需要配置，所有沙盒相关代理地址需正确指向3006端口。
3.  `AGENT_SANDBOX_PREVIEW_PROXY_URL`仅需在4.16及以上版本中配置。
4.  仅Zilliz版本需要参考官方文档获取账号和密钥，其他版本无需此操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/deploy/docker)
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host)
