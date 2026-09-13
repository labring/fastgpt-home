---
title: FastGPT V4.15.4版本升级操作与验证说明
slug: /zh/deploy/upgrade-v4-15-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4154
source_type: 官方文档
---

# FastGPT V4.15.4版本升级操作与验证说明

## 这个版本改了什么
本版本无公开新增功能说明，包含两项优化与七项修复，同时更新了fastgpt-app与fastgpt-pro的镜像tag，版本均为v4.15.4。优化内容包括工作流文件上下文管理，减少重复签发并避免潜在安全问题，以及优化思考Icon动画。修复的问题包括：chatbox流输出时系统工具错误不展示；完整运行详情中纯文本工具响应UI的Markdown解析格式错乱；切换向量模型后训练任务触发但已有数据向量未重建；MinIO按前缀批量删除大量对象时XML实体展开限制失败的问题，并增加请求超时保护；企业认证银行账号校验问题；Agent V2中工具列表和提示词矛盾的问题；部署脚本.yaml的语法问题。

## 升级前要确认的事
需配置必填环境变量FE_DOMAIN，值为客户端访问FastGPT的地址，由协议、主机和可选端口组成。公网部署填写实际公网访问地址，本地开发可使用http://localhost:3000。原SYNC_INDEX环境变量已弃用，新增MONGO_DEPRECATE_INDEX环境变量，默认值为true，用于控制是否清理Schema显式标记的废弃索引。V4.15.4不会自动标记并删除任何已有历史索引，后续版本将通过Schema显式废弃标记逐步清理对应索引。若需在升级前完整删除历史过期索引，需先升级并启动一次V4.15.3，设置SYNC_INDEX=true重启服务等待同步完成，确认成功后再升级至V4.15.4，升级前需备份数据库。

## 升级步骤（照做）
1. 配置FE_DOMAIN环境变量，示例格式为FE_DOMAIN=https://fastgpt.example.com。
2. 将fastgpt-app与fastgpt-pro的镜像tag更新为v4.15.4。
3. 按需配置MONGO_DEPRECATE_INDEX环境变量，默认值为true，设置为false时仅跳过废弃索引清理，不影响缺失索引创建。
4. 启动FastGPT服务，服务将自动执行索引同步操作，包括创建当前Schema缺失的索引，仅删除Schema明确标记为废弃且定义精确匹配的系统内置索引，保留客户自建索引与其他未声明索引。该同步不会调用Mongoose的全量syncIndexes()，不会按未在Schema中声明的条件批量删除索引。

## 升级后怎么验证
查看服务启动日志，确认索引同步操作正常完成，无报错信息。访问客户端配置的FE_DOMAIN地址，确认可正常登录与使用系统。测试工作流、聊天功能、向量模型切换、MinIO批量删除、企业认证、Agent V2等功能，确认修复的问题均已解决，部署脚本.yaml可正常运行。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4154)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
