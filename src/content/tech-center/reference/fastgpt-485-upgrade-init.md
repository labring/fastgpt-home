---
title: FastGPT 4.8.5版本升级后的系统初始化操作步骤
slug: /zh/reference/fastgpt-485-upgrade-init
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/485
source_type: 官方文档小节
---

# FastGPT 4.8.5版本升级后的系统初始化操作步骤

## 结论
FastGPT 4.8.5版本升级后，需通过终端发起指定HTTP请求完成系统初始化。普通用户与商业版用户需分别调用对应接口，完成插件数据合并或知识库权限重置。

## 具体怎么做
1.  替换参数：将请求中的`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名。
2.  普通用户初始化：
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/initv485' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
    执行后将合并插件数据表到应用，且不会删除插件表。
3.  商业版用户初始化：
    ```bash
    curl --location --request POST 'https://{{host}}/api/admin/init/485' \
    --header 'rootkey: {{rootkey}}' \
    --header 'Content-Type: application/json'
    ```
    执行后将重置知识库权限系统。

## 注意事项
1.  请勿混淆普通版与商业版的初始化接口，两者请求路径不同。
2.  需在终端环境执行该HTTP请求，确保网络可访问FastGPT域名。
3.  普通版操作不会删除插件表，商业版操作仅重置知识库权限系统。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/485)
