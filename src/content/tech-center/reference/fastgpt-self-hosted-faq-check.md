---
title: FastGPT自托管部署与运行常见问题排查速查
slug: /zh/reference/fastgpt-self-hosted-faq-check
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host
source_type: 官方文档小节
---

# FastGPT自托管部署与运行常见问题排查速查

## 结论
本文整理了FastGPT自托管部署与运行的常见问题排查方案。涵盖版本匹配、服务连接、启动异常、登录报错等多类场景的实操指引。

## 具体怎么做
1. 版本匹配：确认FastGPT与FastGPT-plugin版本对应关系
2. 环境变量配置：
   - 按需自定义环境变量，通过官方流程检查是否正常加载
   - 核对API地址、密钥等配置项，确保与服务要求一致
3. 服务连接排查：
   - 出现Mongo副本集自动初始化失败时，检查Mongo服务状态
   - 提示`relation "modeldata" does not exist`时，确认数据库初始化完成
   - 提示`Operation auth_codes.findOne() buffering timed out after 10000ms`时，排查网络或服务超时
   - S3无法正常连接时，核对S3配置参数
4. 端口与访问：
   - 遇端口冲突时，修改开放的外网端口配置
   - 登录提示`Network Error`时，重新核对API地址配置
5. 其他异常处理：
   - 首次部署root用户未注册，完成系统初始化流程
   - 无法导出知识库或使用语音功能，检查系统插件安装状态
   - 部署Zilliz版本时，正确获取并配置账号与密钥

## 注意事项
- 仅使用官方提供的部署配置与流程，不得修改未提及的核心参数
- 自定义镜像源部署需确认源可用性，避免版本不匹配
- 报错处理优先匹配官方文档对应问题，不得自行修改系统核心配置
- 本地模型镜像、语音功能等场景需按官方指引完成配置

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host)
