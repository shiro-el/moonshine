'use client';

import { Button, Typography, Link, Card, Navigation, Hero, Carousel, Section } from '@/components';

export default function Home() {
  return (
    <>
      <Navigation
        transparent
        logo={<Typography variant="h3" color="white">Moonshine</Typography>}
        menuItems={[
          { label: '소개', href: '#about' },
          { label: '활동', href: '#activities' },
          { label: '모집', href: '/recruit' },
          { label: 'Instagram', href: 'https://instagram.com', external: true },
        ]}
      />

      <Hero
        subtitle="양조 동아리 문샤인"
        title="Moonshine Brewing Club"
        description="문샤인은 양조주에 열정을 가진 사람들이 함께 배우고, 만들고, 나누는 양조 동아리입니다."
        primaryButton={{ label: '지원하기', href: '/recruit' }}
        secondaryButton={{ label: '활동 살펴보기', href: '#activities' }}
        backgroundImage="/logo.jpeg"
        height="100vh"
        align="left"
      />

      <Section id="about" variant="default" align="left" padding="md">
        <Section.Header title="문샤인은 이런 곳이에요" subtitle="양조부터 테이스팅까지, 함께 성장합니다" align="left" />
        <Section.Grid>
          <Card variant="surface" padding="md" hover>
            <Card.Header>
              <Card.Title>정기 양조</Card.Title>
              <Card.Subtitle>레시피 설계부터 브루잉까지</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">월 1-2회 브루잉 데이를 열어 스타일별 레시피를 실험하고 기록합니다.</Typography>
            </Card.Content>
          </Card>
          <Card variant="surface" padding="md" hover>
            <Card.Header>
              <Card.Title>센서리 훈련</Card.Title>
              <Card.Subtitle>테이스팅 & 페어링</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">스타일별 테이스팅 노트를 작성하고 음식 페어링을 함께 연구합니다.</Typography>
            </Card.Content>
          </Card>
          <Card variant="surface" padding="md" hover>
            <Card.Header>
              <Card.Title>양조 스터디</Card.Title>
              <Card.Subtitle>이론부터 위생, 품질관리까지</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">발효과학, 위생 관리, Q/A 세션으로 지식을 체계적으로 쌓습니다.</Typography>
            </Card.Content>
          </Card>
        </Section.Grid>
      </Section>

      <Section id="activities" variant="surface" align="left" padding="md">
        <Section.Header title="주요 활동" subtitle="월별 프로그램으로 꾸준히 즐겨요" align="left" />
        <Section.Content>
          <Carousel autoPlay interval={4500} showDots showArrows infinite>
            <Card variant="elevated" padding="none" hover image={{ src: 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop', alt: '양조 세션', height: '360px', objectFit: 'cover' }}>
              <Card.Content>
                <Card.Header>
                  <Card.Title>정기 양조 세션</Card.Title>
                  <Card.Subtitle>Recipe 설계부터 브루잉까지</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">스타일별 레시피를 실험하고 기록합니다.</Typography>
              </Card.Content>
            </Card>

            <Card variant="elevated" padding="none" hover image={{ src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop', alt: '테이스팅', height: '360px', objectFit: 'cover' }}>
              <Card.Content>
                <Card.Header>
                  <Card.Title>테이스팅 & 페어링</Card.Title>
                  <Card.Subtitle>센서리 훈련</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">노트 작성과 음식 페어링을 함께 연구합니다.</Typography>
              </Card.Content>
            </Card>

            <Card variant="elevated" padding="none" hover image={{ src: 'https://images.unsplash.com/photo-1600850056064-cbaf9f28167f?q=80&w=1600&auto=format&fit=crop', alt: '스터디', height: '360px', objectFit: 'cover' }}>
              <Card.Content>
                <Card.Header>
                  <Card.Title>양조 스터디</Card.Title>
                  <Card.Subtitle>발효과학 · 위생 · 품질관리</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">핵심 이론과 실무 노하우를 함께 나눕니다.</Typography>
              </Card.Content>
            </Card>
          </Carousel>
        </Section.Content>
      </Section>

      <Section id="apply" variant="default" align="center" padding="md">
        <Section.Header title="신입 회원 모집" subtitle="함께 양조할 준비 되셨나요?" align="center" />
        <Section.Content>
          <Card variant="elevated" padding="lg">
            <Card.Content>
              <Typography variant="body" color="secondary" style={{ marginBottom: '24px' }}>
                문샤인 양조 동아리에 가입하고 싶으시다면 아래 버튼을 클릭하여 지원서를 작성해주세요.
              </Typography>
              <Card.Actions>
                <Link href="/recruit">
                  <Button variant="primary" size="md">지원서 작성하기</Button>
                </Link>
              </Card.Actions>
            </Card.Content>
          </Card>
        </Section.Content>
      </Section>
    </>
  );
}
