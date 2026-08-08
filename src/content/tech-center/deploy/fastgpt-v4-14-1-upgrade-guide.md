---
title: FastGPT V4.14.1版本升级操作与更新详情说明
slug: /zh/deploy/fastgpt-v4-14-1-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4141
source_type: 官方文档
---

# FastGPT V4.14.1版本升级操作与更新详情说明

## 版本升级步骤
本次升级需完成镜像更新与专用脚本执行两个核心步骤：
1.  更新镜像：将FastGPT官方镜像tag设置为`v4.14.1`，商业版镜像tag同样设置为`v4.14.1`，`fastgpt-plugin`镜像tag设置为`v0.3.1`；`mcp_server`、`Sandbox`、`AIProxy`无需更新。
2.  执行升级脚本：从任意终端发起HTTP POST请求，需提前复制一份原应用目录供工具使用，替换命令中的`{{rootkey}}`为环境变量内的rootkey，`{{host}}`为FastGPT域名，完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4141 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

## 版本新增功能
本次更新包含两项核心新增功能：一是全新的工作台交互界面，原插件模块改名为**工作流工具**并移动至「我的工具」分类下；二是工作流运行欠费后，将显示继续运行按键，无需从头启动流程，减少重复操作成本。

## 优化与修复说明
### 优化内容
1.  同一轮对话中，MCP Client会持久化实例，不会自动销毁，提升对话连贯性；
2.  模型重载时不会清空全局模型配置再添加，避免重载阶段出现模型调用错误；
3.  自动保存功能新增一条团队云端保存记录，完善团队协作中的版本追溯能力。
### 修复问题
本次版本修复了多个已知问题，包括：Debug模式下交互节点无法正常使用、富文本编辑器Tab空格未对齐、嵌套运行Agent时跳过节点队列未初始化导致运行失败、判断器右侧为number引用时触发报错、工作流工具入参为文件选择时未弹出选择框、HTTP插件无法处理http协议接口请求、文本类型全局变量默认值编辑框UI异常、代码节点行数超100行时显示重叠、删除应用未同步删除目录内内容、浏览器未传递实时日期至服务器。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4141
