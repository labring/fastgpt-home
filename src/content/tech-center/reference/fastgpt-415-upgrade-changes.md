---
title: FastGPT 4.15版本升级相关API与LLM追踪变更速查
slug: /zh/reference/fastgpt-415-upgrade-changes
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT 4.15版本升级相关API与LLM追踪变更速查

## 结论
FastGPT 4.15版本存在三项核心系统变更，包括ApiKey功能调整、API格式校验升级及LLM请求追踪的团队隔离优化。升级前需提前导出旧追踪日志，自托管环境需执行对应索引同步操作以兼容变更。
## 具体怎么做
1. ApiKey适配：仅保留系统key，兼容OpenAI SDK时需使用`apikey-appId`格式传递Token，现有ApiKey保持兼容。
2. 追踪记录查询：需按`{ requestId, teamId }`参数调用`GET /api/core/ai/record/getRecord`接口。
3. 自托管环境操作：若关闭了`SYNC_INDEX`，升级后需执行一次索引同步，移除旧的`requestId_1`唯一索引。
4. 遇到`zod parse error`报错时，提交issue反馈。
## 注意事项
1. 升级前无teamId的旧LLM追踪记录无法通过新接口查询，页面会提示记录已过期，需在升级前导出相关日志或保留原始请求信息。
2. 部分API新增严格数据格式校验，旧数据或自定义数据结构可能触发`zod parse error`报错。
3. 仅关闭过`SYNC_INDEX`的自托管环境需要执行索引同步，其他环境无需额外操作。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
