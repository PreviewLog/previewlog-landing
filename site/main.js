const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
const dialog = document.querySelector('#waitlist-dialog');
const form = document.querySelector('#waitlist-form');
const endpoint = document.querySelector('meta[name="previewlog-signup-endpoint"]')?.content.trim();

menuButton?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.js-open-waitlist').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof dialog?.showModal === 'function') dialog.showModal();
    else dialog?.setAttribute('open', '');
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => dialog?.close());

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('button[type="submit"]');
  const data = new FormData(form);

  if (!endpoint) {
    status.textContent = '등록 기능을 준비 중입니다. 출시 알림 연결 후 다시 시도해 주세요.';
    status.className = 'form-status error';
    return;
  }

  submit.disabled = true;
  status.textContent = '등록 중입니다…';
  status.className = 'form-status';
  try {
    await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data });
    form.reset();
    status.textContent = '등록되었습니다. 출시 소식을 이메일로 알려드리겠습니다.';
    status.className = 'form-status success';
  } catch {
    status.textContent = '등록하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    status.className = 'form-status error';
  } finally {
    submit.disabled = false;
  }
});
