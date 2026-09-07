---
title: 解决本地修改FastGPT master分支构建镜像时的文件缺失报错
slug: /zh/troubleshoot/fastgpt-master-build-copy-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1707
source_type: GitHub issue
---

# 解决本地修改FastGPT master分支构建镜像时的文件缺失报错

## 现象
用户在本地修改master分支后，执行`docker build -t  . --build-arg name=app --build-arg proxy=taobao`命令构建镜像时，触发如下报错：
```
 => ERROR [runner 13/17] COPY --from=mainDeps /app/node_modules/tiktoken ./node_modules/tiktoken                                                   0.0s
------
 > [runner 13/17] COPY --from=mainDeps /app/node_modules/tiktoken ./node_modules/tiktoken:
------
Dockerfile:69
--------------------
  67 |
  68 |     # copy tiktoken but not copy ./node_modules/tiktoken/encoders
  69 | >>> COPY --from=mainDeps /app/node_modules/tiktoken ./node_modules/tiktoken
  70 |     RUN rm -rf ./node_modules/tiktoken/encoders
  71 |
--------------------
ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref df29319f-8f71-4fd9-8b27-3d9ab7ddc334::837hjyprk382m76ti8egpuhq6: "/app/node_modules/tiktoken": not found
```

## 可能原因
该报错由Docker镜像构建过程中复制依赖文件失败引发。具体触发场景为：构建流程的mainDeps阶段未成功生成`/app/node_modules/tiktoken`目录，导致后续COPY指令无法找到目标文件。可能的相关因素包括：本地修改代码时改动了依赖安装相关配置，导致依赖拉取或安装失败；构建缓存导致依赖产物未正确保留；或代理配置影响了依赖包的拉取。

## 排查步骤
1.  查看完整的构建日志，确认mainDeps依赖安装阶段是否存在报错，定位依赖安装失败的具体原因。
2.  检查本地对master分支的修改内容，确认是否改动了package.json、依赖安装脚本或Dockerfile中的依赖相关配置。
3.  核对构建命令中的`--build-arg`参数，确认代理配置是否正确，确保依赖源可正常访问。
4.  清除本地Docker构建缓存，执行`docker system prune -a`命令后重新执行构建命令。

## 解决与验证
根据排查到的具体原因进行处理：若依赖安装失败，修正依赖拉取的配置（如调整代理参数、修复依赖脚本错误）；若本地修改影响了依赖流程，回滚相关改动或修正配置；若为构建缓存问题，清除缓存后重新构建。验证方式为重新执行构建命令，确认Dockerfile第69行的COPY步骤不再报错，镜像构建成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1707)
