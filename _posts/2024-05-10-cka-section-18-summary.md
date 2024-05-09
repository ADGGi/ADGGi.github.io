---
layout: post
title: "[Udemy CKA Course] Section18 - Kubelet"
date: 2024-05-10 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## Kubelet이란?    
- Kubelet은 Kubernetes의 핵심 구성 요소 중 하나로, **워커 노드에서 실행되는 에이전트**입니다.  
- 클러스터 내에서 **Pod와 컨테이너를 관리하는 역할**을 하며, 마스터 노드와 지속적으로 통신하여 **컨테이너의 상태를 유지 및 보고**합니다.  
- kubeadm은 Kubernetes 클러스터를 초기화하고 관리하는 도구지만, Kubelet 자체를 설치하거나 배포하는 역할은 하지 않습니다.  
- 따라서, 클러스터를 구축하기 전에 사용자가 직접 kubelet을 설치해야 합니다.
  
---

## Kubelet의 역할  
Kubelet은 Kubernetes 클러스터 내에서 다음과 같은 역할을 수행합니다.  

### 1️⃣ 클러스터에 노드 등록  
- Kubelet은 Kubernetes 클러스터에 **자신이 실행 중인 노드를 등록**합니다.  
- 이를 통해 마스터 노드가 해당 노드를 인식하고 관리할 수 있습니다.  

### 2️⃣ Pod 실행 및 관리  
- Kubelet은 **마스터 노드에서 전달된 Pod 실행 요청을 처리**합니다.  
- 직접 컨테이너를 실행하지 않고, **컨테이너 런타임(Docker, containerD 등)에 실행을 요청**합니다.  

### 3️⃣ 컨테이너 상태 모니터링  
- 실행 중인 **Pod와 컨테이너의 상태를 지속적으로 모니터링**합니다.  
- 컨테이너가 비정상적으로 종료되면, kubelet이 **자동으로 재시작**을 시도합니다.  

### 4️⃣ Kube API 서버에 상태 보고  
- kubelet은 주기적으로 **노드 및 Pod 상태 정보를 Kube API 서버에 전송**합니다.  
- 이를 통해 클러스터의 상태를 항상 최신으로 유지할 수 있습니다.  

---

## Kubelet의 동작 방식  
Kubelet은 Kubernetes 클러스터에서 다음과 같은 흐름으로 동작합니다.  

1. **Kube API 서버와 연결**  
   - Kubelet은 Kube API 서버와 연결하여 **자신을 클러스터에 등록**합니다.  
   
2. **Pod 실행 요청 처리**  
   - Kube API 서버에서 **새로운 Pod를 실행하라는 요청을 받으면**, kubelet이 이를 감지합니다.  
   - kubelet은 **컨테이너 런타임(Docker, containerd 등)**에 해당 컨테이너를 실행하도록 요청합니다.  

3. **Pod 및 컨테이너 모니터링**  
   - 실행 중인 **Pod와 컨테이너의 상태를 지속적으로 점검**합니다.  
   - 컨테이너가 종료되거나 장애가 발생하면, kubelet이 **자동으로 복구**를 시도합니다.  

4. **클러스터 상태 보고**  
   - Kube API 서버에 **노드 및 Pod의 상태 정보를 주기적으로 보고**합니다.  

---

## Kubelet 설치 방법  
Kubelet은 Kubernetes 클러스터에서 **자동으로 설치되지 않으며**, 사용자가 직접 설치해야 합니다.  

### 📌 설치 및 실행 방법  
```bash
wget https://storage.googleapis.com/kubernetes-release/release/v1.13.0/bin/linux/amd64/kubelet
ExecStart=/usr/local/bin/kubelet \\
--config=/var/lib/kubelet/kubelet-config.yaml \\
--container-runtime=remote \\
--container-runtime-endpoint=unix:///var/run/containerd/containerd.sock \\
--image-pull-progress-deadline=2m \\
--kubeconfig=/var/lib/kubelet/kubeconfig \\
--network-plugin=cni \\
--register-node=true \\
--v=2

# kubelet 설치 (Ubuntu 기준)
sudo apt update
sudo apt install -y kubelet

# kubelet 서비스 시작 및 자동 실행 설정
sudo systemctl enable --now kubelet

# 실행 중인 kubelet 프로세스 확인
ps aux | grep kubelet
root 2095 1.8 2.4 960676 98788 ? Ssl 02:32 0:36 /usr/bin/kubelet --bootstrap-
kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --
config=/var/lib/kubelet/config.yaml --cgroup-driver=cgroupfs --cni-bin-dir=/opt/cni/bin --cni-
conf-dir=/etc/cni/net.d --network-plugin=cni

```
## 결론
- Kubernetes 노드에서 실행되는 핵심 에이전트
- 클러스터 등록, 컨테이너 실행, 상태 모니터링 및 보고 역할 수행
- 컨테이너 런타임(Docker, containerd 등)과 협력하여 Pod를 실행
- 자동으로 설치되지 않으며, 수동으로 설치해야 함
- 마스터 노드의 Kube API 서버와 지속적으로 통신