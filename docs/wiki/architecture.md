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
- **빌드 설정**:
  - Framework Preset: `None`
  - Build Command: (없음 / 순수 정적 파일)
  - Build Output Directory: `site`
- **도메인 라우팅 (`previewlog.bldnex.com`)**:
  - `previewlog.bldnex.com`은 Cloudflare Worker `previewlog-license-server`에 연결되어 있습니다.
  - 데스크톱 앱의 라이선스, 인증, Paddle 결제 웹훅, R2 릴리스 다운로드 요청은 Worker가 직접 처리합니다.
  - 정적 웹 라우트(`/`, `/privacy`, `/terms`, `/refund`, `/styles.css` 등)는 Worker가 `previewlog-landing.pages.dev`로 투명하게 역방향 프록시(Reverse Proxy)합니다.
  - 304 Not Modified 및 리다이렉트 응답을 보존하여 브라우저 캐시를 효율적으로 활용합니다.
