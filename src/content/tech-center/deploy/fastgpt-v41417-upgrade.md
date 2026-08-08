---
title: FastGPT V4.14.17版本升级操作与修复说明
slug: /zh/deploy/fastgpt-v41417-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41417
source_type: 官方文档
---

# FastGPT V4.14.17版本升级操作与修复说明

## 版本更新修复内容
本次发布的FastGPT V4.14.17版本，针对此前版本的三类问题进行了针对性修复：
1.  修复了API知识库中parentId字段的类型校验错误，避免因传入非预期类型的parentId参数导致的接口调用异常；
2.  修复了门户页对话场景下无法上传文件的问题，优化了文件上传的交互流程，确保用户可正常在门户页提交文件作为对话上下文；
3.  修复了商业版场景下的文件解析异常问题：当未配置S3 External Endpoint时，商业版内置的内部文件解析接口会调用失败，本次版本修正了该场景下的逻辑判断，优化了前置校验逻辑。

## 升级操作步骤
该版本的升级操作仅需更新对应服务的镜像标签即可完成，具体步骤如下：
1.  若使用Docker Compose部署，打开项目的docker-compose.yml配置文件，找到fastgpt-app（FastGPT主服务）的镜像配置项，将其tag更新为`v4.14.17`；
2.  若你使用商业版服务，同步找到fastgpt-pro的镜像配置项，将其tag更新为`v4.14.17`；
3.  保存配置文件后，执行容器重启命令，完成版本升级。

## 升级后注意事项
升级完成后，若遇到文件上传或解析相关的异常，需优先检查是否正确配置了S3 External Endpoint参数，该参数是商业版文件解析功能正常运行的必要配置项。若遇到API知识库相关的接口报错，可检查传入的parentId参数类型是否符合接口要求，该类问题已在本次版本中完成修复。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41417
