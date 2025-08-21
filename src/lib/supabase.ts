import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 지원서 데이터 타입 정의
export interface RecruitApplicationData {
  id?: string;
  name: string;
  student_id: string;
  contact: string;
  motivation: string;
  activities: string;
  interview_times: string[]; // JSON array로 저장될 선택된 면접 시간들
  additional_comments?: string;
  interview_notes?: string;
  submitted_at: string;
  created_at?: string;
  updated_at?: string;
}

// 지원서 저장 함수
export async function saveRecruitApplication(data: Omit<RecruitApplicationData, 'id' | 'created_at' | 'updated_at'>) {
  const { data: result, error } = await supabase
    .from('recruit_applications')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Supabase 저장 오류:', error);
    throw error;
  }

  return result;
}

// 지원서 조회 함수 (관리자용)
export async function getRecruitApplications() {
  const { data, error } = await supabase
    .from('recruit_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase 조회 오류:', error);
    throw error;
  }

  return data;
}

// 특정 지원서 조회 함수
export async function getRecruitApplicationById(id: string) {
  const { data, error } = await supabase
    .from('recruit_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Supabase 조회 오류:', error);
    throw error;
  }

  return data;
}
