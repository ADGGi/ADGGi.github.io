---
layout: post
title: "[프로그래머스]3월에 태어난 여성 회원 목록 출력하기(SQL)"
date: 2024-06-13 20:00:00 +0900
categories: [CS, 코딩테스트]
tags: [CS, 프로그래머스]
author: "ADG"
---

# 문제

다음은 식당 리뷰 사이트의 회원 정보를 담은 `MEMBER_PROFILE` 테이블입니다. `MEMBER_PROFILE` 테이블은 다음과 같으며 `MEMBER_ID`, `MEMBER_NAME`, `TLNO`, `GENDER`, `DATE_OF_BIRTH`는 회원 ID, 회원 이름, 회원 연락처, 성별, 생년월일을 의미합니다.

| Column name   | Type         | Nullable |
| ------------- | ------------ | -------- |
| MEMBER_ID     | VARCHAR(100) | FALSE    |
| MEMBER_NAME   | VARCHAR(50)  | FALSE    |
| TLNO          | VARCHAR(50)  | TRUE     |
| GENDER        | VARCHAR(1)   | TRUE     |
| DATE_OF_BIRTH | DATE         | TRUE     |

`MEMBER_PROFILE` 테이블에서 생일이 3월인 여성 회원의 ID, 이름, 성별, 생년월일을 조회하는 SQL문을 작성해주세요. 이때 전화번호가 NULL인 경우는 출력대상에서 제외시켜 주시고, 결과는 회원ID를 기준으로 오름차순 정렬해주세요.

---

### 예시

`MEMBER_PROFILE` 테이블이 다음과 같을 때

| MEMBER_ID            | MEMBER_NAME	TLNO | GENDER      | DATE_OF_BIRTH |
| -------------------- | ---------------- | ----------- | ------------- |
| jiho92@naver.com     | 이지호           | 01076432111 | W             | 1992-02-12 |
| jiyoon22@hotmail.com | 김지윤           | 01032324117 | W             | 1992-02-22 |
| jihoon93@hanmail.net | 김지훈           | 01023258688 | M             | 1993-02-23 |
| seoyeons@naver.com   | 박서연           | 01076482209 | W             | 1993-03-16 |
| yoonsy94@gmail.com   | 윤서연           | NULL        | W             | 1994-03-19 |

SQL을 실행하면 다음과 같이 출력되어야 합니다.

MEMBER_ID	MEMBER_NAME	GENDER	DATE_OF_BIRTH
seoyeons@naver.com	박서연	W	1993-03-16

**주의사항**
`DATE_OF_BIRTH`의 데이트 포맷이 예시와 동일해야 정답처리 됩니다.

---

### 풀이

(1) 조회 컬럼 선택

```sql
-- mysql
SELECT MEMBER_ID, MEMBER_NAME, GENDER, DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') as DATE_OF_BIRTH
FROM MEMBER_PROFILE

-- oracle
SELECT MEMBER_ID, MEMBER_NAME, GENDER, TO_CHAR(DATE_OF_BIRTH, 'YYYY-MM-DD') AS DATE_OF_BIRTH
FROM MEMBER_PROFILE
```

(2) 생일이 3월 & 여성 & 전화번호가 `NULL`이 아닌 회원 + 오름차순 정렬

```sql
-- mysql
WHERE MONTH(DATE_OF_BIRTH) = 3
    AND GENDER = 'W'
    AND TLNO IS NOT NULL
ORDER BY MEMBER_ID ASC;

-- oracle
WHERE EXTRACT(MONTH FROM DATE_OF_BIRTH) = 3
    AND GENDER = 'W'
    AND TLNO IS NOT NULL
ORDER BY MEMBER_ID ASC;
```

---

### 제출 쿼리

```sql
-- mysql
SELECT MEMBER_ID, MEMBER_NAME, GENDER, DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') as DATE_OF_BIRTH
FROM MEMBER_PROFILE
WHERE MONTH(DATE_OF_BIRTH) = 3
    AND GENDER = 'W'
    AND TLNO IS NOT NULL
ORDER BY MEMBER_ID ASC;
```

```sql
-- oracle
SELECT MEMBER_ID, MEMBER_NAME, GENDER, TO_CHAR(DATE_OF_BIRTH, 'YYYY-MM-DD') AS DATE_OF_BIRTH
FROM MEMBER_PROFILE
WHERE EXTRACT(MONTH FROM DATE_OF_BIRTH) = 3
    AND GENDER = 'W'
    AND TLNO IS NOT NULL
ORDER BY MEMBER_ID ASC;
```