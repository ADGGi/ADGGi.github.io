---
layout: post
title: "Udemy CKA Course - Section 10 Summary"
date: 2024-05-01 20:00:00 +0900
categories: [Cloud, CKA]
tags: [k8s, cka]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

# 쿠버네티스 아키텍처 개요

## 1. 쿠버네티스란?
쿠버네티스(Kubernetes)는 컨테이너화된 응용 프로그램을 자동으로 배포, 관리 및 확장할 수 있도록 설계된 오픈소스 시스템입니다. 이를 통해 다양한 서비스 간의 원활한 통신과 요구 사항에 따른 자동 확장이 가능합니다.

## 2. 쿠버네티스 클러스터 구성 요소

### (1) 마스터 노드(Master Node)
마스터 노드는 클러스터를 관리하는 핵심 요소로, 다음과 같은 구성 요소로 이루어져 있습니다.

- **etcd**: 키-값 저장소로, 클러스터의 모든 상태 정보를 저장합니다.
- **Kube API Server**: 쿠버네티스의 주요 관리 요소로, 클러스터 내 모든 작업을 오케스트레이션합니다.
- **Scheduler**: 적절한 노드를 선택하여 컨테이너를 배치합니다.
- **Controller Manager**: 다양한 컨트롤러를 관리하여 클러스터 상태를 유지합니다.
  - **Node Controller**: 노드 추가 및 장애 감지
  - **Replication Controller**: 원하는 개수의 컨테이너를 유지

### (2) 작업자 노드(Worker Node)
작업자 노드는 실제 컨테이너가 배치되어 실행되는 노드입니다.

- **Kubelet**: 각 노드에서 실행되는 에이전트로, API 서버의 지시에 따라 컨테이너를 배포 및 관리합니다.
- **Kube Proxy**: 네트워크 규칙을 관리하여 노드 간 통신을 가능하게 합니다.
- **Container Runtime**: 컨테이너를 실행하는 엔진으로, Docker, containerd 등이 사용될 수 있습니다.

## 3. 쿠버네티스의 동작 방식
1. **사용자가 요청을 제출**하면, API 서버가 이를 수락합니다.
2. **Scheduler**가 적절한 노드를 선택하여 컨테이너를 배치합니다.
3. **Kubelet**이 컨테이너를 실행하고 상태를 API 서버에 보고합니다.
4. **Controller Manager**가 클러스터 상태를 지속적으로 모니터링하고 필요한 변경을 수행합니다.
5. **Kube Proxy**가 네트워크 연결을 관리하여 컨테이너 간 통신을 보장합니다.

## 4. 결론
쿠버네티스는 컨테이너화된 애플리케이션을 효율적으로 배포하고 운영할 수 있도록 설계된 시스템입니다. 마스터 노드와 작업자 노드의 협업을 통해 자동화된 방식으로 클러스터를 운영할 수 있습니다. 

