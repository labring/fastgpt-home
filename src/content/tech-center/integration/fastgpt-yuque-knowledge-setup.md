---
title: FastGPT语雀文件库知识库的配置与使用方法
slug: /zh/integration/fastgpt-yuque-knowledge-setup
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/yuque_dataset
source_type: 官方文档
---

# FastGPT语雀文件库知识库的配置与使用方法

该功能自FastGPT v4.8.16版本起对商业版用户开放，用于导入语雀文档库作为知识库数据源，目前处于测试阶段，部分交互细节有待优化。该功能支持两种同步方式：每日不定时自动扫描更新语雀文档并同步，以及手动触发同步更新，可帮助用户快速将语雀中的文档资源接入FastGPT知识库体系。

### 配置与操作步骤
1.  获取语雀的token和uid：登录语雀平台，进入首页后点击个人头像，选择「设置」即可找到对应参数。需注意为token配置正确的访问权限，个人版和企业版用户均需完成该操作，分别可在对应入口获取token与user ID。
2.  创建知识库：使用上一步获取的token和user ID，在FastGPT知识库创建页面选择「语雀文件库」类型，填入获取到的参数后点击创建按钮，完成知识库的初始化。
3.  导入文档：知识库创建完成后，点击页面中的「添加文件」按钮，跟随页面引导完成语雀文档库的导入流程，整个过程无需额外复杂配置。

### 使用边界与易错提示
该功能仅面向FastGPT商业版用户，非商业版用户无法使用该功能，且需确保FastGPT版本不低于v4.8.16。若未正确为token配置权限，可能导致无法正常读取语雀文档；使用非合规版本或非商业版账号尝试配置时，会出现功能入口缺失或创建失败的问题。此外，自动同步为每日不定时扫描，若需紧急更新文档，可通过手动同步触发即时更新。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/yuque_dataset
