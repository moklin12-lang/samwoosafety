// ===================================================================
// ===== 삼우에프엔지 교육센터 — Supabase 클라이언트 & CRUD 헬퍼 =====
// ===================================================================
//
// Supabase 프로젝트:  https://rpqmqsnzjchsmpsjffeb.supabase.co
//
// 테이블 구조 (Supabase에서 미리 생성 필요):
//
//  members 테이블:
//    id         text PRIMARY KEY   (사용자 아이디, 예: "hong123")
//    pw         text               (비밀번호 — 평문, 추후 해시 권장)
//    name       text
//    tel        text
//    dept       text
//    role       text               (업무구분)
//    car        text
//    status     text DEFAULT 'pending'   ('pending' | 'approved' | 'rejected')
//    memo       text
//    joined_at  timestamptz DEFAULT now()
//
//  watch_history 테이블:
//    id         bigserial PRIMARY KEY
//    user_id    text REFERENCES members(id) ON DELETE CASCADE
//    user_name  text
//    user_dept  text
//    post_id    text
//    post_title text
//    post_tab   text
//    vid_name   text
//    vid_type   text               ('upload' | 'youtube')
//    watched_at timestamptz DEFAULT now()
//
//  popup_settings 테이블:
//    id         serial PRIMARY KEY
//    enabled    boolean DEFAULT false
//    type       text DEFAULT 'text'
//    title      text
//    content    text
//    image_url  text
//    link_url   text
//    expires    text
//    updated_at timestamptz DEFAULT now()
//
// RLS 설정 (Supabase 대시보드 → Authentication → Policies):
//   - anon 역할: SELECT 허용 (모든 테이블)
//   - anon 역할: INSERT / UPDATE / DELETE 허용 (members, watch_history, popup_settings)
//   ※ 이 앱은 클라이언트사이드 권한 제어를 사용합니다.
//
// ===================================================================

const SUPABASE_URL    = 'https://rpqmqsnzjchsmpsjffeb.supabase.co';
const SUPABASE_ANON   = 'sb_publishable_m3zw9KPHblvy_woKJSPFAg_W1S0hPzS';

// REST API 기본 주소
const SB_REST  = `${SUPABASE_URL}/rest/v1`;
const SB_HEADS = {
  'Content-Type': 'application/json',
  'apikey':        SUPABASE_ANON,
  'Authorization': `Bearer ${SUPABASE_ANON}`,
};

// ── 공통 fetch 래퍼 ──────────────────────────────────────────────
async function sbFetch(path, options = {}) {
  const url = `${SB_REST}${path}`;
  const res  = await fetch(url, {
    ...options,
    headers: { ...SB_HEADS, ...(options.headers || {}) },
  });
  if (res.status === 204) return null;   // DELETE 등 본문 없음
  const body = await res.json();
  if (!res.ok) {
    console.error('[Supabase Error]', res.status, body);
    throw new Error(body.message || body.hint || `HTTP ${res.status}`);
  }
  return body;
}

// ===================================================================
// ===== members 테이블 헬퍼 =======================================
// ===================================================================

/** 회원 전체 조회 */
async function sbGetAllMembers() {
  return await sbFetch('/members?order=joined_at.desc') || [];
}

/** 특정 회원 조회 (id 기준) */
async function sbGetMember(userId) {
  const rows = await sbFetch(`/members?id=eq.${encodeURIComponent(userId)}&limit=1`);
  return rows && rows.length > 0 ? rows[0] : null;
}

/** 이름 + 전화번호로 회원 조회 */
async function sbFindMemberByNameTel(name, tel) {
  const rows = await sbFetch(
    `/members?name=eq.${encodeURIComponent(name)}&tel=eq.${encodeURIComponent(tel)}&limit=1`
  );
  return rows && rows.length > 0 ? rows[0] : null;
}

/** 이름 + 부서로 회원 조회 */
async function sbFindMemberByNameDept(name, dept) {
  const rows = await sbFetch(
    `/members?name=eq.${encodeURIComponent(name)}&dept=eq.${encodeURIComponent(dept)}&limit=1`
  );
  return rows && rows.length > 0 ? rows[0] : null;
}

/** 아이디 + 이름 + 전화번호로 본인 확인 */
async function sbVerifyMember(id, name, tel) {
  const rows = await sbFetch(
    `/members?id=eq.${encodeURIComponent(id)}&name=eq.${encodeURIComponent(name)}&tel=eq.${encodeURIComponent(tel)}&limit=1`
  );
  return rows && rows.length > 0 ? rows[0] : null;
}

/** 아이디 중복 체크 */
async function sbCheckIdExists(userId) {
  const rows = await sbFetch(`/members?id=eq.${encodeURIComponent(userId)}&limit=1`);
  return rows && rows.length > 0;
}

/** 회원 가입 (INSERT) */
async function sbInsertMember(data) {
  return await sbFetch('/members', {
    method: 'POST',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  });
}

