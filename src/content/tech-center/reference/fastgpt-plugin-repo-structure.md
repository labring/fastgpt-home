---
title: FastGPT插件项目的仓库结构与分层设计说明
slug: /zh/reference/fastgpt-plugin-repo-structure
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/intro
source_type: 官方文档小节
---

# FastGPT插件项目的仓库结构与分层设计说明

## 结论
fastgpt-plugin 采用 pnpm workspace 组织 Monorepo，参考 Clean Architecture 和 DDD 分层设计。项目通过明确的层级划分目录，各层级依赖关系清晰，便于维护和扩展。

## 具体怎么做
1. 项目根目录按以下结构划分：
   - `apps/`：包含cli（开发、构建等命令行工具）、server（FastGPT Plugin HTTP服务）、debug-runtime-monitor（本地运行时监控调试面板），作为组合根负责装配依赖、启动进程或提供开发命令
   - `packages/`：包含domain（领域实体、值对象、端口定义）、usecase（插件、工具等应用用例编排）、interface-adapter（HTTP合约、DTO、鉴权适配）、infrastructure（Hono、Mongo、S3、Redis等运行环境与工具实现）、shared（跨层复用工具函数）
   - `sdk/`：包含client（调用FastGPT Plugin服务的客户端SDK）、factory（插件作者侧SDK），面向外部使用者发布
   - `test/`：跨包测试工具与fixtures目录；`docs/`：项目文档目录
2. 遵循以下依赖规则：domain为最内层，不依赖应用入口和基础设施；usecase依赖domain的实体、值对象和端口；interface-adapter负责将外部协议转换为应用可理解的数据结构；infrastructure实现端口和运行环境能力。

## 注意事项
1. domain层仅定义业务概念和端口，不得引入外部依赖，不依赖其他业务层
2. usecase层仅负责业务流程编排，不得直接实现运行环境能力
3. interface-adapter层仅处理外部协议与数据转换，不包含业务逻辑
4. apps层仅作为组合根，负责依赖装配与进程启动，不包含业务代码
5. sdk目录内容仅面向外部使用者，不得在项目内部直接引用
6. 开发系统工具或维护模型预设，可分别参考系统工具开发指南和增加模型预设相关文档

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/intro)
