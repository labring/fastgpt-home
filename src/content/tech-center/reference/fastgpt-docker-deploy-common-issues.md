---
title: FastGPT Docker部署场景下常见问题的排查与解决指南
slug: /zh/reference/fastgpt-docker-deploy-common-issues
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/deploy/docker
source_type: 官方文档小节
---

# FastGPT Docker部署场景下常见问题的排查与解决指南

## 结论
本文整理FastGPT Docker部署场景下的官方常见问题及对应解决方法，涵盖版本匹配、连接报错、端口冲突等高频场景。所有内容均来自官方文档FAQ小节，可根据具体报错文本或需求，对照步骤完成排查与修复。

## 具体怎么做
1. 版本匹配：核对FastGPT与FastGPT-plugin的官方版本对应关系
2. 环境变量管理：修改自定义环境变量，或执行对应步骤检查环境变量是否正常加载
3. 连接排查：检查Mongo副本集初始化状态、S3连接配置、API地址与密钥正确性
4. 端口冲突处理：调整容器映射的外网端口，避免与本地其他服务端口冲突
5. 报错修复：针对`relation "modeldata" does not exist`、`Operation auth_codes.findOne() buffering timed out after 10000ms`、`Illegal instruction`等指定报错，参照官方文档对应步骤处理
6. 其他场景：针对登录异常、无法导出知识库、语音输入/播报失败、root用户未注册提示等问题，优先检查网络与配置文件状态；部署Zilliz版本时需提前获取账号和密钥

## 注意事项
1. 所有操作仅适用于Docker部署场景，需严格遵循官方文档给出的参数与步骤
2. 不要随意修改未在文档中提及的环境变量或配置项
3. 需确保Mongo、向量数据库等依赖服务正常运行
4. 登录提示Network Error时，优先检查网络连接与配置文件正确性

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/deploy/docker)
