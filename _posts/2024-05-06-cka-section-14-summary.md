---
layout: post
title: "[Udemy CKA Course] Section14 - ETCD Command(Optional)"
date: 2024-05-06 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

## ETCDCTL 유틸리티란?

ETCDCTL은 ETCD와 상호작용할 수 있는 명령줄 도구입니다. 이 도구를 사용하여 ETCD 서버와 상호작용할 수 있으며, 두 가지 API 버전(Version 2 및 Version 3)을 지원합니다. 기본적으로 ETCDCTL은 Version 2를 사용하도록 설정되어 있습니다.

### ETCDCTL Version 2 명령어 예시:

```bash
etcdctl backup
etcdctl cluster-health
etcdctl mk
etcdctl mkdir
etcdctl set
```

### ETCDCTL Version 3 명령어 예시:

```bash
etcdctl snapshot save
etcdctl endpoint health
etcdctl get
etcdctl put
```

### API 버전 설정

ETCDCTL의 API 버전은 환경 변수 ETCDCTL_API로 설정할 수 있습니다. Version 3을 사용하려면 아래 명령어로 설정합니다.

```bash
export ETCDCTL_API=3
```

API 버전을 설정하지 않으면 기본적으로 Version 2로 설정되며, 이 경우 Version 3 명령어는 작동하지 않습니다. 반대로, Version 3을 설정한 경우 Version 2 명령어는 작동하지 않습니다.

인증서 파일 경로 설정
ETCDCTL이 ETCD API 서버에 인증할 수 있도록 인증서 파일 경로를 지정해야 합니다. 인증서 파일은 etcd-master에 위치해 있으며, 보통 아래 경로에 있습니다

```bash
--cacert /etc/kubernetes/pki/etcd/ca.crt     
--cert /etc/kubernetes/pki/etcd/server.crt     
--key /etc/kubernetes/pki/etcd/server.key
```

명령어 예시
다음은 인증서와 API 버전 설정을 포함한 ETCDCTL 명령어의 예시입니다

```bash
kubectl exec etcd-master -n kube-system -- sh -c "ETCDCTL_API=3 etcdctl get / --prefix --keys-only --limit=10 --cacert /etc/kubernetes/pki/etcd/ca.crt --cert /etc/kubernetes/pki/etcd/server.crt --key /etc/kubernetes/pki/etcd/server.key"
```
이 명령어는 ETCD 데이터베이스에서 키 목록을 가져오는 예시입니다. --cacert, --cert, --key 옵션을 사용하여 인증서를 지정하고, ETCDCTL_API=3을 통해 Version 3 API를 사용하고 있습니다.