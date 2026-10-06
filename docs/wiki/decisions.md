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
