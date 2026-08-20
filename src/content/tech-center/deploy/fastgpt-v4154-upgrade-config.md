---
title: FastGPT V4.15.4版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-v4154-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4154
source_type: 官方文档
---

# FastGPT V4.15.4版本升级与环境变量配置说明

# 核心变更说明
V4.15.4版本存在两处关键环境变量变更：一是新增必填环境变量`FE_DOMAIN`，需配置为客户端访问FastGPT的完整地址，格式包含协议、主机与可选端口，公网部署需填写实际公网访问地址，本地开发可使用`http://localhost:3000`。二是MongoDB索引同步逻辑调整：原`SYNC_INDEX`环境变量已弃用，新增`MONGO_DEPRECATE_INDEX`用于控制是否清理Schema显式标记的废弃索引，默认值为`true`。该同步仅会创建当前Schema缺失的索引，删除FastGPT系统内置且匹配的废弃索引，保留客户自建索引，不会调用Mongoose全量`syncIndexes()`批量删除未声明索引。若需跳过废弃索引清理，可设置`MONGO_DEPRECATE_INDEX=false`，但仍会执行缺失索引创建。如需在升级前清理历史过期索引，需先升级至V4.15.3，设置`SYNC_INDEX=true`并重启等待同步完成，确认成功后再升级至V4.15.4，此操作会删除未在当时Schema声明的索引，需提前备份数据库。

# 可执行升级配置步骤
1. 配置必填的`FE_DOMAIN`环境变量，示例：`FE_DOMAIN=https://fastgpt.example.com`；
2. 更新服务镜像：将`fastgpt-app`（主服务）与`fastgpt-pro`（商业版）的镜像tag修改为`v4.15.4`；
3. 按需配置`MONGO_DEPRECATE_INDEX`，默认启用废弃索引清理，如需跳过可设为`false`；
4. 若需提前清理历史过期索引，按顺序执行：升级至V4.15.3 → 设置`SYNC_INDEX=true`并重启服务 → 确认索引同步成功后，再升级至V4.15.4，执行前需备份数据库并保留自建索引的定义。

# 优化与修复内容
本次更新优化了工作流文件上下文管理，减少重复签发操作并避免潜在安全问题，同时优化了思考Icon动画效果。修复了多项问题：包括chatbox流输出时错误展示系统工具的问题、纯文本工具响应UI的Markdown格式错乱问题、切换向量模型后已有数据向量未重建的问题；修复了MinIO按前缀批量删除大量对象时因XML实体展开限制失败的问题，并增加了请求超时保护；修复了企业认证银行账号校验错误、Agent V2工具列表与提示词矛盾的问题，以及部署脚本.yaml的语法问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4154)
