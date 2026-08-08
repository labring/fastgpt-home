---
title: FastGPT V4.8.3版本升级指南与更新内容说明
slug: /zh/deploy/fastgpt-v483-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/483
source_type: 官方文档
---

# FastGPT V4.8.3版本升级指南与更新内容说明

## V4.8.3版本更新详情
FastGPT V4.8.3版本包含多项实用的功能新增与问题修复。在功能新增层面，首先支持了Milvus数据库，相关的部署配置可参考官方提供的docker-compose-milvus.yml文件进行适配；其次为chat接口的empty answer返回场景新增了日志输出能力，能够帮助开发者更高效地排查模型相关问题；第三新增了ifelse判断器，且该判断器的字符串判断逻辑支持正则表达式匹配，提升了条件判断的灵活性；第四在代码运行模块中新增了console.log输出功能，方便开发者在调试代码时查看运行状态。在问题修复层面，本次版本修复了变量更新操作在Debug模式下出现的错误问题，优化了调试流程的稳定性。

## 版本升级操作步骤
针对已部署的FastGPT实例，完成V4.8.3版本的升级需执行以下标准化操作：首先，修改部署所用的镜像标签，将fastgpt基础镜像的tag值调整为v4.8.3；其次，将fastgpt-sandbox镜像的tag值同样修改为v4.8.3；最后，若您的部署使用了商业版镜像，也需将其tag值修改为v4.8.3。完成所有镜像标签的修改后，重新启动对应的部署服务，即可完成V4.8.3版本的升级。如果您需要使用本次新增的Milvus数据库支持功能，则需要同步更新部署配置文件为docker-compose-milvus.yml，并完成对应数据库服务的启动配置。

## 升级适配提示
本次V4.8.3版本升级未涉及强制的环境变量变更操作，相较于部分过往版本，升级流程更为简洁。仅需完成镜像标签的调整即可完成基础版本升级，如需使用新增的Milvus数据库功能，则需额外参考对应配置文件完成相关适配。对于需要使用新增的ifelse判断器正则匹配、代码调试日志等功能的用户，在完成版本升级后即可直接启用对应功能，无需额外的配置步骤。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/483
