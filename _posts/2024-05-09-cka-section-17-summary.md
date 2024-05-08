---
layout: post
title: "[Udemy CKA Course] Section16 - Kube Scheduler"
date: 2024-05-09 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## kube-scheduler 역할
- Kubernetes 스케줄러는 **노드에 파드를 스케줄링**하는 역할을 담당합니다.
- 중요한 점은 스케줄러가 파드를 직접 배치하는 것이 아니라, **어떤 노드에 파드를 배치할지를 결정**하는 것이라는 점입니다. 실제 배치는 **kubelet**이 담당합니다.

## 왜 스케줄러가 필요할까요?
- 여러 노드와 컨테이너가 있을 때, 올바른 컨테이너가 올바른 노드에 배치되도록 보장해야 합니다.
- 예를 들어, 노드는 특정 애플리케이션을 위한 전용 자원을 가지고 있을 수 있으며, 스케줄러는 이를 고려하여 각 파드를 올바른 노드에 배치합니다.

## 스케줄러의 작업 흐름
- **첫 번째 단계**: 스케줄러는 파드의 요구 사항(예: CPU, 메모리)을 충족하지 않는 노드를 필터링합니다.
- **두 번째 단계**: 나머지 노드들 중에서 **우선순위 함수를 사용**해 적합한 노드를 선택합니다. 예를 들어, 파드를 배치한 후 남는 자원을 기준으로 우선순위를 매깁니다.

## 스케줄러의 맞춤화
- 스케줄러는 기본적으로 제공되는 기능을 사용하지만, 필요에 따라 **자체 스케줄러를 작성할 수** 있습니다.
- Kubernetes에서는 리소스 요구 사항, 제한 사항, 톨러레이션, 노드 선택자 등의 기능을 통해 더욱 세부적으로 스케줄링을 설정할 수 있습니다.

## kube-scheduler 설치 및 설정
- **kube-scheduler 바이너리**를 Kubernetes 릴리즈 페이지에서 다운로드한 후 추출하고 서비스로 실행합니다.
- 실행 시 **스케줄러 설정 파일**을 지정합니다.
- 설치 후, `kubeadm`을 사용한 경우 **kube-scheduler**는 `kube-system` 네임스페이스의 파드로 배포되며, 파드 정의 파일에서 설정을 확인할 수 있습니다.
- 비-kubeadm 환경에서는 **서비스 파일**이나 **실행 중인 프로세스**를 통해 설정을 확인할 수 있습니다.

## kube-scheduler 실행 옵션 보기
- `kubeadm`으로 클러스터를 설정한 경우, `kube-scheduler`는 `kube-system` 네임스페이스의 파드로 배포되어 있으며, `/etc/kubernetes/manifest` 폴더에 있는 정의 파일에서 옵션을 확인할 수 있습니다.
- 비-kubeadm 설정에서는 `kube-scheduler`의 서비스를 `/etc/systemd/system`에서 확인할 수 있으며, **마스터 노드에서 실행 중인 프로세스**를 검색하여 현재 설정을 볼 수 있습니다.

## 결론
1. kube-scheduler는 **파드를 직접 배포하지 않고**, 적절한 노드를 찾아 배정하는 역할을 한다.
2. 스케줄링 과정은 **노드 필터링 → 우선순위 평가** 두 단계로 진행된다.
3. 파드의 리소스 요구 사항, 노드 속성, 라벨, 톨러레이션 등을 고려하여 최적의 노드를 찾는다.
4. 기본 스케줄러를 사용하거나, **커스텀 스케줄러**를 만들어 특정 요구사항을 반영할 수 있다.
5. kube-scheduler는 `/etc/kubernetes/manifest/` 또는 `/etc/systemd/system/`에서 설정을 확인할 수 있다.

kube-scheduler는 Kubernetes 클러스터의 **자원 활용도를 최적화**하는 핵심 요소입니다.  
이해하고 활용하면 클러스터 성능을 더욱 효과적으로 관리할 수 있습니다.

