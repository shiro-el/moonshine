'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography, Link, Card, Navigation, Hero, Carousel, Section } from '@/components';

export default function Home() {
  const t = useTranslations();
  
  return (
    <>
      <Navigation
        transparent
        logo={<Typography variant="h3" color="white">Moonshine</Typography>}
      />

      <Hero
        subtitle={t('hero.subtitle')}
        title={t('hero.title')}
        description={t('hero.description')}
        primaryButton={{ label: t('hero.primaryButton'), href: '/recruit' }}
        secondaryButton={{ label: t('hero.secondaryButton'), href: '#activities' }}
        backgroundImage="/logo.jpeg"
        height="100vh"
        align="left"
        className="mobile-hero"
      />

      <Section id="about" variant="default" align="left" padding="md" className="responsive-padding">
        <Section.Header title={t('about.title')} align="left" />
        <Section.Grid>
          <Card variant="surface" padding="md" hover className="mobile-card">
            <Card.Header>
              <Card.Title>{t('about.diversity.title')}</Card.Title>
              <Card.Subtitle>{t('about.diversity.subtitle')}</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">{t('about.diversity.description')}</Typography>
            </Card.Content>
          </Card>
          <Card variant="surface" padding="md" hover className="mobile-card">
            <Card.Header>
              <Card.Title>{t('about.creativity.title')}</Card.Title>
              <Card.Subtitle>{t('about.creativity.subtitle')}</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">{t('about.creativity.description')}</Typography>
            </Card.Content>
          </Card>
          <Card variant="surface" padding="md" hover className="mobile-card">
            <Card.Header>
              <Card.Title>{t('about.quality.title')}</Card.Title>
              <Card.Subtitle>{t('about.quality.subtitle')}</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">{t('about.quality.description')}</Typography>
            </Card.Content>
          </Card>
        </Section.Grid>
      </Section>

      <Section id="activities" variant="surface" align="left" padding="md" className="responsive-padding">
        <Section.Header title={t('activities.title')} align="left" />
        <Section.Content>
          <Carousel autoPlay interval={4500} showDots showArrows infinite className="mobile-carousel">
            <Card variant="elevated" padding="none" hover image={{ src: '/2.jpeg', alt: t('activities.tasting.title'), height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t('activities.tasting.title')}</Card.Title>
                  <Card.Subtitle>{t('activities.tasting.subtitle')}</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">{t('activities.tasting.description')}</Typography>
              </Card.Content>
            </Card>

            <Card variant="elevated" padding="none" hover image={{ src: '/3.jpeg', alt: t('activities.study.title'), height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t('activities.study.title')}</Card.Title>
                  <Card.Subtitle>{t('activities.study.subtitle')}</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">{t('activities.study.description')}</Typography>
              </Card.Content>
            </Card>
            <Card variant="elevated" padding="none" hover image={{ src: '/1.jpeg', alt: t('activities.brewing.title'), height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t('activities.brewing.title')}</Card.Title>
                  <Card.Subtitle>{t('activities.brewing.subtitle')}</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">{t('activities.brewing.description')}</Typography>
              </Card.Content>
            </Card>

            <Card variant="elevated" padding="none" hover image={{ src: '/4.jpeg', alt: t('activities.social.title'), height: '360px', objectFit: 'cover' }} className="mobile-card">
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t('activities.social.title')}</Card.Title>
                  <Card.Subtitle>{t('activities.social.subtitle')}</Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">{t('activities.social.description')}</Typography>
              </Card.Content>
            </Card>
          </Carousel>
        </Section.Content>
      </Section>

      <Section id="apply" variant="default" align="center" padding="md" className="responsive-padding">
        <Section.Header title={t('apply.title')} subtitle={t('apply.subtitle')} align="center" />
        <Section.Content>
          <Card variant="elevated" padding="lg" className="mobile-card">
            <Card.Content>
              <Typography variant="body" color="secondary">
                {t('apply.description')}
              </Typography>
              <Card.Actions className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/recruit">
                  <Button variant="primary" size="md" className="touch-friendly w-full md:w-auto">{t('apply.button')}</Button>
                </Link>
              </Card.Actions>
            </Card.Content>
          </Card>
        </Section.Content>
      </Section>
    </>
  );
}
