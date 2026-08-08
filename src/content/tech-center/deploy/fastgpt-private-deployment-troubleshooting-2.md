---
title: FastGPT私有部署通用问题排查与解决方法
slug: /zh/deploy/fastgpt-private-deployment-troubleshooting-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/faq
source_type: 官方文档
---

# FastGPT私有部署通用问题排查与解决方法

## 通用排查思路与边界说明
若需纯本地运行FastGPT，需提前准备好向量模型和LLM模型。FastGPT私有部署的前端页面崩溃，90%源于模型配置不正确：应确保每类模型至少有一个启用，检查模型的对象参数（数组和对象），空参数可设置为空数组或空对象。少部分情况为浏览器兼容问题，因项目包含高阶语法，低版本浏览器可能无法兼容，需提供具体操作步骤和控制台错误信息反馈。同时需关闭浏览器翻译功能，否则可能引发页面崩溃。页面崩溃的另一常见情况是配置文件未正常加载，95%会提示`xxx undefined`；若出现`URI malformed`报错，需反馈具体操作和页面。此外存在少量API不兼容问题。

## 可执行的配置修复步骤
以下为可直接执行的问题修复操作：
1.  修改root密码：修改环境变量`DEFAULT_ROOT_PSW`，随后重启FastGPT服务。
2.  挂载小程序配置文件：将验证文件挂载至`/app/projects/app/public/xxxx.txt`，重启服务即可生效。
3.  解决数据库端口占用：若3306端口被占用，将数据库端口映射修改为`3307:3306`等其他可用端口。
4.  修复vectorModels配置不生效：重启容器确保配置加载，刷新浏览器；若为已创建的知识库，需删除后重建，因向量模型在创建时绑定，不会动态更新。
5.  处理页面正常但API报错：页面采用`stream=true`模式，测试API时需同步设置`stream=true`，部分国产模型接口非Stream兼容较差，可通过curl命令测试验证。

## 模型与索引问题专项排查
通过任何方式部署FastGPT，均存在索引模型的长度限制，不同索引模型的配置需在后台修改参数。针对非内置模型的工具调用与知识库索引问题，可按以下思路排查：若日志提示`JSON invalid`、`not support tool`等，说明该模型不支持工具/函数调用，需设置`toolChoice=false`和`functionCall=false`，默认走提示词模式；若配置正常且无错误日志，可修改`customCQPrompt`自定义提示词。知识库索引无进度或缓慢的排查方向：可正常对话但无索引进度，说明未配置向量模型`vectorModels`；无法对话且无索引，代表API调用失败，需检查模型连接；索引缓慢可能源于API key调用次数限制、网络异常，或FastGPT与OneAPI不在同一网络。开启内容补全后响应变慢，因需进行3~5轮AI查询，数据库性能不足会产生明显影响。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/faq
