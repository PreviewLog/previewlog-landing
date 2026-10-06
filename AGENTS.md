# PreviewLog Landing AI 에이전트 운영 지침 (Wiki Memory 연동)

이 저장소는 **PreviewLog 공식 랜딩페이지** (`previewlog.bldnex.com`) 프로젝트입니다. 이 창과 모든 후속 AI 세션은 아래의 위키 메모리(Wiki Memory) 운영 규칙을 최우선으로 따릅니다.

---

## 1. 위키 메모리(Wiki Memory) 필수 참조 및 운영 원칙

작업을 시작하기 전과 완료한 후에는 반드시 `docs/wiki/` 디렉터리의 문서를 확인하고 갱신합니다.

* **사전 확인 (`docs/wiki/README.md`)**:
  * [context.md](docs/wiki/context.md): 사업·브랜드·고객·전환 목표 및 가격·체험판 정책
  * [decisions.md](docs/wiki/decisions.md): 이미 합의된 디자인·콘텐츠·기술 결정 이력
  * [architecture.md](docs/wiki/architecture.md): 현재 웹사이트 구현 구조 및 배포 파이프라인
  * [roadmap.md](docs/wiki/roadmap.md): 최신 상태 및 남은 과제

* **사후 갱신 의무**:
  * 새로운 기술적 결정, 콘텐츠 합의, 설계 변경이 발생하면 즉시 `docs/wiki/decisions.md`에 `YYYY-MM-DD` 형식으로 기록합니다.
  * 파일 구조나 동작 방식이 바뀌면 `docs/wiki/architecture.md`를 같은 작업에서 갱신합니다.
  * 진행 상태나 다음 과제가 변경되면 `docs/wiki/roadmap.md`를 최신화합니다.

---

## 2. 핵심 개발 및 설계 제약 사항 (절대 준수)

1. **단일 진실 공급원 및 제품 정체성**:
   * 제품 상세 기획 및 정책의 원문은 `previewlog` 프로젝트의 기획 문서와 법적 정책 규격(`docs/05_legal/`)입니다.
   * `bldnex.com`의 미니멀 에디토리얼 스타일과 구분되는, **전문 영상 작업용 다크 NLE(Non-Linear Editing) 컴패니언 스타일**의 시각적 밀도와 정체성을 유지합니다.
   * 임의로 가짜 성과 수치, 인원 규모, 고객 후기, 무료 평생 라이선스 등의 근거 없는 주장을 지어내지 않습니다.

2. **비즈니스 및 라이선스 정책 불변 원칙**:
   * **14일 무료 체험판**: 결제 수단(신용카드) 등록 없이 시작되며, 만료 후 자동으로 유료 전환되지 않습니다.
   * **단일 연간 구독**: 연 120,000원 + VAT 10% (최종 132,000원) / 글로벌 USD 100/년. (월간 구독이나 평생 라이선스는 제공하지 않음)
   * **기기 등록**: 1개 라이선스당 등록 가능 기기는 1대이며, 기기 교체는 연 1회로 제한됩니다.
   * **데이터 보존**: 구독이 만료되어도 사용자의 로컬 드라이브에 저장된 기존 프로젝트와 결과 파일은 영구 보존됩니다.

3. **호스팅 및 배포 (`Cloudflare Pages`)**:
   * 소스 파일의 배포 루트는 `site/` 디렉터리입니다.
   * `previewlog.bldnex.com`은 Cloudflare Worker(`previewlog-license-server`)의 304 캐시 친화적 프록시를 통해 서비스됩니다.
   * 배포 전후 정적 파일 경로와 상대 경로 링크 무결성을 확인합니다.
