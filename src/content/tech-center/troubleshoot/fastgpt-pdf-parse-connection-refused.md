---
title: 解决FastGPT自定义PDF解析服务连接被拒绝的问题
slug: /zh/troubleshoot/fastgpt-pdf-parse-connection-refused
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4917
source_type: GitHub issue
---

# 解决FastGPT自定义PDF解析服务连接被拒绝的问题

## 现象
私有部署版本v4.9.9的FastGPT通过Docker与marker服务一同部署后，修改FastGPT配置文件，将`customPdfParse.url`配置为`http://127.0.0.1:7231/v2/parse/file`。使用PDF增强解析功能时，出现报错`connect ECONNREFUSED 127.0.0.1:7231`。通过curl命令直接调用该服务地址，可以正常使用marker解析服务。

## 可能原因
FastGPT运行在Docker容器中，容器内部的`127.0.0.1`指向容器自身的回环网络，无法直接访问宿主机上运行的marker服务，因此触发连接被拒绝的报错。

## 排查步骤
1. 验证marker服务本身正常可用，使用issue提供的curl命令调用服务地址：`curl --location --request POST "http://127.0.0.1:7231/v2/parse/file" --header "Authorization: Bearer your_access_token" --form "file=@./my_pdf.pdf"`，确认可以正常完成解析请求。
2. 确认FastGPT的部署环境，检查FastGPT是否运行在Docker容器中，容器的网络模式是否为默认桥接模式。
3. 核对FastGPT配置文件中的`customPdfParse.url`参数，确保配置的地址无拼写错误。

## 解决与验证
解决方法：将配置文件中的`127.0.0.1`替换为宿主机在Docker桥接网络中的实际IP地址，或使用Docker host网络模式运行FastGPT容器。若marker也运行在Docker容器中，可将FastGPT和marker加入同一Docker网络，并使用容器名称作为服务地址。
验证步骤：修改FastGPT配置文件后重启FastGPT服务，再次尝试使用PDF增强解析功能，确认不再出现`connect ECONNREFUSED`报错。可进入FastGPT容器内部，使用curl命令调用配置的服务地址，验证网络连通性。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4917)
