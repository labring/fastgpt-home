---
title: 解决FastGPT Docker镜像构建时tiktoken encoders删除报错问题
slug: /zh/troubleshoot/fastgpt-docker-build-tiktoken-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3248
source_type: GitHub issue
---

# 解决FastGPT Docker镜像构建时tiktoken encoders删除报错问题

## 现象
用户执行`docker build --build-arg proxy=1 -f projects/app/Dockerfile -t fastgpr:1.0.1 .`命令构建FastGPT镜像时，出现报错`#0 0.645 rm: can't remove './node_modules/tiktoken/encoders': Invalid argument`。该报错仅在部分服务器出现，使用相同Docker版本的其他服务器可正常完成构建。

## 可能原因
暂无明确官方根因，该报错与特定构建环境相关，可能涉及文件系统处理规则、挂载参数限制或构建缓存异常，具体需按实际环境确认。

## 排查步骤
1.  核对当前构建服务器与可成功构建服务器的Docker版本，确保两者版本一致。
2.  检查当前服务器的文件系统类型，确认是否存在对特殊文件名或长路径的限制。
3.  执行`docker builder prune`命令清理Docker过期构建缓存，随后重新执行构建命令。
4.  临时移除`--build-arg proxy=1`构建参数，测试是否仍出现该报错，排查代理参数是否影响构建流程。
5.  手动在服务器终端执行`rm -rf ./node_modules/tiktoken/encoders`命令，确认本地是否可正常删除该目录，排查文件系统权限问题。

## 解决与验证
参考可成功构建的服务器的环境配置，对齐相关参数。若清理构建缓存后问题解决，则验证通过。若仍存在报错，需进一步核对服务器内核版本、文件系统挂载选项等细节。重新执行完整的`docker build`命令，确认镜像构建无该报错即为验证成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3248)
