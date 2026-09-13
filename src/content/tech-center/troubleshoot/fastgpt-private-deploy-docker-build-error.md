---
title: 解决FastGPT私有部署docker build时的文件缺失报错
slug: /zh/troubleshoot/fastgpt-private-deploy-docker-build-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1468
source_type: GitHub issue
---

# 解决FastGPT私有部署docker build时的文件缺失报错

## 现象
用户在私有部署V4.8.0版本FastGPT时，执行docker build命令`docker build -t dockername/fastgpt:tag --build-arg name=app --build-arg proxy=taobao .`，构建过程中出现两个阶段报错：`ERROR [runner  9/15] COPY --from=builder --chown=nextjs:nodejs /app/projects/app/.next/standalone /app/`和`ERROR [runner 11/15] COPY --from=builder --chown=nextjs:nodejs /app/projects/app/.next/server/chunks /app/projects/app/.next/server/chunks`，最终抛出完整错误提示：`ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref af7ffbb5-f2ee-4fdb-adf3-27574f238098::lfycfn5r7ejy83qdq62o22hdz: "/app/projects/app/.next/server/chunks": not found`。该问题出现在完成根目录pnpm i与projects/app目录pnpm dev调试后执行构建的场景。

## 可能原因
该报错的核心原因是docker build构建阶段无法找到指定的文件目录。结合复现流程，用户在执行docker build前，仅在projects/app目录执行了开发调试的pnpm dev命令，未执行生产构建流程以生成所需的构建产物，导致/app/projects/app/.next/server/chunks目录未被创建，无法被COPY指令读取。

## 排查步骤
1.  确认当前使用的FastGPT版本为V4.8.0，检查根目录是否已执行pnpm i完成依赖安装。
2.  进入projects/app目录，查看.next目录结构，确认是否存在.server/chunks子目录。
3.  核对是否仅执行了pnpm dev调试命令，未执行生产构建以生成所需的构建产物。
4.  检查docker build命令中的--build-arg参数配置，确认与当前部署需求一致。

## 解决与验证
解决该问题需先生成生产构建所需的产物：
1.  停止当前正在运行的pnpm dev调试进程。
2.  在projects/app目录下执行生产构建命令，生成.next/standalone与.next/server/chunks目录。
3.  返回项目根目录，重新执行原docker build命令。
验证环节：确认构建过程不再报文件缺失的错误，镜像成功构建后，可启动容器验证FastGPT功能是否正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1468)
