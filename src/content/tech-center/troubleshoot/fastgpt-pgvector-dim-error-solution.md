---
title: 解决FastGPT私有部署高维度Embedding索引报错问题
slug: /zh/troubleshoot/fastgpt-pgvector-dim-error-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1850
source_type: GitHub issue
---

# 解决FastGPT私有部署高维度Embedding索引报错问题

## 现象
用户在FastGPT 4.8.1私有部署版本中，使用Ollama上的Qwen:72b模型生成Embedding向量时，出现PG Vector索引维度限制报错，无法正常创建或使用向量索引。报错提示Embedding维度不能超过1536，PG Vector的index算法不能超过2000维度。

## 可能原因
FastGPT当前版本默认限制Embedding向量维度不超过1536，且PG Vector插件的默认索引算法仅支持不超过2000维度的向量。当使用生成维度超出该范围的Embedding模型时，会触发维度超限的报错。

## 排查步骤
1. 确认当前使用的Embedding模型生成的向量维度具体数值。
2. 检查FastGPT部署环境中PG Vector插件的当前配置与已创建的向量索引规则。
3. 验证报错是否由向量维度超出默认限制导致。
4. 确认自身使用的FastGPT版本号，本次问题涉及4.8.1私有部署版本。

## 解决与验证
可通过以下方式解决维度限制问题：使用PG Vector官方提供的半精度索引，可支持最高4000维度的向量；或使用二进制量化，可支持最高64000维度的向量；也可通过降维技术调整向量维度至支持范围内。
修改配置后重新创建向量索引，测试高维度Embedding能否正常生成并存储，确认无维度超限报错即为解决成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1850)
