---
layout: post
title: "[Udemy CKA Course] Section16 - Kube Controller Manager"
date: 2024-05-08 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## Kube Controller Manager란?

**Kube Controller Manager**는 Kubernetes에서 여러 컨트롤러를 관리하는 컴포넌트입니다. 컨트롤러는 마스터 내의 다양한 부서나 사무소처럼 각기 다른 책임을 맡고 있습니다. 예를 들어, 하나의 부서는 **배**(Ship)를 관리하고, 또 다른 부서는 **배 위의 컨테이너**를 관리합니다. 각 부서는 지속적으로 상태를 모니터링하고 필요한 조치를 취합니다.

### Kubernetes에서의 Controller

Kubernetes에서는 **컨트롤러**가 시스템 내 다양한 구성 요소의 상태를 지속적으로 모니터링하며, 시스템을 원하는 상태로 유지하려고 작업합니다. 예를 들어, **노드 컨트롤러**는 노드의 상태를 모니터링하고 애플리케이션이 항상 실행 중인 상태로 유지되도록 관리합니다.

- **노드 컨트롤러**: 노드의 상태를 5초마다 체크하여 노드가 정상적으로 작동하는지 모니터링합니다. 노드가 응답하지 않으면 40초 후에 해당 노드를 도달 불가능한 상태로 표시하고, 5분 내에 복구되지 않으면 해당 노드에 배정된 Pod들을 다른 정상적인 노드로 이동시킵니다.

  ```bash
  ExecStart=/usr/local/bin/kube-controller-manager \\
  --address=0.0.0.0 \\
  --cluster-cidr=10.200.0.0/16 \\
  --cluster-name=kubernetes \\
  --cluster-signing-cert-file=/var/lib/kubernetes/ca.pem \\
  --cluster-signing-key-file=/var/lib/kubernetes/ca-key.pem \\
  --kubeconfig=/var/lib/kubernetes/kube-controller-manager.kubeconfig \\
  --leader-elect=true \\
  --root-ca-file=/var/lib/kubernetes/ca.pem \\
  --service-account-private-key-file=/var/lib/kubernetes/service-account-key.pem \\
  --service-cluster-ip-range=10.32.0.0/24 \\
  --use-service-account-credentials=true \\
  --v=2 \\
  --node-monitor-period=5s
  --node-monitor-grace-period=40s
  --controllers stringSlice Default: [*]
  A list of controllers to enable. '*' enables all on-by-default controllers, 'foo' enables the controller
  named 'foo', '-foo' disables the controller named 'foo'.
  POD Eviction Timeout = 5m
  All controllers: attachdetach, bootstrapsigner, clusterrole-aggregation, cronjob, 
  srapproving,
  --pod-eviction-timeout=5m0s
  csrcleaner, csrsigning, daemonset, deployment, disruption, endpoint, garbagecollector,
  horizontalpodautoscaling, job, namespace, nodeipam, nodelifecycle, persistentvolume-binder,
  persistentvolume-expander, podgc, pv-protection, pvc-protection, replicaset, replicationcontroller,
  ```

- **복제 컨트롤러(Replication Controller)**: 복제 세트 내의 Pod 상태를 모니터링하며, Pod가 죽으면 새로운 Pod를 생성하여 항상 지정된 수의 Pod가 유지되도록 합니다.

## Kubernetes의 다양한 컨트롤러들

위에서 다룬 두 개의 컨트롤러는 Kubernetes의 많은 컨트롤러 중 일부에 불과합니다. Kubernetes의 여러 개념(예: Deployment, Service, Namespace, Persistent Volumes 등)은 모두 이러한 컨트롤러들에 의해 관리됩니다. 

## Kube Controller Manager 설치 및 설정

**Kube Controller Manager**는 여러 컨트롤러가 하나로 묶여 있는 단일 프로세스입니다. 이를 설치하고 실행하면 여러 컨트롤러가 함께 설치됩니다.

### 설치 방법
1. Kubernetes 릴리스 페이지에서 **Kube Controller Manager**를 다운로드합니다.
2. 압축을 풀고 서비스를 실행합니다. 실행 시 다양한 옵션을 제공하여 컨트롤러의 동작을 사용자 정의할 수 있습니다.
3. 예를 들어, **노드 컨트롤러**에 대한 설정은 `node monitor period`, `grace period`, `eviction timeout` 등입니다.

