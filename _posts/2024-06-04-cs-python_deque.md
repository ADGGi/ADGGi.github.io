---
layout: post
title: "[Python]Deque"
date: 2024-06-04 20:00:00 +0900
categories: [CS, Python]
tags: [CS, Python]
author: "ADG"
---

# deque란 ?

`deque`는 Python의 내장 모듈인 `collections`에서 제공하는 자료구조입니다.
`deque`는 double-ended queue (양방향 큐)의 줄임말로, 양쪽 끝에서 데이터를 효율적으로 추가하거나 제거할 수 있는 큐입니다.

## 특징

- **양방향 큐**: `deque`는 큐(queue)처럼 사용할 수 있으며, 양쪽 끝에서 데이터를 효율적으로 삽입하고 삭제할 수 있습니다.  
- **O(1) 시간 복잡도**: `deque`는 `append()`, `appendleft()`, `pop()`, `popleft()` 등의 연산을 O(1)의 시간 복잡도로 처리할 수 있습니다. 이는 일반적인 리스트에서 `pop(0)`과 같은 연산이 O(N)인 것과 비교되는 장점입니다.  
- **순차적 자료 구조**: `deque`는 순차적으로 데이터를 처리하는 구조로, 주로 FIFO(First In First Out) 방식의 큐나 LIFO(Last In First Out) 방식의 스택을 구현할 때 유용합니다.  

## `deque` 객체 생성

```python
from collections import deque

## 기본적인 deque 생성
d = deque([1, 2, 3, 4, 5])
print(d) # deque([1, 2, 3, 4, 5])
type(d) # <class 'collections.deque>' 

## append(x) : 오른쪽 끝에 x를 추가합니다.
d.append(6)
print(d) # deque([1, 2, 3, 4, 5, 6])

## appendleft(x) : 왼쪽 끝에 x를 추가합니다.
d.appendleft(0)
print(d) # deque([0, 1, 2, 3, 4, 5, 6])

## pop() : deque의 오른쪽 끝 원소를 제거하고 반환합니다.
last_item = d.pop()
print(last_item) # 6
print(d) # deque([0, 1, 2, 3, 4, 5])

## popleft() : deque의 왼쪽 끝에서 원소를 제거하고 반환합니다.
first_item = d.popleft()
print(first_item) # 0
print(d) # deque([1, 2, 3, 4, 5])
```

## 시간복잡도

1. `append(x)` - 오른쪽 끝에 요소 추가  
설명: deque의 오른쪽 끝에 항목 x를 추가합니다. 
시간 복잡도: `O(1)`  
deque는 양방향 큐이기 때문에, 오른쪽 끝에 항목을 추가하는 것은 상수 시간 내에 처리할 수 있습니다.  

2. `appendleft(x)` - 왼쪽 끝에 요소 추가  
설명: deque의 왼쪽 끝에 항목 x를 추가합니다.  
시간 복잡도: `O(1)`  
왼쪽 끝에 항목을 추가하는 것도 deque에서 효율적으로 처리할 수 있습니다. O(1) 시간 내에 추가됩니다.  

3. `pop()` - 오른쪽 끝에서 요소 제거  
설명: deque의 오른쪽 끝에서 항목을 제거하고 반환합니다.  
시간 복잡도: `O(1)`  
deque의 오른쪽 끝에서 항목을 제거하는 연산은 상수 시간 내에 가능합니다.  

4. `popleft()` - 왼쪽 끝에서 요소 제거  
설명: deque의 왼쪽 끝에서 항목을 제거하고 반환합니다.  
시간 복잡도: `O(1)`  
왼쪽 끝에서 항목을 제거하는 것도 deque에서 효율적으로 처리할 수 있습니다. `O(1)` 시간 내에 제거됩니다.  

5. `extend(iterable)` - 오른쪽 끝에 여러 요소 추가  
설명: iterable의 모든 항목을 deque의 오른쪽 끝에 추가합니다.  
시간 복잡도: `O(k)`, 여기서 k는 iterable의 길이입니다.  
여러 항목을 한 번에 추가하는 경우, 각 항목을 하나씩 추가하는 것과 같은 효율성을 가집니다. 이는 추가할 항목 수에 비례하는 시간이 걸립니다.  

6. `extendleft(iterable)` - 왼쪽 끝에 여러 요소 추가  
설명: iterable의 모든 항목을 deque의 왼쪽 끝에 추가합니다.  
시간 복잡도: `O(k)`, 여기서 k는 iterable의 길이입니다.  
extendleft()는 왼쪽 끝에 여러 항목을 추가하는 연산으로, iterable의 길이에 비례하는 시간이 소요됩니다. 내부적으로는 항목을 역순으로 추가하므로 `O(k)` 시간 복잡도를 가집니다.  

7. `rotate(n)` - 모든 요소를 n만큼 회전  
설명: deque의 항목들을 n만큼 회전시킵니다. 양의 값일 경우 오른쪽으로 회전하고, 음의 값일 경우 왼쪽으로 회전합니다.  
시간 복잡도: `O(k)`, 여기서 k는 deque의 길이입니다.  
이 연산은 deque의 모든 항목을 한 번에 옮기는 작업이므로 O(k) 시간 복잡도를 가집니다.  

8. `remove(value)` - 첫 번째로 등장하는 value를 제거  
설명: deque에서 값이 value인 첫 번째 항목을 제거합니다.  
시간 복잡도: `O(n)`, 여기서 n은 deque의 길이입니다.  
deque는 양방향 큐이지만, 특정 항목을 찾을 때는 선형 탐색이 필요합니다. 따라서 최악의 경우에는 모든 항목을 확인해야 하므로 `O(n)` 시간이 걸립니다.  

9. `count(value)` - 값이 value인 항목의 개수 세기  
설명: deque에서 값이 value인 항목의 개수를 셉니다.  
시간 복잡도: `O(n)`, 여기서 n은 deque의 길이입니다.  
이 연산도 remove()와 마찬가지로 선형 탐색을 통해 값을 찾기 때문에 O(n) 시간이 걸립니다.  

10. `clear()` - 모든 항목 제거  
설명: deque의 모든 항목을 제거합니다.  
시간 복잡도: `O(n)`, 여기서 n은 deque의 길이입니다.  
clear()는 내부적으로 deque의 모든 항목을 하나씩 제거하는 방식으로 동작하므로 O(n) 시간이 걸립니다.  

---
참고 : [Python 공식문서](https://docs.python.org/ko/3.13/library/collections.html#collections.deque)