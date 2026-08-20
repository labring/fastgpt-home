---
title: 解决FastGPT中S3自定义地址未正确生成docker-compose配置的问题
slug: /zh/troubleshoot/s3-custom-address-docker-compose
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6743
source_type: GitHub issue
---

# 解决FastGPT中S3自定义地址未正确生成docker-compose配置的问题

## 现象
用户在FastGPT配置S3访问地址时，选择「其他（手动输入）」并填写完整地址`http://172.17.4.138:9100`，但最终生成的docker-compose.yml中minio服务的端口映射仍为`9000:9000`，未正确应用用户输入的端口。

## 可能原因
问题根源在于install.sh脚本的S3地址处理逻辑存在缺陷：原代码中通过`S3_HOST="${S3_HOST%%:*}"`直接截取了地址中冒号前的内容，将端口部分剥离，未对自定义地址中的端口进行单独提取和保留，导致docker-compose配置无法正确生成带指定端口的服务。

## 排查步骤
1.  进入FastGPT的配置流程，在S3访问地址选择环节，确认是否选择「其他（手动输入）」并填写了包含端口的完整地址（格式如`http://domain:port`）。
2.  查看生成的docker-compose.yml文件，检查minio服务的`ports`配置项，确认端口是否与手动输入的地址一致。
3.  检查install.sh脚本中S3地址处理的代码段，确认是否存在剥离端口的逻辑问题。

## 解决与验证
1.  修复install.sh脚本的S3地址处理逻辑，替换原代码段：
    ```bash
    # 原错误代码
    if $S3_CUSTOM; then
        S3_HOST="${S3_ADDR#http://}"
        S3_HOST="${S3_HOST#https://}"
        S3_HOST="${S3_HOST%%:*}"
        S3_HOST="${S3_HOST%%/*}"
    fi
    # 替换为修复后的逻辑
    url="${url%%/*}"           # 先去掉路径
    if [[ $url == *:* ]]; then
        S3_HOST_ONLY="${url%%:*}"
        S3_PORT="${url#*:}"
        S3_ENDPOINT="$url"
    else
        S3_HOST_ONLY="$url"
        S3_PORT="9000"         # 默认端口
        S3_ENDPOINT="${url}:9000"
    fi
    ```
2.  重新运行install.sh脚本，重新配置S3访问地址，选择「其他（手动输入）」并填写包含端口的完整地址。
3.  查看生成的docker-compose.yml文件，确认minio服务的`ports`配置项与输入的端口一致，验证配置生成正确。
4.  启动服务后，确认S3存储可正常访问。

> 来源：[FastGPT GitHub Issue #6743](https://github.com/labring/FastGPT/issues/6743)
