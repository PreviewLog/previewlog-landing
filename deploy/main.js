const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  menuButton.textContent = isOpen ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', '메뉴 열기');
    if (menuButton) menuButton.textContent = '☰';
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !nav?.classList.contains('open')) return;

  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', '메뉴 열기');
  if (menuButton) menuButton.textContent = '☰';
  menuButton?.focus();
});

const waitlistForm = document.querySelector('.waitlist-form');

waitlistForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const status = waitlistForm.querySelector('.waitlist-status');
  const submitButton = waitlistForm.querySelector('button[type="submit"]');
  const endpoint = waitlistForm.dataset.endpoint?.trim();
  const honeypot = waitlistForm.elements.namedItem('website');

  if (!waitlistForm.checkValidity()) {
    waitlistForm.reportValidity();
    return;
  }

  if (honeypot?.value) return;

  if (!endpoint) {
    if (status) {
      status.className = 'waitlist-status is-error';
      status.textContent = '대기자 등록 연결을 준비 중입니다.';
    }
    return;
  }

  const formData = new FormData(waitlistForm);
  formData.set('source', window.location.href);
  formData.set('userAgent', navigator.userAgent);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = '등록 중…';
  }
  if (status) {
    status.className = 'waitlist-status';
    status.textContent = '등록 정보를 보내고 있습니다.';
  }

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(formData),
    });

    waitlistForm.reset();
    if (status) {
      status.className = 'waitlist-status is-success';
      status.textContent = '등록되었습니다. 출시 소식을 알려드리겠습니다.';
    }
  } catch (error) {
    if (status) {
      status.className = 'waitlist-status is-error';
      status.textContent = '등록에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = '대기자 등록 <span>↗</span>';
    }
  }
});
