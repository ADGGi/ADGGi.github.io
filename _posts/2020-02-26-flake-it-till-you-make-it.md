---
layout: post
category: iceberg
title: ICEBERG란
subtitle: What Is APACHE ICEBERG
cover-img: /assets/img/iceberghead.jpg
thumbnail-img: /assets/img/WhatIsIceberg.png
share-img: /assets/img/iceberghead.jpg
tags: [iceberg, datalake]
author: ADGGi
---

<div class="alert alert-block alert-info">
- HDFS등의 스토리지 시스템의 대규모 분석 데이터셋을 위한 오픈소스 테이블 포맷<br/>
- Netflix에서 parquet 파일에 대한 데이터 관리 및 구조화에 초점을 맞추어 시작한 프로젝트를 오픈소스화 한 것으로, 대용량의 장기보존 데이터가 많은 분석용 데이터레이크에서 사용하는 것에 초점을 두어 발전.<br/>
- Iceberg는 규모, 유용성, 성능 관련 문제를 포함하여 매우 큰 데이터셋을 작업할 때 Apache Hive에서 발생하는 문제를 해결하기 위해 구축되었음.<br/></div>
<br/>
<br/>
<div class="alert alert-block alert-info"><b>User-Experience Features</b></div>
> 1. 스키마 진화(Schema Evolution)<br/>
> Iceberg의 schema evolution 지원을 통해 사용자는 테이블을 다시 생성할 필요 없이 테이블의 열을 추가,삭제, 이름 바꾸기, 업데이트 및 재정렬이 가능하다. 새로 생성된 모든 열에 고유 ID를 할당하고 이를 자동으로 메타데이터에 추가하여 스키마 변경에 부작용이 없도록 보장함.<br/>
> <br/>
> 2. 숨겨진 파티셔닝(Hidden Partitioning)<br/>
> Iceberg는 테이블 파티셔닝을 숨기고 추가 쿼리 필터 없이 지정된 쿼리와 관련된 레코드를 찾는다.
또한 데이터가 확장됨에 따라 테이블의 스키마와 파티션도 발전하여, 올바른 값을 반환하기 위해 완벽한 쿼리 필터를 생성해야 하는 Hive와 다르다.<br/>
> <br/>
> 3. 시간여행(Time Travle)<br/>
> 버전 관리 기능을 사용하여 추가, 업데이트, 삭제 등 향후 참조를 위해 데이터에 대한 모든 변경 사항을 저장할 수 있다. <br/>
> 현재 버전의 데이터에 문제가 있는 경우 이전 버전으로의 롤백이 쉽게 가능하여 데이터의 손실을 막을 수 있다.<br/>
> 이는 과거 데이터와 현재 데이터의 비교가 가능함을 의미한다.<br/>
<br/>
<br/>
<div class="alert alert-block alert-info"><b>Reliability Features</b></div>
> 1. 스냅샷 격리(Snapshot isolation)<br/>
> 데이터셋을 읽을 때마다 일관된 스냅샷이 표시되도록 보장합니다. 본질적으로 read가 실행 될 당시 존재했던 마지막 커밋된 값을 읽습니다.<br/>
> 2. 원자적 커밋(Atomic Commits)<br/>
> Iceberg는 atomic commit을 통해 모든 쿼리에서 데이터의 일관성을 유지한다.<br/>
> 이는 데이터셋에 대한 모든 업데이트를 완료하거나 부분적인 변경을 방지하기 위해 변경 사항을 전혀 저장하지 않음을 의미한다.<br/>
> 3. 안정적인 읽기(Reliable reads)<br/>
> Iceberg의 모든 트랜잭션(update, add, drop)은 새로운 스냅샷을 생성한다.<br/>
> 이렇게 하면 독자는 각 업데이트의 여러 마지막 버전을 활용하여 테이블에 대한 신뢰할 수 있는 쿼리를 생성한다.<br/>
> 4. File-level Operations<br/>
> 기존 카탈로그를 사용하여 원자적 변경을 수행하는 것은 불가능 하거나 매우 지루한 일이 될 수 있다.<br/>
> 기존 카탈로그는 위치나 이름으로 레코드를 추적하기 때문에 단일 레코드를 업데이트하기 전에 디렉터리를 통해 읽은 다음 파티션을 분할해야 한다.<br/>
> 그러나 아이스버그를 사용하면 폴더를 변경하지 않고도 단일 레코드를 직접 대상으로 지정하여 업데이트할 수 있다. 이는 해당 메타데이터에 저장된 레코드 때문에 가능하다.<br/>
<br/>
<br/>
<div class="alert alert-block alert-info"><b>장점</b></div>
> 1. 소규모 업데이트에 효울적
> 파일 형식과 달리 Iceberg는 폴더 수준이 아닌 파일 수준에서 레코드를 가져온다.<br/>
> 이렇게 하면 더 이상 폴더를 거친 후 파티션을 분할하여 레코드를 업데이트할 필요가 없기 때문에 단일 레코드를 업데이트하는 것이 쉽다.<br/>
> 전체 디렉터리를 업데이트하지 않고도 단일 레코드를 대상으로 지정하여 업데이트할 수 있습니다.<br/>
> 2. 더 빠른 실행<br/>
> 파일 수준의 데이터 정보를 메타데이터에서 얻을 수 있어 쿼리엔진이 더 빠르고 효과적인 쿼리를 수행하게 한다.<br/>
> 3. 다양한 도구 및 엔진 선택<br/>
> Apache Iceberg는 설계상 오픈 소스이므로 모든 도구나 쿼리 엔진으로부터 독립적이다.<br/>
> 사용자는 작업할 엔진을 선택할 수 있으므로 벤더에 구애받지 않는다.<br/>
> 또한 데이터에 손상을 입히지 않고 둘 이상의 쿼리 엔진을 동시에 사용할 수 있도록 지원한다.<br/>
> 아이스버그가 지원하는 쿼리 엔진에는 Dremio, Spark, Flink, Snowflake, Cloudera 및 Trino 등이 있다.<br/>
<br/>
<br/>
<div class="alert alert-block alert-info"><b>Hive Table</b></div>
> Hive는 데이터를 Hive Meta Store (RDB) 와 데이터로 나뉘어서 관리한다.<br/>
> 0.13버전 이후로 transaction을 지원하는데, 파일 수정이 없는 hdfs의 특성상 완벽하게 지원하지는 않는다.<br/>
> 데이터의 update, delete 작업 시 base파일에 기록하고, 트랜잭션이 발생하면 delta파일에 내용을 기록한다.<br/>
> 이후 파일을 읽을 때 베이스 파일에 델타파일의 내용을 적용하여 수정된 내용을 읽는다.<br/>
> base 파일의 집합으로 테이블의 데이터를 생성.<br/>
> 내용이 수정될 때 delta 파일 생성.<br/>
> - 문제점<br/>
> (1) 완벽하게 ACID를 지원하지 않는다.<br/>
> (2) 병목현상 : RDB인 HMS에서 데이터가 쌓일수록 병목현상 발생지점 많아짐<br/>
> (3) 스키마확장성 미지원 <br/>
>      메타데이터를 직접 관리하지 않기 때문에 스키마를 확장 할 수 없다.<br/>
>      파티션이나 스키마의 변경 시 테이블을 지우고 다시 생성해야 한다.<br/>
> (4) latency<br/>
>      데이터 조회 시 HMS(RDB) 조회 후 hdfs의 파일에서 데이터를 추려 반환하는데
       파일의 목록이 쌓일수록 latency 문제가 발생하고,<br/>
