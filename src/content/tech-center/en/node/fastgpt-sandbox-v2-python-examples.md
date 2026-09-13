---
title: Run Custom Python Code in FastGPT Sandbox V2
slug: /en/node/fastgpt-sandbox-v2-python-examples
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: Official documentation
---

# Run Custom Python Code in FastGPT Sandbox V2

**Custom Python Code Execution in Sandbox V2**

The FastGPT Sandbox V2 node allows executing custom Python logic within your workflow, with pre-built, reusable code snippets for common data processing tasks. All provided examples follow a standardized structure: a top-level `main` function that accepts input arguments and returns a JSON-serializable dictionary of results. The sandbox environment restricts external dependencies to Python’s standard library, with a dedicated `SystemHelper` utility available for HTTP requests.

**Pre-Built Code Examples**

Five ready-to-use code snippets cover common workflow needs:
1.  **Data Statistics**: Calculates descriptive statistics for a list of numeric values.
2.  **Date Processing**: Parses and manipulates calendar dates in `YYYY-MM-DD` format.
3.  **HTTP Request - API Call**: Makes authenticated GET requests to external APIs.
4.  **JSON Data Processing**: Parses JSON strings and extracts targeted fields.
5.  **Regular Expression Matching**: Extracts valid email addresses from input text.

Each example’s full code is available in collapsible sections below:
<details>
<summary>Data Statistics</summary>
```python
import math

def main(numbers):
    if not numbers:
        return {"error": "no data"}

    mean = sum(numbers) / len(numbers)
    variance = sum((x - mean)**2 for x in numbers) / len(numbers)

    return {
        "mean": mean,
        "max": max(numbers),
        "min": min(numbers),
        "std": math.sqrt(variance)
    }
```
</details>

<details>
<summary>Date Processing</summary>
```python
from datetime import datetime, timedelta

def main(date_str):
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    next_week = dt + timedelta(days=7)

    return {
        "input": date_str,
        "next_week": next_week.strftime("%Y-%m-%d"),
        "weekday": dt.strftime("%A")
    }
```
</details>

<details>
<summary>HTTP Request - API Call</summary>
```python
def main(api_url, api_key):
    res = SystemHelper.httpRequest(
        api_url,
        method="GET",
        headers={"Authorization": f"Bearer {api_key}"},
        timeout=10
    )

    return {
        "status": res["status"],
        "data": res["data"]
    }
```
</details>

<details>
<summary>JSON Data Processing</summary>
```python
import json

def main(json_str):
    data = json.loads(json_str)

    # Extract specific fields
    result = {
        "names": [item["name"] for item in data if "name" in item],
        "count": len(data)
    }

    return result
```
</details>

<details>
<summary>Regular Expression Matching</summary>
```python
import re

def main(text):
    # Extract all email addresses
    emails = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)

    return {
        "emails": emails,
        "count": len(emails)
    }
```
</details>

**Input and Output Specifications**

A standardized parameter table outlines the required inputs and returned outputs for each example:
| Example Name               | Input Parameter(s)     | Error Handling                                                                 | Returned Fields                                                                 |
|----------------------------|------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Data Statistics            | `numbers` (list of numbers) | Returns `{"error": "no data"}` if input list is empty | `mean`, `max`, `min`, `std` |
| Date Processing            | `date_str` (string in `YYYY-MM-DD` format) | Raises `ValueError` for invalid date strings | `input`, `next_week`, `weekday` |
| HTTP Request - API Call    | `api_url`, `api_key`   | Relies on sandbox `SystemHelper` for request errors | `status`, `data` |
| JSON Data Processing       | `json_str` (valid JSON string) | Raises `json.JSONDecodeError` for invalid input | `names` (list of extracted "name" fields), `count` (total items in input) |
| Regular Expression Matching | `text` (string) | None | `emails` (list of matched emails), `count` (number of matches) |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
