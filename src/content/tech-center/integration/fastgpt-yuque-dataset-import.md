---
title: FastGPT商业版语雀文件库的配置与文档导入方法
slug: /zh/integration/fastgpt-yuque-dataset-import
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/yuque_dataset
source_type: 官方文档
---

# FastGPT商业版语雀文件库的配置与文档导入方法

FastGPT v4.8.16版本起，商业版用户可使用语雀文件库功能导入语雀文档库，无需手动复制粘贴文档内容即可完成FastGPT知识库的资源接入。该功能目前处于测试阶段，部分交互细节有待优化，用户在使用过程中可关注后续版本的功能更新。

### 核心配置参数说明
使用该功能需准备两个必填参数：语雀token和语雀uid，二者均可在语雀平台的个人设置页面获取。需要注意的是，为保障正常访问，必须为token配置对应访问权限，个人版与企业版用户均需完成该权限赋值操作，未配置权限的token无法正常读取语雀文档库内容。

### 完整配置与导入步骤
1. 获取参数：登录语雀平台，点击首页右上角的个人头像，选择"设置"选项，在设置页面中即可找到token与uid的对应参数项。
2. 创建知识库：进入FastGPT的知识库管理页面，点击新建知识库，选择"语雀文件库"类型，将获取到的token与uid填入对应参数框，确认参数无误后点击"创建"按钮完成知识库创建。
3. 导入与同步：创建完成后，进入该知识库详情页，点击"添加文件"按钮，跟随页面引导完成语雀文档库的导入操作。该知识库支持自动定时同步功能，每日会不定时扫描文档更新内容并同步至FastGPT平台，用户也可随时点击手动同步按钮，手动触发文档内容更新同步。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/yuque_dataset)
