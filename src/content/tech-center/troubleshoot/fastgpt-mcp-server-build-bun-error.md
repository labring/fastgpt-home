---
title: 解决FastGPT的mcp_server Docker镜像构建时的bun依赖报错问题
slug: /zh/troubleshoot/fastgpt-mcp-server-build-bun-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5109
source_type: GitHub issue
---

# 解决FastGPT的mcp_server Docker镜像构建时的bun依赖报错问题

## 现象
用户在FastGPT项目根目录执行构建命令：`docker build -f ./projects/mcp_server/Dockerfile -t mcp_server:1.0.0 . --build-arg proxy=taobao --no-cache`，构建过程在第21步（共29步）执行`pnpm --filter=mcp_server build`时失败，具体报错信息如下：
1.  出现EISDIR读取文件错误，提示无法读取`/app/projects/mcp_server/node_modules/express`和`/app/projects/mcp_server/node_modules/dayjs`
2.  多个依赖无法解析：`raw-body`、`content-type`、`zod`，系统提示`Maybe you need to "bun install"`
3.  最终返回`ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL`错误，命令退出状态码为1，镜像构建失败。

## 可能原因
结合报错信息分析，核心原因集中在依赖安装与构建环节：
1.  构建流程中未执行完整的依赖安装步骤，导致`raw-body`、`content-type`、`zod`等依赖未被正确拉取
2.  构建时传入的代理配置可能未生效，导致依赖拉取不完整
3.  bun构建过程中尝试将node_modules下的目录当作文件读取，触发EISDIR路径错误
4.  pnpm的filter参数未正确拉取所有子依赖，导致`@modelcontextprotocol/sdk`依赖的第三方包未被安装

## 排查步骤
1.  检查目标Dockerfile，确认在`pnpm --filter=mcp_server build`命令前是否添加了依赖安装指令，例如是否存在`RUN pnpm --filter=mcp_server install`步骤
2.  核对构建命令中的`--build-arg proxy=taobao`参数，确认该代理配置适配当前网络环境，避免依赖拉取失败
3.  若可访问构建上下文目录，手动进入`projects/mcp_server`文件夹，执行`pnpm install`和`bun install`，验证是否能补全缺失的依赖
4.  确认构建命令的执行目录为项目根目录，避免因工作目录错误导致依赖路径解析异常

## 解决与验证
根据排查结果执行对应修复操作：
1.  若缺失依赖安装步骤，在Dockerfile的构建命令前添加依赖安装指令，例如在`RUN pnpm --filter=mcp_server build`前插入`RUN pnpm --filter=mcp_server install`
2.  若代理配置不生效，调整`--build-arg proxy`参数为适配当前网络的代理地址，或移除该参数（若本地网络可直接拉取依赖）
3.  若为bun构建的路径错误，可尝试检查node_modules目录的权限配置，或调整构建命令的参数
完成修复后，重新执行原构建命令，确认第21步的构建环节不再报错，镜像构建成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5109)
