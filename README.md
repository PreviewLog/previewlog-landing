# PreviewLog landing site

PreviewLog 앱 소개와 출시 안내를 위한 정적 랜딩페이지입니다.
호스팅 주소: `https://previewlog.bldnex.com`

## Local Preview

```bash
# 프로젝트 루트에서 실행 시
python3 -m http.server 4187
# 브라우저에서 http://localhost:4187/site/ 열기

# 또는 site 디렉터리 내에서 직접 실행 시
cd site && python3 -m http.server 4187
# 브라우저에서 http://localhost:4187/ 열기
```

## Structure & Deploy

배포 시 Publish Directory(배포 루트)는 **`site`** 디렉터리입니다.
`site/assets/`에 브랜드 에셋이 자체 포함되어 있어 추가 빌드 단계 없이 바로 정적 호스팅(Cloudflare Pages, Netlify 등)에 배포할 수 있습니다.

- `site/index.html` — 메인 랜딩페이지
- `site/install.html` — 설치 가이드
- `site/requirements.html` — 시스템 요구사항 및 지원 비디오 포맷
- `site/changelog.html` — 릴리스 노트
- `site/privacy.html` — 개인정보 처리방침
- `site/terms.html` — 서비스 이용약관
- `site/refund.html` — 환불 및 구독 정책
- `site/tokens.css` — 디자인 시스템 토큰
- `site/styles.css` — 공통 스타일시트
- `site/main.js` — 모바일 네비게이션, FAQ 아코디언, 대기자 등록 폼, 스크롤 리빌
- `site/assets/` — 로고 및 브랜드 에셋
- `apps-script/Code.gs` — Google Sheets 연동 대기자 등록 엔드포인트 스크립트
- `LANDING_PAGE_REVIEW.md` — 랜딩페이지 검토 이력 및 가이드
