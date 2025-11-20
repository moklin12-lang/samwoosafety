// 로그인 폼 처리
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');
    const findPasswordBtn = document.querySelector('.btn-secondary');

    // 로그인 폼 제출
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userId = userIdInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!userId) {
                alert('아이디를 입력해주세요.');
                userIdInput.focus();
                return;
            }
            
            if (!password) {
                alert('비밀번호를 입력해주세요.');
                passwordInput.focus();
                return;
            }
            
            // 실제 로그인 로직은 여기에 구현
            console.log('로그인 시도:', { userId, password });
            alert('로그인 기능은 백엔드와 연동이 필요합니다.');
            
            // 예시: 로그인 성공 시
            // window.location.href = '/dashboard';
        });
    }

    // 비밀번호 찾기 버튼
    if (findPasswordBtn) {
        findPasswordBtn.addEventListener('click', function() {
            alert('비밀번호 찾기 기능은 준비 중입니다.');
            // 실제 비밀번호 찾기 페이지로 이동
            // window.location.href = '/find-password';
        });
    }

    // 입력 필드 포커스 효과
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // 공지사항 더보기 버튼
    const moreBtn = document.querySelector('.more-btn');
    if (moreBtn) {
        moreBtn.addEventListener('click', function() {
            alert('공지사항 전체 보기 기능은 준비 중입니다.');
            // 실제 공지사항 페이지로 이동
            // window.location.href = '/notices';
        });
    }

    // 네비게이션 아이템 클릭 이벤트
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const navText = this.querySelector('.nav-text').textContent;
            console.log('네비게이션 클릭:', navText);
            // 실제 페이지 이동 로직
            // if (index === 0) {
            //     window.location.href = '/my-classroom';
            // } else if (index === 1) {
            //     window.location.href = '/support-center';
            // }
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transition = 'opacity 0.2s';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // 공지사항 항목 클릭 이벤트
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const noticeText = this.querySelector('.notice-text').textContent;
            console.log('공지사항 클릭:', noticeText);
            alert(`공지사항: ${noticeText}\n\n상세 내용은 준비 중입니다.`);
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transition = 'opacity 0.2s';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
});

