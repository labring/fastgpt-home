---
title: FastGPT V4.8.17版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4817-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4817
source_type: 官方文档
---

# FastGPT V4.8.17版本升级操作与更新内容说明

### 升级注意事项与接口变更
该版本需运行专属升级脚本完成数据库与配置调整，升级前需完成镜像更新操作。本次升级会将用户绑定的OpenAI账号统一移动到团队中，同时调整`/api/v1/chat/completions`接口的返回值：原`tokens`字段将被替换为`inputTokens`和`outputTokens`，分别表示输入和输出的Token数量。旧代码中依赖`tokens`字段的逻辑需同步调整，避免出现字段缺失导致的报错。

### 升级操作步骤
1.  更新镜像：将FastGPT官方镜像tag更新为`v4.8.17-fix-title`，商业版`fastgpt-pro`镜像tag更新为`v4.8.17`，Sandbox镜像无需更新。
2.  运行升级脚本：通过任意终端发起HTTP POST请求，替换命令中的`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4817 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本执行后会完成用户账号迁移与数据库结构的适配调整。

### 本次更新核心内容
本次更新包含新增功能、体验优化与问题修复三类内容：
- **新增功能**：简易模式工具调用支持数组类型插件；工作流增加异常离开自动保存功能，避免工作流配置丢失；LLM模型参数支持关闭`max_tokens`和`temperature`；商业版支持后台配置模板市场与自定义工作流变量，可与业务系统鉴权打通；搜索测试接口支持问题优化；工作流拆分记录Input Token和Output Token，并修复部分请求未记录输出Token的计费问题。
- **体验优化**：Markdown内容超出20万字符时不再使用Markdown组件，避免页面崩溃；知识库搜索滑动条支持输入模式，可更精准控制搜索参数；优化可用模型展示UI；Mongo查询语句新增`virtual`字段支持。
- **问题修复**：修复文件返回接口缺少`Content-Length`头导致非同源文件上传时阿里vision模型无法识别图片的问题；去除判断器两端字符串的隐藏换行符，修复判断器失效问题；修复变量更新节点手动输入非字符串类型数据无法自动转换的问题；修复豆包模型无法工具调用的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4817)
