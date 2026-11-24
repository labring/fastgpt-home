---
title: FastGPT部署的域名与运行时环境变量配置说明
slug: /zh/reference/fastgpt-domain-runtime-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT部署的域名与运行时环境变量配置说明

## 结论
这些环境变量用于配置FastGPT的访问域名、前端部署路径与运行时参数。正确配置后可补全资源路径、正常启动服务并隔离文件访问风险。

## 具体怎么做
可通过配置以下环境变量完成相关设置：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| FE_DOMAIN | 必填 | 客户端访问FastGPT的地址，由协议、主机和可选端口组成，用于补全文件、图片等资源路径；本地开发可使用http://localhost:3000 |
| FILE_DOMAIN | 空 | 文件访问域名，通常指向FastGPT服务，可独立域名隔离文件风险 |
| NEXT_PUBLIC_BASE_URL | 空 | Next.js子路径部署前缀，例如 /fastgpt；需在构建镜像时确定 |
| HOSTNAME | localhost | 服务本机Host，用于内部URL与SSRF本地地址识别；容器中常设为0.0.0.0 |
| PORT | 3000 | Next.js服务监听端口，也用于本地地址识别 |
| NODE_ENV | 空 | 标准Node/Next.js运行环境变量，生产镜像中为production |
| NEXT_TELEMETRY_DISABLED | 1 | 生产镜像中关闭Next.js Telemetry |
| NODE_OPTIONS | --max-old-space-size=4096 | 生产镜像构建阶段使用的Node.js启动参数，用于提高构建内存上限 |

## 注意事项
1. FE_DOMAIN为必填项，未配置会导致资源路径无法正常补全。
2. NEXT_PUBLIC_BASE_URL需在构建镜像时确定，后续修改需重新构建镜像。
3. 容器部署场景下需将HOSTNAME设为0.0.0.0，否则无法正常对外提供服务。
4. 生产环境需将NODE_ENV设为production以符合标准运行要求。
5. NODE_OPTIONS仅用于生产镜像构建阶段，请勿随意修改运行时的该参数。
6. 生产镜像默认关闭Next.js Telemetry，如需开启需调整NEXT_TELEMETRY_DISABLED变量值。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
