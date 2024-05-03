---
layout: post
title: "[Udemy CKA Course] Section12 - ETCD for Beginner"
date: 2024-05-03 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## ETCD란?

ETCD는 분산 환경에서 데이터를 키-값 쌍으로 저장하는 저장소로, Kubernetes의 핵심 데이터 저장소 역할을 합니다.  
클러스터의 노드, 파드 등 중요한 정보가 모두 ETCD에 저장되므로, ETCD가 정상적으로 동작하지 않으면 전체 클러스터에 심각한 문제가 발생할 수 있습니다.

#### 키-값 저장소란?

- **전통적인 데이터베이스**는 데이터를 행과 열로 구성된 테이블에 저장합니다. 이 경우, 새로운 정보를 추가하면 전체 테이블에 영향을 주어 불필요한 빈 칸이 생길 수 있습니다.
- 반면, **키-값 저장소**는 각 데이터를 개별 문서나 파일에 저장하여, 한 데이터의 변경이 다른 데이터에 영향을 주지 않습니다. 이러한 방식은 데이터 관리에 더 유연하고 효율적입니다.

#### ETCD 설치 및 ETCDCTL 사용법

- **설치 방법**: GitHub Releases 페이지에서 운영체제에 맞는 바이너리를 다운로드한 후 압축을 풀어 실행합니다. 기본적으로 ETCD는 포트 2379에서 작동합니다.
- **ETCDCTL 클라이언트**: ETCD와 상호작용할 수 있는 명령줄 도구입니다.
  - **v2 버전**에서는 `./etcdctl set key1 value1` 명령어로 데이터를 저장하고, `./etcdctl get key1`으로 조회합니다.
  - **v3 버전**에서는 명령어가 `put`과 `get`으로 변경되었으며, 환경 변수 `ETCDCTL_API=3`을 설정하여 사용할 수 있습니다.
  - `etcdctl version` 명령어를 통해 현재 ETCDCTL 유틸리티와 API 버전을 확인할 수 있습니다.

#### ETCD 버전 이력

- **v0.1 (2013년 8월)**: 최초 릴리즈
- **v2.0 (2015년 2월)**: RAFT 합의 알고리즘 도입으로 초당 10,000회 이상의 쓰기 성능 지원
- **v3.0 (2017년 1월)**: 성능과 안정성이 크게 개선됨
- **v3.0 (2018년 11월)**: ETCD가 CNCF에 포함됨  
  → v2.0과 v3.0 사이에 API 차이가 있어 ETCDCTL 명령어도 변경되었으므로, 사용 시 반드시 버전을 확인해야 합니다.

