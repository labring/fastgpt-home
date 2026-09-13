---
title: 解决FastGPT创建应用后对话提示无可用模型渠道的问题
slug: /zh/troubleshoot/fastgpt-no-model-channel-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1873
source_type: GitHub issue
---

# 解决FastGPT创建应用后对话提示无可用模型渠道的问题

## 现象
创建应用后无法进行对话，系统提示报错文本：`undefined 当前分组 default 下对于模型 通义千问 无可用渠道`，配套截图展示了该报错弹窗及相关配置页面。

## 可能原因
结合报错信息，可能的触发因素包括：通义千问模型的可用渠道未绑定到default分组；未创建通义千问对应的可用渠道；分组与模型渠道的关联配置存在错误。

## 排查步骤
1. 确认当前应用绑定的分组为报错提示的default分组，核对分组名称是否匹配。
2. 进入模型渠道管理页面，检查是否存在通义千问对应的可用渠道条目。
3. 查看通义千问渠道的绑定分组设置，确认该渠道已关联到default分组。
4. 核对渠道中配置的密钥是否正常可用，确认密钥未过期或受限。

## 解决与验证
将通义千问的可用渠道绑定到default分组并保存配置，重新进入应用发起对话。若报错消失且对话可正常进行，则问题解决。若仍存在报错，需重新创建通义千问的可用渠道，完成分组绑定后再次验证。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1873)
