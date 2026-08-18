---
title: FastGPT V4.5.1版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v451-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/451
source_type: 官方文档
---

# FastGPT V4.5.1版本升级步骤与更新内容说明

## 版本更新内容
FastGPT V4.5.1 属于需执行专属升级脚本的版本，本次更新包含三项核心优化：新增知识库文件夹管理功能；修复了openai4.x SDK无法兼容oneapi的智谱与阿里接口的问题；修复部分模块无法触发完成事件的异常。

## 升级执行步骤
完成版本镜像更新后，需执行初始化API完成数据库与存储结构的适配。具体操作如下：
将命令中的`{{rootkey}}`替换为部署环境变量中的rootkey，`{{host}}`替换为你的服务域名，执行以下curl命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv451 \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
初始化操作会依次完成数据库字段重命名、Mongo APP表中知识库相关字段的初始化，以及为每个文件创建Mongo集合并将对应信息赋值至PG。需注意，该接口执行速度较慢，若返回超时无需中断操作，直接查看服务日志即可确认执行结果。

## 升级注意事项
本次升级仅适用于V4.5.1版本的部署升级，V4.5版本需进行较为复杂的更新操作。执行初始化接口时，请勿手动修改或干预数据库内容，避免引发数据异常。若升级过程中出现日志报错，需优先排查环境变量配置与服务域名指向是否正确。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/451)
