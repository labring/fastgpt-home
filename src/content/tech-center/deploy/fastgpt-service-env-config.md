---
title: FastGPT 各服务组件与环境配置参数说明
slug: /zh/deploy/fastgpt-service-env-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: 官方文档
---

# FastGPT 各服务组件与环境配置参数说明

FastGPT 包含多个独立部署的服务组件，覆盖核心业务与辅助功能场景。

### 核心服务模块说明
| 服务模块标识 | 功能说明 |
| ---- | ---- |
| `projects/app` | 主应用服务，承载Next.js页面、API路由、工作流、知识库、对象存储、向量库等能力 |
| `pro/admin` | 商业版Admin服务，提供专属后台功能，复用主应用的数据库、密钥、对象存储、模型、日志等配置 |
| `projects/code-sandbox` | 代码沙箱服务，对外暴露`/sandbox`执行接口，供主应用通过`CODE_SANDBOX_URL`调用 |

### 环境配置规范与必填参数
环境配置需遵循统一规则。App与Admin共享的布尔变量，使用`true`、`1`、`yes`或`y`表示开启，其他值均视为关闭。代码层面，`packages/service/env.ts`导出名为`serviceEnv`的配置对象，`projects/app/src/env.ts`导出名为`appEnv`的配置对象。运行期必须配置`FILE_TOKEN_KEY`、`AES256_SECRET_KEY`与`INVOKE_TOKEN_SECRET`三个密钥，建议使用随机强密钥，不得使用示例值。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
