---
title: 解决FastGPT语音输入提示whisper-1无可用渠道的问题
slug: /zh/troubleshoot/fastgpt-whisper-no-channel-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2022
source_type: GitHub issue
---

# 解决FastGPT语音输入提示whisper-1无可用渠道的问题

## 现象
用户在FastGPT v4.8.5私有部署版本中使用语音输入功能时，未转换出任何文本。OneApi返回报错信息：`当前分组 default 下对于模型 whisper-1 无可用渠道`。用户已确认语音输入接口正常，在其他工具中可正常将语音转换为文本，且已重启FastGPT容器，确认配置文件中已修改语音模型为whisper-large-v3。

## 可能原因
结合报错信息与排查情况，可能的原因有两个：一是OneApi的default分组未配置对应语音模型的可用渠道；二是FastGPT配置的语音模型名称与OneApi中注册的模型名称不一致，例如FastGPT配置为whisper-large-v3，但OneApi中注册的模型名称为whisper-1。

## 排查步骤
1. 查看FastGPT的配置文件，提取语音模型的配置参数值，记录该模型名称。
2. 登录OneApi管理后台，进入default分组页面，检查是否存在与FastGPT配置中一致的语音模型的可用渠道。
3. 验证OneApi中该模型渠道的连通性，确认渠道本身可正常使用。
4. 重启FastGPT容器，使配置更新生效。

## 解决与验证
若为OneApi渠道缺失问题：在OneApi的default分组中添加对应语音模型的可用渠道，确保模型名称与FastGPT配置的名称完全一致。若为模型名称不匹配问题：修改FastGPT配置文件中的语音模型名称，使其与OneApi中注册的模型名称一致。完成配置后，重新发起语音输入请求，确认可正常转换为文本，且OneApi不再返回`当前分组 default 下对于模型 whisper-1 无可用渠道`的报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2022)
