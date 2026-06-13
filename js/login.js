// ===== 비밀번호 보기/숨기기 =====
function togglePw() {
  const input = document.getElementById('user-pw');
  const icon = document.getElementById('pw-eye-icon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ===== 로그인 처리 =====
function handleLogin(e) {
  e.preventDefault();

  const id = document.getElementById('user-id').value.trim();
  const pw = document.getElementById('user-pw').value.trim();
  const errorBox = document.getElementById('login-error');
  const errorText = document.getElementById('error-text');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  // 유효성 검사
  if (!id) {
    showError('아이디를 입력해주세요.');
    document.getElementById('user-id').focus();
    return;
  }
  if (!pw) {
    showError('비밀번호를 입력해주세요.');
    document.getElementById('user-pw').focus();
    return;
  }

  // 로딩 상태
  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  errorBox.classList.add('hidden');

  // 로그인 처리 (데모: admin/1234 또는 임의 입력 허용)
  setTimeout(() => {
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');

    // 데모 계정 허용 (실제 구현 시 API 연동)
    if (id && pw) {
      // 로그인 상태 저장
      const remember = document.getElementById('remember-me').checked;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('sw_user', JSON.stringify({ id, name: id === 'admin' ? '관리자' : id + ' 님', role: id === 'admin' ? '관리자' : '일반 직원' }));

      // 대시보드로 이동
      window.location.href = 'dashboard.html';
    } else {
      showError('아이디 또는 비밀번호를 확인해주세요.');
    }
  }, 900);
}

function showError(msg) {
  const errorBox = document.getElementById('login-error');
  const errorText = document.getElementById('error-text');
  errorText.textContent = msg;
  errorBox.classList.remove('hidden');
  // 흔들기 애니메이션
  const card = document.querySelector('.login-card');
  card.style.animation = 'shake 0.4s ease';
  setTimeout(() => card.style.animation = '', 400);
}

// ===== 토스트 메시지 =====
function showMsg(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.add('hidden'), 2500);
}

// ===== 흔들기 애니메이션 =====
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// ===== 이미 로그인된 경우 =====
(function checkAuth() {
  const user = sessionStorage.getItem('sw_user') || localStorage.getItem('sw_user');
  if (user) {
    window.location.href = 'dashboard.html';
  }
})();

// ===== 엔터키 로그인 =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const form = document.getElementById('login-form');
    if (form) form.dispatchEvent(new Event('submit'));
  }
});
