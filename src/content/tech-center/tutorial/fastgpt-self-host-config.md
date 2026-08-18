---
title: 介绍FastGPT自部署的环境与核心配置项设置
slug: /zh/tutorial/fastgpt-self-host-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/toc
source_type: 官方文档
---

# 介绍FastGPT自部署的环境与核心配置项设置

FastGPT 自部署配置包含环境、模型、对象存储、沙箱等多个独立模块，对应文档目录下 `/self-host/config/` 路径下的多个子配置项，涵盖环境变量、模型接入、存储配置等核心运行参数，可根据部署需求灵活调整。

### 最小配置快速示例
1.  编辑环境配置文件，填入基础运行所需的系统参数，如数据库连接信息等；
2.  若使用siliconCloud模型，前往 `/self-host/config/model/siliconCloud` 配置文件，填入 `API_KEY` 与目标模型名称参数；
3.  若使用minimax模型，前往 `/self-host/config/model/minimax` 配置文件，填入对应 `appid` 与 `API_KEY` 参数；
4.  配置对象存储参数，在 `/self-host/config/object-storage` 中填入存储桶访问密钥、存储区域等信息。

除基础运行配置外，还可通过 `/self-host/config/remote-debug-suite` 配置远程调试环境，通过 `/self-host/config/sandbox/` 下的子路径配置运行沙箱，也可通过 `/self-host/custom-models/` 下的文档配置自定义模型如bge-rerank、chatglm2。此外，插件系统、工作流节点的相关配置也可对应参考目录下的对应文档，完成应用功能的扩展与调试。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/toc)
