---
title: FastGPT V4.8.22版本升级操作步骤与注意事项
slug: /zh/deploy/fastgpt-v4822-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822
source_type: 官方文档
---

# FastGPT V4.8.22版本升级操作步骤与注意事项

FastGPT V4.8.22为带升级脚本的更新版本，升级前需完成数据库备份。该版本仅需更新fastgpt与fastgpt-pro商业版镜像，标签需设置为v4.8.22，Sandbox镜像无需更新。仅商业版且提供SaaS服务的用户，需要执行对应升级脚本完成数据迁移。

### 升级操作步骤
1. 完成数据库备份；
2. 更新镜像：将fastgpt镜像tag设置为v4.8.22，fastgpt-pro商业版镜像tag同样设置为v4.8.22；
3. 运行升级脚本：通过终端发起HTTP POST请求，替换命令中的`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名，完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4822 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本会将联系方式迁移至对应用户表中。

### 版本更新详情
#### 新增内容
1. AI对话节点可解析`think`/`/think`标签内容作为思考链，需主动开启模型输出思考功能；
2. 对话API优化，无论是否传递chatId都会保存对话日志，未传递chatId时会随机生成一个chatId进行存储；
3. 新增ppio模型提供商。

#### 优化内容
1. 模型未配置时增加提示，减少冲突提示；
2. 使用记录代码优化；
3. 内容提取节点字段描述过长时自动换行，输出名改用key而非description；
4. 团队管理交互优化；
5. 对话接口非流响应时增加报错字段。

#### 修复内容
1. 修复思考内容未计入输出Tokens的问题；
2. 修复思考链流输出时与正文顺序偏差的问题；
3. 修复API调用工作流中不支持Head检测的图片被错误过滤的问题，新增该类错误检测；
4. 修复模板市场部分模板错误的问题；
5. 修复免登录窗口无法正常判断语言识别是否开启的问题；
6. 修复对话日志导出未兼容sub path的问题；
7. 修复切换团队时未刷新成员列表的问题；
8. 修复联查member时空指针的可能性问题；
9. 修复工作流基础节点无法升级的问题；
10. 修复向量检索结果未去重的问题；
11. 修复用户选择节点无法正常连线的问题；
12. 修复对话记录保存时source字段未正常记录的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4822)
