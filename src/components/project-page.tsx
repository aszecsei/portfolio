import type { IProject } from '@/models/project'
import * as tokens from '@/styles/tokens.css'

import { Column, Columns } from './column'
import { Container } from './container'
import { Footer } from './footer'
import GitHub from './github-widget'
import { Image } from './image'
import Nav from './navbar'
import * as styles from './project-page.css'
import { Section } from './section'
import { H1, H2, H5, Text } from './typography'

interface IProjectPageProps {
  project: IProject
}

interface IItchWidgetProps {
  itch: string
}

const ItchWidget = (props: IItchWidgetProps) => (
  <iframe
    frameBorder="0"
    src={props.itch}
    width="100%"
    height="auto"
    loading="lazy"
    title="Itch.io widget"
  />
)

interface IYoutubeWidgetProps {
  youtube: string
}

const YoutubeWidget = (props: IYoutubeWidgetProps) => (
  <iframe
    className={styles.youtubeIframe}
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${props.youtube}?rel=0&amp;showinfo=0`}
    frameBorder="0"
    allowFullScreen
    title="YouTube video"
  />
)

export const ProjectPage = (props: IProjectPageProps) => (
  <>
    <Nav />
    <Section>
      <Container>
        <H1 alignment="center">{props.project.name}</H1>
        <H5 alignment="center" color={tokens.grey}>
          {props.project.date}
        </H5>
        <Columns alignment="center">
          <Column size={8}>
            <Image
              src={`/static/img/projects/${props.project.img_path}`}
              alt={`Image showing ${props.project.name}`}
              hasRoundedCorners
            />
          </Column>
        </Columns>
        <div className={styles.projectSummaries}>
          <div className={styles.projectSummaryHolder}>
            <div className={styles.projectSummaryLabel}>
              <Text alignment="right">Project Type</Text>
            </div>
            <div className={styles.projectSummaryText}>
              <Text>{props.project.type}</Text>
            </div>
          </div>
          <div className={styles.projectSummaryHolder}>
            <div className={styles.projectSummaryLabel}>
              <Text alignment="right">Software Used</Text>
            </div>
            <div className={styles.projectSummaryText}>
              <Text>{props.project.software}</Text>
            </div>
          </div>
          <div className={styles.projectSummaryHolder}>
            <div className={styles.projectSummaryLabel}>
              <Text alignment="right">Languages Used</Text>
            </div>
            <div className={styles.projectSummaryText}>
              <Text>{props.project.language}</Text>
            </div>
          </div>
          <div className={styles.projectSummaryHolder}>
            <div className={styles.projectSummaryLabel}>
              <Text alignment="right">Primary Role(s)</Text>
            </div>
            <div className={styles.projectSummaryText}>
              <Text>{props.project.role}</Text>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    <Section color={tokens.dark}>
      <Container>
        <Columns alignment="center">
          <Column size={8}>
            <H2 alignment="center" color={tokens.light}>
              Description
            </H2>
            {props.project.description.map((v) => (
              <Text
                key={v}
                color={tokens.light}
                dangerouslySetInnerHTML={{ __html: v }}
              />
            ))}
            {props.project.gif_path ? (
              <Image
                src={`/static/img/projects/${props.project.gif_path}`}
                alt={`a gif of ${props.project.name}`}
                unoptimized
              />
            ) : (
              false
            )}
            {props.project.youtube ? (
              <div className={styles.youtubeWrapper}>
                <YoutubeWidget youtube={props.project.youtube} />
              </div>
            ) : (
              false
            )}
          </Column>
        </Columns>
      </Container>
    </Section>
    <Section>
      <Container>
        <H2 alignment="center">Links</H2>
        {props.project.link ? (
          <H5 alignment="center">
            <a className={styles.projectLink} href={props.project.link}>
              {props.project.name}
            </a>
          </H5>
        ) : (
          false
        )}
        <Columns alignment="center">
          {props.project.github ? (
            <Column size={6}>
              <GitHub repository={props.project.github} />
            </Column>
          ) : (
            false
          )}
          {props.project.itch ? (
            <Column size={6}>
              <ItchWidget itch={props.project.itch} />
            </Column>
          ) : (
            false
          )}
        </Columns>
      </Container>
    </Section>
    <Footer />
  </>
)
