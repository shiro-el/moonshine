import { NextRequest, NextResponse } from 'next/server';
import { saveRecruitApplication, RecruitApplicationData } from '@/lib/supabase';

interface RecruitFormData {
  name: string;
  studentId: string;
  contact: string;
  motivation: string;
  activities: string;
  interviewTimes: {
    [key: string]: boolean;
  };
  additionalComments: string;
  interviewNotes: string;
}

interface ValidationError {
  field: string;
  message: string;
}

// 폼 데이터 검증 함수
function validateFormData(data: RecruitFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // 이름 검증
  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: '이름을 입력해주세요.' });
  }

  // 학번 검증
  if (!data.studentId?.trim()) {
    errors.push({ field: 'studentId', message: '학번을 입력해주세요.' });
  } else if (!/^\d{8}$/.test(data.studentId)) {
    errors.push({ field: 'studentId', message: '학번은 8자리 숫자로 입력해주세요.' });
  }

  // 연락처 검증
  if (!data.contact?.trim()) {
    errors.push({ field: 'contact', message: '연락처를 입력해주세요.' });
  } else if (!/^010-\d{4}-\d{4}$/.test(data.contact)) {
    errors.push({ field: 'contact', message: '연락처는 010-xxxx-xxxx 형식으로 입력해주세요.' });
  }

  // 지원 동기 검증
  if (!data.motivation?.trim()) {
    errors.push({ field: 'motivation', message: '지원 동기를 작성해주세요.' });
  } else if (data.motivation.length > 1000) {
    errors.push({ field: 'motivation', message: '지원 동기는 1000자 이하로 작성해주세요.' });
  }

  // 활동 계획 검증
  if (!data.activities?.trim()) {
    errors.push({ field: 'activities', message: '하고 싶은 활동을 작성해주세요.' });
  } else if (data.activities.length > 1000) {
    errors.push({ field: 'activities', message: '활동 계획은 1000자 이하로 작성해주세요.' });
  }

  // 면접 시간 검증
  const hasSelectedTime = Object.values(data.interviewTimes || {}).some(time => time === true);
  if (!hasSelectedTime) {
    errors.push({ field: 'interviewTimes', message: '면접 가능한 시간을 하나 이상 선택해주세요.' });
  }

  // 추가 사항 글자수 검증
  if (data.additionalComments && data.additionalComments.length > 500) {
    errors.push({ field: 'additionalComments', message: '추가 사항은 500자 이하로 작성해주세요.' });
  }

  if (data.interviewNotes && data.interviewNotes.length > 300) {
    errors.push({ field: 'interviewNotes', message: '면접 관련 참고사항은 300자 이하로 작성해주세요.' });
  }

  return errors;
}

// POST 요청 처리 - 지원서 제출
export async function POST(request: NextRequest) {
  try {
    const body: RecruitFormData = await request.json();
    
    // 데이터 검증
    const validationErrors = validateFormData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: '입력 데이터에 오류가 있습니다.',
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // 선택된 면접 시간 추출
    const selectedInterviewTimes = Object.entries(body.interviewTimes)
      .filter(([, selected]) => selected)
      .map(([time]) => time);

    const submittedAt = new Date().toISOString();

    // Supabase에 저장할 데이터 준비
    const applicationData: Omit<RecruitApplicationData, 'id' | 'created_at' | 'updated_at'> = {
      name: body.name,
      student_id: body.studentId,
      contact: body.contact,
      motivation: body.motivation,
      activities: body.activities,
      interview_times: selectedInterviewTimes,
      additional_comments: body.additionalComments || undefined,
      interview_notes: body.interviewNotes || undefined,
      submitted_at: submittedAt
    };

    try {
      // Supabase에 데이터 저장
      const savedApplication = await saveRecruitApplication(applicationData);
      
      console.log('=== 신입 회원 지원서 접수 완료 ===');
      console.log('지원서 ID:', savedApplication.id);
      console.log('이름:', body.name);
      console.log('학번:', body.studentId);
      console.log('연락처:', body.contact);
      console.log('선택된 면접 시간:', selectedInterviewTimes);
      console.log('제출 시간:', submittedAt);
      console.log('==============================');
      
      // 성공 응답 반환
      return NextResponse.json({
        success: true,
        message: '지원서가 성공적으로 제출되었습니다! 면접 일정은 추후 연락드리겠습니다.',
        data: {
          applicationId: savedApplication.id,
          submittedAt,
          applicantName: body.name,
          selectedInterviewTimes
        }
      });

    } catch (dbError) {
      console.error('데이터베이스 저장 오류:', dbError);
      
      // 데이터베이스 저장 실패 시에도 로그는 남겨둠
      console.log('=== 신입 회원 지원서 접수 (DB 저장 실패) ===');
      console.log('이름:', body.name);
      console.log('학번:', body.studentId);
      console.log('연락처:', body.contact);
      console.log('선택된 면접 시간:', selectedInterviewTimes);
      console.log('제출 시간:', submittedAt);
      console.log('DB 오류:', dbError);
      console.log('==========================================');
      
      return NextResponse.json(
        { 
          success: false, 
          message: '지원서 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          error: 'DATABASE_ERROR'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('지원서 제출 중 오류 발생:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    );
  }
}

// GET 요청 처리 - 지원서 목록 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('admin');
    
    // 간단한 관리자 키 확인 (실제 환경에서는 더 안전한 인증 방식 사용)
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { 
          success: false,
          message: '관리자 권한이 필요합니다.' 
        },
        { status: 401 }
      );
    }

    // 지원서 목록 조회
    const { getRecruitApplications } = await import('@/lib/supabase');
    const applications = await getRecruitApplications();
    
    return NextResponse.json({
      success: true,
      message: '지원서 목록을 성공적으로 조회했습니다.',
      data: applications,
      count: applications.length
    });

  } catch (error) {
    console.error('지원서 조회 중 오류 발생:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: '지원서 조회 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    );
  }
}
