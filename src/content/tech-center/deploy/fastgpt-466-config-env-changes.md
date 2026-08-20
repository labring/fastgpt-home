---
title: FastGPT V4.6.6版本配置与环境变量变更说明
slug: /zh/deploy/fastgpt-466-config-env-changes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/466
source_type: 官方文档
---

# FastGPT V4.6.6版本配置与环境变量变更说明

## 配置与商业版变更说明
旧版`config.json`配置说明已不再维护，当前版本需参考官方的「模型配置方案」和「环境变量说明」文档进行配置。商业版相关调整：将旧配置文件中的`SystemParams.pluginBaseUrl`迁移至环境变量`PRO_URL`，取值无需以`/API`结尾，示例为`PRO_URL=http://fastgpt-plugin.ns-hsss5d.svc.cluster.local:3000`。原配置中的`FeConfig`字段已被移除，无需再修改本地`config.json`文件，直接访问新版商业版镜像的外网地址即可完成所有系统参数与模型的配置。

## 版本更新内容
本次V4.6.6版本新增多项功能：Http模块请求头支持JSON编辑器；新增ReRank模型部署；新增分离向量语义检索、全文检索与重排的组合搜索方式，通过RRF算法完成排序合并。优化内容包括：优化问题分类提示词与ID引导，支持百度、阿里、智谱、讯飞等国产商用API模型使用Prompt模式完成分类；启动UI设计的逐步替换工作；完成Icon抽离与自动化获取的代码优化。修复了链接读取数据集未保存选择器，导致同步时不使用选择器的问题。

## 快速配置操作步骤
1. 拉取对应版本的FastGPT商业版镜像；
2. 在部署环境中配置环境变量`PRO_URL`，填入插件服务地址，确保地址不以`/API`结尾；
3. 无需修改本地`config.json`文件，直接访问新版商业版镜像的外网地址，完成所有系统参数与模型的配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/466)
