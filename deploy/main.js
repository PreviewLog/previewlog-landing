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

const koreanLabels = {
  'LOCAL-FIRST VIDEO REVIEW': '로컬 영상 검토',
  'FOR EDITORS & CREATORS': '편집 전 촬영본 정리',
  'NO UPLOAD REQUIRED': '영상은 외부로 보내지 않음',
  'MACOS NOW · WINDOWS NEXT': 'macOS 지원 · Windows 준비 중',
    'FROM FOOTAGE TO LOG': '촬영본에서 프리뷰 자료까지',
    'DRAFT YOUR PREVIEW': '프리뷰 초안 만들기',
    'REVIEW & REFINE': '검토하고 다듬기',
    'DELIVER TO EDITING': '편집에 전달하기',
  'THE PROBLEM': '이런 시간이 남습니다',
  'ONE WORKSPACE': '한 곳에서 정리',
  'MADE FOR REAL WORK': '이런 작업에 적합합니다',
  'WHAT YOU GET': '받을 수 있는 결과물',
  'LOCAL BY DEFAULT': '기본은 로컬 처리',
  'SYSTEM REQUIREMENTS': '사용 환경',
  'SIMPLE TO START': '먼저 확인해보세요',
  'RELEASE PREPARATION': '출시 준비 중',
  'GOOD TO KNOW': '시작 전 확인',
  'NEED A HAND?': '도움이 필요하신가요?',
};

document.querySelectorAll('.section-kicker, .eyebrow, .trust-inner span').forEach((element) => {
  const replacement = koreanLabels[element.textContent.trim()];
  if (replacement) element.textContent = replacement;
});
