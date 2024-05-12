---
layout: post
title: "[Udemy CKA Course] Section21 - Pods With YAML"
date: 2024-05-13 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---

## Kubernetes YAML 파일의 구조

Kubernetes의 YAML 파일에는 기본적으로 네 가지 주요 필드가 포함됩니다:

1. **API version**  
2. **Kind**  
3. **Metadata**  
4. **Spec**  

### 1. **API version**
`API version`은 우리가 사용할 Kubernetes API 버전을 지정하는 필드입니다. 각 Kubernetes 리소스는 특정 API 버전에서 동작하므로, 올바른 API 버전을 사용해야 합니다.

- 예시: `apiVersion: v1`
- `v1`은 Kubernetes에서 사용하는 가장 기본적인 API 버전입니다. 다른 버전으로는 `apps/v1beta`, `extensions/v1beta` 등이 있습니다.

### 2. **Kind**
`Kind`는 우리가 생성하려는 객체의 유형을 정의합니다. 이 필드는 반드시 지정해야 하며, 예를 들어 **Pod**, **Deployment**, **ReplicaSet**, **Service** 등이 될 수 있습니다.

- 예시: `kind: Pod`

### 3. **Metadata**
`Metadata`는 해당 객체의 메타 정보를 담고 있는 필드입니다. 예를 들어 객체의 이름(`name`)과 레이블(`labels`) 등의 정보를 포함할 수 있습니다.

- `name`: 객체의 이름을 정의합니다.
- `labels`: 객체를 구분할 수 있는 키-값 쌍을 정의합니다.

```yaml
metadata:
  name: my-app-pod
  labels:
    app: my-app
    type: front-end
spec:
  containers:
   - name: nginx-container
     image: nginx
```

  ##### 주의사항
  - name과 labels는 metadata의 하위 요소로 정의됩니다.
  - 공백 들여쓰기에 주의해야 합니다.
  - 예를 들어, labels가 name과 같은 레벨이 되어서는 안 되며, metadata 하위에 속해야 합니다.
  - 들여쓰기 오류: 예를 들어, labels가 name 아래로 들여쓰기 되지 않으면, Kubernetes는 이를 잘못 해석할 수 있습니다. 따라서 각 항목은 정확하게 들여쓰기를 해야 합니다.
  ##### 레이블을 활용하는 이유:
  - 레이블을 이용하면 나중에 객체를 구분하거나 그룹화할 수 있습니다. 예를 들어, 여러 개의 Pod이 있을 때 frontend, backend, database 등으로 레이블을 붙여서 나중에 그룹화하거나 필터링할 수 있습니다.

### 4. SPEC
- Spec은 해당 객체의 세부 설정을 포함하는 섹션입니다. Pod의 경우, 이 섹션에서 컨테이너와 관련된 설정을 정의하게 됩니다.
- spec 아래에 containers 항목을 정의하고, 이 항목에서 실행할 컨테이너의 이름과 사용할 이미지를 지정합니다.
- Pod은 여러 개의 컨테이너를 가질 수 있으므로 containers는 배열로 정의합니다. 여기서는 하나의 컨테이너만 정의할 것입니다.
- 컨테이너 이름(name): 컨테이너의 이름을 정의합니다.
- 컨테이너 이미지(image): 사용할 Docker 이미지를 지정합니다. 여기서는 nginx 이미지를 사용할 것입니다.

### Pod 생성 및 확인

- Pod을 생성하려면 위의 YAML 파일을 사용하여 kubectl 명령어로 생성할 수 있습니다.
  ```bash
  #<파일이름.yml>에 정의된 리소스대로 pod가 생성
  kubectl create -f pod-definition.yml
  ```
- Pod을 생성한 후, 실제로 생성된 Pod을 확인하려면 다음 명령어를 사용합니다.
  ```bash
  kubectl get pods
  ```

- 더 자세한 정보를 확인하려면 다음 명령어를 사용합니다.
  ```bash
  kubectl describe pod my-app--pod
  ```
- 이 명령어는 다음과 같은 정보를 제공합니다:  
  (1) Pod이 생성된 시간  
  (2) Pod에 할당된 레이블  
  (3) Pod에 포함된 컨테이너의 이름 및 상태  
  (4) Pod에 관련된 이벤트 정보 등  

## 결론
- Pod을 생성하는 YAML 파일에는 다음 네 가지 주요 항목이 필요합니다:  
  (1) apiVersion: API 버전 (v1)  
  (2) kind: 객체 종류 (Pod)  
  (3) metadata: 객체의 메타 정보 (예: 이름, 레이블)  
  (4) spec: 객체의 세부 설정 (예: 컨테이너 설정)  
