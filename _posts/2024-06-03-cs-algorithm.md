---
layout: post
title: "[CS정리]알고리즘"
date: 2024-06-03 20:00:00 +0900
categories: [CS, basic]
tags: [CS, algorithm]
author: "ADG"
---

# 알고리즘 (Algorithms)

알고리즘은 문제를 해결하는 일련의 절차나 방법입니다.  
알고리즘을 효율적으로 구현하고 최적화하는 것이 매우 중요합니다.  
알고리즘을 이해하는 데 있어 중요한 점은 각 알고리즘의 **시간 복잡도**와 **공간 복잡도**를 고려하는 것입니다.

> **1. 시간복잡도(Time Complexity)**  
> 시간 복잡도는 알고리즘이 주어진 입력을 처리하는 데 걸리는 시간을 나타냅니다.  
> 이는 입력 크기(n)에 대한 알고리즘의 실행 시간의 증가 패턴을 나타내며, 일반적으로 빅오 표기법(O-notation)을 사용해 표현합니다.  
> 시간 복잡도는 **입력 크기(n)**가 커질 때 알고리즘이 얼마나 더 많은 시간이 필요한지 설명합니다.  
> 빅오 표기법을 사용하여 시간 복잡도를 표현합니다.  
> 예를 들어, `O(n)`, `O(log n)`, `O(n^2)` 등입니다.
> 
> >**1-1. O(1) (상수시간)**  
> >알고리즘이 입력 크기와 관계없이 일정한 시간에 작업을 완료하는 경우입니다. 예를들어, 리스트의 첫번째 요소를 접근하는 시간복잡도는 `O(1)` 입니다.  
> 
> ```python
> def constant_time(arr):
>    return arr[0]
> ```
> 
> ---
> >**1-2. O(N) (선형시간)**  
> >알고리즘이 입력 크기만큼 반복해야 하는 경우입니다. 예를들어, 리스트의 모든 요소를 순차적으로 처리할 때는 O(N)입니다.
> 
> ```python
> def linear_time(arr):
>    for item in arr:
>        print(item)
> ```
> 
> ---
> >**1-3. O(N^2) (이차시간)**  
> >중첩된 반복문이 있는 경우 입력 크기가 두번 반복되는 경우입니다. 예를들어, 중첩된 반복문을 사용하는 알고리즘은 O(N^2) 입니다.
> 
> ```python
> def quadratic_item(arr):
>    for i in range(len(arr)):
>        for j in range(len(arr)):
>            print(arr[i],arr[j])
> ```
> 
> ---
> >**1-4. O(logN) (로그시간)**  
> >로그 시간 복잡도는 보통 이진탐색에서 나타납니다. 이진 탐색은 정렬된 배열에서 중간 값을 기준으로 검색 범위를 반으로 좁혀가며 찾는 방식입니다.
> 
> ```python
> def binary_search(arr, target):
>    left, right = 0, len(arr) - 1
> while left <= right:
>    mid = (left + right) // 2
>    if arr[mid] == target:
>        return mid
>    elif arr[mid] < target:
>        left = mid + 1
> return -1
> 
> # 예시 배열
> arr = [1, 3, 5, 7, 9, 11, 13, 15, 17]
> target = 7
> print(binary_search(arr, target))
> ```
> 
> ---
> >**1-5. O(NlogN) (선형로그시간)**  
> >선형 로그 시간 복잡도는 주로 효율적인 정렬 알고리즘인 병합정렬(Merge Sort)과 퀵정렬(Quick Sort)에서 나타납니다.
> 
> ```python
> def merge_sort(arr):
>    if len(arr) > 1:
>        mid = len(arr) // 2  # 리스트를 반으로 나눔
>        left_half = arr[:mid]
>        right_half = arr[mid:]
> 
>        merge_sort(left_half)  # 왼쪽 부분 재귀 호출
>        merge_sort(right_half)  # 오른쪽 부분 재귀 호출
> 
>        i = j = k = 0
>        while i < len(left_half) and j < len(right_half):  # 두 부분을 병합
>            if left_half[i] < right_half[j]:
>                arr[k] = left_half[i]
>                i += 1
>            else:
>                arr[k] = right_half[j]
>                j += 1
>            k += 1
> 
>        while i < len(left_half):  # 남은 요소들 병합
>            arr[k] = left_half[i]
>            i += 1
>            k += 1
> 
>        while j < len(right_half):  # 남은 요소들 병합
>            arr[k] = right_half[j]
>            j += 1
>            k += 1
> 
> arr=[12, 11, 13, 5, 6, 7]
> merge_sort(arr)
> print(arr)
> ```
> 
> ---
> >**1-6. O(2^n) (지수시간)**  
> >지수시간 복잡도는 재귀적으로 문제를 풀 때 보통 나타납니다. 예를들어, 피보나치 수열을 구할 때 지수 시간 복잡도가 발생할 수 있습니다.
> 
> ```python
> def fibonacci(n):
>    if n <= 1:
>        return n
> 
> n = 6
> print(fibonacci(n))
> ```
> 
> ---
> >**1-7. O(n!) (팩토리얼시간)**  
> >팩토리얼 시간 복잡도는 순열 생성과 같은 문제에서 나타납니다. 예를들어, 주어진 숫자에 대해 모든 가능한 순열을 생성하는 알고리즘에서 발생합니다.
> 
> ```python
> def generate_permutations(arr):
>    return list(itertools.permutations(arr))
> 
> arr = [1, 2, 3]
> print(generate_permutations(arr))
> ```
> 
> ---
> **2. 공간복잡도(Space Complexity)**  
> 공간 복잡도는 알고리즘이 실행되는 동안 사용하는 메모리의 양을 나타냅니다.  
> 이는 주어진 입력을 처리하는 데 필요한 추가적인 공간의 양을 측정하며, 입력 크기(n)에 따라 어떻게 메모리 사용량이 변화하는지 나타냅니다.  
> 공간 복잡도는 주로 보조 공간(입력 데이터를 제외한 알고리즘이 사용하는 공간)을 기준으로 계산합니다.  
> 빅오 표기법을 사용하여 공간 복잡도를 표현합니다.  
> 
> >**2-1. O(1) (상수공간)**  
> >알고리즘이 입력 크기와 관계없이 일정한 양의 메모리를 사용하는 경우입니다.  
> >예를들어, 변수 몇 개를 사용하는 알고리즘은 `O(1)`입니다.
> 
> ```python
> def constant_space(arr):
>    total = 0 # 배열의 크기와 상관없이 한 변수만 사용
>    for num in arr:
>        total += num
>    return total
> ```
> 
> ---
> >**2-2. O(N) (선형공간)**  
> >알고리즘이 입력 크기와 비례하는 만큼 메모리를 사용하는 경우입니다.  
> >예를들어, 배열을 하나 더 만드는 알고리즘은 `O(N)`입니다.
> 
> ```python
> def linear_space(arr):
>    new_arr = []
>    for num in arr:
>        new_arr.append(num)
>    return new_arr
> ```
> 
> ---
> >**2-3. O(N^2) (이차공간)**  
> >알고리즘이 이중배열 또는 2D 배열을 사용하는 경우입니다.  
> 
> ```python
> def quadratic_space(arr):
>    result = [[0] * len(arr) for _ in range(len(arr))]
>    result
> ```
> 
> ---
> **3. 빅오 표기법(Big-O Notation)**  
> 알고리즘의 효율성은 시간 복잡도와 공간 복잡도를 통해 분석하며, 이를 표현하는 표기법이 빅오 표기법입니다.  
> 빅오 표기법은 알고리즘의 최악의 경우 성능을 나타냅니다.  
> 여러 가지 시간 복잡도를 비교할 때 사용되는 주요 빅오 표기법은 다음과 같습니다.  
> - `O(1)`: 상수 시간. 입력 크기에 상관없이 일정한 시간이 걸립니다.  
> - `O(logN)`: 로그 시간. 입력 크기가 커지면 시간이 조금씩 늘어나지만, 그 증가 속도는 상대적으로 느립니다.  
> - `O(N)`: 선형 시간. 입력 크기와 비례하는 시간이 걸립니다.  
> - `O(NlogN)`: 선형 로그 시간. 일반적으로 효율적인 정렬 알고리즘에 해당합니다.  
> - `O(N^2)`: 이차 시간. 입력 크기 n에 대해 시간은 n^2 비례로 증가합니다. 일반적으로 비효율적입니다.  
> - `O(2^N)`: 지수 시간. 입력 크기가 커질수록 시간이 급격히 증가합니다.  
> - `O(N!)`: 팩토리얼 시간. 매우 비효율적인 시간 복잡도로, 대부분의 문제에서 사용되지 않습니다.  

