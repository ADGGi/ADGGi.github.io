---
layout: post
title: "[Udemy CKA Course] Section19 - Kube Proxy"
date: 2024-05-11 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## kube-proxy란?

Kubernetes 클러스터 내에서 모든 **Pod는 서로 통신이 가능**하다.  
이것은 클러스터에 **Pod 네트워크(Pod Network)** 솔루션을 배포함으로써 이루어진다.  
Pod 네트워크는 클러스터 전체에 걸쳐 **가상의 내부 네트워크**를 생성하고,  
각 Pod는 이 네트워크를 통해 서로 연결된다.

## Pod 간의 통신과 서비스
- Pod는 **IP 주소**를 사용하여 다른 Pod와 통신할 수 있다.
- 하지만, **Pod의 IP 주소는 변경될 가능성이 있기 때문에** 직접 IP를 사용하는 것은 비효율적이다.
- 대신, **Service**를 생성하여 Pod를 **고정된 엔드포인트**로 노출시키는 것이 더 좋은 방법이다.
- 예를 들어:
  - `Web App`이 `Database` Pod와 통신하려면, `Database`를 위한 **Service**를 생성하면 된다.
  - `Web App`은 `Database`의 **Service 이름(DB) 또는 Service IP**를 통해 안정적으로 연결할 수 있다.

## Service의 동작 방식
- **Service는 Pod처럼 직접적인 네트워크 인터페이스를 가지지 않는다.**
- 즉, Service는 **실제로 존재하는 개체가 아니라** Kubernetes의 메모리 내에서 관리되는 가상의 리소스이다.
- 하지만, Service는 클러스터 내 **모든 노드에서 접근 가능해야 한다**.

## kube-proxy의 역할
이때 **kube-proxy**가 등장한다.  
**kube-proxy는 각 노드에서 실행되며, Service로 들어오는 트래픽을 올바른 Pod로 전달하는 역할을 한다.**  

- kube-proxy는 클러스터에서 새로운 **Service가 생성되었는지 감시**한다.
- 새로운 Service가 감지되면, 각 노드에서 **트래픽을 올바른 Pod로 전달하기 위한 규칙을 생성**한다.
- **iptables**을 활용하여 **Service의 IP를 실제 Pod의 IP로 매핑**한다.

### 예시

| 요청 대상                 | kube-proxy가 트래픽을 전달하는 방식 |
| ------------------------- | ----------------------------------- |
| `10.96.0.12 (Service IP)` | `10.32.0.15 (Pod IP)`               |

즉, `Web App → DB Service (10.96.0.12)`로 요청하면,  
kube-proxy는 이를 `DB Pod (10.32.0.15)`로 전달한다.

## 5. kube-proxy 설치 및 배포 방식
- **kube-proxy는 각 노드에서 실행되는 필수 프로세스이다.**
- 설치 방법:
  1. **Kubernetes 공식 릴리즈 페이지**에서 kube-proxy 바이너리를 다운로드한다.
  2. 압축을 풀고 실행하여 서비스로 등록한다.

```bash
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kube-proxy

#kube-proxy.service
ExecStart=/usr/local/bin/kube-proxy \\
--config=/var/lib/kube-proxy/kube-proxy-config.yaml
Restart=on-failure
RestartSec=5
```
- **kubeadm을 사용한 설치**:
  - kubeadm은 **kube-proxy를 DaemonSet 형태로 배포**한다.
  - 즉, **각 노드마다 kube-proxy Pod가 자동으로 하나씩 실행**된다.

```bash
kubectl get pods -n kube-system

NAMESPACE NAME NAMESPACE NAME READY STATUS RESTARTS AGE
READY STATUS RESTARTS AGE
kube-system coredns-78fcdf6894-hwrq9 1/1 Running 0 16m
kube-system coredns-78fcdf6894-hwrq9 1/1 Running 0 16m
kube-system coredns-78fcdf6894-rzhjr 1/1 Running 0 16m
kube-system coredns-78fcdf6894-rzhjr 1/1 Running 0 16m
kube-system etcd-master 1/1 Running 0 15m
kube-system etcd-master 1/1 Running 0 15m
kube-system kube-apiserver-master 1/1 Running 0 15m
kube-system kube-apiserver-master 1/1 Running 0 15m
kube-system kube-controller-manager-master 1/1 Running 0 15m
kube-system kube-controller-manager-master 1/1 Running 0 15m
kube-system kube-proxy-lzt6f 1/1 Running 0 16m
kube-system kube-proxy-lzt6f 1/1 Running 0 16m
kube-system kube-proxy-zm5qd 1/1 Running 0 16m
kube-system kube-proxy-zm5qd 1/1 Running 0 16m
kube-system kube-scheduler-master 1/1 Running 0 15m
kube-system kube-scheduler-master 1/1 Running 0 15m
kube-system weave-net-29z42 2/2 Running 1 16m
kube-system weave-net-29z42 2/2 Running 1 16m
kube-system weave-net-snmdl 2/2 Running 1 16m -

kubectl get deamonset -n kube-system

NAME DESIRED CURRENT READY UP-TO-DATE AVAILABLE NODE SELECTOR AGE
kube-proxy 2 2 2 2 2 beta.kubernetes.io/arch=amd64 1h
```
## 6. 결론
- **kube-proxy는 Kubernetes에서 Service가 정상적으로 동작하도록 지원하는 핵심 구성 요소이다.**
- **Service는 실제 네트워크 인터페이스가 없지만, kube-proxy가 트래픽을 적절한 Pod로 라우팅한다.**
- **iptables를 활용하여 Service의 IP를 실제 Pod의 IP로 매핑**하는 방식으로 동작한다.
- **DaemonSet으로 배포되어 클러스터의 모든 노드에서 항상 실행된다.**

