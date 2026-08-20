---
title: FastGPT V4.14.8版本升级的配置与操作说明
slug: /zh/deploy/fastgpt-v4148-upgrade-configuration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4148
source_type: 官方文档
---

# FastGPT V4.14.8版本升级的配置与操作说明

## 版本更新内容
本次FastGPT V4.14.8版本包含多项新增、优化与修复内容。新增功能包括：将Next.js版本升级至16，本地开发使用rspack工具，本地开发性能提高3~5倍；重构代码沙盒，统一隔离方案，支持网络请求以及内置依赖包。优化项包括：兼容MCP中JSON Schema type类型不在枚举类型里的场景，修改知识库搜索的变量引用文案为更直观的描述。修复问题包括：解决新SDK连续调用同一个MCP服务时多次连接导致的报错，修复文本与工具同时输出时保存后顺序异常的问题，调整变量更新逻辑使输入中的$1会被替换为捕获组，修复API知识库返回值返回传入的文件title（未传入title则不返回内容）的问题。

## 环境变量配置变更
本次版本存在环境变量配置变更：fastgpt-sandbox支持配置可选的安全凭证参数SANDBOX_TOKEN，用于强化代码沙盒的访问安全；同时对应的fastgpt和fastgpt-pro服务也需要添加同名的SANDBOX_TOKEN环境变量，以完成安全校验的联动配置。

## 镜像更新与部署步骤
1.  将FastGPT官方镜像的tag更新为v4.14.8；
2.  将FastGPT商业版镜像的tag更新为v4.14.8；
3.  fastgpt-plugin、mcp_server、AIProxy无需更新镜像；
4.  将sandbox镜像的tag更新为v4.14.8；
5.  完成所有镜像更新后，重启相关服务以加载新的配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4148)