### Kube Controller Manager의 설정 확인
- **Kubeadm**을 사용하여 클러스터를 설정한 경우, Kube Controller Manager는 `kube-system` 네임스페이스 내에 Pod로 배포됩니다. Pod 정의 파일은 `/etc/kubernetes/manifest/` 폴더에 위치합니다.
- **비-kubeadm 설정**인 경우, `kube-controller-manager` 서비스는 `/etc/systemd/system/kube-controller-manager.service`에서 확인할 수 있습니다. 마스터 노드에서 실행 중인 프로세스를 확인하여 `kube-controller-manager` 옵션을 검사할 수 있습니다.
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
  kube-system kube-system kube-controller-manager-master 1/1 Running 0 15m
  kube-controller-manager-master 1/1 Running 0 15m
  kube-system kube-proxy-lzt6f 1/1 Running 0 16m
  kube-system kube-proxy-lzt6f 1/1 Running 0 16m
  kube-system kube-proxy-zm5qd 1/1 Running 0 16m
  kube-system kube-proxy-zm5qd 1/1 Running 0 16m
  kube-system kube-scheduler-master 1/1 Running 0 15m
  kube-system kube-scheduler-master 1/1 Running 0 15m
  kube-system weave-net-29z42 2/2 Running 1 16m
  kube-system weave-net-29z42 2/2 Running 1 16m
  kube-system weave-net-snmdl 2/2 Running 1 16m 
  ```

```yaml
cat /etc/kubernetes/manifests/kube-controller-manager.yaml
spec:
containers:
- command:
- kube-controller-manager
- --address=127.0.0.1
- --cluster-signing-cert-file=/etc/kubernetes/pki/ca.crt
- --cluster-signing-key-file=/etc/kubernetes/pki/ca.key
- --controllers=*,bootstrapsigner,tokencleaner
- --kubeconfig=/etc/kubernetes/controller-manager.conf
- --leader-elect=true
- --root-ca-file=/etc/kubernetes/pki/ca.crt
- --service-account-private-key-file=/etc/kubernetes/pki/sa.key
- --use-service-account-credentials=true
```

```bash
cat /etc/systemd/system/kube-controller-manager.service
[Service]
ExecStart=/usr/local/bin/kube-controller-manager \\
--address=0.0.0.0 \\
--cluster-cidr=10.200.0.0/16 \\
--cluster-name=kubernetes \\
--cluster-signing-cert-file=/var/lib/kubernetes/ca.pem \\
--cluster-signing-key-file=/var/lib/kubernetes/ca-key.pem \\
--kubeconfig=/var/lib/kubernetes/kube-controller-manager.kubeconfig \\
--leader-elect=true \\
--root-ca-file=/var/lib/kubernetes/ca.pem \\
--service-account-private-key-file=/var/lib/kubernetes/service-account-key.pem \\
--service-cluster-ip-range=10.32.0.0/24 \\
--use-service-account-credentials=true \\
--v=2
Restart=on-failure
RestartSec=5
```

```bash
ps -aux | grep kube-controller-manager
root 1994 2.7 5.1 154360 105024 ? Ssl 06:45 1:25 kube-controller-manager --
address=127.0.0.1 --cluster-signing-cert-file=/etc/kubernetes/pki/ca.crt --cluster-signing-
key-file=/etc/kubernetes/pki/ca.key --controllers=*,bootstrapsigner,tokencleaner --
kubeconfig=/etc/kubernetes/controller-manager.conf --leader-elect=true --root-ca-
file=/etc/kubernetes/pki/ca.crt --service-account-private-key-file=/etc/kubernetes/pki/sa.key
--use-service-account-credentials=true
```
## 결론

**Kube Controller Manager**는 Kubernetes의 핵심 컴포넌트로, 클러스터 내 여러 컨트롤러를 관리하고 시스템을 안정적으로 운영하는 중요한 역할을 합니다. 클러스터를 관리하고 설정하는 데 있어 이 컨트롤러에 대한 이해는 매우 중요합니다.

