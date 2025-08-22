'use client';

import { Button, Typography, Link, Card, Navigation, Hero, Carousel, Section } from '@/components';

export default function Home() {
  return (
    <>
      <Navigation
        transparent
        logo={<Typography variant="h3" color="white">Moonshine</Typography>}
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
        className="mobile-hero"
      />

      <Section id="about" variant="default" align="left" padding="md" className="responsive-padding">
        <Section.Header title="Moonshine이 추구하는 가치" align="left" />
        <Section.Grid>
          <Card variant="surface" padding="md" hover className="mobile-card">
            <Card.Header>
              <Card.Title>다양성</Card.Title>
              <Card.Subtitle>맥주부터 브랜디까지</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">주종에 상관 없이 다양한 주류를 양조합니다.</Typography>
            </Card.Content>
          </Card>
          <Card variant="surface" padding="md" hover className="mobile-card">
            <Card.Header>
              <Card.Title>창의성</Card.Title>
              <Card.Subtitle>창의적인 레시피 작성</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">부원들의 아이디어가 반영된 창의적인 레시피를 시도합니다.</Typography>
            </Card.Content>
          </Card>
          <Card variant="surface" padding="md" hover className="mobile-card">
            <Card.Header>
              <Card.Title>품질중시성</Card.Title>
              <Card.Subtitle>좋은 맛과 향 추구</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">좋은 재료를 사용하여 고품질의 술이 만들어지도록 합니다.</Typography>
            </Card.Content>
          </Card>
        </Section.Grid>
      </Section>

      <Section id="activities" variant="surface" align="left" padding="md" className="responsive-padding">
        <Section.Header title="주요 활동" align="left" />
        <Section.Content>
          <Carousel autoPlay interval={4500} showDots showArrows infinite className="mobile-carousel">
            <Card variant="elevated" padding="none" hover image={{ src: '/2.jpeg', alt: '테이스팅', height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>테이스팅</Card.Title>
                  <Card.Subtitle>테이스팅 노트 작성과 연구</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">다양한 주종의 향과 맛을 경험하며 느낀 점들을 부원들과 공유하세요.</Typography>
              </Card.Content>
            </Card>

            <Card variant="elevated" padding="none" hover image={{ src: '/3.jpeg', alt: '양조학 스터디', height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>양조학 스터디</Card.Title>
                  <Card.Subtitle>양조장 및 증류소 방문</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">국내 유명 양조장 및 증류소에 방문하여 양조 과정을 알아보는 뜻깊은 시간을 가집니다.</Typography>
              </Card.Content>
            </Card>
            <Card variant="elevated" padding="none" hover image={{ src: '/1.jpeg', alt: '정기 양조', height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>정기 양조</Card.Title>
                  <Card.Subtitle>맥주, 와인, 막걸리, 위스키, 브랜디</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">Moonshine만의 특색 있는 레시피로 직접 만들어보는 술은 잊지 못할 경험으로 남을 것입니다.</Typography>
              </Card.Content>
            </Card>

            <Card variant="elevated" padding="none" hover image={{ src: '/4.jpeg', alt: '친목 활동', height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>친목 활동</Card.Title>
                  <Card.Subtitle>세련되고 조용한 모임</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">취하려고 마시는 술이 아닌, 술의 맛과 향을 즐길 수 있는 회식과 MT를 추구하고 있습니다.</Typography>
              </Card.Content>
            </Card>
          </Carousel>
        </Section.Content>
      </Section>

      <Section id="apply" variant="default" align="center" padding="md" className="responsive-padding">
        <Section.Header title="신입 회원 모집" subtitle="함께 양조할 준비 되셨나요?" align="center" />
        <Section.Content>
          <Card variant="elevated" padding="lg" className="mobile-card">
            <Card.Content>
              <Typography variant="body" color="secondary">
                문샤인 양조 동아리에 가입하고 싶으시다면 아래 버튼을 클릭하여 지원서를 작성해주세요.
              </Typography>
              <Card.Actions className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/recruit">
                  <Button variant="primary" size="md" className="touch-friendly w-full md:w-auto">지원서 작성하기</Button>
                </Link>
              </Card.Actions>
            </Card.Content>
          </Card>
        </Section.Content>
      </Section>
    </>
  );
}
