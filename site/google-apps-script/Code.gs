const SPREADSHEET_ID = 'REPLACE_WITH_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Waitlist';
const HEADERS = ['created_at', 'email', 'role', 'consent', 'source'];

function doGet() {
  return json_({ ok: true, service: 'previewlog-waitlist' });
}

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    if (params.website) return json_({ ok: true });

    const email = String(params.email || '').trim().toLowerCase();
    const role = String(params.role || '').trim();
    const consent = String(params.consent || '').toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return json_({ ok: false, error: 'invalid_email' });
    if (!['on', 'true', '1'].includes(consent)) return json_({ ok: false, error: 'consent_required' });

    const sheet = getSheet_();
    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat().map(String).map((value) => value.toLowerCase());
        if (emails.includes(email)) return json_({ ok: true, duplicate: true });
      }
      sheet.appendRow([new Date(), email, role, 'yes', 'landing-page']);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true, duplicate: false });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'server_error' });
  }
}

function getSheet_() {
  if (SPREADSHEET_ID === 'REPLACE_WITH_GOOGLE_SHEET_ID') throw new Error('Set SPREADSHEET_ID before deployment.');
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
