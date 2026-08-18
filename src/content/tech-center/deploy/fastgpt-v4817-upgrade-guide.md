---
title: FastGPT V4.8.17版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4817-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4817
source_type: 官方文档
---

# FastGPT V4.8.17版本升级操作与更新内容说明

## 版本升级核心调整
本次V4.8.17版本升级需执行专用初始化脚本，同时存在接口返回格式变更。`/api/v1/chat/completions`接口将不再返回`tokens`字段，改为返回`inputTokens`和`outputTokens`，分别统计输入、输出的Token数量。执行升级脚本后，系统会自动将用户绑定的OpenAI账号移动到团队中。仅需更新业务镜像，Sandbox镜像无需升级。

## 升级操作步骤
1. 更新镜像：将`fastgpt`镜像的Tag更新为`v4.8.17-fix-title`，商业版`fastgpt-pro`镜像Tag更新为`v4.8.17`。
2. 运行升级脚本：在任意终端发起以下HTTP请求，需替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4817 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

## 本次更新详情
### 新增功能
简易模式工具调用支持数组类型插件；工作流新增异常离开自动保存，避免流程丢失；LLM模型参数支持关闭`max_tokens`和`temperature`；商业版支持后台配置模板市场与自定义工作流变量，可与业务系统鉴权打通；搜索测试接口支持问题优化；工作流中Input Token和Output Token分开记录展示，并修复部分请求未记录输出Token的计费问题。
### 优化内容
对Markdown大小进行限制，超出20万字符时不使用Markdown组件，避免页面崩溃；知识库搜索参数的滑动条新增输入模式，可更精准控制参数；优化可用模型展示UI；Mongo查询语句新增`virtual`字段。
### 修复问题
文件返回接口缺少`Content-Length`头，导致非同源文件上传时阿里vision模型无法识别图片；去除判断器两端字符串的隐藏换行符，避免判断器失效；修复变量更新节点手动输入非字符串类型数据时无法自动转换的问题；修复豆包模型无法进行工具调用的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4817)
