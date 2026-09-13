import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faChevronRight,
  faCode,
  faTag,
  faToolbox,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { games, type IProject } from '@/models/project'
import { getColorForTag } from '@/models/tags'
import { vars } from '@/styles/theme.css'

import { Chip, Chips } from './chip'
import { Container } from './container'
import { Footer } from './footer'
import GitHub from './github-widget'
import { Image } from './image'
import Nav from './navbar'
import { PartyMode } from './party-mode'
import { mediaImage } from './project.css'
import * as styles from './project-page.css'
import { Section } from './section'
import { TiltCard } from './tilt-card'
import { H2, H3, Text } from './typography'

interface IProjectPageProps {
  project: IProject
}

const ItchWidget = ({ itch }: { itch: string }) => (
  <div className={styles.itchFrame}>
    <iframe
      className={styles.itchIframe}
      src={itch}
      loading="lazy"
      title="Itch.io widget"
    />
  </div>
)

const YoutubeWidget = ({ youtube }: { youtube: string }) => (
  <div className={`${styles.frame} ${styles.video}`}>
    <iframe
      className={styles.videoIframe}
      src={`https://www.youtube.com/embed/${youtube}?rel=0`}
      allowFullScreen
      loading="lazy"
      title="YouTube video"
    />
  </div>
)

const statRows = (project: IProject) => [
  { label: 'Project type', value: project.type, icon: faTag },
  { label: 'Software', value: project.software, icon: faToolbox },
  { label: 'Languages', value: project.language, icon: faCode },
  { label: 'Roles', value: project.role, icon: faUserAstronaut },
]

export const ProjectPage = ({ project }: IProjectPageProps) => {
  const isGame = games.includes(project)
  const isExternal = project.link.startsWith('http')

  return (
    <>
      <Nav />
      <main>
        <Section>
          <Container>
            <div className={styles.header}>
              <div className={styles.intro}>
                <Link
                  className={styles.backLink}
                  href={isGame ? '/#games' : '/#software'}
                >
                  <FontAwesomeIcon
                    className={styles.backIcon}
                    icon={faArrowLeft}
                    aria-hidden="true"
                  />
                  {isGame ? 'Games' : 'Software'}
                </Link>
                <div>
                  <h1 className={styles.title}>{project.name}</h1>
                  <time className={styles.date}>{project.date}</time>
                </div>
                <div className={styles.meta}>
                  <span className={styles.typePill}>{project.type}</span>
                  {project.tags?.length ? (
                    <Chips>
                      {project.tags.map((tag) => (
                        <Chip key={tag} color={getColorForTag(tag)}>
                          {tag}
                        </Chip>
                      ))}
                    </Chips>
                  ) : null}
                </div>
              </div>
              <TiltCard className={styles.artCard}>
                <div className={styles.art}>
                  <Image
                    src={`/static/img/projects/${project.img_path}`}
                    alt={`Image showing ${project.name}`}
                    loading="eager"
                    fit="cover"
                    className={mediaImage}
                  />
                </div>
              </TiltCard>
            </div>
            <dl className={styles.stats}>
              {statRows(project).map((row) => (
                <div key={row.label} className={styles.stat}>
                  <span className={styles.statIcon} aria-hidden="true">
                    <FontAwesomeIcon icon={row.icon} />
                  </span>
                  <dt className={styles.statLabel}>{row.label}</dt>
                  <dd className={styles.statValue}>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>

        <Section color={vars.color.surface}>
          <Container>
            <div className={styles.about}>
              <div>
                <div className={styles.prose}>
                  {project.description.map((paragraph) => (
                    <Text
                      key={paragraph}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
                {project.gif_path ? (
                  <div className={styles.frame}>
                    <Image
                      src={`/static/img/projects/${project.gif_path}`}
                      alt={`A gif of ${project.name}`}
                      className={styles.frameImage}
                      unoptimized
                    />
                  </div>
                ) : null}
                {project.youtube ? (
                  <YoutubeWidget youtube={project.youtube} />
                ) : null}
              </div>
              {project.tasks?.length ? (
                <div>
                  <H3 className={styles.questHeading}>What I did</H3>
                  <ul className={styles.quests}>
                    {project.tasks.map((task) => (
                      <li key={task} className={styles.quest}>
                        <span className={styles.questMark} aria-hidden="true">
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className={styles.links}>
              <H2>Links</H2>
              <a
                className={styles.cta}
                href={project.link}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {isGame ? 'Play' : 'View'} {project.name}
                <FontAwesomeIcon
                  className={styles.ctaIcon}
                  icon={faArrowUpRightFromSquare}
                  aria-hidden="true"
                />
              </a>
              {project.github || project.itch ? (
                <div className={styles.widgets}>
                  {project.github ? (
                    <GitHub repository={project.github} />
                  ) : null}
                  {project.itch ? <ItchWidget itch={project.itch} /> : null}
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <PartyMode />
    </>
  )
}
