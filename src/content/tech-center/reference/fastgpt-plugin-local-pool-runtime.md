---
title: FastGPT插件local-pool运行时的参数配置与调用流程说明
slug: /zh/reference/fastgpt-plugin-local-pool-runtime
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/intro
source_type: 官方文档小节
---

# FastGPT插件local-pool运行时的参数配置与调用流程说明

## 结论
FastGPT默认采用local-pool作为插件运行时，按单插件service维度管理Pod与请求队列。插件调用会按优先复用已有Pod、按需扩容Pod、队列等待的流程处理。

## 具体怎么做
1. 插件调用调度流程：
   1. 优先选择已有可用Pod，立即派发请求
   2. 无可用Pod且`pods + pendingPods < maxPods`时，创建新Pod，启动成功后派发当前请求
   3. 达到maxPods、处于启动退避期或暂时无法创建Pod时，请求进入有界队列等待
   4. 队列长度达到`maxQueueSize`时，新请求被拒绝；请求等待超过`queueTimeout`时超时失败
   5. Pod释放、创建成功、配置更新或崩溃恢复时，队列继续被消费
2. 单个插件可配置参数（默认值与说明）：
   | 参数 | 默认值 | 说明 |
   | --- | --- | --- |
   | 最小工作节点数 | 0 | 大于0时预热Pod，维持不少于该数量的Pod |
   | 最大工作节点数 | 5 | 无可用Pod时可扩容到该上限 |
   | 节点超时时间 | 120000ms | 单次插件调用在Pod内的执行超时时间 |
   | 每节点最大并发数 | 10 | 单个Pod同时处理的最大并发请求数 |
3. 全局环境变量配置：可通过环境变量配置全局默认运行参数与限制，例如`POOL_MAX_TOTAL_PODS`限制当前server进程内所有插件Pod的总上限，`POOL_SERVICE_MIN_PODS`设置单插件默认最小工作节点数。

## 注意事项
1. Pod启动错误会被分类记录，连续非超时启动失败达到阈值后会触发启动熔断，阻止继续创建Pod
2. 启动超时通常按资源繁忙处理，会进入指数退避后重试
3. 单插件的Pod数量受自身`maxPods`与全局`POOL_MAX_TOTAL_PODS`双重限制
4. 队列等待超时或队列容量耗尽时，新的插件调用请求会被拒绝或失败
5. Pod空闲时间超过`POOL_SERVICE_IDLE_TIMEOUT`后会被自动回收

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/intro)
