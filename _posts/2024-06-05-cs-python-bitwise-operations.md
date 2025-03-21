---
layout: post
title: "[Python]비트연산(Bitwise Operation)"
date: 2024-06-05 20:00:00 +0900
categories: [CS, Python]
tags: [CS, Python]
author: "ADG"
---

# 비트연산

- 비트란 ? 컴퓨터에서 정보를 표현하는 기본적인 단위로 0과 1로 이루어진 이진수 형태로 데이터를 처리합니다.  
  예를들어, 10진수 숫자 `6`을 이진수료 표현하면 `110` 입니다.
- 비트연산은 이진수 비트들에 대해 직접적으로 연산을 수행하는 방법입니다.

## 비트연산자

**1. AND 연산 (`&`)**  
  - AND 연산은 두 값이 모두 1일 때만 1을 반환하는 연산입니다.  
  - **비트 단위로 비교**하여 두 비트가 모두 1이면 1을, 그렇지 않으면 0을 반환 합니다.  

   ```python
   a = 5 # 이진수 : 101
   b = 3 # 이진수 : 011
   print(a & b) # 1

   #  101  (a = 5)
   #& 011  (b = 3)
   #---------------
   #  001 (결과 = 1)
   ```

**2. OR 연산 (`|`)**  
  - OR 연산은 두 값중 하나라도 1이면 1을 반환하는 연산입니다.  
  - **비트 단위로 비교**하여 두 비트 중 하나라도 1이면 1을, 그렇지 않으면 0을 반환합니다.  

   ```python
   a = 5
   b = 3
   print(a | b) # 7

   #  101  (a = 5)
   #& 011  (b = 3)
   #---------------
   #  111 (결과 = 7)
   ```

**3. XOR 연산 (`^`)**  
  - XOR 연산은 두 비트가 다를 때만 1을 반환하는 연산입니다.  
  - **비트 단위로 비교하여** 두 비트가 같으면 0을, 다르면 1을 반환합니다.  

   ```python
   a = 5
   b = 3
   print(a ^ b) # 7

   #  101  (a = 5)
   #& 011  (b = 3)
   #---------------
   #  110 (결과 = 6)
   ```

**4. NOT 연산 (`~`)**  
  - NOT 연산은 비트를 반전시키는 연산입니다.  
  - 1은 0으로, 0은 1로 바꾸며 이를 비트 반전(bitwise negation)이라고도 합니다.

   ```python
   a = 5
   print(~a) # -6

   #  a = 5 의 32비트 이진수 표현
   #  00000000 00000000 00000000 00000101
   #  ~a 연산
   #  11111111 11111111 11111111 11111010
   #  ~a 결과 : -6
   ```
**5. 비트 시프트 연산 (`<<`, `>>`)**  
  - 왼쪽 시프트 (`<<`)  
   왼쪽 시프트 연산은 (`<<`)은 모든 비트를 왼쪽으로 이동시키고, 오른쪽 끝에는 0을 채웁니다.  
   즉 1비트 왼쪽으로 시프트하면 해당값은 2배가 됩니다.  

   ```python
   n = 6 # 이진수: 110
   n <<= 1 # 이진수: 1100, 결과 : 12
   ```

  - 오른쪽 시프트 (`>>`)  
   오른쪽 시프트 연산 (`>>`)은 숫자의 이진수 표현에서 모든 비트를 오른쪽으로 밀어내는 연산입니다.  
   가장 오른쪽에 있는 비트는 버리고, 그 자리를 0으로 채웁니다.  

   ```python
   n >>= 1
   ```

   위 코드에서 `n`은 시프트 연산이 적용될 변수입니다.  
   `1`은 1비트 만큼 시프트 하겠다 라는 것을 의미합니다.  
   `n >>= 1` 은 `n`을 오른쪽으로 `1`비트만큼 이동시키겠다는 의미를 가집니다.
   
   > 예시1.  
   > `n = 6` 이라고 가정했을 때, 이진수로 나타내면 `110`입니다.  
   > 오른쪽 시프트 연산을 수행하게 되면 오른쪽으로 1비트씩 값이 이동하므로 `011` 이 되어 십진수 숫자 3이 됩니다.  
   > 이는 `6 // 2` 와 같은 결과입니다.  

   ---

   >예시2.  
   >```python
   >n = 6
   >positions = []
   >
   ># 우측 시프트 연산을 통해 1의 위치를 찾음
   >for i in range(n.bit_length()):  # n.bit_length() : 3
   >    if n & 1: # n의 최하위 비트가 1인지 확인
   >        positions.append(i) 
   >    n >>= 1
   >
   >print(positions)
   >```
   >
   >
   >예시2. 코드설명  
   >**첫번째 루프**  
   > - `n = 6` 이므로 이진수 `110`  
   > - `n & 1` = `6 & 1` = `0` 이므로 `positions` 리스트에 아무것도 추가되지 않음  
   > - `n >> 1` 연산을 통해 이진수 `110`이 비트 시프트 되어 `011`로 변환 (`n = 3`이 됨)  
   >
   >**두번째 루프**  
   > - `n = 3` 이므로 이진수 `11`
   > - `n & 1` = `3 & 1` = `1` 이므로 `positions.appned(1)`이 실행  
   > - `positions` 리스트는 `[1]` 으로 갱신  
   > - `n >>= 1` 연산을 통해 이진수 `11`이 비트 시프트 되어 `1`로 변환 (`n = 1`이 됨)  
   >
   >**세번째 루프**  
   > - `n = 1` 이므로 이진수 `1`  
   > - `n & 1` = ` 1 & 1` = `1` 이므로 `positions.append(2)`이 실행  
   > - `positions` 리스트는 `[2]` 으로 갱신  
   > - `n >> 1` 연산을 통해 이진수 `1`이 비트 시프트 되어 `0`으로 변환 (`n = 0`이 됨)  
   >
   >**반복 종료**  
   > - `n = 0`으로 더 이상 비트가 남지 않아 반복이 종료  
   > - 결과: `positions = [1, 2]`
   >
   > 왜 `[0, 1]`이 아니라 `[1, 2]` ?  
   > 비트는 우측부터 확인하며, `n & 1`은 최하위 비트부터 체크합니다.  
   > `n = 6` (이진수 `110`)을 예로 들면  
   > 첫번째 비트 (0번째 위치의 비트)는 `0`  
   > 두번째 비트 (1번째 위치의 비트)는 `1`  
   > 세번째 비트 (2번째 위치의 비트)는 `2`  
