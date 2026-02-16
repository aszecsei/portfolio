import Link from 'next/link'
import { FaAngleDoubleRight } from 'react-icons/fa'
import type { IProject } from '@/models/project'
import * as tokens from '@/styles/tokens.css'
import { Chip, Chips } from './chip'
import { Icon } from './icon'
import { Image } from './image'
import * as styles from './project.css'
import { H5, H6, Text } from './typography'

const tagColorMap: Record<string, string> = {
  // ENGINES
  Unity: tokens.purple,
  'Unreal Engine 4': tokens.green,
  // LANGUAGES
  Blueprints: tokens.turquoise,
  'C++': tokens.red,
  'C#': tokens.orange,
  JavaScript: tokens.lime,
  Ruby: tokens.maroon,
  Flutter: tokens.blue,
  Python: tokens.yellow,
}

const getColorForTag = (tag: string): string =>
  tagColorMap[tag] ?? tokens.background

interface IProjectImgProps {
  src: string
  isThumbnail?: boolean
  alt: string
}

const ProjectImg = (props: IProjectImgProps) => (
  <Image
    src={`/static/img/${props.isThumbnail ? 'thumbnails' : 'projects'}/${props.src}`}
    alt={props.alt}
    loading="lazy"
    {...(props.isThumbnail ? { width: 400, height: 300 } : {})}
    unoptimized={props.src.endsWith('.gif')}
  />
)

interface IProjectProps {
  projectDetails: IProject
}

export const Project = (props: IProjectProps) => (
  <>
    <div className={styles.card}>
      <H5>
        <Link
          className={styles.projectLink}
          href={`/${props.projectDetails.url}`}
        >
          {props.projectDetails.name}
        </Link>
      </H5>
      <H6>{props.projectDetails.date}</H6>
      <ProjectImg
        src={props.projectDetails.thumbnail_img_path}
        isThumbnail
        alt={`a preview image for ${props.projectDetails.name}`}
      />
      <Text color={tokens.grey}>
        <em>{props.projectDetails.summary}</em>
      </Text>
      <div className={styles.projectChecks}>
        {props.projectDetails.tasks?.map((val) => (
          <div className={styles.projectCheckHolder} key={val}>
            <Text>
              <span className={styles.projectCheck}>
                <Icon>
                  <FaAngleDoubleRight aria-hidden="true" />
                </Icon>
              </span>{' '}
              {val}
            </Text>
          </div>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <Chips>
          {props.projectDetails.tags?.map((val) => (
            <Chip key={val} color={getColorForTag(val)}>
              {val}
            </Chip>
          ))}
        </Chips>
      </div>
    </div>
  </>
)
