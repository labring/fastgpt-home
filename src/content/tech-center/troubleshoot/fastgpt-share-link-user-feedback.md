---
title: 解决FastGPT免登录链接用户反馈上传缺失问题
slug: /zh/troubleshoot/fastgpt-share-link-user-feedback
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1736
source_type: GitHub issue
---

# 解决FastGPT免登录链接用户反馈上传缺失问题

## 现象
使用FastGPT生成的分享免登录链接后，访问该链接的用户若得到的回答不符合需求、不正确，或引用的文件在知识库中不存在，无法提交反馈并上传相关文档。

## 可能原因
当前FastGPT版本未内置免登录链接场景下的用户反馈上传功能，且该功能需求因长时间无活动（超过6个月加7天宽限期）被自动归档。

## 排查步骤
1. 确认当前使用的FastGPT版本为最新正式版本，具体版本信息需按实际环境确认。
2. 检查免登录链接的相关配置是否完整，配置项需按实际环境确认。
3. 访问分享的免登录链接，验证交互界面是否存在预设的反馈入口。

## 解决与验证
若需实现该功能，可重新打开对应GitHub issue并补充相关业务需求信息，或基于现有FastGPT代码框架开发对应的用户反馈上传模块，完成后可通过访问免登录链接测试反馈功能是否正常生效。

> 来源: [FastGPT GitHub issue #1736](https://github.com/labring/FastGPT/issues/1736)
