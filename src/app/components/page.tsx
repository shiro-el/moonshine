/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography, Link, LinkWithIcon, Card, Carousel, Navigation, Hero } from '@/components';
import { theme } from '@/theme/theme';

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${theme.layout.containerPadding};
  min-height: 100vh;
  padding-top: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xl};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.primary.surface};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgb(45, 45, 48);
`;

const SectionTitle = styled(Typography)`
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid rgb(45, 45, 48);
`;

const DemoGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const FlexGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const CodeBlock = styled.pre`
  background-color: ${theme.colors.primary.background};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.text.secondary};
  overflow-x: auto;
  border: 1px solid rgb(45, 45, 48);
  margin-top: ${theme.spacing.md};
`;

const DemoCard = styled(Card)`
  margin-bottom: ${theme.spacing.md};
`;

// 아이콘 컴포넌트 (예시용)
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06z"/>
  </svg>
);

export default function ComponentsPage() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleLoadingDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return (
    <Container>
      <Header>
        <Typography variant="h1" align="center">
          컴포넌트 라이브러리
        </Typography>
        <Typography variant="body" color="secondary" align="center" style={{ marginTop: theme.spacing.md }}>
          Linear Dark Theme를 기반으로 한 재사용 가능한 컴포넌트들
        </Typography>
      </Header>

      {/* Typography Section */}
      <Section>
        <SectionTitle variant="h2">Typography</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h1">Heading 1 - Hero Text</Typography>
            <CodeBlock>{`<Typography variant="h1">Heading 1 - Hero Text</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h2">Heading 2 - Title Text</Typography>
            <CodeBlock>{`<Typography variant="h2">Heading 2 - Title Text</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h3">Heading 3 - Section Title</Typography>
            <CodeBlock>{`<Typography variant="h3">Heading 3 - Section Title</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4">Heading 4 - Subsection Title</Typography>
            <CodeBlock>{`<Typography variant="h4">Heading 4 - Subsection Title</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="body">Body text - 일반적인 본문 텍스트입니다. 이것은 읽기 편한 크기와 간격으로 설정되어 있습니다.</Typography>
            <CodeBlock>{`<Typography variant="body">Body text</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="large">Large text - 중요한 내용을 강조할 때 사용합니다.</Typography>
            <CodeBlock>{`<Typography variant="large">Large text</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="small">Small text - 부가 정보나 캡션에 사용합니다.</Typography>
            <CodeBlock>{`<Typography variant="small">Small text</Typography>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="body" color="secondary">Secondary color text</Typography>
            <Typography variant="body" color="tertiary">Tertiary color text</Typography>
            <Typography variant="body" color="white">White color text</Typography>
          </div>
        </DemoGrid>
      </Section>

      {/* Button Section */}
      <Section>
        <SectionTitle variant="h2">Buttons</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>버튼 변형</Typography>
            <FlexGroup>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="card">Card Button</Button>
            </FlexGroup>
            <CodeBlock>{`<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="card">Card Button</Button>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>버튼 크기</Typography>
            <FlexGroup>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </FlexGroup>
            <CodeBlock>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>버튼 상태</Typography>
            <FlexGroup>
              <Button loading={buttonLoading} onClick={handleLoadingDemo}>
                {buttonLoading ? '로딩 중...' : '로딩 데모'}
              </Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth style={{ marginTop: theme.spacing.md }}>Full Width Button</Button>
            </FlexGroup>
            <CodeBlock>{`<Button loading={true}>로딩 중...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width Button</Button>`}</CodeBlock>
          </div>
        </DemoGrid>
      </Section>

      {/* Link Section */}
      <Section>
        <SectionTitle variant="h2">Links</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>링크 변형</Typography>
            <FlexGroup>
              <Link href="/components" variant="primary">Primary Link</Link>
              <Link href="/components" variant="secondary">Secondary Link</Link>
              <Link href="/components" variant="white">White Link</Link>
            </FlexGroup>
            <CodeBlock>{`<Link href="/path" variant="primary">Primary Link</Link>
<Link href="/path" variant="secondary">Secondary Link</Link>
<Link href="/path" variant="white">White Link</Link>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>외부 링크</Typography>
            <FlexGroup>
              <Link href="https://linear.app" external>Linear.app 방문</Link>
              <Link href="https://github.com" external underline>GitHub (밑줄 포함)</Link>
            </FlexGroup>
            <CodeBlock>{`<Link href="https://example.com" external>외부 링크</Link>
<Link href="https://example.com" external underline>밑줄 포함</Link>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>아이콘과 함께</Typography>
            <FlexGroup>
              <LinkWithIcon 
                href="/components" 
                icon={<ArrowIcon />} 
                iconPosition="left"
              >
                왼쪽 아이콘
              </LinkWithIcon>
              <LinkWithIcon 
                href="/components" 
                icon={<ArrowIcon />} 
                iconPosition="right"
                variant="secondary"
              >
                오른쪽 아이콘
              </LinkWithIcon>
            </FlexGroup>
            <CodeBlock>{`<LinkWithIcon href="/path" icon={<Icon />} iconPosition="left">
  왼쪽 아이콘
</LinkWithIcon>`}</CodeBlock>
          </div>
        </DemoGrid>
      </Section>

      {/* Card Section */}
      <Section>
        <SectionTitle variant="h2">Cards</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>카드 변형</Typography>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: theme.spacing.md }}>
              <DemoCard variant="default">
                <Card.Header>
                  <Card.Title>Default Card</Card.Title>
                  <Card.Subtitle>기본 카드 스타일</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  이것은 기본 카드 컴포넌트입니다. 다양한 용도로 사용할 수 있습니다.
                </Card.Content>
              </DemoCard>

              <DemoCard variant="surface">
                <Card.Header>
                  <Card.Title>Surface Card</Card.Title>
                  <Card.Subtitle>표면 스타일 카드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  배경색이 다른 카드 변형입니다.
                </Card.Content>
              </DemoCard>

              <DemoCard variant="elevated">
                <Card.Header>
                  <Card.Title>Elevated Card</Card.Title>
                  <Card.Subtitle>그림자가 있는 카드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  그림자와 테두리가 있는 강조된 카드입니다.
                </Card.Content>
              </DemoCard>
            </div>

            <CodeBlock>{`<Card variant="default">
  <Card.Header>
    <Card.Title>제목</Card.Title>
    <Card.Subtitle>부제목</Card.Subtitle>
  </Card.Header>
  <Card.Content>내용</Card.Content>
</Card>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>이미지가 있는 카드</Typography>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: theme.spacing.md }}>
              <DemoCard 
                variant="elevated"
                image={{
                  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
                  alt: '산 풍경',
                  height: '200px',
                  objectFit: 'cover'
                }}
              >
                <Card.Header>
                  <Card.Title>이미지 카드</Card.Title>
                  <Card.Subtitle>이미지가 포함된 카드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  이미지와 함께 사용할 수 있는 카드입니다. 다양한 레이아웃에 활용 가능합니다.
                </Card.Content>
              </DemoCard>

              <DemoCard 
                variant="surface"
                image={{
                  src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=200&fit=crop',
                  alt: '도시 풍경',
                  height: '180px',
                  objectFit: 'cover'
                }}
                hover
              >
                <Card.Header>
                  <Card.Title>호버 이미지 카드</Card.Title>
                  <Card.Subtitle>호버 효과가 있는 이미지 카드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  마우스를 올리면 호버 효과가 나타나는 이미지 카드입니다.
                </Card.Content>
              </DemoCard>
            </div>

            <CodeBlock>{`<Card 
  variant="elevated"
  image={{
    src: "image-url.jpg",
    alt: "이미지 설명",
    height: "200px",
    objectFit: "cover"
  }}
>
  <Card.Header>
    <Card.Title>제목</Card.Title>
    <Card.Subtitle>부제목</Card.Subtitle>
  </Card.Header>
  <Card.Content>내용</Card.Content>
</Card>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>인터랙티브 카드</Typography>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: theme.spacing.md }}>
              <Card hover>
                <Card.Header>
                  <Card.Title>Hover Card</Card.Title>
                  <Card.Subtitle>호버 효과가 있는 카드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  마우스를 올리면 호버 효과가 나타납니다.
                </Card.Content>
              </Card>

              <Card clickable onClick={() => alert('카드가 클릭되었습니다!')}>
                <Card.Header>
                  <Card.Title>Clickable Card</Card.Title>
                  <Card.Subtitle>클릭 가능한 카드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  이 카드를 클릭해보세요!
                </Card.Content>
              </Card>
            </div>

            <CodeBlock>{`<Card hover>...</Card>
<Card clickable onClick={handleClick}>...</Card>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>카드와 액션</Typography>
            
            <Card>
              <Card.Header>
                <Card.Title>프로젝트 카드</Card.Title>
                <Card.Subtitle>액션 버튼이 있는 카드</Card.Subtitle>
              </Card.Header>
              <Card.Content>
                이 카드에는 푸터에 액션 버튼들이 있습니다. 실제 프로젝트에서는 이런 패턴을 자주 사용합니다.
              </Card.Content>
              <Card.Footer>
                <Typography variant="small" color="tertiary">
                  마지막 업데이트: 2024년 1월 15일
                </Typography>
                <Card.Actions>
                  <Button variant="secondary" size="sm">취소</Button>
                  <Button variant="primary" size="sm">확인</Button>
                </Card.Actions>
              </Card.Footer>
            </Card>

            <CodeBlock>{`<Card>
  <Card.Header>...</Card.Header>
  <Card.Content>...</Card.Content>
  <Card.Footer>
    <Typography variant="small" color="tertiary">정보</Typography>
    <Card.Actions>
      <Button variant="secondary">취소</Button>
      <Button variant="primary">확인</Button>
    </Card.Actions>
  </Card.Footer>
</Card>`}</CodeBlock>
          </div>
        </DemoGrid>
      </Section>

      {/* Carousel Section */}
      <Section>
        <SectionTitle variant="h2">Carousel</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>기본 Carousel</Typography>
            
            <Carousel showDots showArrows>
              <Card variant="elevated">
                <Card.Header>
                  <Card.Title>슬라이드 1</Card.Title>
                  <Card.Subtitle>첫 번째 슬라이드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  이것은 Carousel의 첫 번째 슬라이드입니다. 화살표나 점을 클릭하여 다른 슬라이드로 이동할 수 있습니다.
                </Card.Content>
              </Card>
              
              <Card variant="elevated">
                <Card.Header>
                  <Card.Title>슬라이드 2</Card.Title>
                  <Card.Subtitle>두 번째 슬라이드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  두 번째 슬라이드입니다. Carousel은 여러 개의 아이템을 순차적으로 보여줄 수 있습니다.
                </Card.Content>
              </Card>
              
              <Card variant="elevated">
                <Card.Header>
                  <Card.Title>슬라이드 3</Card.Title>
                  <Card.Subtitle>세 번째 슬라이드</Card.Subtitle>
                </Card.Header>
                <Card.Content>
                  마지막 슬라이드입니다. 무한 루프로 설정되어 있어 끝에서 다시 처음으로 돌아갑니다.
                </Card.Content>
              </Card>
            </Carousel>

            <CodeBlock>{`<Carousel showDots showArrows>
  <Card>슬라이드 1</Card>
  <Card>슬라이드 2</Card>
  <Card>슬라이드 3</Card>
</Carousel>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>자동 재생 Carousel</Typography>
            
            <Carousel autoPlay interval={4000} showDots showArrows>
              <Card 
                variant="elevated"
                image={{
                  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop',
                  alt: '산 풍경',
                  height: '300px'
                }}
              >
                <Card.Header>
                  <Card.Title>자동 재생 슬라이드 1</Card.Title>
                  <Card.Subtitle>4초마다 자동으로 전환됩니다</Card.Subtitle>
                </Card.Header>
              </Card>
              
              <Card 
                variant="elevated"
                image={{
                  src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=300&fit=crop',
                  alt: '도시 풍경',
                  height: '300px'
                }}
              >
                <Card.Header>
                  <Card.Title>자동 재생 슬라이드 2</Card.Title>
                  <Card.Subtitle>마우스를 올리면 자동 재생이 일시정지됩니다</Card.Subtitle>
                </Card.Header>
              </Card>
              
              <Card 
                variant="elevated"
                image={{
                  src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=300&fit=crop',
                  alt: '숲 풍경',
                  height: '300px'
                }}
              >
                <Card.Header>
                  <Card.Title>자동 재생 슬라이드 3</Card.Title>
                  <Card.Subtitle>마우스를 벗어나면 다시 자동 재생됩니다</Card.Subtitle>
                </Card.Header>
              </Card>
            </Carousel>

            <CodeBlock>{`<Carousel autoPlay interval={4000} showDots showArrows>
  <Card image={{ src: "image1.jpg", alt: "설명" }}>슬라이드 1</Card>
  <Card image={{ src: "image2.jpg", alt: "설명" }}>슬라이드 2</Card>
  <Card image={{ src: "image3.jpg", alt: "설명" }}>슬라이드 3</Card>
</Carousel>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>Carousel 옵션</Typography>
            
            <Card>
              <Card.Header>
                <Card.Title>Carousel Props</Card.Title>
                <Card.Subtitle>사용 가능한 옵션들</Card.Subtitle>
              </Card.Header>
              <Card.Content>
                <ul style={{ color: theme.colors.text.secondary, paddingLeft: theme.spacing.lg }}>
                  <li><strong>autoPlay</strong>: 자동 재생 여부 (기본값: false)</li>
                  <li><strong>interval</strong>: 자동 재생 간격 (기본값: 3000ms)</li>
                  <li><strong>showDots</strong>: 하단 점 표시 여부 (기본값: true)</li>
                  <li><strong>showArrows</strong>: 화살표 표시 여부 (기본값: true)</li>
                  <li><strong>infinite</strong>: 무한 루프 여부 (기본값: true)</li>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </DemoGrid>
      </Section>

      {/* Navigation Section */}
      <Section>
        <SectionTitle variant="h2">Navigation</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>기본 Navigation</Typography>
            
            <div style={{ border: '1px solid rgb(45, 45, 48)', borderRadius: theme.borderRadius.md, overflow: 'hidden', width: '100%' }}>
              <Navigation 
                menuItems={[
                  { label: '홈', href: '/' },
                  { label: '컴포넌트', href: '/components' },
                  { label: '문서', href: 'https://github.com', external: true },
                ]}
                ctaButton={{
                  label: '시작하기',
                  href: '/components',
                  variant: 'primary',
                }}
              />
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.colors.primary.background }}>
                <Typography variant="body" color="secondary">Navigation 컴포넌트가 여기에 표시됩니다</Typography>
              </div>
            </div>

            <CodeBlock>{`<Navigation 
  menuItems={[
    { label: '홈', href: '/' },
    { label: '컴포넌트', href: '/components' },
    { label: '문서', href: 'https://github.com', external: true },
  ]}
  ctaButton={{
    label: '시작하기',
    href: '/components',
    variant: 'primary',
  }}
/>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>투명 Navigation</Typography>
            
            <div style={{ border: '1px solid rgb(45, 45, 48)', borderRadius: theme.borderRadius.md, overflow: 'hidden', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', width: '100%' }}>
              <Navigation 
                transparent={true}
                menuItems={[
                  { label: '홈', href: '/' },
                  { label: '컴포넌트', href: '/components' },
                  { label: '문서', href: 'https://github.com', external: true },
                ]}
                ctaButton={{
                  label: '시작하기',
                  href: '/components',
                  variant: 'primary',
                }}
              />
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body" color="white">투명 배경의 Navigation</Typography>
              </div>
            </div>

            <CodeBlock>{`<Navigation 
  transparent={true}
  menuItems={[...]}
  ctaButton={{...}}
/>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>Navigation 옵션</Typography>
            
            <Card>
              <Card.Header>
                <Card.Title>Navigation Props</Card.Title>
                <Card.Subtitle>사용 가능한 옵션들</Card.Subtitle>
              </Card.Header>
              <Card.Content>
                <ul style={{ color: theme.colors.text.secondary, paddingLeft: theme.spacing.lg }}>
                  <li><strong>logo</strong>: 로고 텍스트 또는 컴포넌트 (기본값: 'Moonshine')</li>
                  <li><strong>menuItems</strong>: 메뉴 아이템 배열</li>
                  <li><strong>ctaButton</strong>: CTA 버튼 설정</li>
                  <li><strong>transparent</strong>: 투명 배경 여부 (기본값: false)</li>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </DemoGrid>
      </Section>

      {/* Hero Section */}
      <Section>
        <SectionTitle variant="h2">Hero</SectionTitle>
        
        <DemoGrid>
          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>기본 Hero</Typography>
            
            <div style={{ border: '1px solid rgb(45, 45, 48)', borderRadius: theme.borderRadius.md, overflow: 'hidden', width: '100%' }}>
              <Hero
                title="Hero 컴포넌트"
                subtitle="모던한 히어로 섹션"
                description="이것은 Hero 컴포넌트의 기본 예시입니다. 제목, 부제목, 설명, 버튼들을 포함할 수 있습니다."
                primaryButton={{
                  label: '시작하기',
                  href: '/components',
                }}
                secondaryButton={{
                  label: '자세히 보기',
                  href: 'https://github.com',
                  external: true,
                }}
                height="400px"
              />
            </div>

            <CodeBlock>{`<Hero
  title="Hero 컴포넌트"
  subtitle="모던한 히어로 섹션"
  description="설명 텍스트"
  primaryButton={{
    label: '시작하기',
    href: '/components',
  }}
  secondaryButton={{
    label: '자세히 보기',
    href: 'https://github.com',
    external: true,
  }}
  height="400px"
/>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>배경 이미지 Hero</Typography>
            
            <div style={{ border: '1px solid rgb(45, 45, 48)', borderRadius: theme.borderRadius.md, overflow: 'hidden', width: '100%' }}>
              <Hero
                title="배경 이미지 Hero"
                subtitle="이미지가 있는 히어로 섹션"
                description="배경 이미지와 함께 사용할 수 있는 Hero 컴포넌트입니다."
                primaryButton={{
                  label: '시작하기',
                  href: '/components',
                }}
                backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
                height="400px"
              />
            </div>

            <CodeBlock>{`<Hero
  title="배경 이미지 Hero"
  subtitle="이미지가 있는 히어로 섹션"
  description="설명 텍스트"
  primaryButton={{
    label: '시작하기',
    href: '/components',
  }}
  backgroundImage="image-url.jpg"
  height="400px"
/>`}</CodeBlock>
          </div>

          <div>
            <Typography variant="h4" style={{ marginBottom: theme.spacing.md }}>Hero 옵션</Typography>
            
            <Card>
              <Card.Header>
                <Card.Title>Hero Props</Card.Title>
                <Card.Subtitle>사용 가능한 옵션들</Card.Subtitle>
              </Card.Header>
              <Card.Content>
                <ul style={{ color: theme.colors.text.secondary, paddingLeft: theme.spacing.lg }}>
                  <li><strong>title</strong>: 메인 제목 (필수)</li>
                  <li><strong>subtitle</strong>: 부제목</li>
                  <li><strong>description</strong>: 설명 텍스트</li>
                  <li><strong>primaryButton</strong>: 주요 버튼</li>
                  <li><strong>secondaryButton</strong>: 보조 버튼</li>
                  <li><strong>backgroundImage</strong>: 배경 이미지 URL</li>
                  <li><strong>backgroundGradient</strong>: 배경 그라데이션</li>
                  <li><strong>height</strong>: 높이 (기본값: '100vh')</li>
                  <li><strong>align</strong>: 정렬 ('left', 'center', 'right')</li>
                </ul>
              </Card.Content>
            </Card>
          </div>
        </DemoGrid>
      </Section>

      {/* Usage Guidelines */}
      <Section>
        <SectionTitle variant="h2">사용 가이드라인</SectionTitle>
        
        <DemoGrid>
          <Card>
            <Card.Header>
              <Card.Title>컴포넌트 Import</Card.Title>
            </Card.Header>
            <Card.Content>
              <CodeBlock>{`import { Button, Typography, Link, Card } from '@/components';`}</CodeBlock>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>테마 사용</Card.Title>
            </Card.Header>
            <Card.Content>
              <CodeBlock>{`import { theme } from '@/theme/theme';

// styled-components에서 사용
const StyledComponent = styled.div\`
  color: \${theme.colors.text.primary};
  background: \${theme.colors.primary.surface};
  border-radius: \${theme.borderRadius.md};
\`;`}</CodeBlock>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>일관성 있는 디자인</Card.Title>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" style={{ marginBottom: theme.spacing.md }}>
                모든 컴포넌트는 Linear의 디자인 원칙을 따라 제작되었습니다:
              </Typography>
              <ul style={{ color: theme.colors.text.secondary, paddingLeft: theme.spacing.lg }}>
                <li>최소한의 디자인과 명확한 계층구조</li>
                <li>일관된 간격과 타이포그래피</li>
                <li>부드러운 애니메이션과 전환효과</li>
                <li>접근성을 고려한 색상 대비</li>
              </ul>
            </Card.Content>
          </Card>
        </DemoGrid>
      </Section>
    </Container>
  );
}
