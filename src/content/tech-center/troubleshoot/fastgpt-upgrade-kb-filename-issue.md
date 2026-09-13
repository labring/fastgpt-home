---
title: 解决FastGPT 4.4升级至4.41后部分知识库文件名不显示的问题
slug: /zh/troubleshoot/fastgpt-upgrade-kb-filename-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/306
source_type: GitHub issue
---

# 解决FastGPT 4.4升级至4.41后部分知识库文件名不显示的问题

## 现象
本地通过docker-compose部署FastGPT，将版本从4.4升级至4.4.1。先执行docker-compose pull命令拉取最新镜像，未运行升级脚本时，进入知识库页面无法查看已有的文件名。随后执行指定的升级脚本，执行成功后第一个知识库的文件名可以正常显示，但第二个知识库的文件名仍然未显示。已确认脚本中的变量替换正确，且接口返回状态码为200。

## 可能原因
需按实际环境确认，暂未明确统一触发原因。

## 排查步骤
1. 确认已执行docker-compose pull命令拉取升级所需的镜像。
2. 检查升级脚本中的{{host}}和{{rootkey}}变量是否已正确替换为实际部署的对应参数。
3. 执行升级脚本后，确认接口返回的状态码为200。
4. 分别查看各知识库的文件名显示状态，对比异常与正常知识库的相关配置（需按实际环境确认）。

## 解决与验证
执行指定的POST请求脚本完成升级初始化：
1. 替换脚本中的`{{host}}`为实际FastGPT部署的主机地址，`{{rootkey}}`为管理员rootkey。
2. 执行以下命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv441' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
3. 等待接口执行完成后，进入知识库查看所有文件名是否正常显示。
4. 若仍存在部分知识库文件名未显示的情况，需按实际环境进一步确认配置。

> 来源: [FastGPT GitHub issue #306](https://github.com/labring/FastGPT/issues/306)
