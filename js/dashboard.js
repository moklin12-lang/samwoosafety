// ===== 인증 체크 =====
const rawUser = sessionStorage.getItem('sw_user') || localStorage.getItem('sw_user');
const currentUser = rawUser
  ? JSON.parse(rawUser)
  : { id: 'admin', name: '관리자', role: '관리자' };

// ===== 사용자 정보 적용 =====
function applyUser() {
  const greet = document.getElementById('header-greeting');
  if (greet) greet.textContent = `안녕하세요, ${currentUser.name}님`;
}

// ===== 로그아웃 =====
function handleLogout() {
  sessionStorage.removeItem('sw_user');
  localStorage.removeItem('sw_user');
  window.location.href = 'index.html';
}

// ===== 탭별 게시물 데이터 =====
const POSTS = {
  main: [
    {
      id: 'm1',
      title: '1. 화재시 완강기 사용방법',
      category: 'main',
      author: '안전관리팀',
      date: '2025.06.01',
      views: 142,
      body: `
        <h3>완강기란?</h3>
        <p>완강기는 화재 발생 시 고층 건물에서 지상으로 안전하게 대피할 수 있는 기구입니다. 
        훅, 조속기, 로프, 벨트 등으로 구성되어 있으며 일정 속도를 유지하며 내려올 수 있습니다.</p>
        <div class="alert-box">⚠️ 완강기는 반드시 사전에 위치를 파악하고 사용법을 숙지해야 합니다!</div>
        <h3>사용 방법</h3>
        <div class="step-grid">
          <div class="step-card"><span class="step-num">1</span><h4>훅 걸기</h4><p>창문 또는 지지대에 완강기 훅을 단단히 걸어 고정합니다</p></div>
          <div class="step-card"><span class="step-num">2</span><h4>벨트 착용</h4><p>벨트를 가슴에 맞게 조여 몸에 착용합니다</p></div>
          <div class="step-card"><span class="step-num">3</span><h4>하강</h4><p>로프를 잡고 천천히 외벽을 발로 밀며 내려옵니다</p></div>
        </div>
        <div class="info-box">💡 완강기 사용 후에는 반드시 점검 후 원래 위치에 보관하세요.</div>
      `
    },
    {
      id: 'm2',
      title: '2. 화재 발생시 대피요령',
      category: 'main',
      author: '안전관리팀',
      date: '2025.05.28',
      views: 235,
      body: `
        <h3>화재 발생 즉시 행동요령</h3>
        <p>화재가 발생하면 침착하게 다음 순서에 따라 행동하세요.</p>
        <div class="danger-box">🚨 절대 엘리베이터를 사용하지 마세요! 반드시 계단을 이용하세요.</div>
        <h3>대피 순서</h3>
        <ul>
          <li>화재 발견 즉시 <strong>"불이야!"</strong> 외쳐 주변에 알립니다</li>
          <li>화재경보기 비상벨을 눌러 건물 전체에 알립니다</li>
          <li>119에 신고합니다 (위치, 불의 크기, 인원 수 알리기)</li>
          <li>수건이나 옷을 물에 적셔 코와 입을 막습니다</li>
          <li>낮은 자세로 비상구 방향으로 대피합니다</li>
          <li>지정 집결지로 이동 후 인원을 파악합니다</li>
        </ul>
        <div class="step-grid">
          <div class="step-card"><span class="step-num">①</span><h4>발견·신고</h4><p>화재 즉시 주변 알리고 119 신고</p></div>
          <div class="step-card"><span class="step-num">②</span><h4>대피</h4><p>낮은 자세, 비상계단 이용</p></div>
          <div class="step-card"><span class="step-num">③</span><h4>집결</h4><p>지정 집결지에서 인원 확인</p></div>
        </div>
      `
    },
    {
      id: 'm3',
      title: '3. 보행시 핸드폰 사용으로 인한 사고영상',
      category: 'main',
      author: '안전관리팀',
      date: '2025.05.20',
      views: 318,
      videoId: 'dQw4w9WgXcQ',
      body: `
        <h3>보행 중 핸드폰 사용의 위험성</h3>
        <p>보행 중 스마트폰 사용은 전방 주시를 방해하여 심각한 사고를 유발합니다. 
        아래 영상을 통해 실제 발생한 사고 사례를 확인하세요.</p>
        <div class="danger-box">📵 작업장 내 보행 중 핸드폰 사용은 절대 금지입니다!</div>
        <h3>주요 사고 유형</h3>
        <ul>
          <li>지게차·중장비와의 충돌</li>
          <li>계단·단차에서의 추락</li>
          <li>이동 물체에 의한 협착</li>
          <li>개구부 추락</li>
        </ul>
        <div class="info-box">💡 현장 내에서는 핸드폰을 주머니에 넣고 이동하세요.</div>
      `
    },
    {
      id: 'm4',
      title: '4. 보행시, 작업시 핸드폰 사용 금지',
      category: 'main',
      author: '안전관리팀',
      date: '2025.05.15',
      views: 198,
      body: `
        <h3>핸드폰 사용 금지 규정</h3>
        <p>당사는 산업안전보건법 및 사내 안전규정에 따라 아래와 같이 핸드폰 사용을 제한합니다.</p>
        <div class="danger-box">🚫 위반 시 경위서 제출 및 안전교육 이수 대상이 됩니다.</div>
        <h3>금지 구역 및 상황</h3>
        <ul>
          <li>작업장 내 보행 중</li>
          <li>기계 조작·감시 중</li>
          <li>지게차·크레인 운전 중</li>
          <li>화학물질 취급 중</li>
          <li>고소 작업 중</li>
        </ul>
        <h3>허용 상황</h3>
        <ul>
          <li>지정 휴식 구역에서 사용</li>
          <li>업무 연락 목적으로 정해진 장소에서 사용</li>
          <li>긴급 상황 신고 목적</li>
        </ul>
        <div class="info-box">📞 긴급 연락은 반드시 안전한 장소에 멈춰 서서 통화하세요.</div>
      `
    },
    {
      id: 'm5',
      title: '5. 안전, 선택이 아닌 필수',
      category: 'main',
      author: '대표이사',
      date: '2025.05.10',
      views: 412,
      body: `
        <h3>안전경영 방침</h3>
        <p>삼우에프엔지는 '안전이 곧 최고의 복지'라는 경영 이념 아래, 모든 임직원의 안전과 건강을 최우선으로 합니다.</p>
        <div class="info-box">🏆 우리 회사 안전목표: 중대재해 ZERO, 산업재해율 업계 최저 달성</div>
        <h3>우리의 안전 약속</h3>
        <ul>
          <li>나와 동료의 생명은 어떤 생산 목표보다 소중합니다</li>
          <li>불안전한 행동과 상태를 즉시 신고하고 개선합니다</li>
          <li>안전 교육에 적극적으로 참여합니다</li>
          <li>개인보호구를 반드시 착용합니다</li>
          <li>안전 수칙은 이유 없이 무조건 준수합니다</li>
        </ul>
        <div class="step-grid">
          <div class="step-card"><span class="step-num" style="font-size:1.8rem">🦺</span><h4>보호구 착용</h4><p>모든 작업 시 필수</p></div>
          <div class="step-card"><span class="step-num" style="font-size:1.8rem">📋</span><h4>위험성 평가</h4><p>작업 전 반드시 실시</p></div>
          <div class="step-card"><span class="step-num" style="font-size:1.8rem">🤝</span><h4>동료 안전</h4><p>서로 챙기는 문화</p></div>
        </div>
      `
    }
  ],

  newcomer: [
    {
      id: 'n1',
      title: '1. 신규 입사자 안전교육 안내',
      category: 'newcomer',
      author: '인사팀',
      date: '2025.06.02',
      views: 89,
      body: `
        <h3>신규 입사자 안전교육 의무</h3>
        <p>산업안전보건법 제29조에 따라 신규 채용 시 8시간 이상의 안전교육을 의무적으로 이수해야 합니다.</p>
        <div class="info-box">📅 교육 일정: 매월 첫째 주 월요일 09:00 ~ 17:00 (교육장 1호)</div>
        <h3>교육 내용</h3>
        <ul>
          <li>산업안전보건법 기초 이해</li>
          <li>사업장 위험 요소 파악</li>
          <li>개인보호구 착용 방법</li>
          <li>비상 대피 절차</li>
          <li>응급처치 기초</li>
          <li>사고 보고 절차</li>
        </ul>
        <div class="alert-box">⚠️ 교육 미수료 시 현장 배치가 불가합니다.</div>
      `
    },
    {
      id: 'n2',
      title: '2. 입사 첫날 체크리스트',
      category: 'newcomer',
      author: '안전관리팀',
      date: '2025.05.25',
      views: 67,
      body: `
        <h3>입사 첫날 확인 사항</h3>
        <p>신규 입사자는 아래 항목을 반드시 확인하고 서명하세요.</p>
        <ul>
          <li>☐ 안전보건관리체계 안내서 수령</li>
          <li>☐ 개인보호구 지급 및 착용 확인</li>
          <li>☐ 비상연락망 및 대피경로 확인</li>
          <li>☐ 근무 구역 위험 요소 현장 교육 수료</li>
          <li>☐ 안전교육 일정 안내 수령</li>
          <li>☐ 사내 안전 수칙 서약서 서명</li>
        </ul>
        <div class="info-box">💡 불명확한 사항은 즉시 담당 선임 또는 안전관리팀(내선 1234)에 문의하세요.</div>
      `
    },
    {
      id: 'n3',
      title: '3. 사업장 배치도 및 비상구 위치',
      category: 'newcomer',
      author: '시설관리팀',
      date: '2025.05.18',
      views: 54,
      body: `
        <h3>주요 시설 위치</h3>
        <ul>
          <li>🏥 <strong>응급처치실</strong>: 본관 1층 우측 (내선 1119)</li>
          <li>🧯 <strong>소화기</strong>: 각 층 엘리베이터 옆, 계단실 입구</li>
          <li>🚪 <strong>비상구</strong>: 각 층 복도 양 끝단 (초록색 표시등 따라 이동)</li>
          <li>🏗️ <strong>안전관리팀</strong>: 본관 2층 203호 (내선 1234)</li>
          <li>🅿️ <strong>비상 집결지</strong>: 정문 앞 주차장 A구역</li>
        </ul>
        <div class="alert-box">⚠️ 비상 시 반드시 비상 집결지(정문 앞 주차장 A구역)로 대피하세요.</div>
      `
    }
  ],

  appliance: [
    {
      id: 'a1',
      title: '1. 가전제품 안전 사용 수칙',
      category: 'appliance',
      author: '안전관리팀',
      date: '2025.06.01',
      views: 76,
      body: `
        <h3>냉장고 안전 수칙</h3>
        <ul>
          <li>냉장고 뒷면 최소 10cm 이상 공간 확보</li>
          <li>인화성 물질 보관 절대 금지</li>
          <li>문 고무패킹 정기 점검</li>
        </ul>
        <h3>세탁기 안전 수칙</h3>
        <ul>
          <li>작동 중 자리를 비우지 않기</li>
          <li>과부하 사용 금지 (권장 용량 80% 이내)</li>
          <li>사용 후 전원 차단</li>
        </ul>
        <div class="info-box">💡 가전제품 이상 발견 시 즉시 전원 차단 후 시설팀(내선 1200)에 신고하세요.</div>
      `
    },
    {
      id: 'a2',
      title: '2. 전기 콘센트 및 멀티탭 안전',
      category: 'appliance',
      author: '시설관리팀',
      date: '2025.05.22',
      views: 93,
      body: `
        <h3>콘센트·멀티탭 사용 주의사항</h3>
        <div class="danger-box">🔴 문어발식 배선은 과부하로 인한 화재의 주요 원인입니다!</div>
        <ul>
          <li>멀티탭 1개에 고전력 제품 2개 이상 동시 사용 금지</li>
          <li>물 근처 콘센트 사용 금지</li>
          <li>파손된 플러그·콘센트 즉시 교체</li>
          <li>퇴근 시 불필요한 전원 모두 차단</li>
          <li>안전 커버가 있는 멀티탭 사용 권장</li>
        </ul>
      `
    }
  ],

  aircon: [
    {
      id: 'ac1',
      title: '1. 에어컨 안전 점검 가이드',
      category: 'aircon',
      author: '시설관리팀',
      date: '2025.06.03',
      views: 58,
      body: `
        <h3>여름철 에어컨 안전 점검</h3>
        <p>에어컨 가동 전 반드시 아래 항목을 점검하세요.</p>
        <div class="step-grid">
          <div class="step-card"><span class="step-num">①</span><h4>필터 청소</h4><p>2주마다 필터 청소 (먼지·곰팡이 예방)</p></div>
          <div class="step-card"><span class="step-num">②</span><h4>배수 확인</h4><p>배수관 막힘 여부 및 물 새는 곳 점검</p></div>
          <div class="step-card"><span class="step-num">③</span><h4>냄새 점검</h4><p>이상한 냄새 발생 시 즉시 사용 중단</p></div>
        </div>
        <div class="alert-box">⚠️ 에어컨 전기 배선 수리는 반드시 전문가에게 의뢰하세요.</div>
        <h3>온도 설정 가이드</h3>
        <ul>
          <li>적정 냉방 온도: 26~28°C (에너지 절약 및 건강 유지)</li>
          <li>외부 기온과 실내 온도 차이 5~6°C 이내 유지</li>
          <li>취침 시 타이머 활용으로 저체온 예방</li>
        </ul>
      `
    },
    {
      id: 'ac2',
      title: '2. 실외기 관리 및 화재 예방',
      category: 'aircon',
      author: '시설관리팀',
      date: '2025.05.30',
      views: 42,
      body: `
        <h3>실외기 안전 관리</h3>
        <div class="danger-box">🔥 실외기 과열은 화재의 원인이 됩니다. 주변 정리정돈을 철저히 하세요.</div>
        <ul>
          <li>실외기 주변 30cm 이상 공간 확보</li>
          <li>실외기 위에 물건 적재 금지</li>
          <li>커버로 실외기 밀폐 금지</li>
          <li>장마철 침수 예방 조치 실시</li>
        </ul>
        <div class="info-box">💡 실외기 이상 발견(과열, 이상음, 연기) 시 즉시 시설팀(내선 1200) 신고</div>
      `
    }
  ],

  warehouse: [
    {
      id: 'w1',
      title: '1. 창고 내 지게차 안전 수칙',
      category: 'warehouse',
      author: '안전관리팀',
      date: '2025.06.04',
      views: 124,
      body: `
        <h3>지게차 작업 안전 수칙</h3>
        <div class="danger-box">⚠️ 지게차는 사업장 내 사망사고 1위 원인입니다. 반드시 안전 수칙을 준수하세요!</div>
        <h3>운전자 준수사항</h3>
        <ul>
          <li>유자격자(지게차 운전기능사)만 운전</li>
          <li>작업 전 일상점검 필수 (브레이크, 등화장치, 경보장치)</li>
          <li>제한 속도 준수 (구내 10km/h 이하)</li>
          <li>포크는 지면에서 20~30cm 높이 유지</li>
          <li>경사로에서 후진 금지</li>
        </ul>
        <h3>보행자 준수사항</h3>
        <ul>
          <li>지게차 통로와 보행자 통로 구분 확인</li>
          <li>지게차 측면·후방 접근 금지</li>
          <li>지게차 포크 아래 통과·작업 금지</li>
        </ul>
      `
    },
    {
      id: 'w2',
      title: '2. 창고 적재물 관리 기준',
      category: 'warehouse',
      author: '물류팀',
      date: '2025.05.27',
      views: 87,
      body: `
        <h3>적재 안전 기준</h3>
        <ul>
          <li>적재 높이: 바닥에서 최대 3m 이내</li>
          <li>무거운 물건은 아래, 가벼운 물건은 위에 적재</li>
          <li>스프링클러 헤드 아래 60cm 이내 적재 금지</li>
          <li>비상구 및 소화기 앞 적재 금지 (60cm 이상 공간 확보)</li>
          <li>통로 폭 최소 80cm 이상 유지</li>
        </ul>
        <div class="alert-box">⚠️ 랙 손상 발견 시 즉시 사용 중단 후 시설팀에 신고!</div>
        <div class="info-box">💡 정기 점검: 매월 마지막 금요일 창고 안전 점검 실시</div>
      `
    }
  ],

  regulation: [
    {
      id: 'r1',
      title: '1. 2025년 산업안전보건법 주요 개정 내용',
      category: 'regulation',
      author: '안전관리팀',
      date: '2025.06.05',
      views: 203,
      body: `
        <h3>2025년 주요 개정 사항</h3>
        <div class="info-box">📋 2025년 1월 1일부터 시행되는 개정 내용을 반드시 숙지하세요.</div>
        <ul>
          <li>50인 미만 사업장 안전보건관리담당자 선임 의무화</li>
          <li>위험성 평가 주기 단축: 3년 → 1년</li>
          <li>법정 안전교육 시간 확대: 연 8시간 → 12시간</li>
          <li>하청 근로자 안전 보호 의무 강화</li>
          <li>심리적 외상 근로자 지원 의무화</li>
        </ul>
        <h3>우리 회사 대응 방향</h3>
        <ul>
          <li>교육 일정 연간 4회 → 6회로 확대</li>
          <li>위험성 평가 분기별 실시로 전환</li>
          <li>협력사 안전관리 지원 확대</li>
        </ul>
      `
    },
    {
      id: 'r2',
      title: '2. 개인보호구 착용 기준 및 지급 규정',
      category: 'regulation',
      author: '안전관리팀',
      date: '2025.05.20',
      views: 156,
      body: `
        <h3>개인보호구 지급 기준</h3>
        <ul>
          <li>🪖 <strong>안전모</strong>: 전 직원 (현장 출입 시 필수)</li>
          <li>👟 <strong>안전화</strong>: 전 직원 (현장 근무자)</li>
          <li>🥽 <strong>보안경</strong>: 물질 취급, 분진 작업자</li>
          <li>😷 <strong>방진마스크</strong>: 분진 발생 작업자</li>
          <li>🧤 <strong>내화학 장갑</strong>: 화학물질 취급자</li>
          <li>🦺 <strong>안전벨트</strong>: 2m 이상 고소 작업자</li>
        </ul>
        <div class="alert-box">⚠️ 보호구 미착용 적발 시: 1차 경고 → 2차 경위서 → 3차 징계</div>
        <div class="info-box">💡 파손된 보호구는 즉시 안전관리팀에서 교환받으세요 (내선 1234)</div>
      `
    }
  ],

  'major-accident': [
    {
      id: 'ma1',
      title: '1. 중대재해처벌법 핵심 내용',
      category: 'major-accident',
      author: '안전관리팀',
      date: '2025.06.01',
      views: 287,
      body: `
        <h3>중대재해처벌법이란?</h3>
        <p>사업 또는 사업장에서 중대산업재해가 발생한 경우 사업주와 경영책임자 등을 처벌하는 법률입니다. (2022년 1월 27일 시행)</p>
        <div class="danger-box">🚨 중대재해 발생 시 사업주·경영책임자: 1년 이상 징역 또는 10억 원 이하 벌금!</div>
        <h3>중대산업재해 기준</h3>
        <ul>
          <li>사망자 1명 이상 발생</li>
          <li>동일 사고로 6개월 이상 치료 필요 부상자 2명 이상</li>
          <li>동일 원인으로 3개월 이상 요양 직업성 질병자 1년 내 3명 이상</li>
        </ul>
        <h3>사업주 의무 사항</h3>
        <ul>
          <li>안전보건관리체계 구축·이행</li>
          <li>재해 재발 방지 대책 수립</li>
          <li>안전보건 법령 의무 이행 점검</li>
          <li>안전보건 예산 편성 및 집행</li>
        </ul>
      `
    },
    {
      id: 'ma2',
      title: '2. 중대재해 발생 시 대응 절차',
      category: 'major-accident',
      author: '안전관리팀',
      date: '2025.05.15',
      views: 198,
      body: `
        <h3>중대재해 초기 대응 절차</h3>
        <div class="step-grid">
          <div class="step-card"><span class="step-num">①</span><h4>즉시 신고</h4><p>119 신고 및 사업장 내 비상연락망 가동</p></div>
          <div class="step-card"><span class="step-num">②</span><h4>현장 보존</h4><p>고용노동부 조사 전까지 현장 보존 (필수)</p></div>
          <div class="step-card"><span class="step-num">③</span><h4>기관 신고</h4><p>고용노동부 관할 지청에 1일 이내 신고</p></div>
        </div>
        <div class="danger-box">🚨 현장 임의 변경 시 증거 인멸로 형사처벌 가중 사유가 됩니다!</div>
        <h3>신고 기관</h3>
        <ul>
          <li>긴급 구조: 119</li>
          <li>고용노동부 고객센터: 1350</li>
          <li>안전보건공단: 1644-4544</li>
        </ul>
      `
    }
  ],

  violation: [
    {
      id: 'v1',
      title: '1. 안전모 미착용 적발 사례',
      category: 'violation',
      author: '안전관리팀',
      date: '2025.06.03',
      views: 165,
      body: `
        <h3>2025년 2분기 안전모 미착용 적발 현황</h3>
        <div class="danger-box">⚠️ 안전모 미착용은 두부 외상 등 중상해의 직접 원인입니다.</div>
        <h3>주요 적발 유형</h3>
        <ul>
          <li>현장 진입 직후 안전모 미착용 상태로 작업</li>
          <li>잠깐이라는 이유로 탈착 후 미착용</li>
          <li>더워서 벗어두고 작업</li>
          <li>방문자 안전모 미제공 상태로 현장 입장</li>
        </ul>
        <h3>처벌 기준</h3>
        <ul>
          <li>1차: 서면 경고 + 재교육 1시간</li>
          <li>2차: 경위서 제출 + 재교육 4시간</li>
          <li>3차: 인사위원회 회부</li>
        </ul>
        <div class="info-box">💡 더운 날씨에는 통기성 안전모로 교체 신청 가능합니다 (안전관리팀 문의)</div>
      `
    },
    {
      id: 'v2',
      title: '2. 지게차 통로 무단 횡단 사례',
      category: 'violation',
      author: '안전관리팀',
      date: '2025.05.22',
      views: 134,
      body: `
        <h3>지게차 통로 무단 횡단 위험성</h3>
        <div class="danger-box">🚨 지게차 충돌 사망사고의 43%는 무단 횡단으로 발생합니다!</div>
        <h3>적발 사례 (2025년 1~5월)</h3>
        <ul>
          <li>A구역 지게차 전용 통로를 횡단보도 없이 가로지른 사례 8건</li>
          <li>지게차 후진 경보음 무시하고 접근한 사례 3건</li>
          <li>물건 운반 중 지게차 통로 이동 사례 5건</li>
        </ul>
        <h3>준수 사항</h3>
        <ul>
          <li>반드시 지정 횡단구역(노란선)으로만 이동</li>
          <li>지게차 진행 방향 확인 후 이동</li>
          <li>지게차 운전자와 눈을 마주친 후 이동</li>
        </ul>
      `
    }
  ],

  admin: [
    {
      id: 'adm1',
      title: '관리자 전용: 사용자 관리',
      category: 'admin',
      author: '시스템관리자',
      date: '2025.06.05',
      views: 0,
      body: `
        <div class="info-box">🔒 이 메뉴는 관리자 전용입니다.</div>
        <h3>관리자 기능</h3>
        <ul>
          <li>사용자 계정 생성·수정·삭제</li>
          <li>교육 과정 등록·수정·삭제</li>
          <li>게시물 관리 (작성·수정·삭제)</li>
          <li>이수 현황 통계 조회</li>
          <li>공지사항 발송</li>
        </ul>
        <h3>통계 현황 (2025년 6월 기준)</h3>
        <div class="step-grid">
          <div class="step-card"><span class="step-num">247</span><h4>전체 직원</h4><p>등록 사용자 수</p></div>
          <div class="step-card"><span class="step-num">89%</span><h4>교육 이수율</h4><p>6월 기준</p></div>
          <div class="step-card"><span class="step-num">12</span><h4>미이수자</h4><p>독려 필요 인원</p></div>
        </div>
      `
    }
  ]
};

