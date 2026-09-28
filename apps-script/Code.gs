/**
 * PreviewLog waitlist endpoint for Google Apps Script.
 *
 * 1. Create or open the Google Sheet that will store registrations.
 * 2. Open Extensions > Apps Script and paste this file into Code.gs.
 * 3. Replace SPREADSHEET_ID below with the ID from the Sheet URL.
 * 4. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. Put the deployed /exec URL in site/index.html and deploy/index.html:
 *    <form class="waitlist-form" data-endpoint="YOUR_EXEC_URL">
 */

const CONFIG = {
  SPREADSHEET_ID: 'PASTE_GOOGLE_SHEET_ID_HERE',
  SHEET_NAME: 'Waitlist',
};

const HEADERS = [
  'created_at',
  'email',
  'name',
  'platform',
  'consent',
  'source',
  'user_agent',
];

function doGet() {
  return jsonResponse({ ok: true, service: 'previewlog-waitlist' });
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const params = event && event.parameter ? event.parameter : {};
    const email = String(params.email || '').trim().toLowerCase();
    const name = String(params.name || '').trim().slice(0, 120);
    const platform = params.platform === 'windows' ? 'windows' : 'macos';
    const consent = params.consent === 'yes' ? 'yes' : 'no';
    const source = String(params.source || '').trim().slice(0, 500);
    const userAgent = String(params.userAgent || '').trim().slice(0, 500);

    // The public form has a hidden honeypot field to filter simple bots.
    if (String(params.website || '').trim()) {
      return jsonResponse({ ok: true });
    }

    if (!isValidEmail(email) || consent !== 'yes') {
      return jsonResponse({ ok: false, error: 'invalid_request' });
    }

    const sheet = getWaitlistSheet();
    const existingEmails = sheet.getLastRow() > 1
      ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat().map(String)
      : [];

    if (existingEmails.includes(email)) {
      return jsonResponse({ ok: true, duplicate: true });
    }

    sheet.appendRow([new Date(), email, name, platform, consent, source, userAgent]);
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

function getWaitlistSheet() {
  if (CONFIG.SPREADSHEET_ID === 'PASTE_GOOGLE_SHEET_ID_HERE') {
    throw new Error('Set CONFIG.SPREADSHEET_ID before deploying.');
  }

  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME)
    || spreadsheet.insertSheet(CONFIG.SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  return sheet;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
