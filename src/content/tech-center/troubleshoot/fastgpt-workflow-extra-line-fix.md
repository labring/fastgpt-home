---
title: 解决FastGPT工作流节点关闭返回AI内容后出现多余换行的问题
slug: /zh/troubleshoot/fastgpt-workflow-extra-line-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2466
source_type: GitHub issue
---

# 解决FastGPT工作流节点关闭返回AI内容后出现多余换行的问题

## 现象
用户在私有部署的FastGPT工作流中，关闭某节点的【返回AI内容】选项后，流程结束返回回答时会多出一个换行，该情况在接入微信或企业微信时可见；开启该选项时则无此问题。用户尝试修改`packages/service/core/workflow/dispatchV1/tools/answer.ts`文件中的换行符并重新构建Docker镜像，未解决该问题。

## 可能原因
已知用户修改了指定的TypeScript文件未生效，说明多余换行可能来自其他未被修改的代码逻辑，或该文件并非处理该节点输出换行的核心位置。需按实际环境确认是否存在其他中间环节添加了换行符。

## 排查步骤
1.  确认当前FastGPT的私有部署具体版本号，需按实际环境记录。
2.  定位工作流中关闭【返回AI内容】的节点类型，记录该节点的配置与执行逻辑。
3.  检查用户已修改的`packages/service/core/workflow/dispatchV1/tools/answer.ts`文件，确认修改是否覆盖了所有相关输出场景的换行处理。
4.  搜索工作流相关代码中处理返回内容的文件，定位所有可能添加换行符的代码位置。
5.  复现问题，对比开启和关闭【返回AI内容】时的原始输出内容，确认换行符出现的具体环节。

## 解决与验证
1.  基于排查结果，找到所有处理工作流节点输出的代码文件，逐一排查并移除额外添加的换行符或`\n`字符。
2.  重新构建Docker镜像并重启FastGPT服务。
3.  重新配置目标工作流，关闭对应节点的【返回AI内容】选项，触发流程并查看微信或企业微信渠道的返回内容，确认多余换行是否消失。
4.  再次开启该节点的【返回AI内容】选项，验证流程返回内容是否正常无异常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2466)
