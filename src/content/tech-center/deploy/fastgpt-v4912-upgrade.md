---
title: FastGPT V4.9.12版本升级与环境变量变更说明
slug: /zh/deploy/fastgpt-v4912-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4912
source_type: 官方文档
---

# FastGPT V4.9.12版本升级与环境变量变更说明

FastGPT V4.9.12版本包含环境变量变更与功能优化，适用于自部署用户的版本升级操作。该版本需针对密钥加密相关配置，同时更新了核心镜像与AIProxy镜像版本，无需更新MCP与Sandbox组件。

### 升级操作步骤
1.  **更新环境变量**：在`fastgpt`和`fastgpt-pro`镜像的环境变量中添加`AES256_SECRET_KEY=`变量，用于密钥加密。
2.  **更新镜像标签**：将FastGPT官方镜像及商业版镜像的tag更新为`v4.9.12`；将AIProxy镜像tag更新为`v0.2.2`，MCP与Sandbox组件无需执行更新操作。

该版本新增多项功能：完善AI proxy监控，支持以图表/表格形式查看模型调用和性能情况；HTTP节点和MCP支持单独"鉴权配置"，且鉴权配置明文不会二次返回客户端；判断器支持变量引用；商业版支持知识库分块时LLM自动分段识别；新增管理员数据看板；更新豆包1.6系列模型与qwen模型配置。优化内容包括：密码校验新增更多特殊字符，后端全量计算知识库chunk参数避免自动模式下参数未正确使用默认值，将文本分块移至worker线程避免阻塞，展示更多套餐用量信息，优化输入框样式（包括桌面和移动端的语音输入样式，MCP工具调用使用Raw schema保障完整性，删除不存在的知识库文件不会阻断删除流程，升级MCP SDK兼容最新HTTPStreamable，语雀文档库递归获取目录数据。修复的问题包括：自定义问答提取提示词被覆盖，模板导入时空indexes导致数据插入失败，登录页可能存在的XSS攻击，输入框语音输入时丢失文件列表，知识库文档中图片TTL字段未清除导致图片过期，MCP工具存储时未转义int类型数据。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4912
