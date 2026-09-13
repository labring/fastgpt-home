---
title: FastGPT图片上传与应用头像无法正常显示的排错指南
slug: /zh/troubleshoot/fastgpt-image-display-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3542
source_type: GitHub issue
---

# FastGPT图片上传与应用头像无法正常显示的排错指南

## 现象
当前使用FastGPT v4.8.17-fix-title私有部署版本（docker部署搭配pgvector）时，所有涉及图片上传的功能均无法正常解析图片。具体表现为：在应用设置中替换应用头像后无生效效果；在支持图片的模型对话场景中，上传图片后无法正常显示。系统日志中可看到如`Upload file success 微信截图_20250106165604.jpg, cost 7ms`的上传成功提示，但图片仍无法加载。

## 可能原因
该问题未在当前issue中明确给出已知原因，具体原因需结合部署环境的配置进行排查，需按实际环境确认。

## 排查步骤
1.  确认当前FastGPT版本为v4.8.17-fix-title，部署方式为docker且搭配pgvector。
2.  查看系统运行日志，确认是否存在`Upload file success`的上传成功提示，核对上传文件名与日志记录是否一致。
3.  进入应用设置页面，尝试替换应用头像，保存后刷新页面，观察头像是否加载正常。
4.  在支持图片的模型对话场景中，上传图片后，检查前端网络请求中图片资源的访问路径是否正确。
5.  核对静态资源的存储与访问相关配置，需按实际环境确认参数是否正确。

## 解决与验证
若排查发现上传的图片资源无法正常访问，需确认存储路径的配置是否正确，确保前端可以正确获取上传后的文件资源。替换应用头像后，需确认保存操作已生效并刷新页面，验证头像是否正常显示。在对话场景中上传图片后，可直接访问图片的访问链接，确认链接是否可正常打开。完成上述操作后，图片和应用头像即可正常显示。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3542)