## 1. 탐색 알고리즘 (Search Algorithms)

### 1.1. 선형 탐색 (Linear Search)
선형 탐색은 배열 또는 리스트에서 요소를 처음부터 끝까지 순차적으로 검색하는 방식입니다. 찾고자 하는 값이 있다면, 그것이 나타날 때까지 비교를 계속합니다.

- **시간 복잡도**: 최악의 경우 O(n)
- **공간 복잡도**: O(1)

**장점**: 구현이 간단하고 배열이 정렬되어 있지 않아도 사용 가능합니다.  
**단점**: 비효율적이고, 데이터 크기가 커지면 성능이 급격히 떨어집니다.

```python
def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1

# 사용 예시
arr = [1, 3, 5, 7, 9]
print(linear_search(arr, 5))  # 2
```
### 1.2. 이진 탐색 (Binary Search)
이진 탐색은 **정렬된 배열**에서 중간 값을 기준으로 검색 범위를 반으로 줄여가며 찾는 방식입니다. 배열의 중간 값을 확인하고, 해당 값보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 계속해서 범위를 좁혀 나갑니다.

- **시간 복잡도**: O(log n)
- **공간 복잡도**: O(1)

**장점**: 매우 효율적이며, 큰 데이터에 대해 빠르게 검색할 수 있습니다.  
**단점**: 배열이 반드시 정렬되어 있어야만 사용할 수 있습니다.

