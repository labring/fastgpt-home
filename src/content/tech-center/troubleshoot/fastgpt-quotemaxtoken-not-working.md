---
title: 解决FastGPT私有部署版中quoteMaxToken配置不生效的问题
slug: /zh/troubleshoot/fastgpt-quotemaxtoken-not-working
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/833
source_type: GitHub issue
---

# 解决FastGPT私有部署版中quoteMaxToken配置不生效的问题

## 现象
在FastGPT V4.6.8-alpha私有部署版本中，用户配置gpt-4-turbo模型的quoteMaxToken参数为100000，但前端界面内该模型可选择的最大引用token数仍为3000，配置未在界面生效。两张配套截图分别展示了配置文件中的参数设置与前端界面的可选值差异，该问题在该版本中必现。

## 可能原因
该问题暂未明确统一触发逻辑，目前已知该问题仅出现在V4.6.8-alpha私有部署版本中，需结合实际部署的配置文件加载流程、前端构建环节进行排查确认，暂无通用的固定触发原因。

## 排查步骤
1. 确认当前部署的FastGPT版本为V4.6.8-alpha私有部署版本。
2. 打开FastGPT的配置文件，查找对应模型（如gpt-4-turbo）的quoteMaxToken参数，确认其配置数值。
3. 登录FastGPT前端界面，进入模型配置页面，找到对应模型的最大引用token选择项，查看当前显示的可选最大值。
4. 对比配置文件中的quoteMaxToken参数值与界面显示的可选最大值是否一致，记录两者的差异。

## 解决与验证
将配置文件中对应模型的quoteMaxToken参数设置为期望的数值（如100000），重新构建并部署前端与后端服务。验证时，登录前端界面，进入模型配置页面，查看对应模型的最大引用token数是否与配置文件中的参数值一致。若两者数值匹配，则问题得到解决；若仍存在差异，需进一步检查配置文件是否正确加载至运行环境中。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/833)
