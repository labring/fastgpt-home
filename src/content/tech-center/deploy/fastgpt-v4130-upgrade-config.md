---
title: FastGPT V4.13.0版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-v4130-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4130
source_type: 官方文档
---

# FastGPT V4.13.0版本升级与环境变量配置说明

## 升级操作步骤
首先更新镜像：将FastGPT主镜像tag更新为`v4.13.0-fix`，商业版镜像tag更新为`v4.13.0-fix`，fastgpt-plugin镜像tag更新为`v0.2.0-fix2`；mcp_server、Sandbox、AIProxy无需更新。
其次更新环境变量：需调整fastgpt-plugin的环境变量名称，并新增以下必填参数：
- S3_EXTERNAL_BASE_URL=https://xxx.com # S3外网地址
- S3_ENDPOINT=localhost
- S3_PORT=9000
- S3_USE_SSL=false
- S3_ACCESS_KEY=minioadmin
- S3_SECRET_KEY=minioadmin
- S3_TOOL_BUCKET=fastgpt-tool # 临时文件存储桶，需公开读私有写
- S3_PLUGIN_BUCKET=fastgpt-plugin # 系统插件热安装桶，私有读写
- RETENTION_DAYS=15 # 系统工具临时文件保存天数
- MONGODB_URI=mongodb://myusername:mypassword@mongo:27017/fastgpt?authSource=admin
- REDIS_URL=redis://default:mypassword@redis:6379
同时需为fastgpt和商业版新增S3相关环境变量，包含与上述一致的S3_EXTERNAL_BASE_URL、S3_ENDPOINT等配置项。

## 功能说明与易错点
该版本新增多项实用功能：应用新增HTTP工具集类型以取代原HTTP插件；支持系统管理员通过文件形式快速安装系统工具；团队管理员可分配模型权限；代码运行节点支持AI辅助生成；知识库文件解析支持配置最大并发数，其中开源版需通过config.json的systemEnv.datasetParseMaxProcess属性调整，商业版可通过admin后台配置。
优化内容包括系统工具增加author名字显示与安全的I18n翻译、计量计费账单推送与合并逻辑优化、对话记录节点详情分表存储、工作流UI性能优化、对话知识库引用鉴权调整为整个对话框鉴权等。修复的问题包括debug模式下全局变量与节点参数传递异常、自动语音回复失效、节点复制报错配置丢失、“猜你想问”自定义提示词保存时上一次值被清空、二级路由下知识库图片地址拼接异常等。
需注意的易错点：S3_TOOL_BUCKET与S3_PLUGIN_BUCKET的权限要求不同，需严格按说明配置；配置二级路由时需检查环境变量，避免出现知识库图片地址异常；升级后需确认所有镜像版本正确，避免出现功能异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-13/4130