>      compactor가 압축을 하는 도중에는 table을 일시적으로 사용할 수 없다.<br/>
<br/>
<br/>
<div class="alert alert-block alert-info"><b>Compactor</b></div>
> Compactor는 ACID 지원을 위해 Metastore 내에서 실행되는 백그라운드 프로세스의 집합을 말한다.<br/>
> 1.delta파일 압축(Delta File Compaction) <br/>
> 테이블의 수정 작업이 계속 발생할수록 delta 파일도 계속 생성되기 때문에, 적절한 성능 유지를 위해 압축 수행<br/>
>    1-1.major compactor<br/>
>           하나 이상의 delta 파일과 버킷의 base 파일을 가져와 새로운 base파일을 생성<br/>
>    1-2.minor compactor<br/>
>           기존의 delta 파일 세트를 가져와서 새로운 단일 delta 파일 생성<br/>
>    1-3.rebalance compactor<br/>
>           hive는 내부적으로 성능 향상을 위해 버킷이 명시적으로 지정되지 않은 테이블에 대해서도 버킷 파일을 생성한다.<br/>
>           사용량에 따라 명시적으로 버킷이 지정되지 않은 full-acid ORC 테이블에 로드된 데이터는 일부 버킷이 다른 버킷보다 훨씬 큰 불균형 분포로 이어질 수 있다.<br/>
           이런 불균형 테이블은 더 큰 버킷을 읽기 위해 더 많은 시간을 써야 하므로 성능 저하를 초래한다.<br/>
           rebalance compactor는 암시적 버킷 파일 간에 데이터를 균등하게 재분배하여 문제를 해결한다.<br/>
> 2.initiator<br/>
> 압축이 필요한 테이블 또는 파티션을 검색한다.<br/>
> 각 압축 작업은 1개의 파티션 또는 테이블이 분할되지 않은 경우 전체 테이블을 처리한다.<br/>
> 3.worker<br/>
> 각 worker는 단일 압축 작업을 처리한다.<br/>
> 각 압축 작업은 1개의 파티션 또는 테이블이 분할되지 않은 경우 전체 테이블을 처리한다.<br/>
> 4.cleaner<br/>
> 압축이 완료되면 delta 파일이 더 이상 필요하지 않다고 판단되면 삭제한다.<br/>
> 5.AcidHouseKeeperService<br/>
> heartbeat를 주고 받으며, heartbeat가 오지 않은 트랜잭션을 중단한다.<br/>
