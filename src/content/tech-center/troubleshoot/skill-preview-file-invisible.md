---
title: 解决FastGPT Skill运行预览时虚拟机内文件不可见的问题
slug: /zh/troubleshoot/skill-preview-file-invisible
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7001
source_type: GitHub issue
---

# 解决FastGPT Skill运行预览时虚拟机内文件不可见的问题

## 现象
FastGPT私有部署V4.15.0-2版本中，创建Skill并使用运行预览功能生成文件后，预览界面的虚拟机入口无法看到生成的文件，但实际虚拟机容器内已存在该文件；而在Agent界面使用该Skill生成文件后，虚拟机入口可正常看到生成的文件。

## 可能原因
暂未明确具体根因，仅能确认该异常仅在Skill的运行预览场景出现，Agent调用该Skill生成文件的场景无此问题，具体触发条件需按实际环境确认。

## 排查步骤
1.  确认当前FastGPT部署版本为V4.15.0-2私有部署版本。
2.  进入Skill创建页面，使用运行预览功能生成目标文件。
3.  点击预览界面的虚拟机入口，查看是否能看到生成的文件。
4.  退出预览界面，进入Agent界面使用该Skill生成文件，再点击虚拟机入口查看文件是否可见。
5.  对比两种场景下的文件可见性差异，记录异常场景的完整操作细节。

## 解决与验证
目前暂无明确的永久修复方案，可通过以下方式临时验证与确认：
1.  在Skill运行预览的异常场景中，直接进入虚拟机容器内部，通过命令行确认文件实际存在。
2.  切换至Agent界面使用该Skill生成文件，即可通过预览界面正常查看生成的文件。
具体的永久修复可关注官方版本更新动态。

> 来源：https://github.com/labring/FastGPT/issues/7001
