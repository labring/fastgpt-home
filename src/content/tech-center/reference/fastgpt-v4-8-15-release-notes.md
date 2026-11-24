---
title: FastGPT V4.8.15版本更新内容技术速查
slug: /zh/reference/fastgpt-v4-8-15-release-notes
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4815
source_type: 官方文档小节
---

# FastGPT V4.8.15版本更新内容技术速查

## 结论
本页汇总FastGPT V4.8.15版本的官方更新内容，包含新增功能、优化项与问题修复三类。该版本弃用外部文件库，新增多项实用功能，修复了多个运行与配置问题。

## 具体怎么做
### 新增功能
1. API知识库，外部文件库将被弃用
2. 工具箱页面，展示系统资源；商业版可便捷配置系统插件与自定义分类
3. Markdown支持HTML代码渲染，预览模式下限制script脚本仅做展示
4. 自定义系统级文件解析服务，参考接入Marker PDF文档解析
5. 集合可直接调整参数，无需删除再导入
6. 商业版后台支持配置侧边栏跳转链接

### 优化项
1. 优化base64图片截取、i18n cookie判断逻辑
2. 支持Markdown文本分割时仅含标题无内容的场景
3. 未赋值变量替换为undefined，不保留原id串
4. 全局变量默认值在API中生效，自定义变量支持设置默认值
5. 增加HTTP Body的JSON解析能力，将undefined转为null以减少解析错误
6. 定时执行功能增加运行日志与重试机制，降低报错概率

### 修复问题
1. 修复分享链接点赞、语言播放鉴权问题
2. 修复对话页切换自动执行应用时误触发非自动应用的问题
3. 修复插件应用知识库引用上限始终为3000的问题
4. 修复工作流编辑记录移除本地存储，异常离开时强制自动保存
5. 修复工作流$开头特殊变量无法替换的问题

## 注意事项
1. 外部文件库即将被弃用，需尽快迁移至API知识库
2. Markdown预览模式下渲染HTML时，script脚本仅可展示，无法执行
3. 未赋值字符串变量替换后为undefined，不保留原id串
4. 工作流编辑记录不再使用本地存储，异常离开时自动保存

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4815)
