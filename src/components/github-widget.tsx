'use client'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faCodeFork,
  faDownload,
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import * as styles from './github-widget.css'

const FetchGithubRepo = (repository: string) =>
  fetch(`https://api.github.com/repos/${repository}`).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })

interface ExternalLinkProps {
  href: string
  title?: string
  className?: string
  children?: React.ReactNode
}

const ExternalLink = ({
  href,
  title,
  className,
  children,
}: ExternalLinkProps) => (
  <a
    href={href}
    title={title}
    target="_blank"
    rel="noreferrer noopener"
    className={className ?? styles.link}
  >
    {children}
  </a>
)

interface IGitHubData {
  watchers: number | string
  forks: number | string
  homepage?: string
  description?: string
  pushed_at?: string
  default_branch?: string
}

interface IGithubWidgetProps {
  repository: string
  data?: IGitHubData
  onDataFetched?: (repo: IGitHubData) => void
}

export default function GitHubWidget({
  repository,
  data,
  onDataFetched,
}: IGithubWidgetProps) {
  const [repo, setRepo] = useState<IGitHubData>(
    data ?? { watchers: '?', forks: '?' },
  )

  useEffect(() => {
    if (data) return

    FetchGithubRepo(repository)
      .then((fetchedRepo) => {
        setRepo(fetchedRepo)
        onDataFetched?.(fetchedRepo)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [repository, data, onDataFetched])

  const [vendorName, repoName] = repository.split('/')
  const vendorUrl = `https://github.com/${vendorName}`
  const repoUrl = `https://github.com/${vendorName}/${repoName}`

  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <h3 className={styles.name}>
          <FontAwesomeIcon
            className={styles.nameIcon}
            icon={faGithub}
            aria-hidden="true"
          />
          <span>
            <ExternalLink href={vendorUrl} title={vendorUrl}>
              {vendorName}
            </ExternalLink>
            {' / '}
            <ExternalLink
              href={repoUrl}
              title={repoUrl}
              className={styles.repoLink}
            >
              {repoName}
            </ExternalLink>
          </span>
        </h3>
        <div className={styles.stats}>
          <ExternalLink
            href={`${repoUrl}/watchers`}
            title="See watchers"
            className={styles.statLink}
          >
            <FontAwesomeIcon icon={faEye} aria-hidden="true" />
            {repo.watchers}
          </ExternalLink>
          <ExternalLink
            href={`${repoUrl}/network/members`}
            title="See forks"
            className={styles.statLink}
          >
            <FontAwesomeIcon icon={faCodeFork} aria-hidden="true" />
            {repo.forks}
          </ExternalLink>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.description}>
          {repo.description ? <span>{repo.description} &mdash; </span> : null}
          <ExternalLink href={`${repoUrl}#readme`} className={styles.bodyLink}>
            Read more
          </ExternalLink>
        </p>
        {repo.homepage && (
          <p className={styles.homepage}>
            <ExternalLink href={repo.homepage} className={styles.bodyLink}>
              {repo.homepage}
            </ExternalLink>
          </p>
        )}
      </div>
      <div className={styles.foot}>
        {repo.pushed_at && (
          <p className={styles.updated}>
            Latest commit to the{' '}
            <span className={styles.branch}>{repo.default_branch}</span> branch
            on {repo.pushed_at.substring(0, 10)}
          </p>
        )}
        <a
          href={`${repoUrl}/zipball/${repo.default_branch ?? 'master'}`}
          title="Get repository"
          className={styles.download}
        >
          <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
          Download zip
        </a>
      </div>
    </div>
  )
}
