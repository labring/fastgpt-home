---
title: FastGPT V4.6.6版本配置、环境变量变更及升级说明
slug: /zh/deploy/fastgpt-v466-config-envar-change
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/466
source_type: 官方文档
---

# FastGPT V4.6.6版本配置、环境变量变更及升级说明

## 配置变更说明
FastGPT V4.6.6版本不再维护旧版config.json配置说明，用户需参考官方的模型配置方案和环境变量说明进行配置。商业版相关配置有两处调整：一是旧配置文件中的`SystemParams.pluginBaseUrl`需迁移至`PRO_URL`环境变量，格式为`PRO_URL=商业版镜像地址`，地址无需以`/API`结尾，示例为`http://fastgpt-plugin.ns-hsss5d.svc.cluster.local:3000`；二是旧配置中的`FeConfig`字段已被移除，无需再修改本地config.json，所有FastGPT参数和模型配置均可直接在商业版镜像的外网页面完成。

## 版本更新内容
V4.6.6版本新增多项功能：Http模块请求头支持Json编辑器、ReRank模型部署，同时新增分离向量语义检索、全文检索和重排的搜索方式，通过RRF进行排序合并。优化方面，优化了问题分类提示词与ID引导，国产商用API模型（百度、阿里、智谱、讯飞）使用Prompt模式均可完成分类；同时优化了UI设计，逐步替换新的UI样式，还完成了Icon抽离和自动化获取的代码优化。此外，修复了链接读取数据集时未保存选择器，导致同步时不使用选择器的问题。

## 迁移与配置步骤
1.  备份原有config.json配置文件，避免配置丢失；
2.  在部署环境中新增`PRO_URL`环境变量，赋值为商业版镜像地址，确保地址不以`/API`结尾；
3.  删除本地config.json文件中的`FeConfig`字段；
4.  将商业版镜像更新至V4.6.6版本；
5.  后续所有FastGPT参数与模型配置，均通过商业版镜像的外网页面进行调整，无需再修改本地config.json。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/466
