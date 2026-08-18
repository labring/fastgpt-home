---
title: FastGPT V4.5.1版本升级操作与功能说明
slug: /zh/deploy/fastgpt-v451-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/451
source_type: 官方文档
---

# FastGPT V4.5.1版本升级操作与功能说明

## 版本更新内容
FastGPT V4.5.1版本为功能迭代更新，主要包含三项更新内容：一是新增知识库文件夹管理功能，可更高效地组织和管理知识库内容；二是修复了openai4.x SDK无法兼容OneAPI的智谱、阿里接口的问题，解决了相关接口调用异常的情况；三是修复了部分模块无法触发完成事件的问题，优化了系统运行的稳定性。

## 升级操作步骤
本次V4.5.1版本升级需执行初始化API完成数据库相关操作，具体步骤如下：
1. 替换命令中的参数：将`{{rootkey}}`替换为部署环境变量中的rootkey值，将`{{host}}`替换为自己的部署域名。
2. 执行以下curl命令发起初始化请求：
```bash
curl --location --request POST https://{{host}}/api/admin/initv451 \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
3. 初始化操作包含三项内容：重命名数据库字段、初始化Mongo APP表中知识库的相关字段、初始化PG和Mongo的内容，为每个文件创建Mongo存储集合并将相关信息赋值给PG。需注意，该初始化接口执行速度可能较慢，若返回超时无需额外处理，只需查看服务日志即可确认执行结果。

## 升级补充说明
本次V4.5.1版本升级无需复杂的配置调整，仅需执行上述初始化API即可完成版本升级。相较于V4.5版本需进行复杂更新的流程，V4.5.1的升级操作更为简洁便捷，可快速完成版本迭代。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/451)
