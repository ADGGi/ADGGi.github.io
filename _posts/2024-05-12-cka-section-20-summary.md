---
layout: post
title: "[Udemy CKA Course] Section20 - Pods"
date: 2024-05-12 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

# Kubernetes Pod란?

## 1. 개요
Kubernetes에서 **Pod**는 가장 작은 배포 단위이다.  
Kubernetes는 개별 **컨테이너를 직접 배포하지 않고**,  
항상 **Pod이라는 객체에 컨테이너를 포함**시켜 배포한다.  

## 2. Pod의 역할
- **Pod는 하나 이상의 컨테이너를 포함할 수 있다.**
- 일반적으로 **하나의 Pod에는 하나의 컨테이너**가 포함된다.
- Pod는 **동일한 네트워크 공간(Network Namespace)과 스토리지 볼륨을 공유**한다.

## 3. Pod의 배포 및 확장
### 3.1 단일 Pod 배포
가장 기본적인 Kubernetes 구성에서는 **하나의 Pod 안에 하나의 컨테이너**가 존재한다.  
예를 들어, `nginx` 웹 서버를 배포하려면 Pod 내부에 `nginx` 컨테이너를 생성하면 된다.

### 3.2 애플리케이션 확장(Scaling)
사용자가 증가하면 애플리케이션의 부하가 증가하고, 이에 따라 추가 인스턴스가 필요해진다.
- 새로운 컨테이너를 기존 Pod에 추가하지 않고, **새로운 Pod을 생성**한다.
- 동일한 애플리케이션을 실행하는 여러 개의 Pod을 배포하여 부하를 분산시킨다.

### 3.3 멀티 노드 확장
- 현재 노드의 자원이 부족하면, **새로운 노드를 클러스터에 추가**하여 Pod을 배포할 수 있다.
- Kubernetes는 클러스터 내에서 **여러 노드에 Pod을 분산 배포**한다.

## 4. 멀티 컨테이너 Pod
### 4.1 다중 컨테이너 배포 가능
- 일반적으로 Pod는 **하나의 컨테이너만 포함**하지만,  
  경우에 따라 여러 개의 컨테이너를 포함할 수도 있다.
- **보조 컨테이너(Sidecar)**를 활용하여 애플리케이션의 일부 작업을 처리할 수 있다.

### 4.2 멀티 컨테이너 Pod의 장점
- **서로 다른 역할의 컨테이너를 하나의 Pod에서 실행**할 수 있다.
- 예시:
  - 웹 서버 컨테이너 + 로그 수집 컨테이너
  - 데이터 처리 컨테이너 + 데이터 저장 컨테이너
- **컨테이너 간 네트워크 통신이 쉬워짐** (localhost로 직접 통신 가능)
- **스토리지 공유가 용이함**

> **⚠️ 참고:**  
> 그러나 일반적으로 Kubernetes에서는 **하나의 Pod에 하나의 컨테이너**를 배포하는 것이 일반적이며,  
> 멀티 컨테이너 Pod는 특수한 경우에만 사용된다.

## 5. Kubernetes가 Pod을 관리하는 이유
Docker만 사용하여 컨테이너를 직접 실행할 수도 있지만,  
이 경우 다음과 같은 문제들이 발생할 수 있다.
- **컨테이너 간 네트워크 연결 설정이 필요** (수동으로 네트워크를 구성해야 함)
- **스토리지 공유 문제 발생** (볼륨을 직접 연결해야 함)
- **컨테이너 상태 관리 문제** (컨테이너가 종료되면 관련 컨테이너도 함께 종료해야 함)

Kubernetes의 **Pod은 이러한 문제를 자동으로 해결**해준다.
- 같은 Pod 내의 컨테이너는 **자동으로 네트워크와 스토리지를 공유**한다.
- Pod이 종료되면 **같은 Pod 내의 모든 컨테이너가 함께 종료**된다.

## 6. Pod 생성 방법
Pod을 생성하려면 `kubectl run` 명령어를 사용한다.

```sh
#Pod을 생성(kubectl run)하고 nginx 컨테이너 실행
kubectl run my-nginx --image=nginx

#실행중인pod 확인
kubectl get pods

#Pod 삭제
kubectl delete pod my-nginx
```

## 결론
- **Pod은 Kubernetes에서 가장 작은 배포 단위이다.**
- **일반적으로 하나의 Pod에는 하나의 컨테이너가 포함된다.**
- **Pod을 확장하려면 새로운 Pod을 생성하여 부하를 분산시킨다.**
- **Kubernetes의 Pod은 컨테이너 간 네트워크 및 스토리지 공유를 자동화한다.**
- **kubectl run, kubectl get pods, kubectl delete pod 등의 명령어를 사용하여 Pod을 관리**
