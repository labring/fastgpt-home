---
title: FastGPT V4.13.0版本升级步骤与环境变量配置说明
slug: /zh/deploy/fastgpt-4130-upgrade-env-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4130
source_type: 官方文档
---

# FastGPT V4.13.0版本升级步骤与环境变量配置说明

## 版本升级核心说明
FastGPT V4.13.0版本核心变更为环境变量调整，同时包含多项功能新增、优化与修复，部署该版本需同步更新镜像与环境变量配置。

## 升级操作步骤
1. 更新镜像：
FastGPT 官方镜像 tag 为 `v4.13.0-fix`，商业版镜像使用相同 tag；`fastgpt-plugin` 镜像 tag 为 `v0.2.0-fix2`；`mcp_server`、`Sandbox`、`AIProxy` 无需更新。
2. 更新环境变量：
需更新 `fastgpt-plugin` 环境变量名称，并新增 `S3_PLUGIN_BUCKET`、`MONGODB_URI`、`REDIS_URL` 配置项。最小配置示例如下：
```
# S3 基础配置
S3_EXTERNAL_BASE_URL=https://xxx.com
S3_ENDPOINT=localhost
S3_PORT=9000
S3_USE_SSL=false
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_TOOL_BUCKET=fastgpt-tool
S3_PLUGIN_BUCKET=fastgpt-plugin
# 系统配置
RETENTION_DAYS=15
MONGODB_URI=mongodb://myusername:mypassword@mongo:27017/fastgpt?authSource=admin
REDIS_URL=redis://default:mypassword@redis:6379
```

## 版本变更详情
### 新增内容
应用新增 HTTP 工具集类型以取代原 HTTP 插件；支持系统管理员通过文件形式快速安装系统工具；团队管理员可分配模型权限；代码运行节点支持 AI 辅助生成；知识库文件解析可配置最大并发数。
### 优化内容
系统工具新增 author 名称显示并使用安全的 I18n 翻译；优化计量计费账单推送与合并逻辑；对话记录节点详情单独分表存储，删除 `chat_items` 中无效的 dataId 索引；优化工作流 UI 性能以减少重绘；知识库引用鉴权改为整个对话框鉴权；优化工作流动态输入输出变量交互。
### 修复内容
修复 debug 模式下全局变量未传递、前方节点参数无法传递至后方节点的问题；修复调试模式开启自动执行时跳过外部变量填写的问题；修复自动语音回复未生效的问题；修复节点复制时报错捕获配置丢失的问题；修复「猜你想问」自定义提示词保存时上一次值被置空的问题；修复二级路由下知识库检索图片地址拼接异常的问题；修复 Prompt 编辑器键盘输入时清除 Markdown 标记的问题；修复知识库集合页面有训练数据时无法自动刷新的问题；修复工作流快速添加节点弹窗二次打开为空的问题；修复 PPTX 文件解析顺序错误的问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4130
