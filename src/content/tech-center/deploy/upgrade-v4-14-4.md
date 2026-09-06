---
title: FastGPT V4.14.4版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-14-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144
source_type: 官方文档
---

# FastGPT V4.14.4版本升级操作与变更说明

## 这个版本改了什么
新增功能包括工具调用支持流输出、AI积分告警通知、对话日志展示IP归属地与应用版本名、对话日志按点赞点踩过滤、API上传本地文件至S3并移除旧版Gridfs代码、新版订阅套餐逻辑、对话文件白名单配置、S3的pathStyle与region配置、Sealos多租户自定义域名配置、工作流工具文件输入支持手动填写、网络代理支持。
优化内容包括S3上传文件超时时长调整为5分钟、采用JinaAI边际收益公式优化问题检索、用户通知支持中英文与模板优化、知识库删除采用异步队列、LLM请求图片无效报错提示、completions接口detail=false时返回reason_content、无效S3 key检测、删除应用与知识库需输入名称校验、Mongo慢操作日志打印集合名与操作内容、分享链接uid长度限制小于200。
修复问题涵盖循环节点数组空内容过滤取消、工作流工具DataId传递异常、对话Agent工具非必填布尔与数字类型配置问题、工作台卡片名称过长错位、分享链接全局变量加载异常、Windows下CSV文件判断异常、模型未启动时测试失败、MCP header特殊内容抛错、工作流引用Agent版本切换UI未更新、HTTP节点空字符串变量替换为null、判断器节点折叠连线断开、节点调试单选多选变量选项展示异常、发布渠道文档链接定位错误、Checkbox禁用hover样式错误、模型头像缺失时默认图标显示错误、日志导出结束时间多一天、表单输入默认值未传递、工具调用未传递max_tokens、工作流判断器value数据类型处理异常、非直接分块知识库阅读器导航顺序异常。
插件更新包括新增GLM4.6与DS3.2系列模型预设、修复MinerU SaaS插件模型版本选择vlm问题、修复微信公众号插件批量上传Markdown参数传递问题、新增获取微信公众号草稿箱列表工具、优化Markdown转文件自定义文件名、修复import cache导致插件无法更新问题。

## 升级前要确认的事
需确认当前运行的FastGPT版本为4.14.3。需提前获取环境变量中的rootkey，以及FastGPT的访问域名。需更新的镜像包括FastGPT、FastGPT商业版、fastgpt-plugin，对应tag分别为v4.14.4、v4.14.4、v0.3.4，mcp_server、Sandbox、AIProxy无需更新。

## 升级步骤（照做）
1. 更新对应镜像至指定tag。
2. 在任意终端执行以下HTTP请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4144' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3. 升级脚本执行后，将自动完成两项迁移任务：将4.14.3版本遗留的Dataset/local接口上传的文件迁移至S3，全量计算旧版chat中的反馈并增加flags值用于筛选，该计算过程为异步执行，接口不会返回结果。

## 升级后怎么验证
检查各镜像版本是否正确为v4.14.4（FastGPT与商业版）、v0.3.4（fastgpt-plugin）。查看系统日志，确认打印出"Migration feedback completed!"。测试新增功能与优化项，包括工具调用流输出、对话日志展示IP归属地与应用版本名、工作流工具文件输入手动填写等功能正常。确认知识库与应用删除时需输入名称校验、分享链接uid长度符合限制等优化项生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4144)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
