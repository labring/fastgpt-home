---
title: FastGPT V4.16.0-beta2版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-16-0-beta2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41602
source_type: 官方文档
---

# FastGPT V4.16.0-beta2版本升级操作与变更说明

## 这个版本改了什么
本版本包含多项功能新增、体验优化与问题修复。新增功能包括工作流应用的系统配置移至画布左侧工具栏的独立配置面板，新建工作流应用时会自动打开；开场白支持配置多个预设问题，并可拖拽排序。优化内容包括重构发布渠道页面，按原生渠道和第三方渠道分组展示并显示各渠道已配置数量；工具市场批量更新支持展示部分失败项、单独重试或卸载，完善已安装版本和更新状态的展示；门户页快捷应用数量上限调整为3个，兼容已超出上限的历史配置；PDF解析器采用动态边缘裁剪，避免裁剪真实内容。修复内容包括旧版工作流HTTP工具的动态参数未正确恢复默认输入方式的问题，新建工作流应用时国际化资源未预加载导致初始配置文案异常的问题，工作流工具参数可能被重复渲染的问题，应用发布后文件变量无法上传文件的问题，共享工作流工具的文件参数无法上传文件的问题，S3对象键和文件名包含特殊字符时的上传、解析、预览或下载异常问题，系统默认模型未进行敏感信息过滤导致API Key等信息泄露的问题，修复前端number输入组件在Agent生成与手动输入切换、版本切换场景下的类型异常问题。代码优化包括审计日志转存至S3冷归档不再删除，增加对admin配置的数据校验和清洗，取消account/*页面SSR，新增CICD镜像打包。

## 升级前要确认的事
本版本开始在系统模型初始化及保存时使用严格Schema。此前版本保存的数字字符串、字符串形式的价格梯度或缺失字段可能导致初始化校验失败。升级前需准备好ROOT_KEY与部署的域名，用于执行数据清洗命令。

## 升级步骤（照做）
1. 镜像更新：更新fastgpt-app(fastgpt 主服务) 镜像 tag: v4.16.0-beta2；更新fastgpt-pro(fastgpt 商业版) 镜像 tag: v4.16.0-beta2。
2. 历史系统模型配置清洗：
   首先执行dry-run命令，该操作不会修改数据或刷新缓存：
   ```bash
   curl -X POST 'https://你的域名/api/admin/dataClean/cleanSystemModelConfigs' \
     -H 'Content-Type: application/json' \
     -H 'rootkey: 你的ROOT_KEY' \
     -d '{"dryRun":true}'
   ```
   确认返回结果中`invalidSamples`没有需要人工处理的数据后，执行正式清洗命令：
   ```bash
   curl -X POST 'https://你的域名/api/admin/dataClean/cleanSystemModelConfigs' \
     -H 'Content-Type: application/json' \
     -H 'rootkey: 你的ROOT_KEY' \
     -d '{"dryRun":false}'
   ```
   正式清洗会将合法数字字符串转换为number、将字符串形式的`priceTiers`转换为数组，并删除非法的可选数字。非法或缺失的必填数字使用系统默认值：LLM的`maxContext/maxResponse/quoteMaxToken`分别为`16000/16000/13000`，Embedding的`defaultToken/maxToken`分别为`500/3000`，价格为`0`。`functionCall`保持可选，Embedding缺失的`weight`补为`0`。正式清洗会统一写入数据并立即刷新系统模型缓存；即使没有记录需要更新，也会重新构建运行时缓存。接口可安全重复执行。无法通过当前完整模型Schema的记录不会被写入，详情会返回在`invalidSamples`中；未执行dry-run直接执行正式清洗，无法提前发现`invalidSamples`中的异常数据。

## 升级后怎么验证
再次执行dry-run命令，此时返回结果中`wouldUpdate`应为0。检查系统模型配置是否正常加载，验证工作流配置、开场白预设、发布渠道页面、工具市场、门户快捷应用、PDF解析、文件上传等功能是否正常运行，确认审计日志已转存至S3冷归档，验证前端number输入组件在Agent生成与手动输入切换、版本切换场景下可正常使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41602)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
