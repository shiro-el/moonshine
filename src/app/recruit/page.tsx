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
  Navigation,
  Section 
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
      // API 호출
      const response = await fetch('/api/recruit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        
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
      } else {
        // 서버에서 온 에러 처리
        if (result.errors) {
          const newErrors: FormErrors = {};
          result.errors.forEach((error: { field: string; message: string }) => {
            newErrors[error.field as keyof FormErrors] = error.message;
          });
          setErrors(newErrors);
        }
        alert(result.message || '제출 중 오류가 발생했습니다.');
      }
      
    } catch (error) {
      console.error('제출 오류:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
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
      />

      <Section variant="default" align="center" padding="md" className="responsive-padding section-with-top-margin">
        <Section.Content>
          <Typography variant="h1" color="white">Moonshine 신입 회원 모집</Typography>
          <Typography variant="body" color="secondary">양조에 열정을 가진 여러분을 기다리고 있습니다</Typography>
        </Section.Content>
      </Section>

      <Section variant="default" align="left" padding="md" className="responsive-padding">
        <Section.Content>
          <Card variant="elevated" padding="lg" className="mobile-card">
            <Form onSubmit={handleSubmit} fullWidth className="mobile-form" gap="xl">
              <Form.Title>신입 회원 지원서</Form.Title>
              <Form.Subtitle>
                ㅎㅇ
              </Form.Subtitle>

              <Form.Section>
                <Typography variant="h3" color="white">기본 정보</Typography>
                <Form.Row className="flex-col md:flex-row gap-4">
                  <Input
                    label="이름 *"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    required
                    fullWidth
                    className="touch-friendly"
                  />
                  <Input
                    label="학번 *"
                    placeholder="20250000"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    error={errors.studentId}
                    required
                    fullWidth
                    className="touch-friendly"
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
                  className="touch-friendly"
                />
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">지원 동기</Typography>
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
                  className="touch-friendly"
                />
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">활동 계획</Typography>
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
                  className="touch-friendly"
                />
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">면접 일정</Typography>
                <Typography variant="body" color="secondary">면접은 태울관 3110호에서 대면으로 진행됩니다.</Typography>
                {errors.interviewTimes && (
                  <Typography variant="small" color="secondary">{errors.interviewTimes}</Typography>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {interviewTimeOptions.map((time) => (
                    <Checkbox
                      key={time}
                      label={time}
                      checked={formData.interviewTimes[time as keyof typeof formData.interviewTimes]}
                      onChange={(e) => handleInterviewTimeChange(time, e.target.checked)}
                      name="interviewTimes"
                      className="touch-friendly"
                    />
                  ))}
                </div>
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">추가 사항</Typography>
                <Textarea
                  label="추가로 하고 싶은 말이 있다면 작성해 주세요."
                  placeholder="자유롭게 작성해주세요."
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  rows={3}
                  maxLength={500}
                  showCharacterCount
                  fullWidth
                  className="touch-friendly"
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
                  className="touch-friendly"
                />
              </Form.Section>

              <Form.Actions className="flex flex-col md:flex-row gap-4 justify-center">
                <Button variant="secondary" type="button" disabled={isSubmitting} className="touch-friendly w-full md:w-auto">취소</Button>
                <Button 
                  variant="primary" 
                  type="submit" 
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="touch-friendly w-full md:w-auto"
                >
                  {isSubmitting ? '제출 중...' : '지원서 제출'}
                </Button>
              </Form.Actions>
            </Form>
          </Card>
        </Section.Content>
      </Section>

      <Section variant="transparent" align="center" padding="sm" className="responsive-padding">
        <Section.Content>
          <Typography variant="body" color="secondary">문의사항이 있으시면 contact@moonshine.club으로 연락주세요</Typography>
        </Section.Content>
      </Section>
    </>
  );
}
