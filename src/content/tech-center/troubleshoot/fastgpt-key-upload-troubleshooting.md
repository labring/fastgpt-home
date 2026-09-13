---
title: FastGPT密钥异常与上传文件问题排查方法
slug: /zh/troubleshoot/fastgpt-key-upload-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/701
source_type: GitHub issue
---

# FastGPT密钥异常与上传文件问题排查方法

## 现象
用户在使用FastGPT公有云或私有部署版本过程中出现异常，场景涉及密钥配置与上传文件操作。其中上传的文件仅包含两行内容，无大数据量相关问题。用户已确认自身使用的密钥可正常使用。

## 可能原因
异常可能与所使用的密钥配置或可用性相关，未查看系统运行日志也可能导致无法定位异常根源。

## 排查步骤
1. 查看FastGPT系统运行日志，提取与当前异常相关的日志内容，作为排查依据。
2. 确认上传文件的实际行数与内容规模，排查是否存在大数据量相关的异常触发条件。
3. 再次验证所使用密钥的可用性与配置正确性，确认密钥符合平台使用要求。

## 解决与验证
若日志显示与密钥相关的异常信息，需重新核对密钥配置并确认密钥可用性。若为上传文件场景，需确认文件格式与内容符合平台要求，本次场景下两行文件无异常问题。完成上述操作后，再次触发对应场景，验证异常是否得到解决。

> 来源: [FastGPT GitHub issue #701](https://github.com/labring/FastGPT/issues/701)
