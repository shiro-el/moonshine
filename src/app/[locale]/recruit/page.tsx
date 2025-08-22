"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import {
  Form,
  Input,
  Textarea,
  Checkbox,
  Button,
  Typography,
  Card,
  Navigation,
  Section,
} from "@/components";
import { theme } from "@/theme/theme";

const PageContainer = styled.div`
  padding-top: 80px;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  width: 100%;
  margin-top: ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.lg};
  }
  
  @media (min-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.xl};
  }
`;

const PeriodEndedTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 1rem;
`;

const PeriodEndedMessage = styled(Typography)`
  text-align: center;
`;

const FullWidthForm = styled(Form)`
  width: 100%;
`;

const FullWidthInput = styled(Input)`
  width: 100%;
`;

const FullWidthTextarea = styled(Textarea)`
  width: 100%;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  background-color: ${theme.colors.surface.secondary};
  transition: ${theme.transitions.fast};
  
  &:hover {
    background-color: ${theme.colors.surface.primary};
  }
`;

interface FormData {
  name: string;
  studentId: string;
  contact: string;
  motivation: string;
  activities: string;
  interviewTimes: {
    "9/8(월) 18:00 ~ 19:00": boolean;
    "9/8(월) 19:00 ~ 20:00": boolean;
    "9/8(월) 20:00 ~ 21:00": boolean;
    "9/8(월) 21:00 ~ 22:00": boolean;
    "9/9(화) 18:00 ~ 19:00": boolean;
    "9/9(화) 19:00 ~ 20:00": boolean;
    "9/9(화) 20:00 ~ 21:00": boolean;
    "9/9(화) 21:00 ~ 22:00": boolean;
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

const getInterviewTimeOptions = (t: ReturnType<typeof useTranslations>) => [
  t("recruit.interviewTimes.monday.18_19"),
  t("recruit.interviewTimes.monday.19_20"),
  t("recruit.interviewTimes.monday.20_21"),
  t("recruit.interviewTimes.monday.21_22"),
  t("recruit.interviewTimes.tuesday.18_19"),
  t("recruit.interviewTimes.tuesday.19_20"),
  t("recruit.interviewTimes.tuesday.20_21"),
  t("recruit.interviewTimes.tuesday.21_22"),
];

export default function RecruitPage() {
  const t = useTranslations();

  const [isRecruitmentPeriod, setIsRecruitmentPeriod] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    studentId: "",
    contact: "",
    motivation: "",
    activities: "",
    interviewTimes: {
      "9/8(월) 18:00 ~ 19:00": false,
      "9/8(월) 19:00 ~ 20:00": false,
      "9/8(월) 20:00 ~ 21:00": false,
      "9/8(월) 21:00 ~ 22:00": false,
      "9/9(화) 18:00 ~ 19:00": false,
      "9/9(화) 19:00 ~ 20:00": false,
      "9/9(화) 20:00 ~ 21:00": false,
      "9/9(화) 21:00 ~ 22:00": false,
    },
    additionalComments: "",
    interviewNotes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 리크루팅 기간 체크
  useEffect(() => {
    const checkRecruitmentPeriod = () => {
      const now = new Date();
      // 한국 시간 기준 2024년 9월 6일 자정 (KST)
      const deadline = new Date("2025-09-05T15:00:00Z"); // UTC 기준으로 9월 5일 15:00 = KST 9월 6일 00:00

      setIsRecruitmentPeriod(now < deadline);
    };

    checkRecruitmentPeriod();

    // 1분마다 체크 (선택사항)
    const interval = setInterval(checkRecruitmentPeriod, 60000);

    return () => clearInterval(interval);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = t("errors.name.required");
    }

    // 학번 검증
    if (!formData.studentId.trim()) {
      newErrors.studentId = t("errors.studentId.required");
    } else if (!/^\d{8}$/.test(formData.studentId)) {
      newErrors.studentId = t("errors.studentId.format");
    }

    // 연락처 검증
    if (!formData.contact.trim()) {
      newErrors.contact = t("errors.contact.required");
    } else if (!/^010-\d{4}-\d{4}$/.test(formData.contact)) {
      newErrors.contact = t("errors.contact.format");
    }

    // 지원 동기 검증
    if (!formData.motivation.trim()) {
      newErrors.motivation = t("errors.motivation.required");
    }

    // 활동 계획 검증
    if (!formData.activities.trim()) {
      newErrors.activities = t("errors.activities.required");
    }

    // 면접 시간 검증
    const hasSelectedTime = Object.values(formData.interviewTimes).some(
      (time) => time
    );
    if (!hasSelectedTime) {
      newErrors.interviewTimes = t("errors.interviewTimes.required");
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
      const response = await fetch("/api/recruit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);

        // 폼 초기화
        setFormData({
          name: "",
          studentId: "",
          contact: "",
          motivation: "",
          activities: "",
          interviewTimes: {
            "9/8(월) 18:00 ~ 19:00": false,
            "9/8(월) 19:00 ~ 20:00": false,
            "9/8(월) 20:00 ~ 21:00": false,
            "9/8(월) 21:00 ~ 22:00": false,
            "9/9(화) 18:00 ~ 19:00": false,
            "9/9(화) 19:00 ~ 20:00": false,
            "9/9(화) 20:00 ~ 21:00": false,
            "9/9(화) 21:00 ~ 22:00": false,
          },
          additionalComments: "",
          interviewNotes: "",
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
        alert(result.message || t("errors.submit.error"));
      }
    } catch (error) {
      console.error("제출 오류:", error);
      alert(t("errors.submit.network"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInterviewTimeChange = (time: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interviewTimes: {
        ...prev.interviewTimes,
        [time]: checked,
      },
    }));
    // 에러 메시지 제거
    if (errors.interviewTimes) {
      setErrors((prev) => ({ ...prev, interviewTimes: undefined }));
    }
  };

  return (
    <PageContainer>
      <Navigation
        transparent
        logo={
          <Typography variant="h3" color="white">
            Moonshine
          </Typography>
        }
      />

      <Section variant="default" align="center" padding="md">
        <Section.Content>
          <Typography variant="h1" color="white">
            {t("recruit.title")}
          </Typography>
          <Typography variant="body" color="secondary">
            {t("recruit.subtitle")}
          </Typography>
        </Section.Content>
      </Section>

      {!isRecruitmentPeriod ? (
        <Section variant="default" align="center" padding="lg">
          <Section.Content>
            <Card variant="elevated" padding="lg">
              <PeriodEndedTitle variant="h2" color="white">
                {t("recruit.periodEnded.title")}
              </PeriodEndedTitle>
              <PeriodEndedMessage variant="body" color="secondary">
                {t("recruit.periodEnded.message")}
                <br />
                {t("recruit.periodEnded.submessage")}
              </PeriodEndedMessage>
            </Card>
          </Section.Content>
        </Section>
      ) : (
        <Section variant="default" align="left" padding="md">
          <Section.Content>
            <Card variant="elevated" padding="lg">
              <FullWidthForm onSubmit={handleSubmit} gap="xl">
                <div>
                  <Form.Title>{t("recruit.form.title")}</Form.Title>
                  <Form.Subtitle>
                    {t("recruit.period.title")} {":"}{" "}
                    {t("recruit.period.message")}
                  </Form.Subtitle>
                </div>

                <Form.Section>
                  <Typography variant="h3" color="white">
                    {t("recruit.form.basicInfo")}
                  </Typography>
                  <Form.Row>
                    <FullWidthInput
                      label={`${t("recruit.form.name")} *`}
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      error={errors.name}
                      required
                    />
                    <FullWidthInput
                      label={`${t("recruit.form.studentId")} *`}
                      placeholder="20250000"
                      value={formData.studentId}
                      onChange={(e) =>
                        handleInputChange("studentId", e.target.value)
                      }
                      error={errors.studentId}
                      required
                    />
                  </Form.Row>
                  <FullWidthInput
                    label={`${t("recruit.form.contact")} *`}
                    placeholder="010-xxxx-xxxx"
                    value={formData.contact}
                    onChange={(e) =>
                      handleInputChange("contact", e.target.value)
                    }
                    error={errors.contact}
                    required
                  />
                </Form.Section>

                <Form.Section>
                  <Typography variant="h3" color="white">
                    {t("recruit.form.motivation")}
                  </Typography>
                  <FullWidthTextarea
                    label={`${t("recruit.form.motivationLabel")} *`}
                    placeholder={t("recruit.form.motivationPlaceholder")}
                    value={formData.motivation}
                    onChange={(e) =>
                      handleInputChange("motivation", e.target.value)
                    }
                    error={errors.motivation}
                    rows={5}
                    maxLength={1000}
                    showCharacterCount
                    required
                  />
                </Form.Section>

                <Form.Section>
                  <Typography variant="h3" color="white">
                    {t("recruit.form.activities")}
                  </Typography>
                  <FullWidthTextarea
                    label={`${t("recruit.form.activitiesLabel")} *`}
                    placeholder={t("recruit.form.activitiesPlaceholder")}
                    value={formData.activities}
                    onChange={(e) =>
                      handleInputChange("activities", e.target.value)
                    }
                    error={errors.activities}
                    rows={5}
                    maxLength={1000}
                    showCharacterCount
                    required
                  />
                </Form.Section>

                <Form.Section>
                  <Typography variant="h3" color="white">
                    {t("recruit.form.interview")}
                  </Typography>
                  <Typography variant="body" color="secondary">
                    {t("recruit.form.interviewNote")}
                  </Typography>
                  {errors.interviewTimes && (
                    <Typography variant="small" color="secondary">
                      {errors.interviewTimes}
                    </Typography>
                  )}
                                     <CheckboxGrid>
                     {getInterviewTimeOptions(t).map((time: string) => (
                       <CheckboxItem key={time}>
                         <Checkbox
                           label={time}
                           checked={
                             formData.interviewTimes[
                               time as keyof typeof formData.interviewTimes
                             ]
                           }
                           onChange={(e) =>
                             handleInterviewTimeChange(time, e.target.checked)
                           }
                           name="interviewTimes"
                         />
                       </CheckboxItem>
                     ))}
                   </CheckboxGrid>
                </Form.Section>

                <Form.Section>
                  <Typography variant="h3" color="white">
                    {t("recruit.form.additional")}
                  </Typography>
                  <FullWidthTextarea
                    label={t("recruit.form.additionalLabel")}
                    placeholder={t("recruit.form.additionalPlaceholder")}
                    value={formData.additionalComments}
                    onChange={(e) =>
                      handleInputChange("additionalComments", e.target.value)
                    }
                    rows={3}
                    maxLength={500}
                    showCharacterCount
                  />
                  <FullWidthTextarea
                    label={t("recruit.form.interviewNotesLabel")}
                    placeholder={t("recruit.form.interviewNotesPlaceholder")}
                    value={formData.interviewNotes}
                    onChange={(e) =>
                      handleInputChange("interviewNotes", e.target.value)
                    }
                    rows={3}
                    maxLength={300}
                    showCharacterCount
                  />
                </Form.Section>

                <Form.Actions>
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={isSubmitting}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("recruit.form.submitting")
                      : t("recruit.form.submitButton")}
                  </Button>
                </Form.Actions>
              </FullWidthForm>
            </Card>
          </Section.Content>
        </Section>
      )}

      <Section variant="transparent" align="center" padding="sm">
        <Section.Content>
          <Typography variant="body" color="secondary">
            {t("recruit.form.contactInfo")}
          </Typography>
        </Section.Content>
      </Section>
    </PageContainer>
  );
}
