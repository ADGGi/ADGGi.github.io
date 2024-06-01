---
layout: post
title: "[CS정리]자료구조"
date: 2024-06-02 20:00:00 +0900
categories: [CS, 내용정리]
tags: [CS, datastructure]
author: "ADG"
---

# 자료구조 (Data Structures)

자료구조는 데이터를 효율적으로 저장, 관리하고, 검색, 삽입, 삭제 등을 최적화하는 방법을 제공합니다. 여러 종류의 자료구조가 있으며, 각 자료구조는 특정 용도에 맞게 설계되었습니다.

## 1. 배열 (Array)

### 정의
배열은 같은 데이터 타입을 가진 요소들의 집합으로, 고정된 크기를 가집니다. 배열의 각 요소는 인덱스를 통해 접근할 수 있습니다.

### 특징
- **인덱스를 통한 빠른 접근**: 시간 복잡도 `O(1)`
- **크기 고정**: 배열 크기는 선언 시 고정되며, 크기를 변경할 수 없습니다.
- **연속된 메모리 할당**: 배열은 메모리에서 연속된 공간을 차지합니다.

### 장점
- 빠른 조회 성능
- 메모리 사용이 효율적

### 단점
- 크기가 고정되어 크기를 변경할 수 없음
- 삽입 및 삭제가 비효율적 (`O(N)`)

```python
# 배열
arr = [1, 2, 3, 4, 5]

# 인덱스를 사용한 접근
print(arr[0]) # 1

# 배열에 원소 추가
arr.append(6)

# 배열에서 원소 삭제
arr.remove(4)

# 배열의 크기 확인
print(len(arr)) # 5
```

---

## 2. 연결 리스트 (Linked List)

### 정의
연결 리스트는 각 요소가 데이터를 가지고, 그 다음 요소에 대한 포인터를 가진 노드로 구성된 자료구조입니다. 배열과 달리 연속적인 메모리 공간을 사용하지 않습니다.

### 종류
- **단일 연결 리스트 (Singly Linked List)**: 각 노드는 다음 노드에 대한 포인터만을 가집니다.
- **이중 연결 리스트 (Doubly Linked List)**: 각 노드는 이전 노드와 다음 노드에 대한 포인터를 가집니다.

### 특징
- **동적 크기**: 배열과 달리 크기를 동적으로 변경할 수 있습니다.
- **삽입 및 삭제 효율성**: 특정 위치에 삽입 및 삭제가 `O(1)`의 시간 복잡도로 가능합니다.

### 장점
- 동적 크기 조정
- 삽입 및 삭제가 빠름

### 단점
- 랜덤 액세스가 불가능하여 조회가 `O(N)`입니다.
- 추가적인 메모리(포인터)가 필요합니다.

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def display(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# 사용 예시
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.display()  # 1 -> 2 -> 3 -> None
```
---

## 3. 스택 (Stack)

### 정의
스택은 데이터를 **후입선출(LIFO, Last In First Out)** 방식으로 처리하는 자료구조입니다. 마지막에 삽입된 데이터가 가장 먼저 제거됩니다.

### 특징
- **Push**: 데이터를 스택에 삽입
- **Pop**: 스택에서 데이터를 제거
- **Peek**: 스택의 가장 상단에 있는 데이터를 조회

### 장점
- 메모리 관리나 함수 호출 스택 등에 유용
- 삽입과 삭제가 `O(1)`로 빠름

### 단점
- 제한된 접근 방식: 가장 마지막에 삽입된 데이터만 조회 가능

```python
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, item):
        self.stack.append(item)

    def pop(self):
        if len(self.stack) > 0:
            return self.stack.pop()
        return None

    def peek(self):
        if len(self.stack) > 0:
            return self.stack[-1]
        return None

    def is_empty(self):
        return len(self.stack) == 0

# 사용 예시
s = Stack()
s.push(1)
s.push(2)
s.push(3)
print(s.pop())  # 3
print(s.peek())  # 2
```

---

## 4. 큐 (Queue)

### 정의
큐는 데이터를 **선입선출(FIFO, First In First Out)** 방식으로 처리하는 자료구조입니다. 첫 번째로 삽입된 데이터가 가장 먼저 제거됩니다.

### 특징
- **Enqueue**: 데이터를 큐에 삽입
- **Dequeue**: 큐에서 데이터를 제거
- **Front/Rear**: 큐의 앞과 뒤를 추적

### 장점
- 작업 순서가 중요한 경우 사용
- 삽입과 삭제가 `O(1)`

### 단점
- 랜덤 접근이 불가능하고, 앞쪽에서만 제거가 가능

```python
from collections import deque

class Queue:
    def __init__(self):
        self.queue = deque()

    def enqueue(self, item):
        self.queue.append(item)

    def dequeue(self):
        if len(self.queue) > 0:
            return self.queue.popleft()
        return None

    def front(self):
        if len(self.queue) > 0:
            return self.queue[0]
        return None

    def is_empty(self):
        return len(self.queue) == 0

