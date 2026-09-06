---
title: 解决FastGPT中PG数据库向量删除后索引异常导致查询耗时问题
slug: /zh/troubleshoot/fastgpt-pg-vector-index-rebuild
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4908
source_type: GitHub issue
---

# 解决FastGPT中PG数据库向量删除后索引异常导致查询耗时问题

## 现象
向量存储量级超百万时，删除向量后索引无法自动重建，引发数据库查询耗时增加。

## 可能原因
PG数据库默认的自动真空（autovacuum）策略较为保守，无法及时回收删除向量产生的死元组，导致索引未能自动重建。

## 排查步骤
1.  确认存储向量的PG数据库表为modeldata
2.  执行查询语句查看当前表的自动真空配置参数：
    ```sql
    SELECT relname, reloptions FROM pg_class WHERE relname = 'modeldata';
    ```
3.  若需查看真空任务执行进度，执行以下命令：
    ```sql
    SELECT * FROM pg_stat_progress_vacuum WHERE datname = current_database();
    ```

## 解决与验证
1.  执行以下命令调整表的自动真空策略，优化死元组回收效率：
    ```sql
    ALTER TABLE modeldata SET (
      autovacuum_vacuum_scale_factor = 0.01,
      autovacuum_analyze_scale_factor = 0.02,
      autovacuum_vacuum_threshold = 1000,
      autovacuum_analyze_threshold = 1000,
      autovacuum_vacuum_cost_delay = 10,
      autovacuum_vacuum_cost_limit = 2000
    );
    ```
2.  再次执行排查步骤中的查询语句，确认配置参数已生效。
3.  执行锁表式的磁盘空间释放与索引重建命令：
    ```sql
    VACUUM ANALYZE modeldata;
    ```
4.  执行进度查看命令，确认真空任务执行完成。
5.  验证查询耗时恢复正常，死元组占比降低。

> 来源: [FastGPT GitHub issue #4908](https://github.com/labring/FastGPT/issues/4908)
