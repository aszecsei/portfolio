'use client'

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
    className={className ?? styles.externalLink}
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
    <div className={styles.githubBox}>
      <div className={styles.githubTitle}>
        <h3>
          <ExternalLink href={vendorUrl} title={vendorUrl}>
            {vendorName}
          </ExternalLink>
          /
          <ExternalLink
            href={repoUrl}
            title={repoUrl}
            className={styles.repoLink}
          >
            {repoName}
          </ExternalLink>
        </h3>
        <div className={styles.githubStats}>
          <ExternalLink
            href={`${repoUrl}/watchers`}
            title="See watchers"
            className={styles.watchersLink}
          >
            {repo.watchers}
          </ExternalLink>
          <ExternalLink
            href={`${repoUrl}/network/members`}
            title="See forkers"
            className={styles.forkersLink}
          >
            {repo.forks}
          </ExternalLink>
        </div>
      </div>
      <div className={styles.githubContent}>
        <p className="description">
          <span>{repo.description}</span> &mdash;{' '}
          <ExternalLink href={`${repoUrl}#readme`}>Read More</ExternalLink>
        </p>
        {repo.homepage && (
          <p className={styles.githubContentLink}>
            <ExternalLink href={repo.homepage}>{repo.homepage}</ExternalLink>
          </p>
        )}
      </div>
      <div className={styles.download}>
        {repo.pushed_at && (
          <div className={styles.updated}>
            Latest commit to the <strong>{repo.default_branch}</strong> branch
            on {repo.pushed_at.substring(0, 10)}
          </div>
        )}
        <a
          href={`${repoUrl}/zipball/master`}
          title="Get repository"
          className={styles.downloadButton}
        >
          Download as zip
        </a>
      </div>
    </div>
  )
}
