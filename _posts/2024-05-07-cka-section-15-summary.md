---
layout: post
title: "[Udemy CKA Course] Section14 - Kube API Server"
date: 2024-05-04 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## Kube-apiserver의 역할

**kube-apiserver**는 요청을 인증하고 검증하는 역할을 합니다. `kubectl` 명령을 실행하면 실제로 `kubectl`은 kube-apiserver와 상호작용하여 요청을 인증하고 검증합니다.

그 후, **etcd** 클러스터에서 필요한 데이터를 가져와 응답을 반환합니다.

### 직접 API 사용하기
`kubectl`을 사용할 필요 없이, 직접 API에 POST 요청을 보내어 상호작용할 수도 있습니다.

#### 예시: Pod 생성
- Pod를 생성할 때, 요청은 먼저 인증되고 검증됩니다.
- kube-apiserver는 pod 객체를 생성하고 **etcd** 서버에 정보를 업데이트합니다.
- 스케줄러는 새로운 pod가 할당되지 않은 상태임을 감지하고, 이를 위한 적합한 노드를 찾아 배정합니다.
- 노드가 선택되면, kube-apiserver는 etcd에 해당 정보를 업데이트하고 이를 해당 노드의 kubelet에 전달합니다.
- kubelet은 해당 노드에서 pod를 생성하고, 컨테이너 런타임 엔진에 애플리케이션 이미지를 배포하도록 지시합니다.
- Pod가 생성되면, kubelet은 상태 정보를 다시 kube-apiserver에 전송하고, kube-apiserver는 etcd 클러스터에 이를 업데이트합니다.

이 과정은 모든 변경 요청에 대해 비슷한 방식으로 처리됩니다.

## Kube-apiserver와 상호작용하는 컴포넌트들

**kube-apiserver**는 여러 다른 컴포넌트들과 상호작용하는 중심적인 역할을 합니다:
- **Scheduler**
- **Kube-controller-manager**
- **Kubelet**

이 컴포넌트들은 클러스터 내에서 각자의 역할을 수행하기 위해 kube-apiserver와 상호작용합니다.

## Kube-apiserver 설정하기

`kubeadm`을 사용하여 클러스터를 부트스트랩했다면 큰 걱정 없이 기본 설정을 사용할 수 있습니다. 하지만 Kubernetes를 수동으로 설정하는 경우, kube-apiserver를 Kubernetes 마스터 노드에서 서비스로 실행할 수 있도록 설정해야 합니다. kube-apiserver는 Kubernetes 릴리스 페이지에서 바이너리로 제공됩니다.

### Kube-apiserver 파라미터

kube-apiserver는 많은 옵션과 함께 실행됩니다. 이 모든 옵션을 지금 다 이해할 필요는 없지만, 몇 가지 중요한 파라미터를 이해해두면 나중에 클러스터를 설정하는 데 도움이 될 것입니다.

몇 가지 중요한 설정 항목:
- **인증, 권한 부여, 암호화**: 다양한 컴포넌트 간의 보안된 연결을 위해 필요합니다.
- **인증서**: 통신을 보안하기 위해 인증서를 사용합니다. 인증서에 대해서는 나중에 강의에서 더 자세히 다룹니다.
- **etcd 서버**: 이 옵션은 kube-apiserver가 연결할 **etcd** 서버의 위치를 지정합니다.

### Kube-apiserver 옵션 확인하기

- `kubeadm`을 사용하여 클러스터를 설정한 경우, kube-apiserver는 `kube-system` 네임스페이스에서 Pod로 배포됩니다. Pod 정의 파일은 `/etc/kubernetes/manifest/` 폴더에 있습니다.
- `kubeadm`을 사용하지 않은 경우, kube-apiserver 서비스는 `/etc/systemd/system/kube-apiserver.service`에 위치해 있습니다. 마스터 노드에서 실행 중인 프로세스를 확인하고 `kube-apiserver` 프로세스를 검색하여 실행 중인 옵션을 확인할 수 있습니다.

## 결론

**kube-apiserver**는 Kubernetes에서 매우 중요한 컴포넌트로, 요청을 인증하고 검증하며, **etcd** 데이터 저장소와 상호작용합니다.
**kube-apiserver**는 Kubernetes의 중심 관리 컴포넌트입니다.
요청을 인증하고 검증하며, etcd 데이터 저장소와 상호작용합니다.
Scheduler, Kube-controller-manager, Kubelet 등의 컴포넌트는 **kube-apiserver**를 통해 클러스터의 업데이트를 수행합니다.