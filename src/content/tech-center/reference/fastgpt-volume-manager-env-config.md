---
title: FastGPT Volume Manager环境变量配置参数说明
slug: /zh/reference/fastgpt-volume-manager-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT Volume Manager环境变量配置参数说明

## 结论
FastGPT Volume Manager的环境变量由projects/volume-manager/src/env.ts加载和校验。配置时需保证VM_AUTH_TOKEN与FastGPT侧OpenSandbox的AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN保持一致，这些变量用于定义服务运行的核心参数。

## 具体怎么做
1. 确定Volume Manager的运行时类型，可选docker或kubernetes。
2. 配置必填的VM_AUTH_TOKEN，确保其与FastGPT侧OpenSandbox的对应Token完全一致。
3. 根据所选运行时类型，配置对应专属环境变量：
| 变量名 | 默认值 | 适用场景 |
| --- | --- | --- |
| PORT | 3000 | 所有场景 |
| VM_AUTH_TOKEN | 无，必填 | 所有场景 |
| VM_RUNTIME | kubernetes | 所有场景 |
| VM_DOCKER_SOCKET | /var/run/docker.sock | docker模式 |
| VM_DOCKER_API_VERSION | v1.44 | docker模式 |
| VM_K8S_NAMESPACE | opensandbox | kubernetes模式 |
| VM_K8S_PVC_STORAGE_CLASS | standard | kubernetes模式 |
| VM_LOG_LEVEL | info | 所有场景 |

## 注意事项
1. VM_AUTH_TOKEN为必填项，未配置会导致服务鉴权失败。
2. 仅docker运行模式需要配置VM_DOCKER_SOCKET和VM_DOCKER_API_VERSION，其他模式无需配置。
3. 仅kubernetes运行模式需要配置VM_K8S_NAMESPACE和VM_K8S_PVC_STORAGE_CLASS，其他模式无需配置。
4. 日志等级仅支持debug、info、none三种选项，配置其他值会触发校验失败。
5. 所有环境变量需符合projects/volume-manager/src/env.ts的校验规则，否则服务无法正常启动。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
