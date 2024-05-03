---
layout: post
title: "[Udemy CKA Course] Section13 - ETCD와 Kubernetes"
date: 2024-05-04 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## ETCD의 역할

- **클러스터 정보 저장**:  
  ETCD는 Nodes, Pod, Configs, Secrets, Accounts, Roles, Bindings 등 클러스터의 모든 정보를 저장합니다.  
`kubectl get` 명령어로 확인하는 모든 데이터는 ETCD에서 조회됩니다.

- **상태 업데이트**:  
  클러스터에 새로운 노드를 추가하거나 파드, 레플리카셋을 배포하는 등의 변경 사항은 ETCD에 기록되어야만 최종적으로 반영됩니다.

## ETCD 배포 방식

ETCD의 배포 방식은 클러스터 설정 방법에 따라 달라집니다.

- **직접 설치 방식**:  
  클러스터를 처음부터 직접 구성하는 경우, ETCD 바이너리를 직접 다운로드하고 압축을 풀어 마스터 노드에 서비스로 설치합니다. 이 과정에서 인증서 설정, 광고 클라이언트 URL 등의 다양한 옵션을 수동으로 구성해야 합니다.

- **kubeadm 방식**:  
  kubeadm을 사용하면 ETCD 서버가 자동으로 kube-system 네임스페이스의 파드로 배포됩니다. 이 방식은 수동 설정 없이 간편하게 ETCD를 운영할 수 있습니다.

- **연습 환경**:  
  일부 연습 환경에서는 Qadium 도구를 사용하여 ETCD가 배포됩니다. 두 방식의 차이를 이해하는 것이 중요합니다.

## 고가용성(HA) 구성

- HA 환경에서는 여러 마스터 노드에 걸쳐 다수의 ETCD 인스턴스가 배포됩니다.
- 이때 각 인스턴스가 서로를 인식하도록, 초기 클러스터 옵션 등 적절한 설정이 필요합니다.

