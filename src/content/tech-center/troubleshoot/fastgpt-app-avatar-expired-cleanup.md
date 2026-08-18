---
title: 解决FastGPT应用头像上传后被清理且无法修改的问题
slug: /zh/troubleshoot/fastgpt-app-avatar-expired-cleanup
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6513
source_type: GitHub issue
---

# 解决FastGPT应用头像上传后被清理且无法修改的问题

## 现象
在FastGPT私有部署版本4.14.7.2中，用户上传应用头像后，头像图片存在过期时间，可在MongoDB的`s3_ttls`集合中查看相关过期记录。经过一段时间后，上传的头像会被自动删除，且删除后无法再次修改应用头像，上传时可能出现类似`Failed to upload "xxx.png"`的报错信息。

## 可能原因
该问题源于系统内置的定时文件清理任务，该任务会根据`s3_ttls`集合中的配置，自动清理过期的头像文件。当头像文件被清理后，应用无法再获取到原头像的有效资源，且再次上传时可能因关联的缓存或记录未正确更新，导致无法完成头像修改。

## 排查步骤
1. 登录FastGPT关联的MongoDB数据库，查看`s3_ttls`集合，确认当前应用头像对应的记录是否存在，以及其过期时间是否早于当前系统时间。
2. 检查FastGPT的定时任务配置，确认文件清理任务的触发逻辑与过期阈值（需按实际环境确认）。
3. 登录FastGPT后台，查看应用上传相关的日志，确认是否存在`Failed to upload`类的报错信息。
4. 尝试重新上传新的头像文件，观察是否能正常保存，且未被立即标记为过期。

## 解决与验证
### 解决方法
若需保留应用头像长期有效，可在MongoDB的`s3_ttls`集合中修改对应头像记录的过期时间，或调整全局的文件过期配置（需按实际环境确认）。若头像已被自动删除，需先清理数据库中关联的过期记录，再重新上传新的头像文件。
### 验证步骤
重新上传头像后，等待预设的时间周期，确认头像未被自动清理，且可正常再次修改应用头像，无`Failed to upload`类报错出现。

> 来源：[FastGPT GitHub Issue #6513](https://github.com/labring/FastGPT/issues/6513)
