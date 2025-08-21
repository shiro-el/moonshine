-- Moonshine 동아리 신입 회원 지원서 테이블
CREATE TABLE IF NOT EXISTS recruit_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  student_id VARCHAR(8) NOT NULL,
  contact VARCHAR(13) NOT NULL,
  motivation TEXT NOT NULL,
  activities TEXT NOT NULL,
  interview_times TEXT[] NOT NULL, -- 선택된 면접 시간들을 배열로 저장
  additional_comments TEXT,
  interview_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_recruit_applications_student_id ON recruit_applications(student_id);
CREATE INDEX IF NOT EXISTS idx_recruit_applications_submitted_at ON recruit_applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_recruit_applications_created_at ON recruit_applications(created_at);

-- 업데이트 시간 자동 갱신을 위한 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_recruit_applications_updated_at 
    BEFORE UPDATE ON recruit_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 테이블에 대한 설명 추가
COMMENT ON TABLE recruit_applications IS 'Moonshine 양조 동아리 신입 회원 지원서';
COMMENT ON COLUMN recruit_applications.name IS '지원자 이름';
COMMENT ON COLUMN recruit_applications.student_id IS '학번 (8자리)';
COMMENT ON COLUMN recruit_applications.contact IS '연락처 (010-xxxx-xxxx 형식)';
COMMENT ON COLUMN recruit_applications.motivation IS '지원 동기 (최대 1000자)';
COMMENT ON COLUMN recruit_applications.activities IS '하고 싶은 활동 (최대 1000자)';
COMMENT ON COLUMN recruit_applications.interview_times IS '선택된 면접 가능 시간들';
COMMENT ON COLUMN recruit_applications.additional_comments IS '추가 사항 (최대 500자)';
COMMENT ON COLUMN recruit_applications.interview_notes IS '면접 관련 참고사항 (최대 300자)';
COMMENT ON COLUMN recruit_applications.submitted_at IS '지원서 제출 시간';
