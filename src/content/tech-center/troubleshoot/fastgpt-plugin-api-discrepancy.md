---
title: 解决FastGPT插件版本不一致与API变更适配问题
slug: /zh/troubleshoot/fastgpt-plugin-api-discrepancy
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6437
source_type: GitHub issue
---

# 解决FastGPT插件版本不一致与API变更适配问题

## 现象
出现两类核心问题：一是GitHub中更新的fastgpt-plugin镜像tag为v0.5.3，但官方文档标注的版本为v0.5.4；二是调用API时，对话记录返回的value字段不再包含type属性，且调用工作流传入文件链接时，无法按原逻辑自动推测文件类型。此外部分开发者在测试API时使用了自定义的type值（如以下示例中的image_url11、file_url11）：
```
curl --location --request POST 'https://ai.xx.com/api/v1/chat/completions' \
--header 'Authorization: Bearer xxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "chatId": "abcd12",
    "stream": false,
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "每个附件分别是关于什么的"
                },
                {
                    "type": "image_url11",
                    "image_url": {
                        "url": "https://xx.com/2.png"
                    }
                },
                {
                    "type": "file_url11",
                    "name": "文件名11",
                    "url": "https://xx.com/he2.docx"
                }
            ]
        }
    ]
}'
```

## 可能原因
1.  镜像更新与官方文档的版本同步不及时，导致版本号标注不一致；
2.  FastGPT进行了API迭代：对话记录接口/api/core/chat/getPaginationRecords移除了value字段的type属性，官方要求调整解析逻辑，直接判断text、tools等字段是否存在；工作流文件上传相关API不再通过链接推测文件类型，改为直接保存传入的type值；
3.  开发者使用了不符合新版本规范的自定义type值，导致接口处理异常。

## 排查步骤
1.  核对fastgpt-plugin镜像的实际tag与官方文档标注的版本号，确认当前使用的版本是否与文档匹配；
2.  调用/api/core/chat/getPaginationRecords接口，查看返回结果中value字段是否不再包含type属性；
3.  检查调用工作流文件上传相关API时传入的type字段值，确认是否符合新版本的使用要求；
4.  对比官方变更说明，梳理代码中原有API的解析逻辑与参数传递方式。

## 解决与验证
1.  版本不一致问题：需按实际环境确认镜像与文档的版本匹配方案，优先使用官方文档标注的v0.5.4版本镜像；
2.  对话记录接口适配：修改value字段的解析逻辑，不再判断type属性，直接检查text、tools等字段是否存在；
3.  工作流文件上传适配：调用工作流API时，直接传入正确的type值（如官方规范的text、image_url、file_url等），不再依赖接口自动推测；
4.  验证：重新调用相关API，确认对话记录能正确解析内容，工作流文件上传的类型判断准确无误。

> 来源：https://github.com/labring/FastGPT/issues/6437
