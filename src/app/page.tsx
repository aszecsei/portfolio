import { About } from '@/components/about'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import {
  HeroContent,
  HeroImage,
  ScrollCue,
  SocialButtons,
} from '@/components/hero'
import * as heroStyles from '@/components/hero.css'
import Nav from '@/components/navbar'
import { PartyMode } from '@/components/party-mode'
import { Projects } from '@/components/projects'
import { Section } from '@/components/section'
import { H1, H2, H4, Text } from '@/components/typography'
import { games, otherProjects } from '@/models/project'
import { vars } from '@/styles/theme.css'
import * as tokens from '@/styles/tokens.css'
import * as styles from './page.css'

export default function HomePage() {
  return (
    <>
      <a className={styles.skipLink} href="#about">
        Skip to content
      </a>
      <Nav shouldUseScroll />
      <HeroImage>
        <HeroContent>
          <div>
            <H1
              className={heroStyles.heroTitle}
              color={tokens.white}
              alignment="center"
            >
              Alic Szecsei
            </H1>
            <H4
              className={heroStyles.heroTagline}
              color={tokens.white}
              alignment="center"
            >
              Gameplay Programmer & Software Engineer
            </H4>
          </div>
          <SocialButtons className={heroStyles.heroSocials} />
        </HeroContent>
        <ScrollCue target="about" />
      </HeroImage>
      <main>
        <Section id="about">
          <Container>
            <About />
          </Container>
        </Section>
        <Section id="games" color={vars.color.surface}>
          <Container>
            <Projects projects={games} title="Games" noun="games" />
          </Container>
        </Section>
        <Section id="software">
          <Container>
            <Projects
              projects={otherProjects}
              title="Software"
              noun="projects"
            />
          </Container>
        </Section>
        <Section
          id="contact"
          color={vars.color.void}
          className={styles.starfield}
        >
          <Container>
            <div className={`${styles.contactBand} ${styles.starfieldContent}`}>
              <H2 color={tokens.white}>Get in touch</H2>
              <Text className={styles.contactText}>
                I'm always interested in collaborating on new projects. Reach
                out through any of these:
              </Text>
              <SocialButtons />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <PartyMode />
    </>
  )
}
