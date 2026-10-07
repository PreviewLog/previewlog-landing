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
  const payload = {
    email: String(formData.get('email') || '').trim(),
    name: String(formData.get('name') || '').trim() || null,
    platform: formData.get('platform') || 'macos',
    consent: formData.get('consent') || 'no',
    website: String(formData.get('website') || '').trim(),
    source: window.location.href,
    userAgent: navigator.userAgent,
  };

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = '신청 중…';
  }
  if (status) {
    status.className = 'waitlist-status';
    status.textContent = '신청 정보를 보내고 있습니다.';
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.duplicate) {
      if (status) {
        status.className = 'waitlist-status is-success';
        status.textContent = '이미 신청된 이메일입니다. 출시 시 가장 먼저 안내해 드리겠습니다.';
      }
    } else {
      waitlistForm.reset();
      if (status) {
        status.className = 'waitlist-status is-success';
        status.textContent = '출시 알림 신청이 완료되었습니다. 출시 소식을 가장 먼저 알려드리겠습니다.';
      }
    }
  } catch (error) {
    if (status) {
      status.className = 'waitlist-status is-error';
      status.textContent = '신청에 실패했습니다. 이메일 주소를 다시 확인하거나 잠시 후 다시 시도해 주세요.';
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = '출시 알림 받기 <span>↗</span>';
    }
  }
});

document.querySelectorAll('.faq-list details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});
