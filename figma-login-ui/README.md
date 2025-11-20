# Coupang Logistics Services - 로그인 페이지

Figma 디자인을 기반으로 구현한 로그인 페이지 UI입니다.

## 파일 구조

```
figma-login-ui/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 인터랙션
└── README.md       # 프로젝트 설명서
```

## 기능

- **로그인 폼**: 아이디/비밀번호 입력 및 로그인 기능
- **사이드바**: 
  - 로고
  - 네비게이션 메뉴 (나의 강의실, 학습지원센터)
  - 공지사항 목록
  - 고객센터 정보
- **메인 영역**: 로그인 폼이 있는 배경 이미지 영역
- **푸터**: 주소, 이용약관, 개인정보처리방침, 저작권 정보

## 사용 방법

1. `index.html` 파일을 웹 브라우저에서 열기
2. 또는 로컬 서버를 실행하여 접속:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```
3. 브라우저에서 `http://localhost:8000` 접속

## 디자인 정보

- **원본 디자인**: Figma 파일에서 추출
- **노드 ID**: 각 요소는 Figma 노드 ID를 `data-node-id` 속성으로 포함
- **이미지**: Figma API를 통해 제공되는 임시 URL 사용 (7일간 유효)

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 향후 개선 사항

- [ ] 실제 백엔드 API 연동
- [ ] 비밀번호 찾기 기능 구현
- [ ] 공지사항 상세 페이지
- [ ] 반응형 디자인 개선
- [ ] 이미지 에셋 로컬 저장

