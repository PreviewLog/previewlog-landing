# 결정 기록 (Decisions)

## 2026-10-06 — 디렉터리 단일화 (`site/`)
- 배포 테스트용으로 임시 생성되었던 `deploy/` 디렉터리를 제거하고 모든 소스 및 배포 대상 디렉터리를 `site/`로 일원화했습니다.

## 2026-10-06 — FOUC 제거 및 CTA 일원화
- 자바스크립트(`main.js`) 런타임에서 버튼 텍스트를 "출시 알림 받기"로 치환하던 코드를 제거하여 첫 렌더링 시 깜빡임(FOUC)을 방지하고, HTML 원본 마크업 단계에서 CTA를 통일했습니다.

## 2026-10-06 — 헤드라인 A안 채택
- 히어로 메인 헤드라인을 직관적이고 고통 중심적인 카피인 **"촬영본 10시간, 처음부터 다 보지 마세요"**로 확정 적용했습니다.

## 2026-10-06 — 법적 정책 페이지 독립 신설
- Paddle 및 전자상거래 규격에 맞추어 `site/privacy.html`, `site/terms.html`, `site/refund.html`, `site/refund-policy.html` 및 `site/_redirects`를 구축했습니다.
- 구매 직후 환불 접수 원칙, 법령상 보장되는 권리, 결제 후 7일 이내 미활성화 시 전액 청약철회, 연 1회 기기 변경 제한 명문화.

## 2026-10-06 — 전문 NLE 다크 인터페이스 비주얼 개편
- 밋밋하고 AI가 생성한 듯했던 목업 비주얼을 탈피하여, 실제 영상 편집실에서 사용하는 macOS 다크 NLE 룩앤필(창 상단 제어 바, 비디오 필름스트립, 무음 경고 구간이 포함된 오디오 파형 타임라인, Whisper Korean 인스펙터, CoreML 뱃지)로 전면 개편했습니다.

## 2026-10-06 — Cloudflare 배포 및 Worker 프록시 연동
- GitHub `PreviewLog/previewlog-landing` 레포지토리를 Cloudflare Pages(`previewlog-landing`)에 배포했습니다.
- `previewlog.bldnex.com` 도메인은 기존 라이선스 서버 Worker(`previewlog-license-server`)에서 정적 라우트를 투명 역방향 프록시하여 서비스하도록 연결했습니다.

## 2026-10-06 — 304 Not Modified 캐시 통과 처리
- 브라우저 새로고침(F5) 시 `If-None-Match` 조건부 요청에 대해 업스트림 Pages가 304를 반환할 때, `proxyRes.ok`(200~299만 true) 검사로 인해 404로 빠져 스타일이 깨지던 결함을 `proxyRes.status < 400` 조건으로 수정해 완전 해결했습니다.

## 2026-10-06 — 다운로드 섹션 2단 그리드 대기자 등록 카드 개편
- `.download-card` 내부를 좌측 텍스트 정보(`.download-info`)와 우측 독립 카드 형태의 대기자 등록창(`.waitlist-card`)으로 분리하고, 2단 그리드(`minmax(0, 1.15fr) minmax(360px, 440px)`)를 적용하여 뷰포트 변화에도 우측에 안정적으로 고정되도록 디자인을 정돈했습니다.

## 2026-10-06 — 대기자 등록 자체 엔드포인트(`POST /api/waitlist`) 및 D1 연동
- 구글 스프레드시트(Apps Script `no-cors`) 의존성을 제거하고, 빌드넥스 본사 인프라 철학과 일치하는 Cloudflare Worker + D1 기반의 자체 엔드포인트(`POST /api/waitlist`)로 단일화했습니다.
- `previewlog-license-server` Worker에서 `POST /api/waitlist`를 직접 수신하여 D1 `waitlist` 테이블에 보관하며, `main.js`는 표준 JSON 통신을 통해 중복 등록(`duplicate: true`) 및 성공 여부를 정밀하게 피드백합니다.
- 운영자 조회를 위한 인증 보호 엔드포인트(`GET /admin/waitlist`)와 허니팟(honeypot) 봇 필터링, Resend 관리자 알림 연동을 포함했습니다.

## 2026-10-06 — 관리자 대시보드(`previewlog-admin`) 대기자 관리 UI 및 CSV 내보내기 도입
- `previewlog-admin.bldnex.com` 관리자 대시보드에 독립적인 [대기자 명단] 탭을 구축했습니다.
- 브라우저 localStorage에 보관되는 `ADMIN_API_SECRET`을 통해 대기자 현황 테이블 조회 및 UTF-8 BOM 지원 원클릭 CSV 다운로드가 가능합니다.
- 빌드넥스 본사 사이트(`bldnex.com`)와의 무리한 DB 통합 없이 PreviewLog 단독 관리자 GUI 내에서 운영을 완결하도록 결정했습니다.

## 2026-10-06 — 기능 설명 및 내보내기 카피 현실화 (자막과 마커)
- 추상적인 'NLE 연동' 표현 대신 실제 데스크톱 앱 내보내기 기능 명칭 및 사양에 맞춰 카피를 정밀하게 일치시켰습니다.
- 히어로 플로팅 노트: "자막과 편집 마커" (Premiere · DaVinci Resolve 연동)
- 내보내기(Outputs) EDITORIAL 카드: 제목을 "자막과 마커"로 변경하고, "촬영 파일마다 자막(SRT·VTT)과 편집 마커(CSV)를 냅니다. Premiere·DaVinci Resolve 같은 편집 프로그램으로 가져갈 때 씁니다."로 수정.
- 가격(Pricing) 포함 내역: "자체 포함 HTML · 자막(SRT·VTT)과 편집 마커(CSV)"로 명시.

## 2026-10-06 — 자막(SRT·VTT) 및 마커(CSV) 편집 도구 호환성 안내 기준 수립
- 제품 기획 검토 결과에 따라 내보내기 파일의 NLE 호환성 가이드를 `context.md` 및 `site/requirements.html`에 명문화했습니다.
- 자막: Premiere Pro와 DaVinci Resolve 공통 자막 트랙 호환 포맷으로 SRT를 기본 권장, VTT는 DaVinci Resolve 지원(Premiere는 SRT 권장).
- 마커: CSV에 컷·대사 위치, 색상, 설명, QC 내용을 기록하며 버전별 편차에 따라 외부 가져오기 도구 또는 타임코드 인덱스로 활용하도록 정리.
- `requirements.html` 내 라이선스 기기 정책 문구(2대 동시 사용 오기재)를 단일 진실 공급원(1대 등록, 연 1회 교체)에 맞게 정정.
