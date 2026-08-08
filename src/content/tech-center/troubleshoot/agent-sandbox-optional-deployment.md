---
title: FastGPT中agent-sandbox的可选性及停用使用说明
slug: /zh/troubleshoot/agent-sandbox-optional-deployment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6688
source_type: GitHub issue
---

# FastGPT中agent-sandbox的可选性及停用使用说明

## 现象
用户在使用FastGPT私有部署v4.14.10版本时，注意到agent-sandbox的默认容器配置需要挂载`/var/run/docker.sock:/var/run/docker.sock:ro`，担心该挂载项会赋予容器过高的主机权限，带来安全风险，因此询问两个问题：不配置agent-sandbox是否仍可正常使用FastGPT，以及agent-sandbox是否为部署必选项。

## 可能原因
agent-sandbox是FastGPT的可选组件，主要用于提供沙箱执行环境，其默认配置的挂载项是为了让沙箱能够调用本地Docker资源完成相关任务，但该组件并非强制依赖项，用户可根据自身业务需求自主选择是否部署。

## 排查步骤
1. 确认当前使用的FastGPT私有部署版本为v4.14.10，与问题反馈的版本一致；
2. 检查FastGPT的部署配置文件，确认是否存在agent-sandbox相关的容器启动配置；
3. 评估自身业务是否需要使用agent-sandbox提供的沙箱执行能力，以此判断是否需要保留该组件。

## 解决与验证
agent-sandbox属于可选项，并非FastGPT部署的必选组件。若不配置agent-sandbox，需按实际环境确认是否会影响FastGPT的核心功能运行，目前无明确的强制依赖场景说明。无需使用agent-sandbox时，无需配置`/var/run/docker.sock:/var/run/docker.sock:ro`挂载项，可避免相关权限风险。验证方式为：移除agent-sandbox的部署配置后，重新启动FastGPT服务，检查核心基础功能是否可正常使用，具体功能影响需结合实际业务场景确认。

> 来源：https://github.com/labring/FastGPT/issues/6688
