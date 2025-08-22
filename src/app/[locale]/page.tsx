"use client";

import { useTranslations } from "next-intl";
import styled from "styled-components";
import {
  Button,
  Typography,
  Link,
  Card,
  Navigation,
  Hero,
  Carousel,
  Section,
} from "@/components";
import { theme } from "@/theme/theme";

const MobileHero = styled(Hero)`
  @media (max-width: ${theme.breakpoints.md}) {
    height: 100vh;
    min-height: 100vh;
    height: 100dvh; /* dynamic viewport height for mobile */
    
    h1 {
      font-size: 2.5rem !important;
      line-height: 1.2 !important;
      margin-bottom: 1rem;
    }
    
    h2 {
      font-size: 1.25rem !important;
      line-height: 1.4 !important;
      margin-bottom: 1.5rem;
    }
    
    p {
      font-size: 1rem !important;
      line-height: 1.6 !important;
      margin-bottom: 2rem;
    }
  }
  
  /* iOS Safari specific fixes */
  @supports (-webkit-touch-callout: none) {
    @media (max-width: ${theme.breakpoints.md}) {
      height: -webkit-fill-available;
      min-height: -webkit-fill-available;
    }
  }
`;

const ResponsiveSection = styled(Section)`
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} ${theme.spacing.md} !important;
    
    h2 {
      font-size: 2rem !important;
      line-height: 1.3 !important;
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 1.5rem !important;
      line-height: 1.4 !important;
      margin-bottom: 0.75rem;
    }
    
    p {
      font-size: 1rem !important;
      line-height: 1.6 !important;
    }
  }
`;

const MobileCard = styled(Card)`
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md} !important;
    
    h3 {
      font-size: 1.25rem !important;
      line-height: 1.4 !important;
      margin-bottom: 0.5rem;
    }
    
    h4 {
      font-size: 1rem !important;
      line-height: 1.5 !important;
      margin-bottom: 0.75rem;
    }
    
    p {
      font-size: 0.95rem !important;
      line-height: 1.6 !important;
    }
  }
`;

const MobileCarousel = styled(Carousel)`
  @media (max-width: ${theme.breakpoints.md}) {
    .carousel-slide {
      padding: 0 ${theme.spacing.sm};
    }
    
    .carousel-card {
      h3 {
        font-size: 1.25rem !important;
        line-height: 1.4 !important;
        margin-bottom: 0.5rem;
      }
      
      h4 {
        font-size: 1rem !important;
        line-height: 1.5 !important;
        margin-bottom: 0.75rem;
      }
      
      p {
        font-size: 0.95rem !important;
        line-height: 1.6 !important;
      }
    }
  }
`;

