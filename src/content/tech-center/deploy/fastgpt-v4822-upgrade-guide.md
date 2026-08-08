---
title: FastGPT V4.8.22版本升级流程与更新内容说明
slug: /zh/deploy/fastgpt-v4822-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822
source_type: 官方文档
---

# FastGPT V4.8.22版本升级流程与更新内容说明

## 升级前置说明
该版本为FastGPT V4.8.22的升级包，仅商业版且提供SaaS服务的用户需要运行专属升级脚本。执行升级前，务必完成数据库备份，避免数据丢失。本次升级无需更新Sandbox镜像。

## 升级操作步骤
1. 更新镜像：将fastgpt和fastgpt-pro的镜像tag修改为v4.8.22。
2. 运行升级脚本（仅符合要求的用户执行）：在任意终端发起HTTP POST请求，需替换两个参数：将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT的域名。完整命令为：
```
curl --location --request POST https://{{host}}/api/admin/initv4822 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本会将联系方式迁移至对应用户表中。

## 版本更新内容
### 新增功能
1. AI对话节点支持解析`think`/`/think`标签内容作为思考链，需主动开启模型的思考输出功能；
2. 对话API优化，无论是否传递chatId，都会保存对话日志，未传递chatId时会随机生成一个用于存储；
3. 新增ppio模型提供商。

### 体验优化
1. 模型未配置时会给出明确提示，减少冲突提示场景；
2. 优化记录代码的使用逻辑；
3. 内容提取节点支持字段描述过长时自动换行，同时将输出名改为key而非description；
4. 优化团队管理的交互体验；
5. 对话接口非流响应模式下，新增报错字段。

### 问题修复
1. 修复思考内容未计入输出Tokens的问题；
2. 修复思考链流输出时与正文顺序偏差的问题；
3. 修复API调用工作流中，不支持Head检测的图片被错误过滤的问题，新增该类错误检测逻辑；
4. 修复模板市场部分模板的错误问题；
5. 修复免登录窗口无法正常判断语言识别是否开启的问题；
6. 修复对话日志导出未兼容sub path的问题；
7. 修复切换团队时未刷新成员列表的问题；
8. 修复联查member时存在空指针的接口问题；
9. 修复工作流基础节点无法升级的问题；
10. 修复向量检索结果未去重的问题；
11. 修复用户选择节点无法正常连线的问题；
12. 修复对话记录保存时source未正常记录的问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822
