---
title: 解决FastGPT sandbox_get_file_url生成临时链接无法打开问题
slug: /zh/troubleshoot/fastgpt-sandbox-file-url-domain-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6950
source_type: GitHub issue
---

# 解决FastGPT sandbox_get_file_url生成临时链接无法打开问题

## 现象
用户在FastGPT私有部署版本V4.14.20中，通过虚拟机调用sandbox_get_file_url工具生成文件临时链接后，生成的链接被错误添加了未配置的二级域名ai.xx.cn，导致链接无法正常打开访问。

## 可能原因
目前仅能确认该问题的表现为生成的临时链接被错误附加了非预期的二级域名，具体根因需结合实际部署环境进一步排查确认。

## 排查步骤
1.  确认当前FastGPT的部署版本为V4.14.20私有部署版本，核对版本信息与issue描述一致。
2.  查看调用sandbox_get_file_url工具后生成的完整链接，确认是否存在如ai.xx.cn这类未配置的额外二级域名。
3.  检查FastGPT的域名相关配置，确认已生效的有效域名列表，需按实际环境确认配置项内容。
4.  核对调用sandbox_get_file_url工具时的参数，确认是否存在传入错误域名参数的情况。

## 解决与验证
临时可先手动移除链接中错误添加的二级域名，验证链接是否可以正常访问。后续需排查sandbox_get_file_url工具的域名拼接逻辑，修正错误的域名附加规则。验证方式为重新调用该工具生成临时链接，确认生成的链接仅包含正确的有效域名，无额外未配置的二级域名，访问链接确认可正常打开。

> 来源：[FastGPT GitHub Issue #6950](https://github.com/labring/FastGPT/issues/6950)
