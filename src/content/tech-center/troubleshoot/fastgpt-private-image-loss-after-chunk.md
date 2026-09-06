---
title: 解决FastGPT v4.8.22私有部署版分块后图片丢失问题
slug: /zh/troubleshoot/fastgpt-private-image-loss-after-chunk
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4431
source_type: GitHub issue
---

# 解决FastGPT v4.8.22私有部署版分块后图片丢失问题

## 现象
使用FastGPT v4.8.22私有部署版本时，上传带大量图片的文件首次存储正常。调整训练参数后重新分块，图片出现expiredTime标识，超时后图片被删除，再次在知识库中查看时图片丢失。小文件不会出现该问题。

## 可能原因
暂未明确具体原因，需结合实际部署环境的相关配置确认。

## 排查步骤
1. 确认当前FastGPT版本为v4.8.22私有部署版本。
2. 上传带大量图片的文件，验证首次上传存储是否正常。
3. 调整训练参数后执行重新分块操作，查看图片是否出现expiredTime标识。
4. 等待超时后，进入知识库查看图片是否丢失。
5. 对比小文件分块操作，确认是否仅大量图片文件出现该问题。

## 解决与验证
目前暂无公开的官方修复方案，可通过以下方式验证排查：
1. 记录首次上传正常时的图片状态，对比重新分块后的图片信息。
2. 检查与图片存储有效期相关的配置，确认是否在分块流程中被错误修改。
3. 查看部署环境的存储服务日志，定位图片被删除的具体触发条件。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4431)
