'use client';

import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Textarea, 
  Checkbox, 
  Button, 
  Typography, 
  Card, 
  Navigation 
} from '@/components';

interface FormData {
  name: string;
  studentId: string;
  contact: string;
  motivation: string;
  activities: string;
  interviewTimes: {
    '9/8(월) 18:00 ~ 19:00': boolean;
    '9/8(월) 19:00 ~ 20:00': boolean;
    '9/8(월) 20:00 ~ 21:00': boolean;
    '9/8(월) 21:00 ~ 22:00': boolean;
    '9/9(화) 18:00 ~ 19:00': boolean;
    '9/9(화) 19:00 ~ 20:00': boolean;
    '9/9(화) 20:00 ~ 21:00': boolean;
    '9/9(화) 21:00 ~ 22:00': boolean;
  };
  additionalComments: string;
  interviewNotes: string;
}

interface FormErrors {
  name?: string;
  studentId?: string;
  contact?: string;
  motivation?: string;
  activities?: string;
  interviewTimes?: string;
  additionalComments?: string;
  interviewNotes?: string;
}

const interviewTimeOptions = [
  '9/8(월) 18:00 ~ 19:00',
  '9/8(월) 19:00 ~ 20:00',
  '9/8(월) 20:00 ~ 21:00',
  '9/8(월) 21:00 ~ 22:00',
  '9/9(화) 18:00 ~ 19:00',
  '9/9(화) 19:00 ~ 20:00',
  '9/9(화) 20:00 ~ 21:00',
  '9/9(화) 21:00 ~ 22:00',
];

