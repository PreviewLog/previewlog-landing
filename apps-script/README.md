# PreviewLog 대기자 등록 연동

## Google Sheet 준비

1. 대기자 명단을 저장할 Google Sheet를 만듭니다.
2. 주소에서 `/d/`와 `/edit` 사이의 값을 복사합니다.
   예: `https://docs.google.com/spreadsheets/d/여기가_ID/edit`
3. Apps Script의 `Code.gs`에서 `CONFIG.SPREADSHEET_ID`에 붙여 넣습니다.

## 웹앱 배포

1. Google Sheet에서 `확장 프로그램 > Apps Script`를 엽니다.
2. `Code.gs` 내용을 붙여 넣고 저장합니다.
3. `배포 > 새 배포`를 선택합니다.
4. 유형은 `웹 앱`, 실행 사용자는 본인, 액세스 권한은 `모든 사용자`로 설정합니다.
5. 발급된 `/exec` URL을 복사합니다.

## 랜딩 페이지 연결

`site/index.html`과 Netlify 업로드용 `deploy/index.html`의 아래 부분에 URL을 넣습니다.

```html
<form class="download-actions waitlist-form" data-endpoint="발급받은_EXEC_URL">
```

현재 폼은 이메일, 이름(선택), 관심 플랫폼, 수신 동의를 저장합니다. 같은 이메일은 중복 행으로 저장하지 않습니다.
