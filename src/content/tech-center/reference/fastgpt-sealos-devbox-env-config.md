---
title: 配置FastGPT使用Sealos Devbox作为Agent沙盒的相关环境变量
slug: /zh/reference/fastgpt-sealos-devbox-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/sandbox/sealosdevbox
source_type: 官方文档小节
---

# 配置FastGPT使用Sealos Devbox作为Agent沙盒的相关环境变量

## 结论
启用Sealos Devbox作为FastGPT的Agent沙盒，需在fastgpt-app与fastgpt-pro服务中配置指定环境变量。完成配置后，FastGPT即可调用该沙盒服务。

## 具体怎么做
在fastgpt-app和fastgpt-pro服务中添加以下环境变量：
| 环境变量名 | 取值 |
| --- | --- |
| AGENT_SANDBOX_PROVIDER | sealosdevbox |
| AGENT_SANDBOX_SEALOS_BASEURL | https://devbox-server.example.com |
| AGENT_SANDBOX_SEALOS_TOKEN | 替换为客服提供的访问密钥 |
| AGENT_SANDBOX_SEALOS_IMAGE | hub.hzh.sealos.run/labring/devbox-sandbox:v0.2.0 |
| AGENT_SANDBOX_CPU_COUNT | 1 |
| AGENT_SANDBOX_MEMORY_MIB | 2048 |
| AGENT_SANDBOX_STORAGE_SIZE_GI | 1 |

## 注意事项
1. 需确保FastGPT主服务可以访问AGENT_SANDBOX_SEALOS_BASEURL指定的API地址。
2. AGENT_SANDBOX_MEMORY_MIB的单位为MiB，AGENT_SANDBOX_STORAGE_SIZE_GI的单位为GB。
3. AGENT_SANDBOX_SEALOS_TOKEN需替换为客服提供的实际访问密钥。
4. 沙盒镜像需使用文档指定的镜像地址。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/sandbox/sealosdevbox)
