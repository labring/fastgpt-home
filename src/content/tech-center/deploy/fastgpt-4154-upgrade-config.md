---
title: FastGPT V4.15.4版本升级配置与环境变量变更说明
slug: /zh/deploy/fastgpt-4154-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4154
source_type: 官方文档
---

# FastGPT V4.15.4版本升级配置与环境变量变更说明

## 核心配置与索引规则调整
FastGPT V4.15.4版本新增必填环境变量`FE_DOMAIN`，服务启动时会校验该配置，需将其设置为客户端访问FastGPT的地址，格式包含协议、主机和可选端口。公网部署应填写客户端实际使用的公网访问地址，本地开发可使用`http://localhost:3000`，示例值为`https://fastgpt.example.com`。

同时MongoDB索引同步规则调整：原`SYNC_INDEX`环境变量已弃用，新增`MONGO_DEPRECATE_INDEX`用于控制是否清理Schema显式标记的废弃索引，默认值为`true`。设置为`false`时仅跳过废弃索引清理，不影响当前Schema缺失索引的创建。服务启动时会自动执行安全同步：创建当前Schema中缺失的索引，仅删除对应Schema明确标记为废弃且名称、键和关键选项完全匹配的系统内置历史索引，保留客户自建索引及其他未声明的索引，不会调用Mongoose全量`syncIndexes()`，不会按“未在Schema中声明”批量删除索引。

V4.15.4不会标记任何已有历史索引为废弃，升级时不会自动删除旧索引，后续版本将通过Schema显式废弃标记逐步清理。如需提前清理历史过期索引，需先升级至V4.15.3，设置`SYNC_INDEX=true`并重启服务等待同步完成，确认成功后再升级至V4.15.4，操作前务必备份数据库并记录自建索引定义。

## 升级操作步骤
1. 配置必填的`FE_DOMAIN`环境变量，值为客户端实际访问地址。
2. 更新`fastgpt-app`（主服务）和`fastgpt-pro`（商业版）的镜像tag为`v4.15.4`。
3. 如需提前清理历史索引，需按上述前置步骤操作，避免误删自建索引。

## 优化与修复内容
本次更新包含多项优化和修复：优化工作流文件上下文管理，减少重复签发并避免潜在安全问题；优化思考Icon动画；修复chatbox流输出时展示系统工具的错误；修复纯文本工具响应UI被Markdown错误解析导致格式错乱的问题；修复切换向量模型后训练任务触发但已有数据向量未重建的问题；修复MinIO按前缀批量删除大量对象时因XML实体展开限制失败的问题，并增加请求超时保护；修复企业认证银行账号校验问题；修复Agent V2中工具列表和提示词矛盾的问题；修复部署脚本.yaml中的语法问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4154)
