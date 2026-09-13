---
title: 解决FastGPT主项目与插件的S3桶AK/SK无法分开配置问题
slug: /zh/troubleshoot/fastgpt-s3-bucket-aksk-separate-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6130
source_type: GitHub issue
---

# 解决FastGPT主项目与插件的S3桶AK/SK无法分开配置问题

## 现象
当前FastGPT的主项目与插件的S3公有读桶、私有读桶统一使用一组AK/SK配置，无法针对不同读写权限的存储桶实现精细化的风险控制，无法满足精细化权限管理的应用场景需求。

## 可能原因
当前FastGPT的系统配置逻辑默认将主项目与插件的S3存储桶AK/SK设置为同一组密钥，未提供针对公有读桶、私有读桶分别配置独立AK/SK的选项，导致无法实现精细化的风险控制。

## 排查步骤
1. 确认当前FastGPT主项目与插件的S3存储桶所使用的AK/SK是否为同一组配置。
2. 检查系统中是否存在分别针对公有读桶、私有读桶配置AK/SK的相关入口或参数。
3. 需按实际部署环境确认相关配置的具体位置与参数名称。

## 解决与验证
该功能已纳入功能规划阶段。待功能正式上线后，可通过系统提供的对应配置入口，分别为FastGPT主项目与插件的S3公有读桶、私有读桶设置独立的AK/SK密钥。验证时需按照实际部署的存储桶访问规则，分别测试两个存储桶的访问权限，确认配置的AK/SK能够正常生效。

> 来源: [FastGPT GitHub issue #6130](https://github.com/labring/FastGPT/issues/6130)
