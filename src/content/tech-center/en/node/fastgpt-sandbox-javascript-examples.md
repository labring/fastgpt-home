---
title: Execute JavaScript in FastGPT Sandbox Nodes
slug: /en/node/fastgpt-sandbox-javascript-examples
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: Official documentation
---

# Execute JavaScript in FastGPT Sandbox Nodes

The FastGPT Sandbox v2 node enables executing custom JavaScript code directly within FastGPT workflow automations, supporting tailored data manipulation, time-based calculations, external API calls, and cryptographic operations. All examples below are validated for use with the Sandbox v2 node.

### Standard JavaScript Usage Examples
Four core production use cases are available as pre-tested code snippets:

#### Data Format Conversion
This snippet converts a comma-separated input string to a cleaned array of non-empty trimmed values, returning both the processed array and its element count:
```js
// Convert comma-separated string to array
function main({input}){
    const items = input.split(',').map(s => s.trim()).filter(Boolean)
    return { items, count: items.length }
}
```

#### Date Calculation
Uses the dayjs library to generate current date-related values, including today’s date, the date one week from today, and a Unix timestamp:
```js
const dayjs = require('dayjs')

function main(){
    const now = dayjs()
    return {
        today: now.format('YYYY-MM-DD'),
        nextWeek: now.add(7, 'day').format('YYYY-MM-DD'),
        timestamp: now.valueOf()
    }
}
```

#### HTTP Request - Get Weather
Makes a GET request to a weather API using the built-in SystemHelper.httpRequest utility, accepting a city name as input and returning temperature and weather condition data:
```js
async function main({city}){
    const res = await SystemHelper.httpRequest(
        `https://api.example.com/weather?city=${city}`,
        { method: 'GET', timeout: 10 }
    )

    return {
        temperature: res.data.temp,
        weather: res.data.condition
    }
}
```

#### Data Encryption
Uses the crypto-js library to encrypt plaintext with a specified secret key, returning the encrypted string output:
```js
const CryptoJS = require('crypto-js')

function main({text, key}){
    const encrypted = CryptoJS.AES.encrypt(text, key).toString()
    return { encrypted }
}
```

### Built-in Helper Reference
The Sandbox v2 environment provides a built-in HTTP request helper for external API calls. The `SystemHelper.httpRequest` function accepts two required parameters, with configurable options:

| Parameter | Type | Required | Details |
|-----------|------|----------|---------|
| Target URL | string | Yes | Full API endpoint URL, including query parameters as needed |
| Configuration Options | object | Yes | Request settings object |
| options.method | string | No | HTTP request method, example uses GET |
| options.timeout | number | No | Request timeout duration in seconds, example uses 10 |

All custom JavaScript functions must export a `main` function, which receives an input object containing upstream workflow variables as shown in the examples above.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
