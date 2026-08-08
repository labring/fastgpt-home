---
title: FastGPT V4.8.4版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v484-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/484
source_type: 官方文档
---

# FastGPT V4.8.4版本升级步骤与更新内容说明

## 版本更新内容
本次V4.8.4版本包含多项新增功能、优化项与修复内容。新增功能包括应用使用新权限系统，以及应用支持文件夹分类管理。优化方面，文本分割模块新增连续换行与制表符清除逻辑，可避免大文本处理时的性能问题。修复内容涵盖多个关键问题：修复了系统插件运行池因内存读取导致的全局数据污染问题；修复了Debug模式下相同source和target内容引发的连线显示异常；修复了定时执行初始化的错误；修复了应用调用传参异常；修复了使用ctrl+cv复制复杂节点时出现的nodeId错误。此外，本次版本还调整了组件库的全局theme样式。

## 升级操作步骤
请按照以下步骤完成V4.8.4版本的升级：
1.  修改镜像标签：将`fastgpt`镜像的tag修改为`v4.8.4`；若使用sandbox组件，可将`fastgpt-sandbox`镜像tag修改为`v4.8.4`（本次无功能变更，可选执行）；商业版镜像的tag同样修改为`v4.8.4`。
2.  商业版用户执行初始化操作：从任意终端发起HTTP请求，需替换请求中的占位参数：将`{{rootkey}}`替换为环境变量中配置的rootkey，将`{{host}}`替换为FastGPT商业版的域名。执行的命令为：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/init/484 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
非商业版用户无需执行初始化步骤。

## 升级注意事项
本次升级为带初始化脚本的版本更新，需确保所有镜像的tag统一修改为`v4.8.4`，避免出现版本不一致导致的功能异常。商业版用户务必完成初始化请求，否则部分商业专属功能可能无法正常启用。若升级过程中出现报错，可参考官方文档的排查指南进行问题定位。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/484
