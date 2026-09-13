---
title: 修复FastGPT对接自定义MCP服务的配置与安全问题
slug: /zh/troubleshoot/fastgpt-custom-mcp-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4975
source_type: GitHub issue
---

# 修复FastGPT对接自定义MCP服务的配置与安全问题

## 现象
使用FastGPT对接自定义MCP服务时，自定义MCP服务在测试环境可正常读取知识库数据，但对接FastGPT后无法正常完成知识库数据读取或服务调用失败。

## 可能原因
1. 项目配置文件包含真实敏感凭据且未被版本控制系统忽略；
2. 打包配置与实际代码目录结构不匹配，导致服务构建失败；
3. 仓库内存在编码损坏的中文文件名，影响服务加载；
4. 项目未添加开源许可文件，存在合规风险。

## 排查步骤
1. 查看项目根目录下的配置文件，确认是否存在未隐藏的真实API_TOKEN、内网地址等敏感信息；
2. 核对pyproject.toml文件中的packages配置项，与实际代码所在目录结构进行比对；
3. 检查仓库内所有文件名，确认是否存在乱码或编码损坏的情况；
4. 确认项目根目录是否存在符合规范的开源许可文件。

## 解决与验证
1. 删除已提交的.env配置文件，更新.gitignore文件以忽略.env、.idea/等敏感或临时文件，将config.env.example文件中的真实值替换为占位符；
2. 修正pyproject.toml中的packages配置，使其匹配src/目录下的实际代码结构；
3. 修复编码损坏的中文文件名，确保所有文件名可正常识别；
4. 添加符合规范的开源许可文件；
5. 完成上述配置修复后，重新构建并部署自定义MCP服务，在FastGPT中测试服务调用与知识库数据读取功能，验证服务是否正常运行。

> 来源: [FastGPT GitHub issue #4975](https://github.com/labring/FastGPT/issues/4975)
