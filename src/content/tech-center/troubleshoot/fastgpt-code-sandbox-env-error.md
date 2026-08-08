---
title: 解决FastGPT私有部署中code-sandbox启动失败的配置问题
slug: /zh/troubleshoot/fastgpt-code-sandbox-env-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6621
source_type: GitHub issue
---

# 解决FastGPT私有部署中code-sandbox启动失败的配置问题

## 现象
私有部署FastGPT 4.14.9.3版本时，code-sandbox无法正常启动。控制台输出的启动日志包含如下错误提示：首先显示dotenv@17.3.1的环境变量注入提示，随后明确抛出无效环境变量错误：
```
[dotenv@17.3.1] injecting env (0) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }

❌ Invalid environment variables:
{
  _errors: [],
  LOG_ENABLE_CONSOLE: {
    _errors: [ "Invalid input: expected boolean, received string" ],
  },
  LOG_ENABLE_OTEL: {
    _errors: [ "Invalid input: expected boolean, received string" ],
  }
}
```
即两个配置项均提示预期布尔类型值，但实际接收到了字符串类型的输入。

## 可能原因
该报错的直接原因是.env配置文件中的`LOG_ENABLE_CONSOLE`和`LOG_ENABLE_OTEL`两个环境变量的取值类型不符合要求。这两个变量需要配置为布尔类型（`true`或`false`），但实际部署时被错误设置为了字符串类型（例如添加了引号包裹的"true"/"false"，或其他非布尔格式的文本内容），导致dotenv校验失败，进而导致code-sandbox启动失败。

## 排查步骤
1.  进入FastGPT私有部署的项目目录，找到项目根目录下的`.env`配置文件。
2.  在配置文件中搜索`LOG_ENABLE_CONSOLE`和`LOG_ENABLE_OTEL`两个配置项，查看其当前的取值格式。
3.  确认当前取值是否被引号包裹，或是否为非布尔类型的文本内容。
4.  可临时将这两个配置项注释或删除，尝试启动code-sandbox，验证是否为该配置项导致的启动失败。

## 解决与验证
### 解决方法
将`LOG_ENABLE_CONSOLE`和`LOG_ENABLE_OTEL`的配置值修改为标准布尔类型，即直接填写`true`或`false`，不要添加任何引号（避免被解析为字符串）。例如正确的配置写法应为：
```ini
LOG_ENABLE_CONSOLE=true
LOG_ENABLE_OTEL=false
```
若需要自定义.env文件的加载路径，可按照报错提示的方式指定路径，格式为`{ path: '/custom/path/.env' }`，需确保路径配置的格式正确。
### 验证步骤
1.  保存修改后的`.env`配置文件。
2.  重新启动code-sandbox服务。
3.  查看启动日志，确认不再出现`Invalid environment variables`相关的报错，服务正常启动即可。

> 来源：https://github.com/labring/FastGPT/issues/6621
