---
title: FastGPT虚拟机生命周期状态去重机制说明
slug: /zh/reference/fastgpt-vm-state-deduplication
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/agentv2/vm
source_type: 官方文档小节
---

# FastGPT虚拟机生命周期状态去重机制说明

## 结论
FastGPT通过状态去重机制避免虚拟机热启动时重复执行脚本，减少等待延迟。该机制通过脚本哈希或技能版本ID判断是否需要重新执行脚本。

## 具体怎么做
1. 系统在虚拟机内部维护状态文件`~/.fastgpt/agent-skill-entrypoints/state.json`。
2. 针对手动编写的应用启动脚本：系统计算其文本的SHA-256哈希值，与state.json中已记录的已执行哈希对比。若脚本未修改，后续交互将自动跳过执行；修改脚本或点击“重开对话”时，脚本将重新执行。
3. 针对关联技能的入口脚本：基于绑定的技能版本ID进行比对去重，仅在沙箱首次冷启动时执行一次。

## 注意事项
去重状态随虚拟机实例的生命周期管理。当虚拟机重建（点击“重开对话”或闲置被系统回收）时，会分配全新的运行环境，所有脚本将在首次冷启动时重新执行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/agentv2/vm)
