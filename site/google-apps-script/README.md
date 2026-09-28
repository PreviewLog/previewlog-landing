# Google Sheets 대기자 등록 연결

## 1. Google Sheet 준비

1. 새 Google Spreadsheet를 만듭니다.
2. URL의 `/d/`와 `/edit` 사이 문자열을 복사합니다.
3. Apps Script에서 `Code.gs`의 `SPREADSHEET_ID`에 붙여 넣습니다.

스크립트가 처음 등록될 때 `Waitlist` 시트와 헤더를 자동으로 만듭니다.

| created_at | email | role | consent | source |
| --- | --- | --- | --- | --- |

## 2. Apps Script 배포

Apps Script 편집기에서 `배포 → 새 배포`를 선택합니다.

- 유형: 웹 앱
- 실행 사용자: 나
- 액세스 권한: 모든 사용자

배포 후 `/exec` URL을 복사합니다. `/dev` URL은 사용하지 않습니다.

## 3. 랜딩페이지에 URL 등록

`site/index.html`의 아래 메타태그에 Web App URL을 넣습니다.

```html
<meta name="previewlog-signup-endpoint" content="https://script.google.com/macros/s/DEPLOYMENT_ID/exec" />
```

이후 페이지를 다시 배포하면 `출시 알림 받기` 폼이 Google Sheet에 이메일을 기록합니다.

## 개인정보 운영 메모

- 수집 항목: 이메일, 선택한 작업 유형, 동의 여부, 등록 시각
- 목적: PreviewLog 출시·설치파일 관련 알림
- 대기자 등록을 위한 별도 동의 문구를 유지합니다.
- 실제 공개 전 개인정보 처리방침에 보유기간·삭제 요청 방법·수탁 여부를 추가합니다.
- Apps Script Web App URL을 공개할 때 Sheet ID를 프론트엔드에 넣지 않습니다.

현재 프론트엔드는 브라우저 CORS 제약을 피하기 위해 `no-cors` POST를 사용하므로 제출 후 성공 메시지는 서버 응답을 읽은 것이 아니라 요청 전송 완료 기준입니다. 운영 전에는 테스트 주소로 실제 중복·오류·스팸 처리를 확인해야 합니다.
