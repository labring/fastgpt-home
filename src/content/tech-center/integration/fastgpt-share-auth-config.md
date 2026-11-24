---
title: 配置FastGPT分享链接的身份验证与上报接口
slug: /zh/integration/fastgpt-share-auth-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/guide/build/publish/link
source_type: 官方文档小节
---

# 配置FastGPT分享链接的身份验证与上报接口

FastGPT的分享链接支持身份验证配置，可在每次分享链接使用时发起校验和上报请求。配置时仅需填写校验根地址，无需指定完整请求路径。使用分享链接时，需额外添加`authToken`参数，该参数通常为业务系统生成的用户唯一凭证，FastGPT会在鉴权接口的请求体中携带`token=[authToken]`参数。

## 身份验证接口配置步骤
1.  **配置校验根地址**：在FastGPT系统的对应设置项中填入校验接口的根地址。
2.  **添加分享链接参数**：在原有分享链接后拼接`&authToken=用户唯一凭证`，例如将`https://share.fastgpt.io/chat/share?shareId=648aaf5ae121349a16d62192`修改为`https://share.fastgpt.io/chat/share?shareId=648aaf5ae121349a16d62192&authToken=userid12345`。
3.  **编写初始化校验接口**：该接口接收POST请求到`{{host}}/shareAuth/init`，请求体格式为`{"token": "[authToken]"}`。鉴权成功时返回`{"success": true, "data": {"uid": "用户唯一凭证"}}`，系统会拉取该`uid`对应用户的对话记录；鉴权失败时返回`{"success": false, "message": "身份错误"}`。
    示例请求：
    ```bash
    curl --location --request POST '{{host}}/shareAuth/init' \
--header 'Content-Type: application/json' \
--data-raw '{"token": "[authToken]"}'
    ```
4.  **编写对话前校验接口**：该接口接收POST请求到`{{host}}/shareAuth/start`，请求体需包含`token`和`question`字段，格式为`{"token": "[authToken]", "question": "用户问题"}`。鉴权成功时返回格式与初始化接口一致；鉴权失败可返回`{"success": false, "message": "身份验证失败"}`或`{"success": false, "message": "存在违规词"}`。
    示例请求：
    ```bash
    curl --location --request POST '{{host}}/shareAuth/start' \
--header 'Content-Type: application/json' \
--data-raw '{"token": "[authToken]", "question": "用户问题"}'
    ```
5.  **编写可选的对话结果上报接口**：该接口接收POST请求到`{{host}}/shareAuth/finish`，请求体需包含`token`和`responseData`字段，无强制返回格式。需重点关注`responseData`中的`totalPoints`（总消耗AI积分）和`tokens`（Token消耗总数）两个字段，用于业务侧的成本统计。

对话结果上报接口的`responseData`字段覆盖了对话流程中所有模块的执行数据，包括检索模块、AI对话模块等，可帮助业务方完整追踪对话的资源消耗与执行细节。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/publish/link)
