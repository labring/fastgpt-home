---
title: 解决FastGPT调用chat/completions接口异常的问题
slug: /zh/troubleshoot/fastgpt-chat-completions-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/396
source_type: GitHub issue
---

# 解决FastGPT调用chat/completions接口异常的问题

## 现象
用户通过curl命令发起POST请求调用FastGPT的/api/chat/completions接口，请求地址为http://192.168.56.107:6019/api/chat/completions，携带Authorization头为Bearer YOUR_API_KEY，Content-Type为application/json。请求参数包含chatId为111，stream为false，detail为false，variables对象包含cTime字段值为2022/2/2 22:22，messages数组包含一条角色为user、内容为"导演是谁"的消息。调用后接口返回异常，相关异常信息可参考附带的两张截图。

## 可能原因
因未获取到完整的报错文本，需结合实际返回的错误信息排查，可能的方向包括：请求参数不符合FastGPT接口的校验规则；FastGPT接口服务运行异常；网络连接或地址配置有误。

## 排查步骤
1.  核对当前curl命令中的所有请求参数，与FastGPT官方接口文档的参数要求逐一比对，确认参数名、参数类型、必填项是否匹配。
2.  登录部署FastGPT的服务器，检查6019端口的监听状态，确认接口服务进程正常运行。
3.  重新执行curl调用命令，完整记录接口返回的报错信息，结合截图中的报错内容定位具体问题。
4.  确认请求的IP地址、端口是否与FastGPT实际部署的环境一致，避免地址错误导致的连接失败。

## 解决与验证
若排查发现是请求参数格式错误，调整参数至符合接口规范后重新发起调用；若为服务运行异常，重启FastGPT接口服务并确认端口正常监听；若为地址配置错误，修正请求地址后再次测试。验证方式为重新执行调整后的curl命令，确认接口返回正常的聊天响应结果，无异常报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/396)