```python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

# 사용 예시
arr = [1, 3, 5, 7, 9]
print(binary_search(arr, 5))  # 2
```
---

## 2. 정렬 알고리즘 (Sorting Algorithms)

정렬 알고리즘은 데이터를 특정 기준에 따라 순서대로 나열하는 방법입니다.

### 2.1. 버블 정렬 (Bubble Sort)
버블 정렬은 인접한 두 요소를 비교하여 크기를 바꾸며, 리스트를 여러 번 순회하면서 정렬하는 방식입니다.

- **시간 복잡도**: 최악의 경우 O(n^2)
- **공간 복잡도**: O(1)

**장점**: 구현이 간단하고 직관적입니다.  
**단점**: 비효율적이며, 데이터가 많을 경우 성능이 좋지 않습니다.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# 사용 예시
arr = [5, 1, 4, 2, 8]
bubble_sort(arr)
print(arr)  # [1, 2, 4, 5, 8]

```

### 2.2. 선택 정렬 (Selection Sort)
선택 정렬은 배열에서 최소값(또는 최대값)을 찾아서 맨 앞의 값과 교환하는 방식입니다. 이를 반복하여 전체 배열을 정렬합니다.

- **시간 복잡도**: O(n^2)
- **공간 복잡도**: O(1)

**장점**: 구현이 간단하고, 데이터가 적을 경우 유용합니다.  
**단점**: 큰 데이터셋에서는 비효율적입니다.

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# 사용 예시
arr = [5, 1, 4, 2, 8]
selection_sort(arr)
print(arr)  # [1, 2, 4, 5, 8]
```

### 2.3. 퀵 정렬 (Quick Sort)
퀵 정렬은 분할 정복 알고리즘으로, 배열을 기준값(pivot)을 기준으로 분할하고 각 부분을 재귀적으로 정렬합니다. 평균적으로 매우 효율적인 정렬 알고리즘입니다.

- **시간 복잡도**: 평균적으로 O(n log n)
- **공간 복잡도**: O(log n)

