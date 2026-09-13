---
title: FastGPT数据库存储适配MySQL相关问题排查与解决
slug: /zh/troubleshoot/fastgpt-mysql-adaptation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5154
source_type: GitHub issue
---

# FastGPT数据库存储适配MySQL相关问题排查与解决

## 现象
用户尝试探索使用mysql2或sequelize等Node.js MySQL客户端库实现FastGPT的数据存储，希望为FastGPT增加MySQL作为可选存储方案，过程中遇到适配相关阻碍，无法直接完成存储类型的切换。

## 可能原因
当前FastGPT默认使用MongoDB作为数据库，MongoDB为非关系型数据库，与MySQL区别较大。直接切换存储类型需重构所有有关数据库的代码，整体适配工作量较高，需投入较多成本，无法通过简单的配置调整完成。

## 排查步骤
1. 确认当前FastGPT的数据库存储依赖及现有代码逻辑
2. 评估切换至MySQL所需的代码修改范围与整体工作量
3. 调研适配MySQL的可用工具或库，确认是否存在最小成本的适配方案

## 解决与验证
可使用Prisma库实现最小代价的存储适配。若选择该方案，需按实际环境完成对应配置以实现存储逻辑的衔接。若仅评估切换可行性，需先明确重构数据库相关代码的整体成本，再判断是否符合项目需求。

> 来源: [FastGPT GitHub issue #5154](https://github.com/labring/FastGPT/issues/5154)
