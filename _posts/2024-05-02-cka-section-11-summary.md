---
layout: post
title: "[Udemy CKA Course] Section11 - Docker와 containerD, 그리고 Kubernetes: 컨테이너 런타임의 변화"
date: 2024-05-02 20:00:00 +0900
categories: [Cloud, CKA]
tags: [CKA, k8s]
author: "ADG"
---
이 포스팅은 [Certified Kubernetes Administrator with Practice Tests](https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/) 강의를 듣고 요약한 내용입니다.

### Docker와 containerD, 그리고 Kubernetes의 관계

초기 컨테이너 시대에는 Docker만 있었고, Kubernetes는 Docker를 오케스트레이션하기 위해 만들어졌습니다.  
Docker의 사용 편리성 덕분에 컨테이너 관리의 주도적인 툴이 되었고, Kubernetes는 Docker와 밀접하게 결합되어 있었습니다.  
그러나 시간이 지나면서 Kubernetes는 Docker 외에도 다양한 컨테이너 런타임 지원이 필요해졌습니다.  
이를 위해 **Container Runtime Interface(CRI)**가 도입되었고, Docker는 CRI를 따르지 않기 때문에 Kubernetes는 Docker를 지원하기 위해 **dockershim**을 사용했습니다.

## What is CRI (Container Runtime Interface)?

**CRI (Container Runtime Interface)**는 **Kubernetes**가 컨테이너 런타임과 상호작용할 수 있도록 표준화된 인터페이스입니다. Kubernetes가 다양한 컨테이너 런타임을 지원할 수 있게 해주는 중요한 인터페이스로 CRI 덕분에 Kubernetes는 Docker뿐만 아니라 다른 런타임들과도 잘 통합되어 유연한 컨테이너 오케스트레이션 환경을 제공합니다.

>#### CRI의 주요 목적:
>- **컨테이너 런타임의 표준화**: Kubernetes는 여러 종류의 컨테이너 런타임을 사용할 수 있습니다.  
>CRI는 이를 위해 컨테이너 런타임 간의 호환성 문제를 해결하고 표준화된 방식으로 Kubernetes와 >연결될 수 있게 합니다.
>  
>- **런타임 독립성**: CRI는 Kubernetes가 특정 컨테이너 런타임에 의존하지 않도록 만듭니다.  
>예를 들어, Docker 외에도 **containerD**, **cri-o**, **rkt**와 같은 다양한 런타임을 사용할 수 있도록 해줍니다.
>
>#### CRI의 동작 방식:
>- **컨테이너 런타임**: 컨테이너를 생성하고 관리하는 소프트웨어입니다. Docker와 같은 런타임은 오랫동안 Kubernetes와 함께 사용되었습니다.  
>하지만 Kubernetes가 다양한 런타임을 지원하려면 표준화된 인터페이스가 필요했습니다.
>  
>- **CRI의 역할**: CRI는 Kubernetes와 컨테이너 런타임 간의 통신을 표준화하여 Kubernetes가 런타임의 세부 구현에 의존하지 않도록 합니다. 이를 통해 Kubernetes는 다양한 컨테이너 런타임을 지원할 수 있습니다.
>
>#### CRI가 도입된 이유:
>- **Docker와의 결합 문제**: Kubernetes는 처음에 Docker와 함께 사용되었지만, Docker는 CRI와 호환되지 않았습니다.  
>그래서 Kubernetes는 **dockershim**이라는 임시 솔루션을 만들어 Docker를 CRI와 연결했지만, 이 방식은 나중에 비효율적이었고 유지보수가 어려웠습니다.  
>그래서 CRI가 도입되었고, 이는 Kubernetes가 Docker 외에도 다른 런타임을 쉽게 지원할 수 있게 만들어 주었습니다.
>
>#### CRI의 주요 컴포넌트:
>- **Container Runtime**: 컨테이너를 실행하고 관리하는 소프트웨어 (예: containerD, cri-o).
>- **kubelet**: Kubernetes 노드에서 실행되는 에이전트로, CRI를 사용하여 컨테이너 런타임과 통신합니다.
>
>#### CRI를 통해 Kubernetes에서 사용할 수 있는 런타임:
>- **containerD**: Docker의 일부로 시작되었지만, 이제는 독립적인 컨테이너 런타임으로 사용됩니다.
>- **cri-o**: Kubernetes에 최적화된 컨테이너 런타임입니다.
>- **rkt**: CoreOS에서 개발한 또 다른 런타임으로, CRI를 통해 Kubernetes와 함께 사용할 수 있습니다.

**containerD**는 Docker의 일부였지만, 현재는 독립적인 프로젝트로 운영되고 있으며, Kubernetes와 호환되는 런타임으로 작동할 수 있습니다. 결국 Kubernetes는 **1.24 버전**부터 Docker에 대한 지원을 중단하고, Docker를 별도로 사용하는 대신 containerD를 사용하도록 유도하고 있습니다.

---

## 컨테이너 실행 도구들

1. **ctr**
   - **containerD**의 커맨드라인 툴로, 주로 디버깅 용도로 사용됩니다.
     이 툴은 기본적인 컨테이너 관련 작업(예: 이미지 풀, 컨테이너 실행 등)을 할 수 있지만, 사용하기 어려운 점이 많고, 프로덕션 환경에서는 적합하지 않습니다.
   
2. **nerdctl**
   - **Docker**와 유사한 CLI 툴로, **containerD**와 함께 사용됩니다.
     Docker의 많은 명령어를 대체할 수 있으며, 최신 containerD 기능을 사용할 수 있습니다.
     예를 들어, 암호화된 컨테이너 이미지, lazy pulling, P2P 이미지 배포 등 Docker에서 지원하지 않는 기능들을 제공합니다.

3. **crictl**
   - **Kubernetes**에서 사용하는 **CRI**와 호환되는 런타임을 관리하는 CLI 툴입니다.
     이 툴은 주로 컨테이너의 디버깅과 검사용으로 사용되며, 컨테이너 생성보다는 상태 점검과 로깅 등을 위한 기능을 제공합니다. 

---

## 툴 간 비교

| 툴          | 목적        | 특징                                                                                             |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------ |
| **ctr**     | 디버깅용    | 기능이 제한적이며, 주로 컨테이너 상태 점검 및 디버깅을 위한 툴. 일반적인 작업에는 적합하지 않음. |
| **nerdctl** | 일반 작업용 | Docker와 유사한 CLI로, 컨테이너 관리에 적합. containerD의 최신 기능 지원.                        |
| **crictl**  | 디버깅용    | CRI 지원 런타임 관리용 툴. Kubernetes에서 주로 사용되며, 다양한 런타임과 상호작용 가능.          |

---

## 결론

- **ctr**: 디버깅용으로만 사용되며, 기능이 제한적이므로 일반적인 작업에는 적합하지 않습니다.
- **nerdctl**: Docker와 유사하게 사용할 수 있는 툴로, 일반적인 컨테이너 관리에 적합하며 최신 containerD 기능을 지원합니다.
- **crictl**: Kubernetes에서 사용하는 CRI 지원 런타임 관리 도구로, 디버깅용으로 사용됩니다.

Docker와 containerD는 Kubernetes와 함께 발전해 왔으며, 각 툴은 그 역할에 맞는 기능을 제공하고 있습니다.
이제 Kubernetes는 Docker를 더 이상 지원하지 않지만, Docker로 빌드된 이미지는 여전히 containerD에서 실행 가능합니다.
이를 통해 Kubernetes와 컨테이너 관리 툴의 변화와 발전을 이해할 수 있습니다.