**장점**: 평균적으로 매우 빠르며, 대규모 데이터셋을 처리하는 데 적합합니다.  
**단점**: 최악의 경우 O(n^2) 시간이 걸릴 수 있습니다.

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# 사용 예시
arr = [5, 1, 4, 2, 8]
print(quick_sort(arr))  # [1, 2, 4, 5, 8]
```

---

## 3. 동적 계획법 (Dynamic Programming)

동적 계획법(DP)은 큰 문제를 작은 문제로 나누어 해결하고, 이미 계산한 값을 저장하여 중복 계산을 피하는 방법입니다.

### 3.1. 피보나치 수열 (Fibonacci Sequence)
피보나치 수열은 이전 두 수의 합으로 다음 수를 구하는 수열입니다. 동적 계획법을 사용하면 O(n) 시간 복잡도로 해결할 수 있습니다.

- **시간 복잡도**: O(n)
- **공간 복잡도**: O(n)

**장점**: 중복된 계산을 방지하고 효율적으로 문제를 해결합니다.  
**단점**: 메모리 사용량이 증가할 수 있습니다.

```python
def fibonacci(n):
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# 사용 예시
print(fibonacci(10))  # 55
```

---

## 4. 그리디 알고리즘 (Greedy Algorithm)

그리디 알고리즘은 각 단계에서 가장 최적인 선택을 하여 전체 문제를 해결하는 방법입니다. 그리디 알고리즘은 보통 최적해를 구할 수 있지만, 항상 최적의 해를 보장하지는 않습니다.

### 4.1. 동전 교환 문제 (Coin Change Problem)
주어진 금액을 최소 동전 수로 바꾸는 문제입니다. 그리디 알고리즘을 사용하여 해결할 수 있습니다.

- **시간 복잡도**: O(n)
- **공간 복잡도**: O(1)

**장점**: 구현이 간단하고, 최적의 해를 구할 수 있는 경우가 많습니다.  
**단점**: 최적의 해를 보장할 수 없는 경우도 있습니다.

```python
def coin_change(coins, amount):
    coins.sort(reverse=True)
    count = 0
    for coin in coins:
        count += amount // coin
        amount %= coin
    return count

# 사용 예시
coins = [1, 5, 10, 25]
amount = 63
print(coin_change(coins, amount))  # 6 (2x25 + 1x10 + 1x5 + 3x1)
```

---

## 5. 분할 정복 알고리즘 (Divide and Conquer)

분할 정복 알고리즘은 문제를 여러 개의 하위 문제로 나누고, 각 하위 문제를 독립적으로 해결한 후 결과를 합치는 방식입니다.

### 5.1. 병합 정렬 (Merge Sort)
병합 정렬은 분할 정복 알고리즘을 사용하여 배열을 분할하고 병합하는 방식으로 정렬하는 알고리즘입니다. 시간 복잡도는 O(n log n)입니다.

- **시간 복잡도**: O(n log n)
- **공간 복잡도**: O(n)

**장점**: 항상 O(n log n) 시간 복잡도를 유지합니다. 안정적인 정렬을 제공합니다.  
**단점**: 추가적인 메모리가 필요합니다.

```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left = arr[:mid]
        right = arr[mid:]

        merge_sort(left)
        merge_sort(right)

        i = j = k = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1

        while i < len(left):
            arr[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            arr[k] = right[j]
            j += 1
            k += 1

# 사용 예시
arr = [5, 1, 4, 2, 8]
merge_sort(arr)
print(arr)  # [1, 2, 4, 5, 8]
```

---

## 6. 최단 경로 알고리즘 (Shortest Path Algorithms)

### 6.1. 다익스트라 알고리즘 (Dijkstra's Algorithm)
다익스트라는 그래프에서 출발 노드에서 다른 모든 노드까지의 최단 경로를 구하는 알고리즘입니다. 일반적으로 음의 가중치를 가지지 않는 그래프에서 사용됩니다.

- **시간 복잡도**: O(V log V + E), V는 노드 수, E는 간선 수
- **공간 복잡도**: O(V)

**장점**: 음의 가중치가 없는 그래프에서 매우 효율적입니다.  
**단점**: 음의 가중치가 있는 그래프에서는 사용할 수 없습니다.

```python
import heapq

def dijkstra(graph, start):
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    priority_queue = [(0, start)]

    while priority_queue:
        current_distance, current_vertex = heapq.heappop(priority_queue)

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex]:
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances

# 사용 예시
graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('A', 1), ('C', 2), ('D', 5)],
    'C': [('A', 4), ('B', 2), ('D', 1)],
    'D': [('B', 5), ('C', 1)],
}
print(dijkstra(graph, 'A'))  # {'A': 0, 'B': 1, 'C': 3, 'D': 4}
```