const TouchFriendlyButton = styled(Button)`
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 48px;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
  }
`;

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Navigation
        transparent
        logo={
          <Typography variant="h3" color="white">
            Moonshine
          </Typography>
        }
      />

      <MobileHero
        subtitle={t("hero.subtitle")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryButton={{ label: t("hero.primaryButton"), href: "/recruit" }}
        secondaryButton={{
          label: t("hero.secondaryButton"),
          href: "#activities",
        }}
        backgroundImage="/logo.jpeg"
        height="100dvh"
        align="left"
      />

      <ResponsiveSection
        id="about"
        variant="default"
        align="left"
        padding="md"
      >
        <Section.Header title={t("about.title")} align="left" />
        <Section.Grid>
          <MobileCard variant="surface" padding="md" hover>
            <Card.Header>
              <Card.Title>{t("about.diversity.title")}</Card.Title>
              <Card.Subtitle>{t("about.diversity.subtitle")}</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">
                {t("about.diversity.description")}
              </Typography>
            </Card.Content>
          </MobileCard>
          <MobileCard variant="surface" padding="md" hover>
            <Card.Header>
              <Card.Title>{t("about.creativity.title")}</Card.Title>
              <Card.Subtitle>{t("about.creativity.subtitle")}</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">
                {t("about.creativity.description")}
              </Typography>
            </Card.Content>
          </MobileCard>
          <MobileCard variant="surface" padding="md" hover>
            <Card.Header>
              <Card.Title>{t("about.quality.title")}</Card.Title>
              <Card.Subtitle>{t("about.quality.subtitle")}</Card.Subtitle>
            </Card.Header>
            <Card.Content>
              <Typography variant="body" color="secondary">
                {t("about.quality.description")}
              </Typography>
            </Card.Content>
          </MobileCard>
        </Section.Grid>
      </ResponsiveSection>

      <ResponsiveSection
        id="activities"
        variant="surface"
        align="left"
        padding="md"
      >
        <Section.Header title={t("activities.title")} align="left" />
        <Section.Content>
          <MobileCarousel
            autoPlay
            interval={4500}
            showDots
            showArrows
            infinite
          >
            <MobileCard
              variant="elevated"
              padding="none"
              hover
              image={{
                src: "/2.jpeg",
                alt: t("activities.tasting.title"),
                height: "360px",
                objectFit: "cover",
              }}
              className="carousel-card"
            >
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t("activities.tasting.title")}</Card.Title>
                  <Card.Subtitle>
                    {t("activities.tasting.subtitle")}
                  </Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">
                  {t("activities.tasting.description")}
                </Typography>
              </Card.Content>
            </MobileCard>

            <MobileCard
              variant="elevated"
              padding="none"
              hover
              image={{
                src: "/3.jpeg",
                alt: t("activities.study.title"),
                height: "360px",
                objectFit: "cover",
              }}
              className="carousel-card"
            >
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t("activities.study.title")}</Card.Title>
                  <Card.Subtitle>
                    {t("activities.study.subtitle")}
                  </Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">
                  {t("activities.study.description")}
                </Typography>
              </Card.Content>
            </MobileCard>
            <MobileCard
              variant="elevated"
              padding="none"
              hover
              image={{
                src: "/1.jpeg",
                alt: t("activities.brewing.title"),
                height: "360px",
                objectFit: "cover",
              }}
              className="carousel-card"
            >
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t("activities.brewing.title")}</Card.Title>
                  <Card.Subtitle>
                    {t("activities.brewing.subtitle")}
                  </Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">
                  {t("activities.brewing.description")}
                </Typography>
              </Card.Content>
            </MobileCard>

            <MobileCard
              variant="elevated"
              padding="none"
              hover
              image={{
                src: "/4.jpeg",
                alt: t("activities.social.title"),
                height: "360px",
                objectFit: "cover",
              }}
              className="carousel-card"
            >
              <Card.Content>
                <Card.Header>
                  <Card.Title>{t("activities.social.title")}</Card.Title>
                  <Card.Subtitle>
                    {t("activities.social.subtitle")}
                  </Card.Subtitle>
                </Card.Header>
                <Typography variant="body" color="secondary">
                  {t("activities.social.description")}
                </Typography>
              </Card.Content>
            </MobileCard>
          </MobileCarousel>
        </Section.Content>
      </ResponsiveSection>

      <ResponsiveSection
        id="apply"
        variant="default"
        align="center"
        padding="md"
      >
        <Section.Header
          title={t("apply.title")}
          subtitle={t("apply.subtitle")}
          align="center"
        />
        <Section.Content>
          <MobileCard variant="elevated" padding="lg">
            <Card.Content>
              <Typography variant="body" color="secondary">
                {t("apply.description")}
              </Typography>
              <Card.Actions>
                <Link href="/recruit">
                  <TouchFriendlyButton
                    variant="primary"
                    size="md"
                  >
                    {t("apply.button")}
                  </TouchFriendlyButton>
                </Link>
              </Card.Actions>
            </Card.Content>
          </MobileCard>
        </Section.Content>
      </ResponsiveSection>
    </>
  );
}
