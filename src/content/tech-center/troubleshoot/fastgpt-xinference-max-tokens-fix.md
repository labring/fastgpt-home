---
title: 解决FastGPT调用xinference模型最大响应tokens不生效的问题
slug: /zh/troubleshoot/fastgpt-xinference-max-tokens-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4807
source_type: GitHub issue
---

# 解决FastGPT调用xinference模型最大响应tokens不生效的问题

## 现象
在FastGPT v4.9.7私有部署版本中，调用xinference部署的语言模型时，即使在模型配置中设置了最大响应tokens数值，实际调用的输出上限仍为1024tokens。当要求生成5000字文章时，内容会在达到1024tokens时停止输出，无法达到配置的预期长度。

## 可能原因
FastGPT未正确将模型配置中的最大响应tokens参数传递至xinference的调用接口，导致xinference使用自身默认的1024tokens输出上限。

## 排查步骤
1. 确认当前FastGPT版本为v4.9.7私有部署版本，确认xinference已正常启动并部署目标语言模型。
2. 登录FastGPT后台，查看对应模型的配置页面，确认已手动设置所需的最大响应tokens数值，未使用默认的1024。
3. 检查模型渠道的配置参数，确认未遗漏与响应长度相关的传递项。
4. 尝试在调用接口的body中手动添加额外参数，验证是否能突破1024tokens的输出上限。

## 解决与验证
1. 登录FastGPT后台，进入对应模型的配置或调用参数设置页面。
2. 在自定义参数或body补充项中，添加xinference所需的额外参数（具体参数需参考xinference官方文档或按实际测试补充）。
3. 重新发起模型调用，生成5000字文章，验证输出长度是否超过1024tokens。
4. 确认模型配置中的最大响应tokens参数可正常生效，无需额外重复配置body参数。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4807)
