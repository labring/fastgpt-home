---
title: 解决FastGPT K8s部署pluginTemplates目录缺失问题
slug: /zh/troubleshoot/fastgpt-k8s-plugin-templates-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1013
source_type: GitHub issue
---

# 解决FastGPT K8s部署pluginTemplates目录缺失问题

## 现象
在Kubernetes环境部署FastGPT时，会出现pluginTemplates目录缺失的报错，导致服务无法正常加载模板资源。部分场景下即使Dockerfile中配置了复制该目录的指令，仍会触发该报错。此外，使用Helm方式部署FastGPT时，缺少pgvector相关的Helm Chart，使用PostgreSQL作为替代时会遇到适配问题。docker-compose配置中使用的Mongo镜像并非官方镜像，部署时需额外维护该镜像。
## 可能原因
pluginTemplates目录缺失问题的可能原因包括：Dockerfile中复制该目录的指令存在路径配置错误，导致目录未被正确复制到镜像内；镜像构建过程中复制指令未正常执行，目录未被包含在最终镜像中；Kubernetes部署配置中未正确挂载包含该目录的路径，或卷挂载操作覆盖了镜像内已存在的pluginTemplates目录。Helm部署的pgvector适配问题源于缺少官方的pgvector Helm Chart。Mongo镜像的原版本经过了源转化处理，需手动维护更新。
## 排查步骤
1. 检查Dockerfile中复制pluginTemplates目录的指令，确认源路径和目标路径的配置是否符合项目实际目录结构。
2. 构建镜像后，进入镜像内部查看pluginTemplates目录是否存在于指定的目标路径中。
3. 查看Kubernetes部署的YAML配置文件，确认是否存在卷挂载配置，检查挂载路径是否与pluginTemplates目录的目标路径一致，避免挂载操作覆盖原有目录。
4. 针对Helm部署的pgvector适配问题，需确认是否存在可用的pgvector Helm Chart，或参考官方相关配置完成PostgreSQL的适配。
## 解决与验证
针对pluginTemplates目录缺失问题：若Dockerfile中已配置复制指令但仍报错，需重新执行镜像构建流程，确保复制操作正确执行；若镜像内确实不存在该目录，需将项目原始的pluginTemplates目录复制到Dockerfile指定的目标路径，重新构建镜像；若为Kubernetes挂载问题，需调整部署配置中的卷挂载路径，确保该目录被正确保留或挂载。验证时，可进入运行中的Pod内部查看该目录是否存在，启动服务确认报错消失。
针对Helm部署的pgvector适配问题，可自行维护pgvector Helm Chart，或参考官方配置完成PostgreSQL适配。
针对Mongo镜像的问题，可直接使用官方Mongo镜像替代原镜像，无需额外维护自定义镜像。若需使用Helm方式部署FastGPT，相关贡献将被项目维护者欢迎。

> 来源: [FastGPT GitHub issue #1013](https://github.com/labring/FastGPT/issues/1013)
