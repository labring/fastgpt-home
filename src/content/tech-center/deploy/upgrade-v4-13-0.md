---
title: FastGPT V4.13.0版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-13-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4130
source_type: 官方文档
---

# FastGPT V4.13.0版本升级操作与变更说明

## 这个版本改了什么

新增内容包括：应用新增HTTP工具集类型，取代原HTTP插件；支持系统管理员通过文件形式快速安装系统工具；团队管理员支持分配模型权限；代码运行节点支持AI辅助生成；知识库文件解析支持配置最大并发数，开源版通过config.json文件中`systemEnv.datasetParseMaxProcess`属性配置，商业版通过admin后台配置。

优化内容包括：系统工具增加对应author名字显示，使用安全的I18n翻译；计量计费账单推送和合并逻辑优化；对话记录中节点详情单独分表存储；删除chat_items中无效的dataId索引；工作流UI性能优化，减少UI重绘；对话中知识库引用鉴权采用整个对话框鉴权，不使用单条记录鉴权；工作流动态输入输出变量交互优化。

修复内容包括：修复debug模式下全局变量未传递、前方节点参数无法传递至后方节点的问题；修复调试模式下开启"自动执行"会跳过外部变量填写的问题；修复自动语音回复未生效的问题；修复节点复制时报错捕获配置丢失的问题；修复"猜你想问"的自定义提示词保存时上一次的值被置空的问题；修复配置二级路由后知识库检索图片地址拼接异常的问题；修复Prompt编辑器键盘输入时清除Markdown标记的问题；修复知识库集合页面有训练数据时无法自动刷新页面的问题；修复工作流快速添加节点弹窗工具箱页面二次打开为空的问题；修复PPTX文件解析顺序错误的问题。

插件更新新增火山引擎融合信息搜索工具。

## 升级前要确认的事

需要备份当前MongoDB与Redis的数据；确认现有S3存储的连接参数；确认当前部署的FastGPT、商业版、fastgpt-plugin镜像的原有版本tag；确认服务器可正常拉取对应版本的镜像。

## 升级步骤（照做）

1. 更新镜像：将FastGPT镜像tag更新为v4.13.0-fix，商业版镜像tag更新为v4.13.0-fix，fastgpt-plugin镜像tag更新为v0.2.0-fix2；mcp_server、Sandbox、AIProxy无需更新。
2. 更新环境变量：首先更新fastgpt-plugin环境变量名字，新增`S3_PLUGIN_BUCKET`、`MONGODB_URI`、`REDIS_URL`值，参考配置示例：
```
S3_EXTERNAL_BASE_URL=https://xxx.com # S3 外网地址
S3_ENDPOINT=localhost
S3_PORT=9000
S3_USE_SSL=false
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_TOOL_BUCKET=fastgpt-tool # 系统工具，创建的临时文件，存储的桶，要求公开读私有写。
S3_PLUGIN_BUCKET=fastgpt-plugin # 系统插件热安装文件的桶，私有读写。
RETENTION_DAYS=15 # 系统工具临时文件保存天数
MONGODB_URI=mongodb://[REDACTED_CREDENTIAL]@mongo:27017/fastgpt?authSource=admin # MongoDB 链接参数
REDIS_URL=redis://default:mypassword@redis:6379 # Redis 链接参数
```
其次增加fastgpt和fastgpt-pro的S3相关环境变量，参考配置示例：
```
# S3 外网地址
S3_EXTERNAL_BASE_URL=
S3_ENDPOINT=localhost
S3_PORT=9000
S3_USE_SSL=false
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_PLUGIN_BUCKET=fastgpt-plugin # 系统插件热安装文件的桶，私有读写。
```

## 升级后怎么验证

检查FastGPT服务启动日志无异常；进入系统后台确认S3、MongoDB、Redis连接正常；测试创建HTTP工具集节点功能正常；测试团队管理员分配模型权限功能正常；测试知识库文件解析并发配置功能正常；测试代码运行节点的AI辅助生成功能正常；检查系统工具的author名字显示正常；发起对话确认知识库引用鉴权、对话记录节点详情存储正常；测试上传系统工具安装文件功能正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4130)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
