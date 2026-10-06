# 로드맵 (Roadmap)

## 완료된 항목

- [x] 임시 `deploy/` 디렉터리 정리 및 `site/`로 소스 단일화
- [x] 자바스크립트 런타임 텍스트 치환 제거로 FOUC 방지 및 CTA 통일
- [x] SEO 메타태그, OG 태그, Twitter Card 태그, 구글 웹폰트 preconnect 적용
- [x] 히어로 헤드라인 A안 확정 ("촬영본 10시간, 처음부터 다 보지 마세요")
- [x] 법적 정책 페이지 독립 신설 (`privacy.html`, `terms.html`, `refund.html`, `refund-policy.html`)
- [x] 전문 NLE 다크 인터페이스 비주얼 목업 전면 개편
- [x] GitHub `PreviewLog/previewlog-landing` 원격 저장소 동기화
- [x] Cloudflare Pages 배포 및 `previewlog.bldnex.com` 도메인 프록시 연동
- [x] 프록시 304 Not Modified 캐시 통과 처리로 새로고침 시 스타일 깨짐 방지
- [x] 다운로드 섹션 2단 그리드 대기자 등록 카드 레이아웃 개편
- [x] AI 에이전트 위키 메모리 시스템(`AGENTS.md`, `docs/wiki/`) 도입
- [x] 대기자 등록 자체 엔드포인트 연동 (`POST /api/waitlist`, Cloudflare Worker + D1, 중복 확인 및 JSON 응답)
- [x] 기능 설명 및 내보내기 카피 현실화 (자막·마커 및 Premiere·DaVinci Resolve 연동 명시)

## 다음 과제 및 계획

1. **실제 앱 스크린샷 및 시연 영상 에셋 반영**:
   - 데스크톱 앱 정식 빌드가 나오는 시점에 실제 UI 스크린샷과 시연 영상으로 비주얼 에셋 고도화
2. **다운로드 바이너리 및 체크섬 링크 활성화**:
   - 정식 릴리스 배포 시 DMG 설치 파일 링크 및 SHA-256 체크섬 연동
