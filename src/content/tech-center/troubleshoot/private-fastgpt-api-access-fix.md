---
title: 解决私有部署FastGPT无法正常调用API接口的问题
slug: /zh/troubleshoot/private-fastgpt-api-access-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1007
source_type: GitHub issue
---

# 解决私有部署FastGPT无法正常调用API接口的问题

## 现象
私有部署的FastGPT服务，通过docker-compose搭建完成后，网页端的数据库添加与AI对话功能可正常使用。但通过API方式访问该服务时，无法获取正常返回结果。同一账号下的在线FastGPT服务API可正常调用。

## 可能原因
目前无法直接确定具体原因，需结合部署环境与配置进行排查。可能的关联方向包括API端口未开放、配置项缺失、网络访问限制等，具体原因需按实际环境确认。

## 排查步骤
1.  确认FastGPT服务的API端口是否已在服务器防火墙或安全组中开放，确保外部网络可正常访问该端口。
2.  核对本地部署的FastGPT配置文件，确认API相关的基础配置与在线版本的配置逻辑一致，具体配置项需按实际环境确认。
3.  在本地服务器内部直接调用API接口，排查是否为外部网络访问限制导致的异常。
4.  对比在线版本与本地部署的API请求格式与参数，确保两者完全一致。

## 解决与验证
若排查后发现是API端口未开放，可开放对应端口后重启FastGPT服务。若为配置项缺失，补充对应配置后重启服务即可。验证方式为使用API测试工具发起请求，确认返回结果与在线版本一致，且网页端原有功能不受影响。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1007)