// ===== 현재 상태 =====
let currentTab = 'main';
let currentPostId = null;
const notifications = [
  { id: 1, text: '6월 정기 안전교육 일정이 등록되었습니다.', read: false },
  { id: 2, text: '소방훈련 참여 안내 (6/15 일요일)', read: false },
  { id: 3, text: '2분기 안전점검 결과가 공유되었습니다.', read: false },
];

// ===== 탭 전환 =====
function switchTab(tab) {
  currentTab = tab;
  currentPostId = null;

  // 탭 버튼 활성화
  document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.tab-item[data-tab="${tab}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // 사이드 레이블 업데이트
  const labels = {
    main: '메인', newcomer: '신규 입사자', appliance: '가전 안전',
    aircon: '에어컨 안전', warehouse: '창고 안전', regulation: '안전 규정',
    'major-accident': '중대재해알림', violation: '안전미준수사례', admin: '관리자메뉴'
  };
  document.getElementById('side-label').textContent = labels[tab] || tab;

  // 게시물 목록 렌더
  renderPostList();

  // 콘텐츠 뷰 초기화
  showEmptyGuide();
}

// ===== 게시물 목록 렌더 =====
function renderPostList() {
  const list = document.getElementById('post-list');
  const posts = POSTS[currentTab] || [];

  if (!posts.length) {
    list.innerHTML = `<div style="text-align:center;padding:30px 10px;color:#94a3b8;font-size:0.8rem">게시물이 없습니다</div>`;
    return;
  }

  list.innerHTML = posts.map((p, i) => `
    <div class="post-list-item ${p.id === currentPostId ? 'active' : ''}" onclick="selectPost('${p.id}')">
      <span class="post-item-text">${p.title}</span>
      <i class="fas fa-chevron-right post-item-chevron"></i>
    </div>
  `).join('');
}

// ===== 게시물 선택 =====
function selectPost(id) {
  const allPosts = Object.values(POSTS).flat();
  const post = allPosts.find(p => p.id === id);
  if (!post) return;

  currentPostId = id;

  // 목록 활성 표시
  document.querySelectorAll('.post-list-item').forEach(el => el.classList.remove('active'));
  const activeItem = document.querySelector(`.post-list-item[onclick="selectPost('${id}')"]`);
  if (activeItem) activeItem.classList.add('active');

  // 상세 렌더
  showPostDetail(post);
}

function showEmptyGuide() {
  document.getElementById('empty-guide').classList.remove('hidden');
  document.getElementById('post-detail').classList.add('hidden');
}

function showPostDetail(post) {
  document.getElementById('empty-guide').classList.add('hidden');
  const detail = document.getElementById('post-detail');
  detail.classList.remove('hidden');

  document.getElementById('detail-title').textContent = post.title;
  document.getElementById('detail-meta').innerHTML = `
    <span><i class="fas fa-user"></i> ${post.author}</span>
    <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
    <span><i class="fas fa-eye"></i> ${post.views + 1}회</span>
    <div class="post-actions">
      <button class="btn-edit-post" onclick="editPost('${post.id}')"><i class="fas fa-edit"></i> 수정</button>
      <button class="btn-delete-post" onclick="deletePost('${post.id}')"><i class="fas fa-trash"></i> 삭제</button>
    </div>
  `;

  let bodyHTML = post.body;

  // 유튜브 영상 포함 여부
  if (post.videoId) {
    bodyHTML = `
      <div class="video-wrap">
        <iframe src="https://www.youtube.com/embed/${post.videoId}" allowfullscreen title="${post.title}"></iframe>
      </div>
    ` + bodyHTML;
  }

  document.getElementById('detail-body').innerHTML = bodyHTML;
}

// ===== 게시물 작성 모달 =====
function openWriteModal(postToEdit = null) {
  document.getElementById('write-title').value = postToEdit ? postToEdit.title : '';
  document.getElementById('write-category').value = postToEdit ? postToEdit.category : currentTab;
  document.getElementById('write-content').value = postToEdit ? (postToEdit._rawContent || '') : '';
  document.getElementById('write-video').value = postToEdit ? (postToEdit.videoId || '') : '';
  document.getElementById('write-modal').dataset.editId = postToEdit ? postToEdit.id : '';
  document.getElementById('write-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('write-title').focus(), 100);
}
function closeWriteModal() {
  document.getElementById('write-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function savePost() {
  const title = document.getElementById('write-title').value.trim();
  const category = document.getElementById('write-category').value;
  const content = document.getElementById('write-content').value.trim();
  const videoUrl = document.getElementById('write-video').value.trim();
  const editId = document.getElementById('write-modal').dataset.editId;

  if (!title) { showToast('제목을 입력해주세요.'); return; }
  if (!content) { showToast('내용을 입력해주세요.'); return; }

  // 유튜브 ID 추출
  let videoId = '';
  if (videoUrl) {
    const match = videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) videoId = match[1];
  }

  const contentHTML = content.split('\n').filter(l => l.trim()).map(l => `<p>${l}</p>`).join('');

  if (editId) {
    // 수정
    const allCats = Object.values(POSTS);
    for (const cat of allCats) {
      const idx = cat.findIndex(p => p.id === editId);
      if (idx !== -1) {
        cat[idx].title = title;
        cat[idx].body = contentHTML;
        cat[idx]._rawContent = content;
        cat[idx].videoId = videoId;
        if (currentPostId === editId) showPostDetail(cat[idx]);
        break;
      }
    }
    showToast('게시물이 수정되었습니다.');
  } else {
    // 신규 작성
    const newPost = {
      id: `new_${Date.now()}`,
      title,
      category,
      author: currentUser.name,
      date: new Date().toLocaleDateString('ko-KR', { year:'numeric', month:'2-digit', day:'2-digit' }).replace(/\. /g, '.').replace('.', ''),
      views: 0,
      videoId,
      body: contentHTML,
      _rawContent: content,
    };
    if (!POSTS[category]) POSTS[category] = [];
    POSTS[category].unshift(newPost);

    if (currentTab !== category) switchTab(category);
    showToast('게시물이 등록되었습니다! 🎉');
  }

  renderPostList();
  closeWriteModal();
}

// ===== 게시물 수정 =====
function editPost(id) {
  const allPosts = Object.values(POSTS).flat();
  const post = allPosts.find(p => p.id === id);
  if (post) openWriteModal(post);
}

// ===== 게시물 삭제 =====
function deletePost(id) {
  if (!confirm('이 게시물을 삭제하시겠습니까?')) return;
  for (const cat in POSTS) {
    const idx = POSTS[cat].findIndex(p => p.id === id);
    if (idx !== -1) {
      POSTS[cat].splice(idx, 1);
      currentPostId = null;
      renderPostList();
      showEmptyGuide();
      showToast('게시물이 삭제되었습니다.');
      return;
    }
  }
}

// ===== 알림 =====
function toggleNotifications() {
  const dd = document.getElementById('notif-dropdown');
  dd.classList.toggle('hidden');
  if (!dd.classList.contains('hidden')) renderNotifications();
}
function renderNotifications() {
  const ul = document.getElementById('notif-list');
  if (!notifications.length) {
    ul.innerHTML = '<li style="text-align:center;color:#94a3b8;padding:20px">알림이 없습니다</li>';
    return;
  }
  ul.innerHTML = notifications.map(n => `
    <li onclick="readNotification(${n.id})">
      ${!n.read ? '<span class="notif-dot"></span>' : '<span style="width:7px;flex-shrink:0"></span>'}
      ${n.text}
    </li>`).join('');
}
function readNotification(id) {
  const n = notifications.find(x => x.id === id);
  if (n) n.read = true;
  updateNotifBadge();
  renderNotifications();
}
function clearNotifications() {
  notifications.forEach(n => n.read = true);
  updateNotifBadge();
  renderNotifications();
}
function updateNotifBadge() {
  const cnt = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notif-count');
  if (badge) { badge.textContent = cnt; badge.style.display = cnt ? 'flex' : 'none'; }
}

// ===== 토스트 =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window._tw);
  window._tw = setTimeout(() => t.classList.add('hidden'), 2500);
}

// ===== 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  applyUser();
  switchTab('main');
  updateNotifBadge();

  // 탭 클릭
  document.querySelectorAll('.tab-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 알림 버튼
  document.getElementById('notif-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifications();
  });

  // 외부 클릭 시 알림 닫기
  document.addEventListener('click', (e) => {
    const dd = document.getElementById('notif-dropdown');
    if (!dd.classList.contains('hidden') && !dd.contains(e.target)) {
      dd.classList.add('hidden');
    }
  });

  // 모달 외부 클릭 닫기
  document.getElementById('write-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeWriteModal();
  });

  // ESC 닫기
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWriteModal();
  });
});
