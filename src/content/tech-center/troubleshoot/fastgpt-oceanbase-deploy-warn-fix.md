---
title: 解决FastGPT部署OceanBase时的系统参数警告与obshell启动失败问题
slug: /zh/troubleshoot/fastgpt-oceanbase-deploy-warn-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4685
source_type: GitHub issue
---

# 解决FastGPT部署OceanBase时的系统参数警告与obshell启动失败问题

## 现象
运行docker logs ob后，输出以下部署流程与警告：
```
find obd deploy information, skip configuring...
start ob cluster ...
Get local repositories ok
Load cluster param plugin ok
Cluster status check ok
[WARN] OBD-1011: (127.0.0.1) The recommended value of fs.aio-max-nr is 1048576 (Current value: 65536)
[WARN] OBD-1007: (127.0.0.1) The recommended number of stack size is unlimited (Current value: 8192)
[WARN] OBD-1017: (127.0.0.1) The value of the "vm.max_map_count" must be within [327600, 1310720] (Current value: 65530, Recommended value: 655360)
[WARN] OBD-1017: (127.0.0.1) The value of the "fs.file-max" must be greater than 6573688 (Current value: 3225830, Recommended value: 6573688)
cluster scenario: htap
Start observer ok
observer program health check ok
Connect to observer ok
obshell start ok
obshell program health check x
[WARN] OBD-2012: Failed to start 127.0.0.1 obshell
See https://www.oceanbase.com/product/ob-deployer/error-codes .
Trace ID: 19b249b4-2380-11f0-973a-0242ac170002
If you want to view detailed obd logs, please run: obd display-trace 19b249b4-2380-11f0-973a-0242ac170002
boot success!
```
## 可能原因
当前部署环境的系统内核参数与栈大小配置未达到OceanBase部署的要求，触发性能相关警告，同时导致obshell启动失败。
## 排查步骤
1.  查看当前系统参数，确认各警告对应的配置值：
    - 查看fs.aio-max-nr：`sysctl fs.aio-max-nr`
    - 查看栈大小：`ulimit -s`
    - 查看vm.max_map_count：`sysctl vm.max_map_count`
    - 查看fs.file-max：`sysctl fs.file-max`
2.  执行`obd display-trace 19b249b4-2380-11f0-973a-0242ac170002`查看obshell启动失败的详细日志，确认异常诱因。
3.  对比警告提示的推荐值，确认当前参数与要求的差距。
## 解决与验证
### 参数修改（需root权限）
1.  修改fs.aio-max-nr：临时修改运行`sysctl -w fs.aio-max-nr=1048576`，永久修改需在`/etc/sysctl.conf`添加`fs.aio-max-nr = 1048576`，执行`sysctl -p`生效。
2.  修改栈大小：在`/etc/security/limits.conf`中添加`* soft stack unlimited`和`* hard stack unlimited`，重新登录终端或重启服务生效；临时修改可运行`ulimit -s unlimited`。
3.  修改vm.max_map_count：临时修改运行`sysctl -w vm.max_map_count=655360`，永久修改在`/etc/sysctl.conf`添加`vm.max_map_count = 655360`，执行`sysctl -p`生效。
4.  修改fs.file-max：临时修改运行`sysctl -w fs.file-max=6573688`，永久修改在`/etc/sysctl.conf`添加`fs.file-max = 6573688`，执行`sysctl -p`生效。
### 验证
1.  重新启动OceanBase集群，运行`docker restart ob`。
2.  再次运行`docker logs ob`，确认所有性能警告消失，obshell启动失败警告不再出现。
3.  执行`obd display-trace 19b249b4-2380-11f0-973a-0242ac170002`，确认无启动异常日志。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4685)
