---
title: FastGPT V4.8.18版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4818-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# FastGPT V4.8.18版本升级步骤与更新内容说明

## 版本升级操作步骤
1. 更新镜像：将fastgpt镜像的tag更新为`v4.8.18-fix`，商业版fastgpt-pro镜像tag更新为`v4.8.18-fix`，Sandbox镜像无需执行更新操作。
2. 运行升级脚本：在任意终端中发起以下HTTP POST请求：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4818 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
其中`{{rootkey}}`需替换为环境变量中配置的rootkey，`{{host}}`需替换为FastGPT的访问域名。本次升级会迁移全文检索表，迁移过程耗时较长，期间全文检索功能暂时失效，日志中会实时打印已迁移的数据长度。

## 本次版本更新内容
### 新增功能
- 支持通过JSON配置直接创建应用
- 支持通过CURL脚本快速创建HTTP插件
- 商业版支持部门架构权限模式
- 支持配置自定跨域安全策略，默认全开
- 补充私有部署场景下的模型问题排查文档

### 优化项
- 对HTTP Body增加特殊处理，解决字符串变量携带换行时无法解析的问题
- 为分享链接随机生成用户头像
- 优化图片上传安全校验逻辑，新增头像图片唯一存储规则，避免存储资源累计
- 分离Mongo全文索引表
- 合并知识库检索查询语句，减少数据库查询次数
- 优化文件编码检测逻辑，降低CSV文件出现乱码的概率
- 采用异步方式读取文件内容，减少进程阻塞
- 调整HTML文件处理逻辑，改为直接下载而非在线阅读

### 修复问题
- 修复HTML文件上传时，base64格式图片无法自动转换为图片链接的问题
- 修复插件计费错误的问题

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818)