export default function RecruitPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    studentId: '',
    contact: '',
    motivation: '',
    activities: '',
    interviewTimes: {
      '9/8(월) 18:00 ~ 19:00': false,
      '9/8(월) 19:00 ~ 20:00': false,
      '9/8(월) 20:00 ~ 21:00': false,
      '9/8(월) 21:00 ~ 22:00': false,
      '9/9(화) 18:00 ~ 19:00': false,
      '9/9(화) 19:00 ~ 20:00': false,
      '9/9(화) 20:00 ~ 21:00': false,
      '9/9(화) 21:00 ~ 22:00': false,
    },
    additionalComments: '',
    interviewNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    // 학번 검증
    if (!formData.studentId.trim()) {
      newErrors.studentId = '학번을 입력해주세요.';
    } else if (!/^\d{8}$/.test(formData.studentId)) {
      newErrors.studentId = '학번은 8자리 숫자로 입력해주세요.';
    }

    // 연락처 검증
    if (!formData.contact.trim()) {
      newErrors.contact = '연락처를 입력해주세요.';
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.contact)) {
      newErrors.contact = '연락처는 010-xxxx-xxxx 형식으로 입력해주세요.';
    }

    // 지원 동기 검증
    if (!formData.motivation.trim()) {
      newErrors.motivation = '지원 동기를 작성해주세요.';
    }

    // 활동 계획 검증
    if (!formData.activities.trim()) {
      newErrors.activities = '하고 싶은 활동을 작성해주세요.';
    }

    // 면접 시간 검증
    const hasSelectedTime = Object.values(formData.interviewTimes).some(time => time);
    if (!hasSelectedTime) {
      newErrors.interviewTimes = '면접 가능한 시간을 하나 이상 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 제출 로직 (현재는 시뮬레이션)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('지원서가 성공적으로 제출되었습니다! 면접 일정은 추후 연락드리겠습니다.');
      
      // 폼 초기화
      setFormData({
        name: '',
        studentId: '',
        contact: '',
        motivation: '',
        activities: '',
        interviewTimes: {
          '9/8(월) 18:00 ~ 19:00': false,
          '9/8(월) 19:00 ~ 20:00': false,
          '9/8(월) 20:00 ~ 21:00': false,
          '9/8(월) 21:00 ~ 22:00': false,
          '9/9(화) 18:00 ~ 19:00': false,
          '9/9(화) 19:00 ~ 20:00': false,
          '9/9(화) 20:00 ~ 21:00': false,
          '9/9(화) 21:00 ~ 22:00': false,
        },
        additionalComments: '',
        interviewNotes: '',
      });
      setErrors({});
      
    } catch (error) {
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInterviewTimeChange = (time: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interviewTimes: {
        ...prev.interviewTimes,
        [time]: checked,
      }
    }));
    // 에러 메시지 제거
    if (errors.interviewTimes) {
      setErrors(prev => ({ ...prev, interviewTimes: undefined }));
    }
  };

  return (
    <>
      <Navigation
        transparent
        logo={<Typography variant="h3" color="white">Moonshine</Typography>}
        menuItems={[
          { label: '홈', href: '/' },
          { label: '소개', href: '/#about' },
          { label: '활동', href: '/#activities' },
        ]}
        ctaButton={{ label: '컴포넌트', href: '/components', variant: 'primary' }}
      />

      <div style={{ 
        minHeight: '100vh', 
        background: '#000000',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '0 24px' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Typography variant="h1" color="white" style={{ marginBottom: '16px' }}>
              Moonshine 신입 회원 모집
            </Typography>
            <Typography variant="body" color="white" style={{ opacity: 0.9 }}>
              양조에 열정을 가진 여러분을 기다리고 있습니다
            </Typography>
          </div>

          <Card variant="elevated" padding="lg">
            <Form onSubmit={handleSubmit} fullWidth>
              <Form.Title>신입 회원 지원서</Form.Title>
              <Form.Subtitle>
                아래 양식을 작성하여 Moonshine 양조 동아리에 지원해주세요.
              </Form.Subtitle>

              <Form.Section>
                {/* 기본 정보 */}
                <Typography variant="h3" style={{ marginBottom: '24px', color: '#f7f8f8' }}>
                  기본 정보
                </Typography>

                <Form.Row>
                  <Input
                    label="이름 *"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    required
                    fullWidth
                  />
                  <Input
                    label="학번 *"
                    placeholder="20250000"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    error={errors.studentId}
                    required
                    fullWidth
                  />
                </Form.Row>

                <Input
                  label="연락처 *"
                  placeholder="010-xxxx-xxxx"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  error={errors.contact}
                  required
                  fullWidth
                />

                {/* 지원 동기 */}
                <Typography variant="h3" style={{ marginBottom: '24px', marginTop: '40px', color: '#f7f8f8' }}>
                  지원 동기
                </Typography>

                <Textarea
                  label="Moonshine에 지원하게 된 동기를 작성해 주세요. *"
                  placeholder="양조에 대한 관심, Moonshine을 선택한 이유 등을 자유롭게 작성해주세요."
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  error={errors.motivation}
                  rows={5}
                  maxLength={1000}
                  showCharacterCount
                  required
                  fullWidth
                />

                {/* 활동 계획 */}
                <Typography variant="h3" style={{ marginBottom: '24px', marginTop: '40px', color: '#f7f8f8' }}>
                  활동 계획
                </Typography>

                <Textarea
                  label="Moonshine에 들어와서 하고 싶은 활동을 작성해 주세요. *"
                  placeholder="이미 Moonshine에서 하고 있는 활동을 적으셔도 되고, 새롭게 하고 싶은 활동을 적으셔도 됩니다."
                  value={formData.activities}
                  onChange={(e) => handleInputChange('activities', e.target.value)}
                  error={errors.activities}
                  rows={5}
                  maxLength={1000}
                  showCharacterCount
                  required
                  fullWidth
                />

                {/* 면접 시간 */}
                <Typography variant="h3" style={{ marginBottom: '24px', marginTop: '40px', color: '#f7f8f8' }}>
                  면접 일정
                </Typography>

                <Typography variant="body" color="secondary" style={{ marginBottom: '16px' }}>
                  면접은 태울관 3110호에서 대면으로 진행됩니다.
                </Typography>

                {errors.interviewTimes && (
                  <Typography variant="small" color="secondary" style={{ marginBottom: '16px', color: '#ef4444' }}>
                    {errors.interviewTimes}
                  </Typography>
                )}

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {interviewTimeOptions.map((time) => (
                    <Checkbox
                      key={time}
                      label={time}
                      checked={formData.interviewTimes[time as keyof typeof formData.interviewTimes]}
                      onChange={(e) => handleInterviewTimeChange(time, e.target.checked)}
                      name="interviewTimes"
                    />
                  ))}
                </div>

                {/* 추가 사항 */}
                <Typography variant="h3" style={{ marginBottom: '24px', marginTop: '40px', color: '#f7f8f8' }}>
                  추가 사항
                </Typography>

                <Textarea
                  label="추가로 하고 싶은 말이 있다면 작성해 주세요."
                  placeholder="자유롭게 작성해주세요."
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  rows={3}
                  maxLength={500}
                  showCharacterCount
                  fullWidth
                />

                <Textarea
                  label="면접 시간과 관련해서 참고해야 하는 것이 있다면 입력해 주세요."
                  placeholder="예시: 21:00 ~ 22:00에 된다고 체크했는데, 21:30 이후로만 가능해요 등"
                  value={formData.interviewNotes}
                  onChange={(e) => handleInputChange('interviewNotes', e.target.value)}
                  rows={3}
                  maxLength={300}
                  showCharacterCount
                  fullWidth
                />
              </Form.Section>

              <Form.Actions>
                <Button variant="secondary" type="button" disabled={isSubmitting}>
                  취소
                </Button>
                <Button 
                  variant="primary" 
                  type="submit" 
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '제출 중...' : '지원서 제출'}
                </Button>
              </Form.Actions>
            </Form>
          </Card>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Typography variant="body" color="white" style={{ opacity: 0.8 }}>
              문의사항이 있으시면 contact@moonshine.club으로 연락주세요
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}
