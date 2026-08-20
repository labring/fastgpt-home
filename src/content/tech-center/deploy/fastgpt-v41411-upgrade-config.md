---
title: FastGPT V4.14.11版本升级步骤与环境变量配置说明
slug: /zh/deploy/fastgpt-v41411-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411
source_type: 官方文档
---

# FastGPT V4.14.11版本升级步骤与环境变量配置说明

## 版本说明与升级前提
FastGPT V4.14.11调整了版本命名规则，后续将维护两个稳定版本，稳定版本无beta后缀，快速迭代版本带beta后缀。4.14.11及以后的版本可直接升级，不会引入新功能或数据变动。

## 升级操作步骤
1. 更新镜像tag：分别更新fastgpt-app（主服务）、fastpgt-pro（商业版）、code-sandbox的镜像tag为v4.14.11；更新fastgpt-plugin镜像tag为v0.6.0；更新Aiproxy镜像tag为v0.5.3。
2. 更新环境变量：以下环境变量均设置了默认值，可根据需求调整或保持默认：
- `STREAM_RESUME_TTL_SECONDS = 300`：Redis流式镜像续期时长（生成中，秒）
- `STREAM_RESUME_POST_COMPLETE_TTL_SECONDS = 30`：流结束后缩短的TTL时长（便于回收，秒）
- `STREAM_RESUME_REDIS_MAXMEMORY_RATIO = 0.5`：Redis内存水位阈值（已用内存/ maxmemory达到该值时，停止为新请求创建流恢复镜像）
- `STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS = 5000`：Redis内存水位检测缓存时长（毫秒）
- `WORKFLOW_PARALLEL_MAX_CONCURRENCY = 10`：工作流最大并发数上限，取值不能超过`WORKFLOW_MAX_LOOP_TIMES`变量。

## 本次更新内容
🚀 新增内容：对话流响应恢复功能、并行执行节点、调整变量更新节点交互并增加数字操作和数组操作、支持S3文件统一上传与代理访问、支持部分沙盒文件类型直接预览并优化大文件下载。
⚙️ 优化内容：对大量接口增加zod参数校验、优化模型渠道管理代码、知识库创建接口增加默认vlm模型。
🐛 修复内容：修复对话Agent模式模型刷新后被重置、部分接口未正确进行权限校验、API推送知识库数据计费异常、知识库上传Markdown文档时因前部英文多误判ASCII导致中文乱码、Python代码执行时空入参被忽略、工作流全局变量多选框删除enum时未清理默认值、添加子工作流时全局变量默认值未显示、代码运行节点AI生成代码后输出值id替换异常、父级节点对齐导致子节点偏移、评估列表权限过滤未覆盖继承权限、MCP与Http工具raw schema保存失败等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411)
