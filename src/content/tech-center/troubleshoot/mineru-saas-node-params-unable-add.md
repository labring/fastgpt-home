---
title: 解决FastGPT工作流MinerU Saas解析节点输入参数无法添加问题
slug: /zh/troubleshoot/mineru-saas-node-params-unable-add
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7271
source_type: GitHub issue
---

# 解决FastGPT工作流MinerU Saas解析节点输入参数无法添加问题

## 现象
在FastGPT公有云V4.15.1版本的工作流中，完成以下操作后出现异常：新建工作流并开启文件上传后，在"流程开始"节点后添加内置系统工具"MinerU Saas 解析"节点，激活并配置API token确认后，该节点的输入参数区域无法添加参数，也无法输入任何参数内容。

## 可能原因
该问题暂未明确官方根因，推测可能与节点参数配置表单的前端渲染逻辑异常、页面加载冲突有关，具体根因需按实际环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为V4.15.1公有云版本，检查已完成MinerU Saas解析节点的API token配置并成功激活。
2. 刷新当前工作流页面，重新进入MinerU Saas解析节点的配置界面，查看参数输入区域是否正常加载显示。
3. 尝试使用浏览器无痕/隐私模式访问FastGPT平台，重新配置该节点，排除浏览器缓存或第三方插件的干扰。
4. 若以上步骤均无效，需按实际环境确认是否存在平台临时服务异常或其他配置冲突。

## 解决与验证
目前暂未在该issue中提供明确的官方修复方案。若通过排查步骤解决了参数无法添加的问题，验证方式为：重新进入MinerU Saas解析节点的配置界面，确认可正常添加、编辑输入参数并保存工作流即可。若仍未解决，可参考官方issue反馈渠道提交详细的环境信息与日志内容。

> 来源：https://github.com/labring/FastGPT/issues/7271
