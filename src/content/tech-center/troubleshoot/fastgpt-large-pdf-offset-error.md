---
title: 解决FastGPT上传大于100MPDF文件时offset out of bounds报错问题
slug: /zh/troubleshoot/fastgpt-large-pdf-offset-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4092
source_type: GitHub issue
---

# 解决FastGPT上传大于100MPDF文件时offset out of bounds报错问题

## 现象
私有部署v4.9.0版本的FastGPT，在上传大于100M的PDF文件时会触发报错。服务日志显示错误信息为`Api response error: undefined, offset is out of bounds`，具体错误堆栈为`RangeError: offset is out of bounds`，错误发生在Buffer.set操作、BSON序列化以及生成分块的流程环节中。

## 可能原因
从报错的堆栈信息来看，错误出现在文本处理的缓冲区操作环节。当处理体积超过100M的PDF文件时，分块流程中计算的偏移量超出了预先分配的缓冲区范围。结合配置的分块上限为8000，推测超大文件的文本提取和序列化过程中，缓冲区的分配逻辑未能适配超大体积文件的处理需求，导致偏移量计算异常。当前使用的索引模型为BAAI/bge-m3，未发现该模型与报错直接相关的明确信息，核心问题指向缓冲区偏移异常。

## 排查步骤
1.  确认FastGPT部署版本为v4.9.0，使用的索引模型为BAAI/bge-m3，且分块上限设置为8000。
2.  通过文件属性查看待上传的PDF文件，确认其体积确实大于100M。
3.  查看FastGPT服务的运行日志，确认是否存在`offset is out of bounds`的RangeError报错，匹配issue中提供的日志内容。
4.  上传体积小于100M的PDF文件，验证索引流程是否能正常完成，排除当前环境的通用异常问题。

## 解决与验证
根据现有信息，可先通过拆分超大PDF文件至100M以内的方式进行临时解决，上传拆分后的文件验证报错是否消失。若需要支持超过100M的PDF文件上传与索引，需检查FastGPT的分块处理逻辑，调整缓冲区分配参数以适配超大文件的偏移量计算。验证方式为上传调整后的文件，确认服务日志无上述报错，且索引流程正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4092)