/** 회원 정보 수정 (PATCH) */
async function sbUpdateMember(userId, data) {
  return await sbFetch(`/members?id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  });
}

/** 회원 삭제 (DELETE) */
async function sbDeleteMember(userId) {
  return await sbFetch(`/members?id=eq.${encodeURIComponent(userId)}`, {
    method: 'DELETE',
  });
}

/** 비밀번호 재설정 */
async function sbResetPassword(userId, newPw) {
  return await sbUpdateMember(userId, { pw: newPw });
}

// ===================================================================
// ===== watch_history 테이블 헬퍼 =================================
// ===================================================================

/** 특정 사용자의 시청내역 조회 (최신순) */
async function sbGetWatchHistory(userId) {
  return await sbFetch(
    `/watch_history?user_id=eq.${encodeURIComponent(userId)}&order=watched_at.desc`
  ) || [];
}

/** 전체 시청내역 조회 (최신순) */
async function sbGetAllWatchHistory() {
  return await sbFetch('/watch_history?order=watched_at.desc') || [];
}

/** 시청내역 삽입 (중복 방지: 같은 user_id + post_id + vid_name 1시간 이내) */
async function sbInsertWatchHistory(data) {
  // 1시간 이내 중복 체크
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const dup = await sbFetch(
    `/watch_history?user_id=eq.${encodeURIComponent(data.user_id)}&post_id=eq.${encodeURIComponent(data.post_id)}&vid_name=eq.${encodeURIComponent(data.vid_name)}&watched_at=gte.${oneHourAgo}&limit=1`
  );
  if (dup && dup.length > 0) return null; // 중복이면 건너뜀

  return await sbFetch('/watch_history', {
    method: 'POST',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  });
}

// ===================================================================
// ===== posts 테이블 헬퍼 =========================================
// ===================================================================

/** 특정 카테고리 게시물 조회 (최신순) */
async function sbGetPostsByCategory(category) {
  return await sbFetch(
    `/posts?category=eq.${encodeURIComponent(category)}&order=created_at.desc`
  ) || [];
}

/** 전체 게시물 조회 (최신순) */
async function sbGetAllPosts() {
  return await sbFetch('/posts?order=created_at.desc') || [];
}

/** 단일 게시물 조회 */
async function sbGetPost(postId) {
  const rows = await sbFetch(`/posts?id=eq.${encodeURIComponent(postId)}&limit=1`);
  return rows && rows.length > 0 ? rows[0] : null;
}

/** 게시물 INSERT */
async function sbInsertPost(data) {
  return await sbFetch('/posts', {
    method: 'POST',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  });
}

/** 게시물 UPDATE */
async function sbUpdatePost(postId, data) {
  return await sbFetch(`/posts?id=eq.${encodeURIComponent(postId)}`, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=representation' },
    body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
  });
}

/** 게시물 조회수 +1 */
async function sbIncrementViews(postId, currentViews) {
  return await sbFetch(`/posts?id=eq.${encodeURIComponent(postId)}`, {
    method: 'PATCH',
    headers: { 'Prefer': 'return=minimal' },
    body: JSON.stringify({ views: (currentViews || 0) + 1 }),
  });
}

/** 게시물 DELETE */
async function sbDeletePost(postId) {
  return await sbFetch(`/posts?id=eq.${encodeURIComponent(postId)}`, {
    method: 'DELETE',
  });
}

// Supabase DB row → 앱 내부 post 객체 변환
function sbRowToPost(row) {
  return {
    id:           row.id,
    title:        row.title        || '',
    category:     row.category     || 'main',
    author:       row.author       || '',
    dept:         row.dept         || 'all',
    date:         row.date_label   || new Date(row.created_at || Date.now()).toLocaleDateString('ko-KR'),
    views:        row.views        || 0,
    body:         row.body         || '',
    _rawContent:  row.raw_content  || '',
    videoId:      row.video_id     || '',
    _images:      Array.isArray(row.images) ? row.images : [],
    _videos:      Array.isArray(row.videos) ? row.videos : [],
    _fromDB:      true,             // DB에서 로드된 게시물 표시
  };
}

// 앱 내부 post 객체 → Supabase DB row 변환
function sbPostToRow(post) {
  return {
    id:          post.id,
    title:       post.title        || '',
    category:    post.category     || 'main',
    author:      post.author       || '',
    dept:        post.dept         || 'all',
    date_label:  post.date         || '',
    views:       post.views        || 0,
    body:        post.body         || '',
    raw_content: post._rawContent  || '',
    video_id:    post.videoId      || '',
    images:      JSON.stringify(post._images  || []),
    videos:      JSON.stringify(post._videos  || []),
  };
}

// ===================================================================
// ===== popup_settings 테이블 헬퍼 ================================
// ===================================================================

/** 팝업 설정 조회 (첫 번째 행) */
async function sbGetPopupSettings() {
  const rows = await sbFetch('/popup_settings?order=id.asc&limit=1');
  return rows && rows.length > 0 ? rows[0] : null;
}

/** 팝업 설정 저장 (upsert) */
async function sbSavePopupSettings(data) {
  // 기존 row가 있으면 PATCH, 없으면 POST
  const existing = await sbGetPopupSettings();
  if (existing) {
    return await sbFetch(`/popup_settings?id=eq.${existing.id}`, {
      method: 'PATCH',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
    });
  } else {
    return await sbFetch('/popup_settings', {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(data),
    });
  }
}

// ===================================================================
// ===== localStorage → Supabase 마이그레이션 유틸 =================
// ===================================================================

/**
 * localStorage에 남아있는 기존 데이터를 Supabase로 이전
 * 최초 1회 실행 후 localStorage 데이터를 정리함
 */
async function migrateLocalStorageToSupabase() {
  const migKey = 'sw_migrated_v1';
  if (localStorage.getItem(migKey)) return; // 이미 마이그레이션 완료

  console.log('[Migration] localStorage → Supabase 마이그레이션 시작...');

  // 1) 회원 목록 마이그레이션
  const regList = JSON.parse(localStorage.getItem('sw_reg_list') || '[]');
  for (const u of regList) {
    try {
      const exists = await sbCheckIdExists(u.id);
      if (!exists) {
        await sbInsertMember({
          id:        u.id,
          pw:        u.pw || '',
          name:      u.name || '',
          tel:       u.tel || '',
          dept:      u.dept || '',
          role:      u.role || '',
          car:       u.car || '',
          status:    u.status || 'pending',
          memo:      u.memo || '',
          joined_at: u.joinedAt || new Date().toISOString(),
        });
        console.log(`[Migration] 회원 이전: ${u.id}`);
      }
    } catch (err) {
      console.warn(`[Migration] 회원 이전 실패 (${u.id}):`, err.message);
    }
  }

  // 2) 시청내역 마이그레이션
  const watchList = JSON.parse(localStorage.getItem('sw_watch_history') || '[]');
  for (const h of watchList) {
    try {
      await sbFetch('/watch_history', {
        method: 'POST',
        headers: { 'Prefer': 'return=minimal' },
        body: JSON.stringify({
          user_id:    h.userId,
          user_name:  h.userName  || '',
          user_dept:  h.userDept  || '',
          post_id:    h.postId    || '',
          post_title: h.postTitle || '',
          post_tab:   h.postTab   || '',
          vid_name:   h.vidName   || '',
          vid_type:   h.vidType   || 'upload',
          watched_at: h.watchedAt
            ? new Date(h.watchedAt).toISOString()
            : new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('[Migration] 시청내역 이전 실패:', err.message);
    }
  }

  // 3) 팝업 설정 마이그레이션
  const popupRaw = localStorage.getItem('sw_popup_settings');
  if (popupRaw) {
    try {
      const p = JSON.parse(popupRaw);
      await sbSavePopupSettings({
        enabled:   p.enabled   || false,
        type:      p.type      || 'text',
        title:     p.title     || '',
        content:   p.content   || '',
        image_url: p.imageUrl  || '',
        link_url:  p.linkUrl   || '',
        expires:   p.expires   || '',
      });
      console.log('[Migration] 팝업 설정 이전 완료');
    } catch (err) {
      console.warn('[Migration] 팝업 설정 이전 실패:', err.message);
    }
  }

  // 4) 정적 게시물(POSTS) 마이그레이션 — dashboard.js의 POSTS 객체가 로드된 후 실행
  //    POSTS가 아직 없으면 DOMContentLoaded 이후로 지연
  const migrateStaticPosts = async () => {
    if (typeof POSTS === 'undefined') return;
    const existing = await sbGetAllPosts().catch(() => []);
    const existingIds = new Set(existing.map(r => r.id));
    let count = 0;
    for (const [cat, list] of Object.entries(POSTS)) {
      if (cat === 'admin') continue;
      for (const post of list) {
        if (existingIds.has(post.id)) continue;
        try {
          await sbInsertPost(sbPostToRow(post));
          count++;
        } catch (e) {
          console.warn(`[Migration] 게시물 이전 실패 (${post.id}):`, e.message);
        }
      }
    }
    if (count > 0) console.log(`[Migration] 정적 게시물 ${count}건 이전 완료`);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', migrateStaticPosts);
  } else {
    await migrateStaticPosts();
  }

  // 마이그레이션 완료 플래그
  localStorage.setItem(migKey, '1');
  console.log('[Migration] 완료 ✅');
}

// ===================================================================
// ===== Supabase 연결 테스트 (콘솔 확인용) ========================
// ===================================================================
(async function sbPing() {
  try {
    await sbFetch('/members?limit=1');
    console.log('[Supabase] 연결 성공 ✅');
    // 마이그레이션 자동 실행 (최초 1회)
    migrateLocalStorageToSupabase().catch(e =>
      console.warn('[Migration] 오류:', e.message)
    );
  } catch (e) {
    console.error('[Supabase] 연결 실패 ❌', e.message);
  }
})();
