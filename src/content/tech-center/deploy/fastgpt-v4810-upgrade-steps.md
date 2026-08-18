---
title: FastGPT V4.8.10版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-v4810-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4810
source_type: 官方文档
---

# FastGPT V4.8.10版本升级步骤与配置变更说明

## 版本核心更新内容
V4.8.10版本包含环境变量变更与升级脚本相关更新，新增多项功能与体验优化。功能新增方面，包含模板市场、工作流节点拖动自动对齐吸附、用户选择节点（Debug模式暂未支持）、工作流uid全局变量、撤销重做功能、本次编辑记录取代自动保存、工作流版本重命名；工作流“应用调用”节点已弃用，迁移为独立节点，支持传递全局变量与用户上传文件；插件新增使用说明配置与单选框自定义输入；HTTP节点支持text/plain模式、超时配置与更多Body类型，params和headers支持新变量选择模式；同时新增工作流导出导入JSON功能与发送验证码安全校验。商业版同步新增飞书机器人接入、公众号接入、自助开票申请与SSO定制功能。
优化内容覆盖工作流循环校验避免空转并支持分支完全并发执行，修复工作流嵌套执行时的参数污染问题，为部分全局变量增加数据类型约束，优化节点选择、对话框性能、知识库列表与详情页UI等多项体验，调整.env.template中MongoDB相关说明以提升可读性，优化无SSL证书场景下的复制功能与无网络运行支持，更新支付模式与用户默认头像。
修复内容涵盖Prompt模式工具调用stream=false时的标记问题、对话日志鉴权权限问题、Milvus部署下知识库导出失败、应用副本无法复制系统配置、图片识别链接正则不严谨、内容提取数据类型不一致、工作流运行时间统计错误、stream模式下工具调用返回undefined等多项bug。

## 升级操作步骤
请按以下流程完成升级：
1. 提前做好数据备份；
2. 修改环境变量：为fastgpt-pro镜像添加`SANDBOX_URL=http://xxxxx:3000`；同时为fastgpt-pro与fastgpt镜像添加`LOG_LEVEL=debug`和`STORE_LOG_LEVEL=warn`两个环境变量；
3. 更新FastGPT与商业版镜像的tag为`v4.8.10`，Sandbox镜像可无需更新；
4. 执行初始化操作：通过任意终端发起POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，执行以下命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4810 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4810)
