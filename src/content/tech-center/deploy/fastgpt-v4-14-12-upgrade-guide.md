---
title: FastGPT V4.14.12版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4-14-12-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41412
source_type: 官方文档
---

# FastGPT V4.14.12版本升级步骤与更新内容说明

## 版本更新内容
本版本为FastGPT V4.14.x系列的V4.14.12正式更新，包含修复、新增与优化三类内容：
### 修复问题
1.  修复知识库三级目录`path`接口报zod校验出错的问题
2.  修复`v1/completions`接口`dataId`异常，导致API调用时对话日志无法获取运行详情的问题
3.  修复对话Agent应用敏感信息过滤勾选框无法取消的问题
### 新增功能
1.  响应值支持自定义HttpStatus状态码
2.  Agent调度器新增PI Agent模式（beta功能）
### 优化内容
优化`skill`接口的错误处理逻辑。

## 升级操作步骤
仅需更新对应服务的镜像tag即可完成升级：
1.  更新`fastgpt-app`（FastGPT主服务）镜像tag为`v4.14.12`
2.  更新`fastpgt-pro`（商业版）镜像tag为`v4.14.12`

## 使用注意事项
1.  PI Agent模式为beta测试功能，仅建议在测试环境使用，不推荐生产环境部署
2.  自定义HttpStatus状态码需符合HTTP协议规范，避免使用非法状态码导致服务异常
3.  本次升级仅适用于已部署V4.14.x系列版本的用户，若使用更早版本需先完成同系列版本适配
4.  若未遇到本次修复的三类问题，可根据自身业务需求选择是否执行升级操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41412)
