---
title: Mongoose驱动MongoDB查询误返回全量数据的解决方法
slug: /zh/troubleshoot/fastgpt-mongodb-wrong-query-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3744
source_type: GitHub issue
---

# Mongoose驱动MongoDB查询误返回全量数据的解决方法

## 现象
执行MongoDB相关查询与删除操作时，若使用未在Schema中声明的字段作为条件，均会触发异常行为。例如调用`MongoApp.find({aaa: {$eq: 'bbb'}})`时，无论aaa字段是否存在、值是否匹配，均返回集合内全量数据。调用`MongoApp.deleteMany({namee: {$eq: 'bbb'}})`时，也会删除集合内全部数据。

## 可能原因
Mongoose在处理数据库操作时，会自动过滤未在Schema中声明的字段。当查询条件仅包含未声明的字段时，过滤后的查询条件为空，最终执行的查询为全量匹配，从而返回或修改集合内所有数据。

## 排查步骤
1. 检查当前操作使用的所有字段是否已在对应集合的Schema中完成声明。
2. 分别使用已声明字段和未声明字段执行相同类型的查询，对比返回结果差异。
3. 执行写操作测试，使用未声明字段调用删除类接口，确认是否会影响全量数据。
4. 对比find查询与aggregate查询的行为，确认两者的表现是否存在差异。

## 解决与验证
1. 确保所有数据库查询、删除等操作使用的字段均已在Schema中声明，避免使用未定义的字段。
2. 可通过添加中间件对所有查询条件进行校验，过滤未声明的无效字段，避免空查询条件触发全量操作。
3. 验证方法：使用已声明的合法字段执行查询，确认仅返回匹配条件的数据；使用未声明字段执行相同查询，确认不再返回全量集合数据。aggregate查询不存在该问题，可根据场景选择使用。

> 来源: [FastGPT GitHub issue #3744](https://github.com/labring/FastGPT/issues/3744)
