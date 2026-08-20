---
title: FastGPT v4.15.0私有部署中SQL Server工具依赖缺失的排错
slug: /zh/troubleshoot/fastgpt-sqlserver-missing-dependency
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7228
source_type: GitHub issue
---

# FastGPT v4.15.0私有部署中SQL Server工具依赖缺失的排错

## 现象
在FastGPT v4.15.0私有部署环境中，使用fastgpt-plugin v1.0.0的内置Microsoft SQL Server系统工具执行SQL查询时失败，报错信息为：`Cannot find package 'mssql' imported from <plugin-runtime-dir>/plugin/dbops/0.0.1/<redacted>/index.js`。

## 可能原因
Microsoft SQL Server系统工具运行时需要导入`mssql`包，但fastgpt-plugin:v1.0.0容器内的插件运行目录下未预装该依赖，导致执行时无法找到对应包。

## 排查步骤
1. 确认当前FastGPT版本为v4.15.0，fastgpt-plugin版本为v1.0.0，且使用Docker/docker-compose私有部署方式。
2. 查看工具执行日志，确认报错信息包含`Cannot find package 'mssql'`。
3. 进入fastgpt-plugin容器的插件运行目录，检查是否存在`node_modules/mssql`目录，确认该依赖未安装。
4. 可通过Node.js的createRequire方法验证依赖是否可被正常解析，参考issue中的验证命令。

## 解决与验证
### 临时解决方法
在插件运行目录手动安装mssql包，命令为：
```bash
npm install --prefix "$PLUGIN_DIR" mssql
```
其中`$PLUGIN_DIR`需替换为实际的插件运行目录，格式为`<plugin-runtime-dir>/plugin/dbops/0.0.1/<redacted>`。

### 验证步骤
1. 执行上述安装命令完成依赖安装。
2. 运行验证命令：
```bash
PLUGIN_INDEX="$PLUGIN_DIR/index.js" node -e "
const { createRequire } = require('module');
const r = createRequire(process.env.PLUGIN_INDEX);
console.log(r.resolve('mssql'));
"
```
3. 若输出类似`<plugin-runtime-dir>/plugin/dbops/0.0.1/<redacted>/node_modules/mssql/index.js`的结果，说明依赖安装成功。
4. 重新执行Microsoft SQL Server系统工具的SQL查询，确认报错消失，工具可正常执行。

> 来源：[FastGPT GitHub Issue #7228](https://github.com/labring/FastGPT/issues/7228)
