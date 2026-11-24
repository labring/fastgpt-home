---
title: 配置FastGPT分享链接身份验证及实践案例
slug: /zh/integration/fastgpt-share-auth-practice
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/guide/build/publish/link
source_type: 官方文档小节
---

# 配置FastGPT分享链接身份验证及实践案例

## 身份验证接口实现
我们实现三个核心接口：`/shareAuth/init`、`/shareAuth/start`、`/shareAuth/finish`。第一个接口仅校验请求携带的token，当token等于`fastgpt`时，返回`{ "success": true, "data": { "uid": "user1" } }`，否则返回`{ "success": false, "message": "身份错误" }`。第二个接口增加敏感内容校验，若请求参数中的question包含“你”字，会返回`{ "success": false, "message": "内容不合规" }`。第三个为结果上报接口，可基于请求中的responseData处理业务逻辑，例如计算总金额后执行数据库操作。实际生产环境中，不宜将token固定写死为`fastgpt`，建议使用动态校验逻辑。

## 配置与测试步骤
1. 复制任意一个接口地址，去除末尾的`/shareAuth/finish`，将剩余部分填入FastGPT的身份校验配置项。例如复制`https://d8dns0.laf.dev/shareAuth/finish`，填入的校验地址为`https://d8dns0.laf.dev`。
2. 修改源分享链接，添加`authToken=fastgpt`参数。例如源链接`https://share.fastgpt.io/chat/share?shareId=64be36376a438af0311e599c`，修改后为`https://share.fastgpt.io/chat/share?shareId=64be36376a438af0311e599c&authToken=fastgpt`。
3. 测试验证效果：打开未携带authToken或authToken不等于`fastgpt`的链接，会提示“身份错误”；发送内容包含“你”字的提问，会提示“内容不合规”。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/publish/link)
