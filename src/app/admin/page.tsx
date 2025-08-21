'use client';

import { useState, useEffect } from 'react';
import { Card, Typography, Button, Input } from '@/components';

interface RecruitApplication {
  id: string;
  name: string;
  student_id: string;
  contact: string;
  motivation: string;
  activities: string;
  interview_times: string[];
  additional_comments?: string;
  interview_notes?: string;
  submitted_at: string;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: RecruitApplication[];
  count?: number;
}

export default function AdminPage() {
  const [applications, setApplications] = useState<RecruitApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<RecruitApplication | null>(null);

  const handleLogin = async () => {
    if (!adminKey.trim()) {
      setError('관리자 키를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/recruit?admin=${encodeURIComponent(adminKey)}`);
      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        setApplications(data.data);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError(data.message || '인증에 실패했습니다.');
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다.');
      setIsAuthenticated(false);
      console.error('로그인 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/recruit?admin=${encodeURIComponent(adminKey)}`);
      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        setApplications(data.data);
      } else {
        setError(data.message || '새로고침에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다.');
      console.error('새로고침 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    setApplications([]);
    setSelectedApplication(null);
    setError(null);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#000000'
      }}>
        <Card variant="elevated" padding="lg" style={{ maxWidth: '400px', width: '100%' }}>
          <Typography variant="h2" align="center" style={{ marginBottom: '2rem' }}>
            Moonshine 관리자
          </Typography>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <Typography variant="body" color="secondary" style={{ marginBottom: '0.5rem' }}>
              관리자 키
            </Typography>
            <Input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="관리자 키를 입력하세요"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
            />
          </div>

          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <Typography variant="small" color="primary" style={{ color: '#dc3545' }}>
                {error}
              </Typography>
            </div>
          )}

          <Button 
            variant="primary" 
            size="md" 
            fullWidth 
            loading={loading}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#000000' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <Typography variant="h1">신입 회원 지원서 관리</Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="secondary" size="sm" onClick={handleRefresh} loading={loading}>
              새로고침
            </Button>
            <Button variant="primary" size="sm" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>

        {/* 통계 */}
        <Card variant="surface" padding="md" style={{ marginBottom: '2rem' }}>
          <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
            지원서 현황
          </Typography>
          <Typography variant="body" color="secondary">
            총 {applications.length}건의 지원서가 접수되었습니다.
          </Typography>
        </Card>

        {/* 에러 메시지 */}
        {error && (
          <Card variant="surface" padding="md" style={{ marginBottom: '2rem', borderLeft: '4px solid #dc3545' }}>
            <Typography variant="body" style={{ color: '#dc3545' }}>
              {error}
            </Typography>
          </Card>
        )}

        {/* 지원서 목록 */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {applications.length === 0 ? (
            <Card variant="surface" padding="lg">
              <Typography variant="body" color="secondary" align="center">
                아직 접수된 지원서가 없습니다.
              </Typography>
            </Card>
          ) : (
            applications.map((application) => (
              <Card 
                key={application.id} 
                variant="surface" 
                padding="md" 
                hover 
                clickable
                onClick={() => setSelectedApplication(application)}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <Typography variant="h4" style={{ marginBottom: '0.25rem' }}>
                      {application.name}
                    </Typography>
                    <Typography variant="small" color="secondary">
                      {application.student_id}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body" color="secondary">
                      {application.contact}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="secondary">
                      면접 시간: {application.interview_times.length}개 선택
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" color="tertiary">
                      {formatDate(application.submitted_at)}
                    </Typography>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* 상세 보기 모달 */}
        {selectedApplication && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            zIndex: 1000
          }}>
            <Card 
              variant="elevated" 
              padding="lg" 
              style={{ 
                maxWidth: '800px', 
                width: '100%', 
                maxHeight: '80vh',
                overflow: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Typography variant="h2">지원서 상세</Typography>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setSelectedApplication(null)}
                >
                  닫기
                </Button>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>기본 정보</Typography>
                  <Card variant="default" padding="md">
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      <div><strong>이름:</strong> {selectedApplication.name}</div>
                      <div><strong>학번:</strong> {selectedApplication.student_id}</div>
                      <div><strong>연락처:</strong> {selectedApplication.contact}</div>
                      <div><strong>제출일:</strong> {formatDate(selectedApplication.submitted_at)}</div>
                    </div>
                  </Card>
                </div>

                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>지원 동기</Typography>
                  <Card variant="default" padding="md">
                    <Typography variant="body" style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedApplication.motivation}
                    </Typography>
                  </Card>
                </div>

                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>하고 싶은 활동</Typography>
                  <Card variant="default" padding="md">
                    <Typography variant="body" style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedApplication.activities}
                    </Typography>
                  </Card>
                </div>

                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>면접 가능 시간</Typography>
                  <Card variant="default" padding="md">
                    <div style={{ display: 'grid', gap: '0.25rem' }}>
                      {selectedApplication.interview_times.map((time, index) => (
                        <Typography key={index} variant="body">• {time}</Typography>
                      ))}
                    </div>
                  </Card>
                </div>

                {selectedApplication.additional_comments && (
                  <div>
                    <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>추가 사항</Typography>
                    <Card variant="default" padding="md">
                      <Typography variant="body" style={{ whiteSpace: 'pre-wrap' }}>
                        {selectedApplication.additional_comments}
                      </Typography>
                    </Card>
                  </div>
                )}

                {selectedApplication.interview_notes && (
                  <div>
                    <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>면접 관련 참고사항</Typography>
                    <Card variant="default" padding="md">
                      <Typography variant="body" style={{ whiteSpace: 'pre-wrap' }}>
                        {selectedApplication.interview_notes}
                      </Typography>
                    </Card>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
