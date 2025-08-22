'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
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
import { theme } from '@/theme/theme';

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

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
  const t = useTranslations();
  
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
    <div style={{ paddingTop: '80px' }}>
      <Navigation
        transparent
        logo={<Typography variant="h3" color="white">Moonshine</Typography>}
      />

      <Section variant="default" align="center" padding="md">
        <Section.Content>
          <Typography variant="h1" color="white">{t('recruit.title')}</Typography>
          <Typography variant="body" color="secondary">{t('recruit.subtitle')}</Typography>
        </Section.Content>
      </Section>

      <Section variant="default" align="left" padding="md">
        <Section.Content>
          <Card variant="elevated" padding="lg">
            <Form onSubmit={handleSubmit} fullWidth gap="xl">
              <Form.Title>{t('recruit.form.title')}</Form.Title>
              <Form.Subtitle>
                {t('recruit.form.subtitle')}
              </Form.Subtitle>

              <Form.Section>
                <Typography variant="h3" color="white">{t('recruit.form.basicInfo')}</Typography>
                <Form.Row>
                  <Input
                    label={`${t('recruit.form.name')} *`}
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={errors.name}
                    required
                    fullWidth

                  />
                  <Input
                    label={`${t('recruit.form.studentId')} *`}
                    placeholder="20250000"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    error={errors.studentId}
                    required
                    fullWidth

                  />
                </Form.Row>
                <Input
                  label={`${t('recruit.form.contact')} *`}
                  placeholder="010-xxxx-xxxx"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  error={errors.contact}
                  required
                  fullWidth

                />
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">{t('recruit.form.motivation')}</Typography>
                <Textarea
                  label={`${t('recruit.form.motivationLabel')} *`}
                  placeholder={t('recruit.form.motivationPlaceholder')}
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  error={errors.motivation}
                  rows={5}
                  maxLength={1000}
                  showCharacterCount
                  required
                  fullWidth

                />
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">{t('recruit.form.activities')}</Typography>
                <Textarea
                  label={`${t('recruit.form.activitiesLabel')} *`}
                  placeholder={t('recruit.form.activitiesPlaceholder')}
                  value={formData.activities}
                  onChange={(e) => handleInputChange('activities', e.target.value)}
                  error={errors.activities}
                  rows={5}
                  maxLength={1000}
                  showCharacterCount
                  required
                  fullWidth

                />
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">{t('recruit.form.interview')}</Typography>
                <Typography variant="body" color="secondary">{t('recruit.form.interviewNote')}</Typography>
                {errors.interviewTimes && (
                  <Typography variant="small" color="secondary">{errors.interviewTimes}</Typography>
                )}
                <CheckboxGrid>
                  {interviewTimeOptions.map((time) => (
                    <Checkbox
                      key={time}
                      label={time}
                      checked={formData.interviewTimes[time as keyof typeof formData.interviewTimes]}
                      onChange={(e) => handleInterviewTimeChange(time, e.target.checked)}
                      name="interviewTimes"
                    />
                  ))}
                </CheckboxGrid>
              </Form.Section>

              <Form.Section>
                <Typography variant="h3" color="white">{t('recruit.form.additional')}</Typography>
                <Textarea
                  label={t('recruit.form.additionalLabel')}
                  placeholder={t('recruit.form.additionalPlaceholder')}
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  rows={3}
                  maxLength={500}
                  showCharacterCount
                  fullWidth

                />
                <Textarea
                  label={t('recruit.form.interviewNotesLabel')}
                  placeholder={t('recruit.form.interviewNotesPlaceholder')}
                  value={formData.interviewNotes}
                  onChange={(e) => handleInputChange('interviewNotes', e.target.value)}
                  rows={3}
                  maxLength={300}
                  showCharacterCount
                  fullWidth

                />
              </Form.Section>

              <Form.Actions>
                <Button variant="secondary" type="button" disabled={isSubmitting}>{t('common.cancel')}</Button>
                <Button 
                  variant="primary" 
                  type="submit" 
                  loading={isSubmitting}
                  disabled={isSubmitting}

                >
                  {isSubmitting ? t('recruit.form.submitting') : t('recruit.form.submitButton')}
                </Button>
              </Form.Actions>
            </Form>
          </Card>
        </Section.Content>
      </Section>

      <Section variant="transparent" align="center" padding="sm">
        <Section.Content>
          <Typography variant="body" color="secondary">{t('recruit.form.contactInfo')}</Typography>
        </Section.Content>
      </Section>
    </div>
  );
}
