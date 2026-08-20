---
title: 解决FastGPT工具Skills导入方式不足的问题
slug: /zh/troubleshoot/fastgpt-skill-import-additional-mode
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6320
source_type: GitHub issue
---

# 解决FastGPT工具Skills导入方式不足的问题

## 现象
当前FastGPT工具的Skills导入功能仅提供简易模式、workflow两种实现路径，无法覆盖部分用户的Skills导入需求，用户无法通过现有两种方式完成符合自身场景的Skills导入操作。

## 可能原因
FastGPT工具内置的Skills导入功能预设了简易模式、workflow两种实现路径，未额外提供其他类型的Skills导入配置方式，具体的功能覆盖范围需按实际环境确认，当前官方未公开更多关于Skills导入的额外配置说明。

## 排查步骤
1. 登录FastGPT工具的后台或前端界面，找到并进入Skills导入相关的操作页面；
2. 仔细查看页面中展示的所有可用导入方式选项，确认仅存在简易模式、workflow两种导入路径；
3. 核对自身的业务需求与技能导入场景，判断是否需要新增的Skills导入方式来完成操作；
4. 若现有两种方式无法满足需求，可记录当前的使用场景与遇到的问题，用于后续的功能反馈或自行适配。

## 解决与验证
解决方式主要分为两种方向：一是等待FastGPT官方进行功能更新，新增除简易模式、workflow之外的Skills导入方式；二是按实际环境自行适配相关的Skills导入逻辑，以满足自身的业务需求。验证方式为：若官方完成功能更新，重新进入Skills导入页面，查看是否新增了预设的导入方式选项，确认新的导入方式可正常使用并满足自身的技能导入需求；若自行适配，则需根据实际的开发文档与环境配置完成调试，验证导入功能是否正常运行。

> 来源：[FastGPT GitHub Issue #6320](https://github.com/labring/FastGPT/issues/6320)