# 사용 예시
q = Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
print(q.dequeue())  # 1
print(q.front())    # 2
```

---

## 5. 트리 (Tree)

### 정의
트리는 계층적 구조를 가지며, 노드들이 부모-자식 관계로 연결된 자료구조입니다. 트리는 루트 노드를 중심으로 하위 노드들이 트리 구조로 분기합니다.

### 종류
- **이진 트리 (Binary Tree)**: 각 노드가 최대 두 개의 자식 노드를 가지는 트리
- **이진 검색 트리 (Binary Search Tree)**: 왼쪽 서브트리의 값은 부모 노드보다 작고, 오른쪽 서브트리의 값은 부모 노드보다 큰 트리
- **힙 (Heap)**: 완전 이진 트리로, 우선순위 큐를 구현하는 데 사용됩니다.

### 특징
- **트리 순회**: 전위, 중위, 후위 순회 방식이 있습니다.
- **검색**: 이진 검색 트리에서 검색은 `O(logN)`의 시간 복잡도를 가집니다.

### 장점
- 데이터의 계층적 관계를 표현
- 효율적인 탐색 및 삽입/삭제

### 단점
- 트리의 균형을 맞추는 것이 중요하고, 균형이 맞지 않으면 성능이 저하될 수 있습니다.

```python
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.value = key

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key):
        if self.root is None:
            self.root = Node(key)
        else:
            self._insert(self.root, key)

    def _insert(self, node, key):
        if key < node.value:
            if node.left is None:
                node.left = Node(key)
            else:
                self._insert(node.left, key)
        elif key > node.value:
            if node.right is None:
                node.right = Node(key)
            else:
                self._insert(node.right, key)

    def inorder_traversal(self, node):
        if node:
            self.inorder_traversal(node.left)
            print(node.value, end=" ")
            self.inorder_traversal(node.right)

# 사용 예시
bst = BinarySearchTree()
bst.insert(5)
bst.insert(3)
bst.insert(7)
bst.insert(2)
bst.insert(4)

bst.inorder_traversal(bst.root)  # 2 3 4 5 7
```

---

## 6. 해시 테이블 (Hash Table)

### 정의
해시 테이블은 **키(Key)**-**값(Value)** 쌍을 저장하는 자료구조로, 키를 해시 함수에 넣어 해시 값을 계산하고 그 값으로 데이터를 저장합니다. 매우 빠른 조회 성능을 제공합니다.

### 특징
- **해시 함수**: 키를 고유한 해시 값으로 변환
- **충돌 처리**: 같은 해시 값을 가진 키들이 있을 때 충돌이 발생하며, 이를 처리하는 방법으로 체이닝이나 오픈 어드레싱을 사용합니다.

### 장점
- 빠른 조회 성능 (`O(1)` 평균 시간 복잡도)
- 키-값 쌍을 효과적으로 관리

### 단점
- 충돌 해결에 추가적인 작업이 필요
- 고유한 해시 함수를 설계해야 함

```python
class HashTable:
    def __init__(self):
        self.table = {}

    def insert(self, key, value):
        self.table[key] = value

    def get(self, key):
        return self.table.get(key, None)

    def delete(self, key):
        if key in self.table:
            del self.table[key]

# 사용 예시
ht = HashTable()
ht.insert("name", "Alice")
ht.insert("age", 25)

print(ht.get("name"))  # Alice
ht.delete("age")
print(ht.get("age"))   # None
```

---

## 7. 그래프 (Graph)

### 정의
그래프는 노드들(정점)과 이들을 연결하는 간선(엣지)으로 구성된 자료구조입니다. 그래프는 방향이 있는 **유향 그래프**와 방향이 없는 **무향 그래프**로 나뉩니다.

### 종류
- **단방향 그래프**: 간선이 한 방향으로만 연결됨
- **양방향 그래프**: 간선이 양방향으로 연결됨
- **가중치 그래프**: 간선에 가중치가 부여된 그래프

### 특징
- **인접 행렬** 또는 **인접 리스트**로 그래프를 표현
- **DFS**(깊이 우선 탐색)와 **BFS**(너비 우선 탐색) 알고리즘을 사용하여 탐색 가능

### 장점
- 복잡한 관계를 표현할 수 있음
- 다양한 알고리즘 적용 가능 (예: 최단 경로 알고리즘)

### 단점
- 간선이 많을 경우 메모리 소비가 클 수 있음
- 구현이 복잡할 수 있음

```python
class Graph:
    def __init__(self):
        self.graph = {}

    def add_edge(self, u, v):
        if u not in self.graph:
            self.graph[u] = []
        self.graph[u].append(v)

    def display(self):
        for node in self.graph:
            print(f"{node}: {self.graph[node]}")

# 사용 예시
g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
g.add_edge(2, 0)

g.display()
# 0: [1, 2]
# 1: [2]
# 2: [0]
```

---

## 8. 힙 (Heap)

### 정의
힙은 완전 이진 트리로, 특정 규칙을 따른 자료구조입니다. **최대 힙**은 부모 노드가 자식 노드보다 크고, **최소 힙**은 부모 노드가 자식 노드보다 작습니다.

### 특징
- 힙은 우선순위 큐 구현에 사용됩니다.
- **삽입**과 **삭제** 연산이 `O(logN)`의 시간 복잡도를 가집니다.

### 장점
- 효율적인 우선순위 큐 구현
- 빠른 삽입 및 삭제

### 단점
- 검색 연산이 비효율적입니다.

```python
import heapq

class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, item):
        heapq.heappush(self.heap, item)

    def extract_min(self):
        if self.heap:
            return heapq.heappop(self.heap)
        return None

    def peek(self):
        if self.heap:
            return self.heap[0]
        return None

# 사용 예시
min_heap = MinHeap()
min_heap.insert(10)
min_heap.insert(20)
min_heap.insert(5)

print(min_heap.extract_min())  # 5
print(min_heap.peek())         # 10
```
