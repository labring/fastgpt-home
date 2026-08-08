---
title: FastGPT私有部署常见问题排查与解决方法
slug: /zh/deploy/fastgpt-private-deployment-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/faq
source_type: 官方文档
---

# FastGPT私有部署常见问题排查与解决方法

## 通用排查思路与前端问题
FastGPT私有部署的常见问题可通过日志、报错信息定位。前端页面崩溃的90%场景为模型配置错误：需确保每类模型至少启用一个，检查模型的对象/数组参数，若为空可设置为空数组或空对象。其余场景包括浏览器兼容问题（项目含高阶语法，低版本浏览器可能不兼容）、浏览器翻译功能干扰，需关闭翻译功能。若页面提示`xxx undefined`，多为配置文件未正常加载导致系统信息缺失；若出现`URI malformed`报错，需反馈具体操作和页面信息。任何部署方式均存在索引模型长度限制，需在后台修改对应参数。

## 可执行修复与配置步骤
针对具体问题可按以下步骤处理：
1.  修改root密码：修改环境变量`DEFAULT_ROOT_PSW`，随后重启FastGPT服务。
2.  挂载小程序配置文件：将验证文件挂载至`/app/projects/app/public/xxxx.txt`路径，重启服务生效。
3.  解决数据库端口占用：将docker-compose的端口映射从`3306:3306`改为`3307:3306`（或其他未占用端口）。
4.  修复模型配置不生效：修改`vectorModels`后需重启容器确保配置加载，刷新浏览器；已创建的知识库需删除重建，因向量模型在创建时绑定，不会动态更新。
5.  适配不支持工具调用的模型：若日志提示`JSON invalid`、`not support tool`，需设置`toolChoice=false`和`functionCall=false`，或通过`customCQPrompt`自定义提示词适配模型。

## 其他典型问题处理
知识库索引无进度或速度缓慢的问题可通过日志判断：可对话但无索引进度，代表未配置`vectorModels`；不能对话且无索引进度，代表API调用失败（如未连接OneAPI）；索引缓慢可能因API key限制（如OpenAI免费号单日上限200次）、网络异常（`Connection error`）。开启内容补全后响应变慢，因需经过3~5轮AI查询，数据库性能不足会加剧该问题。页面可正常回复但API报错时，需使用`stream=true`模式测试，部分国产模型的非Stream兼容表现不佳。此外，可纯本地运行FastGPT，但需提前准备向量模型和LLM模型。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/faq
