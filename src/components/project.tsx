import Link from 'next/link'
import type { IProject } from '@/models/project'
import { getColorForTag } from '@/models/tags'
import { Chip, Chips } from './chip'
import { Image } from './image'
import * as styles from './project.css'
import { TiltCard } from './tilt-card'
import { Text } from './typography'

interface IProjectProps {
  projectDetails: IProject
}

export const Project = ({ projectDetails }: IProjectProps) => (
  <TiltCard className={styles.card}>
    <div className={styles.media}>
      <Image
        src={`/static/img/thumbnails/${projectDetails.thumbnail_img_path}`}
        alt=""
        loading="lazy"
        width={400}
        height={300}
        fit="cover"
        className={styles.mediaImage}
        unoptimized={projectDetails.thumbnail_img_path.endsWith('.gif')}
      />
      <span className={styles.typeLabel}>{projectDetails.type}</span>
    </div>
    <div className={styles.body}>
      <h3 className={styles.title}>
        <Link className={styles.titleLink} href={`/${projectDetails.url}`}>
          {projectDetails.name}
        </Link>
      </h3>
      <time className={styles.date}>{projectDetails.date}</time>
      <Text className={styles.summary}>{projectDetails.summary}</Text>
      {projectDetails.tags?.length ? (
        <div className={styles.footer}>
          <Chips>
            {projectDetails.tags.map((val) => (
              <Chip key={val} color={getColorForTag(val)}>
                {val}
              </Chip>
            ))}
          </Chips>
        </div>
      ) : null}
    </div>
  </TiltCard>
)
