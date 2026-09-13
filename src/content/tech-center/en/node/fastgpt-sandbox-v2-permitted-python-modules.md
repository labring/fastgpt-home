---
title: List of Permitted Python Modules for FastGPT Sandbox V2
slug: /en/node/fastgpt-sandbox-v2-permitted-python-modules
page_type: Workflow nodes
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2
source_type: Official documentation
---

# List of Permitted Python Modules for FastGPT Sandbox V2

## Overview of FastGPT Sandbox V2 Python Restrictions
FastGPT Sandbox V2 enforces a secure Python execution environment by restricting all imported code to a pre-approved whitelist of modules. This mitigation prevents unauthorized system calls, network communications, and direct file system modifications within the workflow node. Only the modules listed below may be imported and used in sandbox code.

## Complete Whitelisted Python Modules
All permitted modules are grouped by functional category below:

### Math and Numerical Computing
| Module | Description |
|--------|-------------|
| `math` | Mathematical functions |
| `cmath` | Complex number math |
| `decimal` | Decimal floating-point arithmetic |
| `fractions` | Fraction arithmetic |
| `random` | Random number generation |
| `statistics` | Statistical functions |

### Data Structures and Algorithms
| Module | Description |
|--------|-------------|
| `collections` | Container data types |
| `array` | Arrays |
| `heapq` | Heap queue |
| `bisect` | Array bisection |
| `queue` | Queues |
| `copy` | Shallow and deep copy |

### Functional Programming
| Module | Description |
|--------|-------------|
| `itertools` | Iterator tools |
| `functools` | Higher-order functions |
| `operator` | Standard operators |

### String and Text Processing
| Module | Description |
|--------|-------------|
| `string` | String constants |
| `re` | Regular expressions |
| `difflib` | Diff calculation |
| `textwrap` | Text wrapping |
| `unicodedata` | Unicode database |
| `codecs` | Codec registry |

### Date and Time
| Module | Description |
|--------|-------------|
| `datetime` | Date and time |
| `time` | Time access |
| `calendar` | Calendar |

### Data Serialization
| Module | Description |
|--------|-------------|
| `json` | JSON encoding/decoding |
| `csv` | CSV file handling |
| `base64` | Base64 encoding/decoding |
| `binascii` | Binary-to-ASCII conversion |
| `struct` | Byte string parsing |

### Encryption and Hashing
| Module | Description |
|--------|-------------|
| `hashlib` | Hash algorithms |
| `hmac` | HMAC message authentication |
| `secrets` | Secure random numbers |
| `uuid` | UUID generation |

### Types and Abstractions
| Module | Description |
|--------|-------------|
| `typing` | Type hints |
| `abc` | Abstract base classes |
| `enum` | Enumeration types |
| `dataclasses` | Data classes |
| `contextlib` | Context managers |

### Other Utilities
| Module | Description |
|--------|-------------|
| `pprint` | Pretty printing |
| `weakref` | Weak references |

### Third-Party Libraries
| Module | Description |
|--------|-------------|
| `numpy` | Numerical computing |
| `pandas` | Data analysis |
| `matplotlib` | Data visualization |

## Prohibited Python Modules
The sandbox blocks all modules not included in the whitelist. Explicitly prohibited modules include `os`, `sys`, `subprocess`, `socket`, `urllib`, `http`, and `requests`. Additionally, any module that enables system calls, network access, or direct file system operations is restricted from execution.

## Step-by-Step Valid Usage
1. Add a Sandbox V2 node to your FastGPT workflow.
2. In the integrated code editor, import only whitelisted modules. For example, to compute a weighted average using statistics and math:
```python
import math
import statistics

values = [10, 20, 30]
weights = [1, 2, 3]
weighted_mean = statistics.mean(v * w for v, w in zip(values, weights))
print(f\"Weighted mean: {weighted_mean:.2f}\")
```
3. Execute the node. The sandbox will run the code successfully, as all imported modules are permitted.
4. Attempting to import a prohibited module such as `os` will result in a security-restricted import failure.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/sandbox-v2)

## Applicability and version scope

Use this page for the documented Workflow nodes scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
