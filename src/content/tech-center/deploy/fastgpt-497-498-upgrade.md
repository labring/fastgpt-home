---
title: FastGPT V4.9.7和V4.9.8版本升级操作说明
slug: /zh/deploy/fastgpt-497-498-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/497
source_type: 官方文档
---

# FastGPT V4.9.7和V4.9.8版本升级操作说明

## 版本更新概述
本页针对FastGPT V4.9.7和V4.9.8版本提供升级相关说明。V4.9.7版本新增多项实用功能：知识库回答段落末尾自动添加引用、MCP工具支持HTTP Streamable协议、支持编辑MCP工具名适配客户端需求、工作流节点右键自动对齐、支持自定义config.json路径、API调用传递`NO_RECORD_HISTORIES` chatId以禁用历史记录存储、Rerank模型按量计费、套餐兑换码与支付宝支付功能、短链数据埋点，以及新增Jina AI模型系统配置。同时该版本包含多项优化与bug修复。

## 标准化升级步骤
1.  提前完成全量数据备份
2.  更新对应组件的镜像Tag：
    - 官方FastGPT镜像使用`v4.9.7-fix2`
    - 商业版FastGPT镜像使用`v4.9.7`
    - mcp_server与Sandbox无需更新
    - AIProxy镜像更新至`v0.1.8`

## 优化与修复详情
V4.9.7版本的优化内容包括：优化Doc2x文档解析能力，新增报错信息捕获与超时时长调整；强制PG vector查询语句使用向量索引；优化对话时间统计与对话日志列表接口，适配大量对话场景；从ai_proxy获取音频解析时长；AI模型Token值优先采用API usage确保准确性，为空时再采用GPT3.5估算方式。
修复的问题包括：文件上传分块大小超出MongoDB限制、使用记录仪表盘无法获取指定成员统计数据、仪表盘接口因未考虑时区导致统计异常、LLM模型测试接口无法测试未启用模型且会移除自定义请求地址、Copy app权限异常、导出对话记录消息上限限制、工作流变量渲染逻辑错误、知识库检索调试权限不足、文本内容提取节点默认值赋值逻辑问题、分享链接强制返回嵌套应用引用内容、知识库集合元数据过滤时同名标签筛选异常、应用列表权限配置索引刷新异常等。V4.9.8版本升级流程与上述步骤一致，详细更新说明可参考对应版本条目。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/497)
