---
title: FastGPT V4.9.1版本升级操作步骤与更新内容说明
slug: /zh/deploy/fastgpt-v491-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491
source_type: 官方文档
---

# FastGPT V4.9.1版本升级操作步骤与更新内容说明

### 升级前置准备
升级前需完成数据库备份。本次升级需更新FastGPT官方镜像与商业版镜像，镜像tag均设置为v4.9.1-fix2。Sandbox镜像无需更新，AIProxy镜像需修改为registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.1.3。

### 升级执行步骤
从任意终端发起一条HTTP POST请求完成升级。将请求中的{{rootkey}}替换为环境变量内的rootkey，{{host}}替换为FastGPT的域名。完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv491 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该升级脚本会重新使用最新的jieba分词库处理数据，执行过程耗时较长，可通过系统日志查看执行进度。

### 更新内容详情
#### 新增功能
商业版支持单团队模式，可更高效管理内部成员。新增知识库分块阅读器功能，API知识库支持PDF增强解析。邀请团队成员的方式调整为邀请链接模式。支持混合检索权重设置，新增重排模型选择和权重设置功能，调整知识库搜索权重计算方式为搜索权重加重排权重。

#### 优化项
优化知识库数据输入框交互逻辑，将应用拉取绑定知识库数据的操作交由后端处理。增加依赖包安全版本检测，并升级部分依赖包。优化模型测试代码与思考过程解析逻辑，只要配置模型支持思考，均会解析think标签。载入最新jieba分词库，增强全文检索的分词效果。

#### 修复问题
修复最大响应tokens提示显示错误的问题，修复HTTP Node中字符串包含换行符时解析失败的问题。修复知识库问题优化中未传递历史记录的问题，修复错误提示翻译缺失的问题。修复内容提取节点array类型schema错误的问题，修复模型渠道测试时未指定测试渠道的问题。修复新增自定义模型时保存默认模型字段导致误判的问题，修复promp模式工具调用未判空思考链导致UI错误展示的问题。修复编辑应用信息导致头像丢失、分享链接标题被刷新的问题，修复计算parentPath时鉴权失败导致内容清空的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/491)
