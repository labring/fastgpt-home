---
title: 解决iOS端FastGPT流式API接口调用失败问题
slug: /zh/troubleshoot/fastgpt-ios-stream-api-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/880
source_type: GitHub issue
---

# 解决iOS端FastGPT流式API接口调用失败问题

## 现象
iOS端无法正确调用FastGPT API接口，Postman可正常访问该接口。当请求参数stream设为true时，请求失败；当stream设为false时，可正常获取响应结果。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 验证非流式请求可用性：将请求体中的stream参数设为false，发起API请求，确认是否能正常获取响应结果。
2. 核对请求配置参数：检查请求头中的Authorization、Content-Type是否正确，请求体包含chatId、messages、variables等必填字段，参数格式符合JSON规范。
3. 检查iOS端请求逻辑：确认网络请求的超时时间、缓存策略等配置合理，排查是否存在流式响应处理逻辑缺失。

## 解决与验证
可参考以下Objective-C代码实现流式API请求：
```objc
#import <Foundation/Foundation.h>
dispatch_semaphore_t sema = dispatch_semaphore_create(0);
NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://wecom-ai-test.integrity.com.cn:5002/api/v1/chat/completions"]
cachePolicy:NSURLRequestUseProtocolCachePolicy
timeoutInterval:10.0];
NSDictionary *headers = @{
@"Authorization": @"Bearer fastgpt-xx",
@"Content-Type": @"application/json"
};
[request setAllHTTPHeaderFields:headers];
NSData *postData = [[NSData alloc] initWithData:[@"{

    \"chatId\": \"abcd\",

    \"stream\": true,

    \"detail\": false,

    \"variables\": {

        \"uid\": \"asdfadsfasfd2323\",

        \"name\": \"张三\"

    },

    \"messages\": [

        {

            \"content\": \"你是什么大模型\",

            \"role\": \"user\"

        }

    ]

}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];
[request setHTTPMethod:@"POST"];
NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
if (error) {
NSLog(@"%@", error);
dispatch_semaphore_signal(sema);
} else {
NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
NSError *parseError = nil;
NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
NSLog(@"%@",responseDictionary);
dispatch_semaphore_signal(sema);
}
}];
[dataTask resume];
dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
```
将代码中的API地址、Authorization令牌、chatId、variables及messages内容替换为实际业务配置后，发起请求即可验证流式调用是否正常。

> 来源: [FastGPT GitHub issue #880](https://github.com/labring/FastGPT/issues/880)
