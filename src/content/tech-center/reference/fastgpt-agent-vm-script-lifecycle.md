---
title: FastGPT Agent虚拟机生命周期脚本配置与执行方法
slug: /zh/reference/fastgpt-agent-vm-script-lifecycle
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/agentv2/vm
source_type: 官方文档小节
---

# FastGPT Agent虚拟机生命周期脚本配置与执行方法

## 结论
在FastGPT的Agent配置面板中，可通过「虚拟机配置」模块编写启动脚本。新会话启动或虚拟机重新拉起时，系统会按固定顺序执行自定义脚本与技能初始化脚本，完成应用运行环境的准备。

## 具体怎么做
1.  打开Agent配置面板的「虚拟机配置」模块
2.  在启动脚本(sh)的代码编辑器中编写自定义Shell脚本
3.  当新会话启动或虚拟机重新拉起时，系统自动按顺序执行脚本：
    - 首先在虚拟机工作目录`/workspace`执行应用启动脚本
    - 若Agent关联技能，技能包会先解压至临时目录（如`.tmp-<versionId>-<random>`），完成后通过原子操作替换为正式部署目录，随后在各技能包部署目录执行其自带的`entrypoint.sh`初始化脚本

## 注意事项
1.  应用启动脚本仅在`/workspace`目录执行，用于配置应用所需的运行依赖与环境
2.  技能初始化脚本仅在应用启动脚本执行完毕后运行，且执行目录为对应技能包的部署目录
3.  技能包采用原子部署逻辑，可避免解压失败导致出现损坏的半截目录

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/agentv2/vm)
