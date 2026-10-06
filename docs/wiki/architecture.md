# 시스템 구조 (Architecture)

## 1. 디렉터리 및 파일 구조

배포 대상 정적 웹 루트는 `site/` 디렉터리입니다.

```
previewlog-landing/
├── AGENTS.md                  # AI 에이전트 위키 메모리 운영 규칙
├── docs/wiki/                 # 위키 메모리 문서 보관소
│   ├── README.md
│   ├── context.md
│   ├── decisions.md
│   ├── architecture.md
│   └── roadmap.md
├── site/                      # 공개 정적 웹 사이트 배포 루트
│   ├── index.html             # 메인 랜딩페이지
│   ├── styles.css             # 메인 스타일시트
│   ├── tokens.css             # 디자인 토큰
│   ├── main.js                # 네비게이션, FAQ, 대기자 폼 제출 처리
│   ├── privacy.html           # 개인정보 처리방침
│   ├── terms.html             # 이용약관
│   ├── refund.html            # 환불 및 구독 정책
│   ├── refund-policy.html     # 데스크톱 앱 연동용 정책 사본
│   ├── requirements.html      # 시스템 요구사항 상세
│   ├── install.html           # 설치 가이드
│   ├── changelog.html         # 변경 기록
│   ├── _redirects             # Cloudflare Pages 리다이렉트 규칙
│   └── assets/                # 브랜드 로고 및 정적 그래픽 에셋
└── apps-script/               # Google Sheets 연동 대기자 수집 스크립트 초안
```

## 2. 호스팅 및 배포 파이프라인

- **호스팅**: Cloudflare Pages (`previewlog-landing.pages.dev`)
- **빌드 및 배포 방식**:
  - Direct Upload 방식으로 관리되며, `npx wrangler pages deploy site --project-name previewlog-landing --branch main`으로 운영 Pages에 즉시 반영됩니다.
  - Framework Preset: `None`
  - Build Command: (없음 / 순수 정적 파일)
  - Build Output Directory: `site`
- **도메인 라우팅 (`previewlog.bldnex.com`)**:
  - `previewlog.bldnex.com`은 Cloudflare Worker `previewlog-license-server`에 연결되어 있습니다.
  - 데스크톱 앱의 라이선스, 인증, Paddle 결제 웹훅, R2 릴리스 다운로드 요청은 Worker가 직접 처리합니다.
  - 대기자 등록 요청(`POST /api/waitlist`)은 Worker가 직접 수신하여 Cloudflare D1(`waitlist` 테이블)에 기록하고, 중복 등록 검사 및 Resend 관리자 알림을 처리합니다.
  - 정적 웹 라우트(`/`, `/privacy`, `/terms`, `/refund`, `/styles.css` 등)는 Worker가 `previewlog-landing.pages.dev`로 투명하게 역방향 프록시(Reverse Proxy)합니다.
  - 304 Not Modified 및 리다이렉트 응답을 보존하여 브라우저 캐시를 효율적으로 활용합니다.

## 3. 대기자 등록 파이프라인 (`/api/waitlist`)

- **클라이언트**: `site/main.js`의 `.waitlist-form` 이벤트 핸들러가 동일 출처 `POST /api/waitlist`로 JSON 페이로드 전송.
- **서버 처리**:
  - Honeypot 봇 필터링 (히든 필드 입력 시 무응답 가상 성공 반환)
  - 이메일 및 필수 동의 서버 검증
  - D1 `waitlist` 테이블 조회 후 중복 여부 확인
  - 신규 등록 시 `created_at` Unix 초 단위 저장
  - 신규 등록 시 Resend API를 통해 관리자(`BILLING_ALERT_EMAIL`) 비동기 알림 전송 (`ctx.waitUntil`)
- **관리자 조회**: `GET /admin/waitlist` (Bearer `ADMIN_API_SECRET` 인증 필요)
