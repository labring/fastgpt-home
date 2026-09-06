---
title: FastGPT二级路由配置时知识库图片展示异常的排错指南
slug: /zh/troubleshoot/fastgpt-subroute-image-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5574
source_type: GitHub issue
---

# FastGPT二级路由配置时知识库图片展示异常的排错指南

## 现象
配置二级路由（即设置环境变量`NEXT_PUBLIC_BASE_URL`为非空值，如`/test`）的私有部署版本V4.12.0中，上传含图片的Word文档至知识库后，在应用对话界面检索知识库内容时，图片无法正常展示。经观察，图片地址拼接存在异常，无法生成正确的完整访问路径。

## 可能原因
该问题源于`packages/service/common/file/image/utils.ts`文件中的`addEndpointToImageUrl`方法，在拼接图片完整访问路径时，未考虑二级路由前缀`NEXT_PUBLIC_BASE_URL`，导致生成的图片链接缺少二级路由部分，无法正确指向图片资源。

## 排查步骤
1.  确认当前部署已配置二级路由，即存在环境变量`NEXT_PUBLIC_BASE_URL`且值不为空。
2.  上传含图片的文档至知识库，记录导入后图片的原始相对路径格式。
3.  打开前端对话界面，查看无法展示的图片的实际加载地址，对比预期的`FE_DOMAIN + NEXT_PUBLIC_BASE_URL + 图片相对路径`格式是否存在缺失。
4.  定位到`packages/service/common/file/image/utils.ts`文件，检查`addEndpointToImageUrl`方法的图片匹配与拼接逻辑。

## 解决与验证
### 修复代码
修改`addEndpointToImageUrl`方法，整合二级路由前缀到图片路径匹配与拼接逻辑中，修复后的代码如下：
```typescript
// 对文本中的图片路径修改为完整的访问路径
export const addEndpointToImageUrl = (text: string) => {
  const baseURL = process.env.FE_DOMAIN;
  const subRoute = process.env.NEXT_PUBLIC_BASE_URL || '';
  if (!baseURL) return text;
  const regex = new RegExp(
    `(?<!https?:\\/\\/[^\s]*)(?:${subRoute}\\/api\\/system\\/img\\/[^\s.]*\.[^\s]*)`,
    'g'
  );
  // 匹配 ${subRoute}/api/system/img/xxx.xx 的图片链接，并追加 baseURL
  return text.replace(regex, (match) => {
    return `${baseURL}${match}`;
  });
};
```
### 验证步骤
1.  替换对应文件的代码后，重新编译并部署服务。
2.  重新上传含图片的文档至知识库，配置对应应用并发起检索。
3.  确认对话界面中的图片可以正常加载，检查图片链接是否正确拼接了`FE_DOMAIN`与二级路由前缀。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5574)
