---
title: FastGPT V4.8.16与V4.8.18版本更新内容速查
slug: /zh/reference/fastgpt-v4816-v4818-update-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4817
source_type: 官方文档小节
---

# FastGPT V4.8.16与V4.8.18版本更新内容速查

## 结论
本文整理了FastGPT V4.8.16（含配置变更说明）与V4.8.18的官方更新内容，涵盖新增功能、体验优化与问题修复三类。这些更新覆盖工具调用、工作流、模型参数等核心功能模块，可用于版本升级参考。

## 具体怎么做
1. 新增功能
   - 简易模式工具调用支持数组类型插件
   - 工作流新增异常离开自动保存，避免工作流内容丢失
   - LLM模型参数支持关闭max_tokens和temperature配置
   - 商业版支持后台配置模板市场与自定义工作流变量，用于业务系统鉴权打通
   - 搜索测试接口支持问题优化
   - 工作流拆分Input Token和Output Token分别记录展示，修复部分请求未记录输出Token的计费问题
2. 体验优化
   - Markdown内容超出20万字符时，不使用Markdown组件以避免崩溃
   - 知识库搜索参数的滑动条支持输入模式，可实现精准控制
   - 优化可用模型展示UI
   - Mongo查询语句新增virtual字段
3. 问题修复
   - 修复文件返回接口缺少Content-Length头的问题，解决非同源文件上传时阿里vision模型无法识别图片的故障
   - 修复判断器两端字符串隐藏换行符导致的判断失效问题
   - 修复变量更新节点手动输入非字符串类型数据时无法自动转换的问题
   - 修复豆包模型无法使用工具调用的问题

## 注意事项
1. 商业版专属的模板市场、自定义工作流变量配置功能，仅商业版用户可使用
2. Markdown内容超过20万字符时将切换渲染方式，需留意内容长度限制
3. 版本升级需参考V4.8.16的配置变更说明与V4.8.18的升级脚本操作
4. 修复后的功能需在对应场景中验证使用效果

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4817)
