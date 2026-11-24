---
title: FastGPT V4.15版本代码优化内容技术速查
slug: /zh/reference/fastgpt-v415-code-optimizations
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT V4.15版本代码优化内容技术速查

## 结论
FastGPT V4.15针对代码架构、构建工具、模块拆分等多个维度完成优化。本次优化覆盖性能提升、bug修复、工程化升级等方向，可帮助降低模块耦合、提升开发与运行效率。

## 具体怎么做
1. 升级Next.js并切换至Turbopack构建，容器默认Node.js版本升级至24。
2. 统一Agent tool的声明与运行方式。
3. 插件服务从旧runtime结构调整为pnpm workspace monorepo，拆分为HTTP服务入口、领域模型、用例、API adapter、基础设施、SDK和CLI模块。
4. 所有app API接口统一使用zod schema编写并生成文档。
5. 拆分AI request、工作流运行详情和对话框相关代码，降低模块耦合。
6. 优化用户自定义密钥计费逻辑和token计算依赖。
7. 服务端env加载统一使用@t3-oss/env-core，其余服务采用集中导出env的方式使用环境变量。
8. 升级ESLint、Prettier、textlint、lint-staged和TS6等工程化工具链。
9. 优化单测性能，全量测试耗时从10分钟降至5分钟。
10. 增强GitHub Action安全性。
11. 补充流恢复相关模块的设计文档与单元测试。
12. volume manager从Bun改为Node.js运行。
13. 优化worker内图片处理逻辑，及时处理图片不再存留base64数据，降低内存消耗。
14. 新增字符串长度保护逻辑，长度过大时停止同步替换，避免高CPU负载。
15. 工作流nodeResponse改为扁平化存储，避免大嵌套工作流保存失败。
16. 移除所有内置LLM请求中的temperature和max_tokens参数，提升模型兼容性。
17. 修复工作流节点配置中FlowNodeInputTypeEnum.*、FlowNodeOutputTypeEnum.*、WorkflowIOValueTypeEnum.*枚举表达式字符串脏数据导致的输入渲染和IO类型判断异常问题。
18. 修复工作流文本框ctrl+c复制被节点抢占的问题。
19. 抽象chat接口为平台通用接口，不再绑定app。

## 注意事项
1. 升级需将容器默认Node.js版本调整至24。
2. 若自定义工作流节点使用了异常的枚举表达式字符串，需修复后再部署。
3. 内置LLM请求已移除temperature和max_tokens，需确认自定义调用逻辑是否适配。
4. 插件服务需适配pnpm workspace monorepo的结构调整。
5. 本次更新存在环境变量变更，需参考对应版本的升级脚本完成配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
