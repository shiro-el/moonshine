# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트 대시보드에서 다음 정보를 확인합니다:
   - Project URL
   - API Key (anon, public)

## 2. 환경 변수 설정

`.env` 파일에 다음 환경 변수를 추가하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# 관리자 시크릿 키 (지원서 조회용)
ADMIN_SECRET_KEY=your-admin-secret-key

# 기존 Google Sheets 설정
GOOGLE_SHEETS_SPREADSHEET_ID=1gI9ykJ9aFa_KE4jgSwoCU78cXmDKswed0tH3_UHIIg4
GOOGLE_SHEETS_CLIENT_EMAIL=moonshine@moonshine-469714.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

## 3. 데이터베이스 테이블 생성

Supabase 대시보드의 SQL Editor에서 `database-schema.sql` 파일의 내용을 실행하여 테이블을 생성합니다.

## 4. 관리자 페이지 사용법

### 관리자 페이지 접속
1. 브라우저에서 `/admin` 경로로 이동
2. 환경 변수에 설정한 `ADMIN_SECRET_KEY` 입력
3. 로그인 후 지원서 목록 확인 가능

### 관리자 페이지 기능
- **지원서 목록**: 모든 제출된 지원서 확인
- **상세 보기**: 각 지원서 클릭 시 상세 내용 확인
- **새로고침**: 최신 지원서 목록 업데이트
- **필터링**: 지원자 정보, 면접 시간 등 확인

## 5. API 사용법

### 지원서 제출 (POST)
```
POST /api/recruit
Content-Type: application/json

{
  "name": "홍길동",
  "studentId": "20240001",
  "contact": "010-1234-5678",
  "motivation": "지원 동기...",
  "activities": "하고 싶은 활동...",
  "interviewTimes": {
    "2024-01-15 14:00": true,
    "2024-01-15 15:00": false,
    "2024-01-16 14:00": true
  },
  "additionalComments": "추가 사항...",
  "interviewNotes": "면접 관련 참고사항..."
}
```

### 지원서 목록 조회 (GET, 관리자용)
```
GET /api/recruit?admin=your-admin-secret-key
```

## 6. 데이터베이스 스키마

### recruit_applications 테이블
- `id`: UUID (Primary Key)
- `name`: VARCHAR(100) - 지원자 이름
- `student_id`: VARCHAR(8) - 학번
- `contact`: VARCHAR(13) - 연락처
- `motivation`: TEXT - 지원 동기
- `activities`: TEXT - 하고 싶은 활동
- `interview_times`: TEXT[] - 선택된 면접 시간들
- `additional_comments`: TEXT - 추가 사항
- `interview_notes`: TEXT - 면접 관련 참고사항
- `submitted_at`: TIMESTAMP - 제출 시간
- `created_at`: TIMESTAMP - 생성 시간
- `updated_at`: TIMESTAMP - 수정 시간

## 7. 보안 고려사항

1. **환경 변수 보안**: `.env` 파일은 절대 Git에 커밋하지 마세요.
2. **관리자 키**: `ADMIN_SECRET_KEY`는 충분히 복잡하게 설정하세요.
3. **Supabase RLS**: 운영 환경에서는 Row Level Security를 설정하는 것을 권장합니다.

## 8. RLS (Row Level Security) 설정 (선택사항)

운영 환경에서 보안을 강화하려면 다음 RLS 정책을 추가하세요:

```sql
-- 테이블에 RLS 활성화
ALTER TABLE recruit_applications ENABLE ROW LEVEL SECURITY;

-- 삽입 허용 정책 (누구나 지원서 제출 가능)
CREATE POLICY "Anyone can insert applications" ON recruit_applications
  FOR INSERT TO anon
  WITH CHECK (true);

-- 조회 차단 정책 (기본적으로 아무도 조회 불가)
CREATE POLICY "No one can select applications" ON recruit_applications
  FOR SELECT TO anon
  USING (false);
```